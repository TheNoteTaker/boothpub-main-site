import { useRef, useEffect, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

const PHOTOS = [
  "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=300&h=500&fit=crop",
  "https://images.unsplash.com/photo-1630567804048-5f4ffa2ff0e7?w=300&h=500&fit=crop",
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=500&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=500&fit=crop",
  "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=500&fit=crop",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=500&fit=crop",
];

const SCROLL_SPEED = 1;

export function PhotoStripCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useAnimationFrame(() => {
    if (!containerRef.current) return;
    
    scrollRef.current += SCROLL_SPEED;
    
    // Reset when we've scrolled one full width
    if (scrollRef.current >= containerRef.current.scrollWidth / 2) {
      scrollRef.current = 0;
    }
    
    containerRef.current.scrollLeft = scrollRef.current;
  });

  return (
    <motion.div 
      className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden bg-gradient-to-t from-white/80 to-transparent z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        ref={containerRef}
        className="flex gap-2 whitespace-nowrap overflow-x-hidden py-2"
        style={{ width: '200%' }} // Double width for seamless loop
      >
        <div className="inline-flex">
          {PHOTOS.map((src, i) => (
            <div 
              key={`strip-1-${i}`} 
              className="relative w-16 group"
            >
              <div className="h-24 bg-white rounded shadow-md overflow-hidden border-2 border-white transform-gpu transition-all duration-300">
                <img
                  src={src}
                  alt={`Event photo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 left-0 right-0 flex justify-between px-1">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="inline-flex">
          {PHOTOS.map((src, i) => (
            <div 
              key={`strip-2-${i}`} 
              className="relative w-16 group"
            >
              <div className="h-24 bg-white rounded shadow-md overflow-hidden border-2 border-white transform-gpu transition-all duration-300">
                <img
                  src={src}
                  alt={`Event photo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 left-0 right-0 flex justify-between px-1">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}