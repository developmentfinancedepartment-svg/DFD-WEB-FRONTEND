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
      class="hotline-floating-widget fixed right-3 sm:right-6 top-52 sm:top-56 z-50 bg-gradient-to-r from-[#005f73] to-[#008795] text-white shadow-xl px-5 py-3 rounded-full border-2 border-white/90 flex items-center gap-3 cursor-pointer"
      title="Call 1819 Hotline"
      aria-label="Call 1819 Hotline"
    >
      <!-- Subtle glowing/blinking ping effect -->
      <span
        class="hotline-ping-ring animate-ping bg-[#00e5ff] opacity-40 rounded-full"
      ></span>

      <!-- Headset icon within a circular translucent badge with pulse -->
      <span
        class="hotline-icon-badge w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center animate-pulse"
      >
        <i class="fas fa-headset text-lg"></i>
      </span>

      <!-- Hotline Text & Number Stack -->
      <div class="hotline-text-stack flex flex-col leading-tight select-none">
        <span
          class="hotline-label text-[11px] font-extrabold tracking-wider uppercase text-teal-200"
          >HOTLINE</span
        >
        <span class="hotline-number text-2xl font-black text-white">1819</span>
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
  bottom: 96px;
  right: 24px;
  z-index: 39;
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
  top: 13rem !important; /* top-52 (below navbar on upper right) */
  z-index: 50 !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.75rem;
  background: linear-gradient(to right, #005f73, #008795) !important;
  color: #ffffff !important;
  text-decoration: none !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
  border: 2px solid rgba(255, 255, 255, 0.9) !important;
  border-radius: 9999px !important;
  padding: 0.75rem 1.25rem !important; /* px-5 py-3 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

@media (min-width: 640px) {
  .hotline-floating-widget {
    right: 1.5rem !important; /* sm:right-6 */
    top: 14rem !important; /* sm:top-56 */
  }
}

.hotline-floating-widget:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 25px 35px -5px rgba(0, 95, 115, 0.6), 0 10px 12px -5px rgba(0, 0, 0, 0.3) !important;
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
    transform: scale(1.25);
    opacity: 0;
  }
}

.hotline-icon-badge {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem; /* w-10 = 40px */
  height: 2.5rem; /* h-10 = 40px */
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 1.125rem; /* text-lg = 18px */
  flex-shrink: 0;
  animation: hotline-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes hotline-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.75;
    transform: scale(0.94);
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
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 800;
  color: #99f6e4; /* text-teal-200 */
}

.hotline-number {
  font-size: 1.5rem; /* text-2xl = 24px */
  font-weight: 900; /* font-black */
  color: #ffffff;
  letter-spacing: 0.04em;
  line-height: 1;
}
</style>
