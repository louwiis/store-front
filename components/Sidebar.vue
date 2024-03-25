<script setup lang="ts">
import type { Category } from '~/models/category.model';
import type { Meta } from '~/models/strapi.model';
import { onMounted, ref } from 'vue';

const { find } = useStrapi4();
const categories = ref<Category[]>([]);
const store = useFilterStore();

onMounted(async () => {
    const { data } = await find<{ data: Category[]; meta: Meta }>('categories', {
        populate: '*',
        pagination: {
            page: 1,
            pageSize: 2
        }
    })
    categories.value = data;
});
</script>

<template>
    <div class="flex flex-row w-[200px] h-screen">
        <div class="flex flex-col gap-4 m-4">
            <div v-if="!categories">
                <p>Loading...</p>
            </div>
            <div v-else>
                <span to="/" @click="store.setFilter('tous')">
                    <h1 class="text-2xl font-bold">Tous les produits</h1>
                </span>

                <hr class="border-2 border-gray-300 my-4" />

                <div class="flex flex-col gap-1">
                    <span v-for="category in categories" :key="category.slug" :to="`/categories/${category.slug}`" @click="store.setFilter(category.slug)">
                        <h2 class="text-xl font-bold">{{ category.name }}</h2>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
