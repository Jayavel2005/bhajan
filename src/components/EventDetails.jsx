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
        gsap.fromTo(headerRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
        );
        gsap.fromTo(cardsRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out', delay: 0.2 }
        );
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const cards = [
    { label: t.dateLabel, value: t.dateValue, icon: CalendarHeart, iconColor: 'text-rose-500', bg: 'from-rose-100 to-orange-100' },
    { label: t.venueLabel, value: t.venueValue, icon: MapPin, iconColor: 'text-orange-500', bg: 'from-orange-100 to-amber-100' },
    { label: t.timeLabel, value: t.timeValue, icon: Clock, iconColor: 'text-yellow-500', bg: 'from-yellow-100 to-orange-50' },
  ];

  return (
    <section id="details" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-[#FFF8F0] to-[#FEF3C7]/20 border-t border-brand-saffron/10">

      <div className="absolute inset-0 flex place-content-center pointer-events-none opacity-30">
        <div className="w-[600px] h-[600px] bg-brand-saffron rounded-full blur-[150px] opacity-10 mix-blend-multiply flex-shrink-0" />
      </div>

      <Container className="relative z-10">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center mb-10 sm:mb-14 lg:mb-16 opacity-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-saffron via-orange-500 to-brand-gold pb-2 text-center">
            {t.title}
          </h2>
          <div className="flex items-center gap-4 mt-3">
            <div className="h-[2px] w-10 sm:w-12 bg-gradient-to-r from-transparent to-brand-saffron/50 rounded-full" />
            <span className="text-brand-saffron text-xl sm:text-2xl">🕉️</span>
            <div className="h-[2px] w-10 sm:w-12 bg-gradient-to-l from-transparent to-brand-saffron/50 rounded-full" />
          </div>
        </div>

        {/* Cards — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const isLast = i === cards.length - 1;
            return (
              <div
                key={i}
                ref={el => cardsRef.current[i] = el}
                className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-row sm:flex-col items-center sm:text-center gap-5 sm:gap-0 shadow-md border border-orange-100 opacity-0 transform-gpu active:scale-[0.98] transition-transform
                  ${isLast ? 'sm:col-span-2 lg:col-span-1 sm:max-w-xs sm:mx-auto lg:max-w-none lg:mx-0 w-full' : ''}`}
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 sm:mb-5 rounded-full bg-gradient-to-br ${card.bg} flex items-center justify-center shrink-0 shadow-sm`}>
                  <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${card.iconColor}`} />
                </div>
                <div className="text-left sm:text-center flex-1">
                  <p className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-brand-saffron uppercase mb-1">{card.label}</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold font-serif text-gray-900 leading-snug">{card.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
