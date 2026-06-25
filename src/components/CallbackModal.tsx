import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { IMaskInput } from 'react-imask';
import { submitCalltouch } from '../utils/calltouch';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({ isOpen, onClose }) => {
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
          subject: 'Новая заявка Evolute (Обратный звонок)',
          message: 'Новая заявка Evolute (Обратный звонок)',
          name,
          phone,
        })
      });
      await submitCalltouch({
        fio: name,
        phoneNumber: phone.replace(/[^\d+]/g, ''),
        subject: 'Новая заявка Evolute (Обратный звонок)'
      });
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setTimeout(() => {
            setIsSubmitted(false);
            setName('');
            setPhone('');
        }, 500);
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-evolute-dark transition-colors z-10"
            >
              <X size={24} />
            </button>
            
            <div className="p-8">
              {!isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-2xl font-bold text-evolute-dark mb-2">Оставить заявку</h3>
                  <p className="text-gray-500 mb-6 text-sm">Оставьте свои контакты, и наш менеджер свяжется с вами в ближайшее время.</p>
                  
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input 
                      type="text" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Ваше имя" 
                      className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-evolute-dark placeholder-gray-400 focus:outline-none focus:border-evolute-blue focus:ring-1 focus:ring-evolute-blue transition-colors"
                      required
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+7 (___) ___-__-__" 
                      maxLength={18}
                      className="w-full bg-gray-50 border border-gray-200 rounded px-4 py-3 text-evolute-dark placeholder-gray-400 focus:outline-none focus:border-evolute-blue focus:ring-1 focus:ring-evolute-blue transition-colors"
                      required
                    />
                    <button 
                      type="submit" 
                      className="w-full bg-evolute-blue hover:bg-evolute-blue-light text-white py-4 rounded font-bold uppercase tracking-wider transition-colors mt-2 shadow-[0_0_15px_rgba(68,149,209,0.3)] hover:shadow-[0_0_25px_rgba(68,149,209,0.5)]"
                    >
                      Перезвоните мне
                    </button>
                    <label className="flex items-start gap-2 mt-2 cursor-pointer">
                      <input type="checkbox" required className="mt-0.5" />
                      <span className="text-[10px] text-gray-500 text-left">
                        Я даю согласие группе компаний «Прагматика» на обработку <a href="/privacy.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">персональных данных</a>.
                      </span>
                    </label>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-evolute-dark mb-2">Заявка принята</h3>
                  <p className="text-gray-500 text-sm">
                    Спасибо! Мы перезвоним вам в ближайшее время.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
