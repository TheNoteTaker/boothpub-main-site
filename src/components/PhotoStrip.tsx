import { motion, useAnimation, useSpring, type AnimationControls } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const MOUSE_INFLUENCE_RADIUS = 200;
const PUSH_STRENGTH = 15;
const SPRING_CONFIG = { stiffness: 40, damping: 15 };
const FLOAT_RANGE = 40;

interface PhotoStripProps {
  index: number;
}

export function PhotoStrip({ index }: PhotoStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const mouseXSpring = useSpring(0, SPRING_CONFIG);
  const mouseYSpring = useSpring(0, SPRING_CONFIG);
  const baseX = useRef(0);
  const baseY = useRef(0);
  
  useEffect(() => {
    const updateDimensions = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const margin = width * 0.1; // 10% margin from edges
      const maxX = width - margin;
      const maxY = height - margin;
      
      baseX.current = margin + (Math.random() * (maxX - margin * 2));
      baseY.current = margin + (Math.random() * (maxY - margin * 2));
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Initial floating animation
    controls.start({
      x: [
        baseX.current,
        baseX.current + (Math.random() * FLOAT_RANGE - FLOAT_RANGE/2),
        baseX.current - (Math.random() * FLOAT_RANGE - FLOAT_RANGE/2),
        baseX.current
      ],
      y: [
        baseY.current,
        baseY.current + (Math.random() * FLOAT_RANGE - FLOAT_RANGE/2),
        baseY.current - (Math.random() * FLOAT_RANGE - FLOAT_RANGE/2),
        baseY.current
      ],
      rotate: [0, Math.random() * 20 - 10],
      scale: 1,
      transition: {
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
        times: [0, 0.33, 0.66, 1]
      }
    });
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, [controls]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const container = containerRef.current;
      if (!container) return;
      
      const bounds = container.getBoundingClientRect();

      // Convert mouse position to container coordinates
      const relativeX = mouseX - bounds.left;
      const relativeY = mouseY - bounds.top;
      
      // Calculate distance from mouse to strip
      const dx = relativeX - baseX.current;
      const dy = relativeY - baseY.current;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const margin = 20;
      const maxX = bounds.width - margin;
      const maxY = bounds.height - margin;

      if (distance < MOUSE_INFLUENCE_RADIUS) {
        const influence = Math.pow(1 - (distance / MOUSE_INFLUENCE_RADIUS), 2);
        
        // Calculate new position
        let newX = -dx * influence * PUSH_STRENGTH;
        let newY = -dy * influence * PUSH_STRENGTH;
        
        // Clamp to bounds
        newX = Math.max(margin, Math.min(maxX, baseX.current + newX)) - baseX.current;
        newY = Math.max(margin, Math.min(maxY, baseY.current + newY)) - baseY.current;
        
        mouseXSpring.set(newX);
        mouseYSpring.set(newY);
      } else {
        // Gradually return to base position
        mouseXSpring.set(0);
        mouseYSpring.set(0);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseXSpring, mouseYSpring]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <motion.div
        animate={controls}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ 
          opacity: [0, 0.8],
          scale: [0.9, 1],
          transition: { duration: 0.8, ease: "easeOut" }
        }}
        whileHover={{ 
          scale: 1.15,
          rotate: [null, -5, 5, 0],
          transition: { duration: 0.4 }
        }}
        style={{
          x: mouseXSpring,
          y: mouseYSpring,
          position: 'absolute',
          left: baseX.current,
          top: baseY.current
        }}
        className="cursor-pointer z-10 touch-none select-none"
      >
        <div className="w-16 h-48 bg-white rounded-md shadow-lg overflow-hidden border-4 border-white transform-gpu hover:shadow-xl transition-all duration-300 hover:border-[#F9CC9A]">
          <div className="h-1/3 bg-[#F9CC9A] mb-1"></div>
          <div className="h-1/3 bg-[#D75E1F] mb-1"></div>
          <div className="h-1/3 bg-[#2F505F]"></div>
        </div>
      </motion.div>
    </div>
  );
}