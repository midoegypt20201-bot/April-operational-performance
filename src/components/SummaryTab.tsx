/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie
} from "recharts";
import { DEPARTMENTS, OVERALL } from "../data";
import { B, PERF, getPerfConfig, formatPct, ICONS } from "../constants";
import { Badge } from "./Badge";
import { DeptIcon } from "./DeptIcon";

export function AnimNum({ value }: { value: number }) {
  const [d, setD] = useState(0);
  useEffect(() => {
    let s = 0;
    const tgt = Math.round(value * 10) / 10;
    const step = tgt / 40;
    const t = setInterval(() => {
      s += step;
      if (s >= tgt) { setD(tgt); clearInterval(t); }
      else setD(Math.round(s * 10) / 10);
    }, 16);
    return () => clearInterval(t);
  }, [value]);
  return <span className="font-mono tabular-nums tracking-tighter">{d.toFixed(1)}%</span>;
}

function HBarTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  const perf = getPerfConfig(row.raw);
  return (
    <div className="glass-card !bg-slate-900/90 !border-slate-800 p-3 text-right min-w-[180px] rounded-xl shadow-2xl">
      <div className="text-[12px] font-bold text-slate-400 mb-1">{row.fullName}</div>
      <div className="text-[22px] font-[900] tabular-nums" style={{ color: perf.color }}>{row.op}%</div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${row.op}%`, backgroundColor: perf.color }} />
      </div>
    </div>
  );
}

interface SummaryTabProps {
  onSelectDept: (id: number) => void;
}

export function SummaryTab({ onSelectDept }: SummaryTabProps) {
  const excellent = DEPARTMENTS.filter(d => d.op >= 0.9).length;
  const good = DEPARTMENTS.filter(d => d.op >= 0.7 && d.op < 0.9).length;
  const weak = DEPARTMENTS.filter(d => d.op < 0.7).length;

  const pieData = [
    { name: "ممتاز", value: excellent, color: PERF.great.color },
    { name: "جيد", value: good, color: PERF.good.color },
    { name: "ضعيف", value: weak, color: PERF.weak.color },
  ];

  const barData = [...DEPARTMENTS]
    .sort((a, b) => b.op - a.op)
    .map(d => ({
      name: d.abbr.length > 14 ? d.abbr.slice(0, 14) + "…" : d.abbr,
      fullName: d.name,
      op: +(d.op * 100).toFixed(1),
      raw: d.op,
      id: d.id,
    }));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className="text-right space-y-8" 
      dir="rtl"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Main KPIs - Hero section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "الأداء التشغيلي الكلي", val: OVERALL.op, icon: ICONS.target, sub: "المؤشر الجامع للمؤسسة", color: B.teal },
          { label: "أداء المبادرات", val: OVERALL.init, icon: ICONS.trendUp, sub: "نسبة إنجاز المبادرات", color: "#6366f1" },
          { label: "أداء الوثائق", val: OVERALL.doc, icon: ICONS.presentation, sub: "امتثال الإجراءات والوثائق", color: B.green },
        ].map((k, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            className="group relative bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-50 to-transparent rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110" />
            <div className="flex justify-between items-start mb-6">
              <DeptIcon iconKey="target" size={54} bg={k.color} />
              <Badge value={k.val} lg />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">{k.label}</div>
              <div className="text-7xl font-[1000] tracking-tighter leading-none" style={{ color: k.color }}>
                <AnimNum value={k.val * 100} />
              </div>
              <div className="text-[13px] font-medium text-slate-400 mt-6 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100">{k.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-bold text-slate-800">تحليل الأداء التفصيلي للإدارات</h3>
            <div className="flex gap-4 text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-emerald-500" /> ممتاز</span>
              <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-amber-500" /> جيد</span>
              <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-red-500" /> ضعيف</span>
            </div>
          </div>
          <div className="h-[440px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 60, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 13, fill: "#64748b", fontWeight: 600 }} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} content={<HBarTooltip />} />
                <Bar dataKey="op" radius={[0, 4, 4, 0]} barSize={16}>
                  {barData.map((e, i) => <Cell key={i} fill={getPerfConfig(e.raw).color} fillOpacity={0.85} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Distribution & Summary Stats */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm h-full flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-8">نطاقات الأداء</h3>
            <div className="flex justify-center mb-8 relative">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={65} outerRadius={85} dataKey="value" paddingAngle={6} startAngle={90} endAngle={-270}>
                    {pieData.map((e, i) => <Cell key={i} fill={e.color} stroke="none" />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => [`${v} إدارات`]} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', direction: 'rtl' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-[900] text-slate-800 tabular-nums">14</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">إجمالي الإدارات</span>
              </div>
            </div>
            <div className="space-y-4 flex-1">
              {pieData.map((p, i) => (
                <div key={i} className="flex items-center p-3 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:border-slate-200">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${p.color}15`, color: p.color }}>
                    <span className="text-lg font-bold tabular-nums">{p.value}</span>
                  </div>
                  <div className="mr-3 flex-1">
                    <div className="text-sm font-bold text-slate-700">{p.name}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">نسبة التوزع: {((p.value/14)*100).toFixed(0)}%</div>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Grid of all departments */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
            <span className="w-2 h-8 bg-brand-teal rounded-full" />
            بطاقات أداء الإدارات
          </h3>
          <p className="text-sm font-bold text-slate-400">انقر على الإدارة لاستعراض التحليل العميق</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...DEPARTMENTS].sort((a, b) => b.op - a.op).map((d, idx) => (
            <motion.button 
              key={d.id} 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onClick={() => onSelectDept(d.id)}
              className="group bg-white border border-slate-200/80 rounded-3xl p-6 text-right transition-all hover:shadow-2xl hover:border-brand-teal/30 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-slate-50 rounded-full -z-10 group-hover:scale-150 transition-transform duration-500 opacity-50" />
              
              <div className="flex justify-between items-start mb-6">
                <Badge value={d.op} />
                <DeptIcon iconKey={d.icon} size={48} bg={getPerfConfig(d.op).color} />
              </div>
              
              <div className="min-h-[54px] mb-6">
                <div className="text-[16px] font-extrabold text-slate-800 leading-tight group-hover:text-brand-teal transition-colors">{d.name}</div>
              </div>
              
              <div className="flex justify-between items-end">
                <div className="text-4xl font-[900] tabular-nums tracking-tighter" style={{ color: getPerfConfig(d.op).color }}>
                  {formatPct(d.op)}
                </div>
                <div className="space-y-1.5 min-w-[100px]">
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-teal rounded-full" style={{ width: formatPct(d.init) }} />
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-green rounded-full" style={{ width: formatPct(d.doc) }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter pt-1">
                    <span>مبادرات</span>
                    <span>وثائق</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
