import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DEPARTMENTS } from "../data";
import { formatPct, getPerfConfig, ICONS } from "../constants";
import { Gauge } from "./Gauge";
import { Badge } from "./Badge";

interface PresentationModeProps {
  onClose: () => void;
}

export function PresentationMode({ onClose }: PresentationModeProps) {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurr(v => (v + 1) % DEPARTMENTS.length);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  const d = DEPARTMENTS[curr];
  const p = getPerfConfig(d.op);

  return (
    <div className="fixed inset-0 z-[100] presentation-bg text-white overflow-hidden" dir="rtl">
      {/* UI Controls */}
      <div className="absolute top-10 left-10 right-10 flex justify-between items-center z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10">
            {ICONS.presentation("#01a79d", 28)}
          </div>
          <div>
            <div className="text-xl font-black tracking-tight">لوحة العرض التنفيذي</div>
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Executive Presentation Mode</div>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all group pointer-events-auto cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:rotate-90 transition-transform">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={d.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-full flex flex-col items-center justify-center p-20"
        >
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left: Info */}
            <div className="space-y-12">
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-brand-teal font-black text-sm uppercase tracking-widest"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                  تحليل الإدارة الحالية
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="text-7xl font-[950] leading-[1.1] tracking-tight bg-gradient-to-l from-white via-white to-white/40 bg-clip-text text-transparent"
                >
                  {d.name}
                </motion.h2>
                
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  className="flex gap-4 items-center"
                >
                  <Badge value={d.op} lg />
                  <div className="h-px w-20 bg-white/10" />
                  <div className="text-white/40 font-bold text-sm">كود الإدارة: {d.id * 1024}</div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-8"
              >
                {[
                  { label: "المبادرات التشغيلية", val: d.init, color: "#01a79d" },
                  { label: "امتثال الوثائق", val: d.doc, color: "#8cc342" },
                ].map((s, i) => (
                  <div key={i} className="p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-sm space-y-4">
                    <div className="text-xs font-black text-white/30 uppercase tracking-widest">{s.label}</div>
                    <div className="text-5xl font-[950] tabular-nums" style={{ color: s.color }}>{formatPct(s.val)}</div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: formatPct(s.val) }} transition={{ delay: 1, duration: 1.5 }}
                        className="h-full rounded-full" style={{ backgroundColor: s.color }} 
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Large Gauge */}
            <div className="flex flex-col items-center justify-center relative">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-brand-teal/20 blur-[120px] rounded-full scale-150 -z-10" />
                <Gauge value={d.op} size={480} stroke={24} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                    className="text-[120px] font-[1000] tabular-nums tracking-tighter leading-none"
                    style={{ color: p.color }}
                  >
                    {Math.round(d.op * 100)}
                    <span className="text-4xl text-white/20 mr-1">%</span>
                  </motion.span>
                  <span className="text-sm font-black text-white/40 uppercase tracking-[0.5em] mt-4">الإنجاز الكلي</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Footer */}
      <div className="absolute bottom-10 left-20 right-20 space-y-6">
        <div className="flex justify-between items-end text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
          <div>قيد العرض: {curr + 1} من {DEPARTMENTS.length}</div>
          <div>التغطية الجارية للبيانات التشغيلية</div>
        </div>
        <div className="flex gap-2 h-1.5 items-end">
          {DEPARTMENTS.map((_, i) => (
            <div key={i} className="flex-1 relative overflow-hidden rounded-full h-full bg-white/10 group">
              {i === curr && (
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 8, ease: "linear" }}
                  className="absolute inset-0 bg-brand-teal"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
