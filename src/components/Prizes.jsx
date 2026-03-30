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
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [language]);

  const hoverEffect = (e, isEnter) => {
    gsap.to(e.currentTarget, {
      y: isEnter ? -8 : 0,
      boxShadow: isEnter ? '0 20px 40px rgba(255, 153, 51, 0.12)' : '0 4px 6px rgba(0,0,0,0.02)',
      borderColor: isEnter ? 'rgba(255,153,51,0.3)' : 'rgba(255,153,51,0.1)',
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const prizesList = [
    {
      title: t.second,
      amount: t.secondPrize,
      icon: Medal,
      featured: false,
      delay: 0.2
    },
    {
      title: t.first,
      amount: t.firstPrize,
      icon: Trophy,
      featured: true,
      delay: 0.4
    },
    {
      title: t.third,
      amount: t.thirdPrize,
      icon: Award,
      featured: false,
      delay: 0.6
    }
  ];

  return (
    <section id="prizes" className="py-24 bg-white relative overflow-hidden border-t border-brand-gold/10">
      
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-saffron/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
      
      <Container>
        <div className="text-center mb-16 relative z-20">
          <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight text-gray-900 mb-4 inline-flex flex-col items-center">
            {t.title}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-brand-saffron/50" />
            <span className="text-brand-saffron text-xl">✨</span>
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-brand-saffron/50" />
          </div>
        </div>
        
        <div ref={sectionRef} className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto relative z-10 px-4 md:px-0">
          
          {prizesList.map((prize, index) => {
            const IconComponent = prize.icon;
            return (
              <div 
                key={index}
                className={`relative group ${prize.featured ? 'md:-mt-8 md:mb-8 z-20' : 'z-10 mt-4'}`}
              >
                <div 
                  ref={el => cardsRef.current[index] = el}
                  onMouseEnter={e => hoverEffect(e, true)}
                  onMouseLeave={e => hoverEffect(e, false)}
                  className={`bg-white rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 flex flex-col items-center text-center border transform-gpu relative overflow-hidden h-full
                    ${prize.featured ? 'shadow-[0_20px_50px_rgba(255,153,51,0.15)] border-brand-saffron/40 ring-4 ring-brand-saffron/10 from-white to-[#fff8f0] bg-gradient-to-b' : 'shadow-md border-brand-saffron/10'}`}
                >
                  {/* Elegant Top Border Line */}
                  <div className={`absolute top-0 inset-x-0 h-2 ${prize.featured ? 'bg-gradient-to-r from-brand-saffron via-brand-gold to-brand-saffron' : 'bg-brand-saffron/20'}`} />
                  
                  {/* Hover Inner Glow Content */}
                  <div className="absolute inset-0 bg-gradient-to-b from-brand-saffron/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Icon Circle */}
                  <div className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mb-6 sm:mb-8 relative border transition-transform duration-500 group-hover:scale-110 
                    ${prize.featured ? 'bg-brand-saffron/10 border-brand-saffron/40 shadow-inner' : 'bg-[#FFF8F0] border-brand-saffron/20'}
                  `}>
                    {prize.featured && <div className="absolute inset-0 bg-brand-gold/20 rounded-full blur-md animate-pulse" />}
                    <IconComponent className={`w-10 h-10 sm:w-12 sm:h-12 relative z-10 ${prize.featured ? 'text-brand-saffron drop-shadow-md' : 'text-brand-saffron/80'}`} />
                  </div>
                  
                  <h3 className={`font-bold text-gray-800 mb-3 sm:mb-4 tracking-wide uppercase ${prize.featured ? 'text-xl sm:text-2xl text-brand-saffron' : 'text-lg sm:text-xl'}`}>{prize.title}</h3>
                  <div className={`h-[2px] bg-brand-saffron/20 mb-6 sm:mb-8 rounded-full ${prize.featured ? 'w-16' : 'w-12'}`} />
                  
                  <p className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-saffron to-orange-600 mt-auto
                    ${prize.featured ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-3xl sm:text-4xl md:text-5xl'}
                  `}>
                    {prize.amount}
                  </p>
                </div>
              </div>
            );
          })}
          
        </div>
      </Container>
    </section>
  );
};
