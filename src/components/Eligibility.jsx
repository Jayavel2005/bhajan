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
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(listRef.current,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    if (listRef.current[0]) observer.observe(listRef.current[0]);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FFF8F0] relative overflow-hidden border-t border-brand-saffron/10">
      <Container>
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <SectionTitle title={t.title} />
          <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-brand-saffron/20 border-t-4 sm:border-t-8 border-t-brand-saffron mt-8 sm:mt-10">
            <div ref={sectionRef} className="space-y-4 sm:space-y-5">
              {t.items.map((item, index) => (
                <div
                  key={index}
                  ref={el => listRef.current[index] = el}
                  className="flex items-start gap-4 sm:gap-5 p-3 sm:p-4 rounded-xl hover:bg-orange-50/60 active:bg-orange-50 transition-colors opacity-0"
                >
                  <div className="mt-0.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-saffron/10 flex items-center justify-center shrink-0 border border-brand-saffron/20">
                    <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-saffron" />
                  </div>
                  <p className="text-base sm:text-lg lg:text-xl font-medium text-gray-800 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
