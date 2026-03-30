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
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const hoverEffect = (e, isEnter) => {
    gsap.to(e.currentTarget, {
      y: isEnter ? -10 : 0,
      boxShadow: isEnter ? '0 25px 50px -12px rgba(255, 153, 51, 0.2)' : '0 10px 15px -3px rgba(0,0,0,0.05)',
      borderColor: isEnter ? 'rgba(255,153,51,0.5)' : 'rgba(255,153,51,0.1)',
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  return (
    <section id="contact" className="py-24 bg-[#FFF8F0] relative overflow-hidden border-t border-brand-saffron/10">
      
      {/* Background Decorative Element */}
      <div className="absolute -right-20 -bottom-20 w-[500px] h-[500px] bg-brand-saffron/5 rounded-full blur-[120px] pointer-events-none" />
      
      <Container>
        <div ref={sectionRef} className="max-w-5xl mx-auto flex flex-col items-center">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-black text-gray-900 mb-4 inline-block relative px-4">
               {t.title}
               <div className="absolute -bottom-2 inset-x-0 h-4 bg-brand-gold/10 -rotate-1 -z-10" />
            </h2>
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="h-[2px] w-10 bg-brand-saffron/30" />
              <span className="text-brand-saffron">🪘</span>
              <div className="h-[2px] w-10 bg-brand-saffron/30" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 w-full">
            
            {/* Primary Contact Person */}
            <div 
              ref={el => cardsRef.current[0] = el}
              onMouseEnter={(e) => hoverEffect(e, true)}
              onMouseLeave={(e) => hoverEffect(e, false)}
              className="bg-white rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-xl border border-brand-saffron/10 opacity-0 transform-gpu"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-brand-saffron to-brand-gold rounded-2xl flex items-center justify-center p-0.5 shadow-lg mb-8 rotate-3 transition-transform group-hover:rotate-0">
                 <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                   <UserCheck className="w-10 h-10 text-brand-saffron" />
                 </div>
              </div>
              
              <h3 className="text-sm font-black tracking-[0.2em] text-brand-saffron uppercase mb-2">Event Organizer</h3>
              <p className="text-3xl font-serif font-bold text-gray-900 mb-8">{t.name}</p>
              
              <div className="w-full space-y-4">
                <a 
                  href={`tel:${t.phones[0]}`}
                  className="flex items-center justify-center gap-4 w-full bg-brand-saffron/5 py-5 rounded-2xl border border-brand-saffron/10 hover:bg-brand-saffron hover:text-white transition-all duration-300 group"
                >
                  <Phone className="w-6 h-6 text-brand-saffron group-hover:text-white" />
                  <span className="text-2xl font-black font-sans">{t.phones[0]}</span>
                </a>
              </div>
            </div>

            {/* Assistance Card */}
            <div 
              ref={el => cardsRef.current[1] = el}
              onMouseEnter={(e) => hoverEffect(e, true)}
              onMouseLeave={(e) => hoverEffect(e, false)}
              className="bg-white rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-xl border border-brand-saffron/10 opacity-0 transform-gpu relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-3xl shadow-sm">
                Fast Support
              </div>

              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center p-0.5 shadow-lg mb-8 -rotate-3">
                 <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                   <MessageSquare className="w-10 h-10 text-green-500" />
                 </div>
              </div>
              
              <h3 className="text-sm font-black tracking-[0.2em] text-green-600 uppercase mb-2">WhatsApp Support</h3>
              <p className="text-3xl font-serif font-bold text-gray-900 mb-8">Registration Help</p>
              
              <div className="w-full space-y-4">
                <a 
                  href={`https://wa.me/${t.phones[1].replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-4 w-full bg-green-500 py-5 rounded-2xl border border-green-600 hover:bg-green-600 text-white transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(34,197,94,0.5)]"
                >
                  <MessageSquare className="w-6 h-6 fill-white" />
                  <span className="text-2xl font-black font-sans">{t.phones[1]}</span>
                </a>
              </div>
            </div>

          </div>

          <div 
            ref={el => cardsRef.current[2] = el}
            className="mt-16 flex flex-col items-center gap-4 opacity-0"
          >
            <div className="flex items-center gap-2 px-6 py-2.5 bg-brand-saffron/10 rounded-full border border-brand-saffron/20 text-brand-saffron font-bold text-sm tracking-wide">
               <ShieldCheck className="w-4 h-4" />
               Official Community Support
            </div>
            <p className="text-gray-500 text-sm italic">Feel free to reach out for any event-related queries or assistance.</p>
          </div>

        </div>
      </Container>
    </section>
  );
};
