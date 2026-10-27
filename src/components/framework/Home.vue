<template>
  <div class="home-container">
    <!-- Hero / Slider Section -->
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
              <img
                :src="slide.image"
                alt="Hero Banner"
                class="hero-banner"
              />
            </div>
            <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none z-[5] hero-gradient-overlay"></div>
            <div class="hero-overlay">
              <p class="hero-tagline text-amber-400">{{ slides[currentSlide].tagline }}</p>
              <div class="hero-title">
                <div class="title-line-1">To Strengthen</div> 
                <div class="title-line-1">The Economy throw</div>
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
      <div class="news-ticker-container animate-fade-down">
        <Newsline />
      </div>
    </div>

    <!-- ================================================================= -->
    <!-- IMPACT STATISTICS COUNTER BAR SECTION                             -->
    <!-- ================================================================= -->
    <section ref="statsSectionRef" class="max-w-6xl mx-auto px-4 py-8">
      <div class="bg-ash rounded-3xl p-8 border border-slate-200/80 shadow-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
        <div
          v-for="(stat, index) in impactMetrics"
          :key="stat.id"
          class="flex flex-col items-center justify-center pt-4 md:pt-0 first:pt-0"
          :class="index === 4 ? 'col-span-2 md:col-span-1' : ''"
        >
          <!-- Circular Top Badge -->
          <div class="w-12 h-12 rounded-full bg-teal-50 text-[#008795] flex items-center justify-center text-lg mb-2 shadow-2xs mx-auto">
            <i :class="stat.icon"></i>
          </div>

          <!-- Value Typography -->
          <div class="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
            {{ stat.prefix }}{{ stat.current.toLocaleString() }}{{ stat.suffix }}
          </div>

          <!-- Label Typography -->
          <div class="text-[11px] font-bold tracking-wider text-slate-400 uppercase mt-1">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <div class="section-header animate-fade-down">
          <h2 class="section-title">
            Our <span class="highlight">Services</span>
          </h2>
          <div class="title-underline"></div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border text-teal mb-3" style="color: #008e9b;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="text-muted">Loading financing schemes...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-4">
          <p class="text-danger mb-3">{{ error }}</p>
          <button @click="fetchServices" class="outline-btn btn-sm">
            <i class="fas fa-redo me-1"></i> Retry
          </button>
        </div>

        <!-- Services Grid -->
        <div v-else-if="services.length > 0" class="services-grid animate-fade-up">
          <div
            class="service-card"
            v-for="service in services"
            :key="service.id"
          >
            <div class="card-glass">
              <div class="icon-wrapper">
                <i :class="service.icon || 'fas fa-hand-holding-usd'"></i>
              </div>
              <div class="card-content">
                <h3>{{ service.title }}</h3>
                <p>{{ service.description || service.short_description || service.summary }}</p>
                <router-link :to="getSchemeLink(service)" class="read-more-btn">
                  Explore More <i class="fas fa-chevron-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-4">
          <p class="text-muted">No financing schemes available at the moment.</p>
        </div>
      </div>
    </section>

<!-- About Section -->
    <section class="about-section animate-fade-up">
      <div class="container glass-panel">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="about-image-wrapper">
              <img
                src="../../assets/team_image.png"
                alt="About ITMD"
                class="about-image"
              />
              <div class="accent-border"></div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="about-content">
              <h2 class="about-title">We are DFD</h2>
              <p class="about-text">
                Empowering rural communities and driving sustainable economic development through accessible financial solutions, supporting small enterprises, and fostering inclusive growth across Sri Lanka.
              </p>
              <router-link to="/About" class="primary-btn">
                Learn More About Us
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- PARTICIPATING FINANCIAL INSTITUTIONS (PFIs) SECTION               -->
    <!-- ================================================================= -->
    <section class="bg-slate-100/70 py-16 px-4 border-t border-b border-slate-200/80">
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-8">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#008795] text-xs font-semibold uppercase tracking-wider mb-2">
            <i class="fas fa-landmark text-xs"></i>
            <span>Banking Network</span>
          </span>
          <h2 class="section-title">
            Participating Financial Institutions (PFIs)
          </h2>
          <div class="title-underline"></div>
          <!-- <p class="text-slate-500 text-xs md:text-sm max-w-2xl mx-auto text-center mt-2 font-normal leading-relaxed">
            Concessionary credit lines and interest subsidy schemes are disbursed through accredited state, private commercial, and specialized licensed banks.
          </p> -->
        </div>

        <!-- Responsive Grid of Institution Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto mt-10">
          <div
            v-for="bank in partnerBanks"
            :key="bank.acronym"
            class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center h-28 hover:shadow-md hover:border-[#008795]/50 transition-all duration-200 group cursor-pointer"
          >
            <!-- Elegant Bank Icon Badge -->
            <div class="w-10 h-10 rounded-xl bg-teal-50 text-[#008795] flex items-center justify-center text-lg mb-2 group-hover:scale-105 transition-transform">
              <i :class="bank.icon"></i>
            </div>
            <!-- Institution Name / Acronym -->
            <span class="text-xs font-bold text-slate-700 group-hover:text-[#008795] transition-colors line-clamp-1">
              {{ bank.acronym }}
            </span>
          </div>
        </div>

        <!-- Footer Note & Call-to-Action -->
        <div class="text-center mt-8 pt-4">
          <p class="text-xs text-slate-500">
            Registered applicants can submit required documentation directly to any accredited branch.
          </p>
          <!-- <router-link
            to="/contact"
            class="text-xs font-semibold text-[#008795] hover:underline cursor-pointer mt-2 inline-block transition-colors"
          >
            View All Accredited Branches &amp; Focal Points &rarr;
          </router-link> -->
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import BaseUrl from "../../services/baseURL";
import Newsline from "./Newsline.vue";


import hero1 from "@/assets/hero-banners-2.jpg";
//import hero2 from "@/assets/hero-banners-1.jpg";
import hero3 from "@/assets/hero-banners-3.jpg";
import hero4 from "@/assets/hero-banners-4.jpg";
import hero5 from "@/assets/hero-banners-5.jpg";

// Hero slider state
const slides = ref([
  {
    image: hero1,
    tagline: "EMPOWERING PEOPLE",
    title: "To Strengthen the Economy true <span style='color:#00e5ff; font-family: serif; font-style: italic;'>Financial Assistance</span>",
    link: "/about"
  },
  
  {
    image: hero3,
    tagline: "EMPOWERING PEOPLE",
    title: "To Strengthen the Economy true <span style='color:#00e5ff; font-family: serif; font-style: italic;'>Financial Assistance</span>",
    link: "/about"
  },
  {
    image: hero4,
    tagline: "EMPOWERING PEOPLE",
    title: "To Strengthen the Economy true <span style='color:#00e5ff; font-family: serif; font-style: italic;'>Financial Assistance</span>",
    link: "/about"
  },
  {
    image: hero5,
    tagline: "EMPOWERING PEOPLE",
    title: "To Strengthen the Economy true <span style='color:#00e5ff; font-family: serif; font-style: italic;'>Financial Assistance</span>",
    link: "/about"
  }
]);

const currentSlide = ref(0);
let slideInterval = null;

const startSlider = () => {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 7500);
};

const stopSlider = () => {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
  stopSlider();
  startSlider();
};

// Services dynamic state & API fetch
const services = ref([]);
const isLoading = ref(true);
const error = ref(null);

const slugMap = {
  "Re-MSME Plus Loan Scheme": "/services/re-msme-plus",
  "NPA Borrower Relief Scheme": "/services/npl-relief",
  "Food Security Project": "/services/fslrp",
  "Working Capital Loan Scheme": "/services/working-capital",
  "SMELoC Credit Facility": "/services/smeloc-adb",
  "Agribusiness Value Chain": "/services/avc",
  "Smallholder Dairy Development": "/services/sdp",
  "Rural Credit Scheme": "/services/ncrcs",
  "Rooftop Solar Finance": "/services/solar-finance"
};

const getSchemeLink = (service) => {
  if (service.link) return service.link;
  if (service.id) return `/services/${service.id}`;
  if (service.title && slugMap[service.title]) return slugMap[service.title];
  return `/services/${service.id || ''}`;
};

const fetchServices = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const apiBase = BaseUrl.baseUrl || 'http://localhost:8096';
    const response = await axios.get(`${apiBase}/api/schemes/public`);
    services.value = Array.isArray(response.data) ? response.data : [];
  } catch (err) {
    console.error('Failed to fetch active schemes:', err);
    error.value = err.message || 'Failed to load loan schemes. Please try again.';
  } finally {
    isLoading.value = false;
  }
};



// Participating Partner Financial Institutions (PFIs)
const partnerBanks = [
  { name: "Bank of Ceylon", acronym: "BOC", icon: "fas fa-landmark" },
  { name: "People's Bank", acronym: "People's Bank", icon: "fas fa-university" },
  { name: "Commercial Bank of Ceylon", acronym: "Commercial Bank", icon: "fas fa-building" },
  { name: "Hatton National Bank", acronym: "HNB", icon: "fas fa-landmark" },
  { name: "Sampath Bank", acronym: "Sampath Bank", icon: "fas fa-university" },
  { name: "DFCC Bank", acronym: "DFCC Bank", icon: "fas fa-building" },
  { name: "National Development Bank", acronym: "NDB", icon: "fas fa-landmark" },
  { name: "Seylan Bank", acronym: "Seylan Bank", icon: "fas fa-university" },
  { name: "Regional Development Bank", acronym: "RDB", icon: "fas fa-landmark" },
  { name: "Sanasa Development Bank", acronym: "SDB bank", icon: "fas fa-university" },
  { name: "Citizens Development Business", acronym: "CDB", icon: "fas fa-building" },
  { name: "Nations Trust Bank", acronym: "NTB", icon: "fas fa-landmark" },
];


// Impact Metric Counters State & Animation
const statsSectionRef = ref(null);

const impactMetrics = ref([
  {
    id: "farmers",
    label: "Registered Farmers",
    icon: "fas fa-users",
    target: 25400,
    current: 1,
    prefix: "",
    suffix: "+"
  },
  {
    id: "loans",
    label: "Loans Granted / Taken",
    icon: "fas fa-hand-holding-usd",
    target: 18250,
    current: 1,
    prefix: "",
    suffix: "+"
  },
  {
    id: "banks",
    label: "Partner Banks",
    icon: "fas fa-landmark",
    target: 14,
    current: 1,
    prefix: "",
    suffix: "+"
  },
  {
    id: "schemes",
    label: "Active Loan Schemes",
    icon: "fas fa-file-invoice-dollar",
    target: 8,
    current: 1,
    prefix: "",
    suffix: "+"
  },
  {
    id: "funds",
    label: "Total Funds Disbursed",
    icon: "fas fa-coins",
    target: 4850,
    current: 1,
    prefix: "Rs. ",
    suffix: "M+"
  }
]);

let statsObserver = null;
let animationFrameId = null;
let hasAnimatedStats = false;

const startCountUpAnimation = () => {
  if (hasAnimatedStats) return;
  hasAnimatedStats = true;

  const duration = 50000;
  let startTime = null;

  const animate = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth ease-out cubic timing: 1 - (1 - progress)^3
    const easeOut = 1 - Math.pow(1 - progress, 3);

    impactMetrics.value.forEach((stat) => {
      stat.current = Math.floor(1 + (stat.target - 1) * easeOut);
    });

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      impactMetrics.value.forEach((stat) => {
        stat.current = stat.target;
      });
    }
  };

  animationFrameId = requestAnimationFrame(animate);
};

onMounted(() => {
  startSlider();
  fetchServices();

  if (statsSectionRef.value && typeof IntersectionObserver !== "undefined") {
    statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCountUpAnimation();
            if (statsObserver) {
              statsObserver.disconnect();
              statsObserver = null;
            }
          }
        });
      },
      {
        threshold: 0.15
      }
    );
    statsObserver.observe(statsSectionRef.value);
  } else {
    startCountUpAnimation();
  }
});

onBeforeUnmount(() => {
  stopSlider();
  if (statsObserver) {
    statsObserver.disconnect();
    statsObserver = null;
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600;1,700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

/* Original Color Palette Refined */
:root {
  --primary-blue: #008e9b;
  --accent-blue: #008e9b;
  --glass-bg: rgba(255, 255, 255, 0.8);
  --glass-border: rgba(255, 255, 255, 0.3);
  --text-dark: #0c0c0c;
  --text-muted: #666;
}

.home-container {
  overflow-x: hidden;
  background-color: #f8faff;
  font-family: "Open Sans", sans-serif;
  margin: 0;
  padding: 0;
}

/* Hero Section */
.hero-section {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  padding: 0;
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
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: linear-gradient(to right, rgba(27, 27, 27, 0.85) 0%, rgba(0, 0, 0, 0.4) 100%, transparent 75%); */
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
  background: linear-gradient(to right, rgba(27, 25, 25, 0.85) 0%, rgba(0, 0, 0, 0.40) 100%, transparent 75%);
  z-index: 2;
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
  font-size: 1.3rem;
  margin-bottom: 1rem;
  margin-top: 3rem;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
}

.hero-title {
  display: flex;
  flex-direction: column;
  font-family: 'Plus Jakarta Sans', sans-serif;
  margin-bottom: 2rem;
  text-align: left;
  line-height: 1.2;
}

.title-line-1 {
  font-size: 38px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #ffffff;
}

.title-line-2 {
  /* font-family: 'Playfair Display', Georgia, 'Times New Roman', serif; */
  /* font-style: italic !important; */
  font-weight: 800;
  font-size: 2.5rem;
  color: #00e5ff !important;
  text-shadow: 0 0 25px rgba(0, 229, 255, 0.45);
  margin-top: 2px;
}

.hero-btn {  display: inline-flex;
  align-items: center;
  padding: 12px 36px;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  border: 2px solid #00e5ff;
  color: #ffffff;
  margin-top: 2rem;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 229, 255, 0.4);}

.hero-btn i {
  margin-right: 10px;
  font-size: 1.2rem;
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 198, 255, 0.6);
  color: #ffffff;
}

/* Slider Dots */
.slider-dots {
  position: absolute;
  bottom: 60px; /* Above the news ticker */
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 12px;
  z-index: 20;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.dot.active {
  background-color: #008e9b;
  transform: scale(1.2);
}

.news-ticker-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 30;
}

/* Section Common Styles */
.container {
  max-width: 1250px;
  margin: 0 auto;
  padding: 60px 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #008e9b;
  letter-spacing: -0.5px;
}

.highlight {
  color: #008e9b;
}

.title-underline {
  width: 60px;
  height: 4px;
  background: #008e9b;
  margin: 12px auto 0;
  border-radius: 2px;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  margin-bottom: 40px;
}

.secondary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  max-width: 600px;
  margin: 0 auto 40px;
}

.service-card {
  display: flex;
}

.card-glass {
  background: #dbe1e3;
  border: 1px solid rgba(3, 43, 95, 0.08);
  border-radius: 20px;
  padding: 35px 25px;
  height: 100%;
  width: 100%;
  text-align: center;
  box-shadow: 0 15px 35px rgba(2, 16, 47, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-glass::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: #008e9b;
  opacity: 0.8;
}

.service-card:hover .card-glass {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(2, 16, 47, 0.1);
  border-color: #008e9b;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.icon-wrapper {
  width: 50px;
  height: 50px;
  margin: 0 auto 20px;
  background: #008795;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 135, 149, 0.2);
}

.icon-wrapper i {
  color: white;
  font-size: 25px;
  transition: all 0.3s ease;
}

.service-card:hover .icon-wrapper {
  transform: scale(1.05);
  background: #00a0b0;
}

.service-card:hover .icon-wrapper i {
  transform: scale(1.1);
}

.card-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #008e9b;
  margin-bottom: 12px;
}

.card-content p {
  color: #4f647d;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
}

.read-more-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #008e9b;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.read-more-btn:hover {
  gap: 12px;
  color: #008e9b;
}

/* About Section */
.about-section {
  background: #008e9b;
  padding: 80px 0;
  color: white;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  padding: 50px !important;
}

.about-image-wrapper {
  position: relative;
}

.about-image {
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.accent-border {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 80px;
  height: 80px;
  border-top: 4px solid #008e9b;
  border-left: 4px solid #008e9b;
  border-radius: 15px 0 0 0;
}

.sub-label {
  color: #008e9b;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 0.85rem;
  display: block;
  margin-bottom: 15px;
}

.about-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 25px;
  line-height: 1.2;
}

.gold-text {
  color: #008e9b;
}

.about-text {
  font-size: 1.05rem;
  line-height: 1.7;
  opacity: 0.9;
  margin-bottom: 30px;
}

.primary-btn {
  display: inline-block;
  padding: 14px 32px;
  background: #00606b;
  color: #fff;
  font-weight: 700;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 96, 107, 0.2);
}

.primary-btn:hover {
  background: #004d56;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0, 96, 107, 0.3);
}

/* Management Section */
.management-section {
  padding: 80px 0;
}

.management-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.management-card {
  text-align: center;
}

.profile-frame {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #fff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(3, 43, 95, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-frame:hover .profile-overlay {
  opacity: 1;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-links a {
  color: white;
  font-size: 1.1rem;
  transition: color 0.3s;
}

.social-links a:hover {
  color: #008e9b;
}

.member-info h5 {
  color: #008e9b;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.member-info p {
  color: #666;
  font-size: 0.85rem;
}

.cta-container {
  text-align: center;
  margin-top: 40px;
}

.outline-btn {
  display: inline-block;
  padding: 12px 30px;
  border: 2px solid #008e9b;
  color: #008e9b;
  font-weight: 700;
  border-radius: 50px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  background: transparent;
}

.outline-btn:hover {
  background: #008e9b;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 142, 155, 0.2);
}

/* Response Fixes */
@media (max-width: 1199px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .secondary-grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: none;
  }
}

@media (max-width: 991px) {
  .about-content {
    margin-top: 40px;
    text-align: center;
  }
  .glass-panel {
    padding: 30px !important;
  }
  .about-title {
    font-size: 2rem;
  }
  .management-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .title-line-1 {
    font-size: 24px;
    font-weight: 500;
  }
  .title-line-2 {
    font-size: 34px;
  
    font-style: italic;}
  .services-grid {
    grid-template-columns: 1fr;
  }
  .secondary-grid {
    grid-template-columns: 1fr;
  }
  .management-grid {
    grid-template-columns: 1fr;
  }
  .container {
    padding: 40px 20px;
  }
  .section-title {
    font-size: 1.8rem;
  }
  .home-container {
    padding-top: 50px;
  }
}

@media (max-width: 480px) {
  .about-title {
    font-size: 1.6rem;
  }
  .primary-btn {
    width: 100%;
    text-align: center;
  }
}

/* ========================================================================= */
/* PARTICIPATING FINANCIAL INSTITUTIONS (PFIs) UTILITIES                     */
/* ========================================================================= */

.bg-slate-100\/70 {
  background-color: rgba(241, 245, 249, 0.7) !important;
}

.py-16 {
  padding-top: 4rem !important;
  padding-bottom: 4rem !important;
}

.px-4 {
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}

.border-t {
  border-top-width: 1px !important;
  border-top-style: solid !important;
}

.border-b {
  border-bottom-width: 1px !important;
  border-bottom-style: solid !important;
}

.border-slate-200\/80 {
  border-color: rgba(226, 232, 240, 0.8) !important;
}

.max-w-6xl {
  max-width: 72rem !important;
}

.mx-auto {
  margin-left: auto !important;
  margin-right: auto !important;
}

.text-center {
  text-align: center !important;
}

.mb-8 {
  margin-bottom: 2rem !important;
}

.inline-flex {
  display: inline-flex !important;
}

.items-center {
  align-items: center !important;
}

.gap-2 {
  gap: 0.5rem !important;
}

.px-3 {
  padding-left: 0.75rem !important;
  padding-right: 0.75rem !important;
}

.py-1 {
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
}

.rounded-full {
  border-radius: 9999px !important;
}

.bg-teal-50 {
  background-color: #f0fdfa !important;
}

.border {
  border-width: 1px !important;
  border-style: solid !important;
}

.border-teal-200 {
  border-color: #99f6e4 !important;
}

.text-\[\#008795\] {
  color: #008795 !important;
}

.text-xs {
  font-size: 0.75rem !important;
  line-height: 1rem !important;
}

.font-semibold {
  font-weight: 600 !important;
}

.uppercase {
  text-transform: uppercase !important;
}

.tracking-wider {
  letter-spacing: 0.05em !important;
}

.mb-2 {
  margin-bottom: 0.5rem !important;
}

.text-2xl {
  font-size: 1.5rem !important;
  line-height: 2rem !important;
}

@media (min-width: 768px) {
  .md\:text-3xl {
    font-size: 1.875rem !important;
    line-height: 2.25rem !important;
  }
  .md\:text-sm {
    font-size: 0.875rem !important;
    line-height: 1.25rem !important;
  }
}

.font-extrabold {
  font-weight: 800 !important;
}

.text-slate-800 {
  color: #1e293b !important;
}

.tracking-tight {
  letter-spacing: -0.025em !important;
}

.text-slate-500 {
  color: #64748b !important;
}

.max-w-2xl {
  max-width: 42rem !important;
}

.mt-2 {
  margin-top: 0.5rem !important;
}

.font-normal {
  font-weight: 400 !important;
}

.leading-relaxed {
  line-height: 1.625 !important;
}

.grid {
  display: grid !important;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
}

@media (min-width: 640px) {
  .sm\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
}

@media (min-width: 768px) {
  .md\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
  }
}

.gap-4 {
  gap: 1rem !important;
}

.mt-10 {
  margin-top: 2.5rem !important;
}

.bg-white {
  background-color: #ffffff !important;
}

.bg-ash {
  background-color: #dbe1e3 !important;
}

.rounded-2xl {
  border-radius: 1rem !important;
}

.p-5 {
  padding: 1.25rem !important;
}

.shadow-xs {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
}

.flex {
  display: flex !important;
}

.flex-col {
  flex-direction: column !important;
}

.justify-center {
  justify-content: center !important;
}

.h-28 {
  height: 7rem !important;
}

.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1) !important;
}

.hover\:border-\[\#008795\]\/50:hover {
  border-color: rgba(0, 135, 149, 0.5) !important;
}

.transition-all {
  transition-property: all !important;
}

.duration-200 {
  transition-duration: 200ms !important;
}

.cursor-pointer {
  cursor: pointer !important;
}

.w-10 {
  width: 2.5rem !important;
}

.h-10 {
  height: 2.5rem !important;
}

.rounded-xl {
  border-radius: 0.75rem !important;
}

.text-lg {
  font-size: 1.125rem !important;
  line-height: 1.75rem !important;
}

.group:hover .group-hover\:scale-105 {
  transform: scale(1.05) !important;
}

.transition-transform {
  transition-property: transform !important;
}

.text-slate-700 {
  color: #334155 !important;
}

.font-bold {
  font-weight: 700 !important;
}

.group:hover .group-hover\:text-\[\#008795\] {
  color: #008795 !important;
}

.transition-colors {
  transition-property: color, background-color, border-color !important;
}

.line-clamp-1 {
  overflow: hidden !important;
  display: -webkit-box !important;
  -webkit-box-orient: vertical !important;
  -webkit-line-clamp: 1 !important;
}

.mt-8 {
  margin-top: 2rem !important;
}

.pt-4 {
  padding-top: 1rem !important;
}

.hover\:underline:hover {
  text-decoration: underline !important;
}

.inline-block {
  display: inline-block !important;
}


/* ========================================================================= */
/* IMPACT METRIC COUNTERS BAR UTILITIES                                      */
/* ========================================================================= */

.py-8 {
  padding-top: 2rem !important;
  padding-bottom: 2rem !important;
}

.rounded-3xl {
  border-radius: 1.5rem !important;
}

.p-8 {
  padding: 2rem !important;
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
}

.gap-6 {
  gap: 1.5rem !important;
}

.w-12 {
  width: 3rem !important;
}

.h-12 {
  height: 3rem !important;
}

.shadow-2xs {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04) !important;
}

.text-\[11px\] {
  font-size: 11px !important;
  line-height: 1rem !important;
}

.text-slate-400 {
  color: #94a3b8 !important;
}

.mt-1 {
  margin-top: 0.25rem !important;
}

.col-span-2 {
  grid-column: span 2 / span 2 !important;
}

.divide-y > :not([hidden]) ~ :not([hidden]) {
  border-top-width: 1px !important;
  border-top-style: solid !important;
}

.divide-slate-100 > :not([hidden]) ~ :not([hidden]) {
  border-color: #f1f5f9 !important;
}

@media (min-width: 768px) {
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
  .md\:col-span-1 {
    grid-column: span 1 / span 1 !important;
  }
  .md\:pt-0 {
    padding-top: 0 !important;
  }
  .md\:divide-y-0 > :not([hidden]) ~ :not([hidden]) {
    border-top-width: 0 !important;
  }
  .md\:divide-x > :not([hidden]) ~ :not([hidden]) {
    border-left-width: 1px !important;
    border-left-style: solid !important;
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
  }
  .lg\:text-3xl {
    font-size: 1.875rem !important;
    line-height: 2.25rem !important;
  }
}

</style>
