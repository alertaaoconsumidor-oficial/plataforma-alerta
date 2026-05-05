"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollGrowBar({ percent }: { percent: number }) {
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
      className="w-full origin-bottom rounded-t-md bg-primary transition-transform duration-[1800ms] ease-out"
      style={{
        height: `${percent}%`,
        transform: visible ? "scaleY(1)" : "scaleY(0)",
      }}
    />
  );
}
