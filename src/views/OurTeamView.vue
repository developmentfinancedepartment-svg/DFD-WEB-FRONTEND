<template>
  <div class="team-page">
    <!-- Hero Header Banner -->
    <section class="team-hero">
      <div class="container text-center">
        <div class="hero-badge-wrap">
          <span class="hero-badge">
            <svg class="hero-badge-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
            <span>Official Directory</span>
          </span>
        </div>
        <h1 class="hero-title">Our Leadership &amp; Key Officials</h1>
        <p class="hero-subtitle">
          Department of Development Finance — Ministry of Finance, Economic Stabilization and National Policies
        </p>
      </div>
    </section>

    <!-- Sticky Filter & Search Bar -->
    <section class="sticky-filter-bar">
      <div class="container filter-bar-container">
        <!-- Instant Search Input -->
        <div class="team-search-wrap">
          <svg class="search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
          <input
            type="text"
            v-model="searchQuery"
            class="team-search-input"
            placeholder="Search by name, designation, extension, phone, or email..."
            aria-label="Search officials"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="clear-search-btn"
            @click="searchQuery = ''"
            title="Clear search"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- Right-Aligned Division Dropdown Filter (Hover Auto-Open) -->
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
    <main class="team-content">
      <div class="container">
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
                <!-- Squircle Avatar Frame -->
                <div class="spotlight-avatar-box">
                  <div class="spotlight-avatar-squircle">
                    <img
                      v-if="directorGeneral.photo && !directorGeneral.photoError"
                      :src="directorGeneral.photo"
                      :alt="directorGeneral.name"
                      class="spotlight-photo-img"
                      @error="directorGeneral.photoError = true"
                    />
                    <div v-else class="spotlight-monogram">
                      <span class="spotlight-initials">{{ getInitials(directorGeneral.name) }}</span>
                      <span class="spotlight-crest-label">DFD HEAD</span>
                    </div>
                  </div>
                  <span class="spotlight-role-pill">Director General</span>
                </div>

                <!-- Profile Details -->
                <div class="spotlight-details">
                  <div class="spotlight-title-group">
                    <span class="spotlight-eyebrow">HEAD OF DEPARTMENT</span>
                    <h2 class="spotlight-name">{{ directorGeneral.name }}</h2>
                    <p class="spotlight-designation">{{ directorGeneral.designation }}</p>
                  </div>

                  <p class="spotlight-mandate">
                    Leading the Department of Development Finance in coordinating national concessionary credit schemes,
                    interest subsidy mechanisms, and financial inclusion frameworks across Sri Lanka.
                  </p>

                  <div class="spotlight-location" v-if="directorGeneral.room">
                    <svg class="loc-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ directorGeneral.room }}</span>
                  </div>
                </div>
              </div>

              <!-- Right Column: lg:col-span-5 Compact Contact Channels Panel -->
              <div class="spotlight-col-right lg:col-span-5">
                <div class="spotlight-contact-panel">
                  <!-- Dynamic Contact Numbers List (Office, Ext, Mobile, Residence, Fax) - 2-Column Grid -->
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
        <div v-if="filteredHierarchy.length > 0" class="hierarchy-container">
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

            <!-- Subsections within Division -->
            <div class="division-subsections-wrap">
              <div
                v-for="subsection in division.subsections"
                :key="subsection.key"
                class="subsection-block"
              >
                <!-- Clean Role Label Header (No SUBSECTION A pill, no subtitle) -->
                <div class="subsection-header-block">
                  <h3 class="subsection-title">{{ subsection.title }}</h3>
                </div>

                <!-- Clean Corporate Directory Table Layout -->
                <div class="table-responsive-wrapper rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs bg-white">
                  <table class="corporate-directory-table">
                    <thead>
                      <tr>
                        <th class="th-name" scope="col">Name</th>
                        <th class="th-designation" scope="col">Designation</th>
                        <th class="th-room" scope="col">Room</th>
                        <th class="th-contacts" scope="col">Contact Numbers</th>
                        <th class="th-email" scope="col">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="officer in subsection.officials"
                        :key="officer.id || officer.name"
                        class="directory-row hover:bg-slate-50/80 transition-colors"
                      >
                        <!-- Column 1: Name (Clean text only, no avatar box, no pill badges) -->
                        <td class="td-name">
                          <span class="table-official-name" :title="officer.name">
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
                        <td class="td-room">
                          <div class="table-room-cell" v-if="officer.room">
                            <svg class="table-room-icon" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" />
                            </svg>
                            <span class="table-room-text">{{ officer.room }}</span>
                          </div>
                          <span v-else class="text-slate-400 text-xs">—</span>
                        </td>

                        <!-- Column 4: Contact Numbers (badges for Office, Ext, Mobile, Fax, Residence) -->
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
                              <span class="pill-type-tag">{{ c.label }}</span>
                              <span class="pill-value-text">{{ c.value }}</span>
                            </a>
                          </div>
                          <span v-else class="text-slate-400 text-xs">—</span>
                        </td>

                        <!-- Column 5: Clickable Email links -->
                        <td class="td-email">
                          <div class="table-emails-wrap" v-if="getEmailList(officer).length > 0">
                            <a
                              v-for="email in getEmailList(officer)"
                              :key="email"
                              :href="'mailto:' + email"
                              class="table-email-link"
                              :title="`Send email to ${email}`"
                            >
                              <svg viewBox="0 0 20 20" fill="currentColor" class="table-email-svg">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                              <span class="table-email-text truncate">{{ email }}</span>
                            </a>
                          </div>
                          <span v-else class="text-slate-400 text-xs">—</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Empty Search / Filter Results State -->
        <div v-else-if="!showSpotlight" class="empty-state-box">
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import BaseUrl from '@/services/baseURL';

// Search and Filter states
const searchQuery = ref('');
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
  searchQuery.value = '';
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
 * Mr. P.M.K. Hettiarachchi
 */
const directorGeneral = ref({
  id: 'dg-hettiarachchi',
  name: 'Mr. P.M.K. Hettiarachchi',
  designation: 'Director General of Development Finance',
  division: 'Executive Directorate',
  room: 'Room 140, 1st Floor, The Secretariat, Lotus Road, Colombo 01',
  photo: null,
  photoError: false,
  contacts: {
    office: '+94 11 248 4511',
    ext: '1400',
    fax: '+94 11 248 4512',
    residence: '+94 11 287 1420',
    mobile: '+94 71 845 2100'
  },
  emails: [
    'dgdf@dfd.treasury.gov.lk',
    'hettiarachchi.pmk@treasury.gov.lk'
  ]
});

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

/**
 * Comprehensive DFD Official Dataset
 * Strictly mapped to Divisions and Subsections
 */
const fallbackOfficials = [
  // -------------------------------------------------------------------------
  // DIVISION 1: FINANCIAL SOLUTION DIVISION
  // -------------------------------------------------------------------------
  // Subsection: Additional Director General (ADG)
  {
    id: 1,
    name: 'Mr. H.M.A.S. Herath',
    designation: 'Additional Director General (Financial Solutions)',
    division: 'Financial Solution',
    subsectionKey: 'adg',
    room: 'Room 145, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4520',
      ext: '1410',
      fax: '+94 11 248 4521',
      mobile: '+94 71 234 5670'
    },
    emails: [
      'adg.fs@dfd.treasury.gov.lk',
      'herath.adg@treasury.gov.lk'
    ]
  },

  // Subsection: Directors
  {
    id: 2,
    name: 'Mr. K.A.D.S. Nanayakkara',
    designation: 'Director - Financial Solutions Division',
    division: 'Financial Solution',
    subsectionKey: 'directors',
    room: 'Room 150, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4530',
      ext: '1420',
      fax: '+94 11 248 4531',
      residence: '+94 11 276 3412',
      mobile: '+94 77 345 6789'
    },
    emails: [
      'director.fs@dfd.treasury.gov.lk',
      'nanayakkara.kads@dfd.treasury.gov.lk'
    ]
  },

  // Subsection: Deputy Directors
  {
    id: 3,
    name: 'Mrs. M.P.N. Jayawardena',
    designation: 'Deputy Director - Concessionary Credit & SME Schemes',
    division: 'Financial Solution',
    subsectionKey: 'deputy_directors',
    room: 'Room 152, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4534',
      ext: '1422',
      residence: '+94 11 289 0123',
      mobile: '+94 71 456 7890'
    },
    emails: [
      'sme.financing@dfd.treasury.gov.lk',
      'jayawardena.mpn@dfd.treasury.gov.lk'
    ]
  },

  // Subsection: Assistant Directors & Officers
  {
    id: 4,
    name: 'Mr. R.M.C.K. Ratnayake',
    designation: 'Assistant Director - Subsidy & Credit Guarantee',
    division: 'Financial Solution',
    subsectionKey: 'assistant_directors_officers',
    room: 'Room 153, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4538',
      ext: '1425',
      mobile: '+94 70 234 5678'
    },
    emails: [
      'guarantee.fs@dfd.treasury.gov.lk'
    ]
  },
  {
    id: 5,
    name: 'Mr. W.A.D. Silva',
    designation: 'Assistant Director - Green & Sustainable Finance',
    division: 'Financial Solution',
    subsectionKey: 'assistant_directors_officers',
    room: 'Room 155, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4542',
      ext: '1429',
      fax: '+94 11 248 4543',
      mobile: '+94 71 901 2345'
    },
    emails: [
      'greenfinance@dfd.treasury.gov.lk'
    ]
  },
  {
    id: 6,
    name: 'Ms. S.H.T. Perera',
    designation: 'Development Finance Officer - PFI Network Coordination',
    division: 'Financial Solution',
    subsectionKey: 'assistant_directors_officers',
    room: 'Room 154, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4540',
      ext: '1428',
      mobile: '+94 77 890 1234'
    },
    emails: [
      'pfi.support@dfd.treasury.gov.lk'
    ]
  },

  // -------------------------------------------------------------------------
  // DIVISION 2: MARKET ACCESS & DEVELOPMENT DIVISION
  // -------------------------------------------------------------------------
  // Subsection: Additional Director General (ADG)
  {
    id: 7,
    name: 'Mrs. C.K. Wickramatunga',
    designation: 'Additional Director General (Market Access & Development)',
    division: 'Market Access & Development',
    subsectionKey: 'adg',
    room: 'Room 148, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4545',
      ext: '1430',
      fax: '+94 11 248 4546',
      mobile: '+94 71 345 6780'
    },
    emails: [
      'adg.mad@dfd.treasury.gov.lk',
      'wickramatunga.ck@treasury.gov.lk'
    ]
  },

  // Subsection: Directors
  {
    id: 8,
    name: 'Mr. D.L.P. Bandara',
    designation: 'Director - Market Access & Value Chain Development',
    division: 'Market Access & Development',
    subsectionKey: 'directors',
    room: 'Room 160, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4550',
      ext: '1440',
      fax: '+94 11 248 4551',
      residence: '+94 11 254 7890',
      mobile: '+94 77 123 4567'
    },
    emails: [
      'director.mad@dfd.treasury.gov.lk',
      'bandara.dlp@dfd.treasury.gov.lk'
    ]
  },

  // Subsection: Deputy Directors
  {
    id: 9,
    name: 'Mrs. T.K. Wickramasinghe',
    designation: 'Deputy Director - Commercial Agriculture Promotion & Markets',
    division: 'Market Access & Development',
    subsectionKey: 'deputy_directors',
    room: 'Room 162, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4554',
      ext: '1442',
      residence: '+94 11 232 4567',
      mobile: '+94 71 567 8901'
    },
    emails: [
      'valuechains@dfd.treasury.gov.lk'
    ]
  },
  {
    id: 10,
    name: 'Mr. H.M.S.B. Herath',
    designation: 'Deputy Director - Entrepreneurship Outreach & MSME Clusters',
    division: 'Market Access & Development',
    subsectionKey: 'deputy_directors',
    room: 'Room 163, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4558',
      ext: '1445',
      mobile: '+94 76 678 9012'
    },
    emails: [
      'outreach.mad@dfd.treasury.gov.lk',
      'herath.hmsb@dfd.treasury.gov.lk'
    ]
  },
  {
    id: 11,
    name: 'Ms. K.G.N. Fernando',
    designation: 'Deputy Director - Progress Monitoring & Field Verification',
    division: 'Market Access & Development',
    subsectionKey: 'deputy_directors',
    room: 'Room 164, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4562',
      ext: '1448',
      mobile: '+94 77 234 5678'
    },
    emails: [
      'monitoring@dfd.treasury.gov.lk'
    ]
  },

  // -------------------------------------------------------------------------
  // DIVISION 3: ADMIN AND ACCOUNTS DIVISION
  // -------------------------------------------------------------------------
  // Subsection: Additional Director General (ADG)
  {
    id: 12,
    name: 'Mr. G.W.R. Fernando',
    designation: 'Additional Director General (Administration & Finance)',
    division: 'Admin and Accounts',
    subsectionKey: 'adg',
    room: 'Room 149, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4565',
      ext: '1450',
      fax: '+94 11 248 4566',
      mobile: '+94 71 456 7891'
    },
    emails: [
      'adg.admin@dfd.treasury.gov.lk',
      'fernando.gwr@treasury.gov.lk'
    ]
  },

  // Subsection: Directors (Admin & Finance)
  {
    id: 13,
    name: 'Mrs. K.M.A.S. Wijeratne',
    designation: 'Director - Administration & Human Resources',
    division: 'Admin and Accounts',
    subsectionKey: 'directors_admin_finance',
    room: 'Room 170, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4570',
      ext: '1460',
      fax: '+94 11 248 4571',
      residence: '+94 11 267 8901',
      mobile: '+94 71 234 5678'
    },
    emails: [
      'director.admin@dfd.treasury.gov.lk',
      'wijeratne.kmas@dfd.treasury.gov.lk'
    ]
  },
  {
    id: 14,
    name: 'Mr. A.H.M. Nizam',
    designation: 'Director (Finance) / Chief Accountant - Treasury Accounts',
    division: 'Admin and Accounts',
    subsectionKey: 'directors_admin_finance',
    room: 'Room 172, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4574',
      ext: '1462',
      fax: '+94 11 248 4575',
      mobile: '+94 77 456 7890'
    },
    emails: [
      'accounts@dfd.treasury.gov.lk',
      'nizam.ahm@dfd.treasury.gov.lk'
    ]
  },

  // Subsection: Deputy Directors
  {
    id: 15,
    name: 'Mr. P.G.D. Karunaratne',
    designation: 'Deputy Director - Logistics, Fleet & Procurement',
    division: 'Admin and Accounts',
    subsectionKey: 'deputy_directors',
    room: 'Room 173, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4578',
      ext: '1465',
      mobile: '+94 78 567 8901'
    },
    emails: [
      'procurement@dfd.treasury.gov.lk'
    ]
  },
  {
    id: 16,
    name: 'Mr. E.A.N. Senarath',
    designation: 'Deputy Director - Scheme Disbursements & Financial Audits',
    division: 'Admin and Accounts',
    subsectionKey: 'deputy_directors',
    room: 'Room 175, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4584',
      ext: '1469',
      mobile: '+94 77 789 0123'
    },
    emails: [
      'disbursements@dfd.treasury.gov.lk'
    ]
  },

  // Subsection: CMSO & Development Officers
  {
    id: 17,
    name: 'Ms. I.U. Dissanayake',
    designation: 'Chief Management Service Officer (CMSO) - Operations',
    division: 'Admin and Accounts',
    subsectionKey: 'cmso_development_officers',
    room: 'Room 174, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4582',
      ext: '1468',
      mobile: '+94 71 678 9012'
    },
    emails: [
      'admin.support@dfd.treasury.gov.lk'
    ]
  },
  {
    id: 18,
    name: 'Mr. B.M.C. Weerasinghe',
    designation: 'Development Officer - General Administration & Records',
    division: 'Admin and Accounts',
    subsectionKey: 'cmso_development_officers',
    room: 'Room 176, 1st Floor',
    photo: null,
    photoError: false,
    contacts: {
      office: '+94 11 248 4586',
      ext: '1470',
      mobile: '+94 70 890 1234'
    },
    emails: [
      'records.admin@dfd.treasury.gov.lk'
    ]
  }
];

const officials = ref(fallbackOfficials);

/**
 * Normalizes phone string for tel: URI
 */
const cleanPhone = (phone) => {
  if (!phone) return '';
  return phone.replace(/[^\d+]/g, '');
};

/**
 * Extracts available contact numbers dynamically
 * Supports: Office, Ext, Mobile, Residence, Fax
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

  // 4. Residence
  if (c.residence) {
    list.push({
      type: 'residence',
      label: 'Res.',
      value: c.residence,
      link: 'tel:' + cleanPhone(c.residence)
    });
  }

  // 5. Fax
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
  const matchesDivision = selectedDivision.value === 'ALL' || selectedDivision.value === 'Executive Directorate';
  if (!matchesDivision) return false;

  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return true;

  const nameMatch = directorGeneral.value.name.toLowerCase().includes(query);
  const desigMatch = directorGeneral.value.designation.toLowerCase().includes(query);
  const roomMatch = directorGeneral.value.room && directorGeneral.value.room.toLowerCase().includes(query);
  const extMatch = directorGeneral.value.contacts?.ext?.toLowerCase().includes(query);
  const phoneMatch = Object.values(directorGeneral.value.contacts || {}).some(v => v.toLowerCase().includes(query));
  const emailMatch = directorGeneral.value.emails?.some(e => e.toLowerCase().includes(query));

  return nameMatch || desigMatch || roomMatch || extMatch || phoneMatch || emailMatch;
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
            const roomMatch = officer.room && officer.room.toLowerCase().includes(query);
            const extMatch = officer.contacts?.ext && officer.contacts.ext.toLowerCase().includes(query);
            const phoneMatch = officer.contacts && Object.values(officer.contacts).some(v => v.toLowerCase().includes(query));
            const emailMatch = officer.emails && officer.emails.some(e => e.toLowerCase().includes(query));

            return nameMatch || desigMatch || roomMatch || extMatch || phoneMatch || emailMatch;
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
 * Total matching officials counter
 */
const totalResultsCount = computed(() => {
  let count = 0;
  if (showSpotlight.value) count += 1;
  filteredHierarchy.value.forEach(div => {
    count += div.totalOfficials;
  });
  return count;
});

/**
 * API Fetching with Fallback Dataset
 */
const fetchOfficials = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${BaseUrl}/team`);
    if (res.data && Array.isArray(res.data.officials) && res.data.officials.length > 0) {
      officials.value = res.data.officials.map(o => ({
        ...o,
        photoError: false
      }));
    }
  } catch (err) {
    officials.value = fallbackOfficials;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
  fetchOfficials();
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* ==========================================================================
   BASE PAGE LAYOUT
   ========================================================================== */
.team-page {
  min-height: 100vh;
  background-color: #f8fafc;
  color: #1e293b;
  font-family: inherit;
  padding-bottom: 5rem;
}

.container {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  box-sizing: border-box;
}

/* ==========================================================================
   HERO BANNER
   ========================================================================== */
.team-hero {
  background: linear-gradient(135deg, #005a63 0%, #008795 50%, #006f7b 100%);
  color: #ffffff;
  padding: 3.5rem 1rem 3.5rem;
  position: relative;
  overflow: hidden;
}

.team-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 20% 150%, rgba(255, 255, 255, 0.12) 0%, transparent 60%);
  pointer-events: none;
}

.hero-badge-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 0.85rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 14px;
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #e6fffa;
  backdrop-filter: blur(4px);
}

.hero-badge-icon {
  width: 14px;
  height: 14px;
  color: #5eead4;
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin: 0 0 0.75rem;
  color: #ffffff;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 2.75rem;
  }
}

.hero-subtitle {
  font-size: 0.95rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  max-width: 780px;
  margin: 0 auto;
  line-height: 1.6;
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
  justify-content: space-between;
  gap: 1.25rem;
  flex-wrap: wrap;
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
  align-items: flex-start;
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .spotlight-col-left {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.spotlight-avatar-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.65rem;
  flex-shrink: 0;
}

.spotlight-avatar-squircle {
  width: 92px;
  height: 92px;
  border-radius: 24px;
  background: linear-gradient(135deg, #004d5a 0%, #008795 100%);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 22px rgba(0, 135, 149, 0.25);
  border: 3px solid #ffffff;
  overflow: hidden;
}

.spotlight-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
}

.spotlight-monogram {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.spotlight-initials {
  font-size: 1.85rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #ffffff;
}

.spotlight-crest-label {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #5eead4;
  text-transform: uppercase;
}

.spotlight-role-pill {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 3px 10px;
  background-color: #e6fffa;
  color: #008795;
  border-radius: 9999px;
}

.spotlight-details {
  flex: 1 1 auto;
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
  gap: 3rem;
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
   CLEAN CORPORATE DIRECTORY TABLE
   ========================================================================== */
.table-responsive-wrapper {
  background-color: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.85);
  border-radius: 16px;
  overflow-x: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.corporate-directory-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.82rem;
}

/* Table Header */
.corporate-directory-table thead tr {
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.corporate-directory-table th {
  padding: 10px 14px;
  font-size: 0.7rem;
  font-weight: 800;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.th-name {
  width: 24%;
  min-width: 190px;
}

.th-designation {
  width: 27%;
  min-width: 210px;
}

.th-room {
  width: 14%;
  min-width: 120px;
}

.th-contacts {
  width: 22%;
  min-width: 210px;
}

.th-email {
  width: 13%;
  min-width: 160px;
}

/* Table Body Rows */
.directory-row {
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.15s ease;
}

.directory-row:last-child {
  border-bottom: none;
}

.directory-row:hover {
  background-color: #f8fafc;
}

.corporate-directory-table td {
  padding: 10px 14px;
  vertical-align: middle;
}

/* Column 1: Name (Clean Text Only) */
.table-official-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.3;
  display: block;
}

/* Column 2: Designation */
.table-designation-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: #008795;
  line-height: 1.35;
  display: block;
}

/* Column 3: Room */
.table-room-cell {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.74rem;
  color: #475569;
}

.table-room-icon {
  width: 13px;
  height: 13px;
  color: #94a3b8;
  flex-shrink: 0;
}

.table-room-text {
  white-space: nowrap;
}

/* Column 4: Contact Numbers */
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
  padding: 3px 7px;
  border-radius: 6px;
  text-decoration: none;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.table-contact-pill:hover {
  background-color: #ffffff;
  border-color: #008795;
  box-shadow: 0 2px 5px rgba(0, 135, 149, 0.1);
  transform: translateY(-1px);
}

.table-contact-pill .pill-type-tag {
  font-size: 0.58rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 1px 4px;
  border-radius: 3px;
  line-height: 1.2;
}

.table-contact-pill .pill-value-text {
  font-size: 0.7rem;
  font-weight: 700;
  color: #334155;
  letter-spacing: 0.05px;
}

.table-contact-pill:hover .pill-value-text {
  color: #008795;
}

.pill-office .pill-type-tag { background: #e0f2fe; color: #0284c7; }
.pill-ext .pill-type-tag { background: #e6fffa; color: #008795; }
.pill-mobile .pill-type-tag { background: #dcfce7; color: #15803d; }
.pill-residence .pill-type-tag { background: #fef3c7; color: #b45309; }
.pill-fax .pill-type-tag { background: #f1f5f9; color: #475569; }

/* Column 5: Clickable Emails */
.table-emails-wrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.table-email-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #008795;
  text-decoration: none;
  padding: 2px 6px;
  border-radius: 6px;
  background-color: #f0fdfa;
  border: 1px solid #ccfbf1;
  transition: all 0.15s ease;
  max-width: 220px;
}

.table-email-link:hover {
  background-color: #008795;
  color: #ffffff;
  border-color: #008795;
}

.table-email-svg {
  width: 11px;
  height: 11px;
  flex-shrink: 0;
}

.table-email-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
</style>
