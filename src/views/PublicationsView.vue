<template>
  <div class="publications-page">
    <!-- Hero Header -->
    <header class="hero-header">
      <div class="pub-container text-center">
        <h1 class="hero-title">Action Plans & Publications</h1>
        <p class="hero-subtitle">
          Official strategic frameworks, institutional reports, and annual action plans of the Department of Development Finance.
        </p>
      </div>
    </header>

    <!-- Filter Section -->
    <section class="pub-filter-bar">
      <div class="pub-container filter-flex-wrapper">
        <div class="filter-left-space"></div>

        <!-- Year Filter Custom Dropdown -->
        <div class="filter-dropdown-area">
          <div class="filter-label">
            <svg class="filter-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
            </svg>
            <span>FILTER YEAR:</span>
          </div>

          <div ref="dropdownRef" class="custom-dropdown">
            <button
              type="button"
              class="dropdown-btn"
              :class="{ 'dropdown-btn-open': isOpen }"
              @click="toggleDropdown"
            >
              <span>{{ selectedYearLabel }}</span>
              <svg
                class="chevron-icon"
                :class="{ 'rotate-180': isOpen }"
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
              <div v-if="isOpen" class="dropdown-menu-list">
                <button
                  v-for="item in yearOptions"
                  :key="item.value"
                  type="button"
                  class="dropdown-item"
                  :class="{ 'item-selected': selectedYear === item.value }"
                  @click="selectYear(item.value)"
                >
                  <span class="item-label-group">
                    <span v-if="selectedYear === item.value" class="active-dot"></span>
                    <span>{{ item.label }}</span>
                  </span>
                  <svg
                    v-if="selectedYear === item.value"
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

    <!-- Document Section -->
    <main class="pub-content-section">
      <div class="pub-container">
        <!-- Loading -->
        <div v-if="isLoading" class="state-container">
          <div class="loader-spinner"></div>
          <p class="state-text">Loading publications & action plans...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="state-container">
          <i class="fas fa-exclamation-triangle state-icon-warning"></i>
          <h4 class="state-text">{{ error }}</h4>
          <button class="btn-solid-teal" @click="fetchPublications">Try Again</button>
        </div>

        <!-- Publications Grid -->
        <div v-else-if="filteredPublications.length > 0" class="cards-grid">
          <div 
            v-for="doc in filteredPublications" 
            :key="doc.id" 
            class="doc-card"
          >
            <!-- Top Glow Accent -->
            <div class="card-glow-bar"></div>

            <!-- Top Content Block -->
            <div class="card-top-block">
              <!-- Header Row: PDF Box (Left) & Year Badge (Right) -->
              <div class="card-header-row">
                <div class="pdf-icon-box">
                  <i class="fas fa-file-pdf"></i>
                </div>
                <span class="year-pill-badge">{{ doc.year }}</span>
              </div>

              <!-- Title -->
              <h3 class="card-title" :title="doc.title">{{ doc.title }}</h3>

              <!-- Description -->
              <p class="card-desc">{{ doc.description }}</p>
            </div>

            <!-- Bottom Anchored Block -->
            <div class="card-bottom-block">
              <!-- Meta Divider Row -->
              <div class="card-meta-row">
                <span class="meta-item">
                  <i class="far fa-calendar-alt"></i> {{ doc.releaseDate }}
                </span>
                <span class="meta-item">
                  <i class="fas fa-hdd"></i> {{ doc.fileSize || doc.size || 'PDF' }}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="card-actions-grid">
                <a 
                  :href="getPdfUrl(doc)" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-action btn-view"
                >
                  <i class="fas fa-eye"></i>
                  <span>View Online</span>
                </a>
                <a 
                  :href="getDownloadUrl(doc)" 
                  :download="doc.fileName || (doc.title + '.pdf')" 
                  class="btn-action btn-download"
                >
                  <i class="fas fa-download"></i>
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty Results -->
        <div v-else class="state-container">
          <i class="fas fa-search state-icon-empty"></i>
          <h4 class="state-text">No publications found matching your criteria.</h4>
          <p class="state-subtext">Try selecting a different year filter.</p>
          <button class="btn-solid-teal" @click="resetFilters">Reset Filters</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import BaseUrl from '@/services/baseURL';

const publications = ref([]);
const isLoading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const selectedYear = ref('All');
const isOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const selectYear = (year) => {
  selectedYear.value = year;
  isOpen.value = false;
  handleYearChange();
};

const selectedYearLabel = computed(() => {
  return selectedYear.value === 'All' ? 'All Years' : selectedYear.value;
});

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

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

// Dynamically generate filter year options from returned dataset (fallback to 2026, 2025, 2024 if empty)
const availableYears = computed(() => {
  const datasetYears = publications.value
    .map(p => String(p.year || '').trim())
    .filter(y => y.length > 0);

  const baseYears = ['2026', '2025', '2024'];
  const uniqueYears = Array.from(
    new Set([
      ...baseYears,
      ...datasetYears
    ])
  ).sort((a, b) => b.localeCompare(a)); // Sort in descending order (e.g. 2026, 2025, 2024)

  return ['All', ...uniqueYears];
});

const yearOptions = computed(() => {
  return availableYears.value.map(y => ({
    value: y,
    label: y === 'All' ? 'All Years' : y
  }));
});

const handleYearChange = (event) => {
  if (event && event.target) {
    selectedYear.value = event.target.value;
  }
};

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
  isOpen.value = false;
};

onMounted(() => {
  fetchPublications();
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Base Page & Container */
.pub-page {
  width: 100%;
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: inherit;
  color: #1e293b;
}

.pub-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 1.5rem;
  box-sizing: border-box;
}

.text-center {
  text-align: center;
}

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

/* Filter Bar */
.pub-filter-bar {
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.filter-flex-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter-dropdown-area {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
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

/* Custom Dropdown Component */
.custom-dropdown {
  position: relative;
  min-width: 140px;
}

.dropdown-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  background-color: #ffffff;
  border: 1px solid rgba(0, 135, 149, 0.35);
  color: #334155;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
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
}

.rotate-180 {
  transform: rotate(180deg);
}

.dropdown-menu-list {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.4rem;
  width: 100%;
  min-width: 150px;
  background-color: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 1rem;
  box-shadow: 0 12px 24px -4px rgba(15, 23, 42, 0.12);
  padding: 0.35rem;
  z-index: 100;
  box-sizing: border-box;
}

.dropdown-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.85rem;
  border-radius: 0.65rem;
  border: none;
  background: transparent;
  font-size: 0.78rem;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s ease;
}

.dropdown-item:hover {
  background-color: #f8fafc;
  color: #0f172a;
}

.item-selected {
  background-color: #f0fdfa !important;
  color: #008795 !important;
}

.item-label-group {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.active-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #008795;
}

.check-icon {
  width: 14px;
  height: 14px;
  color: #008795;
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

/* Content & Cards Grid */
.pub-content-section {
  padding: 2.5rem 0 4rem 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .cards-grid {
    grid-template-grid: repeat(2, minmax(0, 1fr));
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

/* Card Styling */
.doc-card {
  background-color: #ffffff;
  border-radius: 1.5rem;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 330px;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  box-sizing: border-box;
}

.doc-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 28px -6px rgba(0, 135, 149, 0.12);
  border-color: rgba(0, 135, 149, 0.4);
}

.card-glow-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #2dd4bf, #008795, #10b981);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.doc-card:hover .card-glow-bar {
  opacity: 1;
}

/* Top Block */
.card-top-block {
  width: 100%;
}

.card-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
}

.pdf-icon-box {
  width: 46px;
  height: 46px;
  border-radius: 1rem;
  background-color: #fff1f2;
  border: 1px solid #ffe4e6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e11d48;
  font-size: 1.25rem;
  box-shadow: 0 1px 2px rgba(225, 29, 72, 0.06);
  flex-shrink: 0;
}

.year-pill-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 700;
  background-color: #f0fdfa;
  color: #008795;
  border: 1px solid #ccfbf1;
  flex-shrink: 0;
}

.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
  margin: 0 0 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s ease;
}

.doc-card:hover .card-title {
  color: #008795;
}

.card-desc {
  font-size: 0.78rem;
  color: #64748b;
  line-height: 1.55;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Bottom Block */
.card-bottom-block {
  width: 100%;
  margin-top: 1.5rem;
}

.card-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f1f5f9;
  padding: 0.65rem 0;
  margin-bottom: 0.85rem;
  font-size: 0.72rem;
  font-weight: 500;
  color: #94a3b8;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

/* Action Buttons */
.card-actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
  width: 100%;
}

.btn-action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.btn-view {
  background-color: #f0fdfa;
  color: #008795;
  border: 1px solid rgba(0, 135, 149, 0.25);
}

.btn-view:hover {
  background-color: #ccfbf1;
  border-color: #008795;
}

.btn-download {
  background: linear-gradient(135deg, #008795 0%, #006b77 100%);
  color: #ffffff;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 135, 149, 0.2);
}

.btn-download:hover {
  background: linear-gradient(135deg, #007784 0%, #005a63 100%);
  box-shadow: 0 4px 8px rgba(0, 135, 149, 0.3);
}

/* Common State Screens */
.state-container {
  text-align: center;
  padding: 3.5rem 1rem;
}

.state-text {
  color: #64748b;
  margin: 0.5rem 0;
}

.state-subtext {
  font-size: 0.85rem;
  color: #94a3b8;
  margin: 0 0 1rem 0;
}

.state-icon-warning {
  font-size: 2.5rem;
  color: #f59e0b;
  margin-bottom: 0.75rem;
}

.state-icon-empty {
  font-size: 2.5rem;
  color: #cbd5e1;
  margin-bottom: 0.75rem;
}

.loader-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e2e8f0;
  border-top-color: #008795;
  border-radius: 50%;
  margin: 0 auto 1rem auto;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.btn-solid-teal {
  background-color: #008795;
  color: #ffffff;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
}
</style>
