<template>
  <main>
    <div class="wrapper">
      <div class="wrapper-major">
        <div class="title-container">
          <span class="title">wardrobe</span>
          <span class="subtitle">select bus costume</span>
        </div>
        <div class="lines"></div>
      </div>
      <div class="wrapper-minor">

        <div class="skin-carousel">
            <div class="prev-slide slide">
                <img :src="`/img/bus.png`" alt="Bus Skin" height="80%">
                <button> SELECT </button>
            </div>
            <div class="current-slide slide"> 
                <img :src="`/img/bus.png`" alt="Bus Skin" height="80%">
                <button> SELECTED </button>
            </div>
            <div class="next-slide slide">
                <img :src="`/img/bus.png`" alt="Bus Skin" height="80%">
                <button> SELECT </button>
            </div>
        </div>

        <a href="#" class="start-button">
          <span class="material-symbols-outlined"> fast_rewind </span>
          <RouterLink to="/">Back to home</RouterLink>
        </a>
        <span class="tagline">Jess James & Matt | GatwickGo2026</span>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Skin",
  props: {
    playerID: String,
    skin: String,
  },
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
    position: absolute;
    top: 25px;
  display: inline-flex;
  align-items: center;
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