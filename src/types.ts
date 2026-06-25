export type CarModel = 'i-PRO' | 'i-SPACE' | 'i-SPACE 4x4' | 'i-JOY' | 'i-JET' | 'i-SKY';

export interface Car {
  id: string;
  name: CarModel;
  type: string; // e.g., 'Городской кроссовер', 'Спортивный премиум SUV'
  price: string;
  range: number; // in km (WLTP/NEDC)
  power: number; // in hp
  acceleration?: string; // 0-100 km/h in seconds
  engineType?: string; // e.g. 'Электромобиль', 'Гибрид'
  driveType?: string; // e.g. 'Передний', 'Полный', 'Задний'
  image: string;
  features: string[];
}

export interface Lead {
  name: string;
  phone: string;
  modelOfInterest?: CarModel;
  source: string; // e.g., 'header_button', 'mobile_bar', 'catalog_card'
}
