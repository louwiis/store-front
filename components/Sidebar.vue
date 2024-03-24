<script setup lang="ts">
import type { Category } from '~/models/category.model';
import type { Meta } from '~/models/strapi.model';
import { onMounted, ref } from 'vue';

const { find } = useStrapi4();
const categories = ref<Category[]>([]);

onMounted(async () => {
    const { data } = await find<{ data: Category[]; meta: Meta }>('categories', {
        populate: '*',
    });
    categories.value = data;
});
</script>

<template>
    <div class="flex flex-row h-screen">
        <div class="flex flex-col gap-4 m-4">
            <div v-if="!categories">
                <p>Loading...</p>
            </div>
            <div v-else>
                <NuxtLink to="/">
                    <h1 class="text-2xl font-bold">All</h1>
                </NuxtLink>

                <NuxtLink v-for="category in categories" :key="category.slug" :to="`/categories/${category.slug}`">
                    <h2 class="text-xl font-bold">{{ category.name }}</h2>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
