import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import gsap from "gsap";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-[80] transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-50 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3 })}
        onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
        className="w-14 h-14 bg-gradient-to-br from-brand-saffron to-brand-gold text-white rounded-full shadow-[0_8px_25px_rgba(255,153,51,0.3)] flex items-center justify-center border border-white/20 active:scale-95 transition-transform"
        aria-label="Scroll to top"
      >
        <ChevronUp size={28} strokeWidth={2.5} />
      </button>
    </div>
  );
};
