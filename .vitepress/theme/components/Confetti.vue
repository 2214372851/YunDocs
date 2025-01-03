<script setup lang="ts">
import confetti from "canvas-confetti";


let end = Date.now() + (5 * 1000);

let colors = ['#E999AB', '#E65367', '#CCA4E3', '#2ADD9C'];

(function frame() {
  confetti({
    particleCount: 4,
    angle: 60,
    spread: 55,
    origin: {
      x: 0
    },
    colors: colors
  });
  confetti({
    particleCount: 4,
    angle: 120,
    spread: 55,
    origin: {
      x: 1
    },
    colors: colors
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}());
</script>