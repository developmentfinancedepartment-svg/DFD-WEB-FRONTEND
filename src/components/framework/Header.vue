<template>
  <header class="main-header" :class="{ 'header-scrolled': isScrolled }">
    <!-- Top Bar: Social, Translate, Disclaimer -->
    <div class="top-bar d-none d-lg-flex">
      <div class="container-fluid d-flex justify-content-end align-items-center gap-4">
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
            <a href="https://www.whatsapp.com" target="_blank" class="social-icon" title="WhatsApp">
              <i class="fab fa-whatsapp"></i>
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

    <!-- Main Navigation Bar -->
    <nav class="navbar navbar-expand-xl primary-nav">
      <div class="container-fluid">
        <!-- Brand Identity -->
        <router-link to="/" class="navbar-brand">
          <div class="brand-wrapper">
            <img src="../../assets/sample.png" class="gov-logo" alt="Government Logo" />
            <div class="brand-divider"></div>
            <img src="" class="your-logo" alt="your Logo" />
            <div class="brand-text d-none d-md-block">
              <div class="dept-name">
                <span class="dept-small">Department of</span>
                <span class="dept-main">Your Department Name</span>
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
        <div class="collapse navbar-collapse" :class="{ show: !isCollapsed }">
          <ul class="navbar-nav ms-auto align-items-xl-center">
            <li class="nav-item"><router-link to="/" class="nav-link" @click="closeNavbar">Home</router-link></li>
            <li class="nav-item dropdown dropdown-hover">
              <a class="nav-link dropdown-toggle" href="#" id="aboutDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                About us
              </a>
              <ul class="dropdown-menu shadow-lg" aria-labelledby="aboutDropdown">
                <li><router-link to="/About" class="dropdown-item" @click="closeNavbar">About Us</router-link></li>
                <li><router-link to="/OurTeam" class="dropdown-item" @click="closeNavbar">Team </router-link></li>
              </ul>
            </li>
            <li class="nav-item"><router-link to="/Services" class="nav-link" @click="closeNavbar">Services</router-link></li>
            <li class="nav-item"><router-link to="/Systems" class="nav-link" @click="closeNavbar">Systems</router-link></li>
            <li class="nav-item"><router-link to="/Actionplan" class="nav-link" @click="closeNavbar">Publications</router-link></li>
            <li class="nav-item dropdown dropdown-hover">
              <a class="nav-link dropdown-toggle" href="#" id="eventsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Events
              </a>
              <ul class="dropdown-menu shadow-lg" aria-labelledby="eventsDropdown">
                <li><router-link to="/Calendar" class="dropdown-item" @click="closeNavbar">Calendar</router-link></li>
                <li><router-link to="/KnowledgeSharing" class="dropdown-item" @click="closeNavbar">Knowledge Sharing Program</router-link></li>
              </ul>
            </li>
            <li class="nav-item"><router-link to="/Officers" class="nav-link" @click="closeNavbar">RTI</router-link></li>
            <li class="nav-item"><router-link to="/Teldirec" class="contact-btn" @click="closeNavbar">Contact Us</router-link></li>
            
            <!-- Search Bar -->
            <!-- <li class="nav-item search-container-wrapper ms-xl-3 mt-3 mt-xl-0">
              <div class="search-container position-relative w-100">
                <input 
                  type="text" 
                  class="search-input form-control form-control-sm rounded-pill pe-4" 
                  placeholder="Search..." 
                  v-model="searchQuery"
                  @focus="isSearchFocused = true"
                  @blur="handleBlur"
                />
                <i class="fas fa-search search-icon"></i> -->
                
                <!-- Search Results Dropdown -->
                <!-- <div v-if="isSearchFocused && searchQuery" class="search-results-dropdown shadow-lg rounded">
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
            </li> -->
          </ul>
        </div>
      </div>
    </nav>
  </header>
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
      searchIndex: searchIndexData
    };
  },
  computed: {
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
    window.addEventListener('scroll', this.handleScroll);

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
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
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
  position:fixed;
  top: 1;
  width: 100%;
  z-index: 1050;
  transition: all 0.3s ease;
}

.top-bar {
  background: #008E9B;
  padding: 6px 2%;
  height: 38px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.header-scrolled .top-bar {
  height: 0;
  padding: 0;
  opacity: 0;
  overflow: hidden;
}

.top-link {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  text-decoration: none;
  font-weight: 600;
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
  gap: 10px;
}

.social-icon {
  /* color: rgba(250, 244, 244, 0.7); */
  color: white;
  font-size: 1.3rem;
  transition: all 0.3s ease;
}

.social-icon:hover { color: #008E9B; }

.primary-nav {
  background: rgba(3, 43, 95, 0.95);
  backdrop-filter: blur(10px);
  padding: 12px 2%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.header-scrolled .primary-nav {
  padding: 8px 3%;
  background: #008E9B;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
}

.brand-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.gov-logo { 
  height: 60px; 
  width: auto; 
}
.itmd-logo { 
  height: 55px; 
  width: auto; 
  animation: logoPulse 4s infinite ease-in-out 1s;
}
.brand-divider { width: 1px; height: 45px; background: rgba(255, 255, 255, 0.2); }

.dept-name {
  font-family: 'Outfit', sans-serif;
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  transition: all 0.3s ease;
}

.dept-small {
  font-size: 0.85rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.dept-main {
  font-size: 1.55rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  background: linear-gradient(to right, #ffffff, #a5f3ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 8px rgba(0, 187, 240, 0.3));
}

.dept-name:hover .dept-main {
  filter: drop-shadow(0 0 15px rgba(0, 187, 240, 0.6));
}

@keyframes logoPulse {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,187,240,0)); }
  50% { transform: scale(1.1); filter: drop-shadow(0 0 15px rgba(0,187,240,0.8)); }
}

.nav-link {
  color: white !important;
  font-weight: 500;
  font-size: 0.8rem;
  text-transform: uppercase;
  padding: 8px 10px !important;
  letter-spacing: 0.5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
}

.nav-link:hover, .router-link-active { color: #008E9B !important;  }

.nav-link:hover {
  font-size: 0.85rem;
  transform: translateY(-4px) scale(1.1);
  text-shadow: 0 4px 15px rgba(0, 187, 240, 0.3);
}

/* Dropdown Styles */
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
  background: rgba(0, 187, 240, 0.1);
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
  .itmd-logo { height: 40px; }
  .primary-nav { padding: 8px 3%; }
  .brand-divider { height: 35px; }
  .translate-box { min-width: auto; }
}

/* Search Bar Styles */
.search-container-wrapper {
  display: flex;
  align-items: center;
}

.search-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 150px;
  transition: all 0.3s ease;
}

.search-input:focus {
  background: rgba(255, 255, 255, 0.2);
  border-color: #008E9B;
  color: white;
  box-shadow: 0 0 0 0.2rem rgba(0, 187, 240, 0.25);
  width: 180px;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  pointer-events: none;
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
</style>