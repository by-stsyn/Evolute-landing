import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Car, Zap, Settings, ArrowRight, Gauge, Activity, Banknote } from 'lucide-react';
import { submitCalltouch } from '../utils/calltouch';

const questions = [
  {
    id: 'body_type',
    title: 'Какой тип кузова вы предпочитаете?',
    options: [
      { label: 'Седан (для города и комфорта)', icon: <Car size={24} strokeWidth={1.5} /> },
      { label: 'Кроссовер (практичность и вместительность)', icon: <Car size={24} strokeWidth={1.5} /> },
    ]
  },
  {
    id: 'purpose',
    title: 'Для каких целей в основном нужен автомобиль?',
    options: [
      { label: 'Ежедневные поездки по городу', icon: <Zap size={24} strokeWidth={1.5} /> },
      { label: 'Дальние путешествия с семьей', icon: <Settings size={24} strokeWidth={1.5} /> },
      { label: 'Универсальное использование', icon: <Car size={24} strokeWidth={1.5} /> },
    ]
  },
  {
    id: 'dynamics',
    title: 'Что для вас важнее: динамика или плавность хода?',
    options: [
      { label: 'Спортивная динамика и быстрый разгон', icon: <Gauge size={24} strokeWidth={1.5} /> },
      { label: 'Максимальный комфорт и плавность', icon: <Activity size={24} strokeWidth={1.5} /> },
    ]
  },
  {
    id: 'range',
    title: 'Какой запас хода для вас оптимален?',
    options: [
      { label: 'До 450 км (достаточно для города)', icon: <Zap size={24} strokeWidth={1.5} /> },
      { label: 'До 600 км (золотая середина)', icon: <Zap size={24} strokeWidth={1.5} /> },
      { label: 'Более 1000 км (гибрид/увеличенный запас)', icon: <Zap size={24} strokeWidth={1.5} /> },
    ]
  },
  {
    id: 'budget',
    title: 'На какой бюджет вы ориентируетесь?',
    options: [
      { label: 'До 2 500 000 ₽', icon: <Banknote size={24} strokeWidth={1.5} /> },
      { label: '2 500 000 - 3 500 000 ₽', icon: <Banknote size={24} strokeWidth={1.5} /> },
      { label: 'Свыше 3 500 000 ₽', icon: <Banknote size={24} strokeWidth={1.5} /> },
    ]
  }
];

export const CarSelector: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
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

  const handleSelectOption = (optionLabel: string) => {
    const question = questions[currentStep];
    const newAnswers = { ...answers, [question.id]: optionLabel };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setIsFinished(true);
      }, 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 16) return;
    
    const formattedAnswers = Object.entries(answers)
      .map(([key, val]) => {
        const q = questions.find(q => q.id === key);
        return `${q ? q.title : key}: ${val}`;
      })
      .join('\n');

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '4e8520ad-54d2-4526-8156-e58cc4ee28f8',
          subject: 'Новая заявка Evolute (Подбор автомобиля)',
          from_name: 'Подбор авто',
          phone: phone,
          message: formattedAnswers || 'Ответы не указаны',
        })
      });
      await submitCalltouch({
        fio: 'Подбор авто',
        phoneNumber: phone.replace(/[^\d+]/g, ''),
        subject: 'Новая заявка Evolute (Подбор автомобиля)'
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;

  return (
    <section className="py-24 bg-gray-50 overflow-hidden" id="quiz">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-light mb-4 text-evolute-dark tracking-tight uppercase"
          >
            Подбор автомобиля
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-[1px] bg-evolute-blue mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg"
          >
            Ответьте на {questions.length} простых вопросов, и мы подберем идеальный Evolute под ваши задачи.
          </motion.p>
        </div>

        <div className="bg-white border border-gray-200 overflow-hidden min-h-[400px] flex flex-col relative shadow-sm">
          {!isFinished ? (
            <>
              {/* Progress bar */}
              <div className="h-1 bg-gray-100 w-full">
                <motion.div 
                  className="h-full bg-evolute-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="p-8 md:p-12 flex-1 flex flex-col">
                <div className="text-sm text-gray-400 font-normal uppercase tracking-widest mb-6">
                  Вопрос {currentStep + 1} / {questions.length}
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                  >
                    <h3 className="text-2xl font-normal text-evolute-dark mb-8">
                      {currentQuestion.title}
                    </h3>

                    <div className="space-y-4">
                      {currentQuestion.options.map((option, idx) => {
                        const isSelected = answers[currentQuestion.id] === option.label;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectOption(option.label)}
                            className={`w-full flex items-center p-5 border text-left transition-all duration-300 group ${
                              isSelected 
                                ? 'border-evolute-blue bg-gray-50/50' 
                                : 'border-gray-200 hover:border-evolute-blue hover:bg-gray-50'
                            }`}
                          >
                            <div className={`w-12 h-12 flex items-center justify-center mr-5 transition-colors ${
                              isSelected ? 'text-evolute-blue' : 'text-gray-400 group-hover:text-evolute-blue'
                            }`}>
                              {option.icon}
                            </div>
                            <span className="flex-1 text-lg font-normal text-evolute-dark">
                              {option.label}
                            </span>
                            <div className={`w-6 h-6 border flex items-center justify-center transition-colors ${
                              isSelected ? 'border-evolute-blue bg-evolute-blue' : 'border-gray-300'
                            }`}>
                              {isSelected && <Check size={14} strokeWidth={3} className="text-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          ) : (
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 md:p-16 flex-1 flex flex-col items-center justify-center text-center bg-white"
                >
                  <div className="w-16 h-16 border border-green-500 text-green-500 flex items-center justify-center mb-6">
                    <Check size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-light text-evolute-dark mb-4 uppercase tracking-tight">
                    Подбор завершен
                  </h3>
                  <p className="text-gray-500 text-lg mb-8 max-w-md">
                    Мы проанализировали ваши ответы. Оставьте телефон, и мы перезвоним с персональным предложением.
                  </p>

                  <form onSubmit={handleSubmit} className="w-full max-w-md">
                    <div className="flex flex-col gap-4">
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+7 (___) ___-__-__" 
                        required
                        maxLength={18}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-evolute-blue transition-all text-lg rounded-xl"
                      />
                      <button 
                        type="submit"
                        className="w-full bg-evolute-blue hover:bg-opacity-90 text-white font-medium py-4 rounded-xl transition-all uppercase text-sm tracking-widest flex items-center justify-center gap-3"
                      >
                        Получить предложение
                        <ArrowRight size={18} strokeWidth={1.5} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-6 text-center max-w-xs mx-auto">
                      Нажимая кнопку, вы даете <a href="/consent.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">согласие на обработку персональных данных</a> и соглашаетесь с <a href="/privacy.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">политикой конфиденциальности</a>.
                    </p>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 md:p-16 flex-1 flex flex-col items-center justify-center text-center bg-white"
                >
                  <div className="w-16 h-16 border border-evolute-blue text-evolute-blue flex items-center justify-center mb-6">
                    <Check size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-light text-evolute-dark mb-4 uppercase tracking-tight">
                    Заявка принята
                  </h3>
                  <p className="text-gray-500 text-lg">
                    Наш менеджер скоро свяжется с вами по номеру <b>{phone}</b> и расскажет о подобранном автомобиле.
                  </p>
                  <button 
                    onClick={() => {
                      setIsFinished(false);
                      setIsSubmitted(false);
                      setCurrentStep(0);
                      setAnswers({});
                      setPhone('');
                    }}
                    className="mt-12 text-evolute-blue font-medium hover:opacity-80 transition-opacity uppercase text-sm tracking-widest flex items-center gap-2 mx-auto"
                  >
                    Пройти подбор заново
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};
