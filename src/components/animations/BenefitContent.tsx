import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Icon } from '@/components/ui/Icon';

interface BenefitContentProps {
  name: string;
  description: string;
  icon: string;
}

export function BenefitContent({ name, description, icon }: BenefitContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ['start end', 'end start']
  });

  const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={contentRef}
      style={{ x, opacity }}
      className="flex items-start gap-6"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F9CC9A] group-hover:bg-[#D75E1F] transition-colors duration-300">
        <Icon
          name={icon}
          className="h-6 w-6 text-[#D75E1F] group-hover:text-white transition-colors duration-300"
        />
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-[#2F505F] group-hover:text-[#D75E1F] transition-colors duration-300">
          {name}
        </h3>
        <p className="mt-4 text-lg text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
}