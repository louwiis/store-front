<script setup lang="ts">
import type { Product } from '~/models/product.model';
import type { Category } from '~/models/category.model';
import type { Meta } from '~/models/strapi.model';
import { useFilterStore } from '~/stores/filterStore';

const store = useFilterStore()
const filter = ref<string>(store.filter);
const search = ref<string>('');

const page = ref<number>(1);

const { find } = useStrapi4();
watch(() => store.filter, () => {
	filter.value = store.filter;
	page.value = 1;
});

const { data: products, pending } = await useAsyncData(
  'products',
  () =>
    find<{ data: Product[]; meta: Meta }>('products', {
		populate: '*',
		pagination: {
			page: page.value,
			pageSize: 2,
		},
		filters: {
			category: filter.value === 'tous' ? {} : {
				slug: {
					$eq: filter.value
				}
			},
            slug: search.value !== '' ? {
                $contains: search.value,
            } : {}
		}
    }),
  { watch: [page, filter, search] }
);
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex flex-row justify-between">
            <h1 class="text-2xl font-bold">{{ filter.charAt(0).toUpperCase() + filter.slice(1) }} produits</h1>

            <input
                type="text"
                placeholder="Rechercher un produit"
                class="border-2 border-gray-300 p-2"
                v-model="search"
            />
        </div>
        
        <div v-if="!products">
            <p>Loading...</p>
        </div>
        <div class="flex flex-row gap-4" v-else>
            <div v-for="product in products?.data" :key="product.slug">
                <NuxtLink :to="`/products/${product.slug}`">
                    <h2 class="text-xl font-bold">{{ product.name }}</h2>

                    <img
                        :src="product.image.url"
                        :alt="product.image.alternativeText"
                        class="w-[300px] h-[300px] object-cover"
                    />
                </NuxtLink>
            </div>
        </div>
        <div class="flex justify-center mt-4" v-if="products">
            <UPagination v-model="page" :total="products.meta.pagination.pageCount * 10" show-last show-first />
        </div>
    </div>
</template>