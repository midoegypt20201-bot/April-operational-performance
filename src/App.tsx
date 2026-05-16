import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DEPARTMENTS, OVERALL } from "./data";
import { B, formatPct, getPerfConfig, ICONS } from "./constants";
import { SummaryTab } from "./components/SummaryTab";
import { DeptDetail } from "./components/DeptDetail";
import { PresentationMode } from "./components/PresentationMode";
import { DeptIcon } from "./components/DeptIcon";

export default function App() {
  const [activeTab, setActiveTab] = useState("summary");
  const [presentMode, setPresentMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleSelectDept = (id: number) => {
    setActiveTab(`dept-${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedDept = activeTab.startsWith("dept-")
    ? DEPARTMENTS.find(d => d.id === parseInt(activeTab.split("-")[1]))
    : null;

  const tabs: Array<{
    id: string;
    label: string;
    iconFn?: (c?: string, s?: number) => React.ReactNode;
    iconKey?: string;
    color: string | null;
  }> = [
    { id: "summary", label: "الرئيسية", iconFn: ICONS.barChart, color: null },
    ...DEPARTMENTS.map(d => ({ 
      id: `dept-${d.id}`, 
      label: d.abbr, 
      iconKey: d.icon, 
      color: getPerfConfig(d.op).color 
    }))
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-brand-teal selection:text-white" dir="rtl">
      <AnimatePresence>
        {presentMode && (
          <PresentationMode onClose={() => setPresentMode(false)} />
        )}
      </AnimatePresence>

      {/* TOP STATUS BAR */}
      <div className="bg-slate-900 py-1.5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> مباشر</span>
          <span>تحديث البيانات: {new Date().toLocaleDateString('ar-SA')}</span>
        </div>
        <div className="hidden sm:block">نظام إدارة الأداء التشغيلي الذكي — الإصدار 4.0</div>
      </div>

      {/* STICKY HEADER */}
      <header 
        className={`
          sticky top-0 z-40 transition-all duration-500
          ${scrolled ? "py-3 glass-card shadow-2xl" : "py-6 bg-white border-b border-slate-100"}
        `}
      >
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col xl:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 group">
             <div className="w-14 h-14 rounded-2xl bg-brand-teal flex items-center justify-center shadow-lg shadow-brand-teal/20 group-hover:rotate-6 transition-transform">
                {ICONS.barChart("#fff", 28)}
             </div>
             <div>
                <h1 className="text-2xl font-[900] text-slate-900 tracking-tight leading-none mb-1.5">لوحة الأداء التشغيلي</h1>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">تراؤف — تقرير شهر أبريل 2026م</p>
             </div>
          </div>

          <div className="hidden lg:flex items-center bg-white p-3 rounded-2xl border border-slate-200 shadow-sm divide-x divide-x-reverse divide-slate-100">
            {[
              { l: "الأداء الكلي", v: OVERALL.op, c: B.teal },
              { l: "المبادرات", v: OVERALL.init, c: "#6366f1" },
              { l: "الوثائق", v: OVERALL.doc, c: B.green },
            ].map((k, i) => (
              <div key={i} className="px-8 text-center first:pr-4 last:pl-4">
                <div className="text-3xl font-[1000] tabular-nums leading-none mb-1.5" style={{ color: getPerfConfig(k.v).color }}>{formatPct(k.v)}</div>
                <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">{k.l}</div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setPresentMode(true)} 
            className="group relative bg-slate-900 text-white rounded-xl px-8 py-3.5 font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-brand-teal transition-all overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
            {ICONS.presentation("currentColor", 18)}
            <span className="relative z-10">استعراض تنفيذي</span>
          </button>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="bg-white border-b border-slate-100 overflow-x-auto no-scrollbar py-1">
        <div className="max-w-[1440px] mx-auto px-8 flex gap-2">
          {tabs.map(t => {
            const active = activeTab === t.id;
            return (
              <button 
                key={t.id} 
                onClick={() => setActiveTab(t.id)}
                className={`
                  relative px-5 py-4 flex items-center gap-3 transition-all cursor-pointer whitespace-nowrap group
                  ${active ? "text-brand-teal" : "text-slate-400 hover:text-slate-600"}
                `}
              >
                {t.iconFn
                  ? t.iconFn(active ? B.teal : "currentColor", 18)
                  : <DeptIcon iconKey={t.iconKey!} size={24} bg={active ? B.teal : "#f1f5f9"} variant={active ? "brand" : "simple"} />
                }
                <span className={`text-sm font-bold ${active ? "tracking-tight" : "tracking-normal"}`}>{t.label}</span>
                {active && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-brand-teal rounded-t-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-[1440px] mx-auto px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "summary" && <SummaryTab onSelectDept={handleSelectDept} />}
            {selectedDept && <DeptDetail dept={selectedDept} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-12 bg-white mt-12">
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                {ICONS.building(B.gray, 20)}
             </div>
             <div className="text-slate-500 font-bold text-sm underline decoration-slate-200 underline-offset-8">جمعية تراؤف الخيرية — سياسة الخصوصية</div>
          </div>
          <div className="text-xs font-black text-slate-300 uppercase tracking-[0.4em]">
            Digital Transformation Dashboard &copy; 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
