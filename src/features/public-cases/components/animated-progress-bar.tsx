"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedProgressBar({
  percent,
  delayMs = 0,
}: {
  percent: number;
  delayMs?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const target = Math.max(percent, 4);
    const node = containerRef.current;

    if (!node || !("IntersectionObserver" in window)) {
      const timer = window.setTimeout(() => setWidth(target), 180 + delayMs);

      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setWidth(target), 180 + delayMs);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [delayMs, percent]);

  return (
    <div ref={containerRef} className="h-2 overflow-hidden rounded-full bg-muted">
      <div
        className="h-2 rounded-full bg-primary transition-[width] duration-[3600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
