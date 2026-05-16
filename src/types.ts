/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Unit {
  id: number;
  name: string;
  init: number;
  doc: number | null;
  op: number;
}

export interface Department {
  id: number;
  name: string;
  abbr: string;
  icon: string;
  init: number;
  doc: number | null;
  op: number;
  units: Unit[];
  insight: string;
}

export interface PerformanceLevel {
  color: string;
  bg: string;
  border: string;
  label: string;
  icon: string;
}

export interface Colors {
  teal: string;
  tealDk: string;
  tealLt: string;
  green: string;
  greenLt: string;
  gray: string;
  grayLt: string;
  black: string;
  white: string;
}
