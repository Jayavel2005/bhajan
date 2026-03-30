import React, { useState } from 'react';

const formContent = {
  ta: {
    title: "பதிவு படிவம்",
    name: "பெயர்",
    group: "குழு பெயர்",
    members: "உறுப்பினர்கள் எண்ணிக்கை",
    city: "நகரம்",
    contact: "தொடர்பு எண்",
    age: "வயது",
    submit: "📲 WhatsApp மூலம் பதிவு செய்யவும்",
    messagePrefix: "🙏 பஜனை போட்டி பதிவு",
    placeholder_name: "உங்கள் பெயரை உள்ளிடவும்",
    placeholder_group: "குழுவின் பெயரை உள்ளிடவும்",
    placeholder_members: "எண்ணிக்கை (உதாரணம்: 8)",
    placeholder_city: "ஊர் / நகரம்",
    placeholder_contact: "9876543210",
    placeholder_age: "வயது (உதாரணம்: 25)"
  },
  en: {
    title: "Registration Form",
    name: "Name",
    group: "Group Name",
    members: "Members Total",
    city: "City",
    contact: "Contact No",
    age: "Age",
    submit: "📲 Register via WhatsApp",
    messagePrefix: "🙏 Bhajan Competition Registration",
    placeholder_name: "Enter your name",
    placeholder_group: "Enter group name",
    placeholder_members: "Members count (e.g. 5)",
    placeholder_city: "City / Town",
    placeholder_contact: "9876543210",
    placeholder_age: "Age (e.g. 25)"
  }
};

const RegistrationForm = () => {
  const [lang, setLang] = useState("ta");
  const t = formContent[lang];

  const [formData, setFormData] = useState({
    name: '',
    group: '',
    members: '',
    city: '',
    contact: '',
    age: ''
  });

  // Check if registration is still open
  const targetDate = new Date('2026-04-12T23:59:59').getTime();
  const [isPastDeadline, setIsPastDeadline] = useState(new Date().getTime() > targetDate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (new Date().getTime() > targetDate) {
      setIsPastDeadline(true);
      return;
    }

    const whatsappNumber = "+919790482900";
    
    // Construct message based on language
    let message = "";
    if (lang === 'ta') {
      message = `${t.messagePrefix}\n\nபெயர்: ${formData.name}\nகுழு பெயர்: ${formData.group}\nஉறுப்பினர்கள்: ${formData.members}\nநகரம்: ${formData.city}\nதொடர்பு எண்: ${formData.contact}\nவயது: ${formData.age}`;
    } else {
      message = `${t.messagePrefix}\n\nName: ${formData.name}\nGroup Name: ${formData.group}\nMembers: ${formData.members}\nCity: ${formData.city}\nContact: ${formData.contact}\nAge: ${formData.age}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(url, "_blank");
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden relative border border-brand-saffron/10 group">
      
      {/* Decorative Top Bar */}
      <div className="h-2 w-full bg-gradient-to-r from-brand-saffron via-brand-gold to-brand-saffron opacity-80" />

      {/* Language Toggle */}
      {!isPastDeadline && (
        <div className="absolute top-6 right-6 z-10">
          <button 
            onClick={(e) => {
              e.preventDefault();
              setLang(lang === 'ta' ? 'en' : 'ta');
            }}
            className="bg-brand-saffron/5 hover:bg-brand-saffron text-brand-saffron hover:text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-saffron/20 transition-all duration-300 active:scale-95 shadow-sm"
          >
            {lang === 'ta' ? 'English' : 'தமிழ்'}
          </button>
        </div>
      )}

      <div className="p-8 sm:p-12 relative min-h-[400px] flex flex-col justify-center">
        {isPastDeadline ? (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-red-50 border border-red-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <span className="text-4xl text-red-500">🚫</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-gray-900 leading-tight">
                {lang === 'ta' ? 'பதிவு முடிந்தது' : 'Registration Closed'}
              </h3>
              <p className="text-gray-500 font-medium max-w-[280px] mx-auto text-sm">
                {lang === 'ta' 
                  ? 'மன்னிக்கவும்! இந்த போட்டிக்கான பதிவு தேதி முடிந்துவிட்டது.' 
                  : 'We are sorry! The registration deadline for this competition has passed.'}
              </p>
            </div>
            <div className="pt-4">
               <button 
                  onClick={() => setLang(lang === 'ta' ? 'en' : 'ta')}
                  className="text-brand-saffron text-xs font-black uppercase tracking-widest border-b border-brand-saffron/20 pb-0.5"
                >
                  {lang === 'ta' ? 'Switch to English' : 'தமிழ் மொழிக்கு மாற'}
                </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <h3 className="text-xl sm:text-2xl font-serif font-black text-gray-900 mb-1">
                {lang === 'ta' ? 'தகவல்களைப் பகிரவும்' : 'Fill Your Details'}
              </h3>
              <p className="text-sm text-gray-400 font-medium">{lang === 'ta' ? 'அனைத்து இடங்களையும் முறையாக நிரப்பவும்' : 'Please complete all required fields'}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-brand-saffron/80 uppercase tracking-[0.2em] ml-1 min-h-[1.5rem] flex items-center">
                  {t.name}
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.placeholder_name}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 outline-none transition-all duration-300 text-gray-900 font-bold placeholder:text-gray-300 placeholder:font-normal"
                />
              </div>

              {/* Group Name Field */}
              <div className="space-y-2">
                <label className="block text-[11px] font-black text-brand-saffron/80 uppercase tracking-[0.2em] ml-1 min-h-[1.5rem] flex items-center">
                  {t.group}
                </label>
                <input
                  required
                  type="text"
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                  placeholder={t.placeholder_group}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 outline-none transition-all duration-300 text-gray-900 font-bold placeholder:text-gray-300 placeholder:font-normal"
                />
              </div>

              {/* Members and Age Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                <div className="space-y-2">
                  <label className="block text-[11px] font-black text-brand-saffron/80 uppercase tracking-[0.2em] ml-1 min-h-[2.5rem] flex items-end pb-1 leading-tight">
                    {t.members}
                  </label>
                  <input
                    required
                    type="number"
                    name="members"
                    value={formData.members}
                    onChange={handleChange}
                    placeholder={t.placeholder_members}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 outline-none transition-all duration-300 text-gray-900 font-bold placeholder:text-gray-300 placeholder:font-normal"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-black text-brand-saffron/80 uppercase tracking-[0.2em] ml-1 min-h-[2.5rem] flex items-end pb-1 leading-tight">
                    {t.age}
                  </label>
                  <input
                    required
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder={t.placeholder_age}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 outline-none transition-all duration-300 text-gray-900 font-bold placeholder:text-gray-300 placeholder:font-normal"
                  />
                </div>
              </div>

              {/* City and Contact Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                <div className="space-y-2">
                  <label className="block text-[11px] font-black text-brand-saffron/80 uppercase tracking-[0.2em] ml-1 min-h-[1.5rem] flex items-end pb-1">
                    {t.city}
                  </label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder={t.placeholder_city}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 outline-none transition-all duration-300 text-gray-900 font-bold placeholder:text-gray-300 placeholder:font-normal"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-black text-brand-saffron/80 uppercase tracking-[0.2em] ml-1 min-h-[1.5rem] flex items-end pb-1">
                    {t.contact}
                  </label>
                  <input
                    required
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder={t.placeholder_contact}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-brand-saffron focus:ring-4 focus:ring-brand-saffron/5 outline-none transition-all duration-300 text-gray-900 font-bold placeholder:text-gray-300 placeholder:font-normal"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="group relative w-full py-5 rounded-2xl font-black text-base sm:text-lg bg-gradient-to-r from-brand-saffron to-brand-gold text-white shadow-xl shadow-brand-saffron/20 hover:shadow-brand-saffron/40 active:scale-[0.98] transition-all duration-300 overflow-hidden transform-gpu"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {t.submit}
                  </span>
                </button>
              </div>
            </form>
          </>
        )}
        
        <p className="mt-8 text-center text-[10px] text-gray-300 font-black uppercase tracking-widest">
           🕉️ Official Registration Portal 🕉️
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
