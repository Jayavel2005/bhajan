import { useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';
import { SectionTitle } from './ui/SectionTitle';
import gsap from 'gsap';

export const Rules = () => {
  const { language } = useLanguage();
  const t = content[language].rules;
  const listRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(listRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const hoverEffect = (e, isEnter) => {
    gsap.to(e.currentTarget, {
      y: isEnter ? -4 : 0,
      boxShadow: isEnter ? '0 15px 30px rgba(0,0,0,0.06)' : '0 4px 6px rgba(0,0,0,0.02)',
      borderColor: isEnter ? 'rgba(255,153,51,0.3)' : 'rgba(243,244,246,1)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <section id="rules" className="py-24 bg-[#FFF8F0] relative overflow-hidden border-t border-brand-saffron/10">
      <Container>
        <SectionTitle title={t.title} />
        <div ref={sectionRef} className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-6">
          {t.items.map((item, index) => (
            <div
              key={index}
              ref={el => listRef.current[index] = el}
              onMouseEnter={(e) => hoverEffect(e, true)}
              onMouseLeave={(e) => hoverEffect(e, false)}
              className="bg-white rounded-2xl p-6 md:p-8 flex gap-5 shadow-sm border border-gray-100 opacity-0 transform-gpu cursor-default"
            >
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-brand-saffron/20 text-brand-saffron font-black text-xl">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
