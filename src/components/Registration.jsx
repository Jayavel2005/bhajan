import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';
import { CountdownTimer } from './ui/CountdownTimer';
import { SectionTitle } from './ui/SectionTitle';
import RegistrationForm from './RegistrationForm';

export const Registration = () => {
  const { language } = useLanguage();
  const t = content[language].registration;
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(cardRef.current,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        );
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="register" className="py-16 sm:py-20 lg:py-28 bg-[#FFF8F0] relative overflow-hidden border-t border-brand-saffron/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-brand-gold/10 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        <SectionTitle title={t.title} />

        <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-start">
          
          {/* Info Side (Left) */}
          <div ref={sectionRef} className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-brand-saffron/10 relative overflow-hidden group hover:shadow-xl transition-shadow duration-500">
               {/* Decor */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-saffron/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-saffron/10 transition-colors" />
              
              <div className="space-y-8 relative z-10">
                {/* Registration Fee */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-saffron/10 flex items-center justify-center shrink-0 border border-brand-saffron/20">
                    <span className="text-xl">💰</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-1">{t.entryLabel}</h4>
                    <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-saffron to-orange-600 leading-tight">
                      {t.entryValue}
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-gradient-to-r from-brand-saffron/20 via-transparent to-transparent" />

                {/* Payment Option */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                    <span className="text-xl">📱</span>
                  </div>
                  <div className="flex-1 w-full min-w-0">
                     <h4 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-3">Scan & Pay</h4>
                     
                     <div className="bg-white border border-brand-saffron/15 p-3 rounded-[1.5rem] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] max-w-[260px]">
                        {/* Cropped QR */}
                        <div className="w-full aspect-square rounded-[1rem] overflow-hidden relative bg-white">
                           <img 
                             src="/payment-qr.png" 
                             className="absolute w-[130%] h-[130%] top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none object-contain pointer-events-none select-none" 
                             alt="Scan QR" 
                           />
                        </div>

                        {/* UPI Details Wrapper */}
                        <div className="mt-1">
                           <div className="flex items-center justify-between gap-1.5 bg-gray-50/80 border border-gray-100 p-2 rounded-xl group hover:border-brand-saffron/30 transition-colors">
                              <span className="text-[10px] sm:text-xs font-bold text-gray-700 truncate tracking-tight select-all pl-1.5">
                                evaluate.sound-1@okhdfcbank
                              </span>
                              <button 
                                onClick={async (e) => {
                                  const btn = e.currentTarget;
                                  await navigator.clipboard.writeText('evaluate.sound-1@okhdfcbank');
                                  const originalText = btn.innerHTML;
                                  btn.innerHTML = 'Copied!';
                                  btn.classList.add('text-green-600', 'border-green-300', 'bg-green-100');
                                  setTimeout(() => {
                                     btn.innerHTML = originalText;
                                     btn.classList.remove('text-green-600', 'border-green-300', 'bg-green-100');
                                  }, 2000);
                                }}
                                className="text-[9px] font-black text-brand-saffron uppercase tracking-widest px-3 py-1.5 rounded-lg border border-brand-saffron/20 hover:bg-brand-saffron hover:text-white transition-all shrink-0"
                              >
                                Copy
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Refund Policy */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center shrink-0 border border-brand-gold/20">
                    <span className="text-xl">💰</span>
                  </div>
                  <div className="relative">
                    <span className="absolute -top-1 -right-4 px-2 py-0.5 bg-brand-gold text-white text-[8px] font-black uppercase tracking-widest rounded-full">Bonus</span>
                    <h4 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-1">{t.refundLabel}</h4>
                    <p className="text-2xl font-bold text-gray-900 leading-tight">
                      {t.refundValue}
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-gradient-to-r from-brand-saffron/30 via-transparent to-transparent" />

                {/* Deadline */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-200">
                    <span className="text-xl">🗓️</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-1">Registration Ends</h4>
                    <p className="text-lg font-bold text-gray-900">{t.lastDate.replace('கடைசி தேதி:', '').replace('Last Date:', '')}</p>
                  </div>
                </div>

                {/* Timer */}
                <div className="pt-2">
                  <CountdownTimer size="small" />
                </div>
              </div>
            </div>

            {/* Support/Instruction */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-brand-saffron/5 flex gap-4 ring-1 ring-white/50">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-brand-saffron/10">
                <span className="text-lg">📢</span>
              </div>
              <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
                {language === 'ta' 
                  ? 'பஜனை போட்டிக்கு தகுதியான நபர்கள் மட்டும் இந்த படிவத்தை பூர்த்தி செய்யவும். மெசேஜ் அனுப்பிய பின் நிர்வாக குழு உங்களை தொடர்பு கொள்ளும்.' 
                  : 'Only eligible candidates for the Bhajan competition should fill this form. Our management team will contact you after receiving the message.'}
              </p>
            </div>
          </div>

          {/* Form Side (Right) */}
          <div ref={cardRef} className="order-1 lg:order-2 opacity-0">
             <RegistrationForm />
          </div>

        </div>
      </Container>
    </section>
  );
};
