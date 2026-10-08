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
            <div class="hero-overlay">
              <p class="hero-tagline">{{ slides[currentSlide].tagline }}</p>
              <div class="hero-title">
                <div class="title-line-1">From Rural Dreams to</div>
                <div class="title-line-2">Financial Support</div>
                <div class="title-line-3">for a Stronger Sri Lanka.</div>
              </div>
              <router-link :to="slides[currentSlide].link" class="hero-btn">
                <i class="fas fa-file-invoice-dollar"></i> Read More &rarr;
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

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <div class="section-header animate-fade-down">
          <h2 class="section-title">
            Our <span class="highlight">Services</span>
          </h2>
          <div class="title-underline"></div>
        </div>

        <div class="services-grid animate-fade-up">
          <div
            class="service-card"
            v-for="(service, index) in services"
            :key="index"
          >
            <div class="card-glass">
              <div class="icon-wrapper">
                <i :class="service.icon"></i>
              </div>
              <div class="card-content">
                <h3>{{ service.title }}</h3>
                <p>{{ service.description }}</p>
                <router-link :to="service.link" class="read-more-btn">
                  Explore More <i class="fas fa-chevron-right"></i>
                </router-link>
              </div>
            </div>
          </div>
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

    <!-- Management Section -->
    <section class="management-section">
      <div class="container">
        <div class="section-header animate-fade-down">
          <h2 class="section-title">
            Top <span class="highlight">Management</span>
          </h2>
          <div class="title-underline"></div>
        </div>

        <div class="management-grid animate-fade-up">
          <div
            class="management-card"
            v-for="(member, index) in management"
            :key="index"
          >
            <div class="profile-frame">
              <img :src="member.image" :alt="member.name" class="profile-img" />
              <div class="profile-overlay">
                <div class="social-links" v-if="member.socials">
                  <a
                    v-for="social in member.socials"
                    :key="social.icon"
                    :href="social.link"
                    target="_blank"
                  >
                    <i :class="social.icon"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="member-info">
              <h5>{{ member.name }}</h5>
              <p>{{ member.role }}</p>
            </div>
          </div>
        </div>

        <div class="cta-container">
          <router-link to="/Teldirec#contactteam" class="outline-btn">
            Meet Our Team <i class="fas fa-chevron-right ms-2"></i>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import adg1Img from "../../assets/profile.png";
import adg2Img from "../../assets/profile.png";

import hero1 from "@/assets/hero-banner.jpg";
import hero2 from "@/assets/hero-banner-2.jpg";

export default {
  name: "Home",
  data() {
    return {
      slides: [
        {
          image: hero1,
          tagline: "🌱 EMPOWERING PEOPLE • GROWING COMMUNITIES",
          title: "From Rural Dreams to <span style='color:#00e5ff'>Financial Support</span> for a Stronger Sri Lanka",
          link: "/about"
        },
        {
          image: hero2,
          tagline: "🌱 EMPOWERING PEOPLE • GROWING COMMUNITIES",
          title: "From Rural Dreams to <span style='color:#00e5ff'>Financial Support</span> for a Stronger Sri Lanka",
          link: "/about"
        }
      ],
      currentSlide: 0,
      slideInterval: null,
      services: [
        {
          title: "Re-MSME Plus Loan Scheme",
          description: "Financial assistance and concessionary loans up to Rs. 25M for Micro, Small, and Medium Enterprises.",
          icon: "fas fa-store",
          link: "/services/re-msme-plus",
        },
        {
          title: "NPA Borrower Relief Scheme (NPL)",
          description: "Concessionary support up to Rs. 15M to assist and revive non-performing asset borrowers.",
          icon: "fas fa-life-ring",
          link: "/services/npl-relief",
        },
        {
          title: "Food Security Project (FSLRP)",
          description: "Credit support up to Rs. 5M focused on agricultural food security and livelihood recovery.",
          icon: "fas fa-seedling",
          link: "/services/fslrp",
        },
        {
          title: "Working Capital Loan Scheme",
          description: "Short-term and operational liquidity loans up to Rs. 1.5M for ongoing business needs.",
          icon: "fas fa-coins",
          link: "/services/working-capital",
        },
        {
          title: "SMELoC Credit Facility (ADB)",
          description: "ADB-funded revolving credit line up to Rs. 50M empowering competitive SME enterprises.",
          icon: "fas fa-chart-line",
          link: "/services/smeloc-adb",
        },
        {
          title: "Agribusiness Value Chain (AVC)",
          description: "Financing up to Rs. 75M to integrate modern technologies and supply chains into agriculture.",
          icon: "fas fa-tractor",
          link: "/services/avc",
        },
        {
          title: "Smallholder Dairy Development (SDP)",
          description: "Targeted capital loan scheme up to Rs. 75M for dairy farming operations.",
          icon: "fas fa-cow",
          link: "/services/sdp",
        },
        {
          title: "Rural Credit Scheme (NCRCS - Agriculture)",
          description: "Comprehensive cultivation and agricultural loans up to Rs. 3M for rural farmers.",
          icon: "fas fa-hand-holding-usd",
          link: "/services/ncrcs",
        }
      ],
      management: [
        {
          name: "Mr. Joen Doe",
          role: "His Role",
          image: adg1Img,
        },
        {
          name: "Mr. Jane Doe",
          role: "Her Role",
          image: adg2Img,
          socials: [
            {
              icon: "fab fa-facebook-f",
              link: "https://www.facebook.com",
            },
            {
              icon: "fab fa-linkedin-in",
              link: "https://www.linkedin.com",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.startSlider();
  },
  beforeUnmount() {
    this.stopSlider();
  },
  beforeDestroy() {
    this.stopSlider(); // For Vue 2 compatibility
  },
  methods: {
    startSlider() {
      this.slideInterval = setInterval(() => {
        this.nextSlide();
      }, 7500);
    },
    stopSlider() {
      if (this.slideInterval) {
        clearInterval(this.slideInterval);
        this.slideInterval = null;
      }
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    goToSlide(index) {
      this.currentSlide = index;
      this.stopSlider();
      this.startSlider();
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&display=swap');

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
  width: 50%;
  height: 100%;
  background: linear-gradient(to right, rgba(2, 36, 45, 0.78) 0%, rgba(2, 36, 45, 0.5) 40%, transparent 100%);
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
  color: #20c997;
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 1rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
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
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #ffffff;
  /* text-shadow: 2px 2px 4px rgba(238, 236, 236, 0.8); */
}

.title-line-2 {
  font-size: 46px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #00e5ff;
  /* text-shadow: 2px 2px 4px rgba(0,0,0,0.8); */
}

.title-line-3 {
  font-size: 27px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #ffffff;
  /* text-shadow: 2px 2px 4px rgba(0,0,0,0.8); */
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 36px;
  /* background: linear-gradient(135deg, #00c6ff, #0072ff); */
  background: transparent;
  border: 2px solid #00c6ff;
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 198, 255, 0.4);
}

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
  background: white;
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
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  background: #008795;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 135, 149, 0.2);
}

.icon-wrapper i {
  color: white;
  font-size: 30px;
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
</style>
