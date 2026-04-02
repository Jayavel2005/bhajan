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

        <div ref={sectionRef} className="max-w-5xl mx-auto mt-8 sm:mt-12">
          <div
            ref={cardRef}
            className="w-full bg-white rounded-2xl sm:rounded-[2rem] shadow-xl border border-brand-saffron/10 p-5 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 opacity-0 overflow-hidden relative"
          >
             {/* Left Side: Detail & Map */}
             <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Icon & Title Group */}
                <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-5 mb-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-orange-50 flex items-center justify-center shadow-sm border border-brand-saffron/20 shrink-0">
                    <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-brand-saffron" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-gray-900">{t.templeName}</h3>
                </div>
                
                <p className="text-gray-500 font-medium text-sm sm:text-base lg:text-lg mb-6 w-full lg:max-w-md">{t.address}</p>

                {/* Map */}
                <div className="w-full rounded-2xl overflow-hidden shadow-inner border border-gray-200 mb-6 bg-gray-50 h-[240px] sm:h-[300px]">
                  <iframe
                    src="https://www.google.com/maps?q=10.8668665,77.1710296&z=15&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full pointer-events-auto"
                    title="Temple Location Map"
                  ></iframe>
                </div>

                <a
                  href="https://maps.app.goo.gl/PFQNfisExb6kSErL6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 lg:py-5 rounded-full font-bold text-base sm:text-lg bg-gradient-to-r from-brand-saffron to-brand-gold text-white shadow-md active:scale-95 transition-all duration-200"
                >
                  {t.cta}
                </a>
             </div>

             {/* Right Side: Big QR Code Widget */}
             <div className="flex flex-col items-center justify-center w-full lg:w-[320px] bg-[#F8FAFC] rounded-3xl p-8 border border-gray-100 shrink-0 relative overflow-hidden group">
                 {/* Decorative background blur */}
                 <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-saffron/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-saffron/20 transition-colors" />
                 
                 <div className="mb-8 text-center z-10 relative">
                    <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-brand-saffron mb-2">Instant Navigation</span>
                    <h4 className="text-xl font-bold text-gray-800 tracking-tight">Scan Map QR</h4>
                 </div>
                 
                 {/* Big QR Image */}
                 <div className="w-56 h-56 bg-white border border-gray-200 rounded-[1.5rem] p-4 shadow-sm group-hover:border-brand-saffron/40 group-hover:shadow-md transition-all mb-8 relative z-10">
                    <img 
                      src="/location-qr.png" 
                      className="w-full h-full object-contain pointer-events-none select-none mix-blend-multiply opacity-90 group-hover:opacity-100" 
                      alt="Scan map" 
                    />
                 </div>
                 
                 <p className="text-[11px] text-gray-400 font-medium text-center leading-relaxed relative z-10 max-w-[220px]">
                   Open your phone's camera and scan the QR code to view directions instantly.
                 </p>
             </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
