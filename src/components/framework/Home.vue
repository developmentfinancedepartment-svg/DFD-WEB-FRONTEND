<template>
  <div class="home-container">
    <!-- Hero / Slider Section -->
    <div class="hero-section">
      <div class="hero-image-box">
        <img
          src="../../assets/hero_banner.jpg"
          alt="your Banner"
          class="hero-banner"
        />
        <!-- <img src="../../assets/gif/WhatsAppVideo2026-04-22at12.42.39PM-ezgif.com-video-to-gif-converter (1).gif" alt="Treasury Banner" class="hero-banner" /> -->
        <div class="hero-overlay"></div>
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
                <img :src="service.image" :alt="service.title" />
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

        <div class="services-grid secondary-grid animate-fade-up">
          <div
            class="service-card"
            v-for="(service, index) in secondaryServices"
            :key="index"
          >
            <div class="card-glass">
              <div class="icon-wrapper">
                <img :src="service.image" :alt="service.title" />
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
              <h2 class="about-title">
                your department <span class="gold-text"></span>
              </h2>
              <p class="about-text">Your Department Responsibilities</p>
              <router-link to="/About" class="primary-btn"
                >Learn More About Us</router-link
              >
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
import swImg from "../../assets/service.png";
import hwImg from "../../assets/service.png";
import nwImg from "../../assets/service.png";
import knowledgeImg from "../../assets/service.png";

import adg1Img from "../../assets/profile.png";
import adg2Img from "../../assets/profile.png";
import eventImg from "../../assets/service.png";

export default {
  name: "Home",
  data() {
    return {
      services: [
        {
          title: "Your Services",
          description:
            "services description",
          image: swImg,
          link: "/development",
        },
        {
          title: "Your Services",
          description:
            "services description",
          image: hwImg,
          link: "/hardware",
        },
        {
          title: "Your Services",
          description:
            "services description",
          image: nwImg,
          link: "/network",
        },
      ],
      secondaryServices: [
        {
          title: "Your Services",
          description:
            "services description",
          image: knowledgeImg,
          link: "/KnowledgeSharing",
        },
        {
          title: "Event Calendar",
          description:
            "Stay updated with our upcoming events, workshops, and internal activities. View our comprehensive monthly calendar to plan your schedules.",
          image: eventImg,
          link: "/Calendar",
        },
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
};
</script>

<style scoped>
/* Original Color Palette Refined */
:root {
  --primary-blue: #032b5f;
  --accent-blue: #00bbf0;
  --glass-bg: rgba(255, 255, 255, 0.8);
  --glass-border: rgba(255, 255, 255, 0.3);
  --text-dark: #0c0c0c;
  --text-muted: #666;
}

.home-container {
  overflow-x: hidden;
  background-color: #f8faff;
  font-family: "Open Sans", sans-serif;
  padding-top: 105px;
}

/* Hero Section */
.hero-section {
  position: relative;
  width: 100%;
}

.hero-image-box {
  position: relative;
  width: 100%;
  line-height: 0;
  overflow: hidden;
  background-color: #032b5f;
}

.hero-banner {
  width: 100%;
  height: auto;
  display: block;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(3, 43, 95, 0.4),
    rgba(3, 43, 95, 0.2)
  );
  pointer-events: none;
}

.news-ticker-container {
  position: relative;
  width: 100%;
  z-index: 10;
  margin-top: -5px; /* Slight overlap to ensure no white line gap */
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
  color: #032b5f;
  letter-spacing: -0.5px;
}

.highlight {
  color: #00bbf0;
}

.title-underline {
  width: 60px;
  height: 4px;
  background: #00bbf0;
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
  background: #00bbf0;
  opacity: 0.8;
}

.service-card:hover .card-glass {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(2, 16, 47, 0.1);
  border-color: #00bbf0;
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
  background: #f0f7ff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.service-card:hover .icon-wrapper {
  background: #00bbf0;
}

.icon-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.service-card:hover .icon-wrapper img {
  transform: scale(1.1);
}

.card-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #032b5f;
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
  color: #00bbf0;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.read-more-btn:hover {
  gap: 12px;
  color: #032b5f;
}

/* About Section */
.about-section {
  background: #032b5f;
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
  border-top: 4px solid #00bbf0;
  border-left: 4px solid #00bbf0;
  border-radius: 15px 0 0 0;
}

.sub-label {
  color: #00bbf0;
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
  margin-bottom: 25px;
  line-height: 1.2;
}

.gold-text {
  color: #00bbf0;
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
  background: #00bbf0;
  color: #fff;
  font-weight: 700;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 187, 240, 0.2);
}

.primary-btn:hover {
  background: white;
  color: #032b5f;
  transform: translateY(-2px);
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
  color: #00bbf0;
}

.member-info h5 {
  color: #032b5f;
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
  border: 2px solid #00bbf0;
  color: #00bbf0;
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
  background: #00bbf0;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 187, 240, 0.2);
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
