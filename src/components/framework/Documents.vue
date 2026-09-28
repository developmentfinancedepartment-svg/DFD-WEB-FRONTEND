<template>
  <div class="documents-page">
    <section class="documents-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header animate-fade-down">
          <h2 class="section-title">Official <span class="highlight">Publications</span></h2>
          <div class="title-underline"></div>
        </div>

        <div class="documents-grid animate-fade-up">
          <!-- Action Plan 2025 -->
          <div class="doc-item">
            <div class="download-card h-100">
              <div class="download-content">
                <div class="download-icon">
                  <i class="fas fa-file-pdf"></i>
                </div>
                <div class="doc-info">
                  <h3>Action Plan 2025</h3>
                  <p>Comprehensive strategic development roadmap for the year 2025.</p>
                </div>
              </div>
              <a href="ap2025.pdf" download class="download-btn">
                <i class="fas fa-download"></i>
                Download
              </a>
            </div>
          </div>

          <!-- Quarterly Debt Bulletin -->
          <div class="doc-item">
            <div class="download-card h-100">
              <div class="download-content">
                <div class="download-icon">
                  <i class="fas fa-chart-line"></i>
                </div>
                <div class="doc-info">
                  <h3>Quarterly Debt Bulletin</h3>
                  <p>Official report on national debt statistics and financial status.</p>
                </div>
              </div>
              <a href="AP2021.pdf" download class="download-btn">
                <i class="fas fa-download"></i>
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Documents',
}
</script>

<style scoped>
.documents-page {
  font-family: 'Open Sans', 'Inter', sans-serif;
  background: linear-gradient(135deg, #f8faff 0%, #f0f5ff 50%, #e8eef5 100%);
  min-height: 100vh;
  padding-top: 105px;
  color: #102741;
}

.documents-section {
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
  color: #032b5f;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.highlight {
  color: #00bbf0;
}

.title-underline {
  width: 90px;
  height: 4px;
  background: linear-gradient(90deg, #00bbf0, #0095cc);
  margin: 0 auto;
  border-radius: 999px;
}

/* ── Documents Grid ── */
.documents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 30px;
}

.download-card {
  background: white;
  border: 1px solid rgba(3, 43, 95, 0.08);
  border-radius: 20px;
  padding: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  box-shadow: 0 15px 35px rgba(3, 43, 95, 0.05);
}

.download-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 60px rgba(3, 43, 95, 0.1);
  border-color: #00bbf0;
}

.download-content {
  display: flex;
  align-items: center;
  gap: 25px;
}

.download-icon {
  width: 65px;
  height: 65px;
  border-radius: 12px;
  background: linear-gradient(135deg, #00bbf0 0%, #0095cc 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  flex-shrink: 0;
}

.doc-info h3 {
  margin: 0 0 5px;
  font-size: 1.25rem;
  color: #032b5f;
  font-weight: 700;
}

.doc-info p {
  margin: 0;
  color: #4f647d;
  font-size: 0.9rem;
  line-height: 1.4;
}

.download-btn {
  background: linear-gradient(135deg, #032b5f 0%, #0055a4 100%);
  color: #fff;
  padding: 12px 25px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.download-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(3, 43, 95, 0.2);
  color: white;
}

/* ── Animations ── */
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

.animate-fade-down { animation: fadeInDown 0.6s ease-out; }
.animate-fade-up { animation: fadeInUp 0.6s ease-out backwards; }

/* ── Responsive ── */
@media (max-width: 991px) {
  .documents-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .section-title { font-size: 1.8rem; }
  .download-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 30px;
  }
  .download-btn { width: 100%; justify-content: center; }
}
</style>
