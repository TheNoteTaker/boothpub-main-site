import { useState, useEffect } from 'react';
import { PhotoStrip } from './PhotoStrip';

export function PhotoStripContainer() {
  const [strips, setStrips] = useState<number[]>([]);

  const calculateStripCount = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const area = width * height;
    
    // Base the count on screen area with some reasonable limits
    if (width < 640) return 0; // No strips on mobile
    if (width < 768) return 4; // Minimal strips on small tablets
    if (width < 1024) return 8; // More on larger tablets
    
    // For desktop, use a formula based on screen area
    const count = Math.floor(area / (200 * 200)); // One strip per 200x200px area
    return Math.min(Math.max(count, 8), 24); // Min 8, max 24 strips
  };

  const updateStripCount = () => {
    const newCount = calculateStripCount();
    setStrips(Array.from({ length: newCount }, (_, i) => i));
  };

  useEffect(() => {
    updateStripCount();
    window.addEventListener('resize', updateStripCount);
    return () => window.removeEventListener('resize', updateStripCount);
  }, []);

  const removeStrip = (index: number) => {
    setStrips(current => current.filter(i => i !== index));
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