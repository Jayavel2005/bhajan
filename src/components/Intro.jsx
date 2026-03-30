import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';

export const Intro = () => {
  const { language } = useLanguage();
  const t = content[language].intro;
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(sectionRef.current.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
          );
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="intro" className="py-24 bg-white relative card-border border-t border-brand-saffron/10">
      <Container>
        <div ref={sectionRef} className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl text-brand-saffron font-semibold opacity-0">{t.greeting}</h2>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium opacity-0">
            {t.text1}
          </p>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium opacity-0">
            {t.text2}
          </p>
          <div className="pt-6 opacity-0">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-saffron leading-relaxed max-w-2xl mx-auto">
              {t.highlight}
            </h3>
          </div>
        </div>
      </Container>
    </section>
  );
};
