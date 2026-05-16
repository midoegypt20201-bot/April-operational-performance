import { motion } from "motion/react";
import { Department } from "../types";
import { B, getPerfConfig, formatPct, ICONS } from "../constants";
import { Badge } from "./Badge";
import { DeptIcon } from "./DeptIcon";
import { Gauge } from "./Gauge";

interface DeptDetailProps {
  dept: Department;
}

export function DeptDetail({ dept }: DeptDetailProps) {
  const p = getPerfConfig(dept.op);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      className="text-right space-y-8" 
      dir="rtl"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1 bg-brand-teal h-full" style={{ backgroundColor: p.color }} />
        
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex flex-col sm:flex-row items-center gap-8 flex-1">
            <DeptIcon iconKey={dept.icon} size={84} bg={p.color} />
            <div className="text-center sm:text-right space-y-3">
              <h1 className="text-3xl font-[900] text-slate-900 leading-tight">{dept.name}</h1>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 items-center">
                <Badge value={dept.op} lg />
                {dept.units.length > 0 && (
                  <span className="text-xs font-bold text-slate-400 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100 uppercase tracking-widest">
                    {dept.units.length} وحدات تشغيلية
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="relative w-56 h-56 shrink-0 flex items-center justify-center scale-110">
            <Gauge value={dept.op} size={220} stroke={20} />
            <div className="absolute inset-0 flex flex-col items-center justify-center -mt-3">
              <span className="text-5xl font-[1000] tabular-nums tracking-tighter" style={{ color: p.color }}>{formatPct(dept.op)}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">مؤشر الأداء الكلي</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI triplet */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "الأداء التشغيلي الكلي", val: dept.op, sub: "المؤشر الجامع للاختبار" },
          { label: "أداء المبادرات", val: dept.init, sub: "نسبة الإنجاز الفعلية" },
          { label: "أداء الوثائق", val: dept.doc, sub: "امتثال التوثيق والبيانات" },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center group hover:border-slate-300 transition-all">
            <div className="text-6xl font-[1000] tabular-nums mb-4 tracking-tighter" style={{ color: getPerfConfig(k.val).color }}>
              {formatPct(k.val)}
            </div>
            <div className="text-[15px] font-black text-slate-800 mb-1">{k.label}</div>
            <div className="text-[11px] font-bold text-slate-400 uppercase mb-6">{k.sub}</div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(k.val || 0) * 100}%` }}
                className="h-full rounded-full transition-all duration-1000 ease-out" 
                style={{ backgroundColor: getPerfConfig(k.val).color }} 
              />
            </div>
            <div className="mt-6"><Badge value={k.val} lg /></div>
          </div>
        ))}
      </div>

      {/* Analytics Insight */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative">
        <div className="absolute top-8 right-8 text-brand-teal/10">
          {ICONS.barChart("currentColor", 64)}
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3 text-brand-teal font-black text-sm uppercase tracking-widest">
            <i className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
            القراءة التحليلية للمركز
          </div>
          <p className="text-lg text-slate-700 leading-[1.8] font-medium max-w-4xl text-justify">
            {dept.insight}
          </p>
        </div>
      </div>

      {/* Deep Dive Breakdown */}
      {dept.units.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-brand-teal rounded-full" />
            <h3 className="text-xl font-black text-slate-800">تحليل الوحدات التشغيلية</h3>
          </div>
          
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800">
                  <th className="px-8 py-5 text-right text-xs font-black text-slate-400 uppercase tracking-widest">الوحدة / القسم</th>
                  <th className="px-8 py-5 text-right text-xs font-black text-slate-400 uppercase tracking-widest">المبادرات</th>
                  <th className="px-8 py-5 text-right text-xs font-black text-slate-400 uppercase tracking-widest">التوثيق</th>
                  <th className="px-8 py-5 text-right text-xs font-black text-slate-400 uppercase tracking-widest">النتيجة النهائية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dept.units.map((u, idx) => {
                  const up = getPerfConfig(u.op);
                  return (
                    <tr key={u.id} className="group hover:bg-slate-50/80 transition-colors">
                      <td className="px-8 py-8">
                        <div className="text-[17px] font-bold text-slate-800 group-hover:text-brand-teal transition-colors tracking-tight">{u.name}</div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="space-y-2 max-w-[140px]">
                          <div className="text-sm font-black tabular-nums" style={{ color: getPerfConfig(u.init).color }}>{formatPct(u.init)}</div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-teal rounded-full" style={{ width: formatPct(u.init) }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="space-y-2 max-w-[140px]">
                          <div className="text-sm font-black tabular-nums" style={{ color: getPerfConfig(u.doc).color }}>{formatPct(u.doc)}</div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-green rounded-full" style={{ width: formatPct(u.doc) }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8 w-[240px]">
                        <div className="flex items-center justify-between p-5 rounded-2xl border shadow-sm" style={{ backgroundColor: `${up.color}08`, borderColor: `${up.color}20` }}>
                          <div className="text-4xl font-[1000] tabular-nums tracking-tighter" style={{ color: up.color }}>{formatPct(u.op)}</div>
                          <Badge value={u.op} lg />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}
