<template>
  <div class="about-page bg-slate-50 min-h-screen">
    <!-- ================================================================= -->
    <!-- 1. TOP HERO BANNER                                                -->
    <!-- ================================================================= -->
    <header class="hero-header text-center px-4">
      <div class="hero-container">
        <h1 class="hero-title">
          About Development Finance
        </h1>
        <p class="hero-subtitle">
          Facilitating appropriate policies, strategies, and financial resources for the sustainable development of MSMEs and primary sectors.
        </p>
      </div>
    </header>

    <!-- ================================================================= -->
    <!-- 2. VISION & MISSION FLOATING CARDS (-mt-16 OVERLAP)               -->
    <!-- ================================================================= -->
    <section class="max-w-6xl mx-auto px-4 mt-8 mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
      <!-- Vision Card -->
      <div class="bg-[#006d77] text-white p-8 rounded-3xl shadow-lg border border-teal-600/30 flex flex-col justify-between hover:shadow-xl transition duration-200">
        <div>
          <div class="w-12 h-12 rounded-2xl bg-white text-[#006d77] flex items-center justify-center text-xl mb-4 shadow-sm">
            <i class="fas fa-eye"></i>
          </div>
          <h2 class="text-2xl font-bold tracking-tight text-white mb-3">
            Vision
          </h2>
          <p class="text-sm text-teal-50/90 leading-relaxed font-light">
            To become the key Government agency as facilitator for development financing.
          </p>
        </div>
      </div>

      <!-- Mission Card -->
      <div class="bg-[#006d77] text-white p-8 rounded-3xl shadow-lg border border-teal-600/30 flex flex-col justify-between hover:shadow-xl transition duration-200">
        <div>
          <div class="w-12 h-12 rounded-2xl bg-white text-[#006d77] flex items-center justify-center text-xl mb-4 shadow-sm">
            <i class="fas fa-bullseye"></i>
          </div>
          <h2 class="text-2xl font-bold tracking-tight text-white mb-3">
            Mission
          </h2>
          <p class="text-sm text-teal-50/90 leading-relaxed font-light">
            Facilitate to formulate appropriate policies and strategies and mobilize financial resources for the development of MSMEs, financing primary sectors through necessary intervention with the relevant stakeholders.
          </p>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- 3. KEY STATISTICS BAR                                             -->
    <!-- ================================================================= -->
    <section class="max-w-6xl mx-auto px-4 mt-10">
      <div class="bg-[#e2e8f0]/60 rounded-3xl p-8 border border-slate-200/80 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        <!-- Stat 1 -->
        <div class="flex flex-col items-center justify-center p-3 pt-6 lg:pt-3">
          <div class="w-10 h-10 rounded-full bg-teal-50 text-[#008795] flex items-center justify-center text-lg mb-3">
            <i class="fas fa-hand-holding-usd"></i>
          </div>
          <div class="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
            8+
          </div>
          <div class="text-[11px] font-bold tracking-wider text-slate-400 mt-1 uppercase">
            Official Loan Schemes
          </div>
        </div>

        <!-- Stat 2 -->
        <div class="flex flex-col items-center justify-center p-3 pt-6 lg:pt-3">
          <div class="w-10 h-10 rounded-full bg-teal-50 text-[#008795] flex items-center justify-center text-lg mb-3">
            <i class="fas fa-landmark"></i>
          </div>
          <div class="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
            14+
          </div>
          <div class="text-[11px] font-bold tracking-wider text-slate-400 mt-1 uppercase">
            Participating Financial Institutions
          </div>
        </div>

        <!-- Stat 3 -->
        <div class="flex flex-col items-center justify-center p-3 pt-6 lg:pt-3">
          <div class="w-10 h-10 rounded-full bg-teal-50 text-[#008795] flex items-center justify-center text-lg mb-3">
            <i class="fas fa-shield-alt"></i>
          </div>
          <div class="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
            100%
          </div>
          <div class="text-[11px] font-bold tracking-wider text-slate-400 mt-1 uppercase">
            Treasury Supervised
          </div>
        </div>

        <!-- Stat 4 -->
        <div class="flex flex-col items-center justify-center p-3 pt-6 lg:pt-3">
          <div class="w-10 h-10 rounded-full bg-teal-50 text-[#008795] flex items-center justify-center text-lg mb-3">
            <i class="fas fa-seedling"></i>
          </div>
          <div class="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
            MSME &amp; Agri
          </div>
          <div class="text-[11px] font-bold tracking-wider text-slate-400 mt-1 uppercase">
            Priority Focus Sectors
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- 4. "OUR OBJECTIVES" SECTION                                       -->
    <!-- ================================================================= -->
    <section class="max-w-6xl mx-auto px-4 mt-10">
      <div class="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
        <!-- Section Title -->
        <div class="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-teal-50 text-[#008795] flex items-center justify-center text-lg flex-shrink-0">
            <i class="fas fa-flag"></i>
          </div>
          <span>Our Objectives</span>
        </div>

        <!-- Objectives 3-Column Responsive Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(objective, index) in objectives"
            :key="index"
            class="bg-slate-50/80 rounded-2xl p-5 border border-slate-100 flex items-start gap-3.5 hover:bg-white hover:shadow-md hover:border-teal-200 transition duration-200"
          >
            <!-- Solid Teal Number Badge -->
            <div class="w-8 h-8 rounded-full bg-[#008795] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              {{ index + 1 }}
            </div>
            <!-- Objective Description -->
            <p class="text-xs text-slate-800 font-medium leading-relaxed mb-0">
              {{ objective }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- 5. "CORE RESPONSIBILITIES" SECTION                                -->
    <!-- ================================================================= -->
    <section class="max-w-6xl mx-auto px-4 mt-10 mb-12 pb-4">
      <div class="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
        <!-- Section Title -->
        <div class="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-teal-50 text-[#008795] flex items-center justify-center text-lg flex-shrink-0">
            <i class="fas fa-check-circle"></i>
          </div>
          <span>Core Responsibilities</span>
        </div>

        <!-- Responsibilities 2-Column Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            v-for="(responsibility, index) in responsibilities"
            :key="index"
            class="bg-slate-50/80 rounded-2xl p-5 border border-slate-100 flex items-start gap-4 hover:bg-white hover:shadow-md hover:border-teal-200 transition duration-200"
          >
            <!-- Checkmark Icon -->
            <i class="fas fa-check-double text-[#008795] text-sm mt-1 flex-shrink-0"></i>
            <!-- Responsibility Description -->
            <p class="text-xs text-slate-800 font-medium leading-relaxed mb-0">
              {{ responsibility }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const objectives = [
  "Mobilize the financial resources and removal of the market impediments for the development of MSMEs.",
  "Strengthen institutional capacities for development of financial markets.",
  "Enhance rural entrepreneurship especially for low income entrepreneurs.",
  "Financing for primary sector in line with Government policy framework.",
  "Implementation of relevant budget proposals of each year.",
];

const responsibilities = [
  "Facilitate to formulate appropriate polices, strategies and programs for the development of MSMEs of the economy.",
  "Monitor and Review the market data to Identify key issues and provide solutions to the smooth growth of the MSMEs and micro finance sectors.",
  "Review Government Subsidy Schemes to ensure economic development and facilitate to formulate appropriate polices.",
  "Facilitate innovative policies, strategies and programs where ever necessary for micro finance sector.",
  "Facilitate in enacting legislations for banking, insurance, MSMEs and financial sector if the market review illustrates the need.",
  "Implement budget proposals and donor funded projects related to MSME sector, primary sector and other sectors coming under the purview of this department.",
  "Compile all data on MSME’s of Industrial, Agriculture and Service sectors and analyze to identify the impediments and policy interventions.",
  "Facilitate annual budget preparation process of the Government in respect of MSME sector, Banking sector and financial market and other sectors coming under the purview of this department.",
  "Oversee implementation of Government sponsored financial assistance schemes.",
  "Arranging local bank financing for development projects in MSME finance sectors in line with the Government policy.",
];
</script>

<style scoped>
/* ========================================================================= */
/* PAGE WRAPPER & TOP NAVBAR OFFSET                                         */
/* ========================================================================= */
.about-page {
  font-family: "Open Sans", "Inter", sans-serif;
  padding-top: 96px;
  min-height: 100vh;
  background-color: #f8fafc;
}

@media (max-width: 991.98px) {
  .about-page {
    padding-top: 76px;
  }
}

/* ========================================================================= */
/* UTILITY CLASS IMPLEMENTATIONS (Guarantees modern styled UI)               */
/* ========================================================================= */

/* Backgrounds & Colors */
.bg-\[\#005f73\] {
  background-color: #005f73 !important;
}

.bg-\[\#006d77\] {
  background-color: #006d77 !important;
}

.bg-\[\#008795\] {
  background-color: #008795 !important;
}

.bg-teal-50 {
  background-color: #f0fdfa !important;
}

.bg-white {
  background-color: #ffffff !important;
}

.bg-slate-50 {
  background-color: #f8fafc !important;
}

.bg-slate-50\/80 {
  background-color: rgba(248, 250, 252, 0.8) !important;
}

.bg-\[\#e2e8f0\]\/60 {
  background-color: rgba(226, 232, 240, 0.6) !important;
}

.hover\:bg-white:hover {
  background-color: #ffffff !important;
}

.text-white {
  color: #ffffff !important;
}

.text-teal-100 {
  color: #ccfbf1 !important;
}

.text-teal-50\/90 {
  color: rgba(240, 253, 250, 0.9) !important;
}

.text-\[\#006d77\] {
  color: #006d77 !important;
}

.text-\[\#008795\] {
  color: #008795 !important;
}

.text-slate-800 {
  color: #1e293b !important;
}

.text-slate-600 {
  color: #475569 !important;
}

.text-slate-400 {
  color: #94a3b8 !important;
}

/* Borders & Shadows */
.border {
  border-width: 1px !important;
  border-style: solid !important;
}

.border-slate-100 {
  border-color: #f1f5f9 !important;
}

.border-slate-200\/80 {
  border-color: rgba(226, 232, 240, 0.8) !important;
}

.border-teal-600\/30 {
  border-color: rgba(13, 148, 136, 0.3) !important;
}

.hover\:border-teal-200:hover {
  border-color: #99f6e4 !important;
}

.rounded-3xl {
  border-radius: 1.5rem !important;
}

.rounded-2xl {
  border-radius: 1rem !important;
}

.rounded-xl {
  border-radius: 0.75rem !important;
}

.rounded-full {
  border-radius: 9999px !important;
}

.shadow-sm {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05) !important;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1) !important;
}

.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1) !important;
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
}

/* Dividing Lines */
.divide-y > * + * {
  border-top-width: 1px !important;
  border-top-style: solid !important;
  border-color: #f1f5f9 !important;
}

@media (min-width: 1024px) {
  .lg\:divide-y-0 > * + * {
    border-top-width: 0 !important;
  }

  .lg\:divide-x > * + * {
    border-left-width: 1px !important;
    border-left-style: solid !important;
    border-color: #f1f5f9 !important;
  }
}

/* Dimensions & Widths */
.max-w-2xl {
  max-width: 42rem !important;
}

.max-w-6xl {
  max-width: 72rem !important;
}

.w-full {
  width: 100% !important;
}

.w-12 {
  width: 3rem !important;
}

.h-12 {
  height: 3rem !important;
}

.w-10 {
  width: 2.5rem !important;
}

.h-10 {
  height: 2.5rem !important;
}

.w-8 {
  width: 2rem !important;
}

.h-8 {
  height: 2rem !important;
}

.flex-shrink-0 {
  flex-shrink: 0 !important;
}

/* Grid & Flexbox */
.grid {
  display: grid !important;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }

  .lg\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  }
}

.flex {
  display: flex !important;
}

.flex-col {
  flex-direction: column !important;
}

.items-center {
  align-items: center !important;
}

.items-start {
  align-items: flex-start !important;
}

.justify-center {
  justify-content: center !important;
}

.justify-between {
  justify-content: space-between !important;
}

/* Gaps & Margins & Paddings */
.gap-3 {
  gap: 0.75rem !important;
}

.gap-3\.5 {
  gap: 0.875rem !important;
}

.gap-4 {
  gap: 1rem !important;
}

.gap-5 {
  gap: 1.25rem !important;
}

.gap-6 {
  gap: 1.5rem !important;
}

.pt-16 {
  padding-top: 4rem !important;
}

.pb-28 {
  padding-bottom: 7rem !important;
}

.-mt-16 {
  margin-top: -4rem !important;
}

.mt-0\.5 {
  margin-top: 0.125rem !important;
}

.mt-1 {
  margin-top: 0.25rem !important;
}

.mt-3 {
  margin-top: 0.75rem !important;
}

.mt-10 {
  margin-top: 2.5rem !important;
}

.mb-0 {
  margin-bottom: 0 !important;
}

.mb-3 {
  margin-bottom: 0.75rem !important;
}

.mb-4 {
  margin-bottom: 1rem !important;
}

.mb-6 {
  margin-bottom: 1.5rem !important;
}

.mb-20 {
  margin-bottom: 5rem !important;
}

.mx-auto {
  margin-left: auto !important;
  margin-right: auto !important;
}

.p-3 {
  padding: 0.75rem !important;
}

.p-5 {
  padding: 1.25rem !important;
}

.p-8 {
  padding: 2rem !important;
}

.px-4 {
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}

/* Typography */
.text-xs {
  font-size: 0.75rem !important;
  line-height: 1rem !important;
}

.text-\[11px\] {
  font-size: 11px !important;
  line-height: 14px !important;
}

.text-sm {
  font-size: 0.875rem !important;
  line-height: 1.25rem !important;
}

.text-base {
  font-size: 1rem !important;
  line-height: 1.5rem !important;
}

.text-lg {
  font-size: 1.125rem !important;
  line-height: 1.75rem !important;
}

.text-xl {
  font-size: 1.25rem !important;
  line-height: 1.75rem !important;
}

.text-2xl {
  font-size: 1.5rem !important;
  line-height: 2rem !important;
}

.text-4xl {
  font-size: 2.25rem !important;
  line-height: 2.5rem !important;
}

@media (min-width: 768px) {
  .md\:text-5xl {
    font-size: 3rem !important;
    line-height: 1 !important;
  }
}

@media (min-width: 1024px) {
  .lg\:text-3xl {
    font-size: 1.875rem !important;
    line-height: 2.25rem !important;
  }
}

.font-light {
  font-weight: 300 !important;
}

.font-normal {
  font-weight: 400 !important;
}

.font-medium {
  font-weight: 500 !important;
}

.font-bold {
  font-weight: 700 !important;
}

.font-extrabold {
  font-weight: 800 !important;
}

.text-center {
  text-align: center !important;
}

.uppercase {
  text-transform: uppercase !important;
}

.tracking-wider {
  letter-spacing: 0.05em !important;
}

.tracking-tight {
  letter-spacing: -0.025em !important;
}

.leading-relaxed {
  line-height: 1.625 !important;
}

/* Transitions */
.transition {
  transition-property: all !important;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.duration-200 {
  transition-duration: 200ms !important;
}

.relative {
  position: relative !important;
}

.z-10 {
  z-index: 10 !important;
}

.hero-header {
  background: linear-gradient(135deg, #004d5a 0%, #008795 100%);
  padding: 4rem 1rem;
  border-bottom: 5px solid #00e5ff;
}

.hero-container {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  color: #ffffff;
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
</style>
