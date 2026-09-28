<template>
  <div class="news-ticker-bar">
    <div class="ticker-label">
      <i class="fas fa-bullhorn"></i>
      <span>LATEST NEWS</span>
    </div>
    <div class="ticker-content">
      <div class="ticker-track">
        <div 
          v-for="(news, index) in newsList" 
          :key="news.id || index" 
          class="ticker-item"
          @click="navigateNews(news.newsLink)"
          :style="{ cursor: news.newsLink ? 'pointer' : 'default' }"
        >
          <div class="news-text">
            <span class="news-content" :class="{ 'has-link': news.newsLink }">{{ news.content }}</span>
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
  data() {
    return {
      newsList: [],
    };
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    fetchNews() {
      axios
        .get(`${BaseUrl.baseUrl}/api/public/latestnews`)
        .then((res) => {
          // this.newsList = res.data;

          // Hardcode link for specific news item
          this.newsList = res.data.map(news => {
            if (news.content && news.content.includes("Stand Together for Sri Lanka")) {
              return { ...news, newsLink: "/common" };
            }
            return news;
          });

          
        })
        .catch((err) => {
          console.error("Error fetching news:", err);
        });
    },
    navigateNews(link) {
      if (!link) return;
      
      // Check if it's an external link or internal route
      if (link.startsWith('http')) {
        window.open(link, '_blank');
      } else if (link.startsWith('/')) {
        // Use vue-router for internal links if router is available, 
        // fallback to window.location for regular navigation
        if (this.$router) {
          this.$router.push(link);
        } else {
          window.location.href = link;
        }
      } else {
        // Prepend protocol if missing for external links
        window.open(`https://${link}`, '_blank');
      }
    }
  },
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
  background: #00bbf0;
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
  box-shadow: 5px 0 15px rgba(0,0,0,0.2);
}

.ticker-label::after {
  content: '';
  position: absolute;
  right: -15px;
  top: 0;
  border-top: 45px solid #00bbf0;
  border-right: 15px solid transparent;
}

.ticker-content {
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
}

.ticker-track {
  display: flex;
  white-space: nowrap;
  animation: scroll-ticker 40s linear infinite;
  padding-left: 100%; /* Start news from the right side */
}

.ticker-track:hover {
  animation-play-state: paused;
}

.ticker-item {
  display: inline-flex;
  align-items: center;
  padding: 0 20px;
  transition: all 0.3s ease;
}

.ticker-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.news-text {
  color: #fff;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
}

.news-topic {
  font-weight: 700;
  color: #00bbf0;
  margin-right: 8px;
}

.news-content {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  transition: all 0.3s ease;
}

.news-content.has-link:hover {
  color: #00bbf0;
}

.news-separator {
  margin-left: 20px;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 300;
}

@keyframes scroll-ticker {
  0% { 
    transform: translateX(0); 
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
