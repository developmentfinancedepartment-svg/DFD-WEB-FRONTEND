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
            <li class="nav-item"><router-link to="/" class="nav-link" @click="closeNavbar">Home</router-link></li>
            <li class="nav-item"><router-link to="/About" class="nav-link" @click="closeNavbar">About Us</router-link></li>
            <li class="nav-item"><router-link to="/Services" class="nav-link" @click="closeNavbar">Services</router-link></li>
            <li class="nav-item"><router-link to="/publications" class="nav-link" @click="closeNavbar">Publications</router-link></li>
            
            <!-- Events Dropdown -->
            <li 
              class="nav-item dropdown-events"
              @mouseenter="openEvents"
              @mouseleave="closeEvents"
            >
              <a 
                href="#" 
                class="nav-link" 
                @click.prevent="toggleEvents"
              >
                {{ eventsLabel }} 
                <i class="fas fa-chevron-down ms-1 chevron-icon" :class="{ 'rotated': isEventsOpen }"></i>
              </a>
              <transition name="dropdown-fade">
                <div class="events-dropdown-menu shadow-sm" v-show="isEventsOpen">
                  <router-link to="/events/gallery" class="events-dropdown-item" @click="closeNavbarAndEvents">
                    <i class="fas fa-images icon-box"></i> Gallery
                  </router-link>
                  <router-link to="/events/field-visits" class="events-dropdown-item" @click="closeNavbarAndEvents">
                    <i class="fas fa-walking icon-box"></i> Field Visits
                  </router-link>
                </div>
              </transition>
            </li>
            
            <li class="nav-item"><router-link to="/Contact" class="nav-link" @click="closeNavbar">Contact</router-link></li>
          </ul>
          
          <div class="search-container-wrapper mt-3 mt-xl-0">
            <div class="search-container position-relative">
              <input 
                type="text" 
                class="search-input custom-search-pill" 
                placeholder="Search..." 
                v-model="searchQuery"
                @focus="isSearchFocused = true"
                @blur="handleBlur"
              />
              <button class="search-btn-circle" @click="handleSearch">
                <i class="fas fa-search"></i>
              </button>
              
              <!-- Search Results Dropdown -->
              <div v-if="isSearchFocused && searchQuery" class="search-results-dropdown shadow-lg rounded">
                <div v-if="searchResults.length > 0">
                  <div 
                    v-for="result in searchResults" 
                    :key="result.path" 
                    class="search-result-item" 
                    @mousedown.prevent="goToPage(result.path)"
                  >
                    <div class="result-title">{{ result.title }}</div>
                    <div class="result-desc text-muted small">{{ getSnippet(result.content, searchQuery) }}</div>
                  </div>
                </div>
                <div v-else class="p-3 text-muted small text-center">
                  No results found for "{{ searchQuery }}".
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  </div>
</template>

<script>
import searchIndexData from '../../assets/search-content.json';

export default {
  data() {
    return {
      isCollapsed: true,
      isScrolled: false,
      searchQuery: '',
      isSearchFocused: false,
      searchIndex: searchIndexData,
      isEventsOpen: false,
      isMobile: false,
      currentDate: '',
      currentTime: '',
      timer: null
    };
  },
  computed: {
    eventsLabel() {
      if (this.$route.path === '/events/gallery') return 'Gallery';
      if (this.$route.path === '/events/field-visits') return 'Field Visits';
      return 'Events';
    },
    isHomePage() {
      return this.$route.path === '/';
    },
    searchResults() {
      if (!this.searchQuery) return [];
      const query = this.searchQuery.toLowerCase();
      return this.searchIndex.filter(item => 
        item.title.toLowerCase().includes(query) || 
        (item.content && item.content.toLowerCase().includes(query))
      );
    }
  },
  mounted() {
    this.updateDateTime();
    this.timer = setInterval(this.updateDateTime, 1000);

    this.handleResize();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);

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
      if (!this.isMobile) this.isEventsOpen = false;
    },
    toggleEvents() {
      if (this.isMobile) {
        this.isEventsOpen = !this.isEventsOpen;
      }
    },
    openEvents() {
      if (!this.isMobile) {
        this.isEventsOpen = true;
      }
    },
    closeEvents() {
      if (!this.isMobile) {
        this.isEventsOpen = false;
      }
    },
    closeNavbarAndEvents() {
      this.closeNavbar();
      this.isEventsOpen = false;
    },
    handleSearch() {
      // Search logic placeholder
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

.nav-link {
  color: #0c2a38 !important;
  font-weight: 600 !important;
  font-size: 15px !important;
  padding: 8px 15px !important;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
  opacity: 0.8;
}

.navbar-scrolled .nav-link {
  color: #ffffff !important;
}

.nav-link:hover { 
  opacity: 1 !important;
}

.nav-link.active,
.router-link-active,
.router-link-exact-active,
.router-link-active .nav-link,
.router-link-exact-active .nav-link { 
  color: #007c91 !important;
  opacity: 1 !important;
}

.navbar-scrolled .nav-link.active,
.navbar-scrolled .router-link-active,
.navbar-scrolled .router-link-exact-active,
.navbar-scrolled .router-link-active .nav-link,
.navbar-scrolled .router-link-exact-active .nav-link { 
  color: #00e5ff !important;
}

/* Active Highlight Indicator */
.nav-link.active::after,
.nav-link.router-link-active::after,
.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #007c91;
  transition: background-color 0.3s ease;
}

.navbar-scrolled .nav-link.active::after,
.navbar-scrolled .nav-link.router-link-active::after,
.navbar-scrolled .nav-link.router-link-exact-active::after {
  background-color: #00e5ff;
}

/* Events Dropdown Styles */
.dropdown-events {
  position: relative;
}

.chevron-icon {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

.events-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 10px;
  min-width: 200px;
  padding: 8px 0;
  margin-top: 5px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 1050;
  display: flex;
  flex-direction: column;
}

@media (max-width: 1199px) {
  .events-dropdown-menu {
    position: static;
    box-shadow: none !important;
    background: transparent;
    padding-left: 15px;
    margin-top: 0;
  }
  .events-dropdown-item {
    color: rgba(255, 255, 255, 0.9);
  }
  .events-dropdown-item:hover, .events-dropdown-item.router-link-active {
    background: rgba(255, 255, 255, 0.1);
    color: #A5F3FC;
  }
  .icon-box {
    color: rgba(255, 255, 255, 0.9);
  }
}

.events-dropdown-item {
  color: #0c2a38;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 12px 20px;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.events-dropdown-item:hover, .events-dropdown-item.router-link-active {
  background: #f0fbfc;
  color: #008795;
}

.icon-box {
  width: 24px;
  text-align: center;
  color: #008795;
}

.dropdown-fade-enter-active, .dropdown-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.dropdown-fade-enter-from, .dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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
  .nav-link { padding: 8px 6px !important; font-size: 0.7rem; }
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

/* Search Bar Styles */
.search-container-wrapper {
  display: flex;
  align-items: center;
}

.custom-search-pill {
  background: transparent;
  border: 1.7px solid #0c2a38;
  border-radius: 30px;
  color: #0c2a38;
  width: 180px;
  padding: 6px 45px 6px 15px;
  transition: all 0.3s ease;
  font-size: 14px;
}

.custom-search-pill:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 135, 149, 0.08);
  border-color: #008795;
}

.navbar-scrolled .custom-search-pill {
  border-color: rgba(255, 255, 255, 0.75);
  color: white;
}

.custom-search-pill:focus {
  background: rgba(12, 42, 56, 0.05);
  border-color: #0c2a38;
  outline: none;
  width: 220px;
}

.navbar-scrolled .custom-search-pill:focus {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
}

.custom-search-pill::placeholder {
  color: rgba(12, 42, 56, 0.7);
  transition: color 0.3s ease;
}

.navbar-scrolled .custom-search-pill::placeholder {
  color: rgba(255, 255, 255, 0.7);
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
  color: #000000;
  cursor: pointer;
  transition: all 0.3s ease;
}

.navbar-scrolled .search-btn-circle {
  color: #ffffff;
}

.search-btn-circle:hover {
  background-color: #00a896;
}

.search-results-dropdown {
  position: absolute;
  top: 120%;
  right: 0;
  width: 320px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  z-index: 1060;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid rgba(0,0,0,0.1);
}

.search-result-item {
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background 0.2s;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover {
  background: #f8f9fa;
}

.result-title {
  color: #008E9B;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 3px;
}

.result-desc {
  line-height: 1.3;
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