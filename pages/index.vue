<script setup lang="ts">
import type { Product } from '~/models/product.model';
import type { Category } from '~/models/category.model';
import type { Meta } from '~/models/strapi.model';
import { useFilterStore } from '~/stores/filterStore';

const store = useFilterStore()
const meta = ref<any>([]);
const filter = ref(store.filter);

const page = ref(1);

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
		filters: filter.value === 'tous' ? {} : {
			category: {
				slug: {
					$eq: filter.value
				}
			}
		}
    }),
  { watch: [page, filter] }
);
</script>

<template>
    <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold">{{ filter }} products</h1>
        
        <div v-if="!products">
            <p>Loading...</p>
        </div>
        <div class="flex flex-row gap-4" v-else>
            <div v-for="product in products?.data" :key="product.slug">
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
        <div class="flex justify-center mt-4" v-if="products">
            <UPagination v-model="page" :total="products.meta.pagination.pageCount * 10" show-last show-first />
        </div>
    </div>
</template>