import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end -5%"]
  });

  // Calculate section progress points based on total sections
  const totalSections = 5; // Header + 4 benefits
  const sectionHeight = 1 / totalSections;
  
  // Create transition points that match section animations
  const transitionPoints = Array.from({ length: totalSections + 1 }, (_, i) => {
    const progress = i * sectionHeight;
    return {
      point: progress,
      active: useTransform(
        scrollYProgress,
        [
          Math.max(0, progress - 0.02),
          Math.max(0, progress + 0.03),
          Math.min(1, progress + sectionHeight - 0.05),
          Math.min(1, progress + sectionHeight)
        ],
        [0, 1, 1, 0]
      )
    };
  });

  return (
    <>
      <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
      
      <div ref={progressRef} className="w-2 h-full mx-auto">
        <div className="sticky top-0 h-screen flex items-center">
          <div className="relative w-2 h-[60vh]">
            {/* Background bar */}
            <div className="absolute inset-0 bg-[#2F505F]/10 rounded-full" />
            
            {/* Active progress bar */}
            <motion.div
              className="absolute top-0 left-0 w-2 bg-[#D75E1F] rounded-full"
              style={{
                scaleY: scrollYProgress,
                height: "100%",
                transformOrigin: "top"
              }}
            />
            
            {/* Section markers */}
            {transitionPoints.map(({ point, active }, i) => (
              <div 
                key={i} 
                className="absolute w-3 h-3 left-1/2 -translate-x-1/2" 
                style={{ top: `${point * 100}%` }}
              >
                {/* Background circle */}
                <div className="absolute inset-0 rounded-full bg-white border border-[#2F505F]/20" />
                
                {/* Fill circle */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#D75E1F] origin-center"
                  style={{
                    scale: active
                  }}
                />
                
                {/* Border circle */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#D75E1F] origin-center"
                  style={{
                    opacity: active,
                    scale: useTransform(active, [0, 1], [0.8, 1])
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 