<template>
  <div class="service-detail-page">
    <div v-if="loading" class="container text-center py-5">
      <div class="spinner-border text-teal mb-3" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <h5 class="text-muted">Loading scheme details...</h5>
    </div>

    <div v-else-if="service" class="service-container">
      <!-- Header Hero (Title & Description) -->
      <div class="service-hero">
        <div class="container text-center">
          <h1 class="service-title">{{ service.title }}</h1>
          <p class="service-desc-lead">{{ service.description }}</p>
        </div>
      </div>

      <div class="container content-section">
        <!-- 4-Card Metric Grid -->
        <div class="metrics-grid">
          <!-- SERVICE METRICS -->
          <template v-if="isService">
            <div class="metric-card">
              <div class="metric-icon"><i class="fas fa-map-marked-alt"></i></div>
              <div class="metric-info">
                <span class="metric-label">Coverage / Locations</span>
                <span class="metric-value">{{ serviceCoverageText }}</span>
              </div>
            </div>
            <div class="metric-card">
              <div class="metric-icon"><i class="fas fa-landmark"></i></div>
              <div class="metric-info">
                <span class="metric-label">Managing Partner</span>
                <span class="metric-value">{{ serviceManagingPartnerText }}</span>
              </div>
            </div>
            <div class="metric-card">
              <div class="metric-icon"><i class="fas fa-user-shield"></i></div>
              <div class="metric-info">
                <span class="metric-label">Supervision</span>
                <span class="metric-value">{{ serviceSupervisionText }}</span>
              </div>
            </div>
            <div class="metric-card">
              <div class="metric-icon"><i class="fas fa-warehouse"></i></div>
              <div class="metric-info">
                <span class="metric-label">Core Facilities</span>
                <span class="metric-value">{{ serviceCoreFacilitiesText }}</span>
              </div>
            </div>
          </template>

          <!-- LOAN METRICS -->
          <template v-else>
            <!-- Box 1: Max Loan Amount -->
            <div class="metric-card">
              <div class="metric-icon"><i class="fas fa-hand-holding-usd"></i></div>
              <div class="metric-info">
                <span class="metric-label">Max Loan Amount</span>
                <span class="metric-value">{{ service.maxAmount || service.maxLoan || 'N/A' }}</span>
              </div>
            </div>

            <!-- Box 2: Interest Rate + Breakdown -->
            <div class="metric-card">
              <div class="metric-icon"><i class="fas fa-percentage"></i></div>
              <div class="metric-info">
                <span class="metric-label">Interest Rate</span>
                <span class="metric-value">{{ service.interestRate || 'N/A' }}</span>
                <div v-if="rateBreakdown" class="subsidy-breakdown-row">
                  <template v-if="rateBreakdown.type === 'split'">
                    <span class="badge-pill-customer">
                      Customer: {{ rateBreakdown.customer }}
                    </span>
                    <span class="badge-pill-subsidy">
                      Govt. Subsidy: {{ rateBreakdown.subsidy }}
                    </span>
                  </template>
                  <template v-else>
                    <span class="badge-pill-subsidy" :title="rateBreakdown.text">
                      <i class="fas fa-gift me-1"></i> {{ rateBreakdown.text }}
                    </span>
                  </template>
                </div>
              </div>
            </div>

            <!-- Box 3: Repayment Period -->
            <div class="metric-card">
              <div class="metric-icon"><i class="fas fa-calendar-alt"></i></div>
              <div class="metric-info">
                <span class="metric-label">Repayment Period</span>
                <span class="metric-value">{{ service.repaymentPeriod || 'N/A' }}</span>
              </div>
            </div>

            <!-- Box 4: Grace Period (Always Grace Period) -->
            <div class="metric-card">
              <div class="metric-icon"><i class="fas fa-hourglass-half"></i></div>
              <div class="metric-info">
                <span class="metric-label">Grace Period</span>
                <span
                  class="metric-value"
                  :class="{ 'text-muted-grace': !hasGracePeriod }"
                >
                  {{ hasGracePeriod ? service.gracePeriod : 'No Grace Period' }}
                </span>
              </div>
            </div>
          </template>
        </div>

        <!-- Breakdown Sections -->
        <div class="details-section">
          <!-- 1. Background & Objectives -->
          <div class="detail-block" v-if="service.purpose || service.objective || service.description">
            <h3>
              <i class="fas fa-bullseye me-2 text-teal"></i>
              {{ isService ? 'Program Background & Objectives' : 'Scheme Purpose & Objective' }}
            </h3>
            <div v-if="parsedPurposeList.length > 1" class="checklist-container">
              <div v-for="(item, idx) in parsedPurposeList" :key="idx" class="checklist-item">
                <div class="check-icon-circle"><i class="fas fa-check"></i></div>
                <span class="checklist-text whitespace-normal break-words">{{ item }}</span>
              </div>
            </div>
            <p v-else class="whitespace-normal break-words leading-relaxed text-slate-700">
              {{ service.purpose || service.objective || service.description }}
            </p>
          </div>

          <!-- 2. Nature of the Loan (Dedicated Section) -->
          <div class="detail-block" v-if="service.natureOfLoan && !isService">
            <h3>
              <i class="fas fa-layer-group me-2 text-teal"></i>
              Nature of the Loan
            </h3>
            <div class="nature-pill-box">
              <span v-for="(item, idx) in parsedNatureOfLoanList" :key="idx" class="nature-loan-badge">
                <i class="fas fa-briefcase text-teal me-2"></i>
                {{ item }}
              </span>
            </div>
          </div>

          <!-- 3. Target Beneficiaries -->
          <div class="detail-block" v-if="service.beneficiaries">
            <h3><i class="fas fa-users me-2 text-teal"></i> Target Beneficiaries</h3>
            <div v-if="parsedBeneficiariesList.length > 0" class="checklist-container">
              <div v-for="(item, idx) in parsedBeneficiariesList" :key="idx" class="checklist-item">
                <div class="check-icon-circle"><i class="fas fa-check"></i></div>
                <span class="checklist-text whitespace-normal break-words">{{ item }}</span>
              </div>
            </div>
            <p v-else class="whitespace-normal break-words leading-relaxed text-slate-700">{{ service.beneficiaries }}</p>
          </div>

          <!-- 4. Eligibility & Document Requirements -->
          <div class="detail-block" v-if="service.requirements || service.eligibility">
            <h3><i class="fas fa-clipboard-check me-2 text-teal"></i> Eligibility &amp; Requirements</h3>
            <div v-if="parsedRequirementsList.length > 0" class="checklist-container">
              <div v-for="(req, idx) in parsedRequirementsList" :key="idx" class="checklist-item">
                <div class="check-icon-circle"><i class="fas fa-check"></i></div>
                <span class="checklist-text whitespace-normal break-words">{{ req }}</span>
              </div>
            </div>
            <p v-else class="whitespace-normal break-words leading-relaxed text-slate-700">{{ service.requirements || service.eligibility }}</p>
          </div>

          <!-- 4. Center Locations (Pin Badges) -->
          <div class="detail-block" v-if="parsedLocations.length > 0">
            <h3><i class="fas fa-map-marker-alt me-2 text-teal"></i> Center Locations &amp; Regional Presence</h3>
            <div class="locations-wrapper">
              <div v-for="(loc, idx) in parsedLocations" :key="idx" class="location-badge">
                <i class="fas fa-map-pin text-rose me-1.5"></i>
                <span>{{ loc }}</span>
              </div>
            </div>
          </div>

          <!-- 5. Services & Facilities Provided -->
          <div class="detail-block" v-if="parsedServicesProvided.length > 0">
            <h3><i class="fas fa-tools me-2 text-teal"></i> Services &amp; Facilities Provided</h3>
            <div class="facilities-grid">
              <div v-for="(facility, idx) in parsedServicesProvided" :key="idx" class="facility-card">
                <div class="facility-icon"><i class="fas fa-check-double text-teal"></i></div>
                <div class="facility-text">{{ facility }}</div>
              </div>
            </div>
          </div>

          <!-- 6. Implementation Arrangements -->
          <div class="detail-block" v-if="service.implementationArrangements">
            <h3><i class="fas fa-sitemap me-2 text-teal"></i> Implementation Arrangements</h3>
            <p>{{ service.implementationArrangements }}</p>
          </div>

          <!-- 7. Participating Financial Institutions (PFIs) -->
          <div class="detail-block" v-if="parsedBanks.length > 0">
            <h3><i class="fas fa-university me-2 text-teal"></i> Participating Financial Institutions (PFIs)</h3>
            <div class="banks-wrapper">
              <span 
                v-for="(bank, index) in parsedBanks" 
                :key="index" 
                class="bank-pill"
              >
                <i class="fas fa-building-columns me-1.5 opacity-70"></i>
                {{ bank }}
              </span>
            </div>
          </div>

          <!-- 8. Other Initiatives & Related Programs -->
          <div class="detail-block" v-if="service.otherInitiatives">
            <h3><i class="fas fa-project-diagram me-2 text-teal"></i> Other Related Initiatives</h3>
            <p>{{ service.otherInitiatives }}</p>
          </div>

          <!-- 9. Designated Contact Details & Inquiries -->
          <div class="detail-block" v-if="service.contactInfo">
            <h3><i class="fas fa-headset me-2 text-teal"></i> Designated Contact Information &amp; Inquiries</h3>
            <div class="contact-box-callout">
              <i class="fas fa-info-circle text-teal text-xl shrink-0 mt-0.5"></i>
              <div class="contact-text">{{ service.contactInfo }}</div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <router-link to="/Services" class="btn-outline-back">
            <i class="fas fa-arrow-left"></i> Back to Services
          </router-link>
          <router-link to="/Teldirec" class="btn-primary-contact">
            Contact for Inquiries <i class="fas fa-paper-plane"></i>
          </router-link>
        </div>
      </div>
    </div>
    
    <div v-else class="container text-center py-5">
      <h2>Service Scheme Not Found</h2>
      <router-link to="/Services" class="btn btn-primary mt-3">Return to Services</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import BaseUrl from '../services/baseURL';
import { servicesData } from '../data/servicesData';

const route = useRoute();
const service = ref(null);
const loading = ref(true);

const isService = computed(() => {
  return (service.value?.schemeType || '').toUpperCase() === 'SERVICE';
});

const hasGracePeriod = computed(() => {
  const gp = service.value?.gracePeriod;
  if (!gp || typeof gp !== 'string') return false;
  const trimmed = gp.trim().toLowerCase();
  return trimmed.length > 0 && trimmed !== 'n/a' && trimmed !== 'none' && trimmed !== 'null' && trimmed !== '-';
});

const parsedNatureOfLoanList = computed(() => {
  const nol = service.value?.natureOfLoan;
  if (!nol || typeof nol !== 'string') return [];
  if (nol.includes(',')) {
    return nol.split(',').map(s => s.trim()).filter(Boolean);
  }
  return [nol.trim()];
});

const rateBreakdown = computed(() => {
  const details = service.value?.subsidyDetails;
  if (!details || typeof details !== 'string' || !details.trim()) {
    return null;
  }
  const text = details.trim();

  // 1. Explicit Customer and Govt split: e.g. "Customer: 8%, Govt: 4%"
  const custMatch = text.match(/Customer(?:\s*Rate)?[:\s]+(\d+(?:\.\d+)?%?)/i);
  const govtMatch = text.match(/(?:Govt(?:\.|\s*Subsidy)?|Subsidy)[:\s]+(\d+(?:\.\d+)?%?)/i);
  if (custMatch && govtMatch) {
    const cVal = custMatch[1].endsWith('%') ? custMatch[1] : `${custMatch[1]}%`;
    const sVal = govtMatch[1].endsWith('%') ? govtMatch[1] : `${govtMatch[1]}%`;
    return {
      type: 'split',
      customer: cVal,
      subsidy: sVal
    };
  }

  // 2. Percentage with "Govt. Subsidy" or "Subsidy", e.g. "4% Govt. Subsidy (12% Total)"
  const percentSubsidyMatch = text.match(/(\d+(?:\.\d+)?%)\s*(?:Govt\.?|Government)?\s*Subsidy/i);
  if (percentSubsidyMatch) {
    const sVal = percentSubsidyMatch[1];
    const baseRate = service.value?.interestRate || '';
    const baseMatch = baseRate.match(/(\d+(?:\.\d+)?%)/);
    if (baseMatch) {
      return {
        type: 'split',
        customer: baseMatch[1],
        subsidy: sVal
      };
    }
  }

  // 3. Fallback: single compact badge
  return {
    type: 'badge',
    text: text
  };
});

// Dynamic summary helpers for SERVICE top 4 metric boxes
const serviceCoverageText = computed(() => {
  if (parsedLocations.value.length > 0) {
    return `${parsedLocations.value.length} Key Districts`;
  }
  return 'Island-wide Network';
});

const serviceManagingPartnerText = computed(() => {
  if (parsedBanks.value.length > 0) {
    return parsedBanks.value[0];
  }
  if (service.value?.implementationArrangements && service.value.implementationArrangements.includes('RDB')) {
    return 'Regional Development Bank';
  }
  return 'RDB & Agri Cooperatives';
});

const serviceSupervisionText = computed(() => {
  if (service.value?.implementationArrangements && service.value.implementationArrangements.toLowerCase().includes('district secretar')) {
    return 'District Secretariats';
  }
  return 'District Secretary / Dept. of Agrarian Dev.';
});

const serviceCoreFacilitiesText = computed(() => {
  if (parsedServicesProvided.value.length > 0) {
    return 'Drying, Storage & Testing';
  }
  return 'Grain Preservation & Storage';
});

// Parsing helpers
const parseArrayOrDelimited = (rawVal) => {
  if (!rawVal) return [];
  if (Array.isArray(rawVal)) return rawVal;
  if (typeof rawVal === 'string') {
    const trimmed = rawVal.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return trimmed.split(/\r?\n|[,;]/).map(s => s.trim().replace(/^[-•*]\s*/, '')).filter(Boolean);
  }
  return [];
};

// Smart parser for vertical bullet lists (Purpose, Beneficiaries, Requirements)
const parseSmartPointsList = (rawVal) => {
  if (!rawVal) return [];
  if (Array.isArray(rawVal)) {
    return rawVal.map(item => String(item).trim()).filter(Boolean);
  }
  if (typeof rawVal === 'string') {
    const trimmed = rawVal.trim();
    if (!trimmed) return [];

    // 1. JSON Array string
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map(item => String(item).trim()).filter(Boolean);
        }
      } catch {}
    }

    // 2. Multi-line strings (split by \r?\n)
    if (trimmed.includes('\n') || trimmed.includes('\r')) {
      const lines = trimmed
        .split(/\r?\n+/)
        .map(line => line.trim().replace(/^[-•*?✓✔\u2022\u25E6\u25AA\u25CF]\s*/, '').replace(/^\d+[\.\)]\s*/, ''))
        .filter(Boolean);
      if (lines.length > 0) return lines;
    }

    // 3. Delimited by explicit bullet symbols within text (•, \u2022, etc.)
    if (/[\u2022\u25CF\u25E6•]/.test(trimmed)) {
      const points = trimmed
        .split(/[\u2022\u25CF\u25E6•]/)
        .map(p => p.trim().replace(/^[-*?✓✔]\s*/, ''))
        .filter(Boolean);
      if (points.length > 1) return points;
    }

    // 4. Semicolon-delimited items
    if (trimmed.includes(';')) {
      const parts = trimmed.split(';').map(p => p.trim()).filter(Boolean);
      if (parts.length > 1) return parts;
    }

    // 5. Short comma-separated list fallback (only if not a long prose sentence with internal periods)
    const strippedDot = trimmed.replace(/\.\s*$/, '');
    if (strippedDot.includes(',') && !strippedDot.includes('.') && strippedDot.length < 240) {
      const parts = strippedDot.split(',').map(p => p.trim().replace(/^and\s+/i, '')).filter(Boolean);
      if (parts.length > 1) return parts;
    }

    // Single item fallback
    const single = trimmed.replace(/^[-•*?✓✔\u2022\u25E6\u25AA\u25CF]\s*/, '');
    return [single];
  }
  return [];
};

const parsedLocations = computed(() => parseArrayOrDelimited(service.value?.locations));
const parsedServicesProvided = computed(() => parseArrayOrDelimited(service.value?.servicesProvided));
const parsedPurposeList = computed(() => parseSmartPointsList(service.value?.purpose || service.value?.objective));
const parsedBeneficiariesList = computed(() => parseSmartPointsList(service.value?.beneficiaries));
const parsedRequirementsList = computed(() => {
  const reqs = service.value?.requirements || service.value?.eligibility;
  return parseSmartPointsList(reqs);
});

const parsedBanks = computed(() => {
  if (!service.value) return [];
  const banks = service.value.participatingBanks;
  if (!banks) return [];
  if (Array.isArray(banks)) return banks;
  if (typeof banks === 'string') {
    return banks.split(/[,;\n]/).map(b => b.trim()).filter(Boolean);
  }
  return [];
});

const fetchSchemeDetails = async () => {
  loading.value = true;
  const id = route.params.id;
  const apiBase = BaseUrl.baseUrl || 'http://localhost:8096';

  try {
    const response = await axios.get(`${apiBase}/api/v1/services/${id}`);
    if (response.data) {
      service.value = response.data;
      loading.value = false;
      return;
    }
  } catch (error) {
    console.warn(`Failed to fetch /api/v1/services/${id}, attempting fallback:`, error);
  }

  try {
    const pubResponse = await axios.get(`${apiBase}/api/schemes/public`);
    const found = (pubResponse.data || []).find(s => String(s.id) === String(id) || s.title?.toLowerCase() === String(id).toLowerCase());
    if (found) {
      service.value = found;
      loading.value = false;
      return;
    }
  } catch (err) {
    console.warn('Fallback public list fetch failed:', err);
  }

  const staticMatch = (servicesData || []).find(s => String(s.id) === String(id));
  if (staticMatch) {
    service.value = staticMatch;
  }

  loading.value = false;
};

onMounted(() => {
  fetchSchemeDetails();
});
</script>

<style scoped>
.service-detail-page {
  font-family: 'Open Sans', sans-serif;
  background: #f8faff;
  min-height: 100vh;
  padding-bottom: 80px;
}

.service-hero {
  background: linear-gradient(135deg, #008E9B 0%, #001a38 100%);
  padding: 135px 24px 80px 24px;
  color: white;
  margin-bottom: -45px;
  margin-top: 0 !important;
  border-top: none !important;
}

.service-title {
  font-size: 2.6rem;
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: -0.015em;
  line-height: 1.25;
}

.service-desc-lead {
  font-size: 1.125rem;
  opacity: 0.92;
  max-width: 820px;
  margin: 0 auto;
  line-height: 1.65;
}

.content-section {
  position: relative;
  z-index: 10;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
  align-items: stretch;
}

.metric-card {
  background: white;
  border-radius: 12px;
  padding: 20px 18px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border-bottom: 3px solid #008E9B;
  height: 100%;
}

.metric-icon {
  width: 50px;
  height: 50px;
  background: #f0fbfc;
  color: #008795;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}

.metric-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  flex: 1;
}

.rate-value-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.subsidy-breakdown-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 5px;
}

.badge-pill-customer {
  display: inline-flex;
  align-items: center;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 9999px;
  background: #f0fdfa;
  color: #0f766e;
  border: 1px solid #ccfbf1;
  white-space: nowrap;
}

.badge-pill-subsidy {
  display: inline-flex;
  align-items: center;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 9999px;
  background: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
  white-space: nowrap;
  max-width: 100%;
}

.nature-pill-box {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.nature-loan-badge {
  display: inline-flex;
  align-items: center;
  background: #f0fdfa;
  color: #0f766e;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 8px 18px;
  border-radius: 12px;
  border: 1px solid #ccfbf1;
  box-shadow: 0 2px 6px rgba(15, 118, 110, 0.06);
}

.metric-label {
  font-size: 0.76rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 3px;
}

.metric-value {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0c2a38;
  word-break: break-word;
  line-height: 1.3;
}

.text-muted-grace {
  color: #64748b !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
}

.details-section {
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  margin-bottom: 40px;
}

.detail-block {
  margin-bottom: 35px;
}

.detail-block:last-child {
  margin-bottom: 0;
}

.detail-block h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0c2a38;
  margin-bottom: 16px;
  border-bottom: 1px solid #eef2f6;
  padding-bottom: 10px;
}

.text-teal {
  color: #008E9B;
}

.text-rose {
  color: #e11d48;
}

.detail-block {
  width: 100%;
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
}

.detail-block p {
  color: #495057;
  line-height: 1.75;
  font-size: 0.98rem;
  overflow-wrap: break-word;
  word-break: break-word;
}

/* Checklist and bullet lists */
.checklist-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.checklist-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 0.95rem;
  color: #334155;
  line-height: 1.6;
  width: 100%;
}

.check-icon-circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #ccfbf1;
  color: #0f766e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.checklist-text {
  flex: 1;
  min-width: 0;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
}

/* Location Pins */
.locations-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.location-badge {
  display: inline-flex;
  align-items: center;
  background: #f0fdfa;
  border: 1px solid #ccfbf1;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 700;
  color: #0f766e;
  font-size: 0.9rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

/* Facilities Grid */
.facilities-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.facility-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px 18px;
  font-size: 0.92rem;
  font-weight: 600;
  color: #1e293b;
}

.facility-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #e6f7f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.facility-text {
  flex: 1;
}

/* Banks Wrapper */
.banks-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.bank-pill {
  background: #e6f7f9;
  color: #007c91;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.88rem;
  font-weight: 600;
  border: 1px solid #bcecf1;
  display: inline-flex;
  align-items: center;
}

/* Contact Callout */
.contact-box-callout {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: #f0fdfa;
  border: 1px solid #99f6e4;
  border-radius: 14px;
  padding: 18px 22px;
  font-size: 0.95rem;
  color: #0f766e;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-outline-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #0c2a38;
  font-weight: 700;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 50px;
  border: 2px solid #e0e7f1;
  transition: all 0.3s ease;
  background: white;
}

.btn-outline-back:hover {
  background: #f8f9fa;
  border-color: #ced4da;
  transform: translateX(-3px);
}

.btn-primary-contact {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #008E9B 0%, #00B4C5 100%);
  color: white;
  font-weight: 700;
  text-decoration: none;
  padding: 12px 30px;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 142, 155, 0.2);
}

.btn-primary-contact:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(0, 142, 155, 0.3);
  color: white;
}

@media (max-width: 991px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .facilities-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .service-hero {
    padding: 110px 16px 65px 16px;
    margin-bottom: -35px;
  }
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  .service-title {
    font-size: 2rem;
  }
  .details-section {
    padding: 25px;
  }
  .action-buttons {
    flex-direction: column;
    gap: 15px;
  }
  .btn-outline-back, .btn-primary-contact {
    width: 100%;
    justify-content: center;
  }
}
</style>
