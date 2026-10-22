<template>
  <div class="hero-section">
    <div class="hero-image-box">
      <div class="slide-container">
        <div class="slides-wrapper">
          <div
            v-for="(slide, index) in slides"
            :key="'slide-layer-' + index"
            class="slide-layer"
            :class="{ active: currentSlide === index }"
          >
            <img :src="slide.image" alt="Hero Banner" class="hero-banner" />
          </div>

          <!-- Left-to-right dark gradient overlay: high text readability on left, fading into transparency on right -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none z-[5] hero-gradient-overlay"
          ></div>

          <div class="hero-overlay">
            <p class="hero-tagline text-amber-400">
              {{ slides[currentSlide].tagline }}
            </p>
            <div class="hero-title">
              <div class="title-line-1">To Strengthen</div>
              <div class="title-line-1">The Economy true</div>
              <div class="title-line-2">Financial Assistance</div>
            </div>
            <router-link :to="slides[currentSlide].link" class="hero-btn">
              <i class="fas fa-file-invoice-dollar"></i> READ MORE &rarr;
            </router-link>
          </div>
        </div>
      </div>

      <div class="slider-dots">
        <span
          v-for="(_, index) in slides"
          :key="'dot-' + index"
          class="dot"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import hero1 from "@/assets/hero-banner.jpg";
import hero2 from "@/assets/hero-banner-2.jpg";

const slides = ref([
  {
    image: hero1,
    tagline: "EMPOWERING PEOPLE",
    title: "To Strengthen the Economy true Financial Assistance",
    link: "/about",
  },
  {
    image: hero2,
    tagline: "EMPOWERING PEOPLE",
    title: "To Strengthen the Economy true Financial Assistance",
    link: "/about",
  },
]);

const currentSlide = ref(0);
let slideInterval = null;

const startSlider = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length;
  }, 7500);
};

const stopSlider = () => {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
};

const goToSlide = (index) => {
  currentSlide.value = index;
  stopSlider();
  startSlider();
};

onMounted(() => {
  startSlider();
});

onBeforeUnmount(() => {
  stopSlider();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600;1,700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap");

.hero-section {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.hero-image-box {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: clamp(520px, 48vw, 750px);
  margin: 0;
  padding: 0;
  line-height: 0;
  overflow: hidden;
  background-color: #022027;
}

.slide-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slides-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #022027;
}

.slides-wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.4) 45%,
    transparent 75%
  );
  z-index: 5;
  pointer-events: none;
}

.hero-gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.4) 45%,
    transparent 75%
  );
  z-index: 5;
  pointer-events: none;
}

.slide-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1.5s ease-in-out;
  z-index: 1;
}

.slide-layer.active {
  opacity: 1;
  z-index: 2;
}

.hero-banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover !important;
  object-position: center bottom !important;
  display: block;
}

.hero-overlay {
  position: absolute;
  top: 48%;
  transform: translateY(-50%);
  left: 5%;
  max-width: 620px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-tagline {
  color: #f59e0b;
  font-weight: 700;
  letter-spacing: 1.2px;
  font-size: 1.6rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
}

.hero-title {
  display: flex;
  flex-direction: column;
  font-family: "Plus Jakarta Sans", sans-serif;
  margin-bottom: 2rem;
  text-align: left;
  line-height: 1.2;
}

.title-line-1 {
  font-size: 42px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #ffffff;
}

.title-line-2 {
  font-family: "Playfair Display", Georgia, "Times New Roman", serif;
  font-style: italic !important;
  font-weight: 600;
  font-size: 50px;
  color: #00e5ff !important;
  text-shadow: 0 0 25px rgba(0, 229, 255, 0.45);
  margin-top: 2px;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 36px;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  border: 2px solid #00e5ff;
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 229, 255, 0.4);
}

.hero-btn i {
  margin-right: 10px;
  font-size: 1.1rem;
  color: #00e5ff;
}

.hero-btn:hover {
  background: #00e5ff;
  color: #022027;
  border-color: #00e5ff;
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 229, 255, 0.6);
}

.hero-btn:hover i {
  color: #022027;
}

.slider-dots {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #00e5ff;
  width: 32px;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .title-line-1 {
    font-size: 24px;
    font-weight: 500;
  }
  .title-line-2 {
    font-size: 34px;
    font-style: italic;
  }
  .hero-tagline {
    font-size: 1.1rem;
  }
  .hero-overlay {
    max-width: 90%;
    left: 5%;
  }
}
</style>
