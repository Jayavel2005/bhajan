import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';

export const Footer = () => {
  const { language } = useLanguage();
  const t = content[language].footer;

  return (
    <footer className="py-12 bg-[#FFF8F0] border-t border-brand-saffron/20 text-center">
      <Container>
        <div className="flex flex-col items-center gap-4">
          <div className="text-brand-saffron text-3xl mb-2">🕉️</div>
          <p className="text-gray-500 font-medium tracking-wide">
            {t}
          </p>
        </div>
      </Container>
    </footer>
  );
};
