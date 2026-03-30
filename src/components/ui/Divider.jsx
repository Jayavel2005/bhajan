export const Divider = () => {
  return (
    <div className="w-full flex items-center justify-center py-16 opacity-60 pointer-events-none">
      <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-brand-saffron" />
      <span className="mx-4 text-brand-saffron text-xl">✤</span>
      <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-brand-saffron" />
    </div>
  );
};
