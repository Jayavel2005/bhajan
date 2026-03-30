import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';
import { SectionTitle } from './ui/SectionTitle';

export const Format = () => {
  const { language } = useLanguage();
  const t = content[language].format;
  const gridRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(gridRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.5)' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    if (gridRef.current[0]) observer.observe(gridRef.current[0]);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white relative card-border border-t border-brand-gold/10">
      <Container>
        <SectionTitle title={t.title} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mt-10 sm:mt-12 px-4 sm:px-0">
          {t.items.map((item, index) => (
            <div 
              key={index}
              ref={el => gridRef.current[index] = el}
              className="bg-[#FFF8F0] border border-brand-saffron/15 rounded-3xl p-6 sm:p-10 flex flex-col items-center text-center shadow-lg opacity-0 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 sm:mb-6 border border-brand-gold/20">
                <span className="text-xl sm:text-2xl font-black text-brand-saffron">{index + 1}</span>
              </div>
              <p className="text-lg sm:text-xl font-medium text-gray-800 leading-snug">{item}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
