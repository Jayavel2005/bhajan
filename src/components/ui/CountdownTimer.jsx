import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/content';

export const CountdownTimer = ({ size = 'large' }) => {
  const { language } = useLanguage();
  const t = content[language].timer;

  const calculateTimeLeft = () => {
    // Event specific Date: April 12, 2026
    const targetDate = new Date('2026-04-12T23:59:59').getTime();
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
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className={`inline-flex items-center justify-center px-6 py-3 bg-red-50 border border-red-200 rounded-lg shadow-sm ${size === 'small' ? 'mt-4' : 'mt-8'}`}>
        <span className="text-red-600 font-bold tracking-wide">{t.ended}</span>
      </div>
    );
  }

  const isSmall = size === 'small';

  const timeBlocks = [
    { label: t.days, value: timeLeft.days },
    { label: t.hours, value: timeLeft.hours },
    { label: t.minutes, value: timeLeft.minutes },
    { label: t.seconds, value: timeLeft.seconds },
  ];

  return (
    <div className={`flex flex-col items-center justify-center ${isSmall ? 'gap-3 mt-4 mb-2' : 'gap-5 mt-8 mb-4'}`}>
      <div className={`font-bold tracking-wide text-brand-saffron ${isSmall ? 'text-xs uppercase opacity-80' : 'text-lg uppercase'}`}>
        {t.registerBy}
      </div>
      <div className={`flex items-center justify-center ${isSmall ? 'gap-2 md:gap-3' : 'gap-3 md:gap-6'}`}>
        {timeBlocks.map((block, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`flex items-center justify-center bg-white border border-brand-saffron/20 rounded-xl shadow-sm text-gray-800 tabular-nums
              ${isSmall ? 'w-[42px] h-[46px] md:w-12 md:h-14 text-lg md:text-xl font-bold bg-gradient-to-b from-white to-[#FFF8F0]' : 'w-[60px] h-[70px] md:w-24 md:h-28 text-3xl md:text-5xl font-black rounded-2xl drop-shadow-md bg-gradient-to-b from-white to-amber-50'}
            `}>
              {String(block.value).padStart(2, '0')}
            </div>
            <span className={`text-gray-500 font-semibold ${isSmall ? 'text-[9px] md:text-[10px] mt-1.5 uppercase tracking-wider' : 'text-xs md:text-sm mt-3 uppercase tracking-widest'}`}>
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
