import { reactive } from 'vue';

/**
 * Shared Reactive State for Context-Aware Navbar Search
 * Binds Navbar Search Input with the active page's filtering state in real time.
 */
export const navbarSearchState = reactive({
  query: ''
});

/**
 * Sets the active search query
 * @param {string} val
 */
export const setNavbarSearchQuery = (val) => {
  navbarSearchState.query = typeof val === 'string' ? val : '';
};

/**
 * Clears the active search query
 */
export const clearNavbarSearch = () => {
  navbarSearchState.query = '';
};
