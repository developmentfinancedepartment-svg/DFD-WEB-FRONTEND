<template>
  <div class="hd">
    <navigation></navigation>
    <test></test>
  </div>

  <div class="rw">
    <router-view />
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
</style>
