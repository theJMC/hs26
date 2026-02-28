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
      score: 0,
      planes: [],
      MAX_PLANES: 1,
      PLANE_MINUS: 4,
      POINTS_PER_SECOND: 0.1
    };
  },
  mounted() {
    const sketch = (p) => {
      let bus;
      let planes;

      p.preload = () => {
        bus = {
          reg: p.loadImage('../../img/bus.png'),
          left: p.loadImage('../../img/bus_left.png'),
          right: p.loadImage('../../img/bus_right.png')
        }
        planes = [
          p.loadImage('../../img/easyjet.png'),
          p.loadImage('../../img/ryanair.png'),
          p.loadImage('../../img/tui.png'),
          p.loadImage('../../img/ba.png')
        ]
      }

      p.setup = () => {
        p.createCanvas(p.windowWidth - 24, p.windowHeight - 24);
        p.background(200);
        p.rectMode(p.CENTER);
        p.imageMode(p.CENTER);
        p.angleMode(p.DEGREES);
      };

      p.draw = () => {
        p.background(200);
        p.fill(255, 0, 0, 127); // TEMP FOR COLLISION RECTANGLES
        // user bus
        p.rect(p.width * (this.xAxis / 100), p.height * 0.75, 200, 300); // TEMP FOR COLLISION RECTANGLES
        p.image(bus.reg, p.width * (this.xAxis / 100), p.height * 0.75, 200, 300);

        //planes
        this.checkPlanes(p, planes)

        this.score+=this.POINTS_PER_SECOND
        if (this.score <= 0) {
          this.score = 0
        }
      };
    };
    this.p5Instance = new window.p5(sketch, this.$refs.canvasContainer);
  },
  computed: {
    scoreArray() {
      let rounded = Math.ceil(this.score);
      if (rounded <= 0) {
        rounded = 0;
      }
      return String(rounded)
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
    },
    checkPlanes(p, loadedPlanes) {
      // Add plane
      if (this.planes.length < this.MAX_PLANES) {
        let planeChance = p.random(0, 25);
        console.log(planeChance)
        if (Math.ceil(planeChance) == 13) {
          // Choose a random plane
          let planeChoice = p.random(loadedPlanes);
          let directionChoice = p.random(['x', 'y', 'd'])
          this.planes.push({
            'image': planeChoice, 
            'xAxis': 0,
            'yAxis': 0, 
            'direction': directionChoice
          })
        }
      }

      // Update planes
      if (this.planes.length >= 1){
        this.planes.forEach(plane => {
          //TODO set plane angle
          p.rect(plane.xAxis, plane.yAxis, 400, 175); // TEMP FOR COLLISION RECTANGLES
          p.rect(plane.xAxis - 15, plane.yAxis, 100, 250); // TEMP FOR COLLISION RECTANGLES
          p.image(plane.image, plane.xAxis, plane.yAxis, 450, 350)
          //TODO remove angle

          // Update plane co-ords
          switch(plane.direction) {
            case 'x':
              plane.xAxis++
              break;
            case 'y':
              plane.yAxis++
              break;
            default:
              plane.xAxis++
              plane.yAxis++
          }

          // Check collision
          const busX = p.width * (this.xAxis / 100);
          const busY = p.height * 0.75;
          const busW = 200;
          const busH = 300;
          const planeW = 400;
          const planeH = 175;
          const busLeft   = busX - busW / 2;
          const busRight  = busX + busW / 2;
          const busTop    = busY - busH / 2;
          const busBottom = busY + busH / 2;
          const planeLeft   = plane.xAxis - planeW / 2;
          const planeRight  = plane.xAxis + planeW / 2;
          const planeTop    = plane.yAxis - planeH / 2;
          const planeBottom = plane.yAxis + planeH / 2;

          // Check overlap
          const overlapX = Math.max(0, Math.min(busRight, planeRight) - Math.max(busLeft, planeLeft));
          const overlapY = Math.max(0, Math.min(busBottom, planeBottom) - Math.max(busTop, planeTop));

          if (overlapX > 0 && overlapY > 0) {
            // Calculate center of overlapping area
            const collisionX = Math.max(busLeft, planeLeft) + overlapX / 2;
            const collisionY = Math.max(busTop, planeTop) + overlapY / 2;
            // Draw explosion exactly at impact zone
            p.textSize(80);
            p.textAlign(p.CENTER, p.CENTER);
            p.text("💥", collisionX, collisionY);
            this.score-=this.PLANE_MINUS
          }

          // Remove plane if off screen fully
          if (plane.xAxis > p.width + 200 || plane.yAxis > p.height + 175) {
            const index = this.planes.indexOf(plane);
            if (index > -1) {
              this.planes.splice(index, 1);
            }
          }
        })
      }
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