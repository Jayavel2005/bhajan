import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';
import { SectionTitle } from './ui/SectionTitle';
import { MapPin } from 'lucide-react';

export const Location = () => {
  const { language } = useLanguage();
  const t = content[language].location;
  
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(cardRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const hoverEffect = (e, isEnter) => {
    gsap.to(e.currentTarget, {
      scale: isEnter ? 1.05 : 1,
      boxShadow: isEnter ? '0 15px 30px rgba(255, 153, 51, 0.4)' : '0 10px 15px flex-[0_4px_6px_rgba(0,0,0,0.1)]',
      duration: 0.3,
      ease: 'back.out(2)'
    });
  };

  return (
    <section id="location" className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
      <Container>
        <SectionTitle title={t.title} />
        
        <div ref={sectionRef} className="max-w-4xl mx-auto flex flex-col items-center mt-12">
          
          <div 
            ref={cardRef} 
            className="w-full bg-white rounded-2xl shadow-lg border border-brand-saffron/10 p-6 md:p-10 flex flex-col items-center text-center opacity-0 overflow-hidden"
          >
            {/* Header Details */}
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-6 shadow-sm border border-brand-saffron/20">
              <MapPin className="w-8 h-8 text-brand-saffron" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">{t.templeName}</h3>
            <p className="text-gray-500 font-medium text-lg mb-8 max-w-sm">{t.address}</p>
            
            {/* Google Map */}
            <div className="w-full rounded-2xl overflow-hidden shadow-inner border border-gray-200 mb-8 bg-gray-50">
              <iframe
                src="https://www.google.com/maps?q=10.8668665,77.1710296&z=15&output=embed"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full pointer-events-auto"
                title="Temple Location Map"
              ></iframe>
            </div>
            
            {/* CTA Button */}
            <a 
              href="https://www.google.com/maps/place/Paramasivan+Temple/@10.8668665,77.1710296,15z" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={(e) => hoverEffect(e, true)}
              onMouseLeave={(e) => hoverEffect(e, false)}
              className="inline-block px-10 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-brand-saffron to-brand-gold text-white shadow-md focus:outline-none"
            >
              {t.cta}
            </a>
            
          </div>
        </div>
      </Container>
    </section>
  );
};
