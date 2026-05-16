/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getPerfConfig } from "../constants";

interface GaugeProps {
  value: number;
  size?: number;
  stroke?: number;
}

export function Gauge({ value, size = 140, stroke = 13 }: GaugeProps) {
  const r = (size - stroke) / 2;
  const arc = 2 * Math.PI * r * 0.75;
  const fill = (value || 0) * arc;
  const col = getPerfConfig(value).color;

  return (
    <svg width={size} height={size} className="rotate-[135deg] drop-shadow-sm">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#f1f5f9"
        strokeWidth={stroke}
        strokeDasharray={`${arc} ${2 * Math.PI * r - arc}`}
        strokeLinecap="round"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={col}
        strokeWidth={stroke}
        strokeDasharray={`${fill} ${2 * Math.PI * r - fill}`}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out"
        style={{ filter: `drop-shadow(0 0 8px ${col}33)` }}
      />
    </svg>
  );
}
