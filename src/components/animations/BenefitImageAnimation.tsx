import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface BenefitImageAnimationProps {
  children: React.ReactNode;
}

export function BenefitImageAnimation({ children }: BenefitImageAnimationProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [-100, -50, 0, 0, 50, 100]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 0.5, 1, 1, 0.5, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0.8, 0.9, 1, 1, 0.9, 0.8]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [-5, -2, 0, 0, 2, 5]
  );

  return (
    <div className="relative">
      <motion.div
        ref={imageRef}
        style={{ x, opacity, scale, rotate }}
        className="relative aspect-[3/4] overflow-hidden rounded-2xl"
      >
        {children}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10" />
      </motion.div>
    </div>
  );
}