<template>
    <div class="flex flex-row w-screen h-screen">
        <Sidebar />

        <div class="flex flex-col w-full gap-4 p-4">
            <slot />
        </div>
    </div>
</template>