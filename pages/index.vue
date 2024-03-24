<script setup lang="ts">
import type { Product } from '~/models/product.model';
import type { Meta } from '~/models/strapi.model';

const { find } = useStrapi4();

const { data: products } = useAsyncData(
  'products',
  () =>
    find<{ data: Product[]; meta: Meta }>('products', {
        populate: '*',
    }),
);
</script>

<template>
    <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Products</h1>
        <div v-if="!products">
            <p>Loading...</p>
        </div>
        <div class="flex flex-col gap-4" v-else>
            <div v-for="product in products?.data" :key="product.slug">
                <nuxt-link :to="`/products/${product.slug}`">
                    <h2 class="text-xl font-bold">{{ product.name }}</h2>
                </nuxt-link>
                <p>{{ product.description }}</p>
            </div>
        </div>
    </div>
</template>