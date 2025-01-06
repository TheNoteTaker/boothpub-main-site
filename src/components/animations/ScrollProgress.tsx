import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animation transition points (0%, 33%, 66%, 100%)
  const transitionPoints = [0, 0.33, 0.66, 1];

  return (
    <>
      {/* Container that spans the entire section */}
      <div ref={containerRef} className="absolute inset-0" />
      
      {/* Progress bar container */}
      <div 
        ref={progressRef}
        className="absolute z-[100] right-12 w-[2px] h-full top-0 pointer-events-none"
      >
        <div className="sticky top-0 h-screen flex items-center">
          <div className="relative w-full h-[60vh]">
            {/* Background bar */}
            <div className="absolute inset-0 bg-[#2F505F]/10 rounded-full" />
            
            {/* Active progress bar */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#D75E1F] rounded-full"
              style={{
                scaleY: scrollYProgress,
                height: "100%",
                transformOrigin: "top"
              }}
            />
            
            {/* Section markers */}
            {transitionPoints.map((point, i) => (
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
                    scale: useTransform(
                      scrollYProgress,
                      [point - 0.01, point],
                      [0, 1]
                    ),
                  }}
                />
                
                {/* Border circle */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#D75E1F] origin-center"
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [point - 0.01, point],
                      [0, 1]
                    ),
                    scale: useTransform(
                      scrollYProgress,
                      [point - 0.01, point, point + 0.01],
                      [0.8, 1, 1]
                    )
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