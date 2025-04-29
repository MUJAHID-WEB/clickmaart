export interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  images: string[];
  rating: number;
  category: string;
  description?: string;
  stock?: number;
  specifications?: {
    label: string;
    value: string;
  }[];
  details?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  location?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    discount: number;
    images: string[];
    rating: number;
    category: string;
    description?: string;
    stock?: number;
    specifications?: {
      label: string;
      value: string;
    }[];
  };
  showCategory?: boolean;
}