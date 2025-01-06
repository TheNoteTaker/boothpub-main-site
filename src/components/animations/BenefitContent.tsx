import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Icon } from '@/components/ui/Icon';
import * as LucideIcons from 'lucide-react';

interface BenefitContentProps {
  name: string;
  description: string;
  icon: keyof typeof LucideIcons;
  cta: {
    text: string;
    href: string;
  };
}

export function BenefitContent({ name, description, icon, cta }: BenefitContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.1, 0.5, 0.9, 1],
    [100, 100, 0, -100, -100]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.5, 0.9, 1],
    [0, 0, 1, 0, 0]
  );

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const springX = useSpring(x, springConfig);

  return (
    <motion.div
      ref={contentRef}
      style={{ x: springX, opacity }}
      className="flex flex-col gap-6 max-w-xl"
    >
      <motion.div 
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F9CC9A]"
        whileInView={{ scale: [0.8, 1], rotate: [-10, 0] }}
        transition={{ duration: 0.4, ease: "easeOut" }}
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
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {name}
        </motion.h3>
        <motion.p 
          className="mt-4 text-xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6"
        >
          <a
            href={cta.href}
            className="inline-flex items-center text-[#D75E1F] hover:text-[#2F505F] transition-colors duration-300 group"
          >
            {cta.text}
            <Icon
              name="ArrowRight"
              className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}