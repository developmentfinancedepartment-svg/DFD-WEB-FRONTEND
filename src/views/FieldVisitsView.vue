<template>
  <div class="field-visits-page">
    <!-- Hero Header -->
    <section class="hero-header">
      <div class="container text-center">
        <h1 class="hero-title">Field Visits &amp; Progress Monitoring</h1>
        <p class="hero-subtitle">On-ground tracking of development finance initiatives and beneficiary progress.</p>
      </div>
    </section>

    <!-- Filter Header -->
    <section class="filter-section">
      <div class="container filter-container">
        <!-- District Filter Custom Dropdown -->
        <div class="filter-dropdown-area">
          <div class="filter-label">
            <svg class="filter-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
            </svg>
            <span>District:</span>
          </div>

          <div
            ref="districtDropdownRef"
            class="custom-dropdown"
            @mouseenter="isDistrictDropdownOpen = true"
            @mouseleave="isDistrictDropdownOpen = false"
          >
            <!-- Trigger Button -->
            <button
              type="button"
              class="dropdown-btn"
              :class="{ 'dropdown-btn-open': isDistrictDropdownOpen }"
              @click="toggleDistrictDropdown"
            >
              <span>{{ selectedDistrictLabel }}</span>
              <svg
                class="chevron-icon"
                :class="{ 'rotate-180': isDistrictDropdownOpen }"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Floating Dropdown Menu -->
            <transition name="dropdown-anim">
              <div
                v-if="isDistrictDropdownOpen"
                class="dropdown-menu-list"
              >
                <button
                  v-for="district in districtOptions"
                  :key="district.value"
                  type="button"
                  class="dropdown-item"
                  :class="{ 'item-selected': selectedDistrict === district.value }"
                  @click="selectDistrict(district.value)"
                >
                  <span class="item-label-group">
                    <span
                      v-if="selectedDistrict === district.value"
                      class="active-dot"
                    ></span>
                    <span>{{ district.label }}</span>
                  </span>
                  <svg
                    v-if="selectedDistrict === district.value"
                    class="check-icon"
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

    <!-- Content Section -->
    <section class="content-section">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="fv-loading-box">
          <div class="fv-spinner" role="status"></div>
          <h5 class="fv-loading-text">Loading field visits...</h5>
        </div>

        <!-- Visits Grid -->
        <div class="row g-4" v-else-if="filteredVisits.length > 0">
          <div 
            class="col-12 col-md-6 col-lg-4" 
            v-for="visit in filteredVisits" 
            :key="visit.id || visit.title"
          >
            <!-- Styled Field Visit Card -->
            <div class="fv-card">
              <!-- Top Cover Image Box (200px) -->
              <div class="fv-cover-wrap">
                <img
                  :src="resolveImageUrl(getCoverImage(visit))"
                  :alt="visit.title"
                  class="fv-cover-img"
                  @error="handleImgError($event, visit.title)"
                  loading="lazy"
                />

                <!-- Floating Badges Over Image -->
                <div class="fv-floating-badges">
                  <!-- District Badge -->
                  <span class="fv-badge fv-badge-district">
                    <svg class="fv-badge-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ visit.district || visit.region || 'District' }}</span>
                  </span>

                  <!-- Category Badge -->
                  <span class="fv-badge fv-badge-category">
                    {{ visit.schemeType || visit.scheme || visit.category || 'Scheme' }}
                  </span>
                </div>
              </div>

              <!-- Body: ONLY Title and Description -->
              <div class="fv-card-body">
                <div class="fv-body-text">
                  <h3 class="fv-card-title" :title="visit.title">
                    {{ visit.title }}
                  </h3>
                  <p class="fv-card-desc">
                    {{ visit.description || visit.overview }}
                  </p>
                </div>

                <!-- Bottom Button: Styled Teal "More Images" Button -->
                <div class="fv-card-footer">
                  <button
                    type="button"
                    class="fv-more-btn"
                    @click="openImageModal(visit)"
                  >
                    <svg class="fv-btn-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                    </svg>
                    <span>More Images</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div class="fv-empty-box" v-else>
          <div class="fv-empty-icon-wrap">
            <svg class="fv-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h4 class="fv-empty-title">No field visits recorded for this district.</h4>
          <p class="fv-empty-desc">Try choosing another district from the filter dropdown above.</p>
          <button class="fv-empty-btn" @click="selectDistrict('ALL')">Show All Districts</button>
        </div>
      </div>
    </section>

    <!-- Modern Lightbox Popup Modal -->
    <transition name="fv-modal-fade">
      <div
        v-if="activeVisit"
        class="fv-modal-backdrop"
        @click.self="closeImageModal"
      >
        <div class="fv-modal-dialog" role="dialog" aria-modal="true">
          <!-- Modal Header -->
          <div class="fv-modal-header">
            <div class="fv-modal-header-badges">
              <span class="fv-badge fv-badge-district">
                <svg class="fv-badge-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <span>{{ activeVisit.district || activeVisit.region || 'District' }}</span>
              </span>
              <span class="fv-badge fv-badge-category-modal">
                {{ activeVisit.schemeType || activeVisit.scheme || activeVisit.category || 'Scheme' }}
              </span>
            </div>

            <!-- Close Button -->
            <button
              type="button"
              class="fv-modal-close"
              @click="closeImageModal"
              title="Close modal (Esc)"
              aria-label="Close"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" class="fv-close-svg">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <!-- Modal Info (Title & Description) -->
          <div class="fv-modal-info">
            <h3 class="fv-modal-title">
              {{ activeVisit.title }}
            </h3>
            <p class="fv-modal-desc">
              {{ activeVisit.description || activeVisit.overview }}
            </p>
          </div>

          <!-- Central Image Viewport (Height 380px) -->
          <div class="fv-modal-viewport">
            <img
              :src="resolveImageUrl(currentModalImage)"
              :alt="activeVisit.title"
              class="fv-modal-main-img"
              @error="handleImgError($event, activeVisit.title)"
            />

            <!-- Prev Navigation Arrow -->
            <button
              v-if="modalImagesList.length > 1"
              type="button"
              class="fv-modal-nav fv-modal-nav-prev"
              @click="prevImage"
              title="Previous photo (Left Arrow)"
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="fv-nav-svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <!-- Next Navigation Arrow -->
            <button
              v-if="modalImagesList.length > 1"
              type="button"
              class="fv-modal-nav fv-modal-nav-next"
              @click="nextImage"
              title="Next photo (Right Arrow)"
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="fv-nav-svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Slide Indicator Counter -->
            <div v-if="modalImagesList.length > 1" class="fv-modal-counter">
              {{ activeImageIndex + 1 }} / {{ modalImagesList.length }}
            </div>
          </div>

          <!-- Bottom Thumbnail Gallery Strip -->
          <div v-if="modalImagesList.length > 1" class="fv-modal-thumbs">
            <button
              v-for="(img, idx) in modalImagesList"
              :key="idx"
              type="button"
              class="fv-modal-thumb-btn"
              :class="{ 'fv-thumb-active': activeImageIndex === idx }"
              @click="activeImageIndex = idx"
              :title="`Image ${idx + 1}`"
            >
              <img
                :src="resolveImageUrl(img)"
                :alt="`Thumbnail ${idx + 1}`"
                class="fv-modal-thumb-img"
                @error="handleImgError($event, 'Thumbnail')"
              />
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import BaseUrl from '@/services/baseURL';

// District filter options
const districtOptions = [
  { label: 'All Districts', value: 'ALL' },
  { label: 'Kurunegala', value: 'Kurunegala' },
  { label: 'Galle', value: 'Galle' },
  { label: 'Batticaloa', value: 'Batticaloa' },
  { label: 'Kandy', value: 'Kandy' },
  { label: 'Colombo', value: 'Colombo' },
  { label: 'Anuradhapura', value: 'Anuradhapura' },
  { label: 'Matara', value: 'Matara' }
];

const selectedDistrict = ref('ALL');
const isDistrictDropdownOpen = ref(false);
const districtDropdownRef = ref(null);
const visits = ref([]);
const loading = ref(false);

// Modal state
const activeVisit = ref(null);
const activeImageIndex = ref(0);

const selectedDistrictLabel = computed(() => {
  const match = districtOptions.find(opt => opt.value === selectedDistrict.value);
  return match ? match.label : 'All Districts';
});

const toggleDistrictDropdown = () => {
  isDistrictDropdownOpen.value = !isDistrictDropdownOpen.value;
};

const selectDistrict = (district) => {
  selectedDistrict.value = district;
  isDistrictDropdownOpen.value = false;
};

const handleClickOutside = (event) => {
  if (districtDropdownRef.value && !districtDropdownRef.value.contains(event.target)) {
    isDistrictDropdownOpen.value = false;
  }
};

/**
 * Generate a high quality inline SVG placeholder for fallback
 */
const getPlaceholderSvg = (title = 'Field Visit') => {
  const safeTitle = (title || 'Field Inspection').replace(/[<>&"']/g, '');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00353e"/>
        <stop offset="55%" stop-color="#00606e"/>
        <stop offset="100%" stop-color="#008795"/>
      </linearGradient>
      <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.4"/>
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-width="0.75" stroke-opacity="0.07"/>
      </pattern>
    </defs>
    <rect width="600" height="400" fill="url(#bgGrad)"/>
    <rect width="600" height="400" fill="url(#grid)"/>
    <rect width="600" height="400" fill="url(#overlay)"/>
    <circle cx="300" cy="155" r="95" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-opacity="0.12"/>
    <circle cx="300" cy="155" r="65" fill="none" stroke="#2dd4bf" stroke-width="1.5" stroke-opacity="0.25"/>
    <g transform="translate(280, 135)" fill="#ffffff" opacity="0.92">
      <path d="M38 6H31.8L28.6 2.8C27.8 2 26.7 1.5 25.5 1.5H12.5C11.3 1.5 10.2 2 9.4 2.8L6.2 6H0C-1.1 6 -2 6.9 -2 8V34C-2 35.1 -1.1 36 0 36H38C39.1 36 40 35.1 40 34V8C40 6.9 39.1 6 38 6ZM19 30C13.5 30 9 25.5 9 20C9 14.5 13.5 10 19 10C24.5 10 29 14.5 29 20C29 25.5 24.5 30 19 30ZM19 13C15.1 13 12 16.1 12 20C12 23.9 15.1 27 19 27C22.9 27 26 23.9 26 20C26 16.1 22.9 13 19 13Z"/>
    </g>
    <g text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif">
      <rect x="170" y="222" width="260" height="22" rx="11" fill="#000000" fill-opacity="0.32"/>
      <text x="300" y="237" fill="#5eead4" font-size="10.5" font-weight="700" letter-spacing="1.5">DEVELOPMENT FINANCE DEPARTMENT</text>
      <text x="300" y="274" fill="#ffffff" font-size="17" font-weight="700" letter-spacing="0.3">${safeTitle.slice(0, 38)}</text>
      <text x="300" y="297" fill="#ffffff" fill-opacity="0.75" font-size="11.5" letter-spacing="0.5">Field Inspection &amp; Progress Monitoring</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

/**
 * Handle image loading failure gracefully with SVG fallback
 */
const handleImgError = (event, fallbackTitle = 'Inspection') => {
  if (event && event.target) {
    event.target.onerror = null;
    event.target.src = getPlaceholderSvg(fallbackTitle);
  }
};

/**
 * Verified fallback field visit records
 */
const fallbackVisits = [
  {
    id: 1,
    title: 'Dairy Farming Cooperative Inspection',
    district: 'Kandy',
    region: 'Central',
    schemeType: 'SME Loan',
    description: 'Site visit to Kandy evaluating the structural improvements made to dairy storage facilities using recently disbursed SME loan funds.',
    coverImage: 'gal/11.JPG',
    images: [
      'gal/11.JPG',
      'gal/12.JPG',
      'gal/13.JPG'
    ]
  },
  {
    id: 2,
    title: 'Women Entrepreneurs Handloom Project',
    district: 'Batticaloa',
    region: 'Eastern',
    schemeType: 'Microfinance',
    description: 'Monitoring the utilization of micro-credit grants by a women\'s cooperative in Batticaloa specializing in traditional handloom exports.',
    coverImage: 'gal/14.JPG',
    images: [
      'gal/14.JPG',
      'gal/15.JPG',
      'gal/16.jpg'
    ]
  },
  {
    id: 3,
    title: 'Fisheries Equipment Upgrade Review',
    district: 'Galle',
    region: 'Southern',
    schemeType: 'Commercial Agriculture',
    description: 'Evaluating a commercial agriculture loan utilized by a fishing fleet in Galle to upgrade navigation and deep-sea fishing equipment.',
    coverImage: 'gal/17.jpg',
    images: [
      'gal/17.jpg',
      'gal/18.JPG',
      'gal/19.JPG'
    ]
  },
  {
    id: 4,
    title: 'Organic Fertilizer Plant Assessment',
    district: 'Kurunegala',
    region: 'North Western',
    schemeType: 'Green Finance',
    description: 'Routine progress check at a new organic fertilizer manufacturing plant in Kurunegala supported under the national Green Finance initiative.',
    coverImage: 'gal/3.jpg',
    images: [
      'gal/3.jpg',
      'gal/4.jpg',
      'gal/5.jpg'
    ]
  }
];

/**
 * Safely resolves image URLs considering Vite base path, backend uploads, and inline SVGs
 */
const resolveImageUrl = (path) => {
  if (!path) return getPlaceholderSvg();
  if (typeof path !== 'string') return getPlaceholderSvg();
  if (path.startsWith('data:') || path.startsWith('blob:')) return path;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Backend uploads
  if (cleanPath.startsWith('uploads/')) {
    const apiBase = (BaseUrl.baseUrl || 'http://localhost:8096').replace(/\/$/, '');
    return `${apiBase}/${cleanPath}`;
  }

  // Vite frontend public assets
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${cleanBase}${cleanPath}`;
};

const getCoverImage = (visit) => {
  if (!visit) return '';
  if (visit.coverImage) return visit.coverImage;
  if (visit.imageUrl) return visit.imageUrl;
  if (Array.isArray(visit.images) && visit.images.length > 0) return visit.images[0];
  return 'gal/11.JPG';
};

const getVisitImages = (visit) => {
  if (!visit) return [];
  if (Array.isArray(visit.images) && visit.images.length > 0) return visit.images;
  if (visit.coverImage) return [visit.coverImage];
  if (visit.imageUrl) return [visit.imageUrl];
  return ['gal/11.JPG', 'gal/12.JPG'];
};

const modalImagesList = computed(() => {
  if (!activeVisit.value) return [];
  return getVisitImages(activeVisit.value);
});

const currentModalImage = computed(() => {
  if (!modalImagesList.value.length) return '';
  return modalImagesList.value[activeImageIndex.value] || modalImagesList.value[0];
});

const openImageModal = (visit) => {
  activeVisit.value = visit;
  activeImageIndex.value = 0;
  document.body.style.overflow = 'hidden';
};

const closeImageModal = () => {
  activeVisit.value = null;
  activeImageIndex.value = 0;
  document.body.style.overflow = '';
};

const nextImage = () => {
  if (modalImagesList.value.length > 1) {
    activeImageIndex.value = (activeImageIndex.value + 1) % modalImagesList.value.length;
  }
};

const prevImage = () => {
  if (modalImagesList.value.length > 1) {
    activeImageIndex.value = (activeImageIndex.value - 1 + modalImagesList.value.length) % modalImagesList.value.length;
  }
};

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && activeVisit.value) {
    closeImageModal();
  } else if (activeVisit.value && modalImagesList.value.length > 1) {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  }
};

const fetchFieldVisits = async () => {
  loading.value = true;
  try {
    const apiBase = BaseUrl.baseUrl || 'http://localhost:8096';
    const response = await axios.get(`${apiBase}/api/v1/field-visits`);
    if (response.data) {
      const dataItems = Array.isArray(response.data.visits)
        ? response.data.visits
        : Array.isArray(response.data)
        ? response.data
        : fallbackVisits;

      visits.value = dataItems.map(item => ({
        ...item,
        district: item.district || item.districtName || item.region || item.province,
        coverImage: item.coverImage || item.imageUrl || (Array.isArray(item.images) ? item.images[0] : null),
        images: Array.isArray(item.images) && item.images.length > 0
          ? item.images
          : (item.coverImage ? [item.coverImage] : (item.imageUrl ? [item.imageUrl] : []))
      }));
    } else {
      visits.value = fallbackVisits;
    }
  } catch (error) {
    console.warn('Failed to load field visits from backend, using fallback data:', error);
    visits.value = fallbackVisits;
  } finally {
    loading.value = false;
  }
};

const filteredVisits = computed(() => {
  if (selectedDistrict.value === 'ALL' || selectedDistrict.value === 'All Districts' || !selectedDistrict.value) {
    return visits.value;
  }
  return visits.value.filter(v => v.district === selectedDistrict.value);
});

onMounted(() => {
  fetchFieldVisits();
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('keydown', handleKeyDown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
/* ==========================================================================
   PAGE CONTAINER & HERO HEADER
   ========================================================================== */
.field-visits-page {
  padding-top: 100px; /* Space for fixed navigation bar */
  background-color: #f8fafc;
  min-height: 100vh;
}

.hero-header {
  background: linear-gradient(135deg, #004d5a 0%, #008795 100%);
  padding: 3.5rem 1rem;
  border-bottom: 5px solid #00e5ff;
}

.hero-title {
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.05rem;
  max-width: 760px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ==========================================================================
   FILTER SECTION & DROPDOWN
   ========================================================================== */
.filter-section {
  background-color: #ffffff;
  border-bottom: 1px solid rgba(226, 232, 240, 0.85);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.filter-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.filter-dropdown-area {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #475569;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  user-select: none;
}

.filter-icon {
  width: 14px;
  height: 14px;
  color: #008795;
  flex-shrink: 0;
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
  min-width: 190px;
  background-color: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 1rem;
  box-shadow: 0 12px 24px -4px rgba(15, 23, 42, 0.15);
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
  background-color: rgba(240, 253, 250, 0.85) !important;
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

.dropdown-anim-enter-active,
.dropdown-anim-leave-active {
  transition: all 0.15s ease-out;
}
.dropdown-anim-enter-from,
.dropdown-anim-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.97);
}

/* ==========================================================================
   CONTENT SECTION & CARDS
   ========================================================================== */
.content-section {
  padding-bottom: 4rem;
}

.fv-card {
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.fv-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 28px -4px rgba(0, 135, 149, 0.12), 0 4px 12px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 135, 149, 0.35);
}

/* Cover Image Box (Height 200px) */
.fv-cover-wrap {
  position: relative;
  width: 100%;
  height: 200px;
  min-height: 200px;
  max-height: 200px;
  overflow: hidden;
  background-color: #e2e8f0;
}

.fv-cover-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.fv-card:hover .fv-cover-img {
  transform: scale(1.05);
}

/* Floating Badges Over Cover Image */
.fv-floating-badges {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  z-index: 2;
}

.fv-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1.2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  white-space: nowrap;
}

.fv-badge-icon {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

.fv-badge-district {
  background: rgba(255, 255, 255, 0.95);
  color: #008795;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.fv-badge-category {
  background: rgba(15, 23, 42, 0.85);
  color: #ffffff;
  font-weight: 600;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.fv-badge-category-modal {
  background: #f1f5f9;
  color: #334155;
  font-weight: 600;
  border: 1px solid #e2e8f0;
}

/* Card Body (ONLY Title and Description) */
.fv-card-body {
  padding: 18px 20px 20px;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.fv-body-text {
  margin-bottom: 16px;
}

.fv-card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fv-card-desc {
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Card Bottom Teal Button */
.fv-card-footer {
  margin-top: auto;
}

.fv-more-btn {
  width: 100%;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #008795;
  background-color: rgba(240, 253, 250, 0.85);
  border: 1px solid rgba(153, 246, 228, 0.8);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-sizing: border-box;
}

.fv-more-btn:hover {
  background-color: #008795;
  color: #ffffff;
  border-color: #008795;
  box-shadow: 0 4px 12px rgba(0, 135, 149, 0.25);
}

.fv-btn-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* ==========================================================================
   MODAL LIGHTBOX
   ========================================================================== */
.fv-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  background-color: rgba(15, 23, 42, 0.82);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.fv-modal-dialog {
  position: relative;
  background-color: #ffffff;
  border-radius: 20px;
  width: 100%;
  max-width: 760px;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.15);
  animation: fvModalZoom 0.2s ease-out;
}

@keyframes fvModalZoom {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.fv-modal-header {
  padding: 14px 20px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8fafc;
}

.fv-modal-header-badges {
  display: flex;
  align-items: center;
  gap: 8px;
}

.fv-modal-close {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.fv-modal-close:hover {
  background-color: #fee2e2;
  color: #ef4444;
  border-color: #fca5a5;
}

.fv-close-svg {
  width: 18px;
  height: 18px;
}

/* Modal Info */
.fv-modal-info {
  padding: 14px 20px 10px;
  background-color: #ffffff;
}

.fv-modal-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 4px 0;
  line-height: 1.35;
}

.fv-modal-desc {
  font-size: 0.78rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Central Viewport (Height 380px) */
.fv-modal-viewport {
  position: relative;
  width: 100%;
  height: 380px;
  min-height: 380px;
  max-height: 380px;
  background-color: #070d17;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
}

.fv-modal-main-img {
  max-height: 380px;
  max-width: 100%;
  width: auto;
  height: 100%;
  object-fit: contain;
  display: block;
}

.fv-modal-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.55);
  color: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.15s;
  z-index: 10;
  padding: 0;
}

.fv-modal-nav:hover {
  background-color: rgba(0, 135, 149, 0.9);
  transform: translateY(-50%) scale(1.08);
}

.fv-modal-nav-prev {
  left: 14px;
}

.fv-modal-nav-next {
  right: 14px;
}

.fv-nav-svg {
  width: 20px;
  height: 20px;
}

.fv-modal-counter {
  position: absolute;
  bottom: 12px;
  right: 14px;
  padding: 4px 10px;
  border-radius: 9999px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  backdrop-filter: blur(4px);
  z-index: 10;
}

/* Modal Thumbnails */
.fv-modal-thumbs {
  padding: 12px 18px;
  background-color: #f8fafc;
  border-top: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  box-sizing: border-box;
}

.fv-modal-thumb-btn {
  position: relative;
  width: 70px;
  height: 50px;
  min-width: 70px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
  background-color: #cbd5e1;
  opacity: 0.6;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.fv-modal-thumb-btn:hover {
  opacity: 1;
  transform: scale(1.02);
}

.fv-modal-thumb-btn.fv-thumb-active {
  border-color: #008795;
  opacity: 1;
  box-shadow: 0 0 0 2px rgba(0, 135, 149, 0.35);
}

.fv-modal-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Modal Transition */
.fv-modal-fade-enter-active,
.fv-modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.fv-modal-fade-enter-from,
.fv-modal-fade-leave-to {
  opacity: 0;
}

/* ==========================================================================
   LOADING & EMPTY STATES
   ========================================================================== */
.fv-loading-box,
.fv-empty-box {
  text-align: center;
  padding: 4rem 1rem;
}

.fv-spinner {
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid rgba(0, 135, 149, 0.2);
  border-radius: 50%;
  border-top-color: #008795;
  animation: fvSpin 0.8s linear infinite;
  margin-bottom: 1rem;
}

@keyframes fvSpin {
  to {
    transform: rotate(360deg);
  }
}

.fv-loading-text {
  color: #64748b;
  font-size: 1rem;
  font-weight: 500;
}

.fv-empty-icon-wrap {
  margin-bottom: 1rem;
}

.fv-empty-icon {
  width: 48px;
  height: 48px;
  color: #94a3b8;
  opacity: 0.6;
}

.fv-empty-title {
  color: #334155;
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.fv-empty-desc {
  color: #64748b;
  font-size: 0.85rem;
  margin-bottom: 1.25rem;
}

.fv-empty-btn {
  background-color: #008795;
  color: #ffffff;
  border: none;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.55rem 1.4rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.fv-empty-btn:hover {
  background-color: #006b77;
}

/* ==========================================================================
   RESPONSIVE DESIGN
   ========================================================================== */
@media (max-width: 640px) {
  .hero-title {
    font-size: 1.85rem;
  }
  .hero-subtitle {
    font-size: 0.95rem;
  }
  .filter-container {
    justify-content: center;
  }
  .fv-modal-viewport {
    height: 260px;
    min-height: 260px;
    max-height: 260px;
  }
  .fv-modal-main-img {
    max-height: 260px;
  }
  .fv-modal-dialog {
    max-height: 95vh;
    border-radius: 14px;
  }
}
</style>
