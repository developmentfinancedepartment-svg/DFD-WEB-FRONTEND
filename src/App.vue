<template>
  <div class="hd">
    <navigation></navigation>
    <test></test>
  </div>

  <div class="rw">
    <router-view />

    <!-- Persistent Floating 1819 Hotline Widget -->
    <a
      href="tel:1819"
      class="hotline-floating-widget fixed right-3 top-52 sm:top-56 z-50 bg-gradient-to-r from-[#005f73] to-[#008795] text-white shadow-lg border border-white/20 rounded-full py-2.5 px-4"
      title="Call 1819 Hotline"
      aria-label="Call 1819 Hotline"
    >
      <!-- Subtle glowing/blinking ping effect -->
      <span
        class="hotline-ping-ring animate-ping bg-[#00e5ff] opacity-40 rounded-full"
      ></span>

      <!-- Headset icon within a circular translucent badge with pulse -->
      <span class="hotline-icon-badge animate-pulse">
        <i class="fas fa-headset"></i>
      </span>

      <!-- Hotline Text & Number Stack -->
      <div class="hotline-text-stack">
        <span class="hotline-label text-[9px] uppercase text-teal-200">HOTLINE</span>
        <span class="hotline-number text-base font-extrabold text-white">1819</span>
      </div>
    </a>
  </div>

  <div class="ft">
    <Footer></Footer>
  </div>

  <Accessibility />

  <!-- Scroll to Top Button -->
  <transition name="fade-slide">
    <button
      v-show="showScrollTop"
      @click="scrollToTop"
      class="scroll-to-top-btn"
      aria-label="Scroll to top"
    >
      <i class="fas fa-chevron-up"></i>
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showScrollTop = ref(false);

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<script>
import jQuery from "jquery";
window.$ = jQuery;

export default {
  data() {
    return {
      //global variables
    };
  },
  computed: {
    //computed data
  },
  methods: {
    //user methods
  },
};
</script>

<style>
.rw {
  height: auto;
  background: linear-gradient(to bottom, #ffffff, #9eb5cf);
  background-size: 100% 100%;
}

/* Scroll to Top Button Styles */
.scroll-to-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #008795;
  color: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.scroll-to-top-btn:hover,
.scroll-to-top-btn:active {
  transform: translateY(-4px);
  background-color: #00a8b5;
}

/* fade-slide transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Floating 1819 Hotline Widget */
.hotline-floating-widget {
  position: fixed !important;
  right: 0.75rem !important; /* right-3 */
  top: 13rem !important; /* top-52 (positioned safely below the blue accessibility button) */
  z-index: 50 !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.625rem;
  background: linear-gradient(to right, #005f73, #008795) !important;
  color: #ffffff !important;
  text-decoration: none !important;
  box-shadow: 0 10px 25px -5px rgba(0, 95, 115, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 9999px !important;
  padding: 0.625rem 1rem !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

@media (min-width: 640px) {
  .hotline-floating-widget {
    top: 14rem !important; /* sm:top-56 */
  }
}

.hotline-floating-widget:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 16px 30px -4px rgba(0, 95, 115, 0.5), 0 10px 12px -5px rgba(0, 0, 0, 0.25);
  color: #ffffff !important;
}

.hotline-ping-ring {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background-color: #00e5ff;
  opacity: 0.4;
  pointer-events: none;
  animation: hotline-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes hotline-ping {
  75%, 100% {
    transform: scale(1.3);
    opacity: 0;
  }
}

.hotline-icon-badge {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 14px;
  animation: hotline-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes hotline-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.65;
    transform: scale(0.92);
  }
}

.hotline-text-stack {
  position: relative;
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  user-select: none;
}

.hotline-label {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: #99f6e4; /* text-teal-200 */
}

.hotline-number {
  font-size: 1rem; /* text-base */
  font-weight: 800; /* font-extrabold */
  color: #ffffff;
  letter-spacing: 0.04em;
}
</style>
