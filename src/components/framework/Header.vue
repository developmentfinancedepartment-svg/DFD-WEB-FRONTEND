<template>
  <div class="header-wrapper">
    <header class="main-header" :class="{ 'navbar-scrolled': isScrolled || !isHomePage }">
      <!-- Top Bar: Social, Translate, Disclaimer -->
      <div class="top-bar d-none d-lg-flex">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <!-- Date & Time (Far Left) -->
        <div class="datetime-display d-flex align-items-center">
          <i class="far fa-calendar-alt accent-cyan me-2"></i> {{ currentDate }}
          <span class="separator mx-2">|</span>
          <i class="far fa-clock accent-cyan me-2"></i> {{ currentTime }}
        </div>

        <div class="d-flex align-items-center gap-4">
          <div class="top-right d-flex align-items-center gap-4">
            <div class="social-links">
              <a href="https://www.youtube.com" target="_blank" class="social-icon" title="YouTube">
                <i class="fab fa-youtube"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" class="social-icon" title="LinkedIn">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.facebook.com" target="_blank" class="social-icon" title="Facebook">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="tel:1819" class="hotline-link" title="Government Hotline 1819">
                <i class="fas fa-phone-alt"></i>
                <span class="hotline-number">1819</span>
              </a>
            </div>
          </div>
          <div class="top-left d-flex align-items-center">
            <div id="google_translate_element" class="translate-box me-3"></div>
            <span class="separator d-none d-md-inline">|</span>
            <router-link to="/Disclaimer" class="top-link ms-2">Disclaimer</router-link>
            <span class="separator">|</span>
            <!-- <a href="mailto:info@itmd.gov.lk" class="top-link"><i class="fas fa-envelope me-1"></i> info@itmd.gov.lk</a> -->
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <nav class="navbar navbar-expand-xl primary-nav">
      <div class="container-fluid">
        <!-- Brand Identity -->
        <router-link to="/" class="navbar-brand">
          <div class="brand-wrapper">
            <img src="../../assets/national-emblem.svg" class="gov-logo" alt="National Emblem" />
            <div class="brand-divider"></div>
            <!-- <img src="../../assets/dfd-logo.png" class="dfd-logo" alt="DFD Logo" /> -->
            <div class="brand-text d-none d-md-block">
              <div class="dept-name">
                <span class="dept-small">DEPARTMENT OF</span>
                <span class="dept-main">Development Finance</span>
              </div>
            </div>
          </div>
        </router-link>

        <!-- Mobile Toggle -->
        <button
          class="navbar-toggler custom-toggler"
          type="button"
          aria-label="Toggle navigation"
          @click="toggleNavbar"
        >
          <div class="hamburger" :class="{ 'is-active': !isCollapsed }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

                <!-- Nav Links -->
        <div class="collapse navbar-collapse d-xl-flex justify-content-between" :class="{ show: !isCollapsed }">
          <ul class="navbar-nav mx-auto align-items-xl-center">
            <li class="nav-item">
              <router-link
                to="/"
                class="nav-link text-base font-medium text-white/80 transition-colors duration-200 hover:text-[#00c5d6]"
                exact-active-class="!text-[#00c5d6] !font-bold"
                active-class="!text-[#00c5d6] !font-bold"
                @click="closeNavbar"
              >Home</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/About"
                class="nav-link text-base font-medium text-white/80 transition-colors duration-200 hover:text-[#00c5d6]"
                active-class="!text-[#00c5d6] !font-bold"
                @click="closeNavbar"
              >About Us</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/team"
                class="nav-link text-base font-medium text-white/80 transition-colors duration-200 hover:text-[#00c5d6]"
                active-class="!text-[#00c5d6] !font-bold"
                @click="closeNavbar"
              >Our Team</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/Services"
                class="nav-link text-base font-medium text-white/80 transition-colors duration-200 hover:text-[#00c5d6]"
                active-class="!text-[#00c5d6] !font-bold"
                @click="closeNavbar"
              >Services</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/publications"
                class="nav-link text-base font-medium text-white/80 transition-colors duration-200 hover:text-[#00c5d6]"
                active-class="!text-[#00c5d6] !font-bold"
                @click="closeNavbar"
              >Publications</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/gallery"
                class="nav-link text-base font-medium text-white/80 transition-colors duration-200 hover:text-[#00c5d6]"
                active-class="!text-[#00c5d6] !font-bold"
                @click="closeNavbar"
              >Gallery</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/rti"
                class="nav-link text-base font-medium text-white/80 transition-colors duration-200 hover:text-[#00c5d6]"
                active-class="!text-[#00c5d6] !font-bold"
                @click="closeNavbar"
              >RTI</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/Contact"
                class="nav-link text-base font-medium text-white/80 transition-colors duration-200 hover:text-[#00c5d6]"
                active-class="!text-[#00c5d6] !font-bold"
                @click="closeNavbar"
              >Contact</router-link>
            </li>
          </ul>
          
          <div class="search-container-wrapper mt-3 mt-xl-0" ref="searchWrapperRef">
            <div class="search-container position-relative">
              <input 
                ref="navbarSearchInput"
                type="text" 
                class="search-input custom-search-pill text-white placeholder-white/70 border-white/60" 
                :class="{ 'home-search-inactive cursor-default select-none': isHomePage }"
                :placeholder="searchPlaceholder" 
                v-model="searchQuery"
                :readonly="isHomePage"
                @focus="handleFocus"
                @keydown.enter="handleSearch"
                @keydown.esc="closeSearch"
              />
              <button
                v-if="!isHomePage && searchQuery"
                type="button"
                class="search-clear-btn"
                @click.stop="clearSearch"
                title="Clear search"
                aria-label="Clear search"
              >
                <i class="fas fa-times"></i>
              </button>
              <button 
                class="search-btn-circle text-white" 
                :class="{ 'opacity-60 cursor-default pointer-events-none': isHomePage }"
                @click="handleSearch" 
                :aria-label="searchButtonTitle" 
                :title="searchButtonTitle"
                :disabled="isHomePage"
              >
                <i class="fas fa-search text-white"></i>
              </button>

              <!-- Global Search Results Dropdown Overlay (Completely disabled on Home and Context-Aware pages) -->
              <transition name="dropdown-fade">
                <div 
                  v-if="!isHomePage && !isContextAwarePage && isSearchFocused && searchQuery && searchQuery.trim()" 
                  class="search-results-dropdown shadow-2xl rounded-2xl"
                >
                  <!-- Header: Category Filter Tabs -->
                  <div class="search-dropdown-header p-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <div class="category-pills-row flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                      <button
                        v-for="cat in searchCategoryTabs"
                        :key="cat.key"
                        type="button"
                        class="search-pill-btn"
                        :class="{ 'active-pill': activeCategoryTab === cat.key }"
                        @mousedown.prevent="activeCategoryTab = cat.key"
                      >
                        <i :class="[cat.icon, 'pill-icon']"></i>
                        <span>{{ cat.label }}</span>
                        <span class="pill-count">({{ categoryCounts[cat.key] || 0 }})</span>
                      </button>
                    </div>

                    <button 
                      type="button" 
                      class="close-search-btn text-slate-400 hover:text-slate-700 ml-2"
                      @click="closeSearch"
                      title="Close search"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>

                  <!-- Scrollable Results Body -->
                  <div class="search-results-scrollable max-h-[380px] overflow-y-auto p-2.5 text-left">
                    <!-- Grouped Categorized Results -->
                    <div v-if="filteredGroupedResults.length > 0" class="space-y-3">
                      <div 
                        v-for="group in filteredGroupedResults" 
                        :key="group.key"
                        class="search-category-group"
                      >
                        <!-- Category Header -->
                        <div class="category-header-title px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100/70 mb-1">
                          <i :class="[group.icon, 'text-[#008795] text-xs']"></i>
                          <span>{{ group.label }}</span>
                          <span class="text-[10px] text-slate-400 font-normal">({{ group.items.length }})</span>
                        </div>

                        <!-- Category Items -->
                        <div class="category-items-list space-y-1">
                          <div 
                            v-for="item in group.items" 
                            :key="item.id"
                            class="search-result-card p-2.5 rounded-xl hover:bg-slate-50 transition cursor-pointer flex items-start gap-3 border border-transparent hover:border-slate-200/60"
                            @mousedown.prevent="goToResult(item)"
                          >
                            <div class="result-icon-box w-7 h-7 rounded-lg bg-teal-50 text-[#008795] flex items-center justify-center text-xs shrink-0 mt-0.5">
                              <i :class="group.icon"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                              <div class="flex items-center justify-between gap-2 mb-0.5">
                                <span class="text-xs font-bold text-slate-800 truncate">{{ item.title }}</span>
                                <span class="result-mini-tag">{{ item.tag }}</span>
                              </div>
                              <div class="text-[11px] text-[#008795] font-medium truncate" v-if="item.subtitle">
                                {{ item.subtitle }}
                              </div>
                              <div class="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {{ item.description }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- No Results State -->
                    <div v-else class="empty-dropdown-state text-center py-7 px-4">
                      <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2 text-sm">
                        <i class="fas fa-search-minus"></i>
                      </div>
                      <div class="text-xs font-bold text-slate-700 mb-0.5">
                        No results found for "{{ searchQuery }}"
                      </div>
                      <div class="text-[11px] text-slate-400 mb-3">
                        Try searching for MSME, Director General, Action Plan, or Dairy.
                      </div>
                      <div class="flex flex-wrap gap-1.5 justify-center">
                        <button
                          v-for="kw in ['MSME', 'Director General', 'Action Plan', 'Dairy', 'Contact']"
                          :key="kw"
                          type="button"
                          class="text-[11px] bg-slate-100 hover:bg-[#008795] hover:text-white px-2 py-0.5 rounded-full text-slate-600 transition cursor-pointer"
                          @mousedown.prevent="searchQuery = kw"
                        >
                          {{ kw }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Dropdown Footer -->
                  <div class="search-dropdown-footer p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span class="text-slate-400 text-[11px]">
                      Press <kbd class="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono">Enter</kbd> to search
                    </span>
                    <button
                      type="button"
                      class="text-xs font-bold text-[#008795] hover:underline flex items-center gap-1 cursor-pointer"
                      @mousedown.prevent="handleSearch"
                    >
                      <span>View All ({{ searchResults.length }})</span>
                      <i class="fas fa-arrow-right text-[10px]"></i>
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  </div>
</template>

<script>
import {
  performGlobalSearch,
  groupResultsByCategory,
  getCategoryCounts,
  SEARCH_CATEGORIES
} from '@/services/searchService';
import {
  navbarSearchState,
  clearNavbarSearch,
  setNavbarSearchQuery
} from '@/services/navbarSearchState';

export default {
  data() {
    return {
      isCollapsed: true,
      isScrolled: false,
      isSearchFocused: false,
      activeCategoryTab: 'all',
      isMobile: false,
      currentDate: '',
      currentTime: '',
      timer: null
    };
  },
  computed: {
    isHomePage() {
      const p = this.currentRoutePath;
      return p === '/' || p === '/home' || this.currentRouteName === 'home';
    },
    currentRoutePath() {
      return this.$route ? (this.$route.path || '').toLowerCase() : '';
    },
    currentRouteName() {
      return this.$route ? (this.$route.name || '') : '';
    },
    isTeamPage() {
      const p = this.currentRoutePath;
      return p === '/team' || p === '/ourteam' || p === '/our-team' || this.currentRouteName === 'OurTeam';
    },
    isServicesPage() {
      const p = this.currentRoutePath;
      return p === '/services' || this.currentRouteName === 'Services';
    },
    isPublicationsPage() {
      const p = this.currentRoutePath;
      return p === '/publications' || this.currentRouteName === 'publications';
    },
    isGalleryPage() {
      const p = this.currentRoutePath;
      return p === '/gallery' || p === '/events/gallery' || this.currentRouteName === 'gallery';
    },
    isContextAwarePage() {
      return this.isTeamPage || this.isServicesPage || this.isPublicationsPage || this.isGalleryPage;
    },
    searchPlaceholder() {
      if (this.isHomePage) return "Select a page to search content...";
      if (this.isTeamPage) return "Search officials by name, role, extension...";
      if (this.isServicesPage) return "Search loan schemes & services...";
      if (this.isPublicationsPage) return "Search publications & reports...";
      if (this.isGalleryPage) return "Search gallery...";
      return "Search DFD website...";
    },
    searchButtonTitle() {
      if (this.isHomePage) return "Select a page to search content";
      if (this.isTeamPage) return "Filter officials";
      if (this.isServicesPage) return "Filter loan schemes";
      if (this.isPublicationsPage) return "Filter publications";
      if (this.isGalleryPage) return "Filter gallery";
      return "Search website";
    },
    searchQuery: {
      get() {
        return navbarSearchState.query;
      },
      set(val) {
        navbarSearchState.query = val;
      }
    },
    searchResults() {
      if (this.isHomePage || this.isContextAwarePage || !this.searchQuery || !this.searchQuery.trim()) return [];
      return performGlobalSearch(this.searchQuery, 'all');
    },
    categoryCounts() {
      return getCategoryCounts(this.searchResults);
    },
    filteredSearchResults() {
      if (this.activeCategoryTab === 'all') return this.searchResults;
      return this.searchResults.filter(item => item.category === this.activeCategoryTab);
    },
    filteredGroupedResults() {
      return groupResultsByCategory(this.filteredSearchResults);
    },
    searchCategoryTabs() {
      return Object.values(SEARCH_CATEGORIES);
    }
  },
  watch: {
    '$route.path'(newPath, oldPath) {
      if (newPath !== oldPath) {
        const q = this.$route && this.$route.query && this.$route.query.q ? String(this.$route.query.q) : '';
        setNavbarSearchQuery(q);
        this.isSearchFocused = false;
        this.activeCategoryTab = 'all';
      }
    }
  },
  mounted() {
    if (this.$route && this.$route.query && this.$route.query.q) {
      setNavbarSearchQuery(String(this.$route.query.q));
    }
    this.updateDateTime();
    this.timer = setInterval(this.updateDateTime, 1000);

    this.handleResize();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('click', this.handleClickOutside);

    // Dynamic Google Translate Injection for Vue SPA
    window.VueGoogleTranslateInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,ta,si',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=VueGoogleTranslateInit';
      document.head.appendChild(script);
    } else if (window.google && window.google.translate) {
      // For hot reloads, clear and re-initialize
      const container = document.getElementById('google_translate_element');
      if (container) container.innerHTML = '';
      window.VueGoogleTranslateInit();
    }
  },
  unmounted() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      const dayName = now.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = String(now.getDate()).padStart(2, '0');
      const monthName = now.toLocaleDateString('en-US', { month: 'short' });
      const year = now.getFullYear();
      this.currentDate = `${dayName}, ${dayNum} ${monthName} ${year}`;
      
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const hoursStr = String(hours).padStart(2, '0');
      
      this.currentTime = `${hoursStr}:${minutes}:${seconds} ${ampm}`;
    },
    handleResize() {
      this.isMobile = window.innerWidth < 1200;
    },
    handleFocus() {
      if (this.isHomePage) {
        this.isSearchFocused = false;
        return;
      }
      this.isSearchFocused = true;
    },
    handleSearch() {
      if (this.isHomePage) return;
      const q = (this.searchQuery || '').trim();
      // On context-aware pages, stay on current page as data cards/tables are already filtered in real time
      if (this.isContextAwarePage) {
        this.isSearchFocused = false;
        this.$refs.navbarSearchInput?.blur();
        return;
      }
      if (q) {
        this.$router.push({ path: '/search', query: { q } });
      } else {
        this.$router.push('/search');
      }
      this.isSearchFocused = false;
      this.closeNavbar();
    },
    closeSearch() {
      this.isSearchFocused = false;
    },
    clearSearch() {
      if (this.isHomePage) return;
      clearNavbarSearch();
      this.activeCategoryTab = 'all';
      this.$nextTick(() => {
        this.$refs.navbarSearchInput?.focus();
      });
    },
    goToResult(item) {
      if (item.fileUrl) {
        window.open(item.fileUrl, '_blank');
      } else if (item.path) {
        this.$router.push(item.path);
      }
      this.isSearchFocused = false;
      this.closeNavbar();
    },
    handleClickOutside(event) {
      if (this.$refs.searchWrapperRef && !this.$refs.searchWrapperRef.contains(event.target)) {
        this.isSearchFocused = false;
      }
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 40;
    },
    toggleNavbar() {
      this.isCollapsed = !this.isCollapsed;
    },
    closeNavbar() {
      this.isCollapsed = true;
    },
    handleBlur() {
      setTimeout(() => {
        this.isSearchFocused = false;
      }, 150);
    },
    goToPage(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
      this.searchQuery = '';
      this.isSearchFocused = false;
      this.closeNavbar();
    },
    getSnippet(text, query) {
      if (!text) return '';
      const lowerText = text.toLowerCase();
      const lowerQuery = query.toLowerCase();
      const index = lowerText.indexOf(lowerQuery);
      
      if (index === -1) {
        return text.substring(0, 100) + '...';
      }
      
      const start = Math.max(0, index - 30);
      const end = Math.min(text.length, index + query.length + 30);
      let snippet = text.substring(start, end);
      
      if (start > 0) snippet = '...' + snippet;
      if (end < text.length) snippet = snippet + '...';
      
      return snippet;
    }
  },
};
</script>

<style scoped>
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
}

.top-bar {
  background: #008795;
  padding: 6px 2%;
  height: 38px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1001;
  width: 100%;
}

.top-link {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  text-decoration: none;
  font-weight: 600;
}
.top-link:hover,
.top-link:focus,
.top-link:active,
.top-link:visited {
  color: #A5F3FC !important;
  outline: none !important;
  box-shadow: none !important;
  text-decoration: none;
}


.datetime-display {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.accent-cyan {
  color: #A5F3FC;
}

.separator {
  color: rgba(255, 255, 255, 0.2);
  margin: 0 5px;
}

.translate-box {
  min-width: 150px;
  min-height: 28px;
  display: inline-block;
}

.social-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.social-icon {
  /* color: rgba(250, 244, 244, 0.7); */
  color: white;
  font-size: 1.3rem;
  transition: all 0.3s ease;
}

.social-icon:hover, .social-icon:focus { color: #A5F3FC; outline: none; }

.hotline-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  padding: 3px 10px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(165, 243, 252, 0.3);
  transition: all 0.25s ease;
  letter-spacing: 0.5px;
  line-height: 1;
}

.hotline-link i {
  color: #A5F3FC;
  font-size: 0.8rem;
  transition: transform 0.25s ease;
}

.hotline-link:hover,
.hotline-link:focus {
  color: #A5F3FC;
  background: rgba(165, 243, 252, 0.2);
  border-color: rgba(165, 243, 252, 0.6);
  text-decoration: none;
  box-shadow: 0 0 10px rgba(165, 243, 252, 0.25);
}

.hotline-link:hover i {
  transform: scale(1.15);
}

.primary-nav {
  background: transparent;
  box-shadow: none !important;
  border-bottom: none !important;
  padding: 4px 8px;
  transition: background-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease;
}

.navbar-scrolled .primary-nav {
  padding: 4px 8px;
  background: #008e9b;
  backdrop-filter: blur(10px);
  box-shadow: none !important;
  border-bottom: none !important;
}

.brand-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1px;
  flex-wrap: nowrap;
}

.gov-logo { 
  height: 60px; 
  width: auto;
  margin-right: 10px; 
}

.brand-divider { width: 2px; height: 50px; background: rgba(255, 255, 255, 0.2); margin: 0 2px; }

.dept-name {
  font-family: 'Outfit', sans-serif;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  line-height: 1.1;
  transition: all 0.3s ease;
}

.dept-small {
  font-size: 1.05rem;
  font-weight: 400;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: color 0.3s ease;
}

.navbar-scrolled .dept-small {
  color: rgba(255, 255, 255, 0.8);
}

.dept-main {
  font-size: 1.95rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #ffffff;
  transition: color 0.3s ease;
}

.navbar-scrolled .dept-main {
  color: #ffffff;
}

.dfd-logo { 
  height: 80px; 
  width: auto;
  margin: 0px -20px 0px -35px;
}

.dept-name:hover .dept-main {
  filter: drop-shadow(0 0 15px rgba(0, 180, 197, 0.6));
}

.navbar-brand,
.navbar-brand.router-link-active,
.navbar-brand.router-link-exact-active {
  border: none !important;
  border-bottom: none !important;
  text-decoration: none !important;
  box-shadow: none !important;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8) !important;
  font-weight: 500 !important;
  font-size: 1rem !important; /* text-base: 16px */
  padding: 8px 14px !important;
  transition: color 200ms ease !important;
  display: inline-block;
  position: relative;
  text-decoration: none !important;
  border: none !important;
  border-bottom: none !important;
  box-shadow: none !important;
}

.navbar-scrolled .nav-link {
  color: rgba(255, 255, 255, 0.8) !important;
}

.nav-link:hover,
.navbar-scrolled .nav-link:hover { 
  color: #00c5d6 !important;
  text-decoration: none !important;
  border-bottom: none !important;
}
.nav-link.active,
.nav-link.router-link-active,
.nav-link.router-link-exact-active,
.router-link-active.nav-link,
.router-link-exact-active.nav-link { 
  color: #00c5d6 !important;
  font-weight: 700 !important;
  border-bottom: none !important;
  text-decoration: none !important;
}

.navbar-scrolled .nav-link.active,
.navbar-scrolled .nav-link.router-link-active,
.navbar-scrolled .nav-link.router-link-exact-active,
.navbar-scrolled .router-link-active.nav-link,
.navbar-scrolled .router-link-exact-active.nav-link { 
  color: #00c5d6 !important;
  font-weight: 700 !important;
  border-bottom: none !important;
}

.nav-link::after,
.nav-link.active::after,
.nav-link.router-link-active::after,
.nav-link.router-link-exact-active::after,
.navbar-brand::after {
  display: none !important;
  content: none !important;
  height: 0 !important;
  width: 0 !important;
  border: none !important;
}
/* Old Dropdown Styles */
.dropdown-hover .dropdown-menu {
  background: rgba(3, 43, 95, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px 0;
  margin-top: 0;
}

.dropdown-item {
  color: white !important;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 10px 20px;
  transition: all 0.3s ease;
}

.dropdown-item:hover, .dropdown-item:focus, .dropdown-item.router-link-active {
  background: rgba(0, 142, 155, 0.1);
  color: #008E9B !important;
  transform: translateX(5px);
}

@media (min-width: 1200px) {
  .dropdown-hover:hover .dropdown-menu {
    display: block;
    animation: fadeIn 0.3s ease;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.contact-btn {
  background: #008E9B;
  color: white !important;
  font-weight: 700;
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 0.75rem;
  text-transform: uppercase;
  text-decoration: none !important;
  margin-left: 5px;
  transition: all 0.3s;
  white-space: nowrap;
  display: inline-block;
}

.contact-btn:hover { background: #009fd1; transform: translateY(-1px); }

.custom-toggler { border: none; background: transparent; padding: 5px; }
.hamburger span { display: block; width: 22px; height: 2px; background: white; margin-bottom: 5px; transition: 0.3s; }
.is-active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.is-active span:nth-child(2) { opacity: 0; }
.is-active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (min-width: 1200px) and (max-width: 1399px) {
  .nav-link { padding: 8px 8px !important; font-size: 0.95rem !important; }
  .dept-name { font-size: 1.1rem; white-space: normal; max-width: 280px; }
  .contact-btn { padding: 8px 10px; font-size: 0.7rem; }
  .search-input { width: 110px; font-size: 0.8rem; }
  .search-input:focus { width: 140px; }
}

@media (max-width: 1199px) {
  .navbar-collapse {
    background: #008E9B;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  }
  .nav-item { margin: 5px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .nav-item:last-child { border-bottom: none; }
  .nav-link { font-size: 0.9rem; padding: 12px 10px !important; }
  .contact-btn { margin-left: 0; margin-top: 10px; font-size: 0.9rem; padding: 12px 20px; width: 100%; text-align: center; }
}

@media (max-width: 767px) {
  .brand-text { display: none; }
  .gov-logo { height: 45px; }
  .dfd-logo { height: 60px; }
  .primary-nav { padding: 4px 8px; }
  .brand-divider { height: 35px; }
  .translate-box { min-width: auto; }
}

/* Search Bar Styles & Smooth Hover Transitions */
.search-container-wrapper {
  display: flex;
  align-items: center;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.custom-search-pill {
  background: rgba(255, 255, 255, 0.08);
  border: 1.5px solid rgba(255, 255, 255, 0.6) !important;
  border-radius: 30px;
  color: #ffffff !important;
  width: 180px;
  padding: 6px 45px 6px 15px;
  transition: all 0.3s ease !important;
  font-size: 14px;
}

/* Mouse hover transitions: border to #00c5d6, brighten bg to bg-white/20, subtle teal glow */
.custom-search-pill:hover,
.search-container:hover .custom-search-pill {
  border-color: #00c5d6 !important;
  background-color: rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 0 12px rgba(0, 197, 214, 0.45) !important;
}

.navbar-scrolled .custom-search-pill {
  border-color: rgba(255, 255, 255, 0.6) !important;
  color: #ffffff !important;
}

.navbar-scrolled .custom-search-pill:hover,
.navbar-scrolled .search-container:hover .custom-search-pill {
  border-color: #00c5d6 !important;
  background-color: rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 0 12px rgba(0, 197, 214, 0.45) !important;
}

.custom-search-pill:focus {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-color: #00c5d6 !important;
  box-shadow: 0 0 15px rgba(0, 197, 214, 0.5) !important;
  outline: none;
  width: 220px;
  color: #ffffff !important;
}

.navbar-scrolled .custom-search-pill:focus {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-color: #00c5d6 !important;
  box-shadow: 0 0 15px rgba(0, 197, 214, 0.5) !important;
}

.custom-search-pill::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
  transition: color 0.3s ease;
}

.navbar-scrolled .custom-search-pill::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}

.search-btn-circle {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff !important;
  cursor: pointer;
  transition: all 0.3s ease !important;
}

.search-btn-circle i {
  color: #ffffff !important;
  transition: color 0.3s ease !important;
}

/* Change search icon color to #00c5d6 on hover */
.search-btn-circle:hover i,
.search-container:hover .search-btn-circle i,
.custom-search-pill:hover ~ .search-btn-circle i {
  color: #00c5d6 !important;
}

.navbar-scrolled .search-btn-circle {
  color: #ffffff !important;
}

.navbar-scrolled .search-btn-circle i {
  color: #ffffff !important;
}

.navbar-scrolled .search-btn-circle:hover i,
.navbar-scrolled .search-container:hover .search-btn-circle i {
  color: #00c5d6 !important;
}

.search-btn-circle:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

/* Tailwind utility classes helper */
.text-base {
  font-size: 1rem !important;
  line-height: 1.5rem !important;
}
.font-medium {
  font-weight: 500 !important;
}
.text-white\/80 {
  color: rgba(255, 255, 255, 0.8) !important;
}
.hover\:text-\[\#00c5d6\]:hover {
  color: #00c5d6 !important;
}
.\!text-\[\#00c5d6\] {
  color: #00c5d6 !important;
}
.\!font-bold {
  font-weight: 700 !important;
}
.duration-200 {
  transition-duration: 200ms !important;
}
.duration-300 {
  transition-duration: 300ms !important;
}
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke !important;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
}
.transition-all {
  transition-property: all !important;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
}
.placeholder-white\/70::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}
.border-white\/60 {
  border-color: rgba(255, 255, 255, 0.6) !important;
}
.hover\:border-\[\#00c5d6\]:hover {
  border-color: #00c5d6 !important;
}
.hover\:bg-white\/20:hover {
  background-color: rgba(255, 255, 255, 0.2) !important;
}
.home-search-inactive {
  cursor: default !important;
  opacity: 0.85;
}
.home-search-inactive:focus {
  outline: none !important;
  box-shadow: none !important;
  border-color: rgba(255, 255, 255, 0.6) !important;
}
.search-clear-btn {
  position: absolute;
  right: 32px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 11px;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  transition: color 0.2s ease;
  z-index: 5;
}

.search-results-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 520px;
  max-width: 92vw;
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  z-index: 1080;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18), 0 4px 14px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(226, 232, 240, 0.95);
  animation: dropdownAnim 0.2s ease-out;
}

@keyframes dropdownAnim {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-pill-btn {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 9999px;
  padding: 3px 9px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #475569;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.search-pill-btn:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.search-pill-btn.active-pill {
  background: #008795 !important;
  color: #ffffff !important;
  border-color: #008795 !important;
}

.pill-icon {
  font-size: 9px;
}

.pill-count {
  font-size: 9px;
  opacity: 0.8;
}

.close-search-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 12px;
}

.search-result-card:hover {
  background: #f8fafc;
}

.result-mini-tag {
  background: #f0f9fa;
  color: #008795;
  border: 1px solid rgba(0, 135, 149, 0.2);
  font-size: 9.5px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

@media (max-width: 1199px) {
  .search-input {
    width: 100%;
  }
  .search-input:focus {
    width: 100%;
  }
  .search-results-dropdown {
    width: 100%;
    position: static;
    margin-top: 10px;
    box-shadow: none !important;
    border: 1px solid rgba(255,255,255,0.1);
  }
}

.brand-text { margin-left: 6px; }
</style>
