<script setup lang="ts">
import type { Product } from '~/models/product.model';
import type { Meta } from '~/models/strapi.model';

const route = useRoute()
const { findOne } = useStrapi4()
const slug = route.params.slug[0]

const { data: product, pending } = useAsyncData(
  'products',
  () =>
    findOne<{ data: Product; meta: Meta }>('products', slug, {
        populate: '*',
    }),
);
</script>

<template>
    <div class="flex flex-col gap-4">
        <div v-if="pending">
            <p>Loading...</p>
        </div>
        <div v-else-if="product">
            <h1 class="text-2xl font-bold">{{ product.data.name }}</h1>

            <img
                :src="product.data.image.url"
                :alt="product.data.image.alternativeText"
                class="w-[300px] h-[300px] object-cover"
            />

            <p>{{ product.data.description }}</p>

            <p>{{ product.data.price / 100 }} €</p>
        </div>
    </div>
</template>