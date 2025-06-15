"use client";

import { motion } from "framer-motion";
import { ReactNode, useMemo } from "react";
import { useInView } from "react-intersection-observer";

type FadeInWrapperProps = {
  children: ReactNode;
  delayPerChild?: number;
};

export default function FadeInWrapper({
  children,
  delayPerChild = 0.1,
}: FadeInWrapperProps) {
  const childrenArray = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  );

  return (
    <>
      {childrenArray.map((child, i) => (
        <FadeInChild key={i} delay={i * delayPerChild}>
          {child}
        </FadeInChild>
      ))}
    </>
  );
}

function FadeInChild({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
