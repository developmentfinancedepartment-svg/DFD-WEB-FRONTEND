import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import si from './locales/si.json';
import ta from './locales/ta.json';

const SUPPORTED_LOCALES = ['en', 'si', 'ta'];
const DEFAULT_LOCALE = 'en';

function getInitialLocale() {
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = localStorage.getItem('dfd_locale');
    if (saved && SUPPORTED_LOCALES.includes(saved)) {
      return saved;
    }
  }
  return DEFAULT_LOCALE;
}

const initialLocale = getInitialLocale();

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLocale;
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: initialLocale,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    en,
    si,
    ta
  }
});

export function setLocale(lang) {
  if (!SUPPORTED_LOCALES.includes(lang)) return;
  i18n.global.locale.value = lang;
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('dfd_locale', lang);
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
  }
}

export function getCurrentLocale() {
  return i18n.global.locale.value;
}

export { SUPPORTED_LOCALES };
export default i18n;
