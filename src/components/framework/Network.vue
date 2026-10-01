<template>
  <div class="network-page">
    <section class="network-section">
      <div class="container">

        <!-- Section Header -->
        <div class="section-header animate-fade-down">
          <h2 class="section-title">Your & <span class="highlight">Service</span></h2>
          <div class="title-underline"></div>
        </div>

        <!-- Content Card -->
        <div class="content-card animate-fade-up">
          <div class="image-col">
            <div class="img-wrapper">
              <img src="../../assets/service.png" alt="Network and Security" />
            </div>
          </div>

          <div class="text-col">
            <!-- <h3 class="service-name">Network &amp; Security</h3> -->
            <p class="service-text">
              your service text
            </p>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
.network-page {
  font-family: 'Open Sans', sans-serif;
  background: #f7fbff;
  color: #102741;
  overflow-x: hidden;
  padding-top: 105px;
}

.network-section {
  padding: 80px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 60px;
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

/* Content Card */
.content-card {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 60px;
  align-items: center;
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

/* Image Column */
.img-wrapper {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(2, 16, 47, 0.1);
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Text Column */
.service-name {
  font-size: 1.6rem;
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
  margin: 0;
}

/* Responsive */
@media (max-width: 991px) {
  .content-card {
    grid-template-columns: 1fr;
    gap: 36px;
    padding: 36px;
  }
}

@media (max-width: 768px) {
  .network-page {
    padding-top: 50px;
  }

  .network-section {
    padding: 50px 20px;
  }

  .section-title {
    font-size: 1.7rem;
  }

  .content-card {
    padding: 28px 22px;
  }

  .service-name {
    font-size: 1.35rem;
  }
}

@media (max-width: 480px) {
  .network-section {
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