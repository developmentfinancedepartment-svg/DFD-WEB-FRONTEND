import { createApp } from "vue/dist/vue.esm-bundler";
import { registerSW } from "virtual:pwa-register";

import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/style.css";
import VueAwesomePaginate from "vue-awesome-paginate";
import { FontAwesomeIcon } from "./plugins/font-awesome";
import navigation from "./components/framework/Header.vue";
import Footer from "./components/framework/Footer.vue";
import Services from "./components/framework/Services.vue";
import OurTeam from "./components/framework/OurTeam.vue";
import Network from "./components/framework/Network.vue";
import Development from "./components/framework/Development.vue";
import Newsline from "./components/framework/Newsline.vue";

import sitemap from "./components/framework/sitemap.vue";
import hardware from "./components/framework/hardware.vue";
import Test from "./components/framework/Test.vue";
import Disclaimer from "./components/framework/Disclaimer.vue";
import Events from "./components/framework/Events.vue";
import Documents from "./components/framework/Documents.vue";
import Systems from "./components/framework/Systems.vue";
import common from "./components/framework/common.vue";
import allsystems from "./components/framework/Allsystems.vue";
import Accessibility from "./components/framework/Accessibility.vue";


const app = createApp(App);
app.config.globalProperties.$env = import.meta.env;

if (import.meta.env.PROD) {
  // Disable Vue devtools in production
  app.config.devtools = false;
}

if (import.meta.env.PROD) {
  // Disable Vue devtools in production
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__ = undefined;
}

registerSW({
  immediate: true,
  onNeedRefresh() {
    if (confirm("New version available. Reload now?")) {
      window.location.reload();
    }
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  },
});

app
  .use(router)
  .use(store)
  .use(VueAwesomePaginate)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("navigation", navigation)
  .component("Footer", Footer)
  .component("Services", Services)
  .component("OurTeam", OurTeam)
  .component("Network", Network)
  .component("Development", Development)
  .component("Newsline", Newsline)

  .component("sitemap", sitemap)
  .component("hardware", hardware)
  .component("Test", Test)
  .component("Disclaimer", Disclaimer)
  .component("Events", Events)
  .component("Documents", Documents)
  .component("Systems", Systems)
  .component("common", common)
  .component("allsystems", allsystems)
  .component("Accessibility", Accessibility)
  .mount("#app");

