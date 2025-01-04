import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Placeholder icons - more human-like and happy faces
const FACES = [
  // Happy face with hair
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1.5c4.14 0 7.5 3.36 7.5 7.5 0 4.14-3.36 7.5-7.5 7.5-4.14 0-7.5-3.36-7.5-7.5 0-4.14 3.36-7.5 7.5-7.5zM12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm5 10H7c.55 2.5 2.37 4.5 5 4.5s4.45-2 5-4.5zm-2.5-4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  // Beaming face with smiling eyes
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm-4 7c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm8 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-4 6c2.21 0 4-1.79 4-4h-8c0 2.21 1.79 4 4 4z',
  // Grinning face with big eyes
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm-5 6c-.83 0-1.5.67-1.5 1.5S6.17 13 7 13s1.5-.67 1.5-1.5S7.83 10 7 10zm10 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-5 4c-2.33 0-4.31 1.46-5.11 3.5h10.22c-.8-2.04-2.78-3.5-5.11-3.5z',
  // Smiling face with halo
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm0 2c-2.21 0-4 1.79-4 4h8c0-2.21-1.79-4-4-4zm-4 6c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm8 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z',
  // Happy face with hearts
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm-5 7c-.83 0-1.5.67-1.5 1.5S6.17 13 7 13s1.5-.67 1.5-1.5S7.83 11 7 11zm10 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-5 4c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z'
];

// Add more variations as needed until we reach 20
const ALL_FACES = [...FACES, ...FACES, ...FACES, ...FACES].slice(0, 20);

const COLOR_SCHEMES = [
  ['bg-[#2F505F]', 'bg-[#D75E1F]', 'bg-[#F9CC9A]'],
  ['bg-[#D75E1F]', 'bg-[#F9CC9A]', 'bg-[#2F505F]'],
  ['bg-[#F9CC9A]', 'bg-[#2F505F]', 'bg-[#D75E1F]']
];

// Function to get contrasting color for each background
const getContrastColor = (bgClass: string) => {
  switch (bgClass) {
    case 'bg-[#2F505F]': return '#F9CC9A';
    case 'bg-[#D75E1F]': return '#F9CC9A';
    case 'bg-[#F9CC9A]': return '#2F505F';
    default: return '#2F505F';
  }
};

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
  const stripRef = useRef<HTMLDivElement>(null);
  
  // Generate random faces for this strip
  const [faces] = useState(() => {
    const selectedFaces = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * ALL_FACES.length);
      selectedFaces.push(ALL_FACES[randomIndex]);
    }
    return selectedFaces;
  });
  
  const handleClick = async () => {
    if (isRemoving || !stripRef.current) return;
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
    const stripWidth = 32; // Half of the actual width (64px)
    const stripHeight = stripRef.current?.offsetHeight || 96;
    
    // Check horizontal boundaries with wider range
    if (x - stripWidth < -16 || x + stripWidth > containerRect.width + 16) {
      directionX.current *= -1;
      return true;
    }
    
    // Check vertical boundaries
    if (y - stripHeight/2 < 0 || y + stripHeight/2 > containerRect.height * 0.85) {
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
      if (!container || !stripRef.current) return;
      
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
        rotate: initialRotation + (Math.sin(currentTime * 0.001) * 10)
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
      ref={stripRef}
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
      <div className="w-16 md:w-20 h-48 md:h-56 bg-white rounded-md shadow-lg overflow-hidden border-4 border-white transform-gpu hover:shadow-xl transition-all duration-300 hover:border-[#F9CC9A] relative opacity-70">
        {faces.map((face, idx) => (
          <div key={idx} className={`h-1/3 ${colorScheme[idx]} mb-1 relative`}>
            <svg
              viewBox="0 0 24 24"
              className="absolute inset-0 w-full h-full p-2"
              style={{
                fill: getContrastColor(colorScheme[idx]),
                opacity: 0.9
              }}
            >
              <path d={face} />
            </svg>
          </div>
        ))}
        {isFlashing && (
          <div className="absolute inset-0 bg-white animate-flash pointer-events-none" />
        )}
      </div>
    </motion.div>
  );
}