<template>
    <div class="flex flex-row h-screen">
        <Sidebar />

        <div class="flex flex-col gap-4 m-4">
            <slot />
        </div>
    </div>
</template>