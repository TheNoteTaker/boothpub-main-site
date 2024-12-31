import { motion, useAnimation, useSpring, type AnimationControls } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const MOUSE_INFLUENCE_RADIUS = 250;
const PUSH_STRENGTH = 30;
const SPRING_CONFIG = { stiffness: 40, damping: 15 };

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
      
      // Keep strips within container bounds
      const margin = 100; // Prevent strips from touching edges
      const maxX = width - margin;
      const maxY = height - margin;
      
      baseX.current = margin + (Math.random() * (maxX - margin * 2));
      baseY.current = margin + (Math.random() * (maxY - margin * 2));
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    controls.start({
      x: [baseX.current, baseX.current + Math.random() * 40 - 20],
      y: [baseY.current, baseY.current + Math.random() * 40 - 20],
      rotate: [0, Math.random() * 30 - 15],
      transition: {
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    });
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, [controls]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const container = containerRef.current;
      const rect = container?.getBoundingClientRect();
      
      if (!rect) return;

      // Convert mouse position to container coordinates
      const relativeX = mouseX - rect.left;
      const relativeY = mouseY - rect.top;
      
      // Calculate distance from mouse to strip
      const dx = relativeX - baseX.current;
      const dy = relativeY - baseY.current;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < MOUSE_INFLUENCE_RADIUS) {
        const influence = Math.pow(1 - (distance / MOUSE_INFLUENCE_RADIUS), 2);
        
        // Push away from mouse with smooth falloff
        mouseXSpring.set(-dx * influence * PUSH_STRENGTH);
        mouseYSpring.set(-dy * influence * PUSH_STRENGTH);
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
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ 
          opacity: [0, 0.8],
          scale: [0.8, 1],
          transition: { duration: 0.8, ease: "easeOut" }
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
        <div className="w-16 h-48 bg-white rounded-md shadow-lg overflow-hidden border-4 border-white transform-gpu hover:shadow-xl transition-all duration-300">
          <div className="h-1/3 bg-[#F9CC9A] mb-1"></div>
          <div className="h-1/3 bg-[#D75E1F] mb-1"></div>
          <div className="h-1/3 bg-[#2F505F]"></div>
        </div>
      </motion.div>
    </div>
  );
}