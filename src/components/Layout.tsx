import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CalltouchPhone } from './CalltouchPhone';
import { CallbackModal } from './CallbackModal';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Easter Egg
    console.log(
      "%c🚀 Built & Crafted by stsyn | EVOLUTE Pragmatika Platform", 
      "color: #4495d1; font-size: 13px; font-weight: bold; font-family: monospace; text-shadow: 0 0 10px rgba(68,149,209,0.3);"
    );

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const navLinks = [
    { name: 'Модельный ряд', href: '/#models' },
    { name: 'Подбор авто', href: '/#quiz' },
    { name: 'Авто в наличии', href: '/#in-stock' },
    { name: 'Тест-драйв', href: '/#test-drive' },
    { name: 'Кредит', href: '/#calculator' },
    { name: 'Контакты', href: '/#contacts' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-evolute-dark text-white font-sans selection:bg-evolute-blue selection:text-white">
      
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-gray-100 ${
        isScrolled ? 'shadow-md py-0' : 'py-2 md:py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Row - Collapses on scroll */}
          <div 
            className={`hidden md:flex items-center justify-between transition-all duration-300 overflow-hidden ${
              isScrolled ? 'h-0 opacity-0' : 'h-16 opacity-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <Link to="/">
                <img src="/logo.svg" alt="EVOLUTE" className="h-7 w-auto object-contain" />
              </Link>
              <div className="border-l border-gray-200 pl-4">
                <div className="text-[11px] leading-tight text-gray-500 font-medium">
                  Прагматика Evolute - официальный<br/>
                  дилер Evolute в Санкт-Петербурге
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex flex-col items-end">
                <div className="text-[11px] text-gray-500 font-medium flex items-center gap-1">
                  <MapPin size={12} /> Уральская, 33Б
                </div>
                <div className="text-[11px] text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                  <Clock size={12} /> с 9:00 до 21:00
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <CalltouchPhone 
                  phone="+7 (812) 448-18-61" 
                  className="text-base font-bold text-evolute-dark hover:text-evolute-blue" 
                />
                <span onClick={openModal} className="text-[10px] text-evolute-blue font-bold uppercase tracking-wider cursor-pointer hover:underline">
                  Заказать звонок
                </span>
              </div>

              <button onClick={openModal} className="bg-evolute-blue hover:bg-evolute-blue-light text-white px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wide transition-all duration-300">
                Оставить заявку
              </button>
            </div>
          </div>

          {/* Bottom Row - Stays, adapts on scroll */}
          <div className={`hidden md:flex items-center transition-all duration-300 ${
            isScrolled ? 'h-16 justify-between' : 'h-10 justify-start gap-8'
          }`}>
            
            {/* Elements that appear only when scrolled */}
            <div className={`flex items-center transition-all duration-300 overflow-hidden ${
              isScrolled ? 'w-32 opacity-100' : 'w-0 opacity-0'
            }`}>
              <Link to="/">
                <img src="/logo.svg" alt="EVOLUTE" className="h-5 w-auto object-contain" />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className={`flex items-center text-[12px] lg:text-[13px] font-semibold text-evolute-dark uppercase tracking-wider transition-all duration-300 ${
              isScrolled ? 'gap-4 lg:gap-6' : 'gap-6 lg:gap-8'
            }`}>
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-evolute-blue transition-colors whitespace-nowrap">
                  {link.name}
                </a>
              ))}
            </div>

            {/* Elements that appear only when scrolled */}
            <div className={`flex items-center transition-all duration-300 overflow-hidden ${
              isScrolled ? 'opacity-100 w-auto gap-4' : 'opacity-0 w-0 gap-0'
            }`}>
              <CalltouchPhone 
                phone="+7 (812) 448-18-61" 
                className="text-sm font-bold text-evolute-dark hover:text-evolute-blue whitespace-nowrap" 
              />
              <button onClick={openModal} className="bg-evolute-blue hover:bg-evolute-blue-light text-white px-4 py-2 rounded text-[11px] font-bold uppercase tracking-wide transition-all duration-300 whitespace-nowrap">
                Заявка
              </button>
            </div>

          </div>

          {/* Mobile Header */}
          <div className={`md:hidden flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-14' : 'h-16'
          }`}>
            <Link to="/">
              <img src="/logo.svg" alt="EVOLUTE" className={`transition-all duration-300 object-contain ${
                isScrolled ? 'h-5' : 'h-6'
              }`} />
            </Link>
            <button
              className="text-evolute-dark p-2 -mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Promo Banner - Added to match official site */}
        <div className="bg-[#4a90e2] text-white py-2 text-center w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm md:text-base font-semibold uppercase tracking-wide flex flex-col md:flex-row justify-center items-center gap-1 md:gap-4">
            <span>Кредит от 0,01% на приобретение электрических и гибридных Evolute</span>
            <a href="#calculator" className="underline decoration-2 underline-offset-4 hover:text-gray-200 transition-colors">Узнать подробнее</a>
          </div>
        </div>
      </header>

      {/* Мобильное меню (Overlay) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-4 flex flex-col md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-6 text-center text-evolute-dark py-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xl font-bold uppercase tracking-wider hover:text-evolute-blue transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              <div className="mt-8 flex flex-col items-center gap-6 border-t border-gray-100 pt-8">
                <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><MapPin size={16} /> Уральская, 35</span>
                  <span className="flex items-center gap-1.5"><Clock size={16} /> с 9:00 до 21:00</span>
                </div>

                <CalltouchPhone 
                  phone="+7 (812) 448-18-61" 
                  className="text-3xl font-bold text-evolute-blue" 
                />
                <button onClick={(e) => { setIsMobileMenuOpen(false); openModal(e); }} className="w-full text-center bg-evolute-blue text-white px-6 py-4 rounded font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(68,149,209,0.4)]">
                  Оставить заявку
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-[80px] md:pt-[140px]">
        {children}
      </main>

      <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Подвал (Footer) */}
      <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top part with Logo and Phone */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 mb-10 gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <Link to="/">
                <div className="w-[150px] h-auto flex items-center justify-start rounded text-gray-400 text-sm font-medium">
                  <img src="/logo.svg" alt="EVOLUTE" className="h-8 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                </div>
              </Link>
              <div className="text-[13px] text-gray-400 sm:border-l sm:border-white/20 sm:pl-6 leading-tight">
                Прагматика — официальный дилер Evolute<br className="hidden sm:block" />в Санкт-Петербурге
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-5 py-3 rounded-lg border border-white/10">
              <Phone size={18} className="text-evolute-blue" />
              <CalltouchPhone phone="+7 (812) 448-18-61" className="text-lg font-bold text-white hover:text-evolute-blue transition-colors" />
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 mb-16">
            <div>
              <h4 className="text-white font-bold mb-6 text-base">Модельный ряд</h4>
              <ul className="space-y-4 text-[13px] text-gray-400">
                <li><Link to="/models/i-joy" className="hover:text-evolute-blue transition-colors">Evolute i-JOY</Link></li>
                <li><Link to="/models/i-sky" className="hover:text-evolute-blue transition-colors">Evolute i-SKY</Link></li>
                <li><Link to="/models/i-space" className="hover:text-evolute-blue transition-colors">Evolute i-SPACE</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-base">Покупка</h4>
              <ul className="space-y-4 text-[13px] text-gray-400">
                <li><a href="/#in-stock" className="hover:text-evolute-blue transition-colors">Автомобили в наличии</a></li>
                <li><a href="/#quiz" className="hover:text-evolute-blue transition-colors">Подбор авто</a></li>
                <li><a href="/#calculator" className="hover:text-evolute-blue transition-colors">Кредит</a></li>
                <li><a href="/#calculator" className="hover:text-evolute-blue transition-colors">Трейд-ин</a></li>
                <li><a href="/#test-drive" className="hover:text-evolute-blue transition-colors">Тест-драйв</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-base">О нас</h4>
              <ul className="space-y-4 text-[13px] text-gray-400">
                <li><a href="/#contacts" className="hover:text-evolute-blue transition-colors">Контакты</a></li>
              </ul>
            </div>
          </div>
          
          {/* Legal Texts */}
          <div className="border-t border-white/10 pt-8 text-[11px] text-gray-500 space-y-5">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <a href="/privacy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Политика конфиденциальности</a>
              <a href="/consent.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">Согласие на обработку персональных данных</a>
            </div>
            
            <p className="leading-relaxed">
              Evolute | Прагматика – официальный дилер Эволют в Санкт-Петербурге. Купить новые i-PRO, i-JOY, i-SKY, i-SPACE, i-JET в автосалоне Evolute. В наличии новые авто и Эволют с пробегом по выгодным ценам. Тест-драйв перед покупкой, Evolute в кредит с минимальным взносом и прием авто по программе трейд-ин.
            </p>
            
            <p className="font-medium text-gray-400">ООО "Прагматика" ИНН 0000000000 ОГРН 0000000000000</p>
            
            <p className="leading-relaxed text-gray-600/80 mt-6 pb-12 md:pb-0 text-justify">
              Обращаем ваше внимание на то, что данный Интернет-сайт носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации. Для получения подробной информации о комплектации и стоимости автомобилей Эволют и др., пожалуйста, обращайтесь к менеджерам по продажам официального дилера Evolute.
              <br/>* Данную стоимость можно достичь, воспользовавшись нашими услугами: Кредит, Трейд-ин. Подробности в отделах продаж и по телефонам автосалона.
              <span className="cursor-default select-none opacity-[0.05] hover:opacity-100 text-[8px] ml-2 transition-all duration-700 pointer-events-auto text-white/50" title="Designed & Developed by stsyn">stsyn</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Плавающая мобильная панель (Bottom Bar) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-header border-t border-white/10 p-4 z-40 flex gap-3 pb-safe bg-evolute-dark/90 backdrop-blur-xl">
        <a 
          href="tel:+78124481861" 
          className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded py-3.5 text-sm font-semibold text-white active:bg-white/10 transition-colors calltouch-phone"
        >
          <Phone size={18} className="text-evolute-blue" />
          Позвонить
        </a>
        <button onClick={openModal} className="flex-1 bg-evolute-blue rounded py-3.5 text-sm font-semibold text-white box-glow active:bg-evolute-blue-light transition-colors">
          Оставить заявку
        </button>
      </div>
    </div>
  );
};
