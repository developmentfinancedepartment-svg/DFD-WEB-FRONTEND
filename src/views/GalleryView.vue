<template>
  <div class="gallery-page">
    <!-- Top Hero Header -->
    <div class="gallery-hero">
      <div class="container text-center">
        <h1 class="hero-title">Official Gallery</h1>
        <p class="hero-subtitle">Explore highlights from our institutional programs, field visits, and capacity-building workshops.</p>
      </div>
    </div>

    <!-- Main Content Section -->
    <section class="gallery-content">
      <div class="container">
        <!-- Filter Pills -->
        <div class="filter-pills">
          <button 
            v-for="category in categories" 
            :key="category" 
            @click="activeCategory = category"
            :class="['filter-pill', { active: activeCategory === category }]"
          >
            {{ category }}
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-teal mb-3" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h5 class="text-muted">Loading gallery photographs...</h5>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredGallery.length === 0" class="text-center py-5">
          <div class="mb-3">
            <i class="fas fa-images fa-3x text-muted opacity-50"></i>
          </div>
          <h4 class="text-muted">No photographs found for this category.</h4>
        </div>

        <!-- 3-Column Grid -->
        <div v-else class="gallery-grid animate-fade-up">
          <div 
            v-for="item in filteredGallery" 
            :key="item.id" 
            class="gallery-card"
            @click="openLightbox(item)"
          >
            <div class="img-wrapper">
              <!-- Actual Uploaded Image -->
              <img
                v-if="item.imageUrl && !item.hasImageError"
                :src="resolveImageUrl(item.imageUrl)"
                :alt="item.title"
                class="gallery-img"
                @error="item.hasImageError = true"
              />
              <!-- Fallback Placeholder -->
              <div v-else class="placeholder-img">
                <i class="fas fa-image"></i>
              </div>

              <!-- Hover Overlay -->
              <div class="hover-overlay">
                <i class="fas fa-search-plus"></i>
              </div>
            </div>

            <!-- Card Info -->
            <div class="card-info">
              <span class="category-tag" :class="getCategoryTagClass(item.category)">
                {{ item.category }}
              </span>
              <h4>{{ item.title }}</h4>
              <p>
                <i class="far fa-calendar-alt me-1 text-teal"></i>
                {{ item.eventDate || item.date || 'Official Event' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- LIGHTBOX MODAL -->
    <div
      v-if="activeItem"
      class="lightbox-modal"
      @click.self="closeLightbox"
    >
      <div class="lightbox-card">
        <button class="lightbox-close" @click="closeLightbox" title="Close Preview">
          <i class="fas fa-times"></i>
        </button>

        <div class="lightbox-img-box">
          <img
            v-if="activeItem.imageUrl && !activeItem.hasImageError"
            :src="resolveImageUrl(activeItem.imageUrl)"
            :alt="activeItem.title"
            class="lightbox-img"
          />
          <div v-else class="lightbox-placeholder">
            <i class="fas fa-image fa-4x text-muted"></i>
          </div>
        </div>

        <div class="lightbox-details">
          <span class="category-tag mb-2" :class="getCategoryTagClass(activeItem.category)">
            {{ activeItem.category }}
          </span>
          <h3>{{ activeItem.title }}</h3>
          <p class="text-muted mb-0">
            <i class="far fa-calendar-alt me-1 text-teal"></i>
            {{ activeItem.eventDate || activeItem.date || 'Official Event' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import BaseUrl from '@/services/baseURL';

const categories = ['All', 'Workshops', 'Field Visits', 'Institutional'];
const activeCategory = ref('All');
const galleryItems = ref([]);
const loading = ref(false);
const activeItem = ref(null);

// Fallback initial items if backend is offline
const fallbackItems = [
  { id: 1, category: 'Workshops', title: 'MSME Policy Workshop 2025', eventDate: 'August 12, 2026', imageUrl: '' },
  { id: 2, category: 'Field Visits', title: 'Dairy Farm Inspection - Central Province', eventDate: 'July 24, 2026', imageUrl: '' },
  { id: 3, category: 'Institutional', title: 'Annual General Meeting', eventDate: 'June 10, 2026', imageUrl: '' },
  { id: 4, category: 'Field Visits', title: 'Agribusiness Value Chain Assessment', eventDate: 'May 18, 2026', imageUrl: '' },
  { id: 5, category: 'Workshops', title: 'Financial Literacy Training', eventDate: 'April 05, 2026', imageUrl: '' },
  { id: 6, category: 'Institutional', title: 'New Scheme Launch Ceremony', eventDate: 'March 22, 2026', imageUrl: '' },
];

const resolveImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const baseUrl = BaseUrl.baseUrl || 'http://localhost:8096';
  return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
};

const getCategoryTagClass = (category) => {
  switch (category) {
    case 'Workshops':
      return 'tag-workshops';
    case 'Field Visits':
      return 'tag-field-visits';
    case 'Institutional':
      return 'tag-institutional';
    default:
      return 'tag-default';
  }
};

const fetchGallery = async () => {
  loading.value = true;
  try {
    const apiBase = BaseUrl.baseUrl || 'http://localhost:8096';
    const response = await axios.get(`${apiBase}/api/v1/gallery`);
    if (Array.isArray(response.data) && response.data.length > 0) {
      galleryItems.value = response.data.map(item => ({ ...item, hasImageError: false }));
    } else {
      galleryItems.value = fallbackItems;
    }
  } catch (error) {
    console.warn('Failed to fetch gallery items from backend, using default items:', error);
    galleryItems.value = fallbackItems;
  } finally {
    loading.value = false;
  }
};

const filteredGallery = computed(() => {
  if (activeCategory.value === 'All') {
    return galleryItems.value;
  }
  return galleryItems.value.filter(item => item.category === activeCategory.value);
});

const openLightbox = (item) => {
  activeItem.value = item;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  activeItem.value = null;
  document.body.style.overflow = '';
};

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && activeItem.value) {
    closeLightbox();
  }
};

onMounted(() => {
  fetchGallery();
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.gallery-page {
  font-family: 'Open Sans', sans-serif;
  background: #f7fbff;
  padding-bottom: 80px;
  min-height: 100vh;
}

/* Top Hero Header */
.gallery-hero {
  background: linear-gradient(135deg, #004d5a 0%, #008795 100%);
  padding: 130px 20px 70px 20px;
  color: white;
  margin-top: 0 !important;
  border-top: none !important;
  position: relative;
  border-bottom: 5px solid #00e5ff;
}

.hero-title {
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 15px;
  letter-spacing: 0.5px;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.text-teal {
  color: #008795;
}

/* Gallery Content */
.gallery-content {
  padding: 50px 20px;
}

.container {
  max-width: 1140px;
  margin: 0 auto;
}

/* Filter Pills */
.filter-pills {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 40px;
}

.filter-pill {
  background: white;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 8px 20px;
  border-radius: 99px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-pill:hover {
  border-color: #008795;
  color: #008795;
}

.filter-pill.active {
  background: #008795;
  color: white;
  border-color: #008795;
  box-shadow: 0 4px 15px rgba(0, 135, 149, 0.3);
}

/* 3-Column Grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.gallery-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #eef2f6;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.gallery-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 35px rgba(0, 135, 149, 0.15);
  border-color: rgba(0, 135, 149, 0.3);
}

.img-wrapper {
  position: relative;
  width: 100%;
  height: 230px;
  overflow: hidden;
  background: #e2e8f0;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-card:hover .gallery-img {
  transform: scale(1.08);
}

.placeholder-img {
  width: 100%;
  height: 100%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #94a3b8;
  transition: transform 0.5s ease;
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 135, 149, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.2rem;
  opacity: 0;
  backdrop-filter: blur(2px);
  transition: opacity 0.3s ease;
}

.gallery-card:hover .placeholder-img {
  transform: scale(1.08);
}

.gallery-card:hover .hover-overlay {
  opacity: 1;
}

.card-info {
  padding: 22px 20px;
}

.category-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.tag-workshops {
  color: #4338ca;
  background: #e0e7ff;
}

.tag-field-visits {
  color: #047857;
  background: #d1fae5;
}

.tag-institutional {
  color: #b45309;
  background: #fef3c7;
}

.tag-default {
  color: #008795;
  background: #e6f9fa;
}

.card-info h4 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 10px 0;
  line-height: 1.4;
}

.card-info p {
  font-size: 0.88rem;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}

/* LIGHTBOX MODAL */
.lightbox-modal {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.lightbox-card {
  position: relative;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
  animation: zoomIn 0.25s ease-out;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.lightbox-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  z-index: 10;
  transition: background-color 0.2s ease;
}

.lightbox-close:hover {
  background: #ef4444;
}

.lightbox-img-box {
  width: 100%;
  max-height: 60vh;
  background: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.lightbox-img {
  width: 100%;
  height: 100%;
  max-height: 60vh;
  object-fit: contain;
}

.lightbox-placeholder {
  padding: 80px 20px;
  text-align: center;
}

.lightbox-details {
  padding: 24px;
  background: white;
}

.lightbox-details h3 {
  font-size: 1.35rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

/* Responsive */
@media (max-width: 991px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .gallery-hero {
    padding: 100px 15px 50px 15px;
  }
  .hero-title {
    font-size: 2.2rem;
  }
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  .filter-pills {
    gap: 10px;
  }
  .filter-pill {
    padding: 6px 16px;
    font-size: 0.85rem;
  }
}
</style>
