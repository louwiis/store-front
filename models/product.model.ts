// product.model.ts
import type { Category } from './category.model';
import type { Image, Meta } from './strapi.model';

export interface Product {
  id: number;
  name: string;
  slug: string;
  image: Image;
  categories: Category[];
  price: number;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProductsResponse {
  data: Product[];
  meta: Meta;
}