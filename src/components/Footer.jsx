import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';

export const Footer = () => {
  const { language } = useLanguage();
  const t = content[language].footer;

  return (
    <footer className="py-10 sm:py-12 bg-[#FFF8F0] border-t border-brand-saffron/20 text-center">
      <Container>
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-[1px] w-8 bg-brand-saffron/30" />
            <span className="text-brand-saffron text-2xl sm:text-3xl">🕉️</span>
            <div className="h-[1px] w-8 bg-brand-saffron/30" />
          </div>
          <p className="text-gray-500 font-medium tracking-wide text-sm sm:text-base max-w-sm sm:max-w-none text-center leading-relaxed">
            {t}
          </p>
        </div>
      </Container>
    </footer>
  );
};
