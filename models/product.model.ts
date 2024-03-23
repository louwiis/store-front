// product.model.ts
import type { Tag } from './tag.model';
import type { Image, Meta } from './strapi.model';

export interface Product {
  id: number;
  name: string;
  slug: string;
  image: Image;
  tags: Tag[];
  price: number;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProductsResponse {
  data: Product[];
  meta: Meta;
}