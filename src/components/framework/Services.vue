<template>
  <div class="services-page">
    <!-- Hero Header -->
    <section class="hero-header">
      <div class="container text-center">
        <h1 class="hero-title">Development Financing Schemes</h1>
        <p class="hero-subtitle">Empowering growth through specialized ministry credit lines and concessionary financial support.</p>
      </div>
    </section>

    <!-- Filter Header -->
    <section class="filter-section py-4 bg-light shadow-sm mb-5">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-12 text-center">
            <div class="d-flex flex-wrap justify-content-center gap-2">
              <span class="d-flex align-items-center me-3 text-muted fw-bold"><i class="fas fa-filter me-2"></i> Category:</span>
              <button 
                class="btn rounded-pill filter-pill" 
                :class="{ 'btn-teal text-white': selectedCategory === 'All Schemes', 'btn-outline-teal': selectedCategory !== 'All Schemes' }"
                @click="selectedCategory = 'All Schemes'"
              >All Schemes</button>
              <button 
                class="btn rounded-pill filter-pill" 
                :class="{ 'btn-teal text-white': selectedCategory === 'MSME Revitalization', 'btn-outline-teal': selectedCategory !== 'MSME Revitalization' }"
                @click="selectedCategory = 'MSME Revitalization'"
              >MSME Revitalization</button>
              <button 
                class="btn rounded-pill filter-pill" 
                :class="{ 'btn-teal text-white': selectedCategory === 'Agriculture & Livestock', 'btn-outline-teal': selectedCategory !== 'Agriculture & Livestock' }"
                @click="selectedCategory = 'Agriculture & Livestock'"
              >Agriculture & Livestock</button>
              <button 
                class="btn rounded-pill filter-pill" 
                :class="{ 'btn-teal text-white': selectedCategory === 'Green Energy', 'btn-outline-teal': selectedCategory !== 'Green Energy' }"
                @click="selectedCategory = 'Green Energy'"
              >Green Energy</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <!-- Loading State -->
        <div class="text-center py-5" v-if="loading">
          <div class="spinner-border text-teal mb-3" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h5 class="text-muted">Loading financing schemes...</h5>
        </div>

        <!-- Services Grid -->
        <div class="services-grid animate-fade-up" v-else-if="filteredServices.length > 0">
          <div class="service-card" v-for="service in filteredServices" :key="service.id || service.title">
            <div class="card-glass d-flex flex-column h-100">
              <div class="service-icon-box mx-auto mb-3">
                <i :class="service.icon || 'fas fa-hand-holding-usd'"></i>
              </div>
              <div class="card-content d-flex flex-column flex-grow-1">
                <h3 class="text-center">{{ service.title }}</h3>
                
                <!-- Highlights Pills -->
                <div class="d-flex flex-wrap justify-content-center gap-2 mb-3">
                  <span class="badge bg-teal-light text-teal rounded-pill py-1 px-2">
                    <i class="fas fa-money-bill-wave me-1"></i> {{ service.maxAmount }}
                  </span>
                  <span class="badge bg-teal-light text-teal rounded-pill py-1 px-2">
                    <i class="fas fa-percent me-1"></i> {{ service.interestRate }}
                  </span>
                </div>
                
                <p class="text-center flex-grow-1">{{ service.description }}</p>
                
                <router-link :to="getSchemeLink(service)" class="btn btn-outline-teal rounded-pill mt-auto fw-bold w-100">
                  View Scheme Details &rarr;
                </router-link>
              </div>
            </div>
          </div>
        </div>
        
        <!-- No Results -->
        <div class="text-center py-5" v-else>
          <div class="mb-4">
            <i class="fas fa-folder-open fa-3x text-muted opacity-50"></i>
          </div>
          <h4 class="text-muted">No schemes found for this category.</h4>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import BaseUrl from '../../services/baseURL';

const selectedCategory = ref('All Schemes');
const services = ref([]);
const loading = ref(false);

const getSchemeLink = (service) => {
  return `/services/${service.id}`;
};

const fetchActiveSchemes = async () => {
  loading.value = true;
  try {
    const apiBase = BaseUrl.baseUrl || 'http://localhost:8096';
    const response = await axios.get(`${apiBase}/api/schemes/public`);
    services.value = Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Failed to fetch active schemes:', error);
  } finally {
    loading.value = false;
  }
};

const filteredServices = computed(() => {
  if (selectedCategory.value === 'All Schemes') return services.value;
  return services.value.filter(s => s.category === selectedCategory.value);
});

onMounted(fetchActiveSchemes);
</script>

<style scoped>
.services-page {
  font-family: 'Open Sans', sans-serif;
  color: #102741;
  background: #f8f9fa;
  min-height: 100vh;
  padding-top: 100px;
}

.hero-header {
  background: linear-gradient(135deg, #004d5a 0%, #008795 100%);
  padding: 4rem 0;
  border-bottom: 5px solid #00e5ff;
}

.hero-title {
  color: white;
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 15px;
  letter-spacing: 0.5px;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.text-teal {
  color: #007c91;
}

.bg-teal-light {
  background-color: rgba(0, 124, 145, 0.1);
}

.btn-teal {
  background-color: #007c91;
  border-color: #007c91;
}

.btn-teal:hover {
  background-color: #006071;
  border-color: #006071;
}

.btn-outline-teal {
  color: #007c91;
  border-color: #007c91;
  transition: all 0.3s ease;
}

.btn-outline-teal:hover {
  background-color: #007c91;
  color: white;
}

.filter-pill {
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  transition: all 0.3s ease;
}

/* Services Section */
.services-section {
  padding-bottom: 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.service-card {
  perspective: 1000px;
}

.card-glass {
  background: #ffffff;
  border: 1px solid rgba(0, 124, 145, 0.1);
  border-radius: 16px;
  padding: 30px 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover .card-glass {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 124, 145, 0.12);
  border-color: rgba(0, 124, 145, 0.3);
}

.service-icon-box {
  width: 60px;
  height: 60px;
  background: #008795;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(0, 135, 149, 0.2);
  transition: all 0.3s ease;
}

.service-icon-box i {
  color: #ffffff;
  font-size: 24px;
  transition: transform 0.3s ease;
}

.service-card:hover .service-icon-box {
  transform: translateY(-5px);
  background: #00a0b0;
}

.service-card:hover .service-icon-box i {
  transform: scale(1.15);
}

.card-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0c2a38;
  margin-bottom: 12px;
  line-height: 1.3;
}

.card-content p {
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 20px;
}

.badge {
  font-size: 0.8rem;
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 1199px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 991px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .services-page {
    padding-top: 80px;
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 576px) {
  .services-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .card-glass {
    padding: 25px 20px;
  }
}
</style>
