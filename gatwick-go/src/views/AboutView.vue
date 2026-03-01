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
    playerID: String,
    gateID: String,
    skin: String,
    players: Array  
  },
  data() {
    return {
      p5Instance: null,
      xAxis: 50,
      score: 0,
      planes: [],
      boardingGroup: "E",
      playerHeading: "n",
      MAX_PLANES: 1,
      PLANE_MINUS: 4,
      POINTS_PER_SECOND: 0.1,
      PLANE_SPEED: 2
    };
  },
  mounted() {
    const sketch = (p) => {
      let bus;
      let planes;
      let bg;

      let worldOffset;
      let playerPos;

      // n = +y, s = -y, e = +x, w = -x

      p.preload = () => {
        bus = {
          reg: p.loadImage(`../../img/${this.skin}.png`),
          left: p.loadImage(`../../img/${this.skin}_left.png`),
          right: p.loadImage(`../../img/${this.skin}_right.png`)
        }
        planes = [
          p.loadImage('../../img/easyjet.png'),
          p.loadImage('../../img/ryanair.png'),
          p.loadImage('../../img/tui.png'),
          p.loadImage('../../img/ba.png')
        ]
        bg = p.loadImage('../../bg-layers/bg.png')
      }

      p.setup = () => {
        p.createCanvas(p.windowWidth - 24, p.windowHeight - 24);
        p.background(200);
        p.rectMode(p.CENTER);
        p.imageMode(p.CENTER);
        p.angleMode(p.DEGREES);

        worldOffset = p.createVector(-100, -100);

        playerPos = p.createVector(p.width / 2, p.height * 0.75);

        var url = `https://api.gatwickgo.uk/${this.gateID}/new_player?name=${this.playerID}`;

        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log(response.json());
          })
      };

      p.draw = () => {
        p.background(200);
        p.push();
        p.translate(worldOffset.x, worldOffset.y);
        p.image(bg, 1250, 450, 12800, 6400);
        p.pop();
        p.fill(255, 0, 0, 127); // TEMP FOR COLLISION RECTANGLES
        // user bus
        //p.rect(p.width * (this.xAxis / 100), p.height * 0.75, 200, 300); // TEMP FOR COLLISION RECTANGLES
        switch (this.playerHeading) {
          case 'n':
            p.image(bus.reg, p.width * (this.xAxis / 100), p.height * 0.75, 200, 300);
            break;
          case 's':
            p.image(bus.reg, p.width * (this.xAxis / 100), p.height * 0.75, 200, 300);
            break;
          case 'e':
            p.image(bus.right, p.width * (this.xAxis / 100), p.height * 0.75, 200, 300);
            break;
          case 'w':
            p.image(bus.left, p.width * (this.xAxis / 100), p.height * 0.75, 200, 300);
            break;
        }
        // p.image(bus.reg, p.width * (this.xAxis / 100), p.height * 0.75, 200, 300);

        

        //planes
        this.checkPlanes(p, planes)

        this.score+=this.POINTS_PER_SECOND

        switch (this.playerHeading) {
          case 'n':
            worldOffset.y += 1
            break;
          case 's':
            worldOffset.y -= 1
            break;
          case 'e':
            worldOffset.x -= 1
            break;
          case 'w':
            worldOffset.x += 1
            break;
        }

        if (this.score <= 0) {
          this.score = 0
        }
        if (Math.ceil(this.score) % 100 == 0 && Math.ceil(this.score) != 0) {
          //JAMES TODO: PUSH SCORE TO SERVER HERE (THIS SHOULD HAPPEN ONCE EVERY 40 SECONDS MAX RN AJUST THE 100 IF NEEDED <3)
          var url = `https://api.gatwickgo.uk/${this.gateID}/data?name=${this.playerID}&score=${Math.ceil(this.score)}`;
          fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            let responseData = response.json();
            responseData.then(data => {
              this.boardingGroup = data.boarding_group
              console.log(data);
            })
          })
          console.log(this.playerID)
          console.log(this.score)
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
      // this.xAxis--
      switch (this.playerHeading) {
        case 'n':
          this.playerHeading = "w"
          break;
        case 's':
          this.playerHeading = "e"
          break;
        case 'e':
          this.playerHeading = "n"
          break;
        case 'w':
          this.playerHeading = "s"
          break;
      }
    },
    goRight() {
      // this.xAxis++
      switch (this.playerHeading) {
        case 'n':
          this.playerHeading = "e"
          break;
        case 's':
          this.playerHeading = "w"
          break;
        case 'e':
          this.playerHeading = "s"
          break;
        case 'w':
          this.playerHeading = "n"
          break;
      }
    },
    checkPlanes(p, loadedPlanes) {
      // Add plane
      if (this.planes.length < this.MAX_PLANES) {
        let planeChance = p.random(0, 25);
        if (Math.ceil(planeChance) == 13) {
          // Choose a random plane
          let planeChoice = p.random(loadedPlanes);
          let directionChoice = p.random(['x', 'y', 'd'])
          let randomizeX = p.random() < 0.5; // 50% chance
          if (directionChoice == 'x'){
            randomizeX = false
          } else if (directionChoice == 'y'){
            randomizeX = true
          }

          this.planes.push({
            'image': planeChoice,
            'xAxis': randomizeX ? p.random(0, p.width) : 0,   // random or centered
            'yAxis': !randomizeX ? p.random(0, p.height) : 0, // random or centered
            'direction': directionChoice
          });
        }
      }

      // Update planes
      if (this.planes.length >= 1){
        this.planes.forEach(plane => {
          let angle = 0;
          switch (plane.direction) {
            case 'x':
              angle = 0;
              if (this.playerHeading == "w") {
                plane.xAxis+=this.PLANE_SPEED-1
              } else if (this.playerHeading == "e") {
                plane.xAxis-=this.PLANE_SPEED-1
              } else {
                plane.xAxis+=this.PLANE_SPEED
              }
              break;
            case 'y':
              angle = 90;

              if (this.playerHeading == "n") {
                plane.yAxis+=this.PLANE_SPEED-1
              } else if (this.playerHeading == "s") {
                plane.yAxis-=this.PLANE_SPEED-1
              } else {
                plane.yAxis+=this.PLANE_SPEED
              }
              break;
            case 'd':
              angle = 25;
              plane.xAxis+=this.PLANE_SPEED-1
              plane.yAxis+=this.PLANE_SPEED-1
              break;
          }

          // Draw plane with rotation
          p.push();
          p.translate(plane.xAxis, plane.yAxis);
          p.rotate(angle);
          p.image(plane.image, 0, 0, 450, 350);
          p.pop();

          // Check collision: TODO UPDATE THIS LOGIC
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
          if ( (plane.xAxis > p.width + 200 || plane.yAxis > p.height + 175) || (plane.xAxis < -200 || plane.yAxis < -175) ) {
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
  font-size: 3rem;
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
  font-size: 3.75rem;
  width: max-content;
}
</style>