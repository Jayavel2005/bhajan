import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { CountdownTimer } from './ui/CountdownTimer';

export const Hero = () => {
  const { language } = useLanguage();
  const t = content[language].hero;

  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  // GSAP Entrance Animations
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(elementsRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [language]);

  const handleScrollClick = () => {
    document.querySelector('#register').scrollIntoView({ behavior: 'smooth' });
  };

  const ctaHover = (e, isEnter) => {
    gsap.to(e.currentTarget, {
      scale: isEnter ? 1.05 : 1,
      boxShadow: isEnter ? '0 10px 25px rgba(255, 153, 51, 0.4)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center text-center pt-24 sm:pt-28 lg:pt-36 pb-12 overflow-hidden bg-transparent" 
    >
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        {/* Central Om / Top Ornament */}
        <div 
          ref={el => elementsRef.current[0] = el}
          className="w-20 h-20 bg-brand-saffron/10 rounded-full flex items-center justify-center mb-10 sm:mb-12 border border-brand-saffron/30 shadow-sm"
        >
          <span className="text-4xl text-brand-saffron drop-shadow-md">🕉️</span>
        </div>

        {/* Date & Location Badges */}
        <div ref={el => elementsRef.current[1] = el} className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center items-center w-full mb-12 sm:mb-16">
          <div className="inline-block px-6 py-2.5 rounded-full border border-brand-saffron/40 bg-gradient-to-r from-brand-saffron/5 to-orange-100/30 text-brand-saffron text-sm tracking-widest uppercase font-bold shadow-sm">
            {t.date}
          </div>
          <div className="inline-block px-6 py-2.5 rounded-full border border-brand-saffron/40 bg-gradient-to-r from-orange-100/30 to-brand-saffron/5 text-brand-saffron text-sm font-bold tracking-wide shadow-sm">
            {t.location}
          </div>
        </div>

        {/* Title */}
        <h1 
          ref={el => elementsRef.current[2] = el}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-black text-gray-900 leading-[1.3] tracking-tight mb-8 sm:mb-12 drop-shadow-sm max-w-4xl px-2"
        >
          {t.title}
        </h1>
        
        {/* Subtitle */}
        <p 
          ref={el => elementsRef.current[3] = el}
          className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-2xl mb-10 sm:mb-14 italic px-4"
        >
          {t.subtitle}
        </p>

        {/* Hero Timer */}
        <div ref={el => elementsRef.current[6] = el} className="mb-14 sm:mb-20 w-full max-w-sm sm:max-w-none">
          <CountdownTimer size="small" />
        </div>

        {/* Illustration */}
        <div 
          ref={el => elementsRef.current[4] = el}
          className="relative w-full max-w-lg aspect-[4/3] rounded-[2rem] bg-white shadow-lg border-2 border-brand-gold/20 overflow-hidden flex items-center justify-center p-4 mb-16"
        >
          <img 
            src="/hero-illustration.png" 
            alt="Bhajan Illustration" 
            className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* CTA Button */}
        <div ref={el => elementsRef.current[5] = el}>
          <button 
            onClick={handleScrollClick} 
            onMouseEnter={e => ctaHover(e, true)}
            onMouseLeave={e => ctaHover(e, false)}
            className="px-12 py-5 rounded-full text-lg md:text-xl font-bold bg-gradient-to-br from-brand-saffron to-[#f59e0b] text-white shadow-lg hover:shadow-xl focus:outline-none border border-orange-400"
          >
            {t.cta}
          </button>
        </div>
      </div>
    </section>
  );
};
