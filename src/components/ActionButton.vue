<template>
    <div class="url">
        <a :href="props.href" :id="props.id">
            <img :src="props.img" :alt="props.title" class="action-icon">
            <span>{{ props.title }}</span>
            <img src="/4all.png" alt="4all" class="logo">
        </a>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps<{
    title: string;
    href: string;
    img: string;
    id: string;
}>();
</script>
<style scoped>
.url {
    width: 30%;
    margin-bottom: 35px;
}
.url > a {
    font-family: 'RobotoFlex';
    font-weight: 600;
    color: #000;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    text-align: center;
}
.url > a span{
    margin-bottom: 4px;
}
img {
    max-width: 100%;
}
.action-icon {
    width: 65px;
    margin-bottom: 10px;
    height: 6vh;
    object-fit: contain;
}
.logo {
    width: 65px;
    height: 3vh;
    object-fit: contain;
}
</style>