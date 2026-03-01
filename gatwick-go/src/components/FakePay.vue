<template>
  <div v-if="visible" class="fake-pay-overlay" @click.self="close">
    <div class="fake-pay-box">

      <div class="fake-header">
        <div class="notch"></div>
        <p class="demo-label">Apdroid Pay</p>
      </div>

      <div class="merchant">
        <div class="app-icon"></div>
        <div>
          <h3>GatwickGO | Skin Store</h3>
          <p>{{ skinName }}</p>
        </div>
      </div>

      <div class="amount">
        <span>Total</span>
        <h1>${{ formattedPrice }}</h1>
      </div>

      <div class="card">
        <div class="card-chip"></div>
        <div class="card-details">
          <p>Visa •••• 4242</p>
          <p>Exp 04/29</p>
        </div>
      </div>

      <div class="auth-section">

        <div 
          class="fingerprint"
          :class="{ scanning: state === 'auth' }"
          @click="startFakeAuth"
        ></div>

        <p v-if="state === 'idle'">
          Present Fingerprint To Authenticate
        </p>

        <p v-if="state === 'auth'">
          Authenticating...
        </p>

        <p v-if="state === 'success'" class="success">
          ✔ Payment Approved
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FakePay",

  props: {
    playerID: String,
    skinName: String,
    price: {
      type: Number,
      default: 799,
    }
  },

  data() {
    return {
      state: "idle", // idle | auth | success
      visible: true,
    }
  },

  computed: {
    formattedPrice() {
      return this.price.toFixed(2)
    }
  },

  methods: {
    startFakeAuth() {
      if (this.state !== "idle") return

      this.state = "auth"

      setTimeout(() => {
        this.state = "success"

        setTimeout(() => {
          this.close()
        }, 1200)

      }, 1500)
    },
    close() {
      this.visible = false
      this.$emit("close")
    }
  }
}
</script>

<style scoped>
.fake-pay-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  z-index: 999;
}

.fake-pay-box {
  width: 340px;
  background: #111;
  color: white;
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  animation: pop 0.25s ease;
}

@keyframes pop {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.notch {
  width: 100px;
  height: 18px;
  background: #000;
  border-radius: 12px;
  margin: 0 auto 10px;
}

.demo-label {
  font-size: 12px;
  opacity: 0.5;
  text-align: center;
}

.merchant {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.app-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #444, #222);
  border-radius: 12px;
}

.amount span {
  font-size: 14px;
  opacity: 0.6;
}

.amount h1 {
  margin: 4px 0 20px;
  font-size: 32px;
}

.card {
  background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
  padding: 14px;
  border-radius: 16px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-chip {
  width: 32px;
  height: 24px;
  background: gold;
  border-radius: 4px;
}

.auth-section {
  text-align: center;
}

.fingerprint {
  width: 60px;
  height: 60px;
  border: 2px solid #666;
  border-radius: 50%;
  margin: 0 auto 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.fingerprint.scanning {
  border-color: #4caf50;
  box-shadow: 0 0 15px #4caf50;
}

.slide-bar {
  margin-top: 16px;
  background: #222;
  border-radius: 40px;
  padding: 10px;
  font-size: 14px;
  opacity: 0.8;
}

.success {
  color: #4caf50;
  font-weight: bold;
}
</style>