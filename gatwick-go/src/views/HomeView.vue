<template>
  <main>
    <div class="wrapper">
      <div class="logo-container">
        <span class="welcome">welcome to</span>
        <div class="logo">
          <span>gatwick</span><i>GO!</i>
        </div>
      </div>

      <a href="#" class="start-button">
        <span class="material-symbols-outlined"> airport_shuttle </span>
        <RouterLink to="/about">Enter Gate</RouterLink>
      </a>

      <i class="tagline">
        Your journey starts here
      </i>

      <div class="lines"></div>
    </div>
  </main>
</template>


<style scoped>

.wrapper {
  background: linear-gradient(135deg, var(--gatwick-dark), var(--gatwick-navy));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.welcome {
  justify-self: unset;
  color: grey;
}

.logo {
  font-size: 48px;
  font-weight: bolder;
  letter-spacing: -1px;
  color: white;
  margin-bottom: 50%;
}

.logo i {
  color: var(--gatwick-blue);
  font-style: italic;
}

.tagline {
  color: var(--text-muted);
  margin-top: 8px;
  font-size: 16px;
  text-transform: uppercase;
  margin: 1% 0;
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
  font-size: 18px;
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
  width: 33%;
  background-color: var(--gatwick-blue);
  height: 1px;
}
</style>