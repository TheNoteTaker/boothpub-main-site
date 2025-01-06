import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface BenefitImageAnimationProps {
  children: React.ReactNode;
}

export function BenefitImageAnimation({ children }: BenefitImageAnimationProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start']
  });

  const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-100, 0, 0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={imageRef}
      style={{ x, opacity, scale }}
      className="relative aspect-[3/4] overflow-hidden rounded-2xl"
    >
      {children}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10" />
    </motion.div>
  );
}