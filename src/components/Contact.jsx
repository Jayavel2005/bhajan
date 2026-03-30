import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';
import { MessageSquare, Phone, UserCheck, ShieldCheck } from 'lucide-react';

export const Contact = () => {
  const { language } = useLanguage();
  const t = content[language].contact;
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(cardsRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-[#FFF8F0] relative overflow-hidden border-t border-brand-saffron/10">

      <div className="absolute -right-20 -bottom-20 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-brand-saffron/5 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <div ref={sectionRef} className="max-w-4xl mx-auto flex flex-col items-center">

          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-gray-900 mb-3 relative inline-block px-4">
              {t.title}
              <div className="absolute -bottom-2 inset-x-0 h-3 sm:h-4 bg-brand-gold/10 -rotate-1 -z-10" />
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-[2px] w-8 sm:w-10 bg-brand-saffron/30" />
              <span className="text-brand-saffron text-lg sm:text-xl">🪘</span>
              <div className="h-[2px] w-8 sm:w-10 bg-brand-saffron/30" />
            </div>
          </div>

          {/* Cards — stacked on mobile, 2-col on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 w-full">

            {/* Organizer Card */}
            <div
              ref={el => cardsRef.current[0] = el}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col items-center text-center shadow-xl border border-brand-saffron/10 opacity-0 transform-gpu"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-saffron to-brand-gold rounded-2xl flex items-center justify-center p-0.5 shadow-lg mb-5 sm:mb-7 rotate-3">
                <div className="w-full h-full bg-white rounded-[12px] sm:rounded-[14px] flex items-center justify-center">
                  <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-brand-saffron" />
                </div>
              </div>

              <p className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-brand-saffron uppercase mb-2">Event Organizer</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-6 sm:mb-8">{t.name}</p>

              {/* CTA — full width */}
              <a
                href={`tel:${t.phones[0]}`}
                className="flex items-center justify-center gap-3 w-full bg-brand-saffron/5 py-4 sm:py-5 rounded-2xl border border-brand-saffron/10 hover:bg-brand-saffron hover:text-white active:bg-brand-saffron active:text-white transition-all duration-300 group min-h-[52px]"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-brand-saffron group-hover:text-white group-active:text-white shrink-0" />
                <span className="text-lg sm:text-xl lg:text-2xl font-black font-sans">{t.phones[0]}</span>
              </a>
            </div>

            {/* WhatsApp Card */}
            <div
              ref={el => cardsRef.current[1] = el}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col items-center text-center shadow-xl border border-brand-saffron/10 opacity-0 transform-gpu relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-3 py-2 sm:p-4 bg-green-500 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-bl-2xl sm:rounded-bl-3xl shadow-sm">
                Fast Support
              </div>

              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center p-0.5 shadow-lg mb-5 sm:mb-7 -rotate-3">
                <div className="w-full h-full bg-white rounded-[12px] sm:rounded-[14px] flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
                </div>
              </div>

              <p className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-green-600 uppercase mb-2">WhatsApp Support</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-6 sm:mb-8">Registration Help</p>

              {/* CTA — full width */}
              <a
                href={`https://wa.me/${t.phones[1].replace(/\s+/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-green-500 py-4 sm:py-5 rounded-2xl border border-green-600 hover:bg-green-600 active:bg-green-700 text-white transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(34,197,94,0.5)] min-h-[52px]"
              >
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-white shrink-0" />
                <span className="text-lg sm:text-xl lg:text-2xl font-black font-sans">{t.phones[1]}</span>
              </a>
            </div>
          </div>

          {/* Trust Badge */}
          <div
            ref={el => cardsRef.current[2] = el}
            className="mt-10 sm:mt-14 flex flex-col items-center gap-3 opacity-0"
          >
            <div className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-brand-saffron/10 rounded-full border border-brand-saffron/20 text-brand-saffron font-bold text-sm tracking-wide">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              Official Community Support
            </div>
            <p className="text-gray-500 text-xs sm:text-sm italic text-center max-w-xs">
              Feel free to reach out for any event-related queries or assistance.
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
};
