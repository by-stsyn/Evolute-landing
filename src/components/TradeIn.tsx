import React, { useState } from 'react';
import { motion } from 'motion/react';
import { submitCalltouch } from '../utils/calltouch';

export const TradeIn: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (!input || input === '+7' || input === '+7 ' || input === '+7 (') {
      setPhone('');
      return;
    }
    const digits = input.replace(/\D/g, '');
    let cleanDigits = digits;
    if (digits.startsWith('7') || digits.startsWith('8')) {
      cleanDigits = digits.substring(1);
    }
    if (cleanDigits.length === 0) {
      setPhone('+7');
      return;
    }
    let formatted = '+7';
    if (cleanDigits.length > 0) formatted += ` (${cleanDigits.substring(0, 3)}`;
    if (cleanDigits.length >= 4) formatted += `) ${cleanDigits.substring(3, 6)}`;
    if (cleanDigits.length >= 7) formatted += `-${cleanDigits.substring(6, 8)}`;
    if (cleanDigits.length >= 9) formatted += `-${cleanDigits.substring(8, 10)}`;
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 16) return;
    
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '4e8520ad-54d2-4526-8156-e58cc4ee28f8',
          subject: 'Новая заявка Evolute (Трейд-ин)',
          message: 'Новая заявка Evolute (Трейд-ин)',
          name,
          phone,
          carMake,
          carModel,
          carYear,
        })
      });
      await submitCalltouch({
        fio: name,
        phoneNumber: phone.replace(/[^\d+]/g, ''),
        subject: `Новая заявка Evolute (Трейд-ин: ${carMake} ${carModel} ${carYear})`
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section 
      id="trade-in" 
      className="relative py-24 bg-evolute-dark text-white overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/trade-in.jpg)' }}
      ></div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-l from-black/95 via-black/80 to-transparent w-full right-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl ml-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wide"
          >
            Программа <span className="text-[#4495d1]">Трейд-ин</span>
          </motion.h2>
          <div className="w-24 h-1 bg-[#1b3b64] mb-8"></div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white mb-12 text-lg font-medium leading-relaxed max-w-xl"
          >
            Обменяйте свой старый автомобиль на новый Evolute с дополнительной выгодой. Оценим ваш автомобиль быстро и справедливо.
          </motion.p>

          {!isSubmitted ? (
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-2xl flex flex-col gap-6 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-2">Оценить автомобиль</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ваше имя" 
                  className="bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-[#4495d1] focus:ring-1 focus:ring-[#4495d1] transition-colors"
                  required
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+7 (___) ___-__-__" 
                  maxLength={18}
                  className="bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-[#4495d1] focus:ring-1 focus:ring-[#4495d1] transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <input 
                  type="text" 
                  value={carMake}
                  onChange={e => setCarMake(e.target.value)}
                  placeholder="Марка" 
                  className="bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-[#4495d1] focus:ring-1 focus:ring-[#4495d1] transition-colors"
                  required
                />
                <input 
                  type="text" 
                  value={carModel}
                  onChange={e => setCarModel(e.target.value)}
                  placeholder="Модель" 
                  className="bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-[#4495d1] focus:ring-1 focus:ring-[#4495d1] transition-colors"
                  required
                />
                <input 
                  type="number" 
                  value={carYear}
                  onChange={e => setCarYear(e.target.value)}
                  placeholder="Год" 
                  min="1980"
                  max={new Date().getFullYear()}
                  className="bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-[#4495d1] focus:ring-1 focus:ring-[#4495d1] transition-colors"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="bg-[#1b3b64] hover:bg-[#254b7c] text-white py-4 rounded font-bold uppercase tracking-wider transition-colors mt-2"
              >
                Получить оценку
              </button>
              <label className="flex items-start gap-2 mt-2 cursor-pointer">
                <input type="checkbox" required className="mt-0.5" />
                <span className="text-[10px] text-gray-400 text-left">
                  Я даю согласие группе компаний «Прагматика» на обработку <a href="/privacy.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">персональных данных</a>.
                </span>
              </label>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-2xl flex flex-col items-center justify-center text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-evolute-blue/20 text-evolute-blue rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Заявка отправлена!</h3>
              <p className="text-gray-300">
                Наш специалист по трейд-ин свяжется с вами в ближайшее время для предварительной оценки вашего автомобиля.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
