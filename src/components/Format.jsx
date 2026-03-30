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
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.5)' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (gridRef.current[0]) observer.observe(gridRef.current[0]);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative border-t border-brand-gold/10">
      <Container>
        <SectionTitle title={t.title} />
        {/* 1 col mobile, 2 col sm, 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mt-8 sm:mt-12">
          {t.items.map((item, index) => (
            <div
              key={index}
              ref={el => gridRef.current[index] = el}
              className="bg-[#FFF8F0] border border-brand-saffron/15 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex sm:flex-col items-center gap-4 sm:gap-0 shadow-md opacity-0 active:scale-[0.98] transition-transform"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 sm:mb-5 rounded-full bg-white shadow-sm flex items-center justify-center border border-brand-gold/20 shrink-0">
                <span className="text-lg sm:text-2xl font-black text-brand-saffron">{index + 1}</span>
              </div>
              <p className="text-base sm:text-lg font-semibold text-gray-800 leading-snug sm:text-center">{item}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
