<script setup lang="ts">
import { ref, onMounted } from "vue";

const vote = ref<string>();
const background = ref<string>('bg-1');

const calcVH = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
onMounted()

</script>

<template>
<div class="val-container" :class="background">
  <div class="valentine-container">
    <img class="voteimg" src="/valentine.png" alt="Valentine vote image">
  </div>
  <div class="mid">
    <img class="choose-side" src="/choose-your-side.png" alt="Valentine vote image">
  </div>
  <div class="antivalentine-container">
    <img class="voteimg" src="/antivalentine.png" alt="Valentine vote image">
  </div>
</div>
</template>

<style scoped>
.val-container {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.bg-1 {
  background-image: url("/bg-1.png");
}
.bg-2 {
  background-image: url("/bg-2.png");
}
.voteimg {
  max-width: 100%;
  width: 70vw;
  display: block;
  margin: auto;
}
.choose-side {
  max-width: 100%;
  width: 85vw;
  display: block;
  margin: auto;
}
</style>
