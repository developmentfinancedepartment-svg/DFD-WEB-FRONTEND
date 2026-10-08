<template>
  <div class="services-page">
    <section class="services-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header animate-fade-down">
          <h2 class="section-title">Our <span class="highlight">Services</span></h2>
          <div class="title-underline"></div>
        </div>

        <!-- Services Grid -->
        <div class="services-grid animate-fade-up">
          <div class="service-card" v-for="(service, index) in services" :key="index">
            <div class="card-glass">
              <div class="service-icon-box">
                <i :class="service.icon"></i>
              </div>
              <div class="card-content">
                <h3>{{ service.title }}</h3>
                <p>{{ service.description }}</p>
                <router-link :to="service.link" class="read-more-btn">
                  EXPLORE MORE <i class="fas fa-chevron-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const services = ref([
  {
    title: "Re-MSME Plus Loan Scheme",
    description: "Financial assistance and concessionary loans up to Rs. 25M for Micro, Small, and Medium Enterprises.",
    icon: "fas fa-store",
    link: "/services/re-msme-plus"
  },
  {
    title: "NPA Borrower Relief Scheme (NPL)",
    description: "Concessionary support up to Rs. 15M to assist and revive non-performing asset borrowers.",
    icon: "fas fa-life-ring",
    link: "/services/npl-relief"
  },
  {
    title: "Food Security Project (FSLRP)",
    description: "Credit support up to Rs. 5M focused on agricultural food security and livelihood recovery.",
    icon: "fas fa-seedling",
    link: "/services/fslrp"
  },
  {
    title: "Working Capital Loan Scheme",
    description: "Short-term and operational liquidity loans up to Rs. 1.5M for ongoing business needs.",
    icon: "fas fa-coins",
    link: "/services/working-capital"
  },
  {
    title: "SMELoC Credit Facility (ADB)",
    description: "ADB-funded revolving credit line up to Rs. 50M empowering competitive SME enterprises.",
    icon: "fas fa-chart-line",
    link: "/services/smeloc-adb"
  },
  {
    title: "Agribusiness Value Chain (AVC)",
    description: "Financing up to Rs. 75M to integrate modern technologies and supply chains into agriculture.",
    icon: "fas fa-tractor",
    link: "/services/avc"
  },
  {
    title: "Smallholder Dairy Development (SDP)",
    description: "Targeted capital loan scheme up to Rs. 75M for dairy farming operations.",
    icon: "fas fa-cow",
    link: "/services/sdp"
  },
  {
    title: "Rural Credit Scheme (NCRCS - Agriculture)",
    description: "Comprehensive cultivation and agricultural loans up to Rs. 3M for rural farmers.",
    icon: "fas fa-hand-holding-usd",
    link: "/services/ncrcs"
  }
]);
</script>

<style scoped>
.services-page {
  font-family: 'Open Sans', sans-serif;
  color: #102741;
  background: #f7fbff;
  overflow-x: hidden;
  padding-top: 130px;
}

/* Services Section */
.services-section {
  padding: 80px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Section Header */
.section-header {
  text-align: center;
  margin: 10px 0 24px 0;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 16px;
  font-weight: 700;
  color: #008E9B;
}

.highlight {
  color: #008E9B;
}

.title-underline {
  width: 90px;
  height: 4px;
  background: linear-gradient(90deg, #008E9B, #00B4C5);
  margin: 0 auto;
  border-radius: 999px;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 30px;
}

.secondary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 30px;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 30px;
}

.service-card {
  perspective: 1000px;
}

.card-glass {
  background: linear-gradient(135deg, #fff 0%, #f7fbff 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 2px solid rgba(3, 43, 95, 0.08);
  border-radius: 20px;
  padding: 40px 30px;
  height: 100%;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 60px rgba(2, 16, 47, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
  height: 5px;
  background: linear-gradient(90deg, #008E9B, #00B4C5);
}

.service-card:hover .card-glass {
  transform: translateY(-10px);
  box-shadow: 0 35px 80px rgba(2, 16, 47, 0.12);
  background: linear-gradient(135deg, #fff 0%, #f0f8ff 100%);
  border-color: #008E9B;
}

.service-icon-box {
  width: 54px;
  height: 54px;
  margin: 0 auto 25px;
  background: #008795;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(0, 135, 149, 0.2);
  transition: all 0.3s ease;
}

.service-icon-box i {
  color: #ffffff;
  font-size: 22px;
  transition: transform 0.3s ease;
}

.service-card:hover .service-icon-box {
  transform: translateY(-5px);
  background: #00a0b0;
}

.service-card:hover .service-icon-box i {
  transform: scale(1.15);
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-content h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #008E9B;
  margin-bottom: 15px;
  line-height: 1.4;
}

.card-content p {
  color: #4f647d;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 25px;
  flex-grow: 1;
}

.read-more-btn {
  display: inline-flex;
  align-items: center;
  align-self: center;
  gap: 8px;
  color: #008E9B;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.85rem;
  transition: gap 0.3s ease;
  text-decoration: none;
  margin-top: auto;
}

.read-more-btn:hover {
  gap: 12px;
  color: #00B4C5;
}

/* Responsive Design */
@media (max-width: 991px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .secondary-grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: none;
  }
}

@media (max-width: 768px) {
  .services-page {
    padding-top: 50px;
  }

  .services-section {
    padding: 50px 20px;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 15px;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 25px;
    margin-bottom: 25px;
  }

  .secondary-grid {
    grid-template-columns: 1fr;
  }

  .card-glass {
    padding: 30px 25px;
  }

  .card-content h3 {
    font-size: 1.2rem;
  }

  .card-content p {
    font-size: 0.9rem;
    min-height: auto;
  }
}

@media (max-width: 480px) {
  .services-section {
    padding: 40px 15px;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .secondary-grid {
    max-width: 100%;
  }

  .card-glass {
    padding: 25px 20px;
  }

  .card-content h3 {
    font-size: 1.1rem;
  }

  .card-content p {
    font-size: 0.85rem;
    margin-bottom: 20px;
  }

  .read-more-btn {
    font-size: 0.8rem;
  }
}
</style>
