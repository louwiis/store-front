// tag.model.ts
import type { Product } from './product.model';
import type { Meta } from './strapi.model';

export interface Tag {
  id: number;
  name: string;
  slug: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface TagResponse {
  data: Tag[];
  meta: Meta;
}