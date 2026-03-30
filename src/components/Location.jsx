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
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="location" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-t border-gray-100">
      <Container>
        <SectionTitle title={t.title} />

        <div ref={sectionRef} className="max-w-3xl mx-auto mt-8 sm:mt-12">
          <div
            ref={cardRef}
            className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-brand-saffron/10 p-5 sm:p-8 flex flex-col items-center text-center opacity-0 overflow-hidden"
          >
            {/* Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-orange-50 flex items-center justify-center mb-5 shadow-sm border border-brand-saffron/20">
              <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-brand-saffron" />
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-2">{t.templeName}</h3>
            <p className="text-gray-500 font-medium text-sm sm:text-base lg:text-lg mb-7 sm:mb-8 max-w-sm">{t.address}</p>

            {/* Map — adapt height for mobile */}
            <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-inner border border-gray-200 mb-7 sm:mb-8 bg-gray-50">
              <iframe
                src="https://www.google.com/maps?q=10.8668665,77.1710296&z=15&output=embed"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full sm:h-[350px] pointer-events-auto"
                title="Temple Location Map"
              ></iframe>
            </div>

            {/* CTA — full width mobile */}
            <a
              href="https://www.google.com/maps/place/Paramasivan+Temple/@10.8668665,77.1710296,15z"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 sm:px-12 py-4 rounded-full font-bold text-base sm:text-lg bg-gradient-to-r from-brand-saffron to-brand-gold text-white shadow-md active:scale-95 transition-all duration-200 min-h-[52px]"
            >
              {t.cta}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};
