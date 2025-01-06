import { motion } from 'framer-motion';
import type { ComponentProps } from 'react';

// Define the image type
interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Define a type-safe Image component
function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  ...props 
}: ComponentProps<'img'> & { width: number; height: number }) {
  // Only optimize internal images
  const optimizedSrc = src.startsWith('/')
    ? `/_image?href=${encodeURIComponent(src)}&w=${width}&h=${height}&f=webp&q=85`
    : src;

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={className}
      {...props}
    />
  );
}

const BRAND_COLORS = {
  navy: '#2F505F',
  orange: '#D75E1F',
  cream: '#F9CC9A'
};

// These will be replaced with real photos once available
const temporaryPhotos: ImageData[] = [
  {
    src: 'https://picsum.photos/seed/boothpub1/360/480',
    alt: 'Happy guests enjoying our photo booth at event 1',
    width: 360,
    height: 480
  },
  {
    src: 'https://picsum.photos/seed/boothpub2/360/480',
    alt: 'Friends taking photos in our booth at event 2',
    width: 360,
    height: 480
  },
  {
    src: 'https://picsum.photos/seed/boothpub3/360/480',
    alt: 'Group celebration at photo booth event 3',
    width: 360,
    height: 480
  },
  {
    src: 'https://picsum.photos/seed/boothpub4/360/480',
    alt: 'Guests having fun at photo booth event 4',
    width: 360,
    height: 480
  },
  {
    src: 'https://picsum.photos/seed/boothpub5/360/480',
    alt: 'Party atmosphere at photo booth event 5',
    width: 360,
    height: 480
  }
];

export function FilmStrip() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[25vh] sm:h-[28vh] md:h-[30vh] lg:h-[32vh] max-h-[320px] bg-black/5">
      {/* Container with responsive height */}
      <div className="absolute bottom-0 left-0 right-0 h-[94%]">
        {/* Main film strip */}
        <div className="relative h-full bg-black/30 shadow-lg film-grain overflow-hidden">
          {/* Borders */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-black/20 z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/20 z-10" />
          
          {/* Scrolling content container */}
          <div className="h-full flex items-center overflow-hidden">
            <div className="flex animate-scroll whitespace-nowrap h-[98%] gap-0.5">
            {[...temporaryPhotos, ...temporaryPhotos, ...temporaryPhotos].map((photo, index) => {
              const uniqueKey = `${index % temporaryPhotos.length}-${Math.floor(index / temporaryPhotos.length)}`;
              return (
                <div
                  key={uniqueKey}
                  className="relative inline-block h-full shrink-0"
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
                          <div className="relative w-full h-full overflow-hidden rounded-sm">
                            <OptimizedImage
                              {...photo}
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