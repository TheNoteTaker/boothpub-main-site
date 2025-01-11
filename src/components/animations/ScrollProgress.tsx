import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end -10%"]
  });

  // Calculate section progress points based on total sections
  const totalSections = 5; // Header + 4 benefits
  const sectionHeight = 1 / totalSections;
  
  // Create transition points that match section animations
  const transitionPoints = Array.from({ length: totalSections + 1 }, (_, i) => {
    const progress = i * sectionHeight;
    const isLast = i === totalSections;

    // Special handling for the last point
    if (isLast) {
      return {
        point: progress,
        active: useTransform(
          scrollYProgress,
          [
            0.85, // Start highlighting near the end
            0.9,  // Fully highlighted
            0.95, // Stay highlighted
            1     // Stay highlighted until the very end
          ],
          [0, 1, 1, 1]
        )
      };
    }

    return {
      point: progress,
      active: useTransform(
        scrollYProgress,
        [
          Math.max(0, progress - 0.05),
          Math.max(0, progress),
          Math.min(0.9, progress + sectionHeight * 0.6),
          Math.min(0.95, progress + sectionHeight * 0.8)
        ],
        [0, 1, 1, 0]
      )
    };
  });

  // Clamp the progress to stop at the last section
  const clampedProgress = useTransform(
    scrollYProgress,
    [0, 0.95, 1],
    [0, 1, 1]
  );

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
              className="absolute top-0 left-0 w-2 bg-[#D75E1F] rounded-full origin-top"
              style={{
                scaleY: clampedProgress,
                height: "100%"
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