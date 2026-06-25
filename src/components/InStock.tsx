import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Car, Fuel, Calendar, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCars, translate, Vehicle } from '../utils/carHelpers';

// ==========================================
// НАСТРОЙКИ БЛОКА
// ==========================================
// Измените на false, чтобы скрыть весь блок "Авто в наличии"
const SHOW_IN_STOCK_BLOCK = true;
// ==========================================

export const InStock: React.FC = () => {
  const [cars, setCars] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    if (!SHOW_IN_STOCK_BLOCK) return;
    
    const fetchCars = async () => {
      try {
        const allCars = await getCars();
        // Фильтруем машины Evolute
        const evoluteCars = allCars.filter(car => 
          car.brand === 'Evolute' || car.brand.toLowerCase().includes('evolute')
        );
        setCars(evoluteCars);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (!SHOW_IN_STOCK_BLOCK) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  const getThumbnail = (car: Vehicle) => {
    const photoData = car.photos?.photo;
    if (Array.isArray(photoData) && photoData.length > 0) return photoData[0];
    if (typeof photoData === 'string') return photoData;
    return '/ispace-hero.jpg'; // fallback
  };

  const visibleCars = cars.slice(0, visibleCount);
  const hasMore = visibleCount < cars.length;

  const showMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <section id="in-stock" className="bg-[#050505] text-white py-24 relative overflow-hidden">
      {/* Декоративное свечение */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-evolute-blue/10 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Авто в наличии
            </motion.h2>
            <div className="w-24 h-1 bg-evolute-blue"></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <button className="text-sm font-bold uppercase tracking-wider hover:text-evolute-blue transition-colors flex items-center gap-2">
              Смотреть все <span className="text-xl">→</span>
            </button>
          </motion.div>
        </div>

        {loading ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm p-12 text-center min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-evolute-blue/5 to-transparent pointer-events-none"></div>
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-full bg-evolute-blue/20 flex items-center justify-center mb-8"
            >
              <div className="w-10 h-10 border-4 border-evolute-blue border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">Синхронизация каталога</h3>
            <p className="text-gray-400 max-w-md mx-auto text-lg">Загружаем актуальные автомобили...</p>
          </motion.div>
        ) : error || cars.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm p-12 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">В данный момент нет автомобилей Evolute в наличии</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Оставьте заявку, и мы сообщим вам, когда появится нужный вам автомобиль.
            </p>
            <button className="mt-8 bg-evolute-blue text-white px-8 py-3 font-medium hover:bg-opacity-90 transition-all uppercase text-sm tracking-wide">
              Оставить заявку
            </button>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {visibleCars.map((car, idx) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={`/cars/${car.id}`}
                    className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-evolute-blue/50 transition-colors group flex flex-col h-full block"
                  >
                    <div className="relative h-48 overflow-hidden bg-gray-900">
                      <img 
                        src={getThumbnail(car)} 
                        alt={`${car.brand} ${car.model}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-evolute-blue text-white text-xs font-bold px-3 py-1 uppercase rounded-full">
                        В наличии
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold group-hover:text-evolute-blue transition-colors">
                          {car.brand} {car.model}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">VIN: {car.vin}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center text-sm text-gray-300">
                          <Calendar size={16} className="text-evolute-blue mr-2" />
                          {car.year} г.в.
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <Gauge size={16} className="text-evolute-blue mr-2" />
                          {car.mileage} км
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <Fuel size={16} className="text-evolute-blue mr-2" />
                          {translate.engineType(car.engineType)}
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <Car size={16} className="text-evolute-blue mr-2" />
                          {car.enginePower} л.с.
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-white/10 flex items-end justify-between">
                        <div>
                          <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Стоимость</span>
                          <div className="flex flex-col">
                            <span className="text-gray-500 line-through text-sm mb-0.5">{formatPrice(car.price)}</span>
                            <strong className="text-2xl font-bold text-white">{formatPrice(car.price - 150000 - 200000)}</strong>
                          </div>
                        </div>
                        <button className="text-evolute-blue hover:text-white transition-colors">
                          <span className="sr-only">Подробнее</span>
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-evolute-blue group-hover:text-white transition-colors">
                            →
                          </div>
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button 
                  onClick={showMore}
                  className="bg-transparent border border-white/30 hover:border-evolute-blue hover:text-evolute-blue text-white px-8 py-3 rounded-full font-medium transition-all"
                >
                  Показать еще
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
