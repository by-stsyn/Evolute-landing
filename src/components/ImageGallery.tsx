import React, { useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  placeholderText?: string;
  className?: string;
  imageClassName?: string;
  slideClassName?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  placeholderText = 'Image',
  className = '',
  imageClassName = 'aspect-[4/3] object-cover',
  slideClassName = 'flex-[0_0_100%]'
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  if (!images || images.length === 0) return null;

  return (
    <div className={`relative group ${className}`}>
      <div className="overflow-hidden rounded" ref={emblaRef}>
        <div className="flex gap-4">
          {images.map((img, idx) => (
            <div className={`${slideClassName} min-w-0 shrink-0 relative rounded-xl overflow-hidden`} key={idx}>
              <img 
                src={img.src} 
                alt={img.alt} 
                className={`w-full h-full ${imageClassName}`}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedIndex === idx ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
