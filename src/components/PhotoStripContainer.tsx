import { useState, useEffect, useCallback, useRef } from 'react';
import { PhotoStrip } from './PhotoStrip';

interface Strip {
  id: number;
  initialX: number;
  initialY: number;
  rotation: number;
}

export function PhotoStripContainer() {
  const [strips, setStrips] = useState<Strip[]>([]);
  const nextIdRef = useRef(0);
  const [isMounted, setIsMounted] = useState(false);
  const targetCount = useRef<number>(4);
  const isRemoving = useRef<Set<number>>(new Set());
  const pendingAdds = useRef<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRefs = useRef<Set<NodeJS.Timeout>>(new Set());

  const getNextId = useCallback(() => {
    nextIdRef.current += 1;
    return nextIdRef.current;
  }, []);

  const calculateStripCount = useCallback(() => {
    if (typeof window === 'undefined') return 4;
    const width = window.innerWidth;
    if (width < 640) return 2;
    if (width < 768) return 3;
    if (width < 1024) return 4;
    return 5;
  }, []);

  const createNewStrip = useCallback(() => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    
    return {
      id: getNextId(),
      initialX: rect.width * 0.2 + (Math.random() * rect.width * 0.6),
      initialY: rect.height * 0.2 + (Math.random() * rect.height * 0.4),
      rotation: (Math.random() - 0.5) * 30
    };
  }, [getNextId]);

  const addNewStrip = useCallback(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    if (pendingAdds.current.size > 0) return;
    
    const newStrip = createNewStrip();
    if (!newStrip) return;
    
    pendingAdds.current.add(newStrip.id);
    
    const timeout = setTimeout(() => {
      pendingAdds.current.delete(newStrip.id);
      setStrips(current => [...current, newStrip]);
    }, 200);
    
    timeoutRefs.current.add(timeout);
  }, [createNewStrip]);

  useEffect(() => {
    const initializeStrips = () => {
      if (!containerRef.current) return;
      
      const count = calculateStripCount();
      const newStrips: Strip[] = [];
      
      for (let i = 0; i < count; i++) {
        const strip = createNewStrip();
        if (strip) newStrips.push(strip);
      }
      
      setStrips(newStrips);
      setIsMounted(true);
    };

    // Small delay to ensure container is mounted
    const timeout = setTimeout(initializeStrips, 100);
    timeoutRefs.current.add(timeout);
    
    return () => {
      timeoutRefs.current.forEach(t => clearTimeout(t));
      timeoutRefs.current.clear();
    };
  }, [calculateStripCount, createNewStrip]);

  // Handle window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const newCount = calculateStripCount();
      if (newCount !== targetCount.current) {
        targetCount.current = newCount;
        setStrips(current => {
          if (current.length > newCount) {
            return current.slice(0, newCount);
          }
          if (current.length < newCount) {
            const additionalStrips: Strip[] = [];
            for (let i = 0; i < newCount - current.length; i++) {
              const strip = createNewStrip();
              if (strip) additionalStrips.push(strip);
            }
            return [...current, ...additionalStrips];
          }
          return current;
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateStripCount, createNewStrip]);

  const removeStrip = useCallback((stripId: number) => {
    if (!containerRef.current) return;
    if (isRemoving.current.has(stripId)) return;
    
    isRemoving.current.add(stripId);
    
    setStrips(current => {
      const remainingStrips = current.filter(strip => strip.id !== stripId);
      
      if (remainingStrips.length < calculateStripCount()) {
        addNewStrip();
      }
      
      const timeout = setTimeout(() => {
        isRemoving.current.delete(stripId);
      }, 300);
      
      timeoutRefs.current.add(timeout);
      
      return remainingStrips;
    });
  }, [addNewStrip, calculateStripCount]);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(t => clearTimeout(t));
      timeoutRefs.current.clear();
    };
  }, []);

  // Show loading state while calculating initial positions
  if (!isMounted) {
    return (
      <div 
        className="w-full h-full bg-transparent" 
        aria-label="Loading photo strips..."
      />
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {strips.map(strip => (
        <PhotoStrip 
          key={strip.id}
          index={strip.id}
          initialX={strip.initialX}
          initialY={strip.initialY}
          initialRotation={strip.rotation}
          onRemove={() => removeStrip(strip.id)}
        />
      ))}
    </div>
  );
}