<template>
  <main>
    <div class="wrapper">
      <div class="wrapper-major">
        <div class="title-container">
          <span class="title">GATE</span>
          <span class="subtitle">Enter your gate number (e.g. h5, a12, etc.)</span>
        </div>
        <div class="lines"></div>
      </div>

    <form @submit.prevent="inputGate" class="wrapper-minor">
        <input
            class="gate-input"
            v-model="gateID"
            placeholder="H5"
        />

        <button type="submit" class="start-button">
            <span class="material-symbols-outlined">thumb_up</span>
            Confirm
            <span class="material-symbols-outlined">thumb_up</span>
        </button>
    </form>
    
    <span class="tagline">Jess James & Matt | GatwickGo2026</span>
    </div>
  </main>
</template>

<script>
import { gameState } from '@/router';

export default {
  name: "Gate",
  props: {
    playerID: String,
  },
  data() {
    return {
      gateID: ""
    }
  },
  methods: {
    inputGate() {
        let gate = this.gateID?.trim().toLowerCase()

        if (!gate) {
        gate = "h5"
        }

        gameState.gateID = gate
        this.$router.push({ name: "about" })
    },
  }
}
</script>

<style scoped>
.wrapper {
  background: linear-gradient(135deg, var(--gatwick-dark), var(--gatwick-navy));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  gap: 5%;
  padding: 5%;
}

.wrapper-major {
  width: 100%;
}

.wrapper-minor {
    height: 0;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.skin-carousel {
    height: 100%;
    display: flex;
    justify-content: space-between;
}

.slide {
    width: 30%;
    display: flex;
    justify-content: center;
    background: var(--gatwick-navy);
    border: 36px solid var(--gatwick-blue);
    border-radius: 25px;
    padding: 1%;
    position: relative;
}

.slide img {
  object-fit: contain;
}

.slide button {
    position: absolute;
    bottom: 12px;
    border-radius: 12px;
    background-color: var(--gatwick-blue-light);
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 14px;
    padding: 12px 36px;
    background: linear-gradient(90deg, var(--gatwick-blue), var(--gatwick-blue-light));
    font-weight: 600;
    font-size: 24px;
    color: white;
    text-decoration: none;
    transition: 0.25s ease;
    box-shadow: 0 6px 20px rgba(0,160,178,0.3);
}

.welcome {
  justify-self: unset;
  color: grey;
}

.title-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 60px;
  font-weight: bolder;
  letter-spacing: -1px;
  color: white;
  line-height: 72px;
  height: 72px;
  display: flex;
  text-transform: uppercase;
}

.subtitle {
  font-size: 36px;
  font-weight: bolder;
  letter-spacing: -1px;
  color: var(--text-muted);
  line-height: 72px;
  height: 72px;
  display: flex;
  text-transform: uppercase;
}

.logo i {
  color: var(--gatwick-blue);
  font-style: italic;
  font-size: 84px;
  display: flex;
}

.start-button {
  display: inline-flex;
  align-items: center;
  width: min-content;
  margin: auto;
  gap: 14px;
  padding: 12px 36px;
  background: linear-gradient(90deg, var(--gatwick-blue), var(--gatwick-blue-light));
  border-radius: 40px;
  font-weight: 600;
  font-size: 24px;
  color: white;
  text-decoration: none;
  transition: 0.25s ease;
  box-shadow: 0 6px 20px rgba(0,160,178,0.3);
}

.start-button a {
  color: white;
  text-decoration: none;
  font-weight: lighter;
}

.start-button:hover {
  transform: translateX(4px);
  box-shadow: 0 8px 25px rgba(0,160,178,0.5);
}

.lines {
  width: 100%;
  background-color: var(--gatwick-blue);
  height: 1px;
  margin-top: 2.5%;
}

.gate-input {
    font-size: 25vh;
    width: 300px;
    margin: auto;
}

.tagline {
  position: absolute;
  bottom: 24px;
  left: 5%;
  color: var(--text-muted);
  margin-top: 8px;
  font-size: 16px;
  text-transform: uppercase;
  margin: 1% 0;
  font-size: 12px;
}
</style>