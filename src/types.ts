export type Language = 'en' | 'ur_roman' | 'ur';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  titleUrdu: string;
  titleRomanUrdu: string;
  description: string;
  descriptionUrdu: string;
  descriptionRomanUrdu: string;
  features: string[];
  featuresUrdu: string[];
  featuresRomanUrdu: string[];
  image: string;
  imagePosition?: string;
  startingPrice: string;
  badge?: string;
}

export interface RateItem {
  task: string;
  taskUrdu: string;
  taskRomanUrdu: string;
  unit: string;
  unitUrdu: string;
  pricePkr: number;
  note?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'solar';
  location: string;
  image: string;
  imagePosition?: string;
  description: string;
  highlights: string[];
}

export interface BookingRecord {
  id: string;
  name: string;
  phone: string;
  area: string;
  service: string;
  urgency: 'routine' | 'urgent';
  date: string;
  timeSlot: string;
  notes?: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'completed';
}
