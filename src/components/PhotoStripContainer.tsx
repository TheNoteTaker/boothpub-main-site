import { useState, useEffect } from 'react';
import { PhotoStrip } from './PhotoStrip';

interface StripData {
  id: number;
  initialX: number;
  initialY: number;
  rotation: number;
}

export function PhotoStripContainer() {
  const [strips, setStrips] = useState<StripData[]>([]);
  const [nextId, setNextId] = useState(0);

  const calculateStripCount = () => {
    const width = window.innerWidth;
    
    // Progressive scaling based on screen width
    if (width < 640) return 0; // Mobile: no strips
    if (width < 768) return 2; // Small tablets: 2 strips
    if (width < 1024) return 3; // Tablets: 3 strips
    if (width < 1280) return 4; // Small desktop: 4 strips
    return 6; // Large desktop: max 6 strips
  };

  const getRandomPosition = () => {
    const container = document.querySelector('.hero-container');
    if (!container) return { x: 0, y: 0 };

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Define the content exclusion zone (center area)
    const contentZone = {
      left: width * 0.2,
      right: width * 0.8,
      top: height * 0.2,
      bottom: height * 0.7
    };

    // Define available zones
    const zones = [
      // Top zone
      { x: [0, width], y: [0, contentZone.top] },
      // Bottom zone
      { x: [0, width], y: [contentZone.bottom, height * 0.85] },
      // Left zone
      { x: [0, contentZone.left], y: [contentZone.top, contentZone.bottom] },
      // Right zone
      { x: [contentZone.right, width], y: [contentZone.top, contentZone.bottom] }
    ];

    // Select a random zone
    const zone = zones[Math.floor(Math.random() * zones.length)];
    return {
      x: zone.x[0] + (Math.random() * (zone.x[1] - zone.x[0])),
      y: zone.y[0] + (Math.random() * (zone.y[1] - zone.y[0]))
    };
  };

  const createNewStrip = () => {
    const pos = getRandomPosition();
    return {
      id: nextId,
      initialX: pos.x,
      initialY: pos.y,
      rotation: Math.random() * 45 - 22.5
    };
  };

  const initializeStrips = () => {
    const targetCount = calculateStripCount();
    const newStrips = Array.from(
      { length: targetCount },
      () => createNewStrip()
    );
    setStrips(newStrips);
    setNextId(targetCount);
  };

  const updateStripCount = () => {
    const targetCount = calculateStripCount();
    setStrips(current => {
      if (current.length === targetCount) return current;
      if (current.length < targetCount) {
        const newStrips = Array.from(
          { length: targetCount - current.length },
          () => createNewStrip()
        );
        return [...current, ...newStrips];
      }
      return current.slice(0, targetCount);
    });
  };

  useEffect(() => {
    // Initial setup with delay to ensure container is ready
    const initTimer = setTimeout(initializeStrips, 100);
    
    // Handle window resize
    const resizeHandler = () => {
      const resizeTimer = setTimeout(updateStripCount, 100);
      return () => clearTimeout(resizeTimer);
    };
    window.addEventListener('resize', resizeHandler);
    
    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const removeStrip = (stripId: number) => {
    setStrips(current => {
      const newStrips = current.filter(strip => strip.id !== stripId);
      // Create a new strip after removal animation completes
      setTimeout(() => {
        setStrips(prev => {
          const targetCount = calculateStripCount();
          if (prev.length < targetCount) {
            const newStrip = createNewStrip();
            setNextId(prev => prev + 1);
            return [...prev, newStrip];
          }
          return prev;
        });
      }, 500);
      return newStrips;
    });
  };

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