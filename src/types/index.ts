export interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  images: string[];
  primaryImage?: string;
  rating: number;
  category: string;
  description?: string;       
  stock?: number;            
  specifications?: {         
    label: string;
    value: string;
  }[];
}

export interface CartItem extends Pick<Product, 'id' | 'name' | 'price'> {
  image: string;
  quantity: number;
}