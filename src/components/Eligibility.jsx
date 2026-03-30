import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';
import { SectionTitle } from './ui/SectionTitle';
import { UserCheck } from 'lucide-react';

export const Eligibility = () => {
  const { language } = useLanguage();
  const t = content[language].eligibility;
  const listRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(listRef.current,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (listRef.current[0]) observer.observe(listRef.current[0]);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-[#FFF8F0] relative overflow-hidden border-t border-brand-saffron/10">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <SectionTitle title={t.title} />
          
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-brand-saffron/20 border-t-8 border-t-brand-saffron">
            <div className="space-y-4 sm:space-y-6">
              {t.items.map((item, index) => (
                <div 
                  key={index} 
                  ref={el => listRef.current[index] = el}
                  className="flex items-start gap-4 sm:gap-6 p-3 sm:p-4 rounded-xl hover:bg-orange-50/50 transition-colors opacity-0"
                >
                  <div className="mt-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-saffron/10 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-saffron" />
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
