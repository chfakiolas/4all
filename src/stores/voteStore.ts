import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useVoteStore = defineStore('voteStore', () => {
  const vote = ref<string>('');
  const voted = ref(false);
  const message = ref<string>('');

  const setVote = (usrVote: string, usrMessage: string) => {
    vote.value = usrVote;
    voted.value = true;
    message.value = usrMessage;

    // Set expiration for one hour
    setTimeout(() => {
      vote.value = '';
      voted.value = false;
      message.value = '';
    }, 3600000); // 3600000 ms = 1 hour
  };

  return { vote, voted, message, setVote };
});