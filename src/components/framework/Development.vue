<template>
  <div class="development-page">
    <section class="development-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header animate-fade-down">
          <h2 class="section-title">Section <span class="highlight">Title</span></h2>
          <div class="title-underline"></div>
        </div>

        <!-- Content Card -->
        <div class="content-card animate-fade-up">
          <!-- Image Column -->
          <div class="image-col">
            <div class="img-wrapper">
              <img src="../../assets/service.png" alt="Section Image" />
            </div>
          </div>

          <!-- Text Column -->
          <div class="text-col">
            <!-- <h3 class="service-name">Section Title</h3> -->
            <p class="service-text">
             your text
            </p>

            <!-- Systems Grid -->
            <div class="systems-section">
              <h4 class="sub-title">Developed Systems</h4>
              <div class="systems-grid">
                <a href="" target="_blank" class="system-link-card">
                  <div class="system-img">
                    <img src="../../assets/service.png" alt="" />
                  </div>
                  <div class="system-info">
                    <p>your text</p>
                  </div>
                </a>
                
                <a href="" target="_blank" class="system-link-card">
                  <div class="system-img">
                    <img src="../../assets/service.png" alt="" />
                  </div>
                  <div class="system-info">
                    <p>your text</p>
                  </div>
                </a>

                <a href="" target="_blank" class="system-link-card">
                  <div class="system-img">
                    <img src="../../assets/service.png" alt="PED MIS" />
                  </div>
                  <div class="system-info">
                    <p>your text</p>
                  </div>
                </a>

                <a href="https://systems.treasury.gov.lk/gflsms1/" target="_blank" class="system-link-card">
                  <div class="system-img">
                    <img src="../../assets/img/tod.png" alt="GFLSMS" />
                  </div>
                  <div class="system-info">
                    <p>Guarantee Fund Loan Settlement Monitoring System (GFLSMS)</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Development'
}
</script>

<style scoped>
.development-page {
  font-family: 'Open Sans', sans-serif;
  background: #f7fbff;
  color: #102741;
  overflow-x: hidden;
  padding-top: 130px;
}

.development-section {
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
  font-size: 2.2rem;
  font-weight: 800;
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
  background: white;
  border: 1px solid rgba(3, 43, 95, 0.08);
  border-radius: 24px;
  padding: 50px;
  box-shadow: 0 25px 60px rgba(2, 16, 47, 0.05);
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
.service-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #008E9B;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 14px;
}

.service-name::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #008E9B, #00B4C5);
  border-radius: 999px;
}

.service-text {
  color: #4f647d;
  font-size: 0.97rem;
  line-height: 1.85;
  text-align: justify;
  margin: 0 0 40px;
}

/* ── Systems Section ── */
.sub-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #008E9B;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(0, 142, 155, 0.2);
}

.systems-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.system-link-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid rgba(3, 43, 95, 0.1);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 25px rgba(2, 16, 47, 0.04);
}

.system-link-card:hover {
  transform: translateY(-8px);
  border-color: #008E9B;
  box-shadow: 0 20px 40px rgba(0, 142, 155, 0.12);
}

.system-img {
  height: 140px;
  overflow: hidden;
  background: #f0f7ff;
}

.system-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.system-link-card:hover .system-img img {
  transform: scale(1.05);
}

.system-info {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.system-info p {
  margin: 0;
  color: #008E9B;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
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

  .systems-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .development-page {
    padding-top: 50px;
  }

  .development-section {
    padding: 50px 20px;
  }

  .section-title {
    font-size: 1.7rem;
  }

  .content-card {
    padding: 28px 22px;
  }

  .service-name {
    font-size: 1.5rem;
  }
}

@media (max-width: 576px) {
  .systems-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .development-section {
    padding: 40px 15px;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .content-card {
    padding: 22px 16px;
    border-radius: 16px;
  }

  .service-text {
    font-size: 0.92rem;
  }
}
</style>
