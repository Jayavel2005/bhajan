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

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(conditionsRef.current,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (conditionsRef.current[0]) observer.observe(conditionsRef.current[0]);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-[#FFF8F0] relative overflow-hidden border-t border-brand-saffron/10">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 mb-10">
            <AlertCircle className="w-8 h-8 text-brand-saffron" />
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 font-bold">{t.title}</h2>
          </div>
          
          <div className="w-full bg-orange-50/30 rounded-3xl p-8 md:p-12 shadow-sm border border-brand-saffron/10 relative">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-saffron/5 rounded-full blur-[60px] pointer-events-none" />
            <ul className="space-y-6 list-disc pl-6 relative z-10">
              {t.items.map((item, index) => (
                <li 
                  key={index} 
                  ref={el => conditionsRef.current[index] = el}
                  className="text-xl md:text-2xl font-medium text-gray-700 leading-relaxed font-serif opacity-0 marker:text-brand-saffron"
                >
                  <span className="pl-2">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};
