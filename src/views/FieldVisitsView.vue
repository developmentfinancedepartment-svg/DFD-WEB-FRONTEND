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
    <section class="filter-section py-3 bg-light shadow-sm mb-5">
      <div class="container d-flex justify-content-center justify-content-md-end align-items-center">
        <!-- Region Filter Custom Dropdown -->
        <div class="filter-dropdown-area">
          <div class="filter-label">
            <svg class="filter-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
            </svg>
            <span>Region:</span>
          </div>

          <div ref="regionDropdownRef" class="custom-dropdown">
            <!-- Trigger Button -->
            <button
              type="button"
              class="dropdown-btn bg-white border border-[#008795]/40 text-slate-700 text-xs font-semibold py-2 px-4 rounded-full shadow-xs hover:border-[#008795] cursor-pointer"
              :class="{ 'dropdown-btn-open': isRegionDropdownOpen }"
              @click="toggleRegionDropdown"
            >
              <span>{{ selectedRegionLabel }}</span>
              <svg
                class="chevron-icon text-[#008795]"
                :class="{ 'rotate-180': isRegionDropdownOpen }"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Floating Menu -->
            <transition name="dropdown-anim">
              <div
                v-if="isRegionDropdownOpen"
                class="dropdown-menu-list absolute right-0 mt-2 min-w-[190px] bg-white border border-slate-100 rounded-2xl shadow-xl p-1.5 z-50 overflow-hidden"
              >
                <button
                  v-for="region in regionOptions"
                  :key="region.value"
                  type="button"
                  class="dropdown-item"
                  :class="{ 'item-selected bg-teal-50/80 text-[#008795]': selectedRegion === region.value }"
                  @click="selectRegion(region.value)"
                >
                  <span class="item-label-group">
                    <span
                      v-if="selectedRegion === region.value"
                      class="active-dot bg-[#008795]"
                    ></span>
                    <span>{{ region.label }}</span>
                  </span>
                  <svg
                    v-if="selectedRegion === region.value"
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

    <!-- Content Section -->
    <section class="content-section pb-5">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-teal mb-3" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h5 class="text-muted">Loading field visits...</h5>
        </div>

        <!-- Visits Grid -->
        <div class="row g-4" v-else-if="filteredVisits.length > 0">
          <div 
            class="col-md-6 col-lg-4" 
            v-for="visit in filteredVisits" 
            :key="visit.id || visit.title"
          >
            <div class="card h-100 visit-card border-0 shadow-sm">
              <div class="card-body p-4 d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <div class="location-badge bg-teal-light text-teal rounded px-3 py-2">
                    <i class="fas fa-map-marker-alt me-1"></i> {{ visit.region || visit.province }}
                  </div>
                  <span class="badge bg-secondary text-white rounded-pill px-3 py-2">
                    {{ visit.schemeType || visit.scheme }}
                  </span>
                </div>
                
                <h5 class="card-title fw-bold text-dark-teal mb-3">{{ visit.title }}</h5>
                <p class="card-text text-muted mb-4 flex-grow-1">{{ visit.description || visit.overview }}</p>
                
                <div v-if="getTakeaways(visit).length > 0" class="takeaways-box bg-light rounded p-3 mt-auto">
                  <h6 class="fw-bold mb-3 small text-uppercase text-muted">Key Takeaways</h6>
                  <ul class="list-unstyled mb-0">
                    <li v-for="(takeaway, idx) in getTakeaways(visit)" :key="idx" class="d-flex align-items-start mb-2">
                      <i class="fas fa-check-circle text-success mt-1 me-2"></i>
                      <span class="small">{{ takeaway }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- No Results -->
        <div class="text-center py-5" v-else>
          <div class="mb-4">
            <i class="fas fa-map-marked-alt fa-3x text-muted opacity-50"></i>
          </div>
          <h4 class="text-muted">No field visits recorded for this region.</h4>
          <button class="btn btn-teal text-white mt-3 px-4" @click="selectRegion('All Regions')">Show All Regions</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import BaseUrl from '@/services/baseURL';

const regionOptions = [
  { label: 'All Regions', value: 'All Regions' },
  { label: 'Central', value: 'Central' },
  { label: 'North Western', value: 'North Western' },
  { label: 'Eastern', value: 'Eastern' },
  { label: 'Southern', value: 'Southern' }
];

const selectedRegion = ref('All Regions');
const isRegionDropdownOpen = ref(false);
const regionDropdownRef = ref(null);
const visits = ref([]);
const loading = ref(false);

const selectedRegionLabel = computed(() => {
  const match = regionOptions.find(opt => opt.value === selectedRegion.value);
  return match ? match.label : 'All Regions';
});

const toggleRegionDropdown = () => {
  isRegionDropdownOpen.value = !isRegionDropdownOpen.value;
};

const selectRegion = (region) => {
  selectedRegion.value = region;
  isRegionDropdownOpen.value = false;
};

const handleClickOutside = (event) => {
  if (regionDropdownRef.value && !regionDropdownRef.value.contains(event.target)) {
    isRegionDropdownOpen.value = false;
  }
};

const fallbackVisits = [
  {
    id: 1,
    title: 'Dairy Farming Cooperative Inspection',
    region: 'Central',
    schemeType: 'SME Loan',
    description: 'Site visit to Nuwara Eliya evaluating the structural improvements made to dairy storage facilities using recently disbursed SME loan funds.',
    keyTakeaways: 'Facility expanded by 30%\nMilk production increased by 500L/day\nSuccessfully onboarded 12 new farmers'
  },
  {
    id: 2,
    title: 'Women Entrepreneurs Handloom Project',
    region: 'Eastern',
    schemeType: 'Microfinance',
    description: 'Monitoring the utilization of micro-credit grants by a women\'s cooperative in Batticaloa specializing in traditional handloom exports.',
    keyTakeaways: 'Purchased 15 new loom machines\nSecured direct export channel to Europe\nCreated 20 new female jobs locally'
  },
  {
    id: 3,
    title: 'Fisheries Equipment Upgrade Review',
    region: 'Southern',
    schemeType: 'Commercial Agriculture',
    description: 'Evaluating a commercial agriculture loan utilized by a fishing fleet in Galle to upgrade navigation and deep-sea fishing equipment.',
    keyTakeaways: 'Installed advanced GPS in 5 boats\nReduced fuel wastage by 15%\nDaily catch increased by 400kg'
  },
  {
    id: 4,
    title: 'Organic Fertilizer Plant Assessment',
    region: 'North Western',
    schemeType: 'Green Finance',
    description: 'Routine progress check at a new organic fertilizer manufacturing plant in Kurunegala supported under the national Green Finance initiative.',
    keyTakeaways: 'Plant operating at 80% capacity\nZero-waste mechanism fully implemented\nSupplying 50+ local farms'
  }
];

const getTakeaways = (visit) => {
  if (Array.isArray(visit.takeaways) && visit.takeaways.length > 0) {
    return visit.takeaways;
  }
  if (!visit.keyTakeaways) return [];
  return visit.keyTakeaways
    .split('\n')
    .map(line => line.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean);
};

const fetchFieldVisits = async () => {
  loading.value = true;
  try {
    const apiBase = BaseUrl.baseUrl || 'http://localhost:8096';
    const response = await axios.get(`${apiBase}/api/v1/field-visits`);
    if (response.data) {
      if (Array.isArray(response.data.visits)) {
        visits.value = response.data.visits;
      } else if (Array.isArray(response.data)) {
        visits.value = response.data;
      } else {
        visits.value = fallbackVisits;
      }
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
  if (selectedRegion.value === 'All' || selectedRegion.value === 'All Regions' || !selectedRegion.value) {
    return visits.value;
  }
  return visits.value.filter(v => (v.region || v.province) === selectedRegion.value);
});

onMounted(() => {
  fetchFieldVisits();
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.field-visits-page {
  /* Push down due to fixed header */
  padding-top: 100px;
  background-color: #f8f9fa;
  min-height: 100vh;
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

.text-dark-teal {
  color: #0c2a38;
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

.visit-card {
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.visit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
}

.location-badge {
  font-weight: 600;
  font-size: 0.9rem;
}

.takeaways-box {
  border-left: 3px solid #007c91;
}

/* Custom Dropdown Filter Matching Standardized Teal Filter Selector */
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
  margin-top: 0.5rem;
  min-width: 190px;
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
</style>
