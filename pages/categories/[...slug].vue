<script setup lang="ts">
import type { Category } from '~/models/category.model';
import type { Meta } from '~/models/strapi.model';

const route = useRoute()
const { findOne } = useStrapi4()
const slug = route.params.slug[0]

const { data: category } = useAsyncData(
  'categories',
  () =>
    findOne<{ data: Category; meta: Meta }>('categories', slug, {
        populate: '*',
    }),
);
</script>

<template>
    <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Category products</h1>
        
        <div v-if="!category">
            <p>Loading...</p>
        </div>
        <div class="flex flex-row gap-4" v-else>
            <div v-for="product in category?.data.products" :key="product.slug">
                <nuxt-link :to="`/products/${product.slug}`">
                    <h2 class="text-xl font-bold">{{ product.name }}</h2>

                    <img
                        :src="product.image.url"
                        :alt="product.image.alternativeText"
                        class="w-[300px] h-[300px] object-cover"
                    />
                </nuxt-link>
            </div>
        </div>
    </div>
</template>