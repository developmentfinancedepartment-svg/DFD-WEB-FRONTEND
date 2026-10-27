<template>
  <div class="publications-page">
    <!-- Hero Header -->
    <section class="hero-header">
      <div class="container text-center">
        <h1 class="hero-title">Action Plans & Publications</h1>
        <p class="hero-subtitle">Official strategic frameworks, institutional reports, and annual action plans of the Department of Development Finance.</p>
      </div>
    </section>

    <!-- Filter Header -->
    <section class="filter-section py-4 bg-light shadow-sm">
      <div class="container">
        <div class="row align-items-center">
          <!-- Search Bar -->
          <div class="col-lg-5 mb-3 mb-lg-0">
            <!-- <div class="search-box position-relative">
              <i class="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
              <input 
                type="text" 
                class="form-control form-control-lg ps-5 rounded-pill" 
                placeholder="Search publications by keyword..." 
                v-model="searchQuery"
              >
            </div> -->
          </div>
          
          <!-- Year Filters (Dynamically generated) -->
          <div class="col-lg-7 text-lg-end">
            <div class="d-flex flex-wrap justify-content-lg-end gap-2">
              <span class="d-flex align-items-center me-2 text-muted fw-bold">Filter Year:</span>
              <button 
                v-for="year in availableYears"
                :key="year"
                class="btn rounded-pill filter-pill" 
                :class="{ 'btn-teal text-white': selectedYear === year, 'btn-outline-teal': selectedYear !== year }"
                @click="selectedYear = year"
              >{{ year }}</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Document Grid -->
    <section class="documents-section py-5">
      <div class="container">
        <!-- Loading State -->
        <div class="text-center py-5" v-if="isLoading">
          <div class="spinner-border text-teal mb-3" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h5 class="text-muted">Loading publications & action plans...</h5>
        </div>

        <!-- Error State -->
        <div class="text-center py-5" v-else-if="error">
          <div class="mb-3">
            <i class="fas fa-exclamation-triangle fa-3x text-warning"></i>
          </div>
          <h4 class="text-muted">{{ error }}</h4>
          <button class="btn btn-teal text-white mt-3 px-4" @click="fetchPublications">Try Again</button>
        </div>

        <!-- Publications Grid -->
        <div class="row g-4" v-else-if="filteredPublications.length > 0">
          <div 
            class="col-md-6 col-lg-4" 
            v-for="doc in filteredPublications" 
            :key="doc.id"
          >
            <div class="card h-100 doc-card border-0 shadow-sm">
              <div class="card-body p-4 d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <div class="pdf-badge bg-light-red text-danger rounded p-2">
                    <i class="fas fa-file-pdf fa-2x"></i>
                  </div>
                  <span class="badge bg-teal-light text-teal rounded-pill px-3 py-2">{{ doc.year }}</span>
                </div>
                
                <h5 class="card-title fw-bold text-dark-teal mb-3">{{ doc.title }}</h5>
                <p class="card-text text-muted mb-4 flex-grow-1">{{ doc.description }}</p>
                
                <div class="d-flex justify-content-between align-items-center text-muted small mb-4">
                  <span><i class="far fa-calendar-alt me-1"></i> {{ doc.releaseDate }}</span>
                  <span><i class="fas fa-hdd me-1"></i> {{ doc.fileSize || doc.size || 'PDF' }}</span>
                </div>
                
                <div class="d-flex gap-2 mt-auto">
                  <a :href="getPdfUrl(doc)" target="_blank" rel="noopener noreferrer" class="btn btn-outline-teal w-50 fw-bold">
                    <i class="fas fa-eye me-1"></i> View Online
                  </a>
                  <a :href="getDownloadUrl(doc)" :download="doc.fileName || (doc.title + '.pdf')" class="btn btn-teal text-white w-50 fw-bold">
                    <i class="fas fa-download me-1"></i> Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- No Results -->
        <div class="text-center py-5" v-else>
          <div class="mb-4">
            <i class="fas fa-search fa-3x text-muted opacity-50"></i>
          </div>
          <h4 class="text-muted">No publications found matching your criteria.</h4>
          <p class="text-muted">Try adjusting your search keywords or year filter.</p>
          <button class="btn btn-teal text-white mt-3 px-4" @click="resetFilters">Reset Filters</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import BaseUrl from '@/services/baseURL';

const publications = ref([]);
const isLoading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const selectedYear = ref('All');

const fetchPublications = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const apiBase = BaseUrl.baseUrl || 'http://localhost:8096';
    const response = await axios.get(`${apiBase}/api/v1/publications`);
    publications.value = Array.isArray(response.data) ? response.data : [];
  } catch (err) {
    console.error('Failed to fetch publications:', err);
    error.value = 'Failed to load publications. Please check your network connection or try again later.';
  } finally {
    isLoading.value = false;
  }
};

// Dynamically generate filter year pills from returned dataset
const availableYears = computed(() => {
  const uniqueYears = Array.from(
    new Set(
      publications.value
        .map(p => String(p.year || '').trim())
        .filter(y => y.length > 0)
    )
  ).sort((a, b) => b.localeCompare(a)); // Sort in descending order (e.g. 2026, 2025, 2024)

  return ['All', ...uniqueYears];
});

const filteredPublications = computed(() => {
  return publications.value.filter(doc => {
    const matchesYear = selectedYear.value === 'All' || String(doc.year) === selectedYear.value;
    const query = searchQuery.value.trim().toLowerCase();
    const matchesSearch = !query || 
      (doc.title && doc.title.toLowerCase().includes(query)) || 
      (doc.description && doc.description.toLowerCase().includes(query));
    
    return matchesYear && matchesSearch;
  });
});

const getPdfUrl = (doc) => {
  const url = doc.url || doc.fileUrl;
  if (!url || url === '#') return '#';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const apiBase = BaseUrl.baseUrl || 'http://localhost:8096';
  return `${apiBase}${url.startsWith('/') ? '' : '/'}${url}`;
};

const getDownloadUrl = (doc) => {
  const baseUrl = getPdfUrl(doc);
  if (baseUrl === '#') return '#';
  return baseUrl.includes('?') ? `${baseUrl}&download=true` : `${baseUrl}?download=true`;
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedYear.value = 'All';
};

onMounted(fetchPublications);
</script>

<style scoped>
.publications-page {
  background-color: #f8f9fa;
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

.text-dark-teal {
  color: #0c2a38;
}

.bg-teal-light {
  background-color: rgba(0, 124, 145, 0.1);
}

.text-teal {
  color: #007c91;
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

.doc-card {
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.doc-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
}

.bg-light-red {
  background-color: rgba(220, 53, 69, 0.1);
}

.pdf-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
}

.form-control:focus {
  border-color: #007c91;
  box-shadow: 0 0 0 0.25rem rgba(0, 124, 145, 0.25);
}
</style>
