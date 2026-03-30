import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const FloatingBackground = () => {
  const iconsRef = useRef([]);

  const icons = [
    // Left Zone
    { icon: '🪘', size: 'text-5xl', opacity: 'opacity-[0.20]', top: '15%', left: '8%', className: '' },
    { icon: '🎶', size: 'text-4xl', opacity: 'opacity-[0.15]', top: '45%', left: '12%', className: 'hidden sm:block' },
    { icon: '🥁', size: 'text-6xl', opacity: 'opacity-[0.15]', top: '75%', left: '6%', className: '' },
    { icon: '🐚', size: 'text-5xl', opacity: 'opacity-[0.15]', top: '90%', left: '18%', className: 'hidden sm:block' },

    // Right Zone
    { icon: '🔔', size: 'text-6xl', opacity: 'opacity-[0.25]', top: '22%', left: '85%', className: '' },
    { icon: '🐚', size: 'text-7xl', opacity: 'opacity-[0.10]', top: '55%', left: '88%', className: 'hidden sm:block' },
    { icon: '🎵', size: 'text-5xl', opacity: 'opacity-[0.20]', top: '82%', left: '82%', className: '' },
    { icon: '🌺', size: 'text-4xl', opacity: 'opacity-[0.15]', top: '10%', left: '75%', className: 'hidden sm:block' },

    // Center/Mid Zones - Higher probability of hiding on mobile
    { icon: '🌺', size: 'text-4xl', opacity: 'opacity-[0.20]', top: '30%', left: '35%', className: 'hidden sm:block' },
    { icon: '🪔', size: 'text-5xl', opacity: 'opacity-[0.15]', top: '60%', left: '65%', className: 'hidden sm:block' },
    { icon: '🕉️', size: 'text-8xl', opacity: 'opacity-[0.08]', top: '40%', left: '45%', className: 'hidden sm:block' },
    { icon: '🪘', size: 'text-6xl', opacity: 'opacity-[0.12]', top: '85%', left: '45%', className: 'hidden sm:block' },
    { icon: '🔔', size: 'text-4xl', opacity: 'opacity-[0.20]', top: '15%', left: '55%', className: 'hidden lg:block' },
    { icon: '🎶', size: 'text-5xl', opacity: 'opacity-[0.15]', top: '5%', left: '25%', className: 'hidden lg:block' }
  ];

  useEffect(() => {
    iconsRef.current.forEach((icon, i) => {
      // Create random sweeping floating motions
      gsap.to(icon, {
        y: 'random(-40, 40)',
        x: 'random(-30, 30)',
        rotation: 'random(-20, 20)',
        duration: 'random(4, 7)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.15
      });
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map((item, i) => (
        <div
          key={i}
          ref={el => iconsRef.current[i] = el}
          className={`absolute ${item.size} ${item.opacity} grayscale-[0.1] text-brand-saffron ${item.className}`}
          style={{ top: item.top, left: item.left }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};
