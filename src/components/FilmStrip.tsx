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
    <div className="absolute bottom-0 left-0 right-0 h-[15vh] sm:h-[18vh] md:h-[20vh] lg:h-[22vh] max-h-[180px] mb-8">
      {/* Container with responsive height */}
      <div className="absolute bottom-0 left-0 right-0 h-full">
        {/* Main film strip */}
        <div className="relative h-full bg-[#2F505F]/80 shadow-lg film-grain overflow-hidden">
          {/* Borders */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-black/20 z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/20 z-10" />
          
          {/* Scrolling content container */}
          <div className="h-full py-[1%]">
            <div className="inline-flex animate-scroll whitespace-nowrap h-full">
              {[...images, ...images, ...images].map((src, index) => (
                <div
                  key={index}
                  className="relative inline-block h-full"
                  style={{
                    width: 'clamp(160px, 20vw, 280px)'
                  }}
                >
                  <div className="h-full px-0.5 relative">
                    {/* Right border */}
                    <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-black/20" />
                    
                    {/* Content structure with proportional heights */}
                    <div className="flex flex-col h-full">
                      {/* Top sprocket holes */}
                      <div className="h-[12%] flex items-center justify-between px-[12%]">
                        {[0, 1].map((i) => (
                          <div 
                            key={`hole-top-${i}`} 
                            className="w-[0.45em] h-[0.45em] rounded-full bg-black/25 shrink-0"
                          />
                        ))}
                      </div>
                      
                      {/* Photo area - with proportional height */}
                      <div className="h-[76%] relative">
                        <div className="absolute inset-0 p-[1%]">
                          <div className="relative w-full h-full overflow-hidden">
                            <img
                              src={src}
                              alt={`Event photo ${(index % images.length) + 1}`}
                              className="object-cover w-full h-full brightness-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-50" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom sprocket holes */}
                      <div className="h-[12%] flex items-center justify-between px-[12%]">
                        {[0, 1].map((i) => (
                          <div 
                            key={`hole-bottom-${i}`} 
                            className="w-[0.45em] h-[0.45em] rounded-full bg-black/25 shrink-0"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}