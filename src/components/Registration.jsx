import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { CountdownTimer } from './ui/CountdownTimer';

export const Registration = () => {
  const { language } = useLanguage();
  const t = content[language].registration;
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(cardRef.current,
          { scale: 0.96, y: 30, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="register" className="py-16 sm:py-20 lg:py-28 bg-[#FFF8F0] relative overflow-hidden border-t border-brand-saffron/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-brand-gold/10 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        <div ref={sectionRef} className="max-w-2xl mx-auto flex justify-center relative z-10">
          <div
            ref={cardRef}
            className="w-full bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 text-center shadow-[0_20px_50px_rgba(255,153,51,0.1)] border border-brand-saffron/20 opacity-0 relative overflow-hidden"
          >
            {/* Corner Om */}
            <div className="absolute -top-8 -right-8 text-brand-saffron opacity-10 text-[5rem] sm:text-[8rem] select-none pointer-events-none rotate-12 leading-none">
              🕉️
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-7 sm:mb-9 leading-tight">
              {t.title}
            </h2>

            {/* Info Grid — stacked on mobile, 2-col on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 sm:mb-10">
              <div className="bg-[#FFF8F0] rounded-2xl p-4 sm:p-5 border border-brand-saffron/10 shadow-sm active:scale-[0.98] transition-transform">
                <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">{t.entryLabel}</p>
                <p className="text-2xl sm:text-3xl font-black text-gray-900">{t.entryValue}</p>
              </div>
              <div className="bg-[#FFF8F0] rounded-2xl p-4 sm:p-5 border border-brand-gold/20 shadow-sm relative overflow-hidden active:scale-[0.98] transition-transform">
                <div className="absolute top-0 right-0 px-2 py-1 bg-brand-gold text-white text-[9px] font-black rounded-bl-xl tracking-wider uppercase">Important</div>
                <p className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">{t.refundLabel}</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{t.refundValue}</p>
              </div>
            </div>

            {/* Timer */}
            <div className="mb-8 sm:mb-10">
              <CountdownTimer size="large" />
            </div>

            {/* CTA — full width on mobile */}
            <button
              onClick={() => alert('Registration complete')}
              className="w-full sm:w-auto px-10 sm:px-16 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl lg:text-2xl tracking-wide bg-gradient-to-r from-brand-saffron to-brand-gold text-white shadow-lg active:scale-95 transition-all duration-200 focus:outline-none min-h-[52px]"
            >
              {t.cta}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};
