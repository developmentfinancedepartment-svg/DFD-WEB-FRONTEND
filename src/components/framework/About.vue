<template>
  <div class="about-page">

    <section class="about-section">
      <div class="container">
        <div class="section-header animate-fade-down">
          <h2 class="section-title">About <span class="highlight">Us</span> </h2>
          <div class="title-underline"></div>
        </div>

        <div class="content-grid animate-fade-up">
          <div class="content-card">
            <div class="card-icon">
              <i class="fas fa-eye"></i>
            </div>
            <h3>Vision</h3>
            <p>Your Vision.</p>
          </div>
          <div class="content-card">
            <div class="card-icon">
              <i class="fas fa-bullseye"></i>
            </div>
            <h3>Mission</h3>
            <p>Your Mission.</p>
          </div>
        </div>

        <div class="responsibility-section">
          <div class="responsibility-header">
            <div class="header-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h3>Core Responsibilities</h3>
          </div>
          <div class="responsibility-list">
            <div class="responsibility-item">
              <span class="item-number">01</span>
              <p>Your Responsibility.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">02</span>
              <p>Your Responsibility.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">03</span>
              <p>Your Responsibility.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">04</span>
              <p>Your Responsibility.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">05</span>
              <p>Your Responsibility.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">06</span>
              <p>Your Responsibility.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">07</span>
              <p>Your Responsibility.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">08</span>
              <p>Your Responsibility.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">09</span>
              <p>Your Responsibility.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">10</span>
              <p>Your Responsibility.</p>
            </div>
          </div>
        </div>

        <div class="documents-section">
          <div class="section-header-small">
            <h3 class="section-title-secondary">Example Official <span class="highlight">Documents</span></h3>
            <div class="title-underline-secondary"></div>
          </div>
          
          <div class="download-card">
            <div class="download-content">
              <div class="download-icon">
                <i class="fas fa-file-pdf"></i>
              </div>
              <div>
                <h3>Example Charter</h3>
                <p>Example Charter Document</p>
              </div>
            </div>
            <a href="" download class="download-btn">
              <i class="fas fa-download"></i>
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  font-family: ''Open Sans'', sans-serif;
  color: #102741;
  background: #f7fbff;
  overflow-x: hidden;
  padding-top: 100px;
}

/* About Section */
.about-section {
  padding: 80px 20px;
}

.services-section {
  padding: 80px 20px;
  background: #fff;
}

.management-section {
  padding: 80px 20px;
}

.container {
  max-width: 1140px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 16px;
  font-weight: 700;
}

.title-underline {
  width: 90px;
  height: 4px;
  background: linear-gradient(90deg, #00bbf0, #0095cc);
  margin: 0 auto;
  border-radius: 999px;
}

.highlight {
  color: #00bbf0;
}

/* Mission & Vision Cards */
.content-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.content-card {
  background: linear-gradient(135deg, #fff 0%, #f7fbff 100%);
  border: 2px solid rgba(3, 43, 95, 0.08);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(2, 16, 47, 0.06);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.content-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #00bbf0, #0095cc);
}

.content-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 80px rgba(2, 16, 47, 0.1);
  border-color: #00bbf0;
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background: linear-gradient(135deg, #00bbf0 0%, #0095cc 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  margin-bottom: 20px;
}

.content-card h3 {
  font-size: 1.5rem;
  margin-bottom: 16px;
  color: #032b5f;
}

.content-card p {
  line-height: 1.8;
  color: #4f647d;
  font-size: 0.95rem;
}

/* Responsibility Section */
.responsibility-section {
  background: linear-gradient(135deg, #fff 0%, #f7fbff 100%);
  border-radius: 25px;
  padding: 50px;
  box-shadow: 0 25px 70px rgba(2, 16, 47, 0.06);
  margin-bottom: 50px;
}

.responsibility-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 35px;
  padding-bottom: 25px;
  border-bottom: 2px solid rgba(3, 43, 95, 0.08);
}

.header-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #00bbf0 0%, #0095cc 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}

.responsibility-header h3 {
  font-size: 1.8rem;
  margin: 0;
  color: #032b5f;
}

.responsibility-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.responsibility-item {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 15px;
  border-left: 5px solid #00bbf0;
  transition: all 0.3s ease;
}

.responsibility-item:hover {
  transform: translateX(5px);
  box-shadow: 0 15px 40px rgba(0, 187, 240, 0.1);
}

.item-number {
  flex-shrink: 0;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00bbf0 0%, #0095cc 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.responsibility-item p {
  margin: 0;
  color: #4f647d;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Documents Section */
.documents-section {
  margin-top: 60px;
}

.section-header-small {
  text-align: center;
  margin-bottom: 40px;
}

.section-title-secondary {
  font-size: 1.8rem;
  font-weight: 700;
  color: #032b5f;
  margin-bottom: 15px;
}

.title-underline-secondary {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #00bbf0, #0095cc);
  margin: 0 auto;
  border-radius: 999px;
}

/* Download Card */
.download-card {
  background: linear-gradient(135deg, #eef6ff 0%, #e8f4ff 100%);
  border: 2px solid #00bbf0;
  border-radius: 20px;
  padding: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  max-width: 900px;
  margin: 0 auto;
}

.download-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 187, 240, 0.15);
  border-color: #0095cc;
}

.download-content {
  display: flex;
  align-items: center;
  gap: 25px;
}

.download-icon {
  width: 70px;
  height: 70px;
  border-radius: 15px;
  background: linear-gradient(135deg, #00bbf0 0%, #0095cc 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
}

.download-card h3 {
  margin: 0 0 8px;
  font-size: 1.3rem;
  color: #032b5f;
  font-weight: 700;
}

.download-card p {
  margin: 0;
  color: #4f647d;
  font-size: 0.9rem;
}

.download-btn {
  background: linear-gradient(135deg, #032b5f 0%, #0055a4 100%);
  color: #fff;
  padding: 14px 28px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-weight: 700;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.download-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(3, 43, 95, 0.25);
  color: #fff;
}



@media (max-width: 991px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .download-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .section-title {
    font-size: 2rem;
  }

  .responsibility-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .about-hero {
    padding: 40px 16px;
    min-height: 280px;
  }

  .about-section,
  .services-section,
  .management-section {
    padding: 60px 16px;
  }

  .profile-frame {
    width: 150px;
    height: 180px;
  }

  .responsibility-section {
    padding: 30px;
  }

  .download-card {
    padding: 25px;
  }

  .section-header {
    margin-bottom: 40px;
  }
}
</style>
