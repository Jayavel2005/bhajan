export const SectionTitle = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`text-center mb-8 sm:mb-12 lg:mb-14 ${className}`}>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-saffron via-orange-500 to-brand-gold pb-1 leading-snug">
        {title}
      </h2>
      <div className="flex items-center justify-center gap-3 mt-3">
        <div className="h-[2px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-brand-saffron/40 rounded-full" />
        <span className="text-brand-saffron text-lg sm:text-2xl">🕉️</span>
        <div className="h-[2px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-brand-saffron/40 rounded-full" />
      </div>
      {subtitle && (
        <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto mt-3 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
