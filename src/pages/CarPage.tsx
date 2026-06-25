import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, animate } from 'motion/react';
import { ChevronDown, ArrowLeft, ArrowRight, Check, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { TestDrive } from '../components/TestDrive';
import { CreditCalculator } from '../components/CreditCalculator';
import { TradeIn } from '../components/TradeIn';
import { getCars, translate, Vehicle } from '../utils/carHelpers';

const SpecRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <div className="flex items-end text-sm mb-4">
    <div className="text-gray-500 bg-white pr-2 z-10 whitespace-nowrap">{label}</div>
    <div className="flex-grow border-b border-dotted border-gray-300 mb-1 mx-1"></div>
    <div className="text-gray-900 bg-white pl-2 z-10 font-medium text-right">{value}</div>
  </div>
);

const getOptionsWord = (count: number) => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 14) return 'опций';
  if (mod10 === 1) return 'опция';
  if (mod10 >= 2 && mod10 <= 4) return 'опции';
  return 'опций';
};

const AnimatedPrice = ({ value }: { value: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
    };

    const controls = animate(prevValue.current, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate(val) {
        node.textContent = formatPrice(Math.round(val));
      },
    });

    prevValue.current = value;

    return () => controls.stop();
  }, [value]);

  return <span ref={nodeRef}>{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value)}</span>;
};

export const CarPage: React.FC = () => {
  const { carId } = useParams();
  const [car, setCar] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  
  // Dynamic pricing
  const [useTradeIn, setUseTradeIn] = useState(true);
  const [useCredit, setUseCredit] = useState(true);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCar = async () => {
      try {
        const allCars = await getCars();
        const foundCar = allCars.find(c => c.id === Number(carId));
        
        if (foundCar) {
          setCar(foundCar);
          if (foundCar.photos?.photo) {
            setActivePhoto(
              Array.isArray(foundCar.photos.photo) 
                ? foundCar.photos.photo[0] 
                : foundCar.photos.photo
            );
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-evolute-dark pt-20">
        <div className="w-16 h-16 border-4 border-evolute-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-evolute-dark pt-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Автомобиль не найден</h1>
        <p className="text-gray-500 mb-8 max-w-md">Возможно, он уже продан или ссылка устарела. Посмотрите другие автомобили в наличии.</p>
        <Link to="/#in-stock" className="bg-evolute-blue text-white px-8 py-3 rounded uppercase font-bold tracking-wider hover:bg-opacity-90 transition-all">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  const TRADE_IN_DISCOUNT = 150000;
  const CREDIT_DISCOUNT = 200000;
  
  let finalPrice = car.price;
  if (useTradeIn) finalPrice -= TRADE_IN_DISCOUNT;
  if (useCredit) finalPrice -= CREDIT_DISCOUNT;

  const getPhotos = () => {
    if (!car.photos?.photo) return [];
    return Array.isArray(car.photos.photo) ? car.photos.photo : [car.photos.photo];
  };

  const photosList = getPhotos();
  const currentPhotoIndex = activePhoto ? photosList.indexOf(activePhoto) : 0;

  const handlePrevPhoto = () => {
    if (photosList.length === 0) return;
    const newIndex = currentPhotoIndex === 0 ? photosList.length - 1 : currentPhotoIndex - 1;
    setActivePhoto(photosList[newIndex]);
  };

  const handleNextPhoto = () => {
    if (photosList.length === 0) return;
    const newIndex = currentPhotoIndex === photosList.length - 1 ? 0 : currentPhotoIndex + 1;
    setActivePhoto(photosList[newIndex]);
  };

  return (
    <div className="bg-white text-evolute-dark min-h-screen pt-24 font-sans pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/#in-stock" className="inline-flex items-center text-gray-500 hover:text-evolute-blue transition-colors mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Назад к списку авто
        </Link>

        {/* Заголовок как на скриншоте */}
        <h1 className="text-2xl md:text-4xl font-bold mb-8 text-gray-900">
          {translate.bodyType(car.bodyType)} {car.brand} {car.model} {translate.gearboxType(car.gearboxType)} {car.year} - {car.vin}
        </h1>

        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* Галерея слева */}
          <div className="w-full lg:w-3/5">
            <div className="bg-gray-100 rounded-xl overflow-hidden mb-4 relative aspect-[4/3] flex items-center justify-center group">
              {activePhoto ? (
                <>
                  <img 
                    src={activePhoto} 
                    alt={`${car.brand} ${car.model}`} 
                    className="w-full h-full object-cover"
                  />
                  {photosList.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrevPhoto}
                        className="absolute left-4 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-900 shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity disabled:opacity-30 disabled:hover:bg-white/80"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={handleNextPhoto}
                        className="absolute right-4 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-900 shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity disabled:opacity-30 disabled:hover:bg-white/80"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <Camera size={48} className="mb-2 opacity-50" />
                  <span>Нет фото</span>
                </div>
              )}
            </div>
            
            {photosList.length > 1 && (
              <div className="flex overflow-x-auto gap-4 pb-2 snap-x scrollbar-hide">
                {photosList.map((photo, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActivePhoto(photo)}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all snap-start ${activePhoto === photo ? 'border-evolute-blue opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={photo} alt={`${car.brand} ${car.model} фото ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Характеристики под фото */}
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                <div>
                  <SpecRow label="Год выпуска" value={car.year} />
                  <SpecRow label="Цвет" value={<span className="capitalize">{translate.color(car.bodyColor)}</span>} />
                  <SpecRow label="Кузов" value={<span className="capitalize">{translate.bodyType(car.bodyType)}</span>} />
                  <SpecRow label="Двигатель" value={<span className="capitalize">{translate.engineType(car.engineType)}</span>} />
                </div>
                <div>
                  <SpecRow label="Привод" value={<span className="capitalize">{translate.driveType(car.driveType)}</span>} />
                  {car.steeringWheel && <SpecRow label="Руль" value={<span className="capitalize">{translate.steeringWheel(car.steeringWheel)}</span>} />}
                  <SpecRow label="Пробег" value={`${car.mileage} км`} />
                  <SpecRow label="Коробка передач" value={<span className="capitalize">{translate.gearboxType(car.gearboxType)}</span>} />
                </div>
              </div>
            </div>
          </div>

          {/* Инфо и Характеристики справа */}
          <div className="w-full lg:w-2/5 flex flex-col">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              <AnimatedPrice value={finalPrice} />
            </div>
            
            {(useTradeIn || useCredit) && (
              <div className="text-gray-500 line-through text-lg mb-6">
                Без скидок: {formatPrice(car.price)}
              </div>
            )}
            
            {!useTradeIn && !useCredit && <div className="mb-8" />}

            {/* Блок скидок */}
            <div className="flex flex-col gap-3 mb-10">
              <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${useTradeIn ? 'bg-evolute-blue/10 border-evolute-blue' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${useTradeIn ? 'bg-evolute-blue border-evolute-blue' : 'border-gray-300'}`}>
                    {useTradeIn && <Check size={14} className="text-white" />}
                  </div>
                  <span className="font-medium text-gray-900">Трейд-ин</span>
                  <input type="checkbox" className="hidden" checked={useTradeIn} onChange={() => setUseTradeIn(!useTradeIn)} />
                </div>
                <span className="text-evolute-blue font-bold">-{formatPrice(TRADE_IN_DISCOUNT)}</span>
              </label>
              
              <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${useCredit ? 'bg-evolute-blue/10 border-evolute-blue' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${useCredit ? 'bg-evolute-blue border-evolute-blue' : 'border-gray-300'}`}>
                    {useCredit && <Check size={14} className="text-white" />}
                  </div>
                  <span className="font-medium text-gray-900">Кредит</span>
                  <input type="checkbox" className="hidden" checked={useCredit} onChange={() => setUseCredit(!useCredit)} />
                </div>
                <span className="text-evolute-blue font-bold">-{formatPrice(CREDIT_DISCOUNT)}</span>
              </label>
            </div>

            <div className="flex flex-col gap-4 mb-4">
              <a href="#test-drive" className="w-full bg-evolute-blue hover:bg-opacity-90 text-white font-medium py-4 rounded transition-all uppercase text-sm tracking-widest text-center shadow-lg shadow-evolute-blue/20">
                Записаться на тест-драйв
              </a>
              <a href="#credit" className="w-full bg-transparent border border-gray-300 text-gray-900 hover:border-gray-400 font-medium py-4 rounded transition-all uppercase text-sm tracking-widest text-center">
                Рассчитать кредит
              </a>
            </div>
          </div>
        </div>

        {/* Комплектация */}
        {car.equipmentGroups && car.equipmentGroups.length > 0 && (
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Комплектация</h2>
            
            <div className="border-b border-gray-200 mb-6 flex gap-8">
              <button className="pb-4 border-b-2 border-evolute-blue text-evolute-blue font-medium">все опции</button>
            </div>

            <div className="space-y-4">
              {car.equipmentGroups.map((group, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50/50">
                  <button
                    onClick={() => setOpenGroup(openGroup === group.name ? null : group.name)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-gray-100 hover:bg-gray-200/70 transition-colors"
                  >
                    <span className="font-medium text-gray-900 text-lg">{group.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                        {group.elements.length} {getOptionsWord(group.elements.length)}
                      </span>
                      <ChevronDown size={20} className={`text-gray-500 transition-transform ${openGroup === group.name ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {openGroup === group.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="px-6 py-4 bg-white space-y-2">
                          {group.elements.map((el, elIdx) => (
                            <li key={elIdx} className="flex items-start text-gray-600">
                              <span className="mr-3 text-evolute-blue mt-1.5 w-1.5 h-1.5 rounded-full bg-evolute-blue flex-shrink-0"></span>
                              {el}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Технические характеристики */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Технические характеристики</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div>
              <h3 className="text-xl font-medium mb-6 text-gray-900">Двигатель</h3>
              <SpecRow label="Тип двигателя" value={<span className="capitalize">{translate.engineType(car.engineType)}</span>} />
              {car.engineVolume && <SpecRow label="Объем двигателя, л" value={car.engineVolume} />}
              <SpecRow label="Мощность, л.с." value={car.enginePower} />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-6 text-gray-900">Трансмиссия</h3>
              <SpecRow label="Тип КПП" value={<span className="capitalize">{translate.gearboxType(car.gearboxType)}</span>} />
              <SpecRow label="Тип Привода" value={<span className="capitalize">{translate.driveType(car.driveType)}</span>} />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-6 text-gray-900">Кузов</h3>
              <SpecRow label="Тип кузова" value={<span className="capitalize">{translate.bodyType(car.bodyType)}</span>} />
              <SpecRow label="Количество дверей" value="5" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-6 text-gray-900">Прочее</h3>
              <SpecRow label="Период обслуживания" value="1 раз в год или каждые 10000 км" />
            </div>
          </div>
        </div>
      </div>

      <div id="test-drive" className="bg-[#050505] text-white">
        <TestDrive preselectedModel={`${car.brand} ${car.model}`} />
      </div>
      
      <div id="credit" className="bg-[#050505] text-white">
        <CreditCalculator preselectedPrice={car.price} />
      </div>

      <div id="trade-in-section" className="bg-[#050505] text-white">
        <TradeIn />
      </div>

    </div>
  );
};
