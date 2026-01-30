
import { StoreData } from './types';

export const INITIAL_DATA: StoreData = {
  instagram: {
    followers: {
      title: "باقات المتابعين",
      description: "اختر الجنسية ثم اختر الباقة المناسبة",
      type: "category",
      categories: [
        { id: "saudi", name: "سعوديين %100", color: "#1a237e" },
        { id: "iraqi", name: "عراقيين %100", color: "#4fc3f7" }
      ],
      packages: {
        saudi: [
          { id: "saudi_1k", name: "١٠٠٠ متابع", price: "45$", featured: true }
        ],
        iraqi: [
          { id: "iraqi_1k", name: "١٠٠٠ متابع", price: "15$" }
        ]
      }
    }
  },
  facebook: {},
  tiktok: {},
  chat: {},
  gemini: {}
};

export const COLORS = {
  sky: '#4fc3f7',
  navy: '#1a237e',
  white: '#ffffff'
};
