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
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 0, 1, 0, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.8, 0.8, 1, 0.8, 0.8]
  );

  return (
    <div className="relative" style={{ height: '200vh' }}>
      <motion.div
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center sticky top-0 bg-white"
        style={{
          opacity,
          scale,
          zIndex: 40 - index,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}