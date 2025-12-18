export type SkinType = 'Dry' | 'Oily' | 'Combination' | 'Sensitive' | 'Normal';

export interface Product {
    id: string;
    name: string;
    category: 'Device' | 'Ampoule' | 'Cosmetic' | 'Etc';
    price: number;
}

export interface PurchaseRecord {
    id: string;
    date: string;
    items: string[]; // Product names
    totalAmount: number;
}

export interface GalleryItem {
    id: string;
    date: string;
    beforeUrl: string;
    afterUrl: string;
    note?: string;
}

export interface Customer {
    id: string;
    name: string;
    phone: string;
    age?: number;
    skinType: SkinType;
    concerns: string[]; // e.g., 'Wrinkles', 'Pigmentation'
    devicesOwned: string[]; // e.g., 'Airbrush', 'Handy'
    hasFreeTrial: boolean; // 데몬 체험 여부
    joinDate: string;
    lastVisit: string;
    purchases: PurchaseRecord[];
    gallery: GalleryItem[];
    memo?: string;
}
