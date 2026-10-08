import { createWebHashHistory, createRouter } from "vue-router";
import Home from "./components/framework/Home.vue";
import pageNotFound from "./components/framework/pageNotFound.vue";
import navigation from "./components/framework/Header.vue";
import About from "./components/framework/About.vue";
import Footer from "./components/framework/Footer.vue";
import Services from "./components/framework/Services.vue";
import OurTeam from "./components/framework/OurTeam.vue";
import Network from "./components/framework/Network.vue";
import Development from "./components/framework/Development.vue";
import Actionplan from "./components/framework/Actionplan.vue";
import Preport from "./components/framework/Preport.vue";
import Inquiries from "./components/framework/Inquiries.vue";
import Teldirec from "./components/framework/Teldirec.vue";
import ServiceDetailView from "./views/ServiceDetailView.vue";
import Officers from "./components/framework/Rti/Officers.vue";
import Annualrep from "./components/framework/Rti/Annualrep.vue";
// import Events from "./components/framework/Events.vue";

import Test from "./components/framework/Test.vue";
import sitemap from "./components/framework/sitemap.vue";
import hardware from "./components/framework/hardware.vue";
import Disclaimer from "./components/framework/Disclaimer.vue";
import Events from "./components/framework/Events.vue";
import Calendar from "./components/framework/Calendar.vue";
import KnowledgeSharing from "./components/framework/KnowledgeSharing.vue";
import Documents from "./components/framework/Documents.vue";
import Systems from "./components/framework/Systems.vue";
import common from "./components/framework/common.vue";
import allsystems from "./components/framework/Allsystems.vue";




let user = JSON.parse(localStorage.getItem('profile'));

const routes = [
  {
    // path: "*",
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: pageNotFound,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/",
    name: "home",
    component: Home,
  },

  {
    path: "/navigation",
    name: "navigation",
    component: navigation,
  }
  ,
  {
    path: "/About",
    name: "About",
    component: About,
  },
  {
    path: "/Footer",
    name: "Footer",
    component: Footer,
  },
  {
    path: "/Services",
    name: "Services",
    component: Services,
  },
  {
    path: "/services/:id",
    name: "ServiceDetail",
    component: ServiceDetailView,
  },
  {
    path: "/OurTeam",
    name: "OurTeam",
    component:OurTeam,
  },
  {
    path: "/Network",
    name: "Network",
    component:Network,
  },
  {
    path: "/Development",
    name: "Development",
    component:Development,
  },
  {
    path: "/Actionplan",
    name: "Actionplan",
    component:Actionplan,
  },
  {
    path: "/Preport",
    name: "Preport",
    component:Preport,
  },
  {
    path: "/Inquiries",
    name: "Inquiries",
    component:Inquiries,
  },
  {
    path: "/Teldirec",
    name: "Teldirec",
    component:Teldirec,
  },
  {
    path: "/Officers",
    name: "Officers",
    component:Officers,
  },
  {
    path: "/Annualrep",
    name: "Annualrep",
    component:Annualrep,
  },
  // {
  //   path: "/Events",
  //   name: "Events",
  //   component:Events,
  // },

  {
    path: "/Test",
    name: "Test",
    component:Test,
  },
  {
    path: "/sitemap",
    name: "sitemap",
    component:sitemap,
  },
  {
    path: "/hardware",
    name: "hardware",
    component:hardware,
  },
  {
    path: "/Disclaimer",
    name: "Disclaimer",
    component:Disclaimer,
  },
   {
    path: "/Calendar",
    name: "Calendar",
    component:Calendar,
  },
   {
    path: "/KnowledgeSharing",
    name: "KnowledgeSharing",
    component:KnowledgeSharing,
  },
   {
    path: "/Events",
    name: "Events",
    component:Events,
  },
   {
    path: "/Documents",
    name: "Documents",
    component:Documents,
  },
  {
    path: "/Systems",
    name: "Systems",
    component:Systems,
  },
  {
    path: "/common",
    name: "common",
    component:common,
  },
   {
    path: "/allsystems",
    name: "allsystems",
    component:allsystems,
  }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      return { top: 0 };
    }
  },
});



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!user) {
      next({
        name: "login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
