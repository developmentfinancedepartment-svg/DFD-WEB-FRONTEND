<template>
  <div class="gallery-page">
    <!-- Top Hero Header -->
    <header class="hero-header text-center px-4">
      <div class="container text-center">
        <h1 class="hero-title">Media Gallery</h1>
        <p class="hero-subtitle mb-3 leading-relaxed">
          A visual archive of departmental programs, institutional workshops, and regional stakeholder engagements.
        </p>
      </div>
    </header>

    <!-- Filter Header -->
    <section class="filter-section py-4 bg-white border-b border-slate-200/80 shadow-2xs">
      <div class="container flex justify-between items-center d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div class="results-meta-info text-xs font-semibold text-slate-500">
          Showing <span class="text-[#008795] font-bold">{{ filteredGallery.length }}</span> photograph{{ filteredGallery.length === 1 ? '' : 's' }}
          <span v-if="searchQuery" class="meta-tag ml-1">
            matching "{{ searchQuery }}"
          </span>
          <span v-if="activeCategory !== 'ALL'" class="meta-tag ml-1">
            in {{ selectedCategoryLabel }}
          </span>
        </div>

        <div class="flex items-center gap-3">
          <button
            v-if="searchQuery || activeCategory !== 'ALL'"
            type="button"
            class="reset-filters-btn text-xs font-semibold text-slate-500 hover:text-slate-800"
            @click="resetFilters"
          >
            Reset Filters
          </button>

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
          <h4 class="text-muted">No photographs found matching your search.</h4>
          <p class="text-muted small" v-if="searchQuery">
            We couldn't find any photographs matching "{{ searchQuery }}".
          </p>
          <button class="btn btn-teal text-white mt-3 px-4" @click="resetFilters">Clear Filters &amp; Show All</button>
        </div>

        <!-- 3-Column Grid -->
        <div v-else class="gallery-grid flex flex-wrap justify-center gap-6 animate-fade-up">
          <div 
            v-for="item in filteredGallery" 
            :key="item.id" 
            class="gallery-card w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] max-w-[380px]"
            @click="openLightbox(item)"
          >
            <div class="img-wrapper">
              <!-- Actual Uploaded Image (Cover) -->
              <img
                v-if="(item.imageUrl || (getAlbumPhotos(item).length > 0)) && !item.hasImageError"
                :src="resolveImageUrl(item.imageUrl || getAlbumPhotos(item)[0])"
                :alt="item.title"
                class="gallery-img"
                @error="item.hasImageError = true"
              />
              <!-- Fallback Placeholder -->
              <div v-else class="placeholder-img">
                <i class="fas fa-image"></i>
              </div>

              <!-- Top-Right Photo Count Badge (for Multi-Photo Albums) -->
              <div
                v-if="getAlbumPhotos(item).length > 1"
                class="album-count-badge"
                title="Multi-photo event album"
              >
                <i class="fas fa-images me-1.5 text-teal"></i>
                <span>{{ getAlbumPhotos(item).length }} Photos</span>
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

    <!-- LIGHTBOX ALBUM VIEWER MODAL -->
    <div
      v-if="activeItem"
      class="lightbox-modal"
      @click.self="closeLightbox"
    >
      <div class="lightbox-card">
        <!-- Close Button -->
        <button class="lightbox-close" @click="closeLightbox" title="Close Preview (Esc)">
          <i class="fas fa-times"></i>
        </button>

        <!-- Main Photo Box with Prev / Next Navigation -->
        <div class="lightbox-img-box">
          <!-- Previous Button -->
          <button
            v-if="currentAlbumPhotos.length > 1"
            class="lightbox-nav-btn prev-btn"
            @click.stop="prevPhoto"
            title="Previous Photo (←)"
          >
            <i class="fas fa-chevron-left"></i>
          </button>

          <!-- Current Photo -->
          <img
            v-if="currentPhotoUrl"
            :src="resolveImageUrl(currentPhotoUrl)"
            :alt="`${activeItem.title} - Photo ${currentPhotoIndex + 1}`"
            class="lightbox-img"
          />
          <div v-else class="lightbox-placeholder">
            <i class="fas fa-image fa-4x text-muted"></i>
          </div>

          <!-- Next Button -->
          <button
            v-if="currentAlbumPhotos.length > 1"
            class="lightbox-nav-btn next-btn"
            @click.stop="nextPhoto"
            title="Next Photo (→)"
          >
            <i class="fas fa-chevron-right"></i>
          </button>

          <!-- Floating Photo Counter Badge -->
          <div v-if="currentAlbumPhotos.length > 1" class="lightbox-photo-counter">
            <i class="fas fa-camera me-1"></i>
            {{ currentPhotoIndex + 1 }} / {{ currentAlbumPhotos.length }}
          </div>
        </div>

        <!-- Clickable Bottom Thumbnail Strip -->
        <div v-if="currentAlbumPhotos.length > 1" class="lightbox-thumb-strip">
          <div
            v-for="(photo, idx) in currentAlbumPhotos"
            :key="idx"
            class="thumb-item"
            :class="{ active: idx === currentPhotoIndex }"
            @click.stop="selectPhotoIndex(idx)"
            :title="`Jump to photo ${idx + 1}`"
          >
            <img :src="resolveImageUrl(photo)" :alt="`Thumb ${idx + 1}`" />
            <span class="thumb-number">{{ idx + 1 }}</span>
          </div>
        </div>

        <!-- Details Bar -->
        <div class="lightbox-details">
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
            <div class="d-flex align-items-center gap-2">
              <span class="category-tag" :class="getCategoryTagClass(activeItem.category)">
                {{ activeItem.category }}
              </span>
              <span class="album-badge-inline" v-if="currentAlbumPhotos.length > 1">
                <i class="fas fa-images me-1.5 text-teal"></i>
                {{ currentAlbumPhotos.length }} Photos Album
              </span>
            </div>
            <span class="text-muted small">
              <i class="far fa-calendar-alt me-1 text-teal"></i>
              {{ activeItem.eventDate || activeItem.date || 'Official Event' }}
            </span>
          </div>
          <h3>{{ activeItem.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import BaseUrl from '@/services/baseURL';
import { navbarSearchState, clearNavbarSearch, setNavbarSearchQuery } from '@/services/navbarSearchState';

const route = useRoute();
const searchQuery = computed({
  get() {
    return navbarSearchState.query;
  },
  set(val) {
    setNavbarSearchQuery(val);
  }
});

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

const resetFilters = () => {
  clearNavbarSearch();
  selectCategory('ALL');
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
  let list = galleryItems.value;
  if (activeCategory.value && activeCategory.value !== 'ALL' && activeCategory.value !== 'All' && activeCategory.value !== 'All Photos') {
    list = list.filter(item => item.category === activeCategory.value);
  }
  const query = (searchQuery.value || '').trim().toLowerCase();
  if (!query) return list;

  return list.filter(item => {
    const title = (item.title || '').toLowerCase();
    const category = (item.category || '').toLowerCase();
    const date = (item.eventDate || item.date || '').toLowerCase();
    return title.includes(query) || category.includes(query) || date.includes(query);
  });
});

const openLightbox = (item, initialIndex = 0) => {
  activeItem.value = item;
  currentPhotoIndex.value = initialIndex;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  activeItem.value = null;
  currentPhotoIndex.value = 0;
  document.body.style.overflow = '';
};

// Robust helper to extract full list of photos for an album
const getAlbumPhotos = (item) => {
  if (!item) return [];
  if (Array.isArray(item.images) && item.images.length > 0) {
    return item.images;
  }
  if (typeof item.images === 'string' && item.images.trim()) {
    try {
      const parsed = JSON.parse(item.images);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {}
    const split = item.images.split(',').map(s => s.trim()).filter(Boolean);
    if (split.length > 0) return split;
  }
  return item.imageUrl ? [item.imageUrl] : [];
};

const currentPhotoIndex = ref(0);

const currentAlbumPhotos = computed(() => {
  return getAlbumPhotos(activeItem.value);
});

const currentPhotoUrl = computed(() => {
  const photos = currentAlbumPhotos.value;
  if (photos.length === 0) return activeItem.value?.imageUrl || '';
  const idx = Math.min(Math.max(0, currentPhotoIndex.value), photos.length - 1);
  return photos[idx] || '';
});

const nextPhoto = () => {
  const len = currentAlbumPhotos.value.length;
  if (len <= 1) return;
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % len;
};

const prevPhoto = () => {
  const len = currentAlbumPhotos.value.length;
  if (len <= 1) return;
  currentPhotoIndex.value = (currentPhotoIndex.value - 1 + len) % len;
};

const selectPhotoIndex = (index) => {
  currentPhotoIndex.value = index;
};

const handleKeyDown = (e) => {
  if (!activeItem.value) return;
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowRight' || e.key === 'Right') {
    nextPhoto();
  } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
    prevPhoto();
  }
};

onMounted(() => {
  if (route?.query?.q) {
    setNavbarSearchQuery(String(route.query.q));
  }
  fetchGallery();
  window.addEventListener('keydown', handleKeyDown);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  document.removeEventListener('click', handleClickOutside);
  document.body.style.overflow = '';
  clearNavbarSearch();
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
  font-size: 2.3rem;
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

.hero-header {
  background: linear-gradient(135deg, #004d5a 0%, #008795 100%);
  padding: 3.3rem 1rem;
  border-bottom: 5px solid #00e5ff;
}

.container {
  max-width: 1140px;
  margin: 0 auto;
}

.hero-title {
  color: #ffffff;
  font-size: 2.3rem;
  font-weight: 600;
  margin-bottom: 15px;
  letter-spacing: 0.5px;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Gallery Grid - Centered Flexbox Layout */
.gallery-grid {
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: center !important;
  gap: 1.5rem !important; /* gap-6: 24px */
}

.gallery-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #eef2f6;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  width: 100%;
  max-width: 380px;
  flex: 0 0 auto;
}

@media (min-width: 640px) {
  .gallery-card {
    width: calc(50% - 1rem);
  }
}

@media (min-width: 1024px) {
  .gallery-card {
    width: calc(33.333% - 1.35rem);
    max-width: 380px;
  }
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

.album-count-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(15, 23, 42, 0.8);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 11px;
  border-radius: 20px;
  backdrop-filter: blur(6px);
  display: inline-flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 2;
  letter-spacing: 0.3px;
  pointer-events: none;
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
  background: rgba(15, 23, 42, 0.88);
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
  max-width: 960px;
  width: 100%;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
  animation: zoomIn 0.25s ease-out;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.lightbox-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.7);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  z-index: 20;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
}

.lightbox-close:hover {
  background: #ef4444;
  border-color: #ef4444;
  transform: rotate(90deg) scale(1.05);
}

.lightbox-img-box {
  position: relative;
  width: 100%;
  height: 56vh;
  min-height: 320px;
  background: #090e17;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
}

.lightbox-img {
  width: 100%;
  height: 100%;
  max-height: 56vh;
  object-fit: contain;
}

.lightbox-placeholder {
  padding: 80px 20px;
  text-align: center;
}

/* Lightbox Prev / Next Navigation */
.lightbox-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
}

.lightbox-nav-btn:hover {
  background: #008795;
  border-color: #008795;
  color: #ffffff;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 18px rgba(0, 135, 149, 0.45);
}

.prev-btn {
  left: 16px;
}

.next-btn {
  right: 16px;
}

/* Floating Photo Counter Badge */
.lightbox-photo-counter {
  position: absolute;
  bottom: 14px;
  left: 16px;
  background: rgba(15, 23, 42, 0.8);
  color: #f1f5f9;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 20px;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 10;
  letter-spacing: 0.4px;
}

/* Clickable Bottom Thumbnail Strip */
.lightbox-thumb-strip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  background: #0f172a;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #008795 #1e293b;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.lightbox-thumb-strip::-webkit-scrollbar {
  height: 6px;
}

.lightbox-thumb-strip::-webkit-scrollbar-track {
  background: #1e293b;
}

.lightbox-thumb-strip::-webkit-scrollbar-thumb {
  background: #008795;
  border-radius: 3px;
}

.thumb-item {
  position: relative;
  flex: 0 0 68px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  opacity: 0.6;
  transition: all 0.2s ease;
  background: #1e293b;
}

.thumb-item:hover {
  opacity: 0.95;
  transform: translateY(-2px);
  border-color: rgba(0, 135, 149, 0.6);
}

.thumb-item.active {
  opacity: 1;
  border-color: #008795;
  box-shadow: 0 0 0 2px rgba(0, 135, 149, 0.45);
  transform: scale(1.05);
}

.thumb-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-number {
  position: absolute;
  bottom: 2px;
  right: 4px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 1px 4px;
  border-radius: 4px;
  line-height: 1;
}

.lightbox-details {
  padding: 20px 24px;
  background: white;
}

.lightbox-details h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0;
  line-height: 1.4;
}

.album-badge-inline {
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: #008795;
  background: #e6f9fa;
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.3px;
}

/* Responsive */
@media (max-width: 767px) {
  .hero-title {
    font-size: 2.2rem;
  }
  .lightbox-img-box {
    height: 42vh;
    min-height: 240px;
  }
  .lightbox-nav-btn {
    width: 38px;
    height: 38px;
    font-size: 1rem;
  }
  .thumb-item {
    flex: 0 0 54px;
    height: 40px;
  }
}
</style>
