import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { CalltouchPhone } from './CalltouchPhone';

export const Contacts: React.FC = () => {
  return (
    <section id="contacts" className="bg-white text-evolute-dark py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Контакты
          </motion.h2>
          <div className="w-24 h-1 bg-evolute-blue"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          
          {/* Текстовая часть */}
          <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-8 uppercase tracking-wide">Дилерский центр EVOLUTE</h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-evolute-blue/10 rounded flex items-center justify-center shrink-0">
                  <MapPin className="text-evolute-blue" size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Адрес</div>
                  <div className="text-lg font-semibold">г. Санкт-Петербург,<br/>Уральская улица, 33Б</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-evolute-blue/10 rounded flex items-center justify-center shrink-0">
                  <Clock className="text-evolute-blue" size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Режим работы</div>
                  <div className="text-lg font-semibold">Ежедневно<br/>с 9:00 до 21:00</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-evolute-blue/10 rounded flex items-center justify-center shrink-0">
                  <Phone className="text-evolute-blue" size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Телефон</div>
                  <CalltouchPhone phone="+7 (812) 448-18-61" className="text-lg font-bold hover:text-evolute-blue" />
                </div>
              </div>
            </div>

            <button className="mt-10 w-full bg-evolute-dark hover:bg-gray-800 text-white py-4 rounded font-bold uppercase tracking-wider transition-colors">
              Проложить маршрут
            </button>
          </div>

          {/* Карта */}
          <div className="lg:col-span-7 h-[400px] lg:h-auto min-h-[400px] relative bg-gray-200">
            <div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }}>
              <a 
                href="https://yandex.ru/maps/2/saint-petersburg/?utm_medium=mapframe&utm_source=maps" 
                style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}
              >
                Санкт‑Петербург
              </a>
              <a 
                href="https://yandex.ru/maps/2/saint-petersburg/house/uralskaya_ulitsa_33b/Z0kYdARpSUcBQFtjfXV0dHtgZg==/?from=tableau_yabro&ll=30.240041%2C59.955698&utm_medium=mapframe&utm_source=maps&z=18.25" 
                style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}
              >
                Уральская улица, 33Б — Яндекс Карты
              </a>
              <iframe 
                src="https://yandex.ru/map-widget/v1/?from=tableau_yabro&ll=30.240041%2C59.955698&mode=whatshere&whatshere%5Bpoint%5D=30.238814%2C59.955539&whatshere%5Bzoom%5D=17&z=18.25" 
                width="100%" 
                height="100%" 
                frameBorder="1" 
                allowFullScreen={true} 
                style={{ position: 'relative', border: 'none' }}
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
