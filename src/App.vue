<script setup lang="ts">
import { ref, onMounted, Transition, h } from "vue";
import axios from "axios";
import { progressBar } from "./utils/bar";
import ActionButton from "./components/ActionButton.vue";
import { useVoteStore } from "./stores/voteStore";
import { couldStartTrivia } from "typescript";

const http = axios;
const voteStore = useVoteStore();
const comingSoonActive = ref(false);

const valentineMessages: { [key: string]: { [key: number]: string } } = {
  valentine: {
    1: "Για την αθεράπευτα ρομαντική ψυχή σου, Cappuccino με Espresso Baroness Arabica 100% από τα 4allStores! Κάθε γουλιά, ξεχειλίζει έρωτα!",
    2: "Για μεγάλους έρωτες, Espresso σε μέγεθος Extra Extra Large από τα 4allStores! Μεγάλοι έρωτες = Μεγάλοι καφέδες!",
    3: "Για μεγάλους έρωτες, Macchiato με Espresso 4all Classic από τα 4allStores! Μικρός σε μέγεθος, μεγάλος σε ένταση!",
    4: "Απολαύστε παρέα από έναν Extra Extra Large Espresso 4all Classic και δείτε το ρομαντισμό σας να ξεχειλίζει…",
    5: "Πρόσφερε στο ταίρι σου Freddo Espresso 4all Classic και διεκδίκησε από κάθε του γουλιά μια υπόσχεση αγάπης!",
    6: "Αν οι καρδιές σας χτυπούν δυνατά, χρειάζεστε από μια ισχυρή δόση Espresso Baroness Arabica 100% από τα 4allStores!",
    7: "Στη μικρή ζωή μας, οι Μεγάλοι Έρωτες χρειάζονται καθημερινά τουλάχιστον έναν Extra Extra Large Καφέ από τα 4allStores!",
    8: "Αν ο έρωτας σου είχε γεύση Espresso, θα ήταν του Baroness Arabica 100% από τα 4allStores! Αρωματικός, γευστικός, γεμάτος ένταση!",
    9: "Σου’χει κλέψει την καρδιά & δεν το βλέπει; ‘’Άνοιξε του τα μάτια’’ με Espresso 4all Classic! Κάθε γουλιά, ξεχειλίζει έρωτα!"
  },
  antivalentine: {
    1: "Μιας και ο φτερωτός Άγγελος τα βρήκε σκούρα μαζί σου, Freddo Cappuccino 4all Classic! Τον απολαμβάνεις.. χωρίς δράματα!",
    2: "Όταν ο έρωτας σε απογοητεύει, απολαμβάνεις Espresso Baroness Arabica 100% από τα 4allStores! Δεν θα σε προδώσει ποτέ!",
    3: "Όταν οι σχέσεις χρειάζονται θυσίες, εσύ απλώς χρειάζεσαι καλό καφέ! Espresso Baroness Arabica 100% από τα 4allStores!",
    4: "Αν ο καφές είναι η μοναδική σου αγάπη, κρατάς στα χέρια σου το σωστό ποτήρι! Καφές 4all! Απόλαυσε τον με την ησυχία σου!",
    5: "Όταν ο έρωτας γίνει πονοκέφαλος, γιατρειά βρίσκεις σε έναν Extra Extra Large Cappuccino από τα 4allStores!",
    6: "Δεν έχει απαιτήσεις και σου είναι πάντα πιστός. Ποιος είναι; Ο Espresso 4all Classic!",
    7: "Το ‘’ελεύθερο πνεύμα’’ σου απαιτεί επιλογές στον έρωτα όπως και στον καφέ σου. Για ποιότητα, ποσότητα, ποικιλία καφέ, έρχεσαι 4allStores. Για τον έρωτα… η αναζήτηση συνεχίζεται.",
    8: "Για την αθεράπευτα ΑΝΤΙ&#8209;ρομαντική ψυχή σου, προτείνεται σταθερά ποιοτικός καφές! Espresso 4all Classic! Γευστική πανδαισία σε κάθε γουλιά!"
  }
}

interface ResultHeartImgs {
  [key: string]: string;
}

// const vote = ref<string>('');
// const voted = ref(false);
const background = ref<string>('bg-1');
const resultHeart: ResultHeartImgs = {
  valentine: "valentine-heart.png",
  antivalentine: "antivalentine-heart.png"
}

const getMessage = (voteType: ('valentine' | 'antivalentine')): string => {
  const messages = valentineMessages[voteType];
  const keys = Object.keys(messages);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return messages[Number(randomKey)];
}

const submitVote = async (usrVote: ('valentine' | 'antivalentine')) => {
  const message = getMessage(usrVote);
  await http.post('https://4allstores.gr/wp-json/valentines/v1/vote', {
    vote_type: usrVote
  }).then(res => {
    // console.log(res.data);
  });

  voteStore.setVote(usrVote, message);

  await http.get('https://4allstores.gr/wp-json/valentines/v1/totals').then(res => {
    const percentages = calculatePercentages(res.data);
    setPercentages(percentages);
  });
  
  if(voteStore.vote === 'antivalentine') {
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

const displayComingSoon = () => {
  const nowDate = new Date();
  const comingSoonDate = new Date('2025-01-31T11:59:59');

  if(nowDate < comingSoonDate) {
    comingSoonActive.value = true;
  }
}
const getRandomVoteType = (): 'valentine' | 'antivalentine' => {
  const voteTypes: Array<'valentine' | 'antivalentine'> = ['valentine', 'antivalentine'];
  const randomIndex = Math.floor(Math.random() * voteTypes.length);
  return voteTypes[randomIndex];
}

const displayResults = async () => {
  const randomVotePick = getRandomVoteType();
  const message = getMessage(randomVotePick);

  voteStore.setVote(randomVotePick, message);

  await http.get('https://4allstores.gr/wp-json/valentines/v1/totals').then(res => {
    const percentages = calculatePercentages(res.data);
    setPercentages(percentages);
  });
  
  if(voteStore.vote === 'antivalentine') {
    background.value = 'bg-2';
  }
  setTimeout(() => {
    setAntivalentineNum('.antivalentine-percentage');
    progressBar('.progress', '.valentine-percentate', '.antivalentine-percentage', 15);
  }, 50)
}

const gameOver = () => {
  const nowDate = new Date();
  const gameEndDate = new Date('2025-02-16T23:59:59');
  if(nowDate > gameEndDate) {
    displayResults();
    voteStore.voted = true;
  }
}

onMounted(()=>{
  calcVH();
  displayComingSoon();
  gameOver();
})

const setAntivalentineNum = (selector: string) => {
  const antiValNumEl: HTMLElement | null = document.querySelector(selector);
  if(antiValNumEl) {
    let percentage = antiValNumEl.dataset.percentage;
    antiValNumEl.style.marginRight = Number(percentage) / 4 + '%';
  }
}

const calculatePercentages = (data: { valentine: number, antivalentine: number }) => {
  const totalVotes = data.valentine + data.antivalentine;
  const valentinePercentage = totalVotes === 0 ? 0 : (data.valentine / totalVotes) * 100;
  const antivalentinePercentage = totalVotes === 0 ? 0 : (data.antivalentine / totalVotes) * 100;
  return { valentine: valentinePercentage, antivalentine: antivalentinePercentage };
}

const setPercentages = (percentages: { valentine: number, antivalentine: number }) => {
  const valentinePercentageEl: HTMLElement | null = document.querySelector('.valentine-percentate');
  const valentinePercentageProgressEl: HTMLElement | null = document.querySelector('.progress');
  const antivalentinePercentageEl: HTMLElement | null = document.querySelector('.antivalentine-percentage');
  if(valentinePercentageEl && antivalentinePercentageEl && valentinePercentageProgressEl) {
    valentinePercentageEl.textContent = `${percentages.valentine}%`;
    valentinePercentageProgressEl.dataset.percentage = `${percentages.valentine}`;
    antivalentinePercentageEl.textContent = `${percentages.antivalentine}%`;
    antivalentinePercentageEl.dataset.percentage = `${percentages.antivalentine}`;
    if (percentages.valentine <= 15)
      valentinePercentageEl.style.display = 'none';

    if (percentages.antivalentine <= 15)
      antivalentinePercentageEl.style.display = 'none';
  }
}


</script>

<template>
<div class="val-container" :class="background">
  <div class="val-inner-container coming-soon" v-if="comingSoonActive">
    <div>
      <h1><span class="val">Valentine</span> <span class="vs">VS</span> ANTI-VALENTINE</h1>
      <h2 class="text-ln-1"> 01-16 Φεβρουαρίου 2025</h2>
      <h2 class="text-ln-2"> Ποια πλευρά λες να κερδίσει;</h2>
    </div>
    <img style="display: block;" class="res-heart" src="/valentine-heart.png" alt="heart">
  </div>

  <div class="val-inner-container" v-if="!voteStore.voted && !comingSoonActive">
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
    <div class="val-inner-container results-container" v-if="voteStore.voted">
      <div class="text" :class="voteStore.vote">
        <span v-html="voteStore.message"></span>
        <img style="display: block;" class="res-heart" :src="resultHeart[voteStore.vote]" alt="heart">
      </div>
      <div class="bar-container">
        <div class="bar-text-container">
          <img src="/valentine-title.png" alt="Valentine">
          <img src="/antivalentine-title.png" alt="Antivalentine">
        </div>
        <div class="item_bar cell">
          <span class="antivalentine-percentage" data-percentage="35">35</span>
          <div class="progress" data-percentage="65">
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
          :img="'stores-icon.png'"
          :id="'v-strore-locator'"
          ></action-button>
          <action-button
          :title="'Καφές'"
          :href="'https://4allstores.gr/#high-quality-cofee'"
          :img="'coffee-icon.png'"
          :id="'v-coffee'"
          ></action-button>
          <action-button
          :title="'Προσφορές'"
          :href="'https://4allstores.gr/prosfores-3'"
          :img="'drinks-icon.png'"
          :id="'v-prosfores'"
          ></action-button>
          <action-button
          :title="'Franchise'"
          :href="'https://4allstores.gr/franchise'"
          :img="'franchise.png'"
          :id="'v-franchise'"
          ></action-button>
          <action-button
          :title="'Εργασία'"
          :href="'https://4allstores.gr/kariera-2-2'"
          :img="'ergasia.png'"
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
  /* height: calc(var(--vh, 1vh) * 100); */
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
  width: 33vh;
  display: block;
  margin: auto;
  animation:pulse 1s infinite;
}
.choose-side {
  max-width: 100%;
  width: 85vw;
  display: block;
  margin: auto;
}
.item_bar {
  position: relative;
  /* height: 3rem; */
  height: 6vh;
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
  /* height: 3rem; */
  height: 6vh;
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
  /* font-size: 1.875rem; */
  font-size: 3vh;
  font-weight: 600;
}
.item_bar .antivalentine-percentage {
  font-family: 'RobotoFlex';
  color: #DE002D;
  /* font-size: 1.875rem; */
  font-size: 3vh;
  font-weight: 600;
}
.text {
  font-family: "AC-FatCord";
  font-size: 3vh;
  text-align: center;
  max-width: 340px;
  margin-left: auto;
  margin-right: auto;
  line-height: 5vh;
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
  /* width: 100px; */
  width: 8vh;
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
  justify-content: center;
}
action-button {
  width: 30%;
}
.results-container {
  padding-top: 30px;
}
.coming-soon {
  align-items: center;
  text-align: center;
  justify-content: center;
}
.coming-soon h1{
  font-family: "RobotoFlex";
  font-size: 3vh;
}
.coming-soon h1 .val {
  color: #DE002D;
}
.coming-soon h1 .vs {
  display: block;
}
.coming-soon h2{
  font-family: "RobotoFlex";
  font-size: 3vh;
}
.coming-soon .res-heart {
  animation:pulse 1s infinite;
}
.coming-soon .text-ln-1 {
  margin-bottom: 0;
}
.coming-soon .text-ln-2 {
  margin-top: 10px;
}
@keyframes pulse {
	10% {transform: scale(1.1)}
}
</style>
