<template>
  <div class="hardware-page">
    <section class="hardware-section">
      <div class="container">

        <!-- Section Header -->
        <div class="section-header animate-fade-down">
          <h2 class="section-title">Your <span class="highlight">Service</span></h2>
          <div class="title-underline"></div>
        </div>

        <!-- Content Card -->
        <div class="content-card animate-fade-up">

          <!-- Image Column -->
          <div class="image-col">
            <div class="img-wrapper">
              <img src="../../assets/service.png" alt="Hardware Troubleshooting" />
            </div>
          </div>

          <!-- Text Column -->
          <div class="text-col">

            <!-- Description -->
            <p class="service-text">
              your Service Description
            </p>

            <!-- Specifications -->
            <div class="spec-section">
              <h3 class="sub-title">Specifications</h3>

              <ul class="spec-tabs">
                <li
                  v-for="specification in filteredSpecifications"
                  :key="specification.id"
                >
                  <a
                    @click.prevent="setActiveTab(specification.id)"
                    :class="{ active: String(activeSpecId) === String(specification.id) }"
                  >
                    {{ specification.specificationType }}
                  </a>
                </li>
              </ul>

              <div class="tab-content" v-if="activeSpec">
                <!-- <h3 class="spec-type-title">{{ activeSpec.specificationType }}</h3> -->
                <div class="docs-grid">
                  <div
                    v-for="doc in filteredSpecificationDocs"
                    :key="doc.id"
                    class="doc-item"
                  >
                    <a
                      :href="`${baseURL}/api/public/hardware/specification/doc/by/${doc.id}`"
                      target="_blank"
                      class="doc-card-link"
                    >
                      <div class="doc-icon-wrapper">
                        <i class="fa-regular fa-file-pdf pdf-icon"></i>
                        <div class="doc-overlay">
                          <div class="view-btn-advanced">
                            <i class="fas fa-eye"></i>
                          </div>
                        </div>
                      </div>
                      <div class="doc-info">
                        <!-- <span class="doc-name">{{ doc.docName ? String(doc.docName).split('/').pop().replace(/\.[^/.]+$/, "") : 'Document' }}</span> -->
                        <span class="doc-action">View Document</span>
                      </div>
                    </a>
                  </div>
                  <div v-if="filteredSpecificationDocs.length === 0" class="no-docs">
                    <p>No documents available for this specification.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Help Desk -->
            

          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import BaseUrl from "../../services/baseURL";
import axios from "axios";

export default {
  setup() {
    const hardwareSpecification = ref([]);
    const specificationDocs = ref([]);
    const activeSpecId = ref(null);
    const baseURL = BaseUrl.baseUrl;

    const getAllSpecifications = async () => {
      try {
        const specificationResponse = await axios.get(
          `${baseURL}/api/public/hardware/specifications`
        );
        hardwareSpecification.value = specificationResponse.data;
        if (filteredSpecifications.value.length > 0 && !activeSpecId.value) {
          setActiveTab(filteredSpecifications.value[0].id);
        }
      } catch (error) {
        console.error("Error fetching specifications:", error);
      }
    };

    const getAllDocsBySpecId = async (specId) => {
      try {
        const specificationResponse = await axios.get(
          `${baseURL}/api/public/hardware/specification/docs/by/${specId}`
        );
        specificationDocs.value = specificationResponse.data;
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    const setActiveTab = (specId) => {
      activeSpecId.value = specId;
      getAllDocsBySpecId(specId);
    };

    const filteredSpecifications = computed(() => {
      return hardwareSpecification.value.filter(
        (specification) => specification.status === 1
      );
    });

    const filteredSpecificationDocs = computed(() => {
      return specificationDocs.value.filter((docs) => Number(docs.docStatus) === 1);
    });

    const activeSpec = computed(() => {
      return hardwareSpecification.value.find(
        (s) => String(s.id) === String(activeSpecId.value)
      );
    });

    onMounted(getAllSpecifications);

    return {
      hardwareSpecification,
      specificationDocs,
      activeSpecId,
      setActiveTab,
      baseURL,
      filteredSpecifications,
      filteredSpecificationDocs,
      activeSpec,
    };
  },
};
</script>

<style scoped>
.hardware-page {
  font-family: 'Open Sans', sans-serif;
  background: #f7fbff;
  color: #102741;
  overflow-x: hidden;
  padding-top: 130px;
}

.hardware-section {
  padding: 80px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Section Header ── */
.section-header {
  text-align: center;
  margin: 10px 0 24px 0;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #008E9B;
  margin-bottom: 16px;
}

.highlight {
  color: #008E9B;
}

.title-underline {
  width: 90px;
  height: 4px;
  background: linear-gradient(90deg, #008E9B, #00B4C5);
  margin: 0 auto;
  border-radius: 999px;
}

/* ── Content Card ── */
.content-card {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
  align-items: start;
  background: linear-gradient(135deg, #fff 0%, #f7fbff 100%);
  border: 2px solid rgba(3, 43, 95, 0.08);
  border-radius: 24px;
  padding: 50px;
  box-shadow: 0 25px 60px rgba(2, 16, 47, 0.08);
  position: relative;
  overflow: hidden;
}

.content-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #008E9B, #00B4C5);
}

/* ── Image Column ── */
.img-wrapper {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(2, 16, 47, 0.1);
  position: sticky;
  top: 120px;
}

.img-wrapper img {
  width: 100%;
  display: block;
  object-fit: cover;
}

/* ── Text Column ── */
.service-text {
  color: #4f647d;
  font-size: 0.97rem;
  line-height: 1.85;
  text-align: justify;
  margin: 0 0 28px;
}

/* ── Specifications ── */
.spec-section {
  margin-bottom: 32px;
}

.sub-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #008E9B;
  margin-bottom: 18px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(0, 142, 155, 0.2);
}

.spec-tabs {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.spec-tabs li {
  margin: 0;
}

.spec-tabs a {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 50px;
  border: 2px solid rgba(0, 142, 155, 0.3);
  color: #008E9B;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  background: #fff;
  text-decoration: none;
}

.spec-tabs a:hover,
.spec-tabs a.active {
  background: linear-gradient(135deg, #008E9B, #00B4C5);
  color: #fff;
  border-color: #008E9B;
  box-shadow: 0 6px 18px rgba(0, 142, 155, 0.3);
}

.spec-type-title {
  font-size: 1rem;
  font-weight: 700;
  color: #008E9B;
  margin-bottom: 16px;
}

/* ── Docs Grid ── */
.docs-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 8px;
}

.doc-item {
  padding: 0;
  min-width: 160px;
  background: none;
  border: none;
  box-shadow: none;
}

.doc-card-link {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: 2px solid rgba(3, 43, 95, 0.08);
  border-radius: 20px;
  padding: 24px 20px;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  box-shadow: 0 10px 30px rgba(2, 16, 47, 0.05);
  width: 100%;
}

.doc-card-link:hover {
  transform: translateY(-8px);
  border-color: #008E9B;
  box-shadow: 0 20px 45px rgba(0, 142, 155, 0.12);
}

.doc-icon-wrapper {
  position: relative;
  width: 70px;
  height: 70px;
  background: #f8faff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  overflow: hidden;
}

.pdf-icon {
  font-size: 2.2rem;
  color: #e53e3e;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.doc-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(3, 43, 95, 0.7);
  backdrop-filter: blur(4px);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.view-btn-advanced {
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transform: scale(0.4) translateY(10px);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.view-btn-advanced i {
  color: #008E9B;
  font-size: 1.1rem;
}

.doc-card-link:hover .doc-overlay {
  opacity: 1;
}

.doc-card-link:hover .view-btn-advanced {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.doc-card-link:hover .pdf-icon {
  transform: scale(0.85);
}

.doc-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.doc-name {
  font-size: 0.88rem;
  color: #008E9B;
  font-weight: 700;
  line-height: 1.4;
  word-break: break-word;
}

.doc-action {
  font-size: 0.75rem;
  color: #008E9B;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.doc-card-link:hover .doc-name {
  color: #008E9B;
}

/* ── Help Desk Card ── */
.helpdesk-card {
  display: flex;
  align-items: center;
  gap: 24px;
  background: linear-gradient(135deg, #008E9B 0%, #053d80 100%);
  border-radius: 18px;
  padding: 30px 32px;
  box-shadow: 0 16px 40px rgba(3, 43, 95, 0.2);
  margin-top: 8px;
}

.helpdesk-text {
  flex: 1;
}

.helpdesk-card .sub-title {
  color: #fff;
  border-bottom-color: rgba(0, 142, 155, 0.3);
  margin-bottom: 12px;
}

.helpdesk-card .service-text {
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
}

.helpdesk-phone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.phone-icon {
  font-size: 2.8rem;
  color: #008E9B;
}

.phone-number {
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: 1px;
}

/* ── Responsive ── */
@media (max-width: 991px) {
  .content-card {
    grid-template-columns: 1fr;
    gap: 36px;
    padding: 36px;
  }

  .img-wrapper {
    position: static;
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .hardware-page { padding-top: 50px; }

  .hardware-section { padding: 50px 20px; }

  .section-title { font-size: 1.7rem; }

  .content-card { padding: 28px 22px; }

  .helpdesk-card {
    flex-direction: column;
    text-align: center;
    padding: 24px 20px;
  }
}

@media (max-width: 480px) {
  .hardware-section { padding: 40px 15px; }

  .section-title { font-size: 1.5rem; }

  .content-card {
    padding: 22px 16px;
    border-radius: 16px;
  }

  .service-text { font-size: 0.92rem; }

  .docs-grid { gap: 12px; }
}
</style>
