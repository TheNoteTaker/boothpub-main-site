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
  const [nextId, setNextId] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const targetCount = useRef<number>(4);

  const calculateStripCount = useCallback(() => {
    if (typeof window === 'undefined') return 4;
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    if (width < 1280) return 4;
    return 6;
  }, []);

  const createNewStrip = useCallback(() => {
    if (typeof window === 'undefined') return { id: 0, initialX: 0, initialY: 0, rotation: 0 };
    return {
      id: nextId,
      initialX: Math.random() * (window.innerWidth * 0.95),
      initialY: Math.random() * (window.innerHeight * 0.6),
      rotation: (Math.random() - 0.5) * 30
    };
  }, [nextId]);

  // Initialize strips only once after mount
  useEffect(() => {
    if (isInitialized) return;
    
    targetCount.current = calculateStripCount();
    const initialStrips = Array.from(
      { length: targetCount.current },
      (_, index) => ({
        id: index,
        initialX: Math.random() * (window.innerWidth * 0.95),
        initialY: Math.random() * (window.innerHeight * 0.6),
        rotation: (Math.random() - 0.5) * 30
      })
    );
    
    setStrips(initialStrips);
    setNextId(targetCount.current);
    setIsInitialized(true);

    const handleResize = () => {
      const newCount = calculateStripCount();
      if (newCount !== targetCount.current) {
        targetCount.current = newCount;
        // Adjust strip count if needed
        setStrips(current => {
          if (current.length > newCount) {
            return current.slice(0, newCount);
          }
          if (current.length < newCount) {
            const additionalStrips = Array.from(
              { length: newCount - current.length },
              (_, index) => ({
                id: nextId + index,
                initialX: Math.random() * (window.innerWidth * 0.95),
                initialY: Math.random() * (window.innerHeight * 0.6),
                rotation: (Math.random() - 0.5) * 30
              })
            );
            setNextId(nextId + additionalStrips.length);
            return [...current, ...additionalStrips];
          }
          return current;
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateStripCount, isInitialized]);

  const removeStrip = useCallback((stripId: number) => {
    setStrips(current => {
      const remainingStrips = current.filter(strip => strip.id !== stripId);
      
      // Create one new strip to replace the removed one
      const newStrip = {
        id: nextId,
        initialX: Math.random() * (window.innerWidth * 0.95),
        initialY: Math.random() * (window.innerHeight * 0.6),
        rotation: (Math.random() - 0.5) * 30
      };
      
      setNextId(prev => prev + 1);
      return [...remainingStrips, newStrip];
    });
  }, [nextId]);

  // Don't render during SSR
  if (typeof window === 'undefined') return null;

  return (
    <>
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
    </>
  );
} 