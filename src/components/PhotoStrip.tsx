import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PhotoStripProps {
  index: number;
}

export function PhotoStrip({ index }: PhotoStripProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [constraints, setConstraints] = useState({ right: 0, bottom: 0 });
  
  // Generate random initial position
  useEffect(() => {
    const updateDimensions = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
      const height = typeof window !== 'undefined' ? window.innerHeight : 800;
      
      setConstraints({
        right: width * 0.8,
        bottom: height * 0.6
      });
      
      setPosition({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.6
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, rotate: Math.random() * 30 - 15 }}
      animate={[
        {
          opacity: 0.8,
          x: [position.x - 5, position.x + 5],
          y: [position.y - 5, position.y + 5],
          rotate: Math.random() * 30 - 15
        },
        {
          transition: {
            x: {
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            y: {
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }
        }
      ]}
      whileHover={{
        scale: 1.1,
        opacity: 1,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      whileDrag={{
        scale: 1.2,
        opacity: 1,
        transition: { duration: 0.2 }
      }}
      drag
      dragConstraints={{
        top: 0,
        left: 0,
        right: constraints.right,
        bottom: constraints.bottom
      }}
      className="absolute cursor-pointer"
    >
      <div className="w-16 h-48 bg-white rounded-md shadow-lg overflow-hidden border-4 border-white">
        <div className="h-1/3 bg-[#F9CC9A] mb-1"></div>
        <div className="h-1/3 bg-[#D75E1F] mb-1"></div>
        <div className="h-1/3 bg-[#2F505F]"></div>
      </div>
    </motion.div>
  );
}