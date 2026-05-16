/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getPerfConfig } from "../constants";

interface BadgeProps {
  value: number | null;
  lg?: boolean;
}

export function Badge({ value, lg }: BadgeProps) {
  const p = getPerfConfig(value);
  return (
    <span
      className={`
        inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold
        transition-all duration-300
        ${lg ? "px-5 py-1.5 text-sm tracking-wide" : "px-3 py-0.5 text-xs"}
      `}
      style={{
        backgroundColor: `${p.color}15`,
        color: p.color,
        border: `1px solid ${p.color}30`,
      }}
    >
      <span className="ml-1.5 opacity-80">{p.icon}</span>
      {p.label}
    </span>
  );
}
