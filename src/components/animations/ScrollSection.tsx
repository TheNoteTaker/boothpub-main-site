import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ScrollSectionProps {
  children: React.ReactNode;
  index: number;
}

export function ScrollSection({ children, index }: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <motion.div
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-16 sm:py-24"
      style={{
        opacity,
        scale,
        y
      }}
    >
      {children}
    </motion.div>
  );
}