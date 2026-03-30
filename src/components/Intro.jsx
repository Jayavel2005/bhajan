import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';
import { SectionTitle } from './ui/SectionTitle';

export const Intro = () => {
  const { language } = useLanguage();
  const t = content[language].intro;
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(sectionRef.current.children,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="intro" className="py-16 sm:py-20 lg:py-24 bg-white relative border-t border-brand-saffron/10">
      <Container>
        <SectionTitle title={t.title} />
        <div ref={sectionRef} className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-7">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-brand-saffron font-semibold opacity-0 leading-snug">
            {t.greeting}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-medium opacity-0">
            {t.text1}
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-medium opacity-0">
            {t.text2}
          </p>
          <div className="pt-3 sm:pt-5 opacity-0">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-brand-saffron leading-relaxed max-w-xl mx-auto">
              {t.highlight}
            </h3>
          </div>
        </div>
      </Container>
    </section>
  );
};
