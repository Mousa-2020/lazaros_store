
export interface Package {
  id: string;
  name: string;
  price: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface ServiceData {
  title: string;
  description: string;
  type: 'category' | 'direct' | 'contact' | 'arab-only';
  categories?: Category[];
  packages?: Record<string, Package[]> | Package[];
  contactMessage?: string;
}

export interface StoreData {
  instagram: Record<string, ServiceData>;
  facebook: Record<string, ServiceData>;
  tiktok: Record<string, ServiceData>;
  chat: Record<string, any>;
  gemini: Record<string, any>;
}

export enum SectionType {
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  TIKTOK = 'tiktok',
  CHAT = 'chat',
  GEMINI = 'gemini'
}
