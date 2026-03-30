import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';
import { SectionTitle } from './ui/SectionTitle';

export const About = () => {
  const { language } = useLanguage();
  const t = content[language].about;

  return (
    <section id="about" className="py-24 relative z-10 bg-brand-blue">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle title={t.title} />
          <p className="text-lg md:text-2xl leading-relaxed text-brand-soft/90 font-light">
            {t.description}
          </p>
          <div className="flex justify-center gap-8 mt-12 opacity-80">
            <span className="text-4xl">🪔</span>
            <span className="text-4xl text-brand-saffron">🕉️</span>
            <span className="text-4xl text-brand-gold">🔱</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
