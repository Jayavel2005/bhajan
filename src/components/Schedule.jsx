import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Container } from './ui/Container';
import { SectionTitle } from './ui/SectionTitle';

export const Schedule = () => {
  const { language } = useLanguage();
  const t = content[language].schedule;

  return (
    <section id="schedule" className="py-24 bg-brand-dark/50 relative">
      <Container>
        <SectionTitle title={t.title} />
        <div className="max-w-4xl mx-auto relative px-4 md:px-0">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-1 bg-brand-saffron/20 -translate-x-1/2 rounded-full" />

          {t.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative flex items-center justify-between mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
              } flex-row`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-brand-gold -translate-x-1/2 shadow-[0_0_15px_rgba(255,215,0,0.8)] z-10" />

              {/* Side Content */}
              <div className="w-full md:w-[45%] pl-12 md:pl-0">
                <div className={`p-6 card-border bg-white/5 rounded-2xl ${
                  index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                }`}>
                  <div className="text-brand-saffron font-bold text-lg mb-2 tracking-wide font-serif">{item.time}</div>
                  <div className="text-brand-soft text-xl font-medium">{item.event}</div>
                </div>
              </div>
              
              {/* Empty Space for alternate side on desktop */}
              <div className="hidden md:block w-[45%]" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
