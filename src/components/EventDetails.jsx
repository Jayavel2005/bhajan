import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';
import { MapPin, Clock, CalendarHeart } from 'lucide-react';

export const EventDetails = () => {
  const { language } = useLanguage();
  const t = content[language].details;
  const cardsRef = useRef([]);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        
        // Header animation
        gsap.fromTo(headerRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
        );

        // Cards stagger animation
        gsap.fromTo(cardsRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out', delay: 0.2 }
        );
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const hoverEffect = (e, isEnter) => {
    const card = e.currentTarget;
    const iconContainer = card.querySelector('.icon-circle');
    
    gsap.to(card, {
      y: isEnter ? -5 : 0,
      scale: isEnter ? 1.03 : 1,
      boxShadow: isEnter ? '0 20px 40px rgba(0,0,0,0.08)' : '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
      borderColor: isEnter ? 'rgba(255,153,51,0.3)' : 'rgba(255,237,213,1)', // border-orange-100
      duration: 0.3,
      ease: 'power2.out'
    });

    if(iconContainer) {
      gsap.to(iconContainer, {
        scale: isEnter ? 1.1 : 1,
        boxShadow: isEnter ? '0 0 20px rgba(255,153,51,0.4)' : 'none',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  return (
    <section id="details" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#FFF8F0] to-[#FEF3C7]/20 border-t border-brand-saffron/10">
      
      {/* Subtle Radial Glow Context */}
      <div className="absolute inset-0 flex place-content-center pointer-events-none opacity-40">
        <div className="w-[800px] h-[800px] bg-brand-saffron rounded-full blur-[150px] opacity-10 mix-blend-multiply flex-shrink-0" />
      </div>

      <Container className="relative z-10">
        
        {/* Custom Section Header */}
        <div ref={headerRef} className="flex flex-col items-center mb-16 opacity-0">
          <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-saffron via-orange-500 to-brand-gold pb-4 text-center">
            {t.title}
          </h2>
          
          <div className="flex items-center gap-4 mt-2">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-brand-saffron/50 rounded-full" />
            <span className="text-brand-saffron text-2xl">🕉️</span>
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-brand-saffron/50 rounded-full" />
          </div>
        </div>

        {/* Improved 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Card 1: Date */}
          <div 
            ref={el => cardsRef.current[0] = el}
            onMouseEnter={e => hoverEffect(e, true)}
            onMouseLeave={e => hoverEffect(e, false)}
            className="bg-white rounded-2xl p-10 flex flex-col items-center text-center shadow-lg border border-orange-100 opacity-0 transform-gpu cursor-default relative overflow-hidden group"
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-50 rounded-full blur-2xl group-hover:bg-orange-100 transition-colors duration-500 pointer-events-none" />
            
            <div className="icon-circle w-[72px] h-[72px] rounded-full bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center mb-6 transform-gpu">
              <CalendarHeart className="w-8 h-8 text-rose-500 drop-shadow-sm" />
            </div>
            
            <div className="space-y-3 z-10 relative">
              <h3 className="text-lg font-semibold tracking-wide text-brand-saffron uppercase text-[13px]">{t.dateLabel}</h3>
              <p className="text-2xl font-bold font-serif text-gray-900 leading-snug">{t.dateValue}</p>
            </div>
          </div>

          {/* Card 2: Venue */}
          <div 
            ref={el => cardsRef.current[1] = el}
            onMouseEnter={e => hoverEffect(e, true)}
            onMouseLeave={e => hoverEffect(e, false)}
            className="bg-white rounded-2xl p-10 flex flex-col items-center text-center shadow-lg border border-orange-100 opacity-0 transform-gpu cursor-default relative overflow-hidden group"
          >
            <div className="absolute -left-10 top-20 w-32 h-32 bg-amber-50 rounded-full blur-2xl group-hover:bg-amber-100 transition-colors duration-500 pointer-events-none" />
            
            <div className="icon-circle w-[72px] h-[72px] rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mb-6 transform-gpu">
              <MapPin className="w-8 h-8 text-orange-500 drop-shadow-sm" />
            </div>
            
            <div className="space-y-3 z-10 relative">
              <h3 className="text-lg font-semibold tracking-wide text-brand-saffron uppercase text-[13px]">{t.venueLabel}</h3>
              <p className="text-xl md:text-2xl font-bold font-serif text-gray-900 leading-snug">{t.venueValue}</p>
            </div>
          </div>

          {/* Card 3: Time */}
          <div 
            ref={el => cardsRef.current[2] = el}
            onMouseEnter={e => hoverEffect(e, true)}
            onMouseLeave={e => hoverEffect(e, false)}
            className="bg-white rounded-2xl p-10 flex flex-col items-center text-center shadow-lg border border-orange-100 opacity-0 transform-gpu cursor-default relative overflow-hidden group md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none w-full"
          >
            <div className="absolute right-10 -bottom-10 w-32 h-32 bg-yellow-50 rounded-full blur-2xl group-hover:bg-yellow-100 transition-colors duration-500 pointer-events-none" />
            
            <div className="icon-circle w-[72px] h-[72px] rounded-full bg-gradient-to-br from-yellow-100 to-orange-50 flex items-center justify-center mb-6 transform-gpu">
              <Clock className="w-8 h-8 text-yellow-500 drop-shadow-sm" />
            </div>
            
            <div className="space-y-3 z-10 relative">
              <h3 className="text-lg font-semibold tracking-wide text-brand-saffron uppercase text-[13px]">{t.timeLabel}</h3>
              <p className="text-xl md:text-2xl font-bold font-serif text-gray-900 leading-snug">{t.timeValue}</p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
