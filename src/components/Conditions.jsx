import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';
import { AlertCircle } from 'lucide-react';

export const Conditions = () => {
  const { language } = useLanguage();
  const t = content[language].conditions;
  const conditionsRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(conditionsRef.current,
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FFF8F0] relative overflow-hidden border-t border-brand-saffron/10">
      <Container>
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-brand-saffron shrink-0" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gray-900 font-bold">{t.title}</h2>
          </div>

          <div ref={sectionRef} className="w-full bg-orange-50/30 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-sm border border-brand-saffron/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-brand-saffron/5 rounded-full blur-[60px] pointer-events-none" />
            <ul className="space-y-5 sm:space-y-6 list-none pl-0 relative z-10">
              {t.items.map((item, index) => (
                <li
                  key={index}
                  ref={el => conditionsRef.current[index] = el}
                  className="flex items-start gap-4 text-base sm:text-lg lg:text-xl font-medium text-gray-700 leading-relaxed opacity-0"
                >
                  <span className="mt-0.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-saffron/10 flex items-center justify-center shrink-0 text-brand-saffron font-black text-sm border border-brand-saffron/20">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};
