<template>
  <div class="disclaimer-page">
    <section class="disclaimer-section">
      <div class="container">
        
        <!-- Section Header -->
        <div class="section-header animate-fade-down">
          <h1 class="section-title">Website <span class="highlight">Disclaimer</span></h1>
          <div class="title-underline"></div>
        </div>

        <!-- Content Card -->
        <div class="content-card modern-shadow animate-fade-up">
          <div class="card-icon">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <div class="card-body">
            <p class="disclaimer-text">
              To make our content accessible to a wider audience, this website has been translated from English 
              using <strong>Google Translate</strong>. While we aim for accuracy, automated translations may 
              not always capture the full meaning or nuances of the original text.
            </p>
            <p class="disclaimer-text">
              Please note that these translations are provided <strong>"as-is,"</strong> 
              and the <strong>Department of Information Technology Management (ITMD)</strong> assumes no responsibility for any 
              misunderstandings or misinterpretations arising from these translations.
            </p>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Disclaimer"
};
</script>

<style scoped>
.disclaimer-page {
  font-family: 'Open Sans', sans-serif;
  background: #f7fbff;
  color: #102741;
  min-height: 80vh;
  padding-top: 105px;
  overflow-x: hidden;
}

.disclaimer-section {
  padding: 80px 20px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #032b5f;
  margin-bottom: 16px;
}

.highlight {
  color: #00bbf0;
}

.title-underline {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #00bbf0, #0095cc);
  margin: 0 auto;
  border-radius: 999px;
}

/* Content Card */
.content-card {
  background: white;
  border-radius: 24px;
  padding: 60px 50px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 187, 240, 0.1);
  box-shadow: 0 25px 60px rgba(2, 16, 47, 0.05);
}

.content-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, #00bbf0, #0095cc);
}

.card-icon {
  text-align: center;
  margin-bottom: 30px;
}

.card-icon i {
  font-size: 3.5rem;
  color: #00bbf0;
  opacity: 0.8;
}

.disclaimer-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4f647d;
  text-align: center;
  margin-bottom: 25px;
}

.disclaimer-text:last-child {
  margin-bottom: 0;
}

.disclaimer-text strong {
  color: #032b5f;
}

/* Responsive */
@media (max-width: 768px) {
  .disclaimer-page {
    padding-top: 50px;
  }

  .disclaimer-section {
    padding: 60px 15px;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .content-card {
    padding: 40px 25px;
    border-radius: 20px;
  }

  .card-icon i {
    font-size: 2.8rem;
  }

  .disclaimer-text {
    font-size: 1rem;
    text-align: justify;
  }
}
</style>