import JSConfetti from "js-confetti";
import { ref } from "vue";

const jsConfetti = ref<JSConfetti>(new JSConfetti());
function addConfetti() {
  jsConfetti.value.addConfetti();
}

export function useConfetti() {
  return {
    addConfetti,
  };
}
