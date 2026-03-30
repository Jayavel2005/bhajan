import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';

export const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const { language, toggleLanguage } = useLanguage();
  const t = content[language].nav;

  // Language toggle refs
  const langToggleThumbRefDesktop = useRef(null);
  const langTextEnRefDesktop = useRef(null);
  const langTextTaRefDesktop = useRef(null);
  
  const langToggleThumbRefMobile = useRef(null);
  const langTextEnRefMobile = useRef(null);
  const langTextTaRefMobile = useRef(null);

  const navLinks = [
    { name: t.intro, href: '#intro' },
    { name: t.details, href: '#details' },
    { name: t.prizes, href: '#prizes' },
    { name: t.rules, href: '#rules' },
  ];

  // GSAP Initial animations
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(navRef.current, 
      { y: -40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    tl.fromTo(logoRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
      "-=0.4"
    );

    if (linksRef.current.length > 0) {
      tl.fromTo(linksRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        "-=0.4"
      );
    }
  }, []);

  // Language Toggle Animation (Desktop & Mobile)
  useEffect(() => {
    // Desktop refs
    if (langToggleThumbRefDesktop.current) {
      gsap.to(langToggleThumbRefDesktop.current, {
        x: language === 'ta' ? 0 : 76, 
        duration: 0.4,
        ease: "power3.out"
      });
    }
    if (langTextEnRefDesktop.current && langTextTaRefDesktop.current) {
      gsap.to(langTextEnRefDesktop.current, { color: language === 'en' ? '#FFF' : '#6B7280', duration: 0.3 });
      gsap.to(langTextTaRefDesktop.current, { color: language === 'ta' ? '#FFF' : '#6B7280', duration: 0.3 });
    }

    // Mobile refs
    if (langToggleThumbRefMobile.current) {
      gsap.to(langToggleThumbRefMobile.current, {
        x: language === 'ta' ? 0 : 120, 
        duration: 0.4,
        ease: "power3.out"
      });
    }
    if (langTextEnRefMobile.current && langTextTaRefMobile.current) {
      gsap.to(langTextEnRefMobile.current, { color: language === 'en' ? '#FFF' : '#6B7280', duration: 0.3 });
      gsap.to(langTextTaRefMobile.current, { color: language === 'ta' ? '#FFF' : '#6B7280', duration: 0.3 });
    }
  }, [language]);

  // Scroll Behavior Animation
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 50;

      if (!navRef.current) return;

      if (isScrolled) {
        gsap.to(navRef.current, {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          paddingTop: '0.75rem',
          paddingBottom: '0.75rem',
          borderBottomColor: 'rgba(0,0,0,0)',
          duration: 0.3,
          ease: 'power1.inOut'
        });
      } else {
        gsap.to(navRef.current, {
          backgroundColor: 'rgba(255, 248, 240, 0.8)',
          boxShadow: '0 0 0px rgba(0,0,0,0)',
          paddingTop: '1.25rem',
          paddingBottom: '1.25rem',
          borderBottomColor: 'rgba(255,153,51,0.1)',
          duration: 0.3,
          ease: 'power1.inOut'
        });
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hover animation logic for links
  const handleMouseEnter = (e) => {
    const underline = e.currentTarget.querySelector('.nav-underline');
    gsap.to(e.currentTarget, { color: '#FF9933', duration: 0.3, ease: 'power2.out' }); 
    if(underline) {
      gsap.to(underline, { scaleX: 1, transformOrigin: 'center center', duration: 0.3, ease: 'power4.out' });
    }
  };

  const handleMouseLeave = (e) => {
    const underline = e.currentTarget.querySelector('.nav-underline');
    gsap.to(e.currentTarget, { color: '#374151', duration: 0.3, ease: 'power2.out' }); 
    if(underline) {
      gsap.to(underline, { scaleX: 0, transformOrigin: 'center center', duration: 0.3, ease: 'power4.out' });
    }
  };

  // Mobile menu open/close animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    
    if (isOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { y: '-10%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.4, ease: 'power3.out', display: 'flex' }
      );
    } else {
      gsap.to(mobileMenuRef.current,
        { y: '-5%', opacity: 0, duration: 0.3, ease: 'power3.in', onComplete: () => {
          if (mobileMenuRef.current) gsap.set(mobileMenuRef.current, { display: 'none' });
        }}
      );
    }
  }, [isOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ctaHover = (e, isEnter) => {
    gsap.to(e.currentTarget, {
      scale: isEnter ? 1.05 : 1,
      boxShadow: isEnter ? '0 10px 20px rgba(255, 153, 51, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'back.out(1.5)'
    });
  };

  return (
    <>
      <nav 
        ref={navRef}
        className="fixed top-0 w-full z-50 py-5 border-b border-brand-saffron/10 backdrop-blur-md bg-[#FFF8F0]/80 transform-gpu"
      >
        <div className="flex items-center justify-between mx-auto w-full max-w-7xl px-4 md:px-8">
          
          {/* Logo Section */}
          <a href="#" className="flex items-center gap-4 group z-[60]">
            <div 
              ref={logoRef} 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-brand-gold/30 shadow-[0_4px_10px_rgba(255,153,51,0.15)] group-hover:shadow-[0_4px_15px_rgba(255,153,51,0.3)] transition-shadow duration-300"
            >
              <span className="text-brand-saffron text-xl leading-none">🕉️</span>
            </div>
            <span className="font-serif text-2xl font-bold tracking-wide text-gray-900 group-hover:text-brand-saffron transition-colors">
              Jeeva Gaana
            </span>
          </a>

          {/* Nav Links (Center) */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <a 
                key={link.href} 
                href={link.href} 
                ref={el => linksRef.current[index] = el}
                onClick={(e) => handleLinkClick(e, link.href)} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative text-gray-700 font-medium tracking-wide py-2"
              >
                {link.name}
                <span 
                  className="nav-underline absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-saffron to-brand-gold rounded-full scale-x-0" 
                />
              </a>
            ))}
          </div>

          {/* Right Section (Desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            
            {/* Elegant Language Toggle (Desktop) */}
            <button 
              onClick={toggleLanguage}
              className="relative flex items-center bg-white border border-brand-saffron/20 rounded-full p-1 shadow-sm focus:outline-none hover:shadow-md transition-shadow"
              aria-label="Toggle language"
            >
              <div 
                ref={langToggleThumbRefDesktop}
                className="absolute top-1 bottom-1 w-[76px] bg-gradient-to-r from-brand-saffron to-orange-400 rounded-full shadow-sm"
              />
              
              <div className="relative flex items-center z-10">
                <span ref={langTextTaRefDesktop} className="w-[76px] text-center text-sm font-bold tracking-wide py-1.5 text-white">தமிழ்</span>
                <span ref={langTextEnRefDesktop} className="w-[76px] text-center text-sm font-bold tracking-wide py-1.5 text-gray-500">English</span>
              </div>
            </button>
            
            {/* CTA Button */}
            <a 
              href="#register" 
              onClick={(e) => handleLinkClick(e, '#register')} 
              onMouseEnter={(e) => ctaHover(e, true)}
              onMouseLeave={(e) => ctaHover(e, false)}
              className="px-8 py-2.5 rounded-full font-bold bg-gradient-to-r from-brand-saffron to-brand-gold text-white shadow-md transform origin-center tracking-wide"
            >
              {t.register}
            </a>
          </div>

          {/* Mobile Animated Hamburger */}
          <div className="lg:hidden flex items-center z-[60]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 bg-white border border-brand-saffron/20 rounded-full flex items-center justify-center shadow-sm focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between items-center overflow-hidden">
                <span className={`w-full h-[2px] bg-gray-800 rounded-full transform transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-x-[2px]' : ''}`} />
                <span className={`w-full h-[2px] bg-gray-800 rounded-full transform transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-4' : 'opacity-100'}`} />
                <span className={`w-full h-[2px] bg-gray-800 rounded-full transform transition-all duration-300 origin-left ${isOpen ? '-rotate-45 translate-x-[2px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 z-50 bg-[#FFF8F0]/95 backdrop-blur-xl flex-col items-center justify-start hidden pt-32 pb-8 overflow-y-auto"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center w-full px-6">
          
          {/* Mobile Language Toggle */}
          <div className="mb-10 w-full flex justify-center">
            <button 
              onClick={toggleLanguage}
              className="relative flex items-center bg-white border border-brand-saffron/20 rounded-full p-1.5 shadow-md focus:outline-none w-[240px]"
            >
              <div 
                ref={langToggleThumbRefMobile}
                className="absolute top-1.5 bottom-1.5 w-[114px] bg-gradient-to-r from-brand-saffron to-orange-400 rounded-full shadow-sm"
              />
              <div className="relative flex items-center z-10 w-full">
                <span ref={langTextTaRefMobile} className="flex-1 text-center text-lg font-bold tracking-wide py-2 text-white">தமிழ்</span>
                <span ref={langTextEnRefMobile} className="flex-1 text-center text-lg font-bold tracking-wide py-2 text-gray-500">English</span>
              </div>
            </button>
          </div>
          
          <div className="flex flex-col items-center gap-6 w-full">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)} 
                className="text-2xl font-serif tracking-wider text-gray-800 hover:text-brand-saffron transition-colors w-full text-center py-4 border-b border-gray-200/50 last:border-0"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="mt-12 w-full max-w-sm px-6">
            <a 
              href="#register" 
              onClick={(e) => handleLinkClick(e, '#register')} 
              className="block w-full text-center px-8 py-5 rounded-full font-bold tracking-wide text-xl bg-gradient-to-r from-brand-saffron to-brand-gold text-white shadow-xl shadow-brand-saffron/20 active:scale-95 transition-transform"
            >
              {t.register}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
