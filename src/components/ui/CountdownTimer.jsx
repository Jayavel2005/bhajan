import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/content';

export const CountdownTimer = ({ size = 'large' }) => {
  const { language } = useLanguage();
  const t = content[language].timer;

  const calculateTimeLeft = () => {
    const targetDate = new Date('2026-04-18T23:59:59').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="inline-flex items-center justify-center px-5 py-3 bg-red-50 border border-red-200 rounded-xl shadow-sm">
        <span className="text-red-600 font-bold tracking-wide text-sm sm:text-base">{t.ended}</span>
      </div>
    );
  }

  const isSmall = size === 'small';
  const timeBlocks = [
    { label: t.days,    value: timeLeft.days    },
    { label: t.hours,   value: timeLeft.hours   },
    { label: t.minutes, value: timeLeft.minutes },
    { label: t.seconds, value: timeLeft.seconds },
  ];

  return (
    <div className={`flex flex-col items-center justify-center ${isSmall ? 'gap-3 mt-6 mb-2' : 'gap-4 mt-6 mb-2'}`}>
      
      {/* Label */}
      <span className={`font-bold tracking-widest text-brand-saffron uppercase ${isSmall ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'}`}>
        {t.registerBy}
      </span>

      {/* Time blocks */}
      <div className={`flex items-start justify-center ${isSmall ? 'gap-2 sm:gap-3' : 'gap-3 sm:gap-5 lg:gap-7'}`}>
        {timeBlocks.map((block, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`flex items-center justify-center bg-white border border-brand-saffron/20 rounded-xl sm:rounded-2xl shadow-sm text-gray-800 tabular-nums font-black
              ${isSmall
                ? 'w-[46px] h-[50px] sm:w-14 sm:h-16 text-xl sm:text-2xl'
                : 'w-[62px] h-[68px] sm:w-20 sm:h-24 lg:w-24 lg:h-28 text-2xl sm:text-4xl lg:text-5xl'}
              bg-gradient-to-b from-white to-[#FFF8F0]`}
            >
              {String(block.value).padStart(2, '0')}
            </div>
            <span className={`text-gray-500 font-semibold uppercase tracking-widest mt-2
              ${isSmall ? 'text-[8px] sm:text-[10px]' : 'text-[9px] sm:text-[10px] lg:text-xs'}`}>
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
