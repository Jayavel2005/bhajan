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
          { scale: 0.95, y: 30, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const ctaHover = (e, isEnter) => {
    gsap.to(e.currentTarget, {
      scale: isEnter ? 1.05 : 1,
      boxShadow: isEnter ? '0 15px 30px rgba(255, 153, 51, 0.4)' : '0 10px 15px flex-[0_4px_6px_rgba(0,0,0,0.1)]',
      duration: 0.3,
      ease: 'back.out(2)'
    });
  };

  return (
    <section id="register" className="py-28 bg-[#FFF8F0] relative overflow-hidden flex items-center justify-center border-t border-brand-saffron/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 blur-[120px] rounded-full pointer-events-none" />
      
      <Container>
        <div ref={sectionRef} className="max-w-3xl mx-auto flex justify-center relative z-10">
          <div 
            ref={cardRef} 
            className="w-full bg-white rounded-[2.5rem] p-10 md:p-16 text-center shadow-[0_20px_50px_rgba(255,153,51,0.1)] border border-brand-saffron/20 opacity-0 relative overflow-hidden"
          >
            {/* Corner decoration */}
            <div className="absolute -top-10 -right-10 text-brand-saffron opacity-10 text-[10rem] select-none pointer-events-none rotate-12">
              🕉️
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-10 leading-tight">
              {t.title}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-[#FFF8F0] rounded-2xl p-6 border border-brand-saffron/10 hover:border-brand-saffron focus-within:outline-none focus:ring-0 shadow-sm">
                <p className="text-gray-500 font-medium mb-2">{t.entryLabel}</p>
                <p className="text-3xl font-black text-gray-900">{t.entryValue}</p>
              </div>
              <div className="bg-[#FFF8F0] rounded-2xl p-6 border border-brand-gold/20 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 bg-brand-gold text-white text-xs font-bold rounded-bl-xl tracking-wider uppercase">Important</div>
                <p className="text-gray-500 font-medium mb-2">{t.refundLabel}</p>
                <p className="text-2xl font-bold text-gray-900">{t.refundValue}</p>
              </div>
            </div>
            
            <div className="mb-12">
              <CountdownTimer size="large" />
            </div>
            
            <div>
              <button 
                onClick={() => alert('Registration complete')} 
                onMouseEnter={e => ctaHover(e, true)}
                onMouseLeave={e => ctaHover(e, false)}
                className="w-full md:w-auto px-16 py-5 rounded-full font-bold text-xl md:text-2xl tracking-wide bg-gradient-to-r from-brand-saffron to-brand-gold text-white shadow-lg focus:outline-none"
              >
                {t.cta}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
