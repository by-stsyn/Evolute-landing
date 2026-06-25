export type CarModel = 'i-PRO' | 'i-SPACE' | 'i-SPACE 4x4' | 'i-JOY' | 'i-JET' | 'i-SKY' | string;

export interface Car {
  id: string;
  name: string;
  type: string;
  price: string;
  range?: string;
  power?: string;
  acceleration?: string;
  engineType?: string;
  driveType?: string;
  image: string;
  features: string[];
  statsItems?: {
    value: string;
    label: string;
  }[];
}

export interface Lead {
  name: string;
  phone: string;
  modelOfInterest?: CarModel;
  source: string; // e.g., 'header_button', 'mobile_bar', 'catalog_card'
}
