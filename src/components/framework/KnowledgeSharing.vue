<template>
  <div class="gallery-page">
    <section class="gallery-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header animate-fade-down">
          <h2 class="section-title">Your  <span class="highlight">services</span></h2>
          <div class="title-underline"></div>
          <div class="program-subtitle">
            <img src="" alt="your text" class="ff-logo" />
            <span>your text</span>
          </div>
        </div>

        <!-- Events Feed -->
        <div class="events-feed">
          <div v-for="(event, index) in filteredEvents" 
               :key="event.id" 
               class="event-block animate-fade-up"
               :style="{ 'animation-delay': (index * 0.1) + 's' }">
            
            <div class="event-info">
              <h5 class="event-title">{{ event.eventName }}</h5>
              <div class="title-divider"></div>
            </div>

            <div class="media-container" v-if="contentFiles[event.id]">
              <div class="image-grid">
                <div v-for="content in contentFiles[event.id]" 
                     :key="content.id" 
                     class="image-card"
                     @click="isImage(content.contentType) ? showModal(getcontentUrl(content.contentName)) : null">
                  
                  <div v-if="isImage(content.contentType)" class="img-content">
                    <img :src="getcontentUrl(content.contentName)"
                         :alt="content.contentName" 
                         loading="lazy" 
                         class="event-img" />
                    <div class="img-overlay">
                      <i class="fas fa-expand-alt"></i>
                    </div>
                  </div>

                  <div v-else-if="isVideo(content.contentType)" class="video-content">
                    <video controls class="event-video">
                      <source :src="getcontentUrl(content.contentName)" :type="content.contentType" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>

            <div class="view-more-container" v-if="event.moreContent">
              <a :href="event.moreContent" target="_blank" class="view-more-btn">
                <span>View Full Album</span>
                <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Resources Section -->
        <div class="resources-section animate-fade-up">
          <div class="section-header">
            <h2 class="section-title">Program <span class="highlight">Resources</span></h2>
            <div class="title-underline"></div>
          </div>

          <div class="resources-container">
            <div class="table-responsive custom-table-wrapper">
              <table class="table modern-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Topic / Event Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="date-cell">03.10.2025</td>
                    <td class="topic-cell">
your text                    </td>
                    <td>
                      <a href="" download target="_blank" class="download-link">
                        <i class="fas fa-file-pdf"></i>
                        <span>Presentation</span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </section>
    
    <!-- Modal -->
    <ImageModal :visible="isModalVisible" :imageUrl="selectedImage" @close="isModalVisible = false" />
  </div>
</template>

<script>
import axios from "axios";
import ImageModal from "./ImageModal.vue";
import BaseUrl from "../../services/baseURL";

export default {
  name: 'KnowledgeSharing',
  components: {
    ImageModal,
  },
  data() {
    return {
      events: [],
      contentFiles: {},
      isModalVisible: false,
      selectedImage: "",
    };
  },
  computed: {
    filteredEvents() {
      // Filter for active events only
      return this.events.filter((event) => event.status === 1);
    },
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get(
          `${BaseUrl.baseUrl}/api/public/event/get/all`
        );
        this.events = response.data;
        this.events.forEach((event) => {
          this.fetchContentByEventId(event.id);
        });
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    },
    async fetchContentByEventId(eventId) {
      try {
        const response = await axios.get(
          `${BaseUrl.baseUrl}/api/public/event/get/content/by/${eventId}`
        );
        this.contentFiles = {
          ...this.contentFiles,
          [eventId]: response.data,
        };
      } catch (error) {
        console.error(`Error fetching content for event ${eventId}:`, error);
      }
    },
    getcontentUrl(contentName) {
      return `${BaseUrl.baseUrl}/api/public/event/serve/content/${contentName}`;
    },
    isImage(contentType) {
      return contentType?.startsWith("image/");
    },
    isVideo(contentType) {
      return contentType?.startsWith("video/");
    },
    showModal(imageUrl) {
      this.selectedImage = imageUrl;
      this.isModalVisible = true;
    },
  },
};
</script>

<style scoped>
.gallery-page {
  font-family: 'Open Sans', 'Inter', sans-serif;
  background: linear-gradient(135deg, #f8faff 0%, #f0f5ff 50%, #e8eef5 100%);
  min-height: 100vh;
  padding-top: 130px;
  color: #102741;
}

.gallery-section {
  padding: 80px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Section Header ── */
.section-header {
  text-align: center;
  margin-bottom: 70px;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #008E9B;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.highlight {
  color: #008E9B;
}

.title-underline {
  width: 90px;
  height: 4px;
  background: linear-gradient(90deg, #008E9B, #00B4C5);
  margin: 0 auto 20px;
  border-radius: 999px;
  box-shadow: 0 3px 10px rgba(0, 142, 155, 0.2);
}

.program-subtitle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #4f647d;
}

.ff-logo {
  height: 45px;
  width: auto;
}

/* ── Event Blocks ── */
.events-feed {
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin-bottom: 100px;
}

.event-block {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 20px 50px rgba(3, 43, 95, 0.05);
  transition: all 0.3s ease;
}

.event-block:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-5px);
  box-shadow: 0 30px 60px rgba(3, 43, 95, 0.08);
}

.event-info {
  margin-bottom: 30px;
}

.event-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #008E9B;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

.title-divider {
  width: 50px;
  height: 3px;
  background: #008E9B;
  border-radius: 999px;
}

/* ── Media Grid ── */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 20px;
}

.image-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 220px;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.img-content, .video-content {
  width: 100%;
  height: 100%;
}

.event-img, .event-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(3, 43, 95, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
}

.img-overlay i {
  color: white;
  font-size: 1.5rem;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.image-card:hover .event-img {
  transform: scale(1.1);
}

.image-card:hover .img-overlay {
  opacity: 1;
}

.image-card:hover .img-overlay i {
  transform: translateY(0);
}

/* ── View More Button ── */
.view-more-container {
  margin-top: 35px;
}

.view-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #008E9B;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  padding: 10px 20px;
  border-radius: 12px;
  background: rgba(0, 142, 155, 0.05);
}

.view-more-btn:hover {
  background: rgba(0, 142, 155, 0.1);
  gap: 18px;
  color: #00B4C5;
}

/* ── Resources Section ── */
.resources-section {
  margin-top: 50px;
}

.custom-table-wrapper {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 15px 40px rgba(3, 43, 95, 0.06);
  border: 1px solid rgba(3, 43, 95, 0.05);
}

.modern-table {
  margin-bottom: 0;
}

.modern-table thead th {
  background: #f8faff;
  border: none;
  color: #008E9B;
  font-weight: 700;
  padding: 18px;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.modern-table tbody td {
  padding: 20px 18px;
  vertical-align: middle;
  border-top: 1px solid #f0f5ff;
}

.date-cell {
  font-weight: 700;
  color: #008E9B;
  white-space: nowrap;
}

.topic-cell {
  font-weight: 600;
  color: #008E9B;
  line-height: 1.5;
}

.download-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: white;
  background: linear-gradient(135deg, #008E9B 0%, #053d80 100%);
  padding: 8px 18px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(3, 43, 95, 0.2);
}

.download-link:hover {
  background: linear-gradient(135deg, #008E9B 0%, #00B4C5 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 142, 155, 0.3);
  color: white;
}

/* Animations */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-down { animation: fadeInDown 0.6s ease-out; }
.animate-fade-up { animation: fadeInUp 0.6s ease-out backwards; }

/* ── Responsive ── */
@media (max-width: 991px) {
  .event-block {
    padding: 35px;
  }
}

@media (max-width: 768px) {
  .gallery-section {
    padding: 50px 15px;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .event-title {
    font-size: 1.3rem;
  }

  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.5rem;
  }

  .event-block {
    padding: 25px 20px;
    border-radius: 16px;
  }

  .image-grid {
    grid-template-columns: 1fr;
  }

  .custom-table-wrapper {
    padding: 15px;
  }
}

</style>
