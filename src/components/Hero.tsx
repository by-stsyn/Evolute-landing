import React from 'react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-evolute-dark overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-banner.jpg)' }}
      ></div>

      {/* Dark gradient overlay for text readability on the left */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent w-full md:w-2/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight uppercase tracking-wide">
              Осознанная <br/>
              <span className="text-evolute-blue-light">эволюция</span> на дороге
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-lg md:text-xl text-white mb-10 max-w-xl font-medium">
              Электромобили и гибриды №1 в России. Откройте для себя новые технологии, динамику и безупречный комфорт.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#models" className="bg-[#1b3b64] hover:bg-[#254b7c] text-white px-8 py-4 rounded text-sm font-semibold transition-all duration-300">
              Выбрать модель
            </a>
            <a href="#test-drive" className="bg-[#1b3b64] hover:bg-[#254b7c] text-white px-8 py-4 rounded text-sm font-semibold transition-all duration-300">
              Узнать больше
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
