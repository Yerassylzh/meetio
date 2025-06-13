"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";

interface ScrollAreaProps {
  children?: React.ReactNode;
  className?: string;
  x?: boolean;
  y?: boolean;
}

export default function ScrollArea({
  children,
  className,
  x = true,
  y = true,
}: ScrollAreaProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      el.classList.add("scrolling");
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        el.classList.remove("scrolling");
      }, 200);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        `scrollbar-custom ${x ? "overflow-x-auto" : "overflow-x-visible"} ${
          y ? "overflow-y-auto" : "overflow-y-visible"
        }`,
        className
      )}
    >
      {children}
    </div>
  );
}
