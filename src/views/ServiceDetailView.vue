<template>
  <div class="service-detail-page">
    <div v-if="service" class="service-container">
      <!-- Header Badge / Hero -->
      <div class="service-hero">
        <div class="container text-center">
          <div class="hero-icon-box">
            <i :class="service.icon"></i>
          </div>
          <h1 class="service-title">{{ service.title }}</h1>
          <p class="service-desc-lead">{{ service.description }}</p>
        </div>
      </div>

      <div class="container content-section">
        <!-- 4-Card Metric Grid -->
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-icon"><i class="fas fa-hand-holding-usd"></i></div>
            <div class="metric-info">
              <span class="metric-label">Max Loan Amount</span>
              <span class="metric-value">{{ service.maxLoan }}</span>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-icon"><i class="fas fa-percentage"></i></div>
            <div class="metric-info">
              <span class="metric-label">Interest Rate</span>
              <span class="metric-value">{{ service.interestRate }}</span>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-icon"><i class="fas fa-calendar-alt"></i></div>
            <div class="metric-info">
              <span class="metric-label">Repayment Period</span>
              <span class="metric-value">{{ service.repaymentPeriod }}</span>
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-icon"><i class="fas fa-hourglass-half"></i></div>
            <div class="metric-info">
              <span class="metric-label">Grace Period</span>
              <span class="metric-value">{{ service.gracePeriod }}</span>
            </div>
          </div>
        </div>

        <!-- Breakdown Sections -->
        <div class="details-section">
          <div class="detail-block">
            <h3><i class="fas fa-bullseye me-2 text-teal"></i> Scheme Purpose & Objective</h3>
            <p>{{ service.objective }}</p>
          </div>
          
          <div class="detail-block">
            <h3><i class="fas fa-check-circle me-2 text-teal"></i> Eligibility</h3>
            <p>Applicants must be registered entities or individuals operating within the specified sector. A valid business plan or proof of operational continuity is generally required by the participating financial institution. (Exact eligibility criteria depends on the respective bank's internal policies).</p>
          </div>

          <div class="detail-block">
            <h3><i class="fas fa-university me-2 text-teal"></i> Participating Banks</h3>
            <div class="banks-wrapper">
              <span 
                v-for="(bank, index) in service.participatingBanks" 
                :key="index" 
                class="bank-pill"
              >
                {{ bank }}
              </span>
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
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { servicesData } from '../data/servicesData';

const route = useRoute();
const service = computed(() => {
  return servicesData.find(s => s.id === route.params.id);
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
  padding: 130px 20px 60px 20px;
  color: white;
  margin-bottom: -50px;
  margin-top: 0 !important;
  border-top: none !important;
}

.hero-icon-box {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
}

.service-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 15px;
}

.service-desc-lead {
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
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
}

.metric-card {
  background: white;
  border-radius: 12px;
  padding: 25px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border-bottom: 3px solid #008E9B;
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
  font-size: 1.5rem;
}

.metric-info {
  display: flex;
  flex-direction: column;
}

.metric-label {
  font-size: 0.85rem;
  color: #6c757d;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.metric-value {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0c2a38;
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
  font-size: 1.3rem;
  font-weight: 700;
  color: #0c2a38;
  margin-bottom: 15px;
  border-bottom: 1px solid #eef2f6;
  padding-bottom: 10px;
}

.text-teal {
  color: #008E9B;
}

.detail-block p {
  color: #495057;
  line-height: 1.7;
  font-size: 1rem;
}

.banks-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
}

.bank-pill {
  background: #e6f7f9;
  color: #007c91;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid #bcecf1;
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
}

@media (max-width: 767px) {
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
