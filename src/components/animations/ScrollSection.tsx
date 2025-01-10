import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.98, 1, 1, 0.98]
  );

  const springConfig = { stiffness: 80, damping: 25, restDelta: 0.001 };
  const springScale = useSpring(scale, springConfig);

  return (
    <div className="relative" style={{ height: '120vh' }}>
      <motion.div
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center sticky top-0 bg-white"
        style={{
          opacity,
          scale: springScale,
          zIndex: 40 - index,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}