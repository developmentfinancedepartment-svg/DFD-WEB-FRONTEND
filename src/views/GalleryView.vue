<template>
  <div class="gallery-page">
    <!-- Top Hero Header -->
    <section class="gallery-hero py-12 md:py-14 text-center">
      <div class="container text-center">
        <h1 class="hero-title">Official Gallery</h1>
        <p class="hero-subtitle mb-3 leading-relaxed">Explore highlights from our institutional programs, field visits, and capacity-building workshops.</p>
      </div>
    </section>

    <!-- Filter Header -->
    <section class="filter-section py-4 bg-white border-b border-slate-200/80 shadow-2xs">
      <div class="container flex justify-end items-center d-flex justify-content-center justify-content-md-end align-items-center">
        <!-- Category Filter Custom Dropdown -->
        <div class="filter-dropdown-area">
          <div class="filter-label">
            <svg class="filter-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
            </svg>
            <span>Category:</span>
          </div>

          <div
            ref="categoryDropdownRef"
            class="custom-dropdown"
            @mouseenter="isCategoryDropdownOpen = true"
            @mouseleave="isCategoryDropdownOpen = false"
          >
            <!-- Trigger Button -->
            <button
              type="button"
              class="dropdown-btn bg-white border border-[#008795]/40 text-slate-700 text-xs font-semibold py-2 px-4 rounded-full shadow-xs hover:border-[#008795] cursor-pointer"
              :class="{ 'dropdown-btn-open': isCategoryDropdownOpen }"
              @click="toggleCategoryDropdown"
            >
              <span>{{ selectedCategoryLabel }}</span>
              <svg
                class="chevron-icon text-[#008795]"
                :class="{ 'rotate-180': isCategoryDropdownOpen }"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <transition name="dropdown-anim">
              <div
                v-if="isCategoryDropdownOpen"
                class="dropdown-menu-list absolute right-0 mt-1 min-w-[200px] bg-white border border-slate-100 rounded-2xl shadow-xl p-1.5 z-50 overflow-hidden"
              >
                <button
                  v-for="cat in categoryOptions"
                  :key="cat.value"
                  type="button"
                  class="dropdown-item"
                  :class="{ 'item-selected bg-teal-50/80 text-[#008795]': activeCategory === cat.value }"
                  @click="selectCategory(cat.value)"
                >
                  <span class="item-label-group">
                    <span
                      v-if="activeCategory === cat.value"
                      class="active-dot bg-[#008795]"
                    ></span>
                    <span>{{ cat.label }}</span>
                  </span>
                  <svg
                    v-if="activeCategory === cat.value"
                    class="check-icon text-[#008795]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Section -->
    <section class="gallery-content">
      <div class="container">
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
          <button class="btn btn-teal text-white mt-3 px-4" @click="selectCategory('ALL')">Show All Photos</button>
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

const categoryOptions = [
  { label: 'All Photos', value: 'ALL' },
  { label: 'Workshops', value: 'Workshops' },
  { label: 'Field Visits', value: 'Field Visits' },
  { label: 'Institutional', value: 'Institutional' }
];

const activeCategory = ref('ALL');
const isCategoryDropdownOpen = ref(false);
const categoryDropdownRef = ref(null);
const galleryItems = ref([]);
const loading = ref(false);
const activeItem = ref(null);

const selectedCategoryLabel = computed(() => {
  const match = categoryOptions.find(opt => opt.value === activeCategory.value);
  return match ? match.label : 'All Photos';
});

const toggleCategoryDropdown = () => {
  isCategoryDropdownOpen.value = !isCategoryDropdownOpen.value;
};

const selectCategory = (category) => {
  activeCategory.value = category;
  isCategoryDropdownOpen.value = false;
};

const handleClickOutside = (event) => {
  if (categoryDropdownRef.value && !categoryDropdownRef.value.contains(event.target)) {
    isCategoryDropdownOpen.value = false;
  }
};

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
  if (activeCategory.value === 'ALL' || activeCategory.value === 'All' || activeCategory.value === 'All Photos' || !activeCategory.value) {
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
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('click', handleClickOutside);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.gallery-page {
  /* Push down due to fixed header */
  padding-top: 100px;
  font-family: 'Open Sans', sans-serif;
  background: #f7fbff;
  padding-bottom: 80px;
  min-height: 100vh;
}

/* Top Hero Header */
.gallery-hero {
  background: linear-gradient(135deg, #004d5a 0%, #008795 100%);
  padding: 3rem 1rem;
  color: white;
  margin-top: 0 !important;
  border-top: none !important;
  position: relative;
  border-bottom: 5px solid #00e5ff;
}

@media (min-width: 768px) {
  .gallery-hero {
    padding: 3.5rem 1rem;
  }
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

.btn-teal {
  background-color: #008795;
  border-color: #008795;
  color: white;
}

.btn-teal:hover {
  background-color: #006b77;
  border-color: #006b77;
  color: white;
}

/* Filter Bar */
.filter-section {
  background-color: #ffffff;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
}

.shadow-2xs {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04) !important;
}

.border-slate-200\/80 {
  border-color: rgba(226, 232, 240, 0.8) !important;
}

.filter-dropdown-area {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #475569;
  letter-spacing: 0.05em;
  user-select: none;
}

.filter-icon {
  width: 14px;
  height: 14px;
  color: #008795;
}

.custom-dropdown {
  position: relative;
  min-width: 180px;
}

.dropdown-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  background-color: #ffffff;
  border: 1px solid rgba(0, 135, 149, 0.4);
  color: #334155;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  min-width: 180px;
}

.dropdown-btn:hover,
.dropdown-btn-open {
  border-color: #008795;
  box-shadow: 0 0 0 3px rgba(0, 135, 149, 0.12);
}

.chevron-icon {
  width: 14px;
  height: 14px;
  color: #008795;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.rotate-180 {
  transform: rotate(180deg);
}

.dropdown-menu-list {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.25rem;
  min-width: 200px;
  background-color: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 1rem;
  box-shadow: 0 12px 24px -4px rgba(15, 23, 42, 0.12);
  padding: 0.375rem;
  z-index: 50;
  overflow: hidden;
  box-sizing: border-box;
}

.dropdown-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.85rem;
  border-radius: 0.75rem;
  border: none;
  background: transparent;
  font-size: 0.75rem;
  font-weight: 500;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
}

.dropdown-item:hover {
  background-color: #f8fafc;
  color: #0f172a;
}

.item-selected {
  background-color: rgba(240, 253, 250, 0.8) !important;
  color: #008795 !important;
  font-weight: 600;
}

.item-label-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.active-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #008795;
  flex-shrink: 0;
}

.check-icon {
  width: 14px;
  height: 14px;
  color: #008795;
  flex-shrink: 0;
}

/* Animations */
.dropdown-anim-enter-active,
.dropdown-anim-leave-active {
  transition: all 0.15s ease-out;
}
.dropdown-anim-enter-from,
.dropdown-anim-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.97);
}

/* Gallery Content */
.gallery-content {
  padding: 40px 20px;
}

.container {
  max-width: 1140px;
  margin: 0 auto;
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
  .hero-title {
    font-size: 2.2rem;
  }
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
