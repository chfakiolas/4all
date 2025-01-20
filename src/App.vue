<script setup lang="ts">
import { ref, onMounted, Transition, h } from "vue";
import axios from "axios";
import { progressBar } from "./utils/bar";
import ActionButton from "./components/ActionButton.vue";

const http = axios;

// http.get('https://rickandmortyapi.com/api').then(res => {
//   console.log(res.data);
// });
interface ResultHeartImgs {
  [key: string]: string;
}

const vote = ref<string>('');
const voted = ref(false);
const background = ref<string>('bg-1');
const resultHeart: ResultHeartImgs = {
  valentine: "/valentine-heart.png",
  antivalentine: "/antivalentine-heart.png"
}

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
      <img class="res-heart" :src="resultHeart[vote]" alt="heart">
      <div class="bar-container">
        <div class="bar-text-container">
          <img src="/valentine-title.png" alt="Valentine">
          <img src="/antivalentine-title.png" alt="Antivalentine">
        </div>
        <div class="item_bar cell">
          <span class="antivalentine-percentage" data-percentage="35">35</span>
          <div class="progress" data-progress="65">
            <span class="valentine-percentate">65</span>
          </div>
        </div>
      </div>
      <div class="result-btn-group">
        <h2 class="btn-group-title">Μάθετε περισσότερα</h2>
        <div class="urls-container">
          <action-button
          :title="'Καταστήματα'"
          :href="'https://4allstores.gr/find-a-store'"
          :img="'/stores-icon.png'"
          :id="'v-strore-locator'"
          ></action-button>
          <action-button
          :title="'Καφές'"
          :href="'https://4allstores.gr/#high-quality-cofee'"
          :img="'/coffee-icon.png'"
          :id="'v-coffee'"
          ></action-button>
          <action-button
          :title="'Προσφορές'"
          :href="'https://4allstores.gr/prosfores-3'"
          :img="'/drinks-icon.png'"
          :id="'v-prosfores'"
          ></action-button>
          <action-button
          :title="'Franchise'"
          :href="'https://4allstores.gr/franchise'"
          :img="'/franchise.png'"
          :id="'v-franchise'"
          ></action-button>
          <action-button
          :title="'Εργασία'"
          :href="'https://4allstores.gr/kariera-2-2'"
          :img="'/ergasia.png'"
          :id="'v-ergasia'"
          ></action-button>
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
  width: 90%;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
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
.res-heart {
  max-width: 100%;
  width: 100px;
  margin-left: auto;
  margin-right: auto;
}
.bar-text-container {
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 5px;
}
.bar-text-container > img {
  width: 35%;
  max-width: 100%;
}
.btn-group-title {
  text-align: center;
  font-family: "RobotoFlex";
}
.urls-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
action-button {
  width: 30%;
}
</style>
