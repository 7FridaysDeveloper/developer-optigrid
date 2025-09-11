"use client";

import { useCountUpAnimation } from "@/app/hooks/useCountUpAnimation";

interface CounterProps {
  value: number;
  unit: string;
  startVal?: number;
  prefix?: string;
}

const Counter = ({ value, unit, startVal, prefix }: CounterProps) => {
  const { count, ref } = useCountUpAnimation(value);

  const displayValue = `${startVal ? `${startVal}-` : ""}${prefix || ""}${count}${unit}`;

  return <div ref={ref}>{displayValue}</div>;
};

export default Counter;
