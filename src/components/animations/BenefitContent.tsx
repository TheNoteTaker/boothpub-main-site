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
    offset: ["start end", "end start"]
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [100, 100, 0, -100, -100]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 0, 1, 0, 0]
  );

  return (
    <motion.div
      ref={contentRef}
      style={{ x, opacity }}
      className="flex flex-col gap-6 max-w-xl"
    >
      <motion.div 
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F9CC9A]"
        whileInView={{ scale: [0.8, 1], rotate: [-10, 0] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Icon
          name={icon}
          className="h-8 w-8 text-[#D75E1F]"
        />
      </motion.div>
      <div>
        <motion.h3 
          className="text-3xl font-semibold text-[#2F505F]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {name}
        </motion.h3>
        <motion.p 
          className="mt-4 text-xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}