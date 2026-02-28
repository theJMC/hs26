<template>
  <div ref="canvasContainer"></div>
</template>

<script>
export default {
  name: "P5Canvas",
  data() {
    return {
      p5Instance: null
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
        p.ellipse(p.width / 2, p.height / 2, 50, 50);
      };
    };
    this.p5Instance = new window.p5(sketch, this.$refs.canvasContainer);
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
</style>