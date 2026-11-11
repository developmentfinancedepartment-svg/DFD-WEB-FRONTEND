<template>
  <div class="search-view-page bg-slate-50 min-h-screen">
    <!-- Hero Header -->
    <header class="hero-header text-center px-4">
      <div class="container text-center">
        <h1 class="hero-title">Global Site Search</h1>
        <p class="hero-subtitle mb-4 leading-relaxed">
          Search across staff directory, concessionary loan schemes, publications, gallery, and official notices.
        </p>

        <!-- Search Input Box inside Hero -->
        <div class="search-hero-input-wrap max-w-2xl mx-auto relative">
          <svg class="search-input-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
          <input
            ref="searchInputRef"
            type="text"
            v-model="query"
            @input="updateUrlQuery"
            placeholder="Search by keywords, scheme, official, department, year..."
            class="search-hero-input"
            aria-label="Global search query"
          />
          <button
            v-if="query"
            type="button"
            class="clear-btn"
            @click="clearQuery"
            title="Clear search"
            aria-label="Clear query"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="container py-8 max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Category Filter Tabs -->
      <div class="category-tabs-wrapper mb-6 flex flex-wrap gap-2 items-center justify-between border-b border-slate-200 pb-4">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in availableCategories"
            :key="cat.key"
            type="button"
            class="cat-tab-btn"
            :class="{ 'active-cat-tab': activeCategory === cat.key }"
            @click="selectCategory(cat.key)"
          >
            <i :class="[cat.icon, 'mr-1.5 text-xs']"></i>
            <span>{{ cat.label }}</span>
            <span class="tab-badge ml-1.5">{{ counts[cat.key] || 0 }}</span>
          </button>
        </div>

        <div class="results-summary text-xs text-slate-500 font-semibold" v-if="query">
          Found <span class="text-[#008795] font-bold">{{ filteredResults.length }}</span> result{{ filteredResults.length === 1 ? '' : 's' }}
        </div>
      </div>

      <!-- No Query Initial State -->
      <div v-if="!query.trim()" class="initial-search-state text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
        <div class="w-16 h-16 rounded-2xl bg-teal-50 text-[#008795] flex items-center justify-center mx-auto mb-4 text-2xl">
          <i class="fas fa-search"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-800 mb-1">Enter a search keyword</h3>
        <p class="text-xs text-slate-500 max-w-md mx-auto mb-6">
          Find what you need across Department officials, concessionary credit lines, action plans, event photos, and public portals.
        </p>

        <!-- Quick Suggestions -->
        <div class="quick-tags flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
          <span class="text-xs font-semibold text-slate-400 py-1">Quick searches:</span>
          <button
            v-for="tag in quickSuggestions"
            :key="tag"
            type="button"
            @click="setQuery(tag)"
            class="quick-tag-pill"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- No Results State -->
      <div v-else-if="filteredResults.length === 0" class="empty-results-box text-center py-14 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
        <div class="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 text-2xl">
          <i class="fas fa-search-minus"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-800 mb-1">No matching results found</h3>
        <p class="text-xs text-slate-500 max-w-md mx-auto mb-6">
          We couldn't find any results matching <strong class="text-slate-700">"{{ query }}"</strong>. Try searching with different terms or check out common topics below.
        </p>

        <div class="quick-tags flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
          <span class="text-xs font-semibold text-slate-400 py-1">Suggested terms:</span>
          <button
            v-for="tag in quickSuggestions"
            :key="tag"
            type="button"
            @click="setQuery(tag)"
            class="quick-tag-pill"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- Grouped Results -->
      <div v-else class="space-y-8">
        <section
          v-for="group in groupedResults"
          :key="group.key"
          class="result-group-card bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs"
        >
          <!-- Category Header -->
          <div class="group-header flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-teal-50 text-[#008795] flex items-center justify-center text-sm">
                <i :class="group.icon"></i>
              </div>
              <div>
                <h2 class="text-sm font-bold text-slate-800 uppercase tracking-wider mb-0.5">
                  {{ group.label }}
                </h2>
                <span class="text-[11px] text-slate-400">
                  {{ group.items.length }} match{{ group.items.length === 1 ? '' : 'es' }} in this category
                </span>
              </div>
            </div>

            <button
              v-if="activeCategory === 'all'"
              type="button"
              class="text-xs text-[#008795] font-semibold hover:underline"
              @click="selectCategory(group.key)"
            >
              Filter this category only &rarr;
            </button>
          </div>

          <!-- Group Items Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <article
              v-for="item in group.items"
              :key="item.id"
              class="search-item-card p-4 rounded-2xl border border-slate-200/70 hover:border-[#008795] hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer bg-slate-50/40 hover:bg-white"
              @click="navigateItem(item)"
            >
              <div>
                <div class="flex items-start justify-between gap-2 mb-2">
                  <span class="item-tag-badge">{{ item.tag }}</span>
                  <span class="text-[11px] text-slate-400 font-medium" v-if="item.meta">{{ item.meta }}</span>
                </div>

                <h3 class="text-sm font-bold text-slate-900 group-hover:text-[#008795] transition-colors mb-1">
                  {{ item.title }}
                </h3>

                <p class="text-xs text-[#008795] font-medium mb-1.5" v-if="item.subtitle">
                  {{ item.subtitle }}
                </p>

                <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {{ item.description }}
                </p>
              </div>

              <div class="card-footer-action pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#008795]">
                <span>View Details</span>
                <i class="fas fa-arrow-right text-[11px] transition-transform group-hover:translate-x-1"></i>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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

const route = useRoute();
const router = useRouter();

const query = computed({
  get() {
    return navbarSearchState.query;
  },
  set(val) {
    setNavbarSearchQuery(val);
  }
});
const activeCategory = ref('all');
const searchInputRef = ref(null);

const quickSuggestions = [
  'MSME',
  'Director General',
  'Action Plan',
  'Dairy',
  'Food Security',
  'Working Capital',
  'Citizens Charter',
  'Field Visits',
  'Contact',
  'Hotline 1819'
];

const availableCategories = computed(() => Object.values(SEARCH_CATEGORIES));

// Search execution
const searchResults = computed(() => {
  if (!query.value.trim()) return [];
  return performGlobalSearch(query.value, 'all');
});

// Category counts
const counts = computed(() => {
  return getCategoryCounts(searchResults.value);
});

// Filtered by selected active category
const filteredResults = computed(() => {
  if (activeCategory.value === 'all') {
    return searchResults.value;
  }
  return searchResults.value.filter(item => item.category === activeCategory.value);
});

// Grouped for display
const groupedResults = computed(() => {
  return groupResultsByCategory(filteredResults.value);
});

const selectCategory = (catKey) => {
  activeCategory.value = catKey;
};

const setQuery = (newQuery) => {
  query.value = newQuery;
  updateUrlQuery();
};

const clearQuery = () => {
  clearNavbarSearch();
  activeCategory.value = 'all';
  updateUrlQuery();
  if (searchInputRef.value) {
    searchInputRef.value.focus();
  }
};

const updateUrlQuery = () => {
  const currentQuery = route.query.q || '';
  if (currentQuery !== query.value) {
    router.replace({
      path: '/search',
      query: query.value.trim() ? { q: query.value.trim() } : {}
    });
  }
};

const navigateItem = (item) => {
  if (item.fileUrl) {
    window.open(item.fileUrl, '_blank');
  } else if (item.path) {
    router.push(item.path);
  }
};

// Initialize query from URL parameter
onMounted(() => {
  if (route.query.q) {
    setNavbarSearchQuery(String(route.query.q));
  }
  if (searchInputRef.value && !route.query.q) {
    searchInputRef.value.focus();
  }
});

// Sync when URL query changes
watch(
  () => route.query.q,
  (newVal) => {
    if (newVal !== undefined && newVal !== query.value) {
      setNavbarSearchQuery(String(newVal || ''));
    }
  }
);
</script>

<style scoped>
.search-view-page {
  font-family: 'Open Sans', sans-serif;
  padding-top: 96px;
}

.hero-header {
  background: linear-gradient(135deg, #004d5a 0%, #008795 100%);
  padding: 3.5rem 1rem 3rem;
  border-bottom: 5px solid #00e5ff;
}

.hero-title {
  color: #ffffff;
  font-weight: 800;
  font-size: 2.2rem;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.search-hero-input-wrap {
  margin-top: 1.5rem;
}

.search-input-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #008795;
  pointer-events: none;
}

.search-hero-input {
  width: 100%;
  height: 52px;
  padding: 0 46px 0 52px;
  border-radius: 9999px;
  border: 2px solid rgba(255, 255, 255, 0.9);
  background: #ffffff;
  font-size: 0.95rem;
  color: #0f172a;
  outline: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.search-hero-input:focus {
  border-color: #00e5ff;
  box-shadow: 0 12px 30px rgba(0, 229, 255, 0.25);
}

.clear-btn {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 1rem;
  cursor: pointer;
  padding: 4px;
}

.clear-btn:hover {
  color: #0f172a;
}

.cat-tab-btn {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 9999px;
  padding: 6px 14px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #475569;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.cat-tab-btn:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.active-cat-tab {
  background: #008795 !important;
  color: #ffffff !important;
  border-color: #008795 !important;
  box-shadow: 0 4px 12px rgba(0, 135, 149, 0.25);
}

.tab-badge {
  background: rgba(0, 0, 0, 0.08);
  font-size: 0.7rem;
  padding: 2px 7px;
  border-radius: 9999px;
}

.active-cat-tab .tab-badge {
  background: rgba(255, 255, 255, 0.25);
  color: #ffffff;
}

.item-tag-badge {
  background: #f0f9fa;
  color: #008795;
  border: 1px solid rgba(0, 135, 149, 0.2);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.quick-tag-pill {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  color: #334155;
  font-size: 0.76rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.quick-tag-pill:hover {
  background: #008795;
  border-color: #008795;
  color: #ffffff;
}
</style>
