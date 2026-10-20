<template>
  <div class="field-visits-page">
    <!-- Hero Header -->
    <section class="hero-header">
      <div class="container text-center">
        <h1 class="hero-title">Field Visits &amp; Progress Monitoring</h1>
        <p class="hero-subtitle">On-ground tracking of development finance initiatives and beneficiary progress.</p>
      </div>
    </section>

    <!-- Metrics Bar -->
    <section class="metrics-bar py-4 shadow-sm bg-white border-bottom">
      <div class="container">
        <div class="row text-center g-4">
          <div class="col-md-4">
            <div class="metric-item">
              <h2 class="display-6 fw-bold text-teal mb-0">{{ kpiStats.totalCount }}</h2>
              <p class="text-muted text-uppercase mb-0 tracking-widest small">Total Inspections</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="metric-item border-md-start border-md-end">
              <h2 class="display-6 fw-bold text-teal mb-0">{{ kpiStats.distinctProvincesCount }}</h2>
              <p class="text-muted text-uppercase mb-0 tracking-widest small">Provinces Covered</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="metric-item">
              <h2 class="display-6 fw-bold text-teal mb-0">{{ kpiStats.beneficiariesEngaged }}</h2>
              <p class="text-muted text-uppercase mb-0 tracking-widest small">Beneficiaries Engaged</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="content-section py-5 bg-light">
      <div class="container">
        <!-- Province / Region Filter -->
        <div class="row mb-5">
          <div class="col-12 text-center">
            <div class="d-flex flex-wrap justify-content-center gap-2">
              <span class="d-flex align-items-center me-3 text-muted fw-bold">
                <i class="fas fa-filter me-2"></i> Region:
              </span>
              <button 
                v-for="region in regions" 
                :key="region"
                class="btn rounded-pill filter-pill" 
                :class="{ 'btn-teal text-white': selectedRegion === region, 'btn-outline-teal': selectedRegion !== region }"
                @click="selectedRegion = region"
              >
                {{ region }}
              </button>
            </div>
          </div>
        </div>

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
          <button class="btn btn-teal text-white mt-3 px-4" @click="selectedRegion = 'All'">Show All Regions</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import BaseUrl from '@/services/baseURL';

const regions = ['All', 'Central', 'North Western', 'Eastern', 'Southern'];
const selectedRegion = ref('All');
const visits = ref([]);
const loading = ref(false);

const kpiStats = ref({
  totalCount: 0,
  distinctProvincesCount: 0,
  beneficiariesEngaged: '8,500+'
});

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

      kpiStats.value.totalCount = response.data.totalCount ?? visits.value.length;
      kpiStats.value.distinctProvincesCount = response.data.distinctProvincesCount ?? new Set(visits.value.map(v => v.region || v.province)).size;
      kpiStats.value.beneficiariesEngaged = response.data.beneficiariesEngaged || '8,500+';
    } else {
      visits.value = fallbackVisits;
      kpiStats.value = {
        totalCount: fallbackVisits.length,
        distinctProvincesCount: new Set(fallbackVisits.map(v => v.region)).size,
        beneficiariesEngaged: '8,500+'
      };
    }
  } catch (error) {
    console.warn('Failed to load field visits from backend, using fallback data:', error);
    visits.value = fallbackVisits;
    kpiStats.value = {
      totalCount: fallbackVisits.length,
      distinctProvincesCount: 4,
      beneficiariesEngaged: '8,500+'
    };
  } finally {
    loading.value = false;
  }
};

const filteredVisits = computed(() => {
  if (selectedRegion.value === 'All') {
    return visits.value;
  }
  return visits.value.filter(v => (v.region || v.province) === selectedRegion.value);
});

onMounted(() => {
  fetchFieldVisits();
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

.tracking-widest {
  letter-spacing: 2px;
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

@media (min-width: 768px) {
  .border-md-start {
    border-left: 1px solid #dee2e6 !important;
  }
  .border-md-end {
    border-right: 1px solid #dee2e6 !important;
  }
}
</style>
