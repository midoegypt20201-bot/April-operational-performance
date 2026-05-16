/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Colors, PerformanceLevel } from "./types";

export const B: Colors = {
  teal: "#01a79d",
  tealDk: "#018a81",
  tealLt: "#e6f7f6",
  green: "#8cc342",
  greenLt: "#f0f8e8",
  gray: "#64748b", // Tailwind slate-500
  grayLt: "#f8fafc", // Tailwind slate-50
  black: "#0f172a", // Tailwind slate-900
  white: "#ffffff",
};

export const PERF: Record<string, PerformanceLevel> = {
  great: { color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0", label: "ممتاز", icon: "✨" },
  good: { color: "#f59e0b", bg: "#fffbeb", border: "#fde68a", label: "جيد", icon: "●" },
  weak: { color: "#ef4444", bg: "#fef2f2", border: "#fecaca", label: "ضعيف", icon: "▼" },
  na: { color: "#94a3b8", bg: "#f1f5f9", border: "#e2e8f0", label: "غير متاح", icon: "○" },
};

export const getPerfConfig = (v: number | null): PerformanceLevel => {
  if (v == null) return PERF.na;
  if (v >= 0.9) return PERF.great;
  if (v >= 0.7) return PERF.good;
  return PERF.weak;
};

export const formatPct = (v: number | null): string => (v == null ? "—" : `${(v * 100).toFixed(1)}%`);

export const ICONS: Record<string, (c?: string, s?: number) => React.ReactNode> = {
  beneficiaries: (c = "currentColor", s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  heart: (c = "currentColor", s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  graduationCap: (c = "currentColor", s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  star: (c = "currentColor", s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a.53.53 0 0 0 .4.29l5.163.751a.53.53 0 0 1 .3.903l-3.735 3.641a.53.53 0 0 0-.15.469l.882 5.141a.53.53 0 0 1-.77.56l-4.618-2.428a.53.53 0 0 0-.494 0L7.18 18.73a.53.53 0 0 1-.77-.56l.882-5.141a.53.53 0 0 0-.15-.469L3.407 8.919a.53.53 0 0 1 .3-.903l5.163-.751a.53.53 0 0 0 .4-.29l2.31-4.679Z" />
    </svg>
  ),
  briefcase: (c = "currentColor", s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  ),
  flask: (c = "currentColor", s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M10 9h4M10 3v10.17a4 4 0 1 1-4 0V3M14 3v10.17" />
    </svg>
  ),
  users: (c = "currentColor", s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  megaphone: (c = "currentColor", s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 18-5v12L3 13v-2Z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  ),
  building: (c = "currentColor", s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
    </svg>
  ),
  target: (c = "currentColor", s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  trendUp: (c = "currentColor", s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  scale: (c = "currentColor", s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 16 3-8 3 8c-.87.62-1.9.1.5l-3-.5c-.6 0-1.13.38-2.5 1Z" />
      <path d="m2 16 3-8 3 8c-.87.62-1.9.1.5l-3-.5c-.6 0-1.13.38-2.5 1Z" />
      <path d="M7 21h10M12 3v18" />
    </svg>
  ),
  search: (c = "currentColor", s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  barChart: (c = "currentColor", s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  ),
  presentation: (c = "currentColor", s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </svg>
  ),
};
