"use client";

import { useEffect, useState } from "react";

export function AnimatedProgressBar({ percent }: { percent: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setWidth(Math.max(percent, 4));
    }, 120);

    return () => window.clearTimeout(timer);
  }, [percent]);

  return (
    <div className="h-2 rounded-full bg-muted">
      <div
        className="h-2 rounded-full bg-primary transition-[width] duration-[1400ms] ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
