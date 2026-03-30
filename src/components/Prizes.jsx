import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';
import { Trophy, Medal, Award } from 'lucide-react';

export const Prizes = () => {
  const { language } = useLanguage();
  const t = content[language].prizes;
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(cardsRef.current.filter(Boolean),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.08 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [language]);

  const prizesList = [
    { title: t.second, amount: t.secondPrize, icon: Medal,  featured: false },
    { title: t.first,  amount: t.firstPrize,  icon: Trophy, featured: true  },
    { title: t.third,  amount: t.thirdPrize,  icon: Award,  featured: false },
  ];

  return (
    <section id="prizes" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-t border-brand-gold/10">

      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-brand-saffron/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <Container>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 relative z-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-gray-900 mb-3">
            {t.title}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[2px] w-10 bg-gradient-to-r from-transparent to-brand-saffron/50" />
            <span className="text-brand-saffron text-xl">✨</span>
            <div className="h-[2px] w-10 bg-gradient-to-l from-transparent to-brand-saffron/50" />
          </div>
        </div>

        {/* Prize Cards — stack on mobile, 3-col on desktop with center highlight */}
        <div ref={sectionRef} className="flex flex-col sm:grid sm:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto relative z-10">
          {prizesList.map((prize, index) => {
            const Icon = prize.icon;
            return (
              <div
                key={index}
                className={`relative group ${prize.featured ? 'sm:-mt-6 sm:mb-6 z-20 order-first sm:order-none' : 'z-10'}`}
              >
                <div
                  ref={el => cardsRef.current[index] = el}
                  className={`rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 flex sm:flex-col gap-5 sm:gap-0 items-center sm:text-center border transform-gpu opacity-0 relative overflow-hidden
                    ${prize.featured
                      ? 'bg-gradient-to-b from-white to-[#fff8f0] shadow-[0_20px_50px_rgba(255,153,51,0.15)] border-brand-saffron/40 ring-4 ring-brand-saffron/10'
                      : 'bg-white shadow-md border-brand-saffron/10'}`}
                >
                  {/* Top accent bar */}
                  <div className={`absolute top-0 inset-x-0 h-1.5 sm:h-2 ${prize.featured ? 'bg-gradient-to-r from-brand-saffron via-brand-gold to-brand-saffron' : 'bg-brand-saffron/20'}`} />

                  {/* Icon */}
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 sm:mb-5 sm:mt-4 rounded-full flex items-center justify-center border shrink-0
                    ${prize.featured ? 'bg-brand-saffron/10 border-brand-saffron/40' : 'bg-[#FFF8F0] border-brand-saffron/20'}`}>
                    {prize.featured && <div className="absolute w-16 h-16 sm:w-20 sm:h-20 bg-brand-gold/20 rounded-full blur-md animate-pulse" />}
                    <Icon className={`w-8 h-8 sm:w-10 sm:h-10 relative z-10 ${prize.featured ? 'text-brand-saffron' : 'text-brand-saffron/70'}`} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 sm:flex sm:flex-col sm:items-center">
                    <h3 className={`font-black tracking-widest uppercase mb-1 sm:mb-3 ${prize.featured ? 'text-base sm:text-lg text-brand-saffron' : 'text-sm sm:text-base text-gray-600'}`}>
                      {prize.title}
                    </h3>
                    <div className={`hidden sm:block h-[2px] bg-brand-saffron/20 mb-4 rounded-full ${prize.featured ? 'w-14' : 'w-10'}`} />
                    <p className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-saffron to-orange-600
                      ${prize.featured ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl lg:text-4xl'}`}>
                      {prize.amount}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
