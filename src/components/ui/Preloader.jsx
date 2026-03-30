import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Preloader = ({ onFinish }) => {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);
  const progressRef = useRef(null);
  const [percent, setPercent] = useState(0);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Spawning music notes occasionally
    const noteInterval = setInterval(() => {
      setNotes(prev => [
        ...prev.slice(-10), // Keep only the last 10 notes for performance
        { 
          id: Date.now(), 
          icon: ['🎶', '🎼', '🎵', '🎹'][Math.floor(Math.random() * 4)],
          left: 45 + (Math.random() * 10), // Centered around the instruments
          delay: Math.random() * 0.5
        }
      ]);
    }, 400);

    // Progress bar simulation - Fixed at 5 seconds (100ms * 50 steps)
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          clearInterval(noteInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Initial entrance icons
    gsap.fromTo(elementsRef.current, 
      { scale: 0, opacity: 0, rotation: -45 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1.2, stagger: 0.2, ease: "back.out(1.7)" }
    );

    // Continuous floating animation for center icon
    gsap.to(elementsRef.current[1], {
      y: -20,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      clearInterval(interval);
      clearInterval(noteInterval);
    };
  }, []);

  useEffect(() => {
    if (percent === 100) {
      const tl = gsap.timeline({
        delay: 0.5,
        onComplete: onFinish
      });

      tl.to(elementsRef.current, {
        scale: 1.2,
        opacity: 0,
        filter: "blur(20px)",
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.in"
      });

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut"
      }, "-=0.4");
    }
  }, [percent, onFinish]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#FFF8F0] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Decorative Rings */}
      <div className="absolute w-[400px] h-[400px] border border-brand-saffron/10 rounded-full animate-ping pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] border border-brand-gold/5 rounded-full animate-pulse pointer-events-none" />

      {/* Floating Music Notes Particles */}
      {notes.map((note) => (
        <MusicNote key={note.id} note={note} />
      ))}

      <div className="relative flex flex-col items-center gap-12 max-w-sm w-full px-8">
        
        {/* Floating Instruments Top Trio */}
        <div className="flex gap-8 mb-4 relative">
          <div ref={el => elementsRef.current[0] = el} className="text-4xl drop-shadow-lg">🔔</div>
          <div ref={el => elementsRef.current[1] = el} className="text-7xl drop-shadow-2xl z-10">🪘</div>
          <div ref={el => elementsRef.current[2] = el} className="text-4xl drop-shadow-lg">🐚</div>
        </div>

        {/* Branding */}
        <div ref={el => elementsRef.current[3] = el} className="text-center">
          <h1 className="text-3xl font-serif font-black text-gray-900 tracking-wider mb-2">
            JEEVA GAANA
          </h1>
          <div className="flex items-center justify-center gap-3">
             <div className="h-[1px] w-8 bg-brand-saffron/50" />
             <span className="text-brand-saffron font-bold text-xs uppercase tracking-[0.3em] font-sans">Musical Devotion</span>
             <div className="h-[1px] w-8 bg-brand-saffron/50" />
          </div>
        </div>

        {/* Progress System */}
        <div ref={el => elementsRef.current[4] = el} className="w-full">
          <div className="flex justify-between items-end mb-3">
            <span className="text-[10px] font-black tracking-widest text-brand-saffron uppercase">Loading Experience</span>
            <span className="text-2xl font-serif font-black text-brand-saffron">{percent}%</span>
          </div>
          
          <div className="h-2 w-full bg-brand-saffron/10 rounded-full overflow-hidden border border-brand-saffron/5">
            <div 
              className="h-full bg-gradient-to-r from-brand-saffron to-brand-gold rounded-full transition-all duration-300 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Bottom Message */}
        <p ref={el => elementsRef.current[5] = el} className="text-[11px] text-gray-400 font-medium italic animate-pulse">
           Preparing the Divine Sound...
        </p>

      </div>

      {/* Decorative Corner Ornaments */}
      <div className="absolute top-10 left-10 text-4xl opacity-10">🕉️</div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-10">🕉️</div>
    </div>
  );
};

// Internal component for animated music note
const MusicNote = ({ note }) => {
  const noteRef = useRef(null);

  useEffect(() => {
    gsap.to(noteRef.current, {
      y: -150,
      x: 'random(-50, 50)',
      opacity: 0,
      scale: 1.5,
      rotation: 'random(-30, 30)',
      duration: 2,
      ease: "power1.out"
    });
  }, []);

  return (
    <div 
      ref={noteRef}
      className="absolute text-2xl text-brand-saffron/40 pointer-events-none select-none z-0"
      style={{ top: '35%', left: `${note.left}%` }}
    >
      {note.icon}
    </div>
  );
};
