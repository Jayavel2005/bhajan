import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';

export const Participation = () => {
  const { language } = useLanguage();
  const t = content[language].participation;

  return (
    <section className="py-24 bg-brand-blue relative">
      <Container>
        <div className="max-w-4xl mx-auto p-12 bg-white/5 card-border rounded-3xl relative overflow-hidden text-center">
          <div className="absolute inset-x-0 -bottom-32 h-64 bg-brand-saffron/10 blur-[100px] z-0" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-gold mb-8">{t.title}</h2>
            <p className="text-xl md:text-2xl leading-relaxed text-brand-soft/90 font-light">{t.description}</p>
          </div>
        </div>
      </Container>
    </section>
  );
};
