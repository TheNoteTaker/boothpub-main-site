import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const FLOAT_RANGE = 40;
const ROTATION_RANGE = 15;
const ANIMATION_DURATION = 20;

const COLOR_SCHEMES = [
  ['bg-[#2F505F]', 'bg-[#D75E1F]', 'bg-[#F9CC9A]'],
  ['bg-[#D75E1F]', 'bg-[#F9CC9A]', 'bg-[#2F505F]'],
  ['bg-[#F9CC9A]', 'bg-[#2F505F]', 'bg-[#D75E1F]']
];

interface PhotoStripProps {
  index: number;
  className?: string;
  onRemove?: () => void;
}

export function PhotoStrip({ index, className, onRemove }: PhotoStripProps) {
  const controls = useAnimation();
  const baseX = useRef(0);
  const baseY = useRef(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [colorScheme] = useState(COLOR_SCHEMES[index % COLOR_SCHEMES.length]);
  const elementRef = useRef<HTMLDivElement>(null);
  
  const handleClick = async () => {
    if (isFlashing) return; // Prevent double-clicks
    
    // Stop the floating animation immediately
    await controls.stop();
    
    setIsFlashing(true);
    try {
      await controls.start({
        scale: [1, 1.2, 0],
        opacity: [1, 1, 0],
        transition: { duration: 0.5, ease: "easeOut" }
      });
      // Only call onRemove after animation is complete
      onRemove?.();
    } catch (error) {
      // Animation was interrupted, still remove the strip
      onRemove?.();
    }
  };

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector('.hero-container');
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const width = containerRect.width;
      const height = containerRect.height;
      
      // Define the content exclusion zone (center area)
      const contentZone = {
        left: width * 0.2,    // 20% from left
        right: width * 0.8,   // 20% from right
        top: height * 0.2,    // 20% from top
        bottom: height * 0.7  // 30% from bottom (to account for buttons)
      };
      
      // Define the available zones for photo strips
      const zones = [
        // Top zone
        { x: [0, width], y: [0, contentZone.top] },
        // Bottom zone (above carousel)
        { x: [0, width], y: [contentZone.bottom, height - 180] }, // 180px from bottom to stay above carousel
        // Left zone
        { x: [0, contentZone.left], y: [contentZone.top, contentZone.bottom] },
        // Right zone
        { x: [contentZone.right, width], y: [contentZone.top, contentZone.bottom] }
      ];

      // Select a random zone
      const zone = zones[Math.floor(Math.random() * zones.length)];
      
      // Get random position within the selected zone
      baseX.current = zone.x[0] + (Math.random() * (zone.x[1] - zone.x[0]));
      baseY.current = zone.y[0] + (Math.random() * (zone.y[1] - zone.y[0]));

      startAnimation();
    };

    const startAnimation = () => {
      const randomRotation = Math.random() * 90 - 45;
      
      // First set initial position instantly
      controls.start({
        x: baseX.current,
        y: baseY.current,
        rotate: randomRotation,
        transition: { duration: 0 }
      }).then(() => {
        // Then start the floating animation
        controls.start({
          x: [baseX.current, baseX.current + FLOAT_RANGE, baseX.current - FLOAT_RANGE, baseX.current],
          y: [baseY.current, baseY.current - FLOAT_RANGE, baseY.current + FLOAT_RANGE, baseY.current],
          rotate: [randomRotation, randomRotation + ROTATION_RANGE, randomRotation - ROTATION_RANGE, randomRotation],
          transition: {
            duration: ANIMATION_DURATION + (index * 2),
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            times: [0, 0.33, 0.66, 1]
          }
        });
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, [controls, index]);

  return (
    <motion.div
      ref={elementRef}
      animate={controls}
      initial={{ 
        opacity: 0, 
        scale: 0.9,
        x: baseX.current,
        y: baseY.current
      }}
      whileInView={{ 
        opacity: [0, 1],
        scale: [0.9, 1],
        transition: { duration: 0.8, ease: "easeOut" }
      }}
      whileHover={{ 
        scale: 1.15,
        transition: { duration: 0.4 }
      }}
      style={{
        position: 'absolute'
      }}
      onClick={handleClick}
      className={`cursor-pointer z-10 touch-none select-none ${className || ''}`}
    >
      <div className="w-16 h-48 bg-white rounded-md shadow-lg overflow-hidden border-4 border-white transform-gpu hover:shadow-xl transition-all duration-300 hover:border-[#F9CC9A] relative">
        {isFlashing && (
          <div className="absolute inset-0 bg-white animate-[flash_500ms_ease-out] pointer-events-none z-50" />
        )}
        <div className={`h-1/3 ${colorScheme[0]} mb-1`}></div>
        <div className={`h-1/3 ${colorScheme[1]} mb-1`}></div>
        <div className={`h-1/3 ${colorScheme[2]}`}></div>
      </div>
    </motion.div>
  );
}