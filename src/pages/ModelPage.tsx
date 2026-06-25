import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useParams, Navigate } from 'react-router-dom';
import { modelsData } from '../data/models';
import { TestDrive } from '../components/TestDrive';
import { CreditCalculator } from '../components/CreditCalculator';
import { ImageGallery } from '../components/ImageGallery';

export const ModelPage: React.FC = () => {
  const { modelId } = useParams();
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [activeConfigIndex, setActiveConfigIndex] = useState(0);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [modelId]);

  if (!modelId || !modelsData[modelId]) {
    return <Navigate to="/" replace />;
  }

  const model = modelsData[modelId];
  const parsedPrice = parseInt(model.stats.price.replace(/\D/g, ''), 10) || 2990000;

  return (
    <div className="bg-white text-evolute-dark font-sans">
      
      {/* Overview Section */}
      <section className="pt-16 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Обзор {model.title}</h1>
        <p className="text-gray-500 text-sm md:text-base max-w-4xl leading-relaxed">
          {model.description}
        </p>
      </section>

      {/* Exterior & Interior Title */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">Экстерьер и интерьер</h2>
      </section>

      {/* Exterior Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12">
          <div className="order-2 lg:order-1 relative aspect-[4/3] rounded overflow-hidden">
             <ImageGallery 
               images={model.exterior.images.length > 0 ? model.exterior.images : [{ src: model.heroImage, alt: model.exterior.title }]} 
               placeholderText={model.exterior.title}
             />
          </div>
          <div className="order-1 lg:order-2">
             <h3 className="text-xl font-bold text-evolute-blue mb-4">{model.exterior.title}</h3>
             <p className="text-gray-600 text-sm mb-6 leading-relaxed">
               {model.exterior.description}
             </p>
             <ul className="space-y-3">
               {model.exterior.features.map((feature, idx) => (
                 <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0 mt-1.5"></div>
                    <span>{feature}</span>
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </section>

      {/* Interior Block */}
      <section className="bg-[#333333] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12">
            <div>
               <h3 className="text-xl font-bold text-evolute-blue mb-4">{model.interior.title}</h3>
               <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                 {model.interior.description}
               </p>
               <ul className="space-y-3">
                 {model.interior.features.map((feature, idx) => (
                   <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0 mt-1.5"></div>
                      <span>{feature}</span>
                   </li>
                 ))}
               </ul>
            </div>
            <div className="relative aspect-[4/3] rounded overflow-hidden">
               <ImageGallery 
                 images={model.interior.images.length > 0 ? model.interior.images : [{ src: model.heroImage, alt: model.interior.title }]} 
                 placeholderText={model.interior.title}
               />
            </div>
          </div>
        </div>
      </section>

      {/* Test Drive Section (Lead Magnet) */}
      <TestDrive preselectedModel={model.name} />

      {/* Configuration & Prices */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Комплектации и цены {model.title}</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-4xl">
          Новый {model.name} представлен в отличной комплектации. С ценами вы можете ознакомиться на сайте, по телефону или лично в автосалоне официального дилера.
        </p>

        {/* Fake Tabs / Configurations */}
        {model.configurations && model.configurations.length > 0 ? (
          <>
            <div className="border-b border-gray-200 mb-6 flex overflow-x-auto space-x-2">
              {model.configurations.map((config, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveConfigIndex(idx);
                    setOpenAccordion(0);
                  }}
                  className={`px-6 py-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeConfigIndex === idx
                      ? 'border-evolute-blue text-evolute-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {config.name}
                </button>
              ))}
            </div>
            
            <div className="mb-6">
              <span className="text-xl text-evolute-dark font-normal">Цена </span>
              <span className="text-2xl font-medium text-evolute-dark">
                {model.configurations[activeConfigIndex].price}
              </span>
            </div>
          </>
        ) : (
          <div className="border-b border-gray-200 mb-8 flex">
            <div className="inline-block px-6 py-3 border-b-2 border-evolute-blue text-evolute-blue text-sm font-medium">
              {model.name}
            </div>
          </div>
        )}

        {/* Accordions */}
        <div className="space-y-2 max-w-5xl">
          {(model.configurations ? model.configurations[activeConfigIndex].equipment : model.equipment || []).map((category, idx) => (
             <div key={idx} className="border border-gray-100 bg-gray-50 rounded">
               <button 
                 onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                 className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
               >
                 <span className="font-medium text-sm text-evolute-dark">{category.title}</span>
                 <motion.div
                   animate={{ rotate: openAccordion === idx ? 180 : 0 }}
                   transition={{ duration: 0.2 }}
                 >
                   <ChevronDown size={20} className="text-gray-500" />
                 </motion.div>
               </button>
               <AnimatePresence>
                 {openAccordion === idx && (
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     className="overflow-hidden"
                   >
                     <div className="px-6 pb-6 pt-2">
                       <ul className="space-y-3">
                         {category.items.map((item, itemIdx) => (
                           <li key={itemIdx} className="text-sm text-gray-600 flex items-start gap-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0 mt-1.5"></div>
                             {item}
                           </li>
                         ))}
                       </ul>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          ))}
        </div>
      </section>

      {/* Credit Calculator Section (Lead Magnet) */}
      <CreditCalculator preselectedPrice={parsedPrice} />

      {/* Technical Specifications */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Технические характеристики</h2>
        <p className="text-gray-500 text-sm mb-12 max-w-4xl leading-relaxed">
          В таких областях, как крутящий момент и ускорение, электромобили работают лучше, чем автомобили с двигателем внутреннего сгорания. Поскольку система привода электрическая, а не механическая, отклик мгновенный, без запаздывания типичного газового двигателя. В то же время электромобили тише и плавный, что делает вождение более приятным.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          
          {/* Column 1 */}
          <div className="space-y-12">
            <div>
              <h4 className="text-lg font-medium text-evolute-dark mb-4">Общие информация</h4>
              <div className="space-y-0 text-sm">
                 {model.specs.dynamics.slice(4).concat(model.specs.engine.slice(0, 1)).map((spec, i) => (
                   <div key={i} className="flex justify-between py-3 border-b border-gray-200 border-dashed">
                     <span className="text-gray-500">{spec.label}</span>
                     <span className="text-evolute-dark text-right max-w-[50%]">{spec.value}</span>
                   </div>
                 ))}
                 <div className="flex justify-between py-3 border-b border-gray-200 border-dashed">
                   <span className="text-gray-500">Количество дверей:</span>
                   <span className="text-evolute-dark text-right">4/5</span>
                 </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-evolute-dark mb-4">Размеры, объём и масса</h4>
              <div className="space-y-0 text-sm">
                 {model.specs.dimensions.map((spec, i) => (
                   <div key={i} className="flex justify-between py-3 border-b border-gray-200 border-dashed">
                     <span className="text-gray-500">{spec.label}</span>
                     <span className="text-evolute-dark text-right max-w-[50%]">{spec.value}</span>
                   </div>
                 ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-evolute-dark mb-4">Электродвигатель</h4>
              <div className="space-y-0 text-sm">
                 {model.specs.engine.slice(0,3).map((spec, i) => (
                   <div key={i} className="flex justify-between py-3 border-b border-gray-200 border-dashed">
                     <span className="text-gray-500">{spec.label}</span>
                     <span className="text-evolute-dark text-right max-w-[50%]">{spec.value}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-12">
            <div>
              <h4 className="text-lg font-medium text-evolute-dark mb-4">Тяговая батарея</h4>
              <div className="space-y-0 text-sm">
                 {model.specs.engine.slice(3).concat(model.specs.dynamics.slice(2, 4)).map((spec, i) => (
                   <div key={i} className="flex justify-between py-3 border-b border-gray-200 border-dashed">
                     <span className="text-gray-500">{spec.label}</span>
                     <span className="text-evolute-dark text-right max-w-[50%]">{spec.value}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-evolute-dark mb-4">Динамические характеристики</h4>
              <div className="space-y-0 text-sm">
                 {model.specs.dynamics.slice(0, 2).map((spec, i) => (
                   <div key={i} className="flex justify-between py-3 border-b border-gray-200 border-dashed">
                     <span className="text-gray-500">{spec.label}</span>
                     <span className="text-evolute-dark text-right max-w-[50%]">{spec.value}</span>
                   </div>
                 ))}
                 <div className="flex justify-between py-3 border-b border-gray-200 border-dashed">
                   <span className="text-gray-500">Режим движения:</span>
                   <span className="text-evolute-dark text-right">Standard/Comfort/Sport</span>
                 </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-evolute-dark mb-4">Ходовая часть</h4>
              <div className="space-y-0 text-sm">
                 <div className="flex justify-between py-3 border-b border-gray-200 border-dashed">
                   <span className="text-gray-500">Усилитель рулевого управления:</span>
                   <span className="text-evolute-dark text-right max-w-[50%]">Электро</span>
                 </div>
                 <div className="flex justify-between py-3 border-b border-gray-200 border-dashed">
                   <span className="text-gray-500">Тип привода:</span>
                   <span className="text-evolute-dark text-right max-w-[50%]">Передний</span>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Photo Bank */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Фото {model.title}</h2>
        </div>
        <div className="w-full">
          <ImageGallery 
             images={[...model.exterior.images, ...model.interior.images]} 
             className="w-full px-4 sm:px-6 lg:px-8 mx-auto"
             imageClassName="aspect-[4/3] md:aspect-[16/9] object-cover"
             slideClassName="flex-[0_0_85%] md:flex-[0_0_60%] lg:flex-[0_0_45%]"
          />
        </div>
      </section>

    </div>
  );
};

