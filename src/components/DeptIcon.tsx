/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ICONS, B } from "../constants";

interface DeptIconProps {
  iconKey: string;
  size?: number;
  bg?: string;
  variant?: "brand" | "glass" | "simple";
}

export function DeptIcon({ iconKey, size = 42, bg = B.teal, variant = "brand" }: DeptIconProps) {
  const IconFn = ICONS[iconKey] || ICONS.building;
  
  const getStyles = () => {
    if (variant === "glass") {
      return {
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "none",
      };
    }
    if (variant === "brand") {
      return {
        background: `linear-gradient(135deg, ${bg}, ${bg}dd)`,
        boxShadow: `0 4px 12px ${bg}33`,
      };
    }
    return { background: bg, boxShadow: "none" };
  };

  return (
    <div
      className="flex items-center justify-center shrink-0 rounded-xl"
      style={{
        width: size,
        height: size,
        ...getStyles(),
      }}
    >
      {IconFn("#fff", Math.round(size * 0.55))}
    </div>
  );
}
