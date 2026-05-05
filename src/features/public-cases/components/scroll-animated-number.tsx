"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatedNumber } from "./animated-number";

export function ScrollAnimatedNumber({
  value,
  duration = 1700,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
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
      { threshold: 0.5 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref}>
      {visible ? <AnimatedNumber value={value} duration={duration} /> : 0}
    </span>
  );
}
