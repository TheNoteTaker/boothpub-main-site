import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const images = [
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80',
];

export function PhotoStripCarousel() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-white via-white to-transparent">
      <div className="relative overflow-hidden whitespace-nowrap bg-[#2F505F] h-36 shadow-xl film-grain">
        <div className="inline-flex animate-scroll">
          {[...images, ...images, ...images].map((src, index) => (
            <div
              key={index}
              className="relative inline-block w-48 overflow-hidden"
            >
              {/* Film strip frame */}
              <div className="h-36 px-2">
                {/* Top sprocket holes */}
                <div className="h-6 flex items-center justify-between px-1">
                  {[0, 1, 2].map((i) => (
                    <div 
                      key={`hole-top-${i}`} 
                      className="w-2 h-2 rounded-full bg-white/20 shrink-0"
                    ></div>
                  ))}
                </div>
                
                {/* Photo area */}
                <div className="relative h-24">
                  <img
                    src={src}
                    alt={`Event photo ${(index % images.length) + 1}`}
                    className="object-cover w-full h-full brightness-90 group-hover:brightness-110 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-50"></div>
                </div>

                {/* Bottom sprocket holes */}
                <div className="h-6 flex items-center justify-between px-1">
                  {[0, 1, 2].map((i) => (
                    <div 
                      key={`hole-bottom-${i}`} 
                      className="w-2 h-2 rounded-full bg-white/20 shrink-0"
                    ></div>
                  ))}
                </div>

                {/* Vertical divider */}
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-black/20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}