import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';
import { Phone, User } from 'lucide-react';

export const Contact = () => {
  const { language } = useLanguage();
  const t = content[language].contact;
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(sectionRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-24 bg-white relative border-t border-brand-saffron/10">
      <Container>
        <div ref={sectionRef} className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-3xl font-serif text-gray-900 font-bold mb-12 opacity-0">{t.title}</h2>
          
          <div className="w-full bg-[#FFF8F0] p-10 border border-brand-saffron/20 rounded-3xl opacity-0 flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md -mt-16 mb-6">
              <User className="w-8 h-8 text-brand-saffron" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-8 font-serif">{t.name}</h3>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full max-w-lg">
              {t.phones.map((phone, idx) => (
                <a 
                  key={idx}
                  href={`tel:${phone}`} 
                  className="flex items-center justify-center gap-3 w-full bg-white py-4 rounded-xl border border-gray-200 hover:border-brand-saffron shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-gray-800"
                >
                  <Phone className="w-5 h-5 text-brand-saffron" />
                  <span className="font-bold text-xl tracking-wider">{phone}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
