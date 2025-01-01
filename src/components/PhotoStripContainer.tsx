import { useState, useEffect, useRef } from 'react';
import { PhotoStrip } from './PhotoStrip';

export function PhotoStripContainer() {
  const [strips, setStrips] = useState<number[]>([]);
  const [nextId, setNextId] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const resizeTimeout = useRef<number>();

  const calculateStripCount = () => {
    const width = window.innerWidth;
    
    // No strips on mobile
    if (width < 640) return 0;
    
    // 2 strips on small tablets
    if (width < 768) return 2;
    
    // 3 strips on tablets
    if (width < 1024) return 3;
    
    // 4 strips on smaller desktops
    if (width < 1280) return 4;
    
    // Maximum 6 strips on large screens
    return 6;
  };

  const updateStripCount = () => {
    if (isUpdating) return;
    setIsUpdating(true);

    const targetCount = calculateStripCount();
    const currentCount = strips.length;

    if (currentCount < targetCount) {
      // Add new strips
      const newStrips = Array.from({ length: targetCount - currentCount }, (_, i) => nextId + i);
      setStrips(current => [...current, ...newStrips]);
      setNextId(nextId + targetCount - currentCount);
    } else if (currentCount > targetCount) {
      // Remove excess strips
      setStrips(current => current.slice(0, targetCount));
    }

    setIsUpdating(false);
  };

  // Run on mount and when window resizes
  useEffect(() => {
    updateStripCount();
    const handleResize = () => {
      // Debounce resize updates
      if (resizeTimeout.current) {
        window.clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = window.setTimeout(updateStripCount, 250);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout.current) {
        window.clearTimeout(resizeTimeout.current);
      }
    };
  }, []);

  const removeStrip = (index: number) => {
    if (isUpdating) return;
    
    setStrips(current => {
      const newStrips = current.filter(i => i !== index);
      const targetCount = calculateStripCount();
      
      // Only add a new strip if we're below target count
      if (newStrips.length < targetCount) {
        setNextId(prev => prev + 1);
        return [...newStrips, nextId];
      }
      return newStrips;
    });
  };

  return (
    <>
      {strips.map(index => (
        <PhotoStrip 
          key={index} 
          index={index} 
          onRemove={() => removeStrip(index)}
        />
      ))}
    </>
  );
} 