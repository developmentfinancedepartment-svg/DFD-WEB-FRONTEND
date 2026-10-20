<template>
  <div class="news-ticker-bar">
    <div class="ticker-label">
      <i class="fas fa-bullhorn"></i>
      <span>LATEST NEWS</span>
    </div>
    <div class="ticker-content">
      <div class="ticker-track">
        <div 
          v-for="(news, index) in displayNews" 
          :key="news.id || index" 
          class="ticker-item"
          @click="navigateNews(news.linkUrl || news.newsLink)"
          :style="{ cursor: (news.linkUrl || news.newsLink) ? 'pointer' : 'default' }"
        >
          <div class="news-text">
            <span class="news-content" :class="{ 'has-link': news.linkUrl || news.newsLink }">
              {{ news.title || news.content }}
            </span>
          </div>
          <span class="news-separator">|</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BaseUrl from "../../services/baseURL";

export default {
  name: "NewsTicker",
  data() {
    return {
      newsList: [],
      fallbackNews: [
        {
          id: 'fb-1',
          title: "Department of Development Finance • Fostering National Economic Growth and SME Competitiveness",
          linkUrl: "/about"
        },
        {
          id: 'fb-2',
          title: "New Concessional Credit Facilities Available for MSME Revitalization and Green Energy Transition",
          linkUrl: "/services"
        }
      ]
    };
  },
  computed: {
    displayNews() {
      return this.newsList.length > 0 ? this.newsList : this.fallbackNews;
    }
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    fetchNews() {
      const endpoint = BaseUrl && BaseUrl.baseUrl 
        ? `${BaseUrl.baseUrl}/api/news/public` 
        : `/api/news/public`;
      axios
        .get(endpoint)
        .then((res) => {
          if (Array.isArray(res.data) && res.data.length > 0) {
            this.newsList = res.data;
          }
        })
        .catch((err) => {
          console.error("Error fetching news from /api/news/public:", err);
        });
    },
    navigateNews(link) {
      if (!link) return;
      if (link.startsWith("http://") || link.startsWith("https://")) {
        window.open(link, "_blank", "noopener,noreferrer");
      } else if (link.startsWith("/")) {
        if (this.$router) {
          this.$router.push(link);
        } else {
          window.location.href = link;
        }
      } else {
        window.open(`https://${link}`, "_blank", "noopener,noreferrer");
      }
    }
  }
};
</script>

<style scoped>
.news-ticker-bar {
  display: flex;
  background: rgba(3, 43, 95, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  height: 45px;
  align-items: center;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.2);
}

.ticker-label {
  background: #008E9B;
  color: #fff;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 1px;
  white-space: nowrap;
  position: relative;
  z-index: 2;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.2);
}

.ticker-label::after {
  content: '';
  position: absolute;
  right: -15px;
  top: 0;
  border-top: 45px solid #008E9B;
  border-right: 15px solid transparent;
}

.ticker-content {
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.ticker-track {
  display: inline-flex;
  white-space: nowrap;
  animation: scroll-ticker 35s linear infinite;
  will-change: transform;
}

/* Pause scrolling when hovering with the mouse */
.ticker-track:hover,
.news-ticker-bar:hover .ticker-track {
  animation-play-state: paused;
}

.ticker-item {
  display: inline-flex;
  align-items: center;
  padding: 0 20px;
  transition: all 0.3s ease;
}

.ticker-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.news-text {
  color: #fff;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
}

.news-content {
  color: rgba(255, 255, 255, 0.95);
  font-weight: 400;
  transition: all 0.3s ease;
}

.news-content.has-link:hover {
  color: #00e5ff;
  text-decoration: underline;
}

.news-separator {
  margin-left: 20px;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 300;
}

/* Keyframe animation: translateX(100%) to translateX(-100%) */
@keyframes scroll-ticker {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@media (max-width: 768px) {
  .ticker-label span {
    display: none;
  }
  .ticker-label {
    padding: 0 15px;
  }
}
</style>
