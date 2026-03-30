import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const instruments = [
  { icon: "🎹", name: "Harmonium", x: 0, y: -160, action: "Tuning keys..." },
  { icon: "🥁", name: "Tabla", x: 140, y: -80, action: "Tightening skins..." },
  { icon: "🪘", name: "Dholak", x: 140, y: 80, action: "Balancing bass..." },
  { icon: "🔔", name: "Manjira", x: 0, y: 160, action: "Polishing cymbals..." },
  { icon: "🪇", name: "Kartal", x: -140, y: 80, action: "Syncing rhythm..." },
  { icon: "🎋", name: "Bansuri", x: -140, y: -80, action: "Clearing notes..." }
];

export const Preloader = ({ onFinish }) => {
  const containerRef = useRef(null);
  const centerpieceRef = useRef(null);
  const instrumentsRef = useRef([]);
  const stringsRef = useRef([]);
  const notesContainerRef = useRef(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [statusText, setStatusText] = useState("Invoking Divine Melodies...");

  useEffect(() => {
    // Rotation of status texts
    let statusIndex = 0;
    const statusInterval = setInterval(() => {
      statusIndex = (statusIndex + 1) % instruments.length;
      setStatusText(instruments[statusIndex].action);
    }, 400);

    const tl = gsap.timeline({
      onComplete: () => {
        // Continuous orbit
        gsap.to(".orbit-container", {
          rotation: 360,
          duration: 25,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%"
        });

        // Vibration effect on strings
        gsap.to(stringsRef.current, {
          strokeWidth: 2,
          opacity: 0.6,
          duration: 0.1,
          repeat: -1,
          yoyo: true,
          ease: "none"
        });

        // Individual instrument sway
        instrumentsRef.current.forEach((inst, i) => {
          gsap.to(inst, {
            rotation: i % 2 === 0 ? 10 : -10,
            duration: 1.5 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });

        setTimeout(() => setLoadingComplete(true), 2000);
      }
    });

    // 1. ENTRY
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
    tl.fromTo(centerpieceRef.current, 
      { scale: 0, opacity: 0, rotation: -90 }, 
      { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "expo.out" },
      "-=0.3"
    );

    // 2. STRINGS & INSTRUMENTS
    tl.fromTo(instrumentsRef.current,
      { scale: 0, opacity: 0, y: 0, x: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        x: (i) => instruments[i].x, 
        y: (i) => instruments[i].y, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "back.out(1.2)" 
      },
      "-=0.3"
    );

    tl.fromTo(stringsRef.current,
      { strokeDashoffset: 300, opacity: 0 },
      { strokeDashoffset: 0, opacity: 0.2, duration: 0.8, stagger: 0.05, ease: "power2.inOut" },
      "-=0.8"
    );

    // Center Pulse
    gsap.to(".center-glow", {
      scale: 1.4,
      opacity: 0,
      duration: 2,
      repeat: -1,
      ease: "power2.out"
    });

    // SOUND PARTICLES
    const noteInterval = setInterval(() => {
      const note = document.createElement("div");
      note.innerText = ["🎶", "🎵", "✨", "🎼", "🌸", "🕉️"][Math.floor(Math.random() * 6)];
      note.style.position = "absolute";
      note.style.fontSize = "24px";
      note.style.pointerEvents = "none";
      note.style.filter = "drop-shadow(0 0 10px rgba(255,153,51,0.5))";
      notesContainerRef.current?.appendChild(note);

      gsap.fromTo(note, 
        { x: 0, y: 0, opacity: 1, scale: 0.3 }, 
        { 
          x: "random(-300, 300)", 
          y: "random(-300, 300)", 
          opacity: 0, 
          scale: 1.2, 
          rotation: "random(-180, 180)",
          duration: 3, 
          ease: "power1.out",
          onComplete: () => note.remove()
        }
      );
    }, 400);

    return () => {
      clearInterval(noteInterval);
      clearInterval(statusInterval);
    };
  }, []);

  useEffect(() => {
    if (loadingComplete) {
      const exitTl = gsap.timeline({ onComplete: onFinish });
      
      exitTl.to([instrumentsRef.current, centerpieceRef.current, stringsRef.current], {
        scale: 0.1,
        opacity: 0,
        rotation: 45,
        duration: 0.8,
        stagger: 0.02,
        ease: "power2.in"
      });

      exitTl.to(containerRef.current, {
        opacity: 0,
        backgroundColor: "white",
        duration: 0.6,
        ease: "power4.inOut"
      }, "-=0.3");
    }
  }, [loadingComplete, onFinish]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#FFFBF5] flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Divine Background Elements */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="w-[100vw] h-[100vw] bg-radial-gradient from-brand-saffron/20 to-transparent blur-[120px]" />
        </div>

        {/* Dynamic Nodes Container */}
        <div ref={notesContainerRef} className="absolute inset-0 flex items-center justify-center pointer-events-none" />

        <div className="relative orbit-container w-0 h-0 flex items-center justify-center">
          
          {/* SVG Connection Strings */}
          <svg className="absolute w-[600px] h-[600px] pointer-events-none z-0" viewBox="-300 -300 600 600">
            {instruments.map((inst, i) => (
              <line
                key={i}
                ref={el => stringsRef.current[i] = el}
                x1="0" y1="0"
                x2={inst.x} y2={inst.y}
                stroke="#FF9933"
                strokeWidth="1"
                strokeDasharray="5,5"
                opacity="0"
              />
            ))}
          </svg>

          {/* Centerpiece: Divine Drum */}
          <div 
            ref={centerpieceRef}
            className="absolute z-20 flex items-center justify-center"
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
              <div className="center-glow absolute inset-0 bg-brand-saffron/20 rounded-full blur-xl" />
              <div className="absolute inset-0 border-2 border-brand-saffron/10 rounded-full animate-[spin_10s_linear_infinite]" />
              
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full shadow-[0_20px_60px_rgba(255,153,51,0.25)] flex items-center justify-center border-2 border-brand-saffron/20 relative z-10 overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-brand-saffron/5 to-transparent" />
                 <span className="text-6xl sm:text-7xl drop-shadow-2xl select-none leading-none">🪘</span>
              </div>
            </div>
          </div>

          {/* Orbiting Instruments */}
          {instruments.map((inst, i) => (
            <div
              key={i}
              ref={el => instrumentsRef.current[i] = el}
              className="absolute z-10 flex flex-col items-center justify-center group"
              style={{ width: "100px", height: "100px" }}
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white shadow-xl rounded-2xl border border-brand-saffron/10 flex items-center justify-center group-hover:border-brand-saffron/50 transition-all duration-300">
                <span className="text-3xl sm:text-4xl drop-shadow-md select-none transform group-hover:scale-125 transition-transform duration-500">{inst.icon}</span>
                <div className="absolute -inset-1 bg-brand-saffron/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-3 overflow-hidden">
                <span className="block text-[8px] sm:text-[9px] font-black text-brand-saffron uppercase tracking-[0.3em] bg-brand-saffron/5 px-3 py-1 rounded-full whitespace-nowrap">
                  {inst.name}
                </span>
              </div>
            </div>
          ))}

        </div>

        {/* spiritual status Overlay */}
        <div className="absolute bottom-20 left-0 right-0 text-center px-6">
           <div className="flex flex-col items-center gap-6 max-w-xs mx-auto">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-brand-saffron to-transparent opacity-40" />
              
              <div className="space-y-3">
                 <h2 className="text-3xl font-serif font-black text-gray-900 tracking-[0.15em] uppercase drop-shadow-sm">
                   Jeeva Gaana
                 </h2>
                 <div className="relative h-4 flex items-center justify-center">
                    <span className="text-[10px] sm:text-[11px] font-black text-brand-saffron/70 uppercase tracking-[0.5em] animate-pulse">
                      {statusText}
                    </span>
                 </div>
              </div>

              <div className="flex gap-1.5">
                 {[...Array(3)].map((_, i) => (
                   <div 
                     key={i} 
                     className="w-1.5 h-1.5 rounded-full bg-brand-saffron/20 animate-bounce"
                     style={{ animationDelay: `${i * 0.1}s` }}
                   />
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Om Corner Markers */}
      <div className="absolute inset-12 border border-brand-saffron/5 rounded-3xl pointer-events-none" />
      <div className="absolute top-12 left-12 text-2xl opacity-10 select-none">🕉️</div>
      <div className="absolute bottom-12 right-12 text-2xl opacity-10 select-none">🕉️</div>
    </div>
  );
};


