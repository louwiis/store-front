import { defineStore } from 'pinia';

interface FilterState {
    filter: string;
}

export const useFilterStore = defineStore('filters', {
    state: (): FilterState => ({
        filter: 'tous',
    }),
    getters: {
        getFilter(): string {
            return this.filter;
        }
    },
    actions: {
        setFilter(filter: string) {
            this.filter = filter;
        }
    },
})