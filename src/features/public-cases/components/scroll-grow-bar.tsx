"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollGrowBar({
  percent,
  delayMs = 0,
}: {
  percent: number;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full origin-bottom rounded-t-md bg-primary transition-transform duration-[3600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        height: `${percent}%`,
        transform: visible ? "scaleY(1)" : "scaleY(0)",
        transitionDelay: visible ? `${delayMs}ms` : "0ms",
      }}
    />
  );
}
