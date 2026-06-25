import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Percent, Wrench } from 'lucide-react';

export const Advantages: React.FC = () => {
  const dealerAdvantages = [
    {
      icon: <ShieldCheck size={32} />,
      title: "ОФИЦИАЛЬНЫЙ ДИЛЕР",
      desc: "Гарантия качества и использование исключительно оригинальных запчастей при обслуживании."
    },
    {
      icon: <Percent size={32} />,
      title: "ВЫГОДНЫЕ УСЛОВИЯ",
      desc: "Лучшие программы кредитования, лизинга и trade-in с максимальной выгодой для клиента."
    },
    {
      icon: <Wrench size={32} />,
      title: "ПРОФЕССИОНАЛЬНЫЙ СЕРВИС",
      desc: "Квалифицированные специалисты, сертифицированное оборудование и индивидуальный подход."
    }
  ];

  return (
    <section className="bg-gray-50 text-evolute-dark py-24 relative border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <img src="/pragmatika-logo.png" alt="Прагматика" className="h-16 w-auto object-contain mb-8 filter brightness-0 opacity-80" />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider"
          >
            Почему выбирают <span className="text-evolute-blue">Прагматику</span>
          </motion.h2>
          <div className="w-24 h-1 bg-evolute-blue mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {dealerAdvantages.map((adv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white p-8 md:p-10 rounded-xl text-center flex flex-col items-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-evolute-blue">
                {adv.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wider text-gray-900">{adv.title}</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                {adv.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
