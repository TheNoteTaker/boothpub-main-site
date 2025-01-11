import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface IntroSectionProps {
  children: React.ReactNode;
}

export function IntroSection({ children }: IntroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.6, 0.8, 1],
    [0, 1, 1, 1, 0.5, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.6, 0.8, 1],
    [0.95, 1, 1, 1, 0.95, 0.9]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.6, 0.8, 1],
    [20, 0, 0, 0, 20, 40]
  );

  const springConfig = { stiffness: 80, damping: 25, restDelta: 0.001 };
  const springScale = useSpring(scale, springConfig);
  const springY = useSpring(y, springConfig);

  return (
    <div className="relative" style={{ height: '120vh' }}>
      <motion.div
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center sticky top-0 bg-white py-16 pb-24 sm:py-0 overflow-hidden"
        style={{
          opacity,
          scale: springScale,
          y: springY,
          zIndex: 40,
          transform: 'translate3d(0,0,0)',
        }}
      >
        <div className="w-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
} 