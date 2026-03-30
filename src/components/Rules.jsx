import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';
import { SectionTitle } from './ui/SectionTitle';

export const Rules = () => {
  const { language } = useLanguage();
  const t = content[language].rules;
  const listRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(listRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.05 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="rules" className="py-16 sm:py-20 lg:py-24 bg-[#FFF8F0] relative overflow-hidden border-t border-brand-saffron/10">
      <Container>
        <SectionTitle title={t.title} />
        {/* 1 col on mobile, 2 col on md+ */}
        <div ref={sectionRef} className="max-w-4xl mx-auto mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {t.items.map((item, index) => (
            <div
              key={index}
              ref={el => listRef.current[index] = el}
              className="bg-white rounded-2xl p-5 sm:p-6 flex gap-4 sm:gap-5 shadow-sm border border-gray-100 opacity-0 transform-gpu active:scale-[0.98] transition-transform cursor-default"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-brand-saffron/20 text-brand-saffron font-black text-base sm:text-lg mt-0.5">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{item.q}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
