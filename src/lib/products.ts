export interface Product {
  id: string;
  code: string;
  name: string;
  category: 'Sarees' | 'Blouses' | 'Kurtis' | 'Bridal Wear' | 'Kids Wear';
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
}

export interface LookbookItem {
  id?: string;
  username: string;
  tag: string;
  image: string;
  likes: string;
  caption: string;
  code: string;
  buyUrl: string;
  platform: 'Amazon' | 'Flipkart' | 'Myntra';
}

export const products: Product[] = [
  // 1. Sarees
  {
    id: 'p-1',
    code: 'AB-101',
    name: 'Madurai Sungudi Pure Cotton Saree with Temple Zari Border',
    category: 'Sarees',
    subtitle: '100% Pure Breathable Madurai Handloom Cotton',
    description: 'Traditional round-dot bandhani print with fine zari woven pallu, authentic to Madurai master weavers.',
    price: 1850,
    originalPrice: 2400,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  },

  // 2. Blouses
  {
    id: 'p-2',
    code: 'AB-102',
    name: 'Bridal Heavy Aari Work Peacock Motif Blouse Piece',
    category: 'Blouses',
    subtitle: 'Zardosi & Pure Silk Thread Hand Embroidery',
    description: 'Artisan handcrafted front and back neck embroidery with maggam cutwork on deep crimson raw silk.',
    price: 3450,
    originalPrice: 4800,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
  },

  // 3. Bridal Wear
  {
    id: 'p-3',
    code: 'AB-103',
    name: 'Festive Pavadai Dhavani Coral Tissue Half Saree',
    category: 'Bridal Wear',
    subtitle: 'South Indian Dhavani with Banarasi Jacquard Skirt',
    description: 'Flared festive lehenga skirt with a contrast floral embroidered dupatta and ready-to-stitch blouse.',
    price: 4950,
    originalPrice: 6500,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },

  // 4. Kurtis
  {
    id: 'p-4',
    code: 'AB-104',
    name: 'Pure Cotton Indigo Hand-Block Printed Anarkali Kurti Set',
    category: 'Kurtis',
    subtitle: 'Hand-block Print with Organza Dupatta',
    description: 'Comfortable daily and office ethnic wear with delicate gota patti handwork along the neckline.',
    price: 1450,
    originalPrice: 2100,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1596783074418-c44ab83dbff5?auto=format&fit=crop&w=800&q=80',
  },

  // 5. Kids Wear - Item 1 (Pattu Pavadai)
  {
    id: 'p-5',
    code: 'AB-K01',
    name: 'Traditional Girl Pure Kanchipuram Silk Pattu Pavadai Set',
    category: 'Kids Wear',
    subtitle: 'Traditional Temple Border Silk Jacquard with Zari',
    description: 'Vibrant peacock green and rani pink pattu lehenga choli stitched with soft inner cotton lining for baby skin comfort.',
    price: 2199,
    originalPrice: 3200,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80',
  },

  // 6. Kids Wear - Item 2 (Boy Dhoti Kurta)
  {
    id: 'p-6',
    code: 'AB-K02',
    name: 'Boys Traditional Silk Cotton Kurta with Zari Veshti Dhoti',
    category: 'Kids Wear',
    subtitle: 'South Indian Festive & Mundan Ceremony Special',
    description: 'Golden yellow woven kurti paired with traditional velcro-adjustable gold zari border dhoti.',
    price: 1650,
    originalPrice: 2450,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
  },

  // 7. Kids Wear - Item 3 (Brocade Anarkali Frock)
  {
    id: 'p-7',
    code: 'AB-K03',
    name: 'Kids Festive Banarasi Brocade Ethnic Flared Frock',
    category: 'Kids Wear',
    subtitle: 'Festive Wear for Festivals & Weddings (Ages 2-10)',
    description: 'Rich metallic gold jacquard weave with soft cotton slip lining and contrast tassel tie-ups.',
    price: 1899,
    originalPrice: 2800,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
  },
];

export const lookbookItems: LookbookItem[] = [
  {
    username: '@ahalya_madurai',
    tag: 'SUNGUDI SPLENDOR',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    likes: '1.2k',
    caption: 'Meenakshi Amman temple festive drape. Pure Madurai Sungudi in modern checks. #MaduraiTextiles #TempleJewels',
    code: 'AB-101',
    buyUrl: 'https://www.amazon.in/s?k=banarasi+silk+saree+for+women&tag=ahalyasboutique-21',
    platform: 'Amazon',
  },
  {
    username: '@priya_tamil_bride',
    tag: 'ARTISAN BLOUSE',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    likes: '2.4k',
    caption: 'The bridal aari work detailing took 72 hours of sheer precision. Blessed client from Coimbatore! #BridalAari #AhalyaBlouse',
    code: 'AB-102',
    buyUrl: 'https://www.amazon.in/s?k=bridal+aari+work+readymade+blouse&tag=ahalyasboutique-21',
    platform: 'Amazon',
  },
  {
    username: '@ahalya_madurai',
    tag: 'DHAVANI LOVE',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    likes: '950',
    caption: 'Sister of the groom turning heads in our custom coral tissue Pavadai Dhavani set. #TamilWedding #HalfSaree',
    code: 'AB-103',
    buyUrl: 'https://www.amazon.in/s?k=pavadai+dhavani+half+saree&tag=ahalyasboutique-21',
    platform: 'Amazon',
  },
];