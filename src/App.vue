<script setup lang="ts">
import { ref, onMounted, Transition, h } from "vue";
import axios from "axios";
import { progressBar } from "./utils/bar";

const http = axios;

// http.get('https://rickandmortyapi.com/api').then(res => {
//   console.log(res.data);
// });

const vote = ref<string>();
const voted = ref(false);
const background = ref<string>('bg-1');

const submitVote = (usrVote: string) => {
  vote.value = usrVote;
  voted.value = true;
  
  if(vote.value === 'antivalentine') {
    background.value = 'bg-2';
  }
  setTimeout(() => {
    setAntivalentineNum('.antivalentine-percentage');
    progressBar('.progress', '.valentine-percentate', '.antivalentine-percentage', 15);
  }, 50)
}

const calcVH = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
onMounted(()=>{
  calcVH();
})

const setAntivalentineNum = (selector: string) => {
  const antiValNumEl: HTMLElement | null = document.querySelector(selector);
  if(antiValNumEl) {
    let percentage = antiValNumEl.dataset.percentage;
    antiValNumEl.style.marginRight = Number(percentage) / 4 + '%';
  }
}


</script>

<template>
<div class="val-container" :class="background">
  <div class="val-inner-container" v-if="!voted">
    <div class="valentine-container">
      <img class="voteimg" src="/valentine.png" alt="Valentine vote image" @click="submitVote('valentine')">
    </div>
    <div class="mid">
      <img class="choose-side" src="/choose-your-side.png" alt="Valentine vote image">
    </div>
    <div class="antivalentine-container">
      <img class="voteimg" src="/antivalentine.png" alt="Valentine vote image" @click="submitVote('antivalentine')">
    </div>
  </div>
  <transition name="fade" mode="out-in">
    <div class="val-inner-container" v-if="voted">
      <div class="text" :class="vote">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis animi aliquid fuga nemo autem.</div>
      <div class="item_bar cell">
        <span class="antivalentine-percentage" data-percentage="35">35</span>
        <div class="progress" data-progress="65">
          <span class="valentine-percentate">65</span>
        </div>
      </div>
    </div>
  <!-- ... the buttons ... -->
</transition>
</div>
</template>

<style scoped>
.val-container {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background-size: cover;
  background-repeat: no-repeat;
}
.val-inner-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: inherit;
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
.item_bar {
  position: relative;
  height: 3rem;
  width: 100%;
  background-color: #000;
  border-radius: 14px;
  border: solid 2px #000;
}
.cell {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  min-height: 0;
  min-width: 0;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
}
.item_bar .progress {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  height: 3rem;
  margin: 0;
  background-color: #DE002D;
  border-radius: 12px;
  transition: width 100ms ease;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item_bar .valentine-percentate {
  font-family: 'RobotoFlex';
  color: #fff;
  font-size: 30px;
  font-weight: 600;
}
.item_bar .antivalentine-percentage {
  font-family: 'RobotoFlex';
  color: #DE002D;
  font-size: 30px;
  font-weight: 600;
}
.text {
  font-family: "PFFreeScript";
  font-size: 25px;
  text-align: center;
  max-width: 70vw;
  margin-left: auto;
  margin-right: auto;
  line-height: 35px;
}
.text.valentine {
 color: #000;
}
.text.antivalentine {
  color: #DE002D;
}
.item_bar::before,
.item_bar::after {
  content: '';
  background: url('/percentage-shadow.png');
  position: absolute;
  z-index: 10;
  width: 40px;
  height: 100%;
  opacity: 0.3;
  background-size: contain;
  background-repeat: no-repeat;
}
.item_bar::before {
  left: 1%;
  top: 6%;
}
.item_bar::after {
  transform: rotate(180deg);
  bottom: 2%;
  right: 1%;
}
</style>
