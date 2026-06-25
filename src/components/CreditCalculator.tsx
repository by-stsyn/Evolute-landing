import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IMaskInput } from 'react-imask';
import { submitCalltouch } from '../utils/calltouch';

interface CreditCalculatorProps {
  preselectedPrice?: number;
}

export const CreditCalculator: React.FC<CreditCalculatorProps> = ({ preselectedPrice }) => {
  const [price, setPrice] = useState(preselectedPrice || 2990000);
  const [initialPayment, setInitialPayment] = useState(Math.round((preselectedPrice || 2990000) * 0.2));
  const [term, setTerm] = useState(60);

  useEffect(() => {
    if (preselectedPrice) {
      setPrice(preselectedPrice);
      setInitialPayment(Math.round(preselectedPrice * 0.2));
    }
  }, [preselectedPrice]);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
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

  // Простой расчет для визуала (не финансовая оферта)
  const creditAmount = price - initialPayment;
  const rate = 0.001; // 0.1% годовых
  const monthlyRate = rate / 12;
  const payment = creditAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -term)));

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
          subject: 'Новая заявка Evolute (Кредитный калькулятор)',
          message: 'Новая заявка Evolute (Кредитный калькулятор)',
          name,
          phone,
          price,
          initialPayment,
          term,
          monthlyPayment: Math.round(payment),
        })
      });
      await submitCalltouch({
        fio: name,
        phoneNumber: phone.replace(/[^\d+]/g, ''),
        subject: 'Новая заявка Evolute (Кредитный калькулятор)'
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="calculator" className="relative py-24 bg-gray-50 text-evolute-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Финансовые программы
          </motion.h2>
          <div className="w-24 h-1 bg-evolute-blue mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Подберите оптимальные условия кредитования. Особые ставки для электромобилей и программа господдержки.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Ползунки */}
            <div className="lg:col-span-7 flex flex-col gap-10">
              
              {/* Стоимость авто */}
              <div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Стоимость автомобиля</span>
                  <span className="text-2xl font-bold text-evolute-dark">{price.toLocaleString('ru-RU')} ₽</span>
                </div>
                <input 
                  type="range" 
                  min="1990000" 
                  max="6000000" 
                  step="50000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-evolute-blue"
                />
                <div className="flex justify-between mt-3 text-sm text-gray-400 font-medium">
                  <span>1.99 млн ₽</span>
                  <span>6.0 млн ₽</span>
                </div>
              </div>

              {/* Первоначальный взнос */}
              <div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Первоначальный взнос</span>
                  <span className="text-2xl font-bold text-evolute-dark">{initialPayment.toLocaleString('ru-RU')} ₽</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={price * 0.8} 
                  step="50000"
                  value={initialPayment}
                  onChange={(e) => setInitialPayment(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-evolute-blue"
                />
                <div className="flex justify-between mt-3 text-sm text-gray-400 font-medium">
                  <span>0 ₽</span>
                  <span>{(price * 0.8).toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              {/* Срок кредита */}
              <div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Срок кредита</span>
                  <span className="text-2xl font-bold text-evolute-dark">{term} мес.</span>
                </div>
                <input 
                  type="range" 
                  min="12" 
                  max="84" 
                  step="12"
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-evolute-blue"
                />
                <div className="flex justify-between mt-3 text-sm text-gray-400 font-medium">
                  <span>12 мес.</span>
                  <span>84 мес.</span>
                </div>
              </div>
            </div>

            {/* Результат */}
            <div className="lg:col-span-5 flex flex-col justify-center bg-gray-50 border border-gray-100 rounded-2xl p-8 shadow-inner">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-2 text-sm font-bold text-gray-500 uppercase tracking-wider">Ваш платеж составит</div>
                  <div className="text-5xl font-bold text-evolute-blue mb-8">
                    {Math.round(payment).toLocaleString('ru-RU')} <span className="text-2xl text-gray-400">₽ / мес</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8 text-sm font-medium text-gray-700">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-evolute-blue"></div>
                      Ставка от 0,1% годовых
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-evolute-blue"></div>
                      Рассмотрение по 2 документам
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-evolute-orange"></div>
                      Действует скидка по госпрограмме
                    </li>
                  </ul>
                  
                  <div className="space-y-4 mb-6">
                    <input 
                      type="text" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Ваше имя" 
                      className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-evolute-dark placeholder-gray-400 focus:outline-none focus:border-evolute-blue focus:ring-1 focus:ring-evolute-blue transition-colors shadow-sm"
                      required
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+7 (___) ___-__-__" 
                      maxLength={18}
                      className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-evolute-dark placeholder-gray-400 focus:outline-none focus:border-evolute-blue focus:ring-1 focus:ring-evolute-blue transition-colors shadow-sm"
                      required
                    />
                  </div>

                  <button type="submit" className="w-full bg-evolute-blue hover:bg-[#327bb3] text-white py-4 rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-evolute-blue/30 transition-all transform hover:-translate-y-0.5">
                    Получить одобрение
                  </button>
                  <label className="flex items-start gap-2 mt-4 cursor-pointer">
                    <input type="checkbox" required className="mt-0.5" />
                    <span className="text-[10px] text-gray-400 text-left">
                      Я даю согласие группе компаний «Прагматика» на обработку <a href="/privacy.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">персональных данных</a>.
                    </span>
                  </label>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Заявка принята</h3>
                  <p className="text-gray-600">
                    Ожидайте звонка специалиста кредитного отдела. Мы подготовим для вас лучшее предложение.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
