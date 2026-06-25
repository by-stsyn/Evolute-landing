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
  const [showDifferences, setShowDifferences] = useState(false);

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
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold">Обзор</h1>
          {model.logo ? (
            <img src={model.logo} alt={model.title} className="h-6 md:h-8 object-contain mt-1" />
          ) : (
            <h1 className="text-3xl md:text-4xl font-bold">{model.title}</h1>
          )}
        </div>
        <p className="text-gray-500 text-sm md:text-base max-w-4xl leading-relaxed mb-10">
          {model.description}
        </p>

        {model.statsItems && model.statsItems.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-8 lg:p-12">
            <div className="flex flex-wrap md:flex-nowrap justify-between gap-6 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
              {model.statsItems.map((stat, idx) => (
                <div key={idx} className="flex-shrink-0 text-center md:flex-1 md:border-r border-gray-200 last:border-r-0 px-2">
                  <div className="text-2xl lg:text-3xl font-medium text-evolute-dark mb-1 whitespace-nowrap">
                    {stat.value}
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
             <h3 className="text-xl font-bold text-evolute-dark mb-4">{model.exterior.title}</h3>
             <p className="text-gray-600 text-sm mb-6 leading-relaxed">
               {model.exterior.description}
             </p>
             <ul className="space-y-3">
               {model.exterior.features.map((feature, idx) => (
                 <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-evolute-blue shrink-0 mt-1.5"></div>
                    <span>{feature}</span>
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </section>

      {/* Interior Block */}
      <section className="bg-evolute-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12">
            <div>
               <h3 className="text-xl font-bold text-white mb-4">{model.interior.title}</h3>
               <p className="text-white/80 text-sm mb-6 leading-relaxed">
                 {model.interior.description}
               </p>
               <ul className="space-y-3">
                 {model.interior.features.map((feature, idx) => (
                   <li key={idx} className="flex items-start gap-3 text-sm text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0 mt-1.5"></div>
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

      {/* Economy Section */}
      {model.economy && (
        <section className="pt-16 md:pt-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-normal text-center">
              {model.economy.title}
            </h2>
          </div>
          
          <div className="bg-[#465463] text-white">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch">
              {/* Text Content */}
              <div className="flex-[1.2] py-12 px-4 sm:px-6 lg:pl-8 lg:pr-16 lg:py-20">
                <div className="space-y-10 max-w-2xl">
                  {model.economy.blocks.map((block, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0 mt-2"></div>
                        <h3 className="text-[15px] font-bold text-white leading-tight">{block.title}</h3>
                      </div>
                      <p className="text-white/90 whitespace-pre-line text-[13px] leading-relaxed pl-4">{block.description}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-16 space-y-4 pl-4">
                  {model.economy.footnotes.map((note, idx) => (
                    <p key={idx} className="text-[11px] text-white/60 leading-relaxed">{note}</p>
                  ))}
                </div>
              </div>
              
              {/* Image Content */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex-[1.8] relative min-h-[400px] lg:min-h-[600px]"
              >
                <img 
                  src={model.economy.image} 
                  alt={model.economy.title} 
                  className="absolute inset-0 w-full h-full object-cover lg:py-8 pr-4 sm:pr-6 lg:pr-8"
                />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Test Drive Section (Lead Magnet) */}
      <TestDrive preselectedModel={model.name} />

      {/* Configuration & Prices */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <h2 className="text-3xl md:text-4xl font-bold">Комплектации и цены</h2>
          {model.logo ? (
            <img src={model.logo} alt={model.title} className="h-6 md:h-8 object-contain mt-1" />
          ) : (
            <h2 className="text-3xl md:text-4xl font-bold">{model.title}</h2>
          )}
        </div>
        <p className="text-gray-500 text-sm mb-8 max-w-4xl">
          Новый {model.name} представлен в отличной комплектации. С ценами вы можете ознакомиться на сайте, по телефону или лично в автосалоне официального дилера.
        </p>

        {model.configurations && model.configurations.length > 0 ? (
          <>
            <div className="border-b border-gray-200 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex overflow-x-auto space-x-2">
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
              
              {model.configurations.length > 1 && (
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 px-2 md:px-0 bg-gray-50 py-2 px-4 rounded-full border border-gray-200">
                  <input 
                    type="checkbox" 
                    className="accent-evolute-blue w-4 h-4"
                    checked={showDifferences}
                    onChange={(e) => setShowDifferences(e.target.checked)}
                  />
                  Сравнить все комплектации
                </label>
              )}
            </div>
            
            {!showDifferences && (
              <div className="mb-6">
                <span className="text-xl text-evolute-dark font-normal">Цена </span>
                <span className="text-2xl font-medium text-evolute-dark">
                  {model.configurations[activeConfigIndex].price}
                </span>
              </div>
            )}

            {/* Accordions or Table */}
            {showDifferences && model.configurations.length > 1 ? (
              <div className="overflow-x-auto pb-4 max-w-7xl mx-auto">
                <div className="min-w-[800px]">
                  {/* Header Row */}
                  <div className="bg-evolute-dark text-white flex items-stretch rounded-t-lg overflow-hidden">
                    <div className="flex-[2] py-4 px-6 font-medium border-r border-white/10 flex items-center">
                      <span className="text-lg">Опции</span>
                    </div>
                    <div className="flex-[3] flex">
                      {model.configurations.map((trim, idx) => (
                        <div key={idx} className="flex-1 py-4 px-6 text-center border-r border-white/10 last:border-0 flex flex-col justify-center">
                          <div className="font-bold text-lg">{trim.name}</div>
                          <div className="text-sm text-white/80 mt-1">{trim.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Table Body */}
                  <div className="bg-white border border-gray-200 rounded-b-lg shadow-sm">
                    {(() => {
                       // 1. Gather all unique categories across all configs
                       const allCategories = Array.from(new Set(model.configurations.flatMap(c => c.equipment.map(e => e.title))));
                       
                       return allCategories.map((categoryTitle, catIdx) => {
                          // 2. Gather all unique items for this category
                          const allItems = Array.from(new Set(
                             model.configurations.flatMap(c => {
                                const cat = c.equipment.find(e => e.title === categoryTitle);
                                return cat ? cat.items : [];
                             })
                          ));

                          // 3. Filter items if we only want "differences"
                          // Wait, the checkbox says "Сравнить все комплектации", so we show everything,
                          // but maybe highlight differences? Let's just show all for the table,
                          // or maybe the user wants a strict "Показать различия" toggle?
                          // Let's add a "Только различия" toggle inside the table view if needed,
                          // or just filter them out if showDifferences is true.
                          // Actually, showing the full table is usually best. Let's make the checkbox "Показать различия"
                          // filter out rows that are identical across ALL trims.
                          const visibleItems = allItems.filter(item => {
                             const hasItemInAll = model.configurations!.every(c => {
                                const cat = c.equipment.find(e => e.title === categoryTitle);
                                return cat && cat.items.includes(item);
                             });
                             return !hasItemInAll; // Only show items that are NOT in all trims
                          });

                          if (visibleItems.length === 0) return null;

                          return (
                            <div key={catIdx} className="border-b border-gray-200 last:border-0">
                              <div className="bg-gray-50 py-3 px-6 border-y border-gray-200 first:border-t-0 flex items-center">
                                <h3 className="text-sm font-bold text-evolute-dark uppercase tracking-wider">{categoryTitle}</h3>
                              </div>
                              <div className="space-y-0">
                                {visibleItems.map((item, itemIdx) => (
                                  <div key={itemIdx} className="flex items-stretch hover:bg-blue-50/50 transition-colors border-b border-gray-100 last:border-0">
                                    <div className="flex-[2] py-4 px-6 text-sm text-gray-700 flex items-center">
                                      {item}
                                    </div>
                                    <div className="flex-[3] flex">
                                      {model.configurations!.map((config, valIdx) => {
                                        const hasItem = config.equipment.find(c => c.title === categoryTitle)?.items.includes(item);
                                        return (
                                          <div key={valIdx} className="flex-1 py-4 px-6 flex items-center justify-center border-l border-gray-100">
                                            {hasItem ? (
                                              <div className="w-6 h-6 rounded-full bg-evolute-blue/10 flex items-center justify-center">
                                                <div className="w-2.5 h-2.5 rounded-full bg-evolute-blue"></div>
                                              </div>
                                            ) : (
                                              <span className="text-gray-300 font-bold">-</span>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                       });
                    })()}
                  </div>
                </div>
              </div>
            ) : (
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
            )}
          </>
        ) : (
          <div className="space-y-2 max-w-5xl">
            {(model.equipment || []).map((category, idx) => (
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
        )}
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

