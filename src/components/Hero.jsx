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

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(elementsRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.05 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [language]);

  const handleScrollClick = () => {
    document.querySelector('#register').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center text-center pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 overflow-hidden bg-transparent"
    >
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 max-w-4xl mx-auto">

        {/* Om Ornament */}
        <div
          ref={el => elementsRef.current[0] = el}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-saffron/10 rounded-full flex items-center justify-center mb-8 sm:mb-10 border border-brand-saffron/30 shadow-sm"
        >
          <span className="text-3xl sm:text-4xl text-brand-saffron drop-shadow-md">🕉️</span>
        </div>

        {/* Date & Location Badges — stack vertically on mobile */}
        <div
          ref={el => elementsRef.current[1] = el}
          className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center items-center w-full mb-8 sm:mb-10"
        >
          <div className="w-full sm:w-auto px-6 py-3 rounded-full border border-brand-saffron/40 bg-gradient-to-r from-brand-saffron/5 to-orange-100/30 text-brand-saffron text-xs sm:text-sm tracking-widest uppercase font-black shadow-sm">
            {t.date}
          </div>
          <div className="w-full sm:w-auto px-6 py-3 rounded-full border border-brand-saffron/40 bg-gradient-to-r from-orange-100/30 to-brand-saffron/5 text-brand-saffron text-xs sm:text-sm font-black tracking-widest uppercase shadow-sm">
            {t.location}
          </div>
        </div>

        {/* Highlight Text */}
        <div 
          ref={el => elementsRef.current[2] = el}
          className="mb-4 sm:mb-6"
        >
          <span className="text-xl sm:text-2xl lg:text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-saffron to-brand-gold uppercase tracking-[0.2em]">
            ✨ {t.highlight} ✨
          </span>
        </div>

        {/* Title */}
        <h1
          ref={el => elementsRef.current[3] = el}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-black text-gray-900 leading-[1.15] tracking-tight mb-6 sm:mb-8 drop-shadow-sm w-full"
        >
          {t.title}
        </h1>

        {/* Subtitle */}
        <p
          ref={el => elementsRef.current[4] = el}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-medium leading-relaxed max-w-xl mb-10 sm:mb-12 italic px-2"
        >
          {t.subtitle}
        </p>

        {/* Countdown Timer */}
        <div ref={el => elementsRef.current[5] = el} className="w-full mb-12 sm:mb-16">
          <CountdownTimer size="small" />
        </div>

        {/* CTA Button — full width on mobile */}
        <div ref={el => elementsRef.current[6] = el} className="w-full sm:w-auto">
          <button
            onClick={handleScrollClick}
            className="w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold bg-gradient-to-br from-brand-saffron to-[#f59e0b] text-white shadow-lg active:scale-95 transition-all duration-200 border border-orange-400 min-h-[52px]"
          >
            {t.cta}
          </button>
        </div>
      </div>
    </section>
  );
};
