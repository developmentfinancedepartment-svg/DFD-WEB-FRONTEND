<template>
  <div class="team-page">
    <!-- Hero Header Banner -->
    <section class="hero-header">
      <div class="container text-center">
        <h1 class="hero-title">Department Leadership &amp; Directorate</h1>
        <p class="hero-subtitle">Key Officials, Division Heads &amp; Executive Directory — Department of Development Finance</p>
      </div>
    </section>

    <!-- Sticky Filter Bar -->
    <section class="sticky-filter-bar">
      <div class="container filter-bar-container filter-bar-end">
        <!-- Division Dropdown Filter (Hover Auto-Open) -->
        <div class="filter-dropdown-area">
          <div class="filter-label">
            <svg class="filter-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
            </svg>
            <span>Division:</span>
          </div>

          <div
            ref="dropdownRef"
            class="custom-dropdown"
            @mouseenter="isDropdownOpen = true"
            @mouseleave="isDropdownOpen = false"
          >
            <!-- Trigger Button -->
            <button
              type="button"
              class="dropdown-btn"
              :class="{ 'dropdown-btn-open': isDropdownOpen }"
              @click="toggleDropdown"
            >
              <span class="truncate">{{ selectedDivisionLabel }}</span>
              <svg
                class="chevron-icon"
                :class="{ 'rotate-180': isDropdownOpen }"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu List (Tight top offset mt-1) -->
            <transition name="dropdown-anim">
              <div
                v-if="isDropdownOpen"
                class="dropdown-menu-list"
              >
                <button
                  v-for="div in divisionOptions"
                  :key="div.value"
                  type="button"
                  class="dropdown-item"
                  :class="{ 'item-selected': selectedDivision === div.value }"
                  @click="selectDivision(div.value)"
                >
                  <span class="item-label-group">
                    <span
                      v-if="selectedDivision === div.value"
                      class="active-dot"
                    ></span>
                    <span>{{ div.label }}</span>
                  </span>
                  <svg
                    v-if="selectedDivision === div.value"
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

    <!-- Main Directory Content -->
    <main class="team-content pb-20 mb-8">
      <div class="container pb-12">
        <!-- Results Counter & Reset Filter Option -->
        <div class="results-meta-bar">
          <div class="results-count">
            Showing <strong>{{ totalResultsCount }}</strong> official{{ totalResultsCount === 1 ? '' : 's' }}
            <span v-if="selectedDivision !== 'ALL'" class="meta-tag">
              in {{ selectedDivisionLabel }}
            </span>
            <span v-if="searchQuery" class="meta-tag">
              matching "{{ searchQuery }}"
            </span>
          </div>

          <button
            v-if="selectedDivision !== 'ALL' || searchQuery"
            type="button"
            class="reset-filters-btn"
            @click="resetFilters"
          >
            Reset Filters
          </button>
        </div>

        <!-- ================================================================= -->
        <!-- LEVEL 0: EXECUTIVE SPOTLIGHT - DIRECTOR GENERAL                   -->
        <!-- ================================================================= -->
        <section v-if="showSpotlight" class="spotlight-section">
          <div class="spotlight-card">
            <!-- Teal Top Accent Bar -->
            <div class="spotlight-top-accent"></div>

            <div class="spotlight-grid grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <!-- Left Column: lg:col-span-7 -->
              <div class="spotlight-col-left lg:col-span-7">
                <div class="spotlight-title-group">
                  <span class="spotlight-eyebrow">HEAD OF DEPARTMENT</span>
                  <h2 class="spotlight-name">{{ directorGeneral.name }}</h2>
                  <p class="spotlight-designation">{{ directorGeneral.designation }}</p>
                </div>

                <p class="spotlight-mandate">
                  {{ directorGeneral.description || 'Leading the Department of Development Finance in coordinating national concessionary credit schemes, interest subsidy mechanisms, and financial inclusion frameworks across Sri Lanka.' }}
                </p>

                <div class="spotlight-location" v-if="directorGeneral.room">
                  <svg class="loc-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ directorGeneral.room }}</span>
                </div>
              </div>

              <!-- Right Column: lg:col-span-5 Compact Contact Channels Panel -->
              <div class="spotlight-col-right lg:col-span-5">
                <div class="spotlight-contact-panel">
                  <!-- Dynamic Contact Numbers List (Office, Ext, Mobile, Fax) - 2-Column Grid -->
                  <div class="contact-numbers-grid grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      v-for="c in getAvailableContacts(directorGeneral)"
                      :key="c.type"
                      :href="c.link"
                      class="spotlight-num-pill py-1.5 px-2.5"
                      :class="`pill-${c.type}`"
                      :title="`Call ${c.label}: ${c.value}`"
                    >
                      <span class="num-type-badge">{{ c.label }}</span>
                      <span class="num-val-text">{{ c.value }}</span>
                    </a>
                  </div>

                  <!-- Multiple Emails Grid Arranged Side-by-Side (2-Column Grid) -->
                  <div class="emails-panel-grid grid grid-cols-1 sm:grid-cols-2 gap-2" v-if="getEmailList(directorGeneral).length > 0">
                    <a
                      v-for="email in getEmailList(directorGeneral)"
                      :key="email"
                      :href="'mailto:' + email"
                      class="spotlight-email-row"
                      :title="`Send email to ${email}`"
                    >
                      <!-- Compact email icon container: w-5 h-5 -->
                      <div class="email-icon-box w-5 h-5 rounded-md bg-teal-50 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 email-svg">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <span class="email-row-text truncate">{{ email }}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ================================================================= -->
        <!-- CLEAN HIERARCHICAL DIRECTORY (CORPORATE DIRECTORY TABLES)         -->
        <!-- ================================================================= -->
        <div v-if="filteredHierarchy.length > 0" class="hierarchy-container mb-12">
          <section
            v-for="division in filteredHierarchy"
            :key="division.id"
            class="division-section"
          >
            <!-- Clean Division Header (No DIVISION 01 pill badge) -->
            <div class="division-banner-block">
              <div class="division-banner-left">
                <h2 class="division-heading">{{ division.title }}</h2>
              </div>
              <div class="division-banner-right">
                <span class="division-count-pill">
                  {{ division.totalOfficials }} Official{{ division.totalOfficials === 1 ? '' : 's' }}
                </span>
              </div>
            </div>

            <!-- Single Unified Corporate Directory Table per Division -->
            <div class="table-responsive-wrapper rounded-2xl border border-slate-200/80 overflow-x-auto shadow-xs bg-white">
              <table class="corporate-directory-table">
                <thead>
                  <tr>
                    <th class="th-name min-w-[200px] whitespace-nowrap" scope="col">Name</th>
                    <th class="th-designation" scope="col">Designation</th>
                    <th class="th-room max-w-[220px]" scope="col">Room</th>
                    <th class="th-contacts" scope="col">Contact Numbers</th>
                    <th class="th-email min-w-[260px]" scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-for="subsection in division.subsections"
                    :key="subsection.key"
                  >
                    <!-- Official Rows in this Subsection (Continuous list without category dividers) -->
                    <tr
                      v-for="officer in subsection.officials"
                      :key="officer.id || officer.name"
                      class="directory-row hover:bg-slate-50/80 transition-colors"
                    >
                      <!-- Column 1: Name -->
                      <td class="td-name min-w-[200px] whitespace-nowrap">
                        <span class="table-official-name whitespace-nowrap" :title="officer.name">
                          {{ officer.name }}
                        </span>
                      </td>

                      <!-- Column 2: Designation -->
                      <td class="td-designation">
                        <span class="table-designation-text" :title="officer.designation">
                          {{ officer.designation }}
                        </span>
                      </td>

                      <!-- Column 3: Room -->
                      <td class="td-room max-w-[220px] whitespace-normal break-words">
                        <div class="table-room-cell max-w-[220px] whitespace-normal break-words leading-snug" v-if="officer.room">
                          <svg class="table-room-icon shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" />
                          </svg>
                          <span class="table-room-text whitespace-normal break-words leading-snug">{{ officer.room }}</span>
                        </div>
                        <span v-else class="text-slate-300 text-xs">—</span>
                      </td>

                      <!-- Column 4: Contact Numbers (Rounded Pill Container Layout) -->
                      <td class="td-contacts">
                        <div class="table-contacts-wrap" v-if="getAvailableContacts(officer).length > 0">
                          <a
                            v-for="c in getAvailableContacts(officer)"
                            :key="c.type"
                            :href="c.link"
                            class="table-contact-pill"
                            :class="`pill-${c.type}`"
                            :title="`Call ${c.label}: ${c.value}`"
                          >
                            <span class="pill-type-tag">{{ c.label.toUpperCase() }}</span>
                            <span class="pill-value-text">{{ c.value }}</span>
                          </a>
                        </div>
                        <span v-else class="text-slate-300 text-xs">—</span>
                      </td>

                      <!-- Column 5: Clickable Emails (Button-like Pill Badge Design) -->
                      <td class="td-email min-w-[260px]">
                        <div class="table-emails-wrap" v-if="getEmailList(officer).length > 0">
                          <a
                            v-for="email in getEmailList(officer)"
                            :key="email"
                            :href="'mailto:' + email"
                            class="table-email-link w-fit max-w-none px-3 py-1.5 whitespace-nowrap"
                            :title="`Send email to ${email}`"
                          >
                            <svg viewBox="0 0 20 20" fill="currentColor" class="table-email-svg">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span class="table-email-text whitespace-nowrap">{{ email }}</span>
                          </a>
                        </div>
                        <span v-else class="text-slate-300 text-xs">—</span>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <!-- ================================================================= -->
        <!-- RIGHT TO INFORMATION (RTI) SECTION                                -->
        <!-- ================================================================= -->
        <section
          id="rti"
          class="rti-section"
          v-if="showRtiSection"
          style="margin-top: 3.5rem; padding-top: 2.5rem; border-top: 1px solid rgba(226, 232, 240, 0.9); margin-bottom: 4rem;"
        >
          <!-- Clean Centered Section Heading (Matching "Our Services" Style) -->
          <div
            class="rti-heading-block section-header text-center mb-10"
            style="text-align: center; margin-bottom: 2.5rem;"
          >
            <h2
              class="rti-title section-title text-3xl md:text-4xl font-bold text-[#008294]"
              style="font-size: 2.2rem; font-weight: 800; color: #008294; letter-spacing: -0.5px; margin: 0;"
            >
              Right to Information (RTI) Officers
            </h2>
            <div
              class="rti-title-underline title-underline w-14 h-1 bg-[#008294] rounded-full mx-auto mt-3"
              style="width: 56px; height: 4px; background-color: #008294; border-radius: 9999px; margin: 12px auto 0;"
            ></div>
          </div>

          <!-- Dynamic RTI Officer Cards Grid (2-Column or 3-Column depending on officer count) -->
          <div
            class="rti-cards-grid"
            :class="filteredRtiOfficers.length >= 3
              ? 'rti-grid-3-col grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'rti-grid-2-col grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'"
            style="margin-top: 1.5rem;"
          >
            <div
              v-for="officer in filteredRtiOfficers"
              :key="officer.id || officer.name"
              class="rti-card h-full flex flex-col justify-between"
              style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between; height: 100%;"
            >
              <!-- Card Top Content Area -->
              <div class="card-content-top flex-1">
                <!-- Name & Designation (Top Pill Tag Removed) -->
                <h3
                  class="rti-officer-name text-lg font-bold text-slate-900"
                  style="font-size: 1.15rem; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 0.25rem; line-height: 1.35;"
                >
                  {{ officer.name }}
                </h3>
                <p
                  class="rti-officer-designation text-sm font-medium text-teal-700"
                  style="font-size: 0.875rem; font-weight: 600; color: #0f766e; margin: 0; line-height: 1.4;"
                >
                  {{ officer.designation }}
                </p>

                <!-- Location: Admin and Accounts • Room 149, 1ˢᵗ Floor, The Secretariat -->
                <div
                  class="rti-location-box"
                  style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.775rem; color: #475569; margin-top: 0.85rem; line-height: 1.5; background-color: #f8fafc; padding: 10px 12px; border-radius: 12px; border: 1px solid #f1f5f9;"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="rti-loc-svg"
                    style="width: 16px; height: 16px; min-width: 16px; min-height: 16px; flex-shrink: 0; margin-top: 2px; color: #0d9488;"
                  >
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" />
                  </svg>
                  <div class="rti-location-text" style="flex: 1;">
                    <span class="rti-division-name" style="font-weight: 600; color: #1e293b;">{{ officer.division }}</span>
                    <span class="rti-location-bullet" style="margin: 0 6px; color: #94a3b8;">&bull;</span>
                    <span class="rti-room-text" v-html="formatRoom(officer.room)"></span>
                  </div>
                </div>
              </div>

              <!-- Contact Details Footer (Pushed to bottom) -->
              <div
                class="rti-card-footer mt-auto"
                style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid #f1f5f9; display: flex; flex-direction: column; gap: 8px;"
              >
                <!-- Office & Mobile Numbers on a Single Row (EXT Removed) -->
                <div
                  v-if="officer.contacts && (officer.contacts.office || officer.contacts.mobile)"
                  class="rti-contact-rows grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                  style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px;"
                >
                  <a
                    v-if="officer.contacts.office"
                    :href="'tel:' + cleanPhone(officer.contacts.office)"
                    class="rti-contact-badge"
                    style="display: flex; align-items: center; justify-content: space-between; padding: 7px 10px; border-radius: 10px; background-color: #f8fafc; border: 1px solid #e2e8f0; text-decoration: none; font-size: 0.775rem;"
                    :title="`Call Office: ${officer.contacts.office}`"
                  >
                    <span
                      class="rti-contact-tag"
                      style="text-transform: uppercase; font-weight: 700; font-size: 0.625rem; letter-spacing: 0.05em; padding: 2px 5px; border-radius: 4px; background-color: #e2e8f0; color: #334155;"
                    >
                      OFFICE
                    </span>
                    <span
                      class="rti-contact-value"
                      style="font-weight: 600; color: #1e293b; font-size: 0.75rem;"
                    >
                      {{ officer.contacts.office }}
                    </span>
                  </a>

                  <a
                    v-if="officer.contacts.mobile"
                    :href="'tel:' + cleanPhone(officer.contacts.mobile)"
                    class="rti-contact-badge"
                    style="display: flex; align-items: center; justify-content: space-between; padding: 7px 10px; border-radius: 10px; background-color: #f8fafc; border: 1px solid #e2e8f0; text-decoration: none; font-size: 0.775rem;"
                    :title="`Call Mobile: ${officer.contacts.mobile}`"
                  >
                    <span
                      class="rti-contact-tag"
                      style="text-transform: uppercase; font-weight: 700; font-size: 0.625rem; letter-spacing: 0.05em; padding: 2px 5px; border-radius: 4px; background-color: #e2e8f0; color: #334155;"
                    >
                      MOBILE
                    </span>
                    <span
                      class="rti-contact-value"
                      style="font-weight: 600; color: #1e293b; font-size: 0.75rem;"
                    >
                      {{ officer.contacts.mobile }}
                    </span>
                  </a>
                </div>

                <!-- Full-Width Clickable Soft-Teal Email Button -->
                <div class="rti-email-btn-wrap" v-if="getEmailList(officer).length > 0" style="padding-top: 4px;">
                  <a
                    v-for="email in getEmailList(officer)"
                    :key="email"
                    :href="'mailto:' + email"
                    class="rti-email-btn"
                    style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; background-color: #f0fdfa; color: #0f766e; border: 1px solid rgba(153, 246, 228, 0.8); border-radius: 10px; padding: 8px 14px; font-size: 0.775rem; font-weight: 600; text-decoration: none;"
                    :title="`Send email to ${email}`"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="rti-email-svg"
                      style="width: 16px; height: 16px; min-width: 16px; min-height: 16px; flex-shrink: 0;"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span class="rti-email-address" style="word-break: break-all;">{{ email }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Empty Search / Filter Results State -->
        <div v-else-if="!showSpotlight && !showRtiSection" class="empty-state-box">
          <div class="empty-icon-wrap">
            <svg class="empty-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          </div>
          <h3 class="empty-title">No Officials Found</h3>
          <p class="empty-desc">
            We couldn't find any officials matching your criteria. Try adjusting your search query or reset the division filter.
          </p>
          <button type="button" class="empty-action-btn" @click="resetFilters">
            Clear Filters &amp; Show All
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import BaseUrl from '@/services/baseURL';
import { navbarSearchState, clearNavbarSearch, setNavbarSearchQuery } from '@/services/navbarSearchState';

const route = useRoute();
// Reactive search query bound to Navbar Search state
const searchQuery = computed({
  get() {
    return navbarSearchState.query;
  },
  set(val) {
    setNavbarSearchQuery(val);
  }
});

const selectedDivision = ref('ALL');
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);
const loading = ref(false);

/**
 * Division filter options organized under the official divisions
 */
const divisionOptions = [
  { label: 'All Divisions', value: 'ALL' },
  { label: 'Executive Directorate', value: 'Executive Directorate' },
  { label: 'Financial Solution', value: 'Financial Solution' },
  { label: 'Market Access & Development', value: 'Market Access & Development' },
  { label: 'Admin and Accounts', value: 'Admin and Accounts' }
];

const selectedDivisionLabel = computed(() => {
  const match = divisionOptions.find(opt => opt.value === selectedDivision.value);
  return match ? match.label : 'All Divisions';
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectDivision = (val) => {
  selectedDivision.value = val;
  isDropdownOpen.value = false;
};

const resetFilters = () => {
  clearNavbarSearch();
  selectedDivision.value = 'ALL';
  isDropdownOpen.value = false;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

/**
 * LEVEL 0: Top Executive Spotlight for Director General
 */
const defaultDirectorGeneral = {
  id: 'dg-hettiarachchi',
  name: 'Mr. P.M.K. Hettiarachchi',
  designation: 'Director General',
  division: 'Executive Directorate',
  hierarchyLevel: 'HEAD',
  room: 'Room 140, 1st Floor, The Secretariat, Lotus Road, Colombo 01',
  description: 'Leading the Department of Development Finance in coordinating national concessionary credit schemes, interest subsidy mechanisms, and financial inclusion frameworks across Sri Lanka.',
  contacts: {
    office: '+94 11 248 4511',
    ext: '1400',
    mobile: '+94 71 845 2100',
    fax: '+94 11 248 4512'
  },
  emails: [
    'dgdf@dfd.treasury.gov.lk',
    'hettiarachchi.pmk@treasury.gov.lk'
  ]
};

const directorGeneral = ref(defaultDirectorGeneral);

/**
 * Strict Hierarchical Division & Plain Role Structure
 */
const hierarchyStructure = [
  // =========================================================================
  // DIVISION 1: FINANCIAL SOLUTION DIVISION
  // =========================================================================
  {
    id: 'financial-solution',
    title: 'Financial Solution Division',
    divisionValue: 'Financial Solution',
    subsections: [
      {
        key: 'adg',
        title: 'Additional Director General (ADG)'
      },
      {
        key: 'directors',
        title: 'Directors'
      },
      {
        key: 'deputy_directors',
        title: 'Deputy Directors'
      },
      {
        key: 'assistant_directors_officers',
        title: 'Assistant Directors & Officers'
      }
    ]
  },

  // =========================================================================
  // DIVISION 2: MARKET ACCESS & DEVELOPMENT DIVISION
  // =========================================================================
  {
    id: 'market-access',
    title: 'Market Access & Development Division',
    divisionValue: 'Market Access & Development',
    subsections: [
      {
        key: 'adg',
        title: 'Additional Director General (ADG)'
      },
      {
        key: 'directors',
        title: 'Directors'
      },
      {
        key: 'deputy_directors',
        title: 'Deputy Directors'
      }
    ]
  },

  // =========================================================================
  // DIVISION 3: ADMIN AND ACCOUNTS DIVISION
  // =========================================================================
  {
    id: 'admin-accounts',
    title: 'Admin and Accounts Division',
    divisionValue: 'Admin and Accounts',
    subsections: [
      {
        key: 'adg',
        title: 'Additional Director General (ADG)'
      },
      {
        key: 'directors_admin_finance',
        title: 'Directors (Admin & Finance)'
      },
      {
        key: 'deputy_directors',
        title: 'Deputy Directors'
      },
      {
        key: 'cmso_development_officers',
        title: 'CMSO & Development Officers'
      }
    ]
  }
];

const defaultOfficials = [
  // Division 1: Financial Solution
  {
    id: 2,
    name: 'Mr. H.M.A.S. Herath',
    designation: 'Additional Director General (Financial Solutions)',
    division: 'Financial Solution',
    hierarchyLevel: 'ADG',
    subsectionKey: 'adg',
    room: 'Room 145, 1st Floor',
    description: 'Overseeing the strategic direction of credit solutions, SME concessionary loan facilities, and sovereign guarantee funds.',
    contacts: {
      office: '+94 11 248 4520',
      ext: '1410',
      mobile: '+94 71 234 5670',
      fax: '+94 11 248 4521'
    },
    emails: ['adg.fs@dfd.treasury.gov.lk', 'herath.adg@treasury.gov.lk']
  },
  {
    id: 3,
    name: 'Mr. K.A.D.S. Nanayakkara',
    designation: 'Director - Financial Solutions Division',
    division: 'Financial Solution',
    hierarchyLevel: 'DIRECTOR',
    subsectionKey: 'directors',
    room: 'Room 150, 1st Floor',
    description: 'Heading program formulation, monitoring credit allocations to participatory financial institutions.',
    contacts: {
      office: '+94 11 248 4530',
      ext: '1420',
      mobile: '+94 77 345 6789',
      fax: '+94 11 248 4531'
    },
    emails: ['director.fs@dfd.treasury.gov.lk', 'nanayakkara.kads@dfd.treasury.gov.lk']
  },
  {
    id: 4,
    name: 'Mrs. K.M.S.D. Jayasekara',
    designation: 'Director - Concessionary Credit & Schemes',
    division: 'Financial Solution',
    hierarchyLevel: 'DIRECTOR',
    subsectionKey: 'directors',
    room: 'Room 152, 1st Floor',
    description: 'Specializing in green finance mechanisms, revolving credit funds, and MSME refinance frameworks.',
    contacts: {
      office: '+94 11 248 4535',
      ext: '1425',
      mobile: '+94 71 456 7890'
    },
    emails: ['credit.schemes@dfd.treasury.gov.lk', 'jayasekara.kmsd@dfd.treasury.gov.lk']
  },
  {
    id: 5,
    name: 'Mr. R.M.A.P. Rathnayake',
    designation: 'Deputy Director - Financial Solutions',
    division: 'Financial Solution',
    hierarchyLevel: 'DEPUTY_DIRECTOR',
    subsectionKey: 'deputy_directors',
    room: 'Room 154, 1st Floor',
    description: 'Managing commercial bank interest subsidy reconciliations and claim verifications.',
    contacts: {
      office: '+94 11 248 4540',
      ext: '1428',
      mobile: '+94 76 567 8901'
    },
    emails: ['rathnayake.rmap@dfd.treasury.gov.lk', 'subsidy.monitoring@dfd.treasury.gov.lk']
  },
  {
    id: 6,
    name: 'Ms. W.A.S.M. Wickramasinghe',
    designation: 'Deputy Director - Interest Subsidy & Monitoring',
    division: 'Financial Solution',
    hierarchyLevel: 'DEPUTY_DIRECTOR',
    subsectionKey: 'deputy_directors',
    room: 'Room 155, 1st Floor',
    description: 'Conducting financial feasibility audits on regional partner banking branches.',
    contacts: {
      office: '+94 11 248 4542',
      ext: '1429',
      mobile: '+94 77 678 9012'
    },
    emails: ['wickramasinghe.wasm@dfd.treasury.gov.lk']
  },
  {
    id: 7,
    name: 'Mr. T.M.N.B. Thennakoon',
    designation: 'Assistant Director',
    division: 'Financial Solution',
    hierarchyLevel: 'ASSISTANT_DIRECTOR',
    subsectionKey: 'assistant_directors_officers',
    room: 'Room 157, 1st Floor',
    description: 'Field level coordination with district secretariats on enterprise loan uptake.',
    contacts: {
      office: '+94 11 248 4544',
      ext: '1432',
      mobile: '+94 71 789 0123'
    },
    emails: ['thennakoon.tmnb@dfd.treasury.gov.lk']
  },
  {
    id: 8,
    name: 'Ms. K.G.C.L. Gamage',
    designation: 'Assistant Director',
    division: 'Financial Solution',
    hierarchyLevel: 'ASSISTANT_DIRECTOR',
    subsectionKey: 'assistant_directors_officers',
    room: 'Room 158, 1st Floor',
    description: 'Analysis of quarterly disbursement reports and beneficiary database management.',
    contacts: {
      office: '+94 11 248 4546',
      ext: '1434',
      mobile: '+94 70 890 1234'
    },
    emails: ['gamage.kgcl@dfd.treasury.gov.lk']
  },
  {
    id: 9,
    name: 'Mr. W.M.K.R. Weerakoon',
    designation: 'Development Officer - Schemes Execution',
    division: 'Financial Solution',
    hierarchyLevel: 'ASSISTANT_DIRECTOR',
    subsectionKey: 'assistant_directors_officers',
    room: 'Room 159, 1st Floor',
    description: 'Verification of borrower documentation and regional cooperative compliance.',
    contacts: {
      office: '+94 11 248 4548',
      ext: '1436',
      mobile: '+94 77 901 2345'
    },
    emails: ['weerakoon.wmkr@dfd.treasury.gov.lk']
  },
  {
    id: 10,
    name: 'Ms. P.H.N. De Silva',
    designation: 'Development Officer - Credit Appraisal',
    division: 'Financial Solution',
    hierarchyLevel: 'ASSISTANT_DIRECTOR',
    subsectionKey: 'assistant_directors_officers',
    room: 'Room 159, 1st Floor',
    description: 'Appraisal of loan claims submitted by private commercial banks.',
    contacts: {
      office: '+94 11 248 4549',
      ext: '1437',
      mobile: '+94 78 012 3456'
    },
    emails: ['desilva.phn@dfd.treasury.gov.lk']
  },
  {
    id: 11,
    name: 'Mr. M.D.K. Perera',
    designation: 'Development Officer - Data & Verification',
    division: 'Financial Solution',
    hierarchyLevel: 'ASSISTANT_DIRECTOR',
    subsectionKey: 'assistant_directors_officers',
    room: 'Room 159, 1st Floor',
    description: 'National database entry and interest subsidy calculation validation.',
    contacts: {
      office: '+94 11 248 4552',
      ext: '1438',
      mobile: '+94 72 123 4567'
    },
    emails: ['perera.mdk@dfd.treasury.gov.lk']
  },

  // Division 2: Market Access & Development
  {
    id: 12,
    name: 'Mrs. C.K. Wickramatunga',
    designation: 'Additional Director General (Market Access & Development)',
    division: 'Market Access & Development',
    hierarchyLevel: 'ADG',
    subsectionKey: 'adg',
    room: 'Room 148, 1st Floor',
    description: 'Guiding value-chain linkages, export credit promotion, and agricultural market development.',
    contacts: {
      office: '+94 11 248 4545',
      ext: '1430',
      mobile: '+94 71 345 6780',
      fax: '+94 11 248 4546'
    },
    emails: ['adg.mad@dfd.treasury.gov.lk', 'wickramatunga.ck@treasury.gov.lk']
  },
  {
    id: 13,
    name: 'Mr. D.L.P. Bandara',
    designation: 'Director - Market Access & Value Chain Development',
    division: 'Market Access & Development',
    hierarchyLevel: 'DIRECTOR',
    subsectionKey: 'directors',
    room: 'Room 160, 1st Floor',
    description: 'Formulating forward linkage partnerships with export chambers and agri-commodity boards.',
    contacts: {
      office: '+94 11 248 4550',
      ext: '1440',
      mobile: '+94 77 123 4567',
      fax: '+94 11 248 4551'
    },
    emails: ['director.mad@dfd.treasury.gov.lk', 'bandara.dlp@dfd.treasury.gov.lk']
  },
  {
    id: 14,
    name: 'Mrs. T.K. Wickramasinghe',
    designation: 'Deputy Director - Commercial Agriculture Promotion & Markets',
    division: 'Market Access & Development',
    hierarchyLevel: 'DEPUTY_DIRECTOR',
    subsectionKey: 'deputy_directors',
    room: 'Room 162, 1st Floor',
    description: 'Facilitating commercial farming modernization and cold-chain facility loans.',
    contacts: {
      office: '+94 11 248 4554',
      ext: '1442',
      mobile: '+94 71 567 8901'
    },
    emails: ['valuechains@dfd.treasury.gov.lk']
  },
  {
    id: 15,
    name: 'Mr. H.M.S.B. Herath',
    designation: 'Deputy Director - Entrepreneurship Outreach & MSME Clusters',
    division: 'Market Access & Development',
    hierarchyLevel: 'DEPUTY_DIRECTOR',
    subsectionKey: 'deputy_directors',
    room: 'Room 163, 1st Floor',
    description: 'Conducting capacity building workshops and MSME market-entry mentoring.',
    contacts: {
      office: '+94 11 248 4558',
      ext: '1445',
      mobile: '+94 76 678 9012'
    },
    emails: ['outreach.mad@dfd.treasury.gov.lk', 'herath.hmsb@dfd.treasury.gov.lk']
  },
  {
    id: 16,
    name: 'Ms. K.G.N. Fernando',
    designation: 'Deputy Director - Progress Monitoring & Field Verification',
    division: 'Market Access & Development',
    hierarchyLevel: 'DEPUTY_DIRECTOR',
    subsectionKey: 'deputy_directors',
    room: 'Room 164, 1st Floor',
    description: 'Leading on-site inspection missions to evaluate beneficiary enterprise performance.',
    contacts: {
      office: '+94 11 248 4562',
      ext: '1448',
      mobile: '+94 77 234 5678'
    },
    emails: ['monitoring@dfd.treasury.gov.lk']
  },

  // Division 3: Admin and Accounts
  {
    id: 17,
    name: 'Mr. M.S.I. Peiris',
    designation: 'Additional Director General (Admin & Accounts)',
    division: 'Admin and Accounts',
    hierarchyLevel: 'ADG',
    subsectionKey: 'adg',
    room: 'Room 149, 1st Floor',
    description: 'Strategic stewardship over institutional budget, establishment matters, and parliamentary reporting.',
    contacts: {
      office: '+94 11 248 4565',
      ext: '1450',
      mobile: '+94 71 890 1234',
      fax: '+94 11 248 4566'
    },
    emails: ['adg.admin@dfd.treasury.gov.lk', 'peiris.msi@treasury.gov.lk']
  },
  {
    id: 18,
    name: 'Mrs. A.H.M. Nizam',
    designation: 'Director (Admin & Finance)',
    division: 'Admin and Accounts',
    hierarchyLevel: 'DIRECTOR',
    subsectionKey: 'directors_admin_finance',
    room: 'Room 172, 1st Floor',
    description: 'Directing general administration, public finance circular compliance, and internal audit oversight.',
    contacts: {
      office: '+94 11 248 4574',
      ext: '1462',
      mobile: '+94 77 456 7890',
      fax: '+94 11 248 4575'
    },
    emails: ['accounts@dfd.treasury.gov.lk', 'nizam.ahm@dfd.treasury.gov.lk']
  },
  {
    id: 19,
    name: 'Mr. P.G.D. Karunaratne',
    designation: 'Deputy Director - Logistics, Fleet & Procurement',
    division: 'Admin and Accounts',
    hierarchyLevel: 'DEPUTY_DIRECTOR',
    subsectionKey: 'deputy_directors',
    room: 'Room 173, 1st Floor',
    description: 'Managing department facilities, asset registry, and government procurement processes.',
    contacts: {
      office: '+94 11 248 4578',
      ext: '1465',
      mobile: '+94 78 567 8901'
    },
    emails: ['procurement@dfd.treasury.gov.lk']
  },
  {
    id: 20,
    name: 'Mr. E.A.N. Senarath',
    designation: 'Deputy Director - Scheme Disbursements & Financial Audits',
    division: 'Admin and Accounts',
    hierarchyLevel: 'DEPUTY_DIRECTOR',
    subsectionKey: 'deputy_directors',
    room: 'Room 175, 1st Floor',
    description: 'Supervising treasury payment vouchers and annual parliamentary performance audit preparations.',
    contacts: {
      office: '+94 11 248 4584',
      ext: '1469',
      mobile: '+94 77 789 0123'
    },
    emails: ['disbursements@dfd.treasury.gov.lk']
  },
  {
    id: 21,
    name: 'Ms. I.U. Dissanayake',
    designation: 'Chief Management Service Officer (CMSO) - Operations',
    division: 'Admin and Accounts',
    hierarchyLevel: 'ASSISTANT_DIRECTOR',
    subsectionKey: 'cmso_development_officers',
    room: 'Room 174, 1st Floor',
    description: 'Supervising establishment affairs, official correspondence dispatch, and HR records.',
    contacts: {
      office: '+94 11 248 4582',
      ext: '1468',
      mobile: '+94 71 678 9012'
    },
    emails: ['admin.support@dfd.treasury.gov.lk']
  },
  {
    id: 22,
    name: 'Mr. B.M.C. Weerasinghe',
    designation: 'Development Officer - General Administration & Records',
    division: 'Admin and Accounts',
    hierarchyLevel: 'ASSISTANT_DIRECTOR',
    subsectionKey: 'cmso_development_officers',
    room: 'Room 176, 1st Floor',
    description: 'Managing institutional archiving, RTI request handling, and vehicle log maintenance.',
    contacts: {
      office: '+94 11 248 4586',
      ext: '1470',
      mobile: '+94 70 890 1234'
    },
    emails: ['records.admin@dfd.treasury.gov.lk']
  }
];

const officials = ref(defaultOfficials);

const mapHierarchyToSubsectionKey = (hierarchyLevel, division, designation = '') => {
  const level = (hierarchyLevel || '').toUpperCase();
  const des = (designation || '').toLowerCase();

  if (level === 'ADG' || des.includes('additional director general') || des.includes('adg')) {
    return 'adg';
  }
  if (level === 'DIRECTOR' || des.startsWith('director')) {
    return division === 'Admin and Accounts' ? 'directors_admin_finance' : 'directors';
  }
  if (level === 'DEPUTY_DIRECTOR' || des.includes('deputy director')) {
    return 'deputy_directors';
  }
  if (level === 'ASSISTANT_DIRECTOR' || des.includes('assistant director') || des.includes('officer')) {
    return division === 'Admin and Accounts' ? 'cmso_development_officers' : 'assistant_directors_officers';
  }
  return division === 'Admin and Accounts' ? 'cmso_development_officers' : 'assistant_directors_officers';
};

const mapOfficial = (item) => {
  let designation = item.designation;
  if (
    item.name === 'Mr. P.M.K. Hettiarachchi' ||
    item.hierarchyLevel === 'HEAD' ||
    (designation && designation.toLowerCase().includes('director general'))
  ) {
    designation = 'Director General';
  }

  return {
    id: item.id,
    name: item.name,
    designation: designation,
    division: item.division,
    hierarchyLevel: item.hierarchyLevel,
    subsectionKey: mapHierarchyToSubsectionKey(item.hierarchyLevel, item.division, designation),
    room: item.room,
    description: item.description,
    displayOrder: item.displayOrder,
    contacts: {
      office: item.officePhone,
      ext: item.extension,
      mobile: item.mobilePhone,
      fax: item.fax
    },
    emails: [item.primaryEmail, item.secondaryEmail].filter(e => typeof e === 'string' && e.trim().length > 0)
  };
};

/**
 * Normalizes phone string for tel: URI
 */
const cleanPhone = (phone) => {
  if (!phone) return '';
  return phone.replace(/[^\d+]/g, '');
};

const hasAnyContact = (official) => {
  if (!official || !official.contacts) return false;
  const c = official.contacts;
  return Boolean(c.office || c.ext || c.mobile || c.fax);
};

/**
 * Extracts available contact numbers dynamically
 * Supports: Office, Ext, Mobile, Fax
 */
const getAvailableContacts = (official) => {
  if (!official || !official.contacts) return [];
  const list = [];
  const c = official.contacts;

  // 1. Office
  if (c.office) {
    list.push({
      type: 'office',
      label: 'Office',
      value: c.office,
      link: 'tel:' + cleanPhone(c.office)
    });
  }

  // 2. Ext
  if (c.ext) {
    list.push({
      type: 'ext',
      label: 'Ext',
      value: c.ext,
      link: 'tel:' + cleanPhone(c.ext)
    });
  }

  // 3. Mobile
  if (c.mobile) {
    list.push({
      type: 'mobile',
      label: 'Mobile',
      value: c.mobile,
      link: 'tel:' + cleanPhone(c.mobile)
    });
  }

  // 4. Fax
  if (c.fax) {
    list.push({
      type: 'fax',
      label: 'Fax',
      value: c.fax,
      link: 'tel:' + cleanPhone(c.fax)
    });
  }

  return list;
};

/**
 * Retrieves valid email addresses list
 */
const getEmailList = (official) => {
  if (!official) return [];
  if (Array.isArray(official.emails) && official.emails.length > 0) {
    return official.emails.filter(e => typeof e === 'string' && e.trim().length > 0);
  }
  if (official.email && typeof official.email === 'string') {
    return [official.email.trim()];
  }
  return [];
};

/**
 * Extracts initials for avatar monogram fallback
 */
const getInitials = (name) => {
  if (!name) return 'DFD';
  const clean = name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.)\s+/i, '').trim();
  const parts = clean.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
};

/**
 * Determines whether to display the Level 0 Spotlight Card
 */
const showSpotlight = computed(() => {
  if (!directorGeneral.value) return false;
  const matchesDivision = selectedDivision.value === 'ALL' || selectedDivision.value === 'Executive Directorate';
  if (!matchesDivision) return false;

  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return true;

  const nameMatch = directorGeneral.value.name.toLowerCase().includes(query);
  const desigMatch = directorGeneral.value.designation.toLowerCase().includes(query);
  const divMatch = directorGeneral.value.division && directorGeneral.value.division.toLowerCase().includes(query);
  const roomMatch = directorGeneral.value.room && directorGeneral.value.room.toLowerCase().includes(query);
  const extMatch = directorGeneral.value.contacts?.ext?.toLowerCase().includes(query);
  const phoneMatch = Object.values(directorGeneral.value.contacts || {}).some(v => typeof v === 'string' && v.toLowerCase().includes(query));
  const emailMatch = directorGeneral.value.emails?.some(e => typeof e === 'string' && e.toLowerCase().includes(query));
  const descMatch = directorGeneral.value.description && directorGeneral.value.description.toLowerCase().includes(query);

  return nameMatch || desigMatch || divMatch || roomMatch || extMatch || phoneMatch || emailMatch || descMatch;
});

/**
 * Reactive hierarchical organizational breakdown
 * Groups filtered officials strictly by Division and Subsection
 */
const filteredHierarchy = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  const selectedDiv = selectedDivision.value;

  return hierarchyStructure
    .filter(division => {
      if (selectedDiv === 'ALL') return true;
      if (selectedDiv === 'Executive Directorate') return false;
      return division.divisionValue === selectedDiv;
    })
    .map(division => {
      // Filter each subsection's officials
      const filteredSubsections = division.subsections
        .map(sub => {
          const members = officials.value.filter(officer => {
            const matchesDivision = officer.division === division.divisionValue;
            const matchesSub = officer.subsectionKey === sub.key;
            if (!matchesDivision || !matchesSub) return false;

            if (!query) return true;

            const nameMatch = officer.name && officer.name.toLowerCase().includes(query);
            const desigMatch = officer.designation && officer.designation.toLowerCase().includes(query);
            const divMatch = officer.division && officer.division.toLowerCase().includes(query);
            const roomMatch = officer.room && officer.room.toLowerCase().includes(query);
            const extMatch = officer.contacts?.ext && officer.contacts.ext.toLowerCase().includes(query);
            const phoneMatch = officer.contacts && Object.values(officer.contacts).some(v => typeof v === 'string' && v.toLowerCase().includes(query));
            const emailMatch = officer.emails && officer.emails.some(e => typeof e === 'string' && e.toLowerCase().includes(query));
            const descMatch = officer.description && officer.description.toLowerCase().includes(query);

            return nameMatch || desigMatch || divMatch || roomMatch || extMatch || phoneMatch || emailMatch || descMatch;
          });

          return {
            ...sub,
            officials: members
          };
        })
        .filter(sub => sub.officials.length > 0);

      const totalOfficials = filteredSubsections.reduce((acc, sub) => acc + sub.officials.length, 0);

      return {
        ...division,
        subsections: filteredSubsections,
        totalOfficials
      };
    })
    .filter(division => division.subsections.length > 0);
});

/**
 * Right to Information (RTI) Statutory Officers (2 Officers: Designated Officer & Information Officer)
 */
const defaultRtiOfficers = [
  
];

const rtiOfficers = ref(defaultRtiOfficers);

const filteredRtiOfficers = computed(() => {
  const query = (searchQuery.value || '').trim().toLowerCase();
  let list = rtiOfficers.value;

  if (query) {
    list = list.filter(officer => {
      const name = (officer.name || '').toLowerCase();
      const des = (officer.designation || '').toLowerCase();
      const div = (officer.division || '').toLowerCase();
      const room = (officer.room || '').toLowerCase();
      const emails = (officer.emails || []).join(' ').toLowerCase();
      const phones = Object.values(officer.contacts || {}).join(' ').toLowerCase();

      return (
        name.includes(query) ||
        des.includes(query) ||
        div.includes(query) ||
        room.includes(query) ||
        emails.includes(query) ||
        phones.includes(query) ||
        'right to information'.includes(query) ||
        'rti'.includes(query)
      );
    });
  }

  // Sort RTI officers by displayOrder ascending (controlled from CMS)
  return [...list].sort((a, b) => {
    const orderA = a.displayOrder != null && !isNaN(a.displayOrder) ? Number(a.displayOrder) : 999;
    const orderB = b.displayOrder != null && !isNaN(b.displayOrder) ? Number(b.displayOrder) : 999;
    if (orderA !== orderB) return orderA - orderB;
    const aDes = (a.designation || '').toLowerCase().includes('designated') ? 0 : 1;
    const bDes = (b.designation || '').toLowerCase().includes('designated') ? 0 : 1;
    return aDes - bDes;
  });
});

const showRtiSection = computed(() => {
  if (searchQuery.value && searchQuery.value.trim()) {
    return filteredRtiOfficers.value.length > 0;
  }
  return selectedDivision.value === 'ALL' || selectedDivision.value === 'Admin and Accounts';
});

/**
 * Format room location string to include superscript ordinal suffixes (e.g., 1ˢᵗ Floor)
 */
const formatRoom = (room) => {
  if (!room) return '';
  return room.replace(/(\d+)(st|nd|rd|th)\b/gi, '$1<sup>$2</sup>');
};

/**
 * RTI Role badge styling classes based on officer role type
 */
const getRtiBadgeClass = (roleType) => {
  switch (roleType) {
    case 'DESIGNATED':
      return 'role-designated';
    case 'INFORMATION':
      return 'role-information';
    default:
      return 'role-default';
  }
};

/**
 * RTI Role icon classes
 */
const getRtiBadgeIcon = (roleType) => {
  switch (roleType) {
    case 'DESIGNATED':
      return 'fas fa-user-shield';
    case 'INFORMATION':
      return 'fas fa-info-circle';
    default:
      return 'fas fa-shield-alt';
  }
};

/**
 * RTI Role badge inline styles guarantee
 */
const getRtiBadgeInlineStyle = (roleType) => {
  if (roleType === 'DESIGNATED') {
    return {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '700',
      lineHeight: '1.2',
      backgroundColor: '#eef2ff',
      color: '#4338ca',
      border: '1px solid #c7d2fe'
    };
  }
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '700',
    lineHeight: '1.2',
    backgroundColor: '#ecfdf5',
    color: '#047857',
    border: '1px solid #a7f3d0'
  };
};

/**
 * Total matching officials counter
 */
const totalResultsCount = computed(() => {
  let count = 0;
  if (showSpotlight.value) count += 1;
  filteredHierarchy.value.forEach(div => {
    count += div.totalOfficials;
  });
  if (showRtiSection.value) {
    count += filteredRtiOfficers.value.length;
  }
  return count;
});

/**
 * Dynamic API Fetching from Spring Boot Backend
 */
const fetchOfficials = async () => {
  loading.value = true;
  try {
    const apiBase = BaseUrl.baseUrl || 'http://localhost:8096';
    const res = await axios.get(`${apiBase}/api/v1/team-members`);
    const allMembers = Array.isArray(res.data) ? res.data : (res.data?.members || []);

    if (allMembers.length > 0) {
      // Find Head of Department
      const head = allMembers.find(m => m.hierarchyLevel === 'HEAD') ||
                   allMembers.find(m => m.division === 'Executive Directorate') ||
                   allMembers.find(m => (m.designation || '').toLowerCase().includes('director general'));
      if (head) {
        directorGeneral.value = mapOfficial(head);
      }

      // Check for RTI Officers in API data (designation is RTI Designated Officer or RTI Information Officer or division is RTI)
      const isRtiOfficial = (m) => {
        const des = (m.designation || '').toLowerCase();
        const div = (m.division || '').toLowerCase();
        return (
          des === 'rti designated officer' ||
          des === 'rti information officer' ||
          des.includes('rti designated') ||
          des.includes('rti information') ||
          div === 'rti'
        );
      };

      const rtiMembers = allMembers.filter(isRtiOfficial);

      if (rtiMembers.length > 0) {
        // Sort: displayOrder ascending, fallback to Designated Officer first
        rtiMembers.sort((a, b) => {
          const orderA = a.displayOrder != null && !isNaN(a.displayOrder) ? Number(a.displayOrder) : 999;
          const orderB = b.displayOrder != null && !isNaN(b.displayOrder) ? Number(b.displayOrder) : 999;
          if (orderA !== orderB) return orderA - orderB;
          const aDes = (a.designation || '').toLowerCase().includes('designated') ? 0 : 1;
          const bDes = (b.designation || '').toLowerCase().includes('designated') ? 0 : 1;
          return aDes - bDes;
        });

        rtiOfficers.value = rtiMembers.map(m => ({
          id: m.id,
          name: m.name,
          designation: m.designation,
          division: m.division || 'Admin and Accounts',
          room: m.room,
          description: m.description,
          displayOrder: m.displayOrder != null && !isNaN(m.displayOrder) ? Number(m.displayOrder) : 999,
          contacts: {
            office: m.officePhone,
            mobile: m.mobilePhone
          },
          emails: [m.primaryEmail, m.secondaryEmail].filter(e => typeof e === 'string' && e.trim().length > 0)
        }));
      } else {
        rtiOfficers.value = defaultRtiOfficers;
      }

      // Group directory members (all except the Head of Department and RTI officers)
      const rtiIds = new Set(rtiMembers.map(m => m.id));
      const directoryMembers = allMembers.filter(m => m.id !== head?.id && !rtiIds.has(m.id));
      officials.value = directoryMembers.map(mapOfficial);
    }
  } catch (err) {
    console.error('Failed to load team members from API:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (route?.query?.q) {
    setNavbarSearchQuery(String(route.query.q));
  }
  window.addEventListener('click', handleClickOutside);
  fetchOfficials();

  if (route.hash === '#rti' || route.path.toLowerCase().includes('rti')) {
    setTimeout(() => {
      const el = document.getElementById('rti');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  }
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
  clearNavbarSearch();
});
</script>

<style scoped>
/* ==========================================================================
   BASE PAGE LAYOUT
   ========================================================================== */
.team-page {
  font-family: 'Open Sans', sans-serif;
  color: #102741;
  background: #f8f9fa;
  min-height: 100vh;
  padding-top: 96px;
}

.container { 
  max-width: 1200px;
  margin: 0 auto;
}

.hero-header {
  background: linear-gradient(135deg, #004d5a 0%, #008795 100%);
  padding: 3.95rem 1rem;
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

/* ==========================================================================
   STICKY FILTER BAR
   ========================================================================== */
.sticky-filter-bar {
  position: sticky;
  top: 72px;
  z-index: 30;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.85);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  padding: 0.85rem 0;
}

.filter-bar-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.filter-bar-end {
  justify-content: flex-end;
}

.team-search-wrap {
  position: relative;
  flex: 1 1 320px;
  max-width: 540px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 17px;
  height: 17px;
  color: #94a3b8;
  pointer-events: none;
}

.team-search-input {
  width: 100%;
  height: 44px;
  padding: 0 38px 0 40px;
  border-radius: 9999px;
  border: 1px solid #cbd5e1;
  background-color: #f8fafc;
  font-size: 0.86rem;
  color: #0f172a;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.team-search-input:focus {
  background-color: #ffffff;
  border-color: #008795;
  box-shadow: 0 0 0 3px rgba(0, 135, 149, 0.15);
}

.clear-search-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #e2e8f0;
  border: none;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.clear-search-btn:hover {
  background-color: #cbd5e1;
  color: #0f172a;
}

.filter-dropdown-area {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.82rem;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.filter-icon {
  width: 14px;
  height: 14px;
  color: #008795;
}

.custom-dropdown {
  position: relative;
  width: 260px;
}

.dropdown-btn {
  width: 100%;
  height: 44px;
  padding: 0 14px 0 16px;
  border-radius: 9999px;
  border: 1px solid #cbd5e1;
  background-color: #ffffff;
  font-size: 0.86rem;
  font-weight: 600;
  color: #0f172a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.dropdown-btn:hover,
.dropdown-btn-open {
  border-color: #008795;
  box-shadow: 0 0 0 3px rgba(0, 135, 149, 0.12);
}

.chevron-icon {
  width: 16px;
  height: 16px;
  color: #64748b;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.rotate-180 {
  transform: rotate(180deg);
}

.dropdown-menu-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  padding: 6px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.dropdown-item {
  width: 100%;
  padding: 8px 12px;
  border-radius: 12px;
  border: none;
  background: transparent;
  font-size: 0.83rem;
  font-weight: 500;
  color: #334155;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
}

.dropdown-item:hover {
  background-color: #f0fdfa;
  color: #008795;
}

.item-selected {
  background-color: #e6fffa;
  color: #008795;
  font-weight: 700;
}

.item-label-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.active-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #008795;
}

.check-icon {
  width: 15px;
  height: 15px;
  color: #008795;
}

.dropdown-anim-enter-active,
.dropdown-anim-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-anim-enter-from,
.dropdown-anim-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ==========================================================================
   DIRECTORY CONTENT & RESULTS META BAR
   ========================================================================== */
.team-content {
  padding-top: 2rem;
  padding-bottom: 5.5rem;
}

.results-meta-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.results-count {
  font-size: 0.88rem;
  color: #64748b;
}

.results-count strong {
  color: #0f172a;
  font-weight: 700;
}

.meta-tag {
  color: #008795;
  font-weight: 600;
  margin-left: 4px;
}

.reset-filters-btn {
  background: none;
  border: none;
  color: #008795;
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
}

.reset-filters-btn:hover {
  color: #005a63;
}

/* ==========================================================================
   LEVEL 0: EXECUTIVE SPOTLIGHT (DIRECTOR GENERAL)
   ========================================================================== */
.spotlight-section {
  margin-bottom: 3.5rem;
}

.spotlight-card {
  position: relative;
  background-color: #ffffff;
  border-radius: 28px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 30px rgba(0, 135, 149, 0.06);
  padding: 2.25rem;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.spotlight-card:hover {
  box-shadow: 0 16px 40px rgba(0, 135, 149, 0.12);
}

.spotlight-top-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #008795, #00e5ff, #005a63);
}

.spotlight-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .spotlight-grid {
    grid-template-columns: repeat(12, 1fr);
  }
  .spotlight-col-left {
    grid-column: span 7 / span 7;
  }
  .spotlight-col-right {
    grid-column: span 5 / span 5;
  }
}

.spotlight-col-left {
  display: flex;
  flex-direction: column;
}

.spotlight-title-group {
  margin-bottom: 0.75rem;
}

.spotlight-eyebrow {
  font-size: 0.72rem;
  font-weight: 800;
  color: #008795;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 4px;
}

.spotlight-name {
  font-size: 1.45rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin: 0 0 4px;
  line-height: 1.25;
}

.spotlight-designation {
  font-size: 0.92rem;
  font-weight: 600;
  color: #008795;
  margin: 0;
}

.spotlight-mandate {
  font-size: 0.84rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 1rem;
}

.spotlight-location {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  color: #475569;
}

.loc-icon {
  width: 15px;
  height: 15px;
  color: #008795;
  flex-shrink: 0;
}

.spotlight-col-right {
  width: 100%;
}

.spotlight-contact-panel {
  background-color: #f8fafc;
  border-radius: 20px;
  padding: 1.25rem 1.35rem;
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.contact-numbers-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .contact-numbers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.spotlight-num-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  text-decoration: none;
  transition: all 0.2s ease;
  min-width: 0;
}

.spotlight-num-pill:hover {
  border-color: #008795;
  background-color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 135, 149, 0.1);
}

.num-type-badge {
  font-size: 0.62rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 6px;
  min-width: 48px;
  text-align: center;
  flex-shrink: 0;
}

.num-val-text {
  font-size: 0.74rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: 0.1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotlight-num-pill:hover .num-val-text {
  color: #008795;
}

.pill-office .num-type-badge { background: #e0f2fe; color: #0284c7; }
.pill-ext .num-type-badge { background: #e6fffa; color: #008795; }
.pill-mobile .num-type-badge { background: #dcfce7; color: #15803d; }
.pill-residence .num-type-badge { background: #fef3c7; color: #b45309; }
.pill-fax .num-type-badge { background: #f1f5f9; color: #475569; }

.emails-panel-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  border-top: 1px dashed #e2e8f0;
  padding-top: 0.65rem;
  margin-top: 0.15rem;
}

@media (min-width: 640px) {
  .emails-panel-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.spotlight-email-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  text-decoration: none;
  transition: all 0.2s ease;
  min-width: 0;
}

.spotlight-email-row:hover {
  background-color: #f0fdfa;
  border-color: #008795;
  transform: translateY(-1px);
}

.email-icon-box {
  width: 20px !important;
  height: 20px !important;
  min-width: 20px !important;
  min-height: 20px !important;
  max-width: 20px !important;
  max-height: 20px !important;
  border-radius: 6px !important;
  background-color: #f0fdfa !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
}

.email-svg {
  width: 12px !important;
  height: 12px !important;
  min-width: 12px !important;
  min-height: 12px !important;
  color: #008795 !important;
  flex-shrink: 0 !important;
  display: block !important;
}

.email-row-text {
  font-size: 0.72rem;
  font-weight: 600;
  color: #008795;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ==========================================================================
   CLEAN HIERARCHY SECTION: CATEGORY HEADINGS & TABLES
   ========================================================================== */
.hierarchy-container {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  margin-bottom: 3.5rem;
}

.division-section {
  position: relative;
}

/* Clean Division Header: No DIVISION 01 pill badge */
.division-banner-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.85rem;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
}

.division-heading {
  font-size: 1.45rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
  line-height: 1.25;
  margin: 0;
}

.division-count-pill {
  font-size: 0.75rem;
  font-weight: 700;
  color: #475569;
  background-color: #f1f5f9;
  padding: 4px 12px;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
}

.division-subsections-wrap {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.subsection-block {
  position: relative;
}

/* Plain Uppercase Role Label Header: No code badge, no subtitle */
.subsection-header-block {
  margin-bottom: 0.65rem;
}

.subsection-title {
  font-size: 0.82rem;
  font-weight: 800;
  color: #475569;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 0;
}

/* ==========================================================================
   CLEAN CORPORATE DIRECTORY TABLE & SUBTLE SECTION BREAKS
   ========================================================================== */
.table-responsive-wrapper {
  background-color: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 18px;
  overflow-x: auto;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
}

.corporate-directory-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.82rem;
}

/* Table Header (Appears ONLY ONCE at the top) */
.corporate-directory-table thead tr {
  background-color: #f8fafc;
  border-bottom: 1.5px solid #e2e8f0;
}

.corporate-directory-table th {
  padding: 13px 16px;
  font-size: 0.72rem;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  white-space: nowrap;
}

.th-name {
  width: 20%;
  min-width: 200px;
  white-space: nowrap;
}

.th-designation {
  width: 23%;
  min-width: 180px;
}

.th-room {
  width: 14%;
  max-width: 220px;
  min-width: 110px;
}

.th-contacts {
  width: 18%;
  min-width: 160px;
}

.th-email {
  width: 25%;
  min-width: 260px;
}

.td-name {
  min-width: 200px;
  white-space: nowrap;
}

.td-room {
  max-width: 220px;
  white-space: normal;
  word-break: break-word;
}

.td-email {
  min-width: 260px;
}

/* Table Body Rows & Spacing */
.directory-row {
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.15s ease;
}

.directory-row:last-child {
  border-bottom: none;
}

.directory-row:hover {
  background-color: rgba(248, 250, 252, 0.85);
}

.corporate-directory-table td {
  padding: 12px 16px;
  vertical-align: middle;
}

/* Column 1: Name */
.table-official-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.35;
  display: block;
  white-space: nowrap;
}

/* Column 2: Designation */
.table-designation-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: #008795;
  line-height: 1.35;
  display: block;
  max-width: 260px;
}

/* Column 3: Room */
.table-room-cell {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 0.74rem;
  color: #475569;
  font-weight: 500;
  white-space: normal;
  word-break: break-word;
  line-height: 1.35;
  max-width: 220px;
}

.table-room-icon {
  width: 13px;
  height: 13px;
  color: #94a3b8;
  flex-shrink: 0;
  margin-top: 2px;
}

.table-room-text {
  white-space: normal;
  word-break: break-word;
  line-height: 1.35;
}

/* Column 4: Contact Numbers (Original Rounded Pill Layout) */
.table-contacts-wrap {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
}

.table-contact-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px;
  border-radius: 8px;
  text-decoration: none;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.table-contact-pill:hover {
  background-color: #ffffff;
  border-color: #008795;
  box-shadow: 0 2px 6px rgba(0, 135, 149, 0.12);
  transform: translateY(-1px);
}

.table-contact-pill .pill-type-tag {
  font-size: 0.58rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 2px 5px;
  border-radius: 4px;
  line-height: 1.2;
}

.table-contact-pill .pill-value-text {
  font-size: 0.72rem;
  font-weight: 700;
  color: #334155;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
}

.table-contact-pill:hover .pill-value-text {
  color: #008795;
}

/* OFFICE: Soft-blue badge with label "OFFICE" inside */
.pill-office .pill-type-tag {
  background: #e0f2fe;
  color: #0284c7;
}

/* EXT: Soft-mint badge with label "EXT" inside */
.pill-ext .pill-type-tag {
  background: #e6fffa;
  color: #008795;
}

/* MOBILE: Soft-green badge with label "MOBILE" inside */
.pill-mobile .pill-type-tag {
  background: #dcfce7;
  color: #15803d;
}

/* FAX: Soft-gray badge with label "FAX" inside */
.pill-fax .pill-type-tag {
  background: #f1f5f9;
  color: #475569;
}

/* Column 5: Clickable Emails (Original Button-like Pill Badge Design) */
.table-emails-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.table-email-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.73rem;
  font-weight: 600;
  color: #008795;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 8px;
  background-color: #f0fdfa;
  border: 1px solid #ccfbf1;
  transition: all 0.15s ease;
  width: fit-content;
  max-width: none;
  white-space: nowrap;
}

.table-email-link:hover {
  background-color: #008795;
  color: #ffffff;
  border-color: #008795;
  box-shadow: 0 2px 6px rgba(0, 135, 149, 0.15);
  transform: translateY(-1px);
}

.table-email-svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
  color: #008795;
  transition: color 0.15s ease;
}

.table-email-link:hover .table-email-svg {
  color: #ffffff;
}

.table-email-text {
  white-space: nowrap;
  line-height: 1.25;
}

/* ==========================================================================
   EMPTY STATE
   ========================================================================== */
.empty-state-box {
  background-color: #ffffff;
  border-radius: 24px;
  border: 1px dashed #cbd5e1;
  padding: 3.5rem 2rem;
  text-align: center;
  max-width: 520px;
  margin: 2rem auto;
}

.empty-icon-wrap {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
}

.empty-svg {
  width: 28px;
  height: 28px;
  color: #94a3b8;
}

.empty-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 0.5rem;
}

.empty-desc {
  font-size: 0.88rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0 0 1.5rem;
}

.empty-action-btn {
  display: inline-block;
  padding: 9px 20px;
  border-radius: 9999px;
  background-color: #008795;
  color: #ffffff;
  font-size: 0.84rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.empty-action-btn:hover {
  background-color: #005a63;
}

/* ==========================================================================
   RTI STATUTORY SECTION
   ========================================================================== */
.rti-section {
  margin-top: 3.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(226, 232, 240, 0.9);
  margin-bottom: 4rem;
  scroll-margin-top: 120px;
}

.rti-heading-block {
  text-align: center;
  margin-bottom: 2.5rem;
}

.rti-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #008294;
  letter-spacing: -0.5px;
  margin: 0;
}

@media (max-width: 768px) {
  .rti-title {
    font-size: 1.75rem;
  }
}

.rti-title-underline {
  width: 56px;
  height: 4px;
  background-color: #008294;
  margin: 12px auto 0;
  border-radius: 9999px;
}

.rti-cards-grid {
  display: grid;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.rti-grid-2-col {
  max-width: 64rem;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .rti-grid-2-col {
    grid-template-columns: repeat(2, 1fr);
  }
}

.rti-grid-3-col {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .rti-grid-3-col {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .rti-grid-3-col {
    grid-template-columns: repeat(3, 1fr);
  }
}

.rti-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.rti-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
  border-color: #5eead4;
}

.rti-role-badge-wrap {
  margin-bottom: 0.75rem;
}

.rti-role-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.2;
}

.rti-role-badge.role-designated {
  background-color: #eef2ff;
  color: #4338ca;
  border: 1px solid #c7d2fe;
}

.rti-role-badge.role-designated i {
  color: #4f46e5;
}

.rti-role-badge.role-information {
  background-color: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
}

.rti-role-badge.role-information i {
  color: #059669;
}

.rti-officer-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
  line-height: 1.35;
  transition: color 0.2s ease;
}

.rti-card:hover .rti-officer-name {
  color: #007c91;
}

.rti-officer-designation {
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f766e;
  margin: 0;
  line-height: 1.4;
}

.rti-location-box {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.775rem;
  color: #475569;
  margin-top: 0.85rem;
  line-height: 1.5;
  background-color: #f8fafc;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
}

.rti-loc-svg {
  width: 16px !important;
  height: 16px !important;
  min-width: 16px !important;
  min-height: 16px !important;
  flex-shrink: 0 !important;
  color: #0d9488;
  margin-top: 2px;
}

.rti-location-text {
  flex: 1;
}

.rti-division-name {
  font-weight: 600;
  color: #1e293b;
}

.rti-location-bullet {
  margin: 0 6px;
  color: #94a3b8;
}

.rti-room-text {
  color: #475569;
}

.rti-room-text :deep(sup) {
  font-size: 0.72em;
  line-height: 0;
  vertical-align: baseline;
  position: relative;
  top: -0.4em;
  font-weight: 600;
}

.rti-card-footer {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rti-contact-rows {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rti-contact-badge {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  border-radius: 10px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  text-decoration: none;
  font-size: 0.775rem;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.rti-contact-badge:hover {
  background-color: #f1f5f9;
  border-color: #cbd5e1;
}

.rti-contact-tag {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: #e2e8f0;
  color: #334155;
}

.rti-contact-value {
  font-weight: 600;
  color: #1e293b;
  transition: color 0.2s ease;
}

.rti-contact-badge:hover .rti-contact-value {
  color: #007c91;
}

.rti-email-btn-wrap {
  padding-top: 4px;
}

.rti-email-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #f0fdfa;
  color: #0f766e;
  border: 1px solid rgba(153, 246, 228, 0.8);
  border-radius: 10px;
  padding: 8px 14px;
  font-size: 0.775rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
}

.rti-email-btn:hover {
  background-color: #008795;
  color: #ffffff;
  border-color: #008795;
  box-shadow: 0 4px 6px -1px rgba(0, 135, 149, 0.2);
}

.rti-email-svg {
  width: 16px !important;
  height: 16px !important;
  min-width: 16px !important;
  min-height: 16px !important;
  flex-shrink: 0 !important;
  transition: transform 0.2s ease;
}

.rti-email-btn:hover .rti-email-svg {
  transform: scale(1.1);
}

.rti-email-address {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
