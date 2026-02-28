<template>
  <div ref="canvasContainer">
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
      xAxis: 50
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
</style>