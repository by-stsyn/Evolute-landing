import React from 'react';
import { motion } from 'motion/react';
import { Car } from '../types';
import { Link } from 'react-router-dom';

// Временные данные для верстки (до подключения бэкенда/фида)
const modelsList: Car[] = [
  {
    id: 'i-space',
    name: 'i-SPACE',
    type: 'Вместительный гибрид',
    price: 'от 2 890 000 ₽',
    image: '/ispace-model.jpg',
    range: '1 250',
    power: '218',
    acceleration: '8.0',
    engineType: 'Гибрид',
    driveType: 'Передний',
    features: ['7 мест', 'Запас хода 1250 км']
  },
  {
    id: 'i-joy',
    name: 'i-JOY',
    type: 'Городской кроссовер',
    price: 'от 2 490 000 ₽',
    image: '/ijoy-model.jpg',
    range: '424',
    power: '218',
    acceleration: '8.0',
    engineType: 'Электро',
    driveType: 'Передний',
    features: ['Панорамная крыша', 'Компактный и юркий']
  },
  {
    id: 'i-sky',
    name: 'i-SKY',
    type: 'Технологичный кроссовер',
    price: 'от 2 355 000 ₽',
    image: '/isky-model.jpg',
    range: '424',
    power: '218',
    acceleration: '8.6',
    engineType: 'Электро',
    driveType: 'Передний',
    features: ['Технологии будущего', 'Яркий дизайн']
  }
];

export const ModelRange: React.FC = () => {
  return (
    <section id="models" className="bg-white text-evolute-dark py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Модельный ряд
          </motion.h2>
          <div className="w-24 h-1 bg-evolute-blue mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modelsList.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 border border-gray-200 rounded overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Image Placeholder */}
              <div className="aspect-video relative overflow-hidden bg-gray-200">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
                  {car.type}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2">{car.name}</h3>
                <p className="text-xl font-medium text-evolute-blue mb-6">{car.price}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8 text-sm text-gray-600">
                  <div>
                    <span className="block text-gray-400 text-xs uppercase mb-1">Запас хода</span>
                    <strong className="text-evolute-dark font-semibold">{car.range} км</strong>
                  </div>
                  <div>
                    <span className="block text-gray-400 text-xs uppercase mb-1">Мощность</span>
                    <strong className="text-evolute-dark font-semibold">{car.power} л.с.</strong>
                  </div>
                  {car.acceleration && (
                    <div className="border-t border-gray-100 pt-3 mt-1">
                      <span className="block text-gray-400 text-xs uppercase mb-1">Разгон 0-100 км/ч</span>
                      <strong className="text-evolute-dark font-semibold">{car.acceleration} сек</strong>
                    </div>
                  )}
                  {car.engineType && (
                    <div className="border-t border-gray-100 pt-3 mt-1">
                      <span className="block text-gray-400 text-xs uppercase mb-1">Тип авто</span>
                      <strong className="text-evolute-dark font-semibold">{car.engineType}</strong>
                    </div>
                  )}
                  {car.driveType && (
                    <div className="col-span-2 border-t border-gray-100 pt-3">
                      <span className="block text-gray-400 text-xs uppercase mb-1">Привод</span>
                      <strong className="text-evolute-dark font-semibold">{car.driveType}</strong>
                    </div>
                  )}
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                  <Link 
                    to={`/models/${car.id}`}
                    className="bg-evolute-dark text-white px-4 py-3 rounded text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors text-center flex items-center justify-center"
                  >
                    Подробнее
                  </Link>
                  <button className="border-2 border-evolute-blue text-evolute-blue px-4 py-3 rounded text-xs font-bold uppercase tracking-wider hover:bg-evolute-blue hover:text-white transition-colors">
                    В наличии
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
