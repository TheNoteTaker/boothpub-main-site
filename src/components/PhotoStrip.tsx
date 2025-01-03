import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const FLOAT_RANGE = 20;
const ROTATION_RANGE = 10;
const ANIMATION_DURATION = 30;

const COLOR_SCHEMES = [
  ['bg-[#2F505F]', 'bg-[#D75E1F]', 'bg-[#F9CC9A]'],
  ['bg-[#D75E1F]', 'bg-[#F9CC9A]', 'bg-[#2F505F]'],
  ['bg-[#F9CC9A]', 'bg-[#2F505F]', 'bg-[#D75E1F]']
];

interface PhotoStripProps {
  index: number;
  initialX: number;
  initialY: number;
  initialRotation: number;
  className?: string;
  onRemove?: () => void;
}

export function PhotoStrip({ index, initialX, initialY, initialRotation, className, onRemove }: PhotoStripProps) {
  const controls = useAnimation();
  const baseX = useRef(initialX);
  const baseY = useRef(initialY);
  const directionX = useRef(Math.random() > 0.5 ? 1 : -1);
  const directionY = useRef(Math.random() > 0.5 ? 1 : -1);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [colorScheme] = useState(COLOR_SCHEMES[index % COLOR_SCHEMES.length]);
  
  const handleClick = async () => {
    if (isRemoving) return;
    setIsRemoving(true);
    setIsFlashing(true);
    
    // Wait for flash animation
    await new Promise(resolve => setTimeout(resolve, 150));
    setIsFlashing(false);
    
    // Start removal animation
    await controls.start({
      scale: [1, 1.2, 0],
      opacity: [1, 1, 0],
      transition: { duration: 0.3, ease: "easeOut" }
    });
    
    onRemove?.();
  };

  const checkBoundaries = (x: number, y: number, containerRect: DOMRect) => {
    const stripWidth = 32;
    const stripHeight = 96;
    
    // Check horizontal boundaries
    if (x - stripWidth < 0 || x + stripWidth > containerRect.width) {
      directionX.current *= -1;
      return true;
    }
    
    // Check vertical boundaries
    if (y - stripHeight < 0 || y + stripHeight > containerRect.height * 0.85) {
      directionY.current *= -1;
      return true;
    }
    
    return false;
  };

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const moveSpeed = 0.05; // pixels per millisecond

    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      const container = document.querySelector('.hero-container');
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const movement = moveSpeed * deltaTime;
      
      const newX = baseX.current + (movement * directionX.current);
      const newY = baseY.current + (movement * directionY.current);
      
      if (checkBoundaries(newX, newY, containerRect)) {
        baseX.current = baseX.current + (movement * directionX.current * 0.5);
        baseY.current = baseY.current + (movement * directionY.current * 0.5);
      } else {
        baseX.current = newX;
        baseY.current = newY;
      }

      controls.set({
        x: baseX.current,
        y: baseY.current,
        rotate: initialRotation + (Math.sin(currentTime * 0.001) * ROTATION_RANGE)
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [controls, initialRotation]);

  return (
    <motion.div
      animate={controls}
      initial={{ 
        opacity: 0, 
        scale: 0.9, 
        x: initialX,
        y: initialY,
        rotate: initialRotation
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
        position: 'absolute',
        transform: `translate(-50%, -50%)`,
        pointerEvents: isRemoving ? 'none' : 'auto'
      }}
      onClick={handleClick}
      className={`cursor-pointer z-10 touch-none select-none ${className || ''}`}
    >
      <div className="w-16 h-48 bg-white rounded-md shadow-lg overflow-hidden border-4 border-white transform-gpu hover:shadow-xl transition-all duration-300 hover:border-[#F9CC9A] relative">
        <div className={`h-1/3 ${colorScheme[0]} mb-1`}></div>
        <div className={`h-1/3 ${colorScheme[1]} mb-1`}></div>
        <div className={`h-1/3 ${colorScheme[2]}`}></div>
        {isFlashing && (
          <div className="absolute inset-0 bg-white animate-flash pointer-events-none" />
        )}
      </div>
    </motion.div>
  );
}