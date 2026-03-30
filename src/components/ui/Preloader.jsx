import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const instruments = [
  { icon: "🎹", name: "Harmonium", x: 0, y: -1 },
  { icon: "🥁", name: "Tabla", x: 0.85, y: -0.5 },
  { icon: "🪘", name: "Dholak", x: 0.85, y: 0.5 },
  { icon: "🔔", name: "Manjira", x: 0, y: 1 },
  { icon: "🪇", name: "Kartal", x: -0.85, y: 0.5 },
  { icon: "🎋", name: "Bansuri", x: -0.85, y: -0.5 }
];

export const Preloader = ({ onFinish }) => {
  const containerRef = useRef(null);
  const centerpieceRef = useRef(null);
  const instrumentsRef = useRef([]);
  const stringsRef = useRef([]);
  const notesContainerRef = useRef(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [statusText, setStatusText] = useState("Invoking Divine Melodies...");

  // Responsive radius calculation
  const [radius, setRadius] = useState(window.innerWidth < 640 ? 110 : 160);

  useEffect(() => {
    const handleResize = () => setRadius(window.innerWidth < 640 ? 110 : 160);
    window.addEventListener('resize', handleResize);

    // Rotation of status texts
    let statusIndex = 0;
    const statusInterval = setInterval(() => {
      statusIndex = (statusIndex + 1) % instruments.length;
      const actions = [
        "Tuning keys...", "Tightening skins...", "Balancing bass...", 
        "Polishing cymbals...", "Syncing rhythm...", "Clearing notes..."
      ];
      setStatusText(actions[statusIndex]);
    }, 500);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(".orbit-container", {
          rotation: 360,
          duration: 25,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%"
        });

        gsap.to(stringsRef.current, {
          strokeWidth: 2,
          opacity: 0.6,
          duration: 0.1,
          repeat: -1,
          yoyo: true,
          ease: "none"
        });

        instrumentsRef.current.forEach((inst, i) => {
          gsap.to(inst, {
            rotation: i % 2 === 0 ? 8 : -8,
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
        x: (i) => instruments[i].x * radius, 
        y: (i) => instruments[i].y * radius, 
        duration: 0.6, 
        stagger: 0.08, 
        ease: "back.out(1.2)" 
      },
      "-=0.3"
    );

    tl.fromTo(stringsRef.current,
      { strokeDashoffset: 400, opacity: 0 },
      { strokeDashoffset: 0, opacity: 0.15, duration: 0.8, stagger: 0.04, ease: "power2.inOut" },
      "-=0.8"
    );

    // Center Pulse
    gsap.to(".center-glow", {
      scale: 1.4,
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      ease: "power2.out"
    });

    const noteInterval = setInterval(() => {
      const note = document.createElement("div");
      note.innerText = ["🎶", "🎵", "✨", "🎼", "🌸", "🕉️"][Math.floor(Math.random() * 6)];
      note.style.position = "absolute";
      note.style.fontSize = "20px";
      note.style.pointerEvents = "none";
      note.style.filter = "drop-shadow(0 0 8px rgba(255,153,51,0.4))";
      notesContainerRef.current?.appendChild(note);

      gsap.fromTo(note, 
        { x: 0, y: 0, opacity: 1, scale: 0.3 }, 
        { 
          x: "random(-200, 200)", 
          y: "random(-200, 200)", 
          opacity: 0, 
          scale: 1.2, 
          rotation: "random(-180, 180)",
          duration: 2.5, 
          ease: "cos.out",
          onComplete: () => note.remove()
        }
      );
    }, 400);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(noteInterval);
      clearInterval(statusInterval);
    };
  }, [radius]);

  useEffect(() => {
    if (loadingComplete) {
      const exitTl = gsap.timeline({ onComplete: onFinish });
      exitTl.to([instrumentsRef.current, centerpieceRef.current, stringsRef.current], {
        scale: 0.1,
        opacity: 0,
        rotation: 45,
        duration: 0.6,
        stagger: 0.02,
        ease: "power2.in"
      });
      exitTl.to(containerRef.current, {
        opacity: 0,
        backgroundColor: "white",
        duration: 0.5,
        ease: "power4.inOut"
      }, "-=0.2");
    }
  }, [loadingComplete, onFinish]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#FFFBF5] flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full h-full flex items-center justify-center scale-90 sm:scale-100">
        
        {/* Divine Background Elements */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="w-[100vw] h-[100vw] bg-radial-gradient from-brand-saffron/10 to-transparent blur-[80px]" />
        </div>

        <div ref={notesContainerRef} className="absolute inset-0 flex items-center justify-center pointer-events-none" />

        <div className="relative orbit-container w-0 h-0 flex items-center justify-center">
          
          {/* Connection Strings */}
          <svg className="absolute w-[600px] h-[600px] pointer-events-none z-0" viewBox="-300 -300 600 600">
            {instruments.map((inst, i) => (
              <line
                key={i}
                ref={el => stringsRef.current[i] = el}
                x1="0" y1="0"
                x2={inst.x * radius} y2={inst.y * radius}
                stroke="#FF9933"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0"
              />
            ))}
          </svg>

          {/* Centerpiece */}
          <div ref={centerpieceRef} className="absolute z-20 flex items-center justify-center">
            <div className="relative w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center">
              <div className="center-glow absolute inset-0 bg-brand-saffron/20 rounded-full blur-xl" />
              <div className="w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-full shadow-[0_15px_40px_rgba(255,153,51,0.2)] flex items-center justify-center border border-brand-saffron/15 relative z-10">
                 <span className="text-5xl sm:text-7xl drop-shadow-xl select-none">🪘</span>
              </div>
            </div>
          </div>

          {/* Instruments */}
          {instruments.map((inst, i) => (
            <div
              key={i}
              ref={el => instrumentsRef.current[i] = el}
              className="absolute z-10 flex flex-col items-center justify-center group"
              style={{ width: radius < 120 ? "70px" : "90px", height: radius < 120 ? "70px" : "90px" }}
            >
              <div className="relative w-14 h-14 sm:w-20 sm:h-20 bg-white shadow-lg rounded-xl sm:rounded-2xl border border-brand-saffron/10 flex items-center justify-center group-hover:border-brand-saffron/40 transition-all duration-300">
                <span className="text-2xl sm:text-4xl drop-shadow-md select-none">{inst.icon}</span>
              </div>
              <div className="mt-2 overflow-hidden">
                <span className="block text-[7px] sm:text-[9px] font-black text-brand-saffron uppercase tracking-[0.2em] bg-brand-saffron/5 px-2 py-0.5 rounded-full">
                  {inst.name}
                </span>
              </div>
            </div>
          ))}

        </div>

        {/* Status Overlay */}
        <div className="absolute bottom-[10%] sm:bottom-[15%] left-0 right-0 text-center px-6">
           <div className="flex flex-col items-center gap-4 max-w-xs mx-auto">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-brand-saffron/30 to-transparent" />
              <div className="space-y-2">
                 <h2 className="text-2xl sm:text-3xl font-serif font-black text-gray-900 tracking-wider">
                   JEEVA GAANA
                 </h2>
                 <span className="block text-[9px] sm:text-[11px] font-black text-brand-saffron/60 uppercase tracking-[0.4em] animate-pulse">
                   {statusText}
                 </span>
              </div>
              <div className="flex gap-1">
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="w-1 h-1 rounded-full bg-brand-saffron/20 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};



