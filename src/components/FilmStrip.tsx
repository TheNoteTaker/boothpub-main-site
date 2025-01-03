import { motion } from 'framer-motion';

const images = [
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80',
];

export function FilmStrip() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-64">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
      
      {/* Film strip container */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="relative overflow-hidden whitespace-nowrap bg-[#2F505F] h-48 shadow-xl film-grain border-t border-b border-black/30">
          <div className="inline-flex animate-scroll">
            {[...images, ...images, ...images].map((src, index) => (
              <div
                key={index}
                className="relative inline-block w-72 overflow-hidden"
              >
                {/* Film strip frame */}
                <div className="h-48 px-1 border-r border-black/30">
                  {/* Top sprocket holes */}
                  <div className="h-5 flex items-center justify-between px-2">
                    {[0, 1, 2].map((i) => (
                      <div 
                        key={`hole-top-${i}`} 
                        className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"
                      ></div>
                    ))}
                  </div>
                  
                  {/* Photo area */}
                  <div className="relative h-38">
                    <img
                      src={src}
                      alt={`Event photo ${(index % images.length) + 1}`}
                      className="object-cover w-full h-full brightness-90 group-hover:brightness-110 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-50"></div>
                  </div>

                  {/* Bottom sprocket holes */}
                  <div className="h-5 flex items-center justify-between px-2">
                    {[0, 1, 2].map((i) => (
                      <div 
                        key={`hole-bottom-${i}`} 
                        className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}