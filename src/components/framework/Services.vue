<template>
  <div class="services-page">
    <!-- Hero Header -->
    <section class="hero-header">
      <div class="container text-center">
        <h1 class="hero-title">Development Financing Schemes</h1>
        <p class="hero-subtitle">
          Empowering enterprises and priority sectors through concessionary credit lines and interest subsidy schemes.
        </p>
      </div>
    </section>

    <!-- Filter Header -->
    <section class="filter-section py-3 bg-light shadow-sm mb-5">
      <div
        class="container d-flex justify-content-between align-items-center flex-wrap gap-2"
      >
        <div class="results-meta-info text-muted small fw-semibold">
          Showing <span class="text-teal fw-bold">{{ filteredServices.length }}</span> scheme{{ filteredServices.length === 1 ? '' : 's' }}
          <span v-if="searchQuery" class="badge bg-teal-light text-teal ms-1">
            matching "{{ searchQuery }}"
          </span>
          <span v-if="selectedCategory !== 'ALL'" class="badge bg-secondary-subtle text-dark ms-1">
            in {{ selectedCategoryLabel }}
          </span>
        </div>

        <div class="d-flex align-items-center gap-3">
          <button
            v-if="searchQuery || selectedCategory !== 'ALL'"
            type="button"
            class="btn btn-sm btn-outline-secondary rounded-pill px-3"
            @click="resetFilters"
          >
            Reset Filters
          </button>

          <!-- Category Filter Custom Dropdown -->
          <div class="filter-dropdown-area">
          <div class="filter-label">
            <svg class="filter-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clip-rule="evenodd"
              />
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
              class="dropdown-btn border border-[#008795]/40 text-slate-700 text-xs font-semibold py-2 px-4 rounded-full shadow-xs hover:border-[#008795] cursor-pointer"
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
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Floating Menu -->
            <transition name="dropdown-anim">
              <div
                v-if="isCategoryDropdownOpen"
                class="dropdown-menu-list absolute right-0 mt-1 min-w-[230px] bg-white border border-slate-100 rounded-2xl shadow-xl p-1.5 z-50 overflow-hidden"
              >
                <button
                  v-for="cat in categoryOptions"
                  :key="cat.value"
                  type="button"
                  class="dropdown-item"
                  :class="{
                    'item-selected bg-teal-50/80 text-[#008795]':
                      selectedCategory === cat.value,
                  }"
                  @click="selectCategory(cat.value)"
                >
                  <span class="item-label-group">
                    <span
                      v-if="selectedCategory === cat.value"
                      class="active-dot bg-[#008795]"
                    ></span>
                    <span>{{ cat.label }}</span>
                  </span>
                  <svg
                    v-if="selectedCategory === cat.value"
                    class="check-icon text-[#008795]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </div>
            </transition>
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

        <!-- Active Services Grid -->
        <div
          class="services-grid flex flex-wrap justify-center gap-6 animate-fade-up"
          v-if="activeSchemes.length > 0"
        >
          <div
            class="service-card flex flex-col h-full w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[300px]"
            v-for="service in activeSchemes"
            :key="service.id || service.title"
          >
            <div class="card-glass group flex flex-col justify-between h-full p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-teal-400/60 transition-all duration-300 relative">
              <!-- Non-Loan Facility OTHER Pill Badge (Clean - no Active badge on regular active cards) -->
              <div v-if="isOtherFacility(service)" class="other-badge-wrapper">
                <span class="badge-other">
                  OTHER
                </span>
              </div>

              <!-- 1. Top circular teal icon -->
              <div class="service-icon-box w-14 h-14 mx-auto" :class="{ 'mt-2': !isOtherFacility(service) }">
                <i :class="service.icon || (isOtherFacility(service) ? 'fas fa-warehouse' : 'fas fa-hand-holding-usd')"></i>
              </div>

              <!-- 2. Scheme / Service Title -->
              <h3 class="card-title text-lg font-bold text-slate-900 text-center min-h-[52px] flex items-center justify-center mt-4">
                {{ service.title }}
              </h3>

              <!-- 3. Clean short description -->
              <p class="card-description text-sm text-slate-500 text-center line-clamp-3 min-h-[60px] my-4 leading-relaxed">
                {{ service.description }}
              </p>

              <!-- 4. Bottom Action Button (Active & Clickable) -->
              <router-link
                :to="getSchemeLink(service)"
                class="scheme-action-btn mt-auto whitespace-nowrap bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white rounded-xl py-2.5 px-4 font-medium text-sm transition-all flex items-center justify-center gap-2 mx-auto w-full max-w-[200px] group/btn"
              >
                <span>{{ isOtherFacility(service) ? 'View Service Details' : 'View Scheme Details' }}</span>
                <span class="btn-arrow transition-transform duration-200 group-hover/btn:translate-x-1.5 group-hover:translate-x-1.5">&rarr;</span>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Separate Section for Coming Soon Schemes -->
        <div
          v-if="comingSoonSchemes.length > 0"
          class="upcoming-schemes-wrapper animate-fade-up"
        >
          <!-- Section Divider & Header -->
          <div class="upcoming-header">
            <h2 class="upcoming-title">
              Upcoming Schemes
            </h2>
            <div class="upcoming-title-underline"></div>
          </div>

          <!-- Coming Soon Cards Grid -->
          <div class="services-grid flex flex-wrap justify-center gap-6">
            <div
              class="service-card flex flex-col h-full w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[300px]"
              v-for="service in comingSoonSchemes"
              :key="service.id || service.title"
            >
              <div class="card-glass group flex flex-col justify-between h-full p-6 rounded-2xl bg-white border border-amber-200/70 shadow-sm relative transition-all duration-300">
                <!-- Top Badges: Sleek soft-teal/amber rounded pill badge (+ OTHER if applicable) -->
                <div class="upcoming-card-badges">
                  <span class="badge-coming-soon">
                    COMING SOON
                  </span>
                  <span v-if="isOtherFacility(service)" class="badge-other">
                    OTHER
                  </span>
                </div>

                <!-- 1. Scheme Icon -->
                <div class="service-icon-box w-14 h-14 mx-auto bg-gradient-to-br from-amber-500 to-teal-600 shadow-amber-500/20">
                  <i :class="service.icon || (isOtherFacility(service) ? 'fas fa-warehouse' : 'fas fa-hand-holding-usd')"></i>
                </div>

                <!-- 2. Scheme / Service Title -->
                <h3 class="card-title text-lg font-bold text-slate-900 text-center min-h-[52px] flex items-center justify-center mt-4">
                  {{ service.title }}
                </h3>

                <!-- 3. Clean Short Description -->
                <p class="card-description text-sm text-slate-500 text-center line-clamp-3 min-h-[60px] my-4 leading-relaxed">
                  {{ service.description }}
                </p>

                <!-- 4. Disabled, Non-Clickable Button -->
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  class="scheme-action-btn-disabled mt-auto whitespace-nowrap bg-slate-100 text-slate-400 border border-slate-200 rounded-xl py-2.5 px-4 font-semibold text-sm cursor-not-allowed pointer-events-none flex items-center justify-center gap-2 mx-auto w-full max-w-[200px]"
                  title="Scheme details will be available upon official launch"
                >
                  <span>{{ isOtherFacility(service) ? 'View Service Details' : 'View Scheme Details' }}</span>
                  <span class="btn-arrow">&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div class="text-center py-5" v-else-if="activeSchemes.length === 0 && comingSoonSchemes.length === 0">
          <div class="mb-4">
            <i class="fas fa-folder-open fa-3x text-muted opacity-50"></i>
          </div>
          <h4 class="text-muted">No schemes found matching your search.</h4>
          <p class="text-muted small" v-if="searchQuery">
            We couldn't find any loan schemes matching "{{ searchQuery }}".
          </p>
          <button class="btn btn-teal text-white mt-2 px-4 rounded-pill" @click="resetFilters">
            Clear Filters &amp; Show All
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import BaseUrl from "../../services/baseURL";
import { servicesData } from "../../data/servicesData";
import {
  navbarSearchState,
  clearNavbarSearch,
  setNavbarSearchQuery
} from "../../services/navbarSearchState";

const route = useRoute();
const searchQuery = computed({
  get() {
    return navbarSearchState.query;
  },
  set(val) {
    setNavbarSearchQuery(val);
  }
});

const selectedCategory = ref("ALL");
const isCategoryDropdownOpen = ref(false);
const categoryDropdownRef = ref(null);
const services = ref([]);
const loading = ref(false);

const getSchemeStatus = (service) => {
  if (!service) return 'ACTIVE';
  if (service.status && typeof service.status === 'string') {
    const s = service.status.trim().toUpperCase();
    if (['ACTIVE', 'COMING_SOON', 'DRAFT'].includes(s)) return s;
  }
  return service.active !== false ? 'ACTIVE' : 'DRAFT';
};

const isOtherFacility = (service) => {
  if (!service) return false;
  const type = (service.schemeType || '').toUpperCase();
  if (type === 'SERVICE' || type === 'OTHER') return true;
  if (service.category === 'Preservation & Storage') return true;
  if (typeof service.title === 'string' && service.title.toLowerCase().includes('preservation & silo')) return true;
  return false;
};

const categoryOptions = computed(() => {
  const standard = [
    { label: "All Schemes", value: "ALL" },
    { label: "Interest Subsidy Loan Schemes", value: "Interest Subsidy Loan Schemes" },
    { label: "MSME Revitalization", value: "MSME Revitalization" },
    { label: "Agriculture & Livestock", value: "Agriculture & Livestock" },
    { label: "Green Energy", value: "Green Energy" },
    { label: "Preservation & Storage", value: "Preservation & Storage" },
  ];
  const dynamic = services.value
    .map((s) => s.category)
    .filter((c) => c && !standard.some((st) => st.value === c));
  const uniqueDynamic = [...new Set(dynamic)].map((c) => ({ label: c, value: c }));

  return [...standard, ...uniqueDynamic];
});

const selectedCategoryLabel = computed(() => {
  const match = categoryOptions.value.find(
    (opt) => opt.value === selectedCategory.value,
  );
  return match ? match.label : "All Schemes";
});

const toggleCategoryDropdown = () => {
  isCategoryDropdownOpen.value = !isCategoryDropdownOpen.value;
};

const selectCategory = (val) => {
  selectedCategory.value = val;
  isCategoryDropdownOpen.value = false;
};

const resetFilters = () => {
  clearNavbarSearch();
  selectedCategory.value = "ALL";
  isCategoryDropdownOpen.value = false;
};

const handleClickOutside = (event) => {
  if (
    categoryDropdownRef.value &&
    !categoryDropdownRef.value.contains(event.target)
  ) {
    isCategoryDropdownOpen.value = false;
  }
};

const getSchemeLink = (service) => {
  return `/services/${service.id}`;
};

const fetchActiveSchemes = async () => {
  loading.value = true;
  try {
    const apiBase = BaseUrl.baseUrl || "http://localhost:8096";
    const response = await axios.get(`${apiBase}/api/schemes/public`);
    if (Array.isArray(response.data) && response.data.length > 0) {
      services.value = response.data;
    } else {
      services.value = servicesData;
    }
  } catch (error) {
    console.warn("Failed to fetch active schemes, falling back to servicesData:", error);
    services.value = servicesData;
  } finally {
    loading.value = false;
  }
};

const filteredServices = computed(() => {
  let list = services.value;
  if (!list || list.length === 0) {
    list = servicesData;
  }

  // Exclude DRAFT schemes from public view
  list = list.filter((s) => getSchemeStatus(s) !== 'DRAFT');

  // Category filter
  if (
    selectedCategory.value &&
    selectedCategory.value !== "ALL" &&
    selectedCategory.value !== "All Schemes"
  ) {
    list = list.filter((s) => s.category === selectedCategory.value);
  }

  // Navbar search query filter
  const query = (searchQuery.value || "").trim().toLowerCase();
  if (!query) return list;

  return list.filter((s) => {
    const title = (s.title || "").toLowerCase();
    const desc = (s.description || "").toLowerCase();
    const cat = (s.category || "").toLowerCase();
    const maxAmt = (s.maxAmount || s.maxLoan || "").toLowerCase();
    const rate = (s.interestRate || "").toLowerCase();
    const obj = (s.objective || "").toLowerCase();
    const banks = Array.isArray(s.participatingBanks)
      ? s.participatingBanks.join(" ").toLowerCase()
      : "";

    return (
      title.includes(query) ||
      desc.includes(query) ||
      cat.includes(query) ||
      maxAmt.includes(query) ||
      rate.includes(query) ||
      obj.includes(query) ||
      banks.includes(query)
    );
  });
});

const activeSchemes = computed(() => {
  return filteredServices.value.filter((s) => getSchemeStatus(s) === 'ACTIVE');
});

const comingSoonSchemes = computed(() => {
  return filteredServices.value.filter((s) => getSchemeStatus(s) === 'COMING_SOON');
});

onMounted(() => {
  if (route?.query?.q) {
    setNavbarSearchQuery(String(route.query.q));
  }
  fetchActiveSchemes();
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  clearNavbarSearch();
});
</script>

<style scoped>
.services-page {
  font-family: "Open Sans", sans-serif;
  color: #102741;
  background: #f8f9fa;
  min-height: 100vh;
  padding-top: 100px;
}

.hero-header {
  background: linear-gradient(135deg, #004d5a 0%, #008795 100%);
  padding: 3.8rem 0;
  border-bottom: 5px solid #00e5ff;
}

.hero-title {
  color: white;
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

/* Custom Dropdown Filter Matching PublicationsView */
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
  margin-top: 0.5rem;
  min-width: 230px;
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

/* Services Section */
.services-section {
  padding-bottom: 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Services Grid - Centered Flexbox Layout */
.services-grid {
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: center !important;
  gap: 1.5rem !important; /* gap-6: 24px */
}

.service-card {
  perspective: 1000px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 300px;
  flex: 0 0 auto;
}

@media (min-width: 640px) {
  .service-card {
    width: calc(50% - 1rem);
  }
}

@media (min-width: 1024px) {
  .service-card {
    width: calc(25% - 1.5rem);
    max-width: 300px;
  }
}

.card-glass {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.service-card:hover .card-glass,
.card-glass:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  border-color: rgba(45, 212, 191, 0.6);
}

/* 1. Top Circular Teal Icon */
.service-icon-box {
  width: 56px;
  height: 56px;
  background: #008795;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(0, 135, 149, 0.2);
  transition: all 0.3s ease;
  margin-left: auto;
  margin-right: auto;
}

.service-icon-box i {
  color: #ffffff;
  font-size: 22px;
  transition: transform 0.3s ease;
}

.service-card:hover .service-icon-box {
  transform: translateY(-4px);
  background: #00a0b0;
}

.service-card:hover .service-icon-box i {
  transform: scale(1.15);
}

/* 2. Scheme / Service Title */
.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 0;
  line-height: 1.35;
}

/* 3. Clean Short Description */
.card-description {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.625;
  text-align: center;
  min-height: 60px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 4. Bottom Action Button */
.scheme-action-btn {
  background-color: #f0fdfa;
  color: #0f766e;
  border-radius: 0.75rem;
  padding: 0.625rem 1rem;
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0;
  width: 100%;
  max-width: 200px;
  border: 1px solid rgba(45, 212, 191, 0.3);
  white-space: nowrap;
}

.scheme-action-btn:hover {
  background-color: #0d9488;
  color: #ffffff;
  border-color: #0d9488;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25);
}

.scheme-action-btn .btn-arrow {
  display: inline-block;
  transition: transform 0.2s ease;
}

.scheme-action-btn:hover .btn-arrow,
.card-glass:hover .scheme-action-btn .btn-arrow {
  transform: translateX(4px);
}

.scheme-action-btn-disabled {
  background-color: #f1f5f9 !important;
  color: #94a3b8 !important;
  border: 1px solid #e2e8f0 !important;
  cursor: not-allowed !important;
  pointer-events: none !important;
  border-radius: 0.75rem;
  padding: 0.625rem 1rem;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0;
  width: 100%;
  max-width: 200px;
}

/* Upcoming Schemes Section Header */
.upcoming-schemes-wrapper {
  width: 100%;
}

.upcoming-header {
  text-align: center;
  margin-top: 3.5rem;
  margin-bottom: 2rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 2.5rem;
}

.upcoming-title {
  color: #008294;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0;
  line-height: 1.3;
}

.upcoming-title-underline {
  width: 44px;
  height: 3px;
  background-color: #008294;
  border-radius: 9999px;
  margin: 10px auto 0;
}

/* Badges for Cards */
.upcoming-card-badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 14px;
}

.badge-coming-soon {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  background-color: #f0fdfa;
  color: #0f766e;
  border: 1px solid #99f6e4;
  line-height: 1.2;
  text-transform: uppercase;
}

.other-badge-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.badge-other {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background-color: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
  line-height: 1.2;
}

.service-card:hover .service-icon-box {
  transform: translateY(-5px);
  background: #00a0b0;
}

.service-card:hover .service-icon-box i {
  transform: scale(1.15);
}

.badge {
  font-size: 0.8rem;
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .services-page {
    padding-top: 80px;
  }
}

@media (max-width: 576px) {
  .card-glass {
    padding: 25px 20px;
  }
}
</style>
