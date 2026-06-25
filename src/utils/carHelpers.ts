export interface EquipmentGroup {
  name: string;
  elements: string[];
}

export interface Vehicle {
  id: number;
  vin: string;
  brand: string;
  model: string;
  generation: string;
  modification: string;
  equipment: string;
  equipmentGroups?: EquipmentGroup[];
  year: number;
  price: number;
  bodyColor: string;
  mileage: number;
  enginePower: number;
  engineVolume: string;
  engineType: string;
  driveType: string;
  gearboxType: string;
  bodyType: string;
  steeringWheel: string;
  photos?: {
    photo?: string | string[];
  };
}

let cachedCars: Vehicle[] | null = null;
let fetchPromise: Promise<Vehicle[]> | null = null;

export const getCars = async (): Promise<Vehicle[]> => {
  if (cachedCars) return cachedCars;
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    try {
      let res = await fetch('/api/feed');
      if (!res.ok) {
        res = await fetch('/feed.php');
      }
      if (!res.ok) throw new Error('Failed to fetch XML');
      const text = await res.text();
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      const vehicleNodes = xmlDoc.querySelectorAll('vehicle');
      const parsedCars: Vehicle[] = [];
      
      vehicleNodes.forEach(node => {
        const photoNodes = node.querySelectorAll('photos photo');
        const photos: string[] = [];
        photoNodes.forEach(p => {
          if (p.textContent) photos.push(p.textContent);
        });
        
        const eqGroupsNodes = node.querySelectorAll('equipment group');
        const equipmentGroups: EquipmentGroup[] = [];
        eqGroupsNodes.forEach(gNode => {
          const name = gNode.getAttribute('name');
          if (name) {
            const elements: string[] = [];
            gNode.querySelectorAll('element').forEach(el => {
              if (el.textContent) elements.push(el.textContent);
            });
            equipmentGroups.push({ name, elements });
          }
        });
        
        parsedCars.push({
          id: Number(node.querySelector('id')?.textContent || 0),
          vin: node.querySelector('vin')?.textContent || '',
          brand: node.querySelector('brand')?.textContent || '',
          model: node.querySelector('model')?.textContent || '',
          generation: node.querySelector('generation')?.textContent || '',
          modification: node.querySelector('modification')?.textContent || '',
          equipment: node.querySelector('equipment')?.textContent || '',
          equipmentGroups,
          year: Number(node.querySelector('year')?.textContent || 0),
          price: Number(node.querySelector('price')?.textContent || 0),
          bodyColor: node.querySelector('bodyColor')?.textContent || '',
          mileage: Number(node.querySelector('mileage')?.textContent || 0),
          enginePower: Number(node.querySelector('enginePower')?.textContent || 0),
          engineVolume: node.querySelector('engineVolume')?.textContent || '',
          engineType: node.querySelector('engineType')?.textContent || '',
          driveType: node.querySelector('driveType')?.textContent || '',
          gearboxType: node.querySelector('gearboxType')?.textContent || '',
          bodyType: node.querySelector('bodyType')?.textContent || '',
          steeringWheel: node.querySelector('steeringWheel')?.textContent || '',
          photos: { photo: photos.length > 0 ? photos : undefined }
        });
      });
      
      cachedCars = parsedCars;
      return parsedCars;
    } catch (error) {
      fetchPromise = null;
      throw error;
    }
  })();

  return fetchPromise;
};

export const translate = {
  engineType: (val: string) => {
    const map: Record<string, string> = { petrol: 'Бензин', diesel: 'Дизель', electro: 'Электро', hybrid: 'Гибрид', gas: 'Газ' };
    return map[val?.toLowerCase()] || val;
  },
  driveType: (val: string) => {
    const map: Record<string, string> = { front: 'Передний', rear: 'Задний', full: 'Полный', 'full_4wd': 'Полный', '4wd': 'Полный' };
    return map[val?.toLowerCase()] || val;
  },
  gearboxType: (val: string) => {
    const map: Record<string, string> = { automatic: 'Автомат', manual: 'Механика', robotized: 'Робот', variator: 'Вариатор' };
    return map[val?.toLowerCase()] || val;
  },
  bodyType: (val: string) => {
    const map: Record<string, string> = { sedan: 'Седан', suv: 'Внедорожник', hatchback: 'Хэтчбек', liftback: 'Лифтбек', wagon: 'Универсал', minivan: 'Минивэн', pickup: 'Пикап', coupe: 'Купе', cabrio: 'Кабриолет' };
    return map[val?.toLowerCase()] || val;
  },
  color: (val: string) => {
    const map: Record<string, string> = { white: 'Белый', black: 'Черный', gray: 'Серый', silver: 'Серебристый', red: 'Красный', blue: 'Синий', green: 'Зеленый', brown: 'Коричневый', yellow: 'Желтый', orange: 'Оранжевый', purple: 'Фиолетовый', beige: 'Бежевый', golden: 'Золотистый' };
    return map[val?.toLowerCase()] || val;
  },
  steeringWheel: (val: string) => {
    const map: Record<string, string> = { left: 'Левый', right: 'Правый' };
    return map[val?.toLowerCase()] || val;
  }
};
