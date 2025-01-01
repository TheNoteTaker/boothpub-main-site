import { motion, useAnimation, useSpring, type AnimationControls } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const FLOAT_RANGE = 60;
const ROTATION_RANGE = 15;
const ANIMATION_DURATION = 20;

interface PhotoStripProps {
  index: number;
}

export function PhotoStrip({ index }: PhotoStripProps) {
  const controls = useAnimation();
  const baseX = useRef(0);
  const baseY = useRef(0);
  
  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector('.hero-container');
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const margin = width * 0.15; // 15% margin from edges
      const maxX = width - margin;
      const maxY = height - margin;
      
      baseX.current = margin + (Math.random() * (maxX - margin * 2));
      baseY.current = margin + (Math.random() * (maxY - margin * 2));
      
      startAnimation();
    };

    const startAnimation = () => {
      controls.start({
        x: [
          baseX.current,
          baseX.current + FLOAT_RANGE,
          baseX.current - FLOAT_RANGE,
          baseX.current
        ],
        y: [
          baseY.current,
          baseY.current - FLOAT_RANGE,
          baseY.current + FLOAT_RANGE,
          baseY.current
        ],
        rotate: [0, ROTATION_RANGE, -ROTATION_RANGE, 0],
        scale: 1,
        transition: {
          duration: ANIMATION_DURATION + (index * 2), // Stagger the animations
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          times: [0, 0.33, 0.66, 1]
        }
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, [controls, index]);

  return (
    <div className="absolute inset-0">
      <motion.div
        animate={controls}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ 
          opacity: [0, 1],
          scale: [0.9, 1],
          transition: { duration: 0.8, ease: "easeOut" }
        }}
        whileHover={{ 
          scale: 1.15,
          rotate: [-5, 5],
          transition: { duration: 0.4 }
        }}
        style={{
          position: 'absolute',
          left: baseX.current,
          top: baseY.current
        }}
        className="cursor-pointer z-10 touch-none select-none"
      >
        <div className="w-16 h-48 bg-white rounded-md shadow-lg overflow-hidden border-4 border-white transform-gpu hover:shadow-xl transition-all duration-300 hover:border-[#F9CC9A] hover:rotate-3">
          <div className="h-1/3 bg-[#F9CC9A] mb-1"></div>
          <div className="h-1/3 bg-[#D75E1F] mb-1"></div>
          <div className="h-1/3 bg-[#2F505F]"></div>
        </div>
      </motion.div>
    </div>
  );
}