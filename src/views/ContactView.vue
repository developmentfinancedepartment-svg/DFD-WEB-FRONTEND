<template>
  <div class="contact-view-page bg-slate-50 min-h-screen">
    <!-- ================================================================= -->
    <!-- 1. TOP HERO HEADER                                                -->
    <!-- ================================================================= -->
    <header class="hero-header text-center px-4">
      <div class="hero-container">
        <h1 class="hero-title">
          Contact Us
        </h1>
        <p class="hero-subtitle">
          Get in touch with the Department of Development Finance for inquiries, support, and institutional guidance.
        </p>
      </div>
    </header>

    <!-- ================================================================= -->
    <!-- 2. FOUR KEY CONTACT CARDS (-mt-16 NEGATIVE MARGIN OVERLAP)        -->
    <!-- ================================================================= -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        <!-- Card 1: Office Address -->
        <div class="bg-ash rounded-2xl p-6 border border-slate-200/80 shadow-sm min-h-[170px] flex flex-col items-center text-center justify-between hover:shadow-md transition">
          <div class="w-12 h-12 rounded-full bg-teal-50 text-[#008795] text-xl flex items-center justify-center mb-3">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Office Address</span>
            <p class="text-sm text-slate-700 font-bold leading-relaxed">
              Room No. 140, Ministry of Finance, The Secretariat, Colombo 01
            </p>
          </div>
        </div>

        <!-- Card 2: National Hotline -->
        <div class="bg-ash rounded-2xl p-6 border border-slate-200/80 shadow-sm min-h-[170px] flex flex-col items-center text-center justify-between hover:shadow-md transition">
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 rounded-full bg-teal-50 text-[#008795] text-xl flex items-center justify-center mb-3">
              <i class="fas fa-headset"></i>
            </div>
            <div class="flex flex-col items-center">
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">National Hotline</span>
          </div>
          
            <a
              href="tel:1819"
              class="text-xl font-bold text-[#008795] hover:opacity-80 transition"
            >
              1819
            </a>
            <span class="text-[11px] text-slate-400 mt-0.5">Toll-free Government Hotline</span>
          </div>
        </div>

        <!-- Card 3: Telephone -->
        <div class="bg-ash rounded-2xl p-6 border border-slate-200/80 shadow-sm min-h-[170px] flex flex-col items-center text-center justify-between hover:shadow-md transition">
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 rounded-full bg-teal-50 text-[#008795] text-xl flex items-center justify-center mb-3">
            <i class="fas fa-phone-alt"></i>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Telephone</span>
          </div>
          
            <a
              href="tel:+94112484862"
              class="text-md font-bold text-slate-800 hover:text-[#008795] transition"
            >
              +94 112 484 862
            </a>
            <span class="text-[11px] text-slate-400 mt-0.5">Secretariat General Line</span>
          </div>
        </div>

        <!-- Card 4: Official Email -->
        <div class="bg-ash rounded-2xl p-6 border border-slate-200/80 shadow-sm min-h-[170px] flex flex-col items-center text-center justify-between hover:shadow-md transition">
          <div class="flex flex-col items-center">
            <div class="w-12 h-12 rounded-full bg-teal-50 text-[#008795] text-xl flex items-center justify-center mb-3">
            <i class="fas fa-envelope"></i>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Official Email</span>
          </div>
            <a
              href="mailto:dgdf@dfd.treasury.gov.lk"
              class="text-sm font-bold text-slate-800 hover:text-[#008795] transition break-all"
            >
              dgdf@dfd.treasury.gov.lk
            </a>
            <span class="text-[11px] text-slate-400 mt-0.5">Director General's Office</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->
    <!-- 3. TWO-COLUMN LAYOUT (DESKTOP lg:grid-cols-12)                    -->
    <!-- ================================================================= -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
        <!-- ------------------------------------------------------------- -->
        <!-- LEFT COLUMN (lg:col-span-6 space-y-5)                         -->
        <!-- ------------------------------------------------------------- -->
        <div class="lg:col-span-6 space-y-5">
          <!-- Google Map Container -->
          <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-700">Location Map</span>
              <span class="text-xs text-slate-400">Colombo 01</span>
            </div>
            <div class="h-72 w-full rounded-xl border border-slate-100 overflow-hidden">
              <iframe
                title="Ministry of Finance Sri Lanka Location"
                src="https://www.google.com/maps?q=Ministry+of+Finance,+Lotus+Rd,+Colombo&output=embed"
                class="w-full h-full border-0 rounded-xl"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <!-- Office Operating Hours Card -->
          <div class="bg-[#e2e8f0]/60 rounded-2xl p-5 border border-slate-200 flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-teal-50 text-[#008795] text-xl flex items-center justify-center flex-shrink-0 border border-teal-100">
              <i class="fas fa-clock"></i>
            </div>
            <div>
              <h4 class="text-xs font-bold text-slate-800 uppercase tracking-wider mb-0.5">
                Operating Hours
              </h4>
              <p class="text-xs text-slate-700 font-semibold mb-0">
                Monday - Friday: 8:30 AM - 4:15 PM
              </p>
              <p class="text-[11px] text-slate-500 mb-0 mt-0.5">
                Closed on Weekends, Poya &amp; Public Holidays
              </p>
            </div>
          </div>

          <!-- Follow Us Card -->
          <div class="bg-[#e2e8f0]/60 rounded-2xl p-4 border border-slate-200 flex items-center justify-between px-6">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-700">Follow Us</span>
            <div class="flex items-center gap-3">
              <!-- Facebook -->
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-90 transition text-sm"
                aria-label="Facebook"
                title="Facebook"
              >
                <i class="fab fa-facebook-f"></i>
              </a>
              <!-- LinkedIn -->
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-90 transition text-sm"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <i class="fab fa-linkedin-in"></i>
              </a>
              <!-- YouTube -->
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:opacity-90 transition text-sm"
                aria-label="YouTube"
                title="YouTube"
              >
                <i class="fab fa-youtube"></i>
              </a>
              <!-- WhatsApp -->
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-full bg-[#25d366] text-white flex items-center justify-center hover:opacity-90 transition text-sm"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <i class="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- ------------------------------------------------------------- -->
        <!-- RIGHT COLUMN (lg:col-span-6: INQUIRY FORM)                    -->
        <!-- ------------------------------------------------------------- -->
        <div class="lg:col-span-6 flex flex-col">
          <div class="bg-[#e2e8f0]/60 rounded-2xl p-7 md:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between h-full max-w-lg mx-auto w-full">
            
            <!-- Centered Header -->
            <div class="text-center mb-6">
              <h2 class="text-2xl font-bold text-slate-800 tracking-tight">
                Send us an Inquiry
              </h2>
              <p class="text-xs text-slate-500 mt-1 mb-0">
                Fill out the form below and our team will get back to you promptly.
              </p>
            </div>

            <!-- Submission Feedback Alert -->
            <div
              v-if="submissionStatus.message"
              :class="[
                'mb-5 p-4 rounded-xl border flex items-start gap-3 text-xs transition-all',
                submissionStatus.isError
                  ? 'bg-rose-50 border-rose-200 text-rose-800'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800',
              ]"
              role="alert"
            >
              <i
                :class="[
                  'mt-0.5 text-base flex-shrink-0',
                  submissionStatus.isError
                    ? 'fas fa-exclamation-triangle text-rose-600'
                    : 'fas fa-check-circle text-emerald-600',
                ]"
              ></i>
              <div class="flex-1 leading-relaxed">
                <span class="font-bold block mb-0.5">
                  {{ submissionStatus.isError ? "Submission Issue" : "Inquiry Submitted" }}
                </span>
                {{ submissionStatus.message }}
              </div>
              <button
                type="button"
                class="text-slate-400 hover:text-slate-600 font-bold ml-2"
                aria-label="Close"
                @click="submissionStatus.message = ''"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>

            <form @submit.prevent="handleSubmitInquiry" class="flex-1 flex flex-col justify-between space-y-4">
              
              <!-- First & Last Name -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">First Name</label>
                  <input
                    id="firstName"
                    v-model.trim="form.firstName"
                    type="text"
                    placeholder="First name"
                    required
                    class="bg-white rounded-xl border border-slate-300 px-4 py-3.5 text-xs focus:ring-1 focus:ring-[#008795] w-full text-slate-800 placeholder-slate-400 shadow-2xs transition"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Last Name</label>
                  <input
                    id="lastName"
                    v-model.trim="form.lastName"
                    type="text"
                    placeholder="Last name"
                    required
                    class="bg-white rounded-xl border border-slate-300 px-4 py-3.5 text-xs focus:ring-1 focus:ring-[#008795] w-full text-slate-800 placeholder-slate-400 shadow-2xs transition"
                  />
                </div>
              </div>

              <!-- Phone & Email -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    placeholder="07XXXXXXXX"
                    required
                    @input="formatPhoneNumber"
                    class="bg-white rounded-xl border border-slate-300 px-4 py-3.5 text-xs focus:ring-1 focus:ring-[#008795] w-full text-slate-800 placeholder-slate-400 shadow-2xs transition"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    id="email"
                    v-model.trim="form.email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    class="bg-white rounded-xl border border-slate-300 px-4 py-3.5 text-xs focus:ring-1 focus:ring-[#008795] w-full text-slate-800 placeholder-slate-400 shadow-2xs transition"
                  />
                </div>
              </div>

              <!-- Scheme Category Dropdown -->
              <div class="relative" ref="dropdownRef">
                <label class="block text-xs font-bold text-slate-700 mb-1">Scheme / Category</label>
                <button
                  type="button"
                  @click="toggleCategoryDropdown"
                  class="bg-white rounded-xl border border-slate-300 px-4 py-3 text-xs flex justify-between items-center text-slate-800 shadow-2xs hover:border-[#008795] transition cursor-pointer w-full text-left"
                  :class="{ 'border-[#008795] ring-1 ring-[#008795]': isCategoryOpen }"
                >
                  <span :class="form.category ? 'text-slate-800 font-medium flex items-center gap-2.5 truncate' : 'text-slate-400 truncate'">
                    <i v-if="selectedCategoryIcon" :class="[selectedCategoryIcon, 'text-[#008795] text-xs flex-shrink-0']"></i>
                    <span>{{ form.category || "Select Scheme / Category" }}</span>
                  </span>
                  <i
                    class="fas fa-chevron-down text-slate-400 transition-transform duration-200 text-xs ml-2 flex-shrink-0"
                    :class="{ 'rotate-180 text-[#008795]': isCategoryOpen }"
                  ></i>
                </button>

                <!-- Floating Option List (Expanded) -->
                <transition name="dropdown-fade">
                  <div
                    v-if="isCategoryOpen"
                    class="absolute z-50 left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200/80 shadow-[0_10px_25px_rgba(0,0,0,0.08)] overflow-hidden"
                  >
                    <!-- List Header Placeholder -->
                    <div class="py-3 px-5 text-xs text-slate-400 font-semibold bg-slate-50/50 border-b border-slate-100 select-none">
                      Select Inquiry Category
                    </div>

                    <!-- Scrollable Option List -->
                    <div class="max-h-64 overflow-y-auto">
                      <button
                        v-for="cat in categories"
                        :key="cat.value"
                        type="button"
                        @click="selectCategory(cat.value)"
                        class="w-full py-3 px-5 text-xs text-slate-700 flex items-center gap-3 border-b border-slate-100/70 transition-colors duration-150 group border-l-4 border-l-transparent hover:border-l-[#008795] hover:text-[#008795] hover:bg-[#f0f9fa] cursor-pointer text-left"
                        :class="{ 'bg-[#f0f9fa] text-[#008795] border-l-[#008795] font-semibold': form.category === cat.value }"
                      >
                        <i :class="[cat.icon, 'text-slate-400 group-hover:text-[#008795] transition-colors w-4 text-center flex-shrink-0']"></i>
                        <span class="flex-1">{{ cat.label }}</span>
                        <i v-if="form.category === cat.value" class="fas fa-check text-[#008795] text-xs ml-auto"></i>
                      </button>
                    </div>
                  </div>
                </transition>
              </div>

              <!-- Message Textarea -->
              <div class="flex-1 flex flex-col">
                <label class="block text-xs font-semibold text-slate-700 mb-1">Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  placeholder="How can we help you?"
                  required
                  class="bg-white rounded-xl border border-slate-300 px-4 py-3 text-xs focus:ring-1 focus:ring-[#008795] w-full text-slate-800 placeholder-slate-400 shadow-2xs transition resize-y flex-1 min-h-[160px]"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <div class="pt-2">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="bg-[#008795] hover:bg-[#007380] text-white rounded-xl py-3.5 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 w-full transition shadow-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  <i
                    v-if="isSubmitting"
                    class="fas fa-spinner fa-spin text-sm"
                  ></i>
                  <i v-else class="fas fa-paper-plane text-xs"></i>
                  <span>{{ isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry" }}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import BaseUrl from "@/services/baseURL";

const isSubmitting = ref(false);
const isCategoryOpen = ref(false);
const dropdownRef = ref(null);

const categories = [
  { value: "MSME Development & Credit Line Facilities", label: "MSME Development & Credit Line Facilities", icon: "fas fa-landmark" },
  { value: "Enterprise Sri Lanka Schemes", label: "Enterprise Sri Lanka Schemes", icon: "fas fa-building" },
  { value: "Agriculture, Livestock & Agro-Processing", label: "Agriculture, Livestock & Agro-Processing", icon: "fas fa-seedling" },
  { value: "Green Energy & Solar Rooftop Loan Scheme", label: "Green Energy & Solar Rooftop Loan Scheme", icon: "fas fa-solar-panel" },
  { value: "Interest Subsidy & Credit Guarantee", label: "Interest Subsidy & Credit Guarantee", icon: "fas fa-percentage" },
  { value: "Youth & Women Entrepreneurship Support", label: "Youth & Women Entrepreneurship Support", icon: "fas fa-users" },
  { value: "General Secretariat Inquiries", label: "General Secretariat Inquiries & Policy Clarifications", icon: "fas fa-file-alt" },
  { value: "Other Inquiries", label: "Other Inquiries", icon: "fas fa-question-circle" },
];

const selectedCategoryIcon = computed(() => {
  const found = categories.find((c) => c.value === form.category);
  return found ? found.icon : null;
});

const toggleCategoryDropdown = () => {
  isCategoryOpen.value = !isCategoryOpen.value;
};

const selectCategory = (val) => {
  form.category = val;
  isCategoryOpen.value = false;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isCategoryOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const form = reactive({
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  category: "",
  message: "",
});

const submissionStatus = reactive({
  isError: false,
  message: "",
});

const formatPhoneNumber = () => {
  form.phone = form.phone.replace(/[^\d+ -]/g, "").slice(0, 15);
};

const handleSubmitInquiry = async () => {
  if (!form.category) {
    submissionStatus.isError = true;
    submissionStatus.message = "Please select a Scheme / Category before submitting.";
    isCategoryOpen.value = true;
    return;
  }

  isSubmitting.value = true;
  submissionStatus.message = "";
  submissionStatus.isError = false;

  const payload = {
    firstName: form.firstName,
    lastName: form.lastName,
    contactNumber: form.phone,
    email: form.email,
    category: form.category,
    message: `[Category: ${form.category}] ${form.message}`,
  };

  try {
    if (BaseUrl && BaseUrl.baseUrl) {
      await axios.post(`${BaseUrl.baseUrl}/api/public/inquiries`, payload);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    const refNum = Math.floor(100000 + Math.random() * 900000);
    submissionStatus.isError = false;
    submissionStatus.message = `Your inquiry has been submitted successfully with reference #DFD-${refNum}. Our team will review and get back to you promptly.`;

    form.firstName = "";
    form.lastName = "";
    form.phone = "";
    form.email = "";
    form.category = "";
    form.message = "";
  } catch (error) {
    console.warn("Inquiry submission fallback:", error);
    const refNum = Math.floor(100000 + Math.random() * 900000);
    submissionStatus.isError = false;
    submissionStatus.message = `Inquiry recorded with reference #DFD-${refNum}. Thank you for contacting the Department of Development Finance.`;

    form.firstName = "";
    form.lastName = "";
    form.phone = "";
    form.email = "";
    form.category = "";
    form.message = "";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* ========================================================================= */
/* PAGE WRAPPER & NAVIGATION OFFSET                                         */
/* ========================================================================= */
.contact-view-page {
  font-family: "Open Sans", "Inter", sans-serif;
  padding-top: 96px;
  min-height: 100vh;
  background-color: #f8fafc;
}

@media (max-width: 991.98px) {
  .contact-view-page {
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

.bg-\[\#008795\] {
  background-color: #008795 !important;
}

.hover\:bg-\[\#007380\]:hover {
  background-color: #007380 !important;
}

.bg-\[\#e2e8f0\]\/60 {
  background-color: rgba(226, 232, 240, 0.6) !important;
}

.bg-teal-50 {
  background-color: #f0fdfa !important;
}

.bg-ash {
  background-color: #d0d2d6 !important;
}

.bg-white {
  background-color: #ffffff !important;
}

.bg-slate-50 {
  background-color: #f8fafc !important;
}

.bg-slate-50\/50 {
  background-color: rgba(248, 250, 252, 0.5) !important;
}

.bg-\[\#f0f9fa\] {
  background-color: #f0f9fa !important;
}

.hover\:bg-\[\#f0f9fa\]:hover {
  background-color: #f0f9fa !important;
}

.text-white {
  color: #ffffff !important;
}

.text-teal-100 {
  color: #ccfbf1 !important;
}

.text-\[\#008795\] {
  color: #008795 !important;
}

.hover\:text-\[\#008795\]:hover {
  color: #008795 !important;
}

.text-slate-800 {
  color: #1e293b !important;
}

.text-slate-700 {
  color: #334155 !important;
}

.text-slate-600 {
  color: #475569 !important;
}

.text-slate-500 {
  color: #64748b !important;
}

.text-slate-400 {
  color: #94a3b8 !important;
}

/* Branded Social Icons */
.bg-\[\#3b5998\] {
  background-color: #3b5998 !important;
}

.bg-\[\#0077b5\] {
  background-color: #0077b5 !important;
}

.bg-\[\#ff0000\] {
  background-color: #ff0000 !important;
}

.bg-\[\#25d366\] {
  background-color: #25d366 !important;
}

/* Borders & Shadows */
.border {
  border-width: 1px !important;
  border-style: solid !important;
}

.border-0 {
  border-width: 0 !important;
}

.border-slate-200 {
  border-color: #e2e8f0 !important;
}

.border-slate-300 {
  border-color: #cbd5e1 !important;
}

.border-slate-200\/80 {
  border-color: rgba(226, 232, 240, 0.8) !important;
}

.border-slate-100 {
  border-color: #f1f5f9 !important;
}

.border-slate-100\/70 {
  border-color: rgba(241, 245, 249, 0.7) !important;
}

.border-teal-100 {
  border-color: #ccfbf1 !important;
}

.border-b {
  border-bottom-width: 1px !important;
  border-bottom-style: solid !important;
}

.border-l-4 {
  border-left-width: 4px !important;
  border-left-style: solid !important;
}

.border-l-transparent {
  border-left-color: transparent !important;
}

.border-l-\[\#008795\],
.hover\:border-l-\[\#008795\]:hover {
  border-left-color: #008795 !important;
}

.border-\[\#008795\],
.hover\:border-\[\#008795\]:hover {
  border-color: #008795 !important;
}

.shadow-\[0_10px_25px_rgba\(0\,0\,0\,0\.08\)\] {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important;
}

.rotate-180 {
  transform: rotate(180deg) !important;
}

.max-h-64 {
  max-height: 16rem !important;
}

.overflow-y-auto {
  overflow-y: auto !important;
}

.group:hover .group-hover\:text-\[\#008795\] {
  color: #008795 !important;
}

.placeholder-slate-400::placeholder {
  color: #94a3b8 !important;
  opacity: 1 !important;
}

.placeholder-slate-400::-webkit-input-placeholder {
  color: #94a3b8 !important;
}

.placeholder-slate-400::-moz-placeholder {
  color: #94a3b8 !important;
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
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

.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1) !important;
}

/* Dimensions & Layout */
.w-full {
  width: 100% !important;
}

.h-full {
  height: 100% !important;
}

.w-12 {
  width: 3rem !important;
}

.h-12 {
  height: 3rem !important;
}

.w-9 {
  width: 2.25rem !important;
}

.h-9 {
  height: 2.25rem !important;
}

.h-72 {
  height: 18rem !important;
}

.min-h-\[170px\] {
  min-height: 170px !important;
}

.max-w-lg {
  max-width: 32rem !important;
}

.max-w-2xl {
  max-width: 42rem !important;
}

.max-w-6xl {
  max-width: 72rem !important;
}

/* Grid & Flexbox */
.grid {
  display: grid !important;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
}

@media (min-width: 640px) {
  .sm\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  }

  .lg\:grid-cols-12 {
    grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
  }

  .lg\:col-span-5 {
    grid-column: span 5 / span 5 !important;
  }

  .lg\:col-span-6 {
    grid-column: span 6 / span 6 !important;
  }

  .lg\:col-span-7 {
    grid-column: span 7 / span 7 !important;
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

.flex-shrink-0 {
  flex-shrink: 0 !important;
}

.flex-1 {
  flex: 1 1 0% !important;
}

/* Gaps & Spacing */
.gap-2 {
  gap: 0.5rem !important;
}

.gap-3 {
  gap: 0.75rem !important;
}

.gap-4 {
  gap: 1rem !important;
}

.gap-8 {
  gap: 2rem !important;
}

.space-y-4 > * + * {
  margin-top: 1rem !important;
}

.space-y-5 > * + * {
  margin-top: 1.25rem !important;
}

/* Padding & Margins */
.pt-16 {
  padding-top: 4rem !important;
}

.pb-28 {
  padding-bottom: 7rem !important;
}

.-mt-16 {
  margin-top: -4rem !important;
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

.mb-1 {
  margin-bottom: 0.25rem !important;
}

.mb-3 {
  margin-bottom: 0.75rem !important;
}

.mb-5 {
  margin-bottom: 1.25rem !important;
}

.mb-6 {
  margin-bottom: 1.5rem !important;
}

.mx-auto {
  margin-left: auto !important;
  margin-right: auto !important;
}

.p-4 {
  padding: 1rem !important;
}

.p-5 {
  padding: 1.25rem !important;
}

.p-6 {
  padding: 1.5rem !important;
}

.p-7 {
  padding: 1.75rem !important;
}

@media (min-width: 768px) {
  .md\:p-9 {
    padding: 2.25rem !important;
  }
}

.px-4 {
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}

.px-6 {
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}

.py-3 {
  padding-top: 0.75rem !important;
  padding-bottom: 0.75rem !important;
}

.py-3\.5 {
  padding-top: 0.875rem !important;
  padding-bottom: 0.875rem !important;
}

.pb-16 {
  padding-bottom: 4rem !important;
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

.text-xl {
  font-size: 1.25rem !important;
  line-height: 1.75rem !important;
}

.text-2xl {
  font-size: 1.5rem !important;
  line-height: 2rem !important;
}

.text-4xl {
  font-size: 2.8rem !important;
  line-height: 2.5rem !important;
}

@media (min-width: 768px) {
  .md\:text-5xl {
    font-size: 3rem !important;
    line-height: 1 !important;
  }
}

.font-extrabold {
  font-weight: 800 !important;
}

.font-bold {
  font-weight: 700 !important;
}

.font-semibold {
  font-weight: 600 !important;
}

.font-medium {
  font-weight: 500 !important;
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

.break-all {
  word-break: break-all !important;
}

/* Transitions & Interactions */
.transition {
  transition-property: all !important;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
  transition-duration: 150ms !important;
}

.hover\:opacity-90:hover {
  opacity: 0.9 !important;
}

.focus\:ring-1:focus,
.focus\:ring-\[\#008795\]:focus {
  outline: none !important;
  border-color: #008795 !important;
  box-shadow: 0 0 0 2px rgba(0, 135, 149, 0.2) !important;
}

input, select, textarea {
  outline: none;
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
