import { motion } from 'framer-motion';

const images = [
  '/assets/photos/events/booth/event-1.jpg',
  '/assets/photos/events/booth/event-2.jpg',
  '/assets/photos/events/booth/event-3.jpg',
  '/assets/photos/events/booth/event-4.jpg',
  '/assets/photos/events/booth/event-5.jpg',
];

export function FilmStrip() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[25vh] sm:h-[28vh] md:h-[30vh] lg:h-[32vh] max-h-[320px]">
      {/* Container with responsive height */}
      <div className="absolute bottom-0 left-0 right-0 h-[94%]">
        {/* Main film strip */}
        <div className="relative h-full bg-black/30 shadow-lg film-grain overflow-hidden">
          {/* Borders */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-black/20 z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/20 z-10" />
          
          {/* Scrolling content container */}
          <div className="h-full flex items-center">
            <div className="inline-flex animate-scroll whitespace-nowrap h-[98%]">
            {[...images, ...images, ...images].map((src, index) => {
              // Create a unique key by combining the image index and its position in the repeated sequence
              const uniqueKey = `${index % images.length}-${Math.floor(index / images.length)}`;
              return (
                <div
                  key={uniqueKey}
                  className="relative inline-block h-full"
                  style={{
                    width: 'clamp(200px, 25vw, 360px)'
                  }}
                >
                  <div className="h-full px-0.5 relative">
                    {/* Right border */}
                    <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-black/20" />
                    
                    {/* Content structure with proportional heights */}
                    <div className="flex flex-col h-full justify-between">
                      {/* Top sprocket holes */}
                      <div className="h-[6%] flex items-center justify-between px-[12%]">
                        {[0, 1].map((i) => (
                          <div 
                            key={`hole-top-${i}`} 
                            className="w-[0.3em] h-[0.3em] rounded-full bg-black/25 shrink-0"
                          />
                        ))}
                      </div>
                      
                      {/* Photo area - with proportional height */}
                      <div className="h-[88%] relative">
                        <div className="absolute inset-0 p-[1%]">
                          <div className="relative w-full h-full overflow-hidden">
                            <img
                              src={src.src || src}
                              alt="Event photo in film strip"
                              className="object-cover w-full h-full brightness-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-50" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom sprocket holes */}
                      <div className="h-[6%] flex items-center justify-between px-[12%]">
                        {[0, 1].map((i) => (
                          <div 
                            key={`hole-bottom-${i}`} 
                            className="w-[0.3em] h-[0.3em] rounded-full bg-black/25 shrink-0"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}