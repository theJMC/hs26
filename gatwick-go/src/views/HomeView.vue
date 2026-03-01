<template>
  <main>
    <div class="wrapper">
      <div class="wrapper-major">
        <div class="logo-container">
          <span class="welcome">welcome to</span>
          <div class="logo">
            <span>gatwick</span>
            <i>
              <img src="../../public/img/logo.png" alt="G" width="100%">
              O!</i>
          </div>
        </div>

        <div class="lines"></div>

        <a href="#" class="start-button">
          <RouterLink to="/gate">Begin Journey</RouterLink>
          <span class="material-symbols-outlined"> airport_shuttle </span>
        </a>

        <a href="#" class="start-button">
          <RouterLink to="/skin">Customise Your Bus</RouterLink>
          <span class="material-symbols-outlined"> palette </span>
        </a>
        <span class="tagline">Jess James & Matt | GatwickGo2026</span>
      </div>
      <div class="wrapper-minor">
        <img :src="`/img/${skin}.png`" alt="Bus Skin" width="100%">
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Main",
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
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  gap: 5%;
  padding: 5%;
}

.wrapper-major {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.wrapper-minor {
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
}

.welcome {
  justify-self: unset;
  color: grey;
}

.logo-container {
  width: 33%;
}

.logo {
  font-size: 3.75rem;
  font-weight: bolder;
  letter-spacing: -1px;
  color: white;
  line-height: 72px;
  height: 72px;
  display: flex;
}

.logo i {
  color: var(--gatwick-blue);
  font-style: italic;
  font-size: 84px;
  display: flex;
}

.start-button {
  margin-top: 40px;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 12px 36px;
  background: linear-gradient(90deg, var(--gatwick-blue), var(--gatwick-blue-light));
  border-radius: 40px;
  font-weight: 600;
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
  transition: 0.25s ease;
  box-shadow: 0 6px 20px rgba(0,160,178,0.3);
  width: max-content;
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
  margin-bottom: 15%;
}

.tagline {
  position: absolute;
  bottom: 6px;
  left: 5%;
  color: var(--text-muted);
  margin-top: 8px;
  font-size: 16px;
  text-transform: uppercase;
  margin: 1% 0;
 font-size:  0.75rem;
}
</style>