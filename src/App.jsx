import { useEffect, useRef } from "react";
import { useLanguage } from "./context/LanguageContext";
import gsap from "gsap";
import { LanguageProvider } from "./context/LanguageContext";

// Components
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { EventDetails } from "./components/EventDetails";
import { Format } from "./components/Format";
import { Eligibility } from "./components/Eligibility";
import { Prizes } from "./components/Prizes";
import { Rules } from "./components/Rules";
import { Conditions } from "./components/Conditions";
import { Registration } from "./components/Registration";
import { Location } from "./components/Location";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingBackground } from "./components/ui/FloatingBackground";
import { ScrollToTop } from "./components/ui/ScrollToTop";
import { Divider } from "./components/ui/Divider";
import { Preloader } from "./components/ui/Preloader";
import { useState } from "react";

// Translation Wrapper for cross-fade transition
const ContentWrapper = ({ children }) => {
  const { language } = useLanguage();
  const contentRef = useRef(null);

  useEffect(() => {
    // Elegant cross-fade when language changes
    gsap.fromTo(contentRef.current, 
      { opacity: 0, y: 10 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, [language]);

  return <div ref={contentRef}>{children}</div>;
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FFF8F0] selection:bg-brand-saffron/30 selection:text-brand-saffron overflow-x-hidden font-sans text-gray-900 w-full relative">
        {loading && <Preloader onFinish={() => setLoading(false)} />}
        
        <FloatingBackground />
        
        <Navbar />

        <ContentWrapper>
          <main 
            id="main-app"
            style={{ opacity: loading ? 0 : 1, transform: loading ? 'translateY(20px)' : 'translateY(0)' }}
            className={`w-full transition-all duration-1000 ease-out`}
          >
            <Hero />
            <Intro />
            <Divider />
            <EventDetails />
            <Divider />
            <Prizes />
            <Divider />
            <Eligibility />
            <Format />
            <Divider />
            <Rules />
            <Conditions />
            <Divider />
            <Registration />
            <Divider />
            <Location />
            <Divider />
            <Contact />
          </main>
        </ContentWrapper>
        
        {!loading && (
          <>
            <Footer />
            <ScrollToTop />
          </>
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;
