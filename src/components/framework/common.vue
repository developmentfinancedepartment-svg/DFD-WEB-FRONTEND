<template>
  <div class="common-page">
    <section class="common-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header animate-fade-down">
          <h2 class="section-title"> <span class="highlight"></span></h2>
          <!-- <div class="title-underline"></div> -->
        </div>

        <!-- Main Content Area -->
        <div class="content-panel animate-fade-up">
          <div class="media-wrapper">
             <div class="accent-border top-left"></div>
             <img src="../../assets/img/img1.jpeg" alt="Special Announcement" class="feature-image" />
             <div class="accent-border bottom-right"></div>
          </div>
          
          <div class="announcement-details">
            <h3 class="announcement-title">Let's Stand Together for Sri Lanka</h3>
            <div class="title-divider"></div>
            <p class="announcement-text">
              We are working diligently to support the nation's digital infrastructure. 
              Stay tuned for more updates on our initiatives and program outcomes here.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Common",
};
</script>

<style scoped>
.common-page {
  font-family: 'Open Sans', 'Inter', sans-serif;
  background: linear-gradient(135deg, #f8faff 0%, #f0f5ff 50%, #e8eef5 100%);
  min-height: 100vh;
  padding-top: 105px;
  color: #102741;
}

.common-section {
  padding: 80px 20px;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

/* ── Section Header ── */
.section-header {
  text-align: center;
  margin-bottom: 60px;
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

/* ── Content Panel ── */
.content-panel {
  background: white;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  padding: 50px;
  box-shadow: 0 25px 60px rgba(3, 43, 95, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.media-wrapper {
  position: relative;
  width: 100%;
  max-width: 900px;
}

.feature-image {
  width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
  display: block;
}

.accent-border {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 4px solid #00bbf0;
  z-index: -1;
  border-radius: 15px;
}

.top-left {
  top: -15px;
  left: -15px;
  border-right: none;
  border-bottom: none;
}

.bottom-right {
  bottom: -15px;
  right: -15px;
  border-left: none;
  border-top: none;
}

.announcement-details {
  text-align: center;
  max-width: 700px;
}

.announcement-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #032b5f;
  margin-bottom: 20px;
}

.title-divider {
  width: 50px;
  height: 3px;
  background: #00bbf0;
  margin: 0 auto 25px;
  border-radius: 999px;
}

.announcement-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4f647d;
  margin: 0;
}

/* ── Animations ── */
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

.animate-fade-down { animation: fadeInDown 0.6s ease-out; }
.animate-fade-up { animation: fadeInUp 0.6s ease-out backwards; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .common-section { padding: 40px 15px; }
  .section-title { font-size: 1.8rem; }
  .content-panel { padding: 30px 20px; border-radius: 20px; }
  .announcement-title { font-size: 1.3rem; }
  .announcement-text { font-size: 1rem; }
}
</style>