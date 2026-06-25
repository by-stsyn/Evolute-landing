import React from 'react';

interface CalltouchPhoneProps {
  phone: string;
  className?: string;
}

/**
 * Обертка для номера телефона.
 * Подготовлена для интеграции динамической подмены номеров Calltouch.
 * Имеет класс 'calltouch-phone' для удобного таргетинга скриптами.
 */
export const CalltouchPhone: React.FC<CalltouchPhoneProps> = ({ phone, className = '' }) => {
  // Очищаем номер от лишних символов для атрибута href (оставляем только + и цифры)
  const cleanPhone = phone.replace(/[^\d+]/g, '');

  return (
    <a 
      href={`tel:${cleanPhone}`} 
      className={`transition-colors duration-300 calltouch-phone ${className}`}
    >
      {phone}
    </a>
  );
};
