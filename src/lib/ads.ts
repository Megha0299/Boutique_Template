export interface AffiliateProduct {
  id: string;
  name: string;
  platform: 'Amazon' | 'Flipkart' | 'Myntra';
  badge: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: number;
  image: string;
  buyUrl: string;
  categoryTag: string;
}

export const singleFeaturedProduct: AffiliateProduct = {
  id: 'featured-1',
  name: 'Woven Banarasi Soft Silk Saree with Blouse Piece',
  platform: 'Amazon',
  badge: 'Trending Amazon Pick',
  price: '₹1,299',
  originalPrice: '₹3,999',
  discount: '67% OFF',
  rating: 4.8,
  image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  buyUrl: 'https://www.amazon.in/dp/B08X7VNZ4S?tag=ahalyasboutique-21',
  categoryTag: 'saree',
};

export const trendingAffiliatePicks: AffiliateProduct[] = [
  singleFeaturedProduct,
  {
    id: 'aff-2',
    name: 'Heavy Embroidered Bridal Aari Work Readymade Velvet Blouse',
    platform: 'Amazon',
    badge: 'Trending Bridal',
    price: '₹1,849',
    originalPrice: '₹3,499',
    discount: '47% OFF',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    buyUrl: 'https://www.amazon.in/dp/B08XW2YKM5?tag=ahalyasboutique-21',
    categoryTag: 'blouse',
  },
  {
    id: 'aff-3',
    name: 'Pure Cotton Printed Anarkali Kurta with Dupatta Set',
    platform: 'Amazon',
    badge: 'Festive Deal',
    price: '₹899',
    originalPrice: '₹2,199',
    discount: '59% OFF',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1596783074418-c44ab83dbff5?auto=format&fit=crop&w=600&q=80',
    buyUrl: 'https://www.amazon.in/dp/B09V7N7GZ4?tag=ahalyasboutique-21',
    categoryTag: 'kurti',
  },
];

export function getAmazonSearchUrl(query: string): string {
  return `https://www.amazon.in/s?k=${encodeURIComponent(query)}&tag=ahalyasboutique-21`;
}

export function getFlipkartSearchUrl(query: string): string {
  return `https://www.flipkart.com/search?q=${encodeURIComponent(query)}&affid=ahalyas`;
}

export function getMyntraSearchUrl(query: string): string {
  return `https://www.myntra.com/${encodeURIComponent(query)}`;
}