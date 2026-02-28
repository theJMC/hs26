<template>
  <div ref="canvasContainer">
    <div class="score-boxes">
      <span v-for="(s, index) in scoreArray" :key="index">{{ s }}</span>
    </div>
    <div class="boarding-class"> {{ boardingGroup }} </div>
    <button class="button button-left" @click="goLeft"> < </button>
    <button class="button button-right" @click="goRight"> > </button>
  </div>
</template>

<script>
export default {
  name: "P5Canvas",
  props: {
    skin: String,
    boardingGroup: String,
    players: Array  
  },
  data() {
    return {
      p5Instance: null,
      xAxis: 50,
      score: 12,
    };
  },
  mounted() {
    const sketch = (p) => {
      let bus;
      let plane;

      p.preload = () => {
        bus = {
          reg: p.loadImage('../../img/bus.png'),
          left: p.loadImage('../../img/bus_left.png'),
          right: p.loadImage('../../img/bus_right.png')
        }
        plane = p.loadImage('../../img/easyjet.png')
      }

      p.setup = () => {
        p.createCanvas(p.windowWidth - 24, p.windowHeight - 24);
        p.background(200);
        p.rectMode(p.CENTER);
        p.imageMode(p.CENTER)
      };

      p.draw = () => {
        p.background(200);

        // user bus
        p.fill(255, 0, 0);
        // BASE ==> p.rect(p.width * (this.xAxis / 100), p.height * 0.75, 200, 300);
        p.image(bus.reg, p.width * (this.xAxis / 100), p.height * 0.75, 200, 300);

        // BASE ==>
        p.fill(255, 0, 0, 127);
        let planeStart = 400
        p.image(plane, planeStart, 400, 450, 450)
        p.rect(planeStart + 25, 400, 25, 300);
        p.rect(planeStart + 10, 395, 400, 90);
      };
    };
    this.p5Instance = new window.p5(sketch, this.$refs.canvasContainer);
  },
  computed: {
    scoreArray() {
      return String(this.score)
        .padStart(6, '0')
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