<template>
  <div ref="canvasContainer">
    <div class="score-boxes">
      <span v-for="(s, index) in scoreArray" :key="index">{{ s }}</span>
    </div>
    <div class="boarding-class"> A </div>
    <button class="button button-left" @click="goLeft"> < </button>
    <button class="button button-right" @click="goRight"> > </button>
  </div>
</template>

<script>
export default {
  name: "P5Canvas",
  data() {
    return {
      p5Instance: null,
      xAxis: 50,
      score: 23,
    };
  },
  mounted() {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth - 24, p.windowHeight - 24);
        p.background(200);
      };

      p.draw = () => {
        //many plane things could go here
        p.fill(255, 0, 0);
        p.ellipse(p.width * (this.xAxis / 100), p.height * 0.75, 50, 50);
      };
    };
    this.p5Instance = new window.p5(sketch, this.$refs.canvasContainer);
  },
  computed: {
    scoreArray() {
      // Convert number to string, split into chars, then map back to numbers
      return String(this.score)
        .padStart(5, '0') // optional: always show 5 digits
        .split('')
        .map(Number);
    }
  },
  methods: {
    goLeft() {
      this.xAxis--
    },
    goRight() {
      this.xAxis++
    }
  },
  beforeUnmount() {
    if (this.p5Instance) {
      this.p5Instance.remove();
    }
  }
};
</script>


<style scoped>
* {
  background: linear-gradient(135deg, var(--gatwick-dark), var(--gatwick-navy));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.button {
  position: absolute;
  bottom: 12px;
  height: 25%;
  font-size: 100px;
  background: var(--gatwick-dark);
  color: white;
  border: none;
  padding: 36px;
}

.button-left {
  left: 12px; 
  border-top-right-radius: 25px;
}

.button-right {
  right: 12px; 
  border-top-left-radius: 25px;
}

.score-boxes {
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding: 12px 24px;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
  height: min-content;
  position: absolute;
  left: 0;
  top: 24px;
  background: var(--gatwick-dark);
  width: max-content;
}

.score-boxes span {
  height: min-content;
  background: white;
  font-size: 48px;
  padding: 0 6px;
}

.boarding-class {
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding: 12px 24px;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
  height: min-content;
  position: absolute;
  left: 0;
  top: 120px;
  background: var(--gatwick-dark);
  color: white;
  font-size: 60px;
  width: max-content;
}
</style>