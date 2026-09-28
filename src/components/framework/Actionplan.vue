<template>
  <div class="actionplan-page">
    <!-- Action Plans Section -->
    <section class="plans-section">
      <div class="container">
        <div class="section-header animate-fade-down">
          <h2 class="section-title">Action <span class="highlight">Plans</span></h2>
          <div class="title-underline"></div>
          <!-- <p class="section-subtitle">Strategic initiatives and plans for organizational development</p> -->
        </div>

        <div class="plans-grid">
          <div class="plan-card animate-fade-up" v-for="action in filteredActionFiles" :key="action.id">
            <a
              :href="`${baseUrl}/api/public/actionpdf/${action.actionPdfName.split('/').pop()}`"
              :download="action.actionPdfName.split('/').pop()"
              @click="handleDownload"
              class="card-link"
            >
              <div class="card-image-wrapper">
                <img
                  :src="`${baseUrl}/api/public/actionimage/${action.actionImageName.split('/').pop()}`"
                  :alt="action.actionImageName"
                  class="plan-image"
                />
                <div class="image-overlay">
                  <i class="fas fa-arrow-up-right-from-square"></i>
                </div>
              </div>
              <div class="card-content">
                <h3 class="plan-title">
                  {{ action.actionPdfName.split("/").pop().slice(0, -4) }}
                </h3>
                <p class="plan-subtitle">View Document</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Performance Reports Section -->
    <section class="reports-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Performance <span class="highlight">Reports</span></h2>
          <div class="title-underline"></div>
          <!-- <p class="section-subtitle">Comprehensive reports showcasing our achievements and progress</p> -->
        </div>

        <div class="reports-grid">
          <div class="report-card" v-for="performance in filteredPerformanceFiles" :key="performance.id">
            <a
              :href="`${baseUrl}/api/public/performancepdf/${performance.performancePdfName.split('/').pop()}`"
              :download="performance.performancePdfName.split('/').pop()"
              @click="handleDownload"
              class="card-link"
            >
              <div class="card-image-wrapper">
                <img
                  :src="`${baseUrl}/api/public/performanceimage/${performance.performanceImageName.split('/').pop()}`"
                  :alt="performance.performanceImageName.split('/').pop()"
                  class="report-image"
                />
                <div class="image-overlay">
                  <i class="fas fa-arrow-up-right-from-square"></i>
                </div>
              </div>
              <div class="card-content">
                <h3 class="report-title">
                  {{ performance.performancePdfName.split("/").pop().slice(0, -4) }}
                </h3>
                <p class="report-subtitle">View Report</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import FileService from "../../services/FileService";
import BaseUrl from "../../services/baseURL";

export default {
  name: "Actionplan",
  data() {
    return {
      actionFile: [],
      performanceFile: [],
    };
  },
  computed: {
    baseUrl() {
      return BaseUrl.baseUrl;
    },
    filteredActionFiles() {
      return this.actionFile.filter(action => action.actionStatus === 1);
    },
    filteredPerformanceFiles() {
      return this.performanceFile.filter(performance => performance.performanceStatus === 1);
    }
  },
  mounted() {
    this.fetchActionFiles();
    this.fetchPerformanceFiles();
  },
  methods: {
    async fetchActionFiles() {
      try {
        const actionResponse = await FileService.getAllActionFiles();
        this.actionFile = actionResponse.data;
      } catch (error) {
        console.error("Error fetching action files:", error);
      }
    },
    async fetchPerformanceFiles() {
      try {
        const performanceResponse = await FileService.getAllPerformanceFile();
        this.performanceFile = performanceResponse.data;
      } catch (error) {
        console.error("Error fetching performance files:", error);
      }
    },
    handleDownload(event) {
      // Allow normal download behavior
      return true;
    },
  },
};
</script>

<style scoped>
.actionplan-page {
  overflow-x: hidden;
  background: linear-gradient(135deg, #f8faff 0%, #f0f5ff 100%);
  font-family: 'Open Sans', sans-serif;
  padding-top: 100px;
}

/* Common Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
}

/* Section Headers */
.section-header {
  text-align: center;
  margin-bottom: 80px;
  animation: fadeInDown 0.6s ease-out;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #032b5f;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.highlight {
  color: #00bbf0;
}

.title-underline {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #00bbf0, #0095cc);
  margin: 0 auto 20px;
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #4f647d;
  font-weight: 400;
  margin: 0;
}

/* Plans Section */
.plans-section {
  background: linear-gradient(135deg, #f8faff 0%, #f0f5ff 100%);
}

.reports-section {
  background: linear-gradient(135deg, #e8f0ff 0%, #f8faff 100%);
}

/* Grid Layouts */
.plans-grid,
.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
  margin-bottom: 20px;
  padding: 20px 0;
}

/* Plan Card */
.plan-card,
.report-card {
  animation: fadeInUp 0.6s ease-out;
}

.card-link {
  text-decoration: none;
  display: block;
  height: 100%;
  transition: all 0.3s ease;
}

.plan-card .card-link:hover,
.report-card .card-link:hover {
  transform: translateY(-20px);
  filter: drop-shadow(0 30px 50px rgba(3, 43, 95, 0.15));
}

/* Image Wrapper */
.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 220px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  background: #e8eef5;
  border: 2px solid #d0dce8;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
}

.plan-image,
.report-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  padding: 8px;
  transition: transform 0.4s ease;
  background: white;
}

.card-link:hover .plan-image,
.card-link:hover .report-image {
  transform: scale(1.02);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(3, 43, 95, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
}

.image-overlay i {
  color: white;
  font-size: 2.5rem;
  transform: scale(0.8);
  transition: transform 0.3s ease;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.card-link:hover .image-overlay {
  opacity: 1;
}

.card-link:hover .image-overlay i {
  transform: scale(1);
}

/* Card Content */
.card-content {
  background: white;
  padding: 15px 14px;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 10px 40px rgba(3, 43, 95, 0.08);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.plan-card .card-link:hover .card-content,
.report-card .card-link:hover .card-content {
  box-shadow: 0 20px 60px rgba(3, 43, 95, 0.15);
  background: linear-gradient(135deg, #fff 0%, #f7fbff 100%);
}

.plan-title,
.report-title {
  font-size: 1rem;
  font-weight: 700;
  color: #032b5f;
  margin-bottom: 8px;
  line-height: 1.3;
  text-align: center;
  word-break: break-word;
  transition: color 0.3s ease;
}

.plan-card .card-link:hover .plan-title,
.report-card .card-link:hover .report-title {
  color: #00bbf0;
}

.plan-subtitle,
.report-subtitle {
  color: #00bbf0;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin: 0;
  transition: color 0.3s ease;
}

.plan-card .card-link:hover .plan-subtitle,
.report-card .card-link:hover .report-subtitle {
  color: #0095cc;
}

/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .plans-grid,
  .reports-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
  }

  .section-title {
    font-size: 2rem;
  }

  .card-image-wrapper {
    height: 200px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 60px 15px;
  }

  .section-header {
    margin-bottom: 50px;
  }

  .plans-grid,
  .reports-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 25px;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .card-image-wrapper {
    height: 180px;
  }

  .card-content {
    padding: 12px 10px;
  }

  .plan-title,
  .report-title {
    font-size: 0.9rem;
    margin-bottom: 5px;
  }

  .plan-subtitle,
  .report-subtitle {
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .actionplan-page {
    padding-top: 80px;
  }

  .container {
    padding: 40px 10px;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-subtitle {
    font-size: 0.95rem;
  }

  .title-underline {
    width: 60px;
  }

  .plans-grid,
  .reports-grid {
    gap: 15px;
  }

  .card-image-wrapper {
    height: 160px;
  }

  .card-content {
    padding: 10px 8px;
  }

  .plan-title,
  .report-title {
    font-size: 0.85rem;
    margin-bottom: 4px;
  }

  .plan-subtitle,
  .report-subtitle {
    font-size: 0.65rem;
  }
}
</style>

