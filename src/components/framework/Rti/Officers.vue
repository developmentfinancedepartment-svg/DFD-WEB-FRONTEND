
<template>
  <div class="officers-page">
    <!-- Modern Header Section -->
    <section class="header-section">
      <div class="header-container">
        <h2 class="section-title">Your <span class="highlight">Officers</span></h2>
        <div class="title-underline"></div>
        <!-- <p class="section-subtitle">Right to Information Authority Officials</p> -->
      </div>
    </section>

    <!-- Officers Section -->
    <section class="officers-section">
      <div class="container-fluid">
        <div class="officers-container">
          <div class="row">
            <!-- Designated Officer Card -->
            <div class="col-lg-6 col-md-12 mb-4">
              <div class="officer-card">
                <div class="card-header">
                  <div class="card-icon">
                    <i class="fas fa-user-tie"></i>
                  </div>
                  <h3 class="card-title">Example Officer</h3>
                </div>
                <div class="card-content">
                  <div class="officer-detail">
                    <h4 class="officer-name">Mr.john Doe</h4>
                    <p class="officer-position">Example Position</p>
                  </div>
                  <div class="officer-contact">
                    <div class="contact-item">
                      <i class="fas fa-phone contact-icon"></i>
                      <span>1234567890</span>
                    </div>
                    <div class="contact-item">
                      <i class="fas fa-mobile-alt contact-icon"></i>
                      <span>1234567890</span>
                    </div>
                    <div class="contact-item">
                      <i class="fas fa-envelope contact-icon"></i>
                      <span>example.gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Information Officer Card -->
            <div class="col-lg-6 col-md-12 mb-4">
              <div class="officer-card">
                <div class="card-header">
                  <div class="card-icon">
                    <i class="fas fa-shield-alt"></i>
                  </div>
                  <h3 class="card-title">Example Officer</h3>
                </div>
                <div class="card-content">
                  <div class="officer-detail">
                    <h4 class="officer-name">Example Officer</h4>
                    <p class="officer-position">Example Position</p>
                  </div>
                  <div class="officer-contact">
                    <div class="contact-item">
                      <i class="fas fa-phone contact-icon"></i>
                      <span>1234567890</span>
                    </div>
                    <div class="contact-item">
                      <i class="fas fa-envelope contact-icon"></i>
                      <span>example.gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Documents Section -->
    <section class="documents-section">
      <div class="container-fluid">
        <div class="documents-container">
          <h2 class="section-title-secondary">Example Information <span class="highlight">Act</span></h2>
          <div class="title-underline-secondary"></div>

          <!-- RTI Documents Grid -->
          <div class="row">
            <!-- RTI Act Download Card -->
            <div class="col-lg-6 mb-4">
              <div class="download-card h-100 mb-0">
                <div class="download-content">
                  <div class="download-icon">
                    <i class="fas fa-file-pdf"></i>
                  </div>
                  <div>
                    <h3>Example Act</h3>
                    <p>Example Act Document</p>
                  </div>
                </div>
                <a href="" download target="_blank" class="download-btn">
                  <i class="fas fa-download"></i>
                  Download
                </a>
              </div>
            </div>

            <!-- Application Form Download Card -->
            <div class="col-lg-6 mb-4">
              <div class="download-card h-100 mb-0">
                <div class="download-content">
                  <div class="download-icon">
                    <i class="fas fa-file-alt"></i>
                  </div>
                  <div>
                    <h3>Example Form</h3>
                    <p>Example Application Form</p>
                  </div>
                </div>
                <a href="" download target="_blank" class="download-btn">
                  <i class="fas fa-download"></i>
                  Download
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
  name: 'OfficersPage',
  data() {
    return {}
  }
}
</script>

<style scoped>
.officers-page {
  font-family: 'Open Sans', sans-serif;
}

/* Page Container */
.officers-page {
  overflow-x: hidden;
  background: linear-gradient(135deg, #f8faff 0%, #f0f5ff 100%);
  min-height: 100vh;
  padding-top: 100px;
}

/* Header Section */
.header-section {
  /* background: linear-gradient(135deg, #032b5f 0%, #0a4a8f 100%); */
  padding: 70px 20px;
  padding-bottom: 0;
  text-align: center;
  color: white;
  animation: fadeInDown 0.6s ease-out;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #032b5f;
  letter-spacing: 1px;
  margin: 0 0 20px 0;
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
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  margin: 0;
}

/* Officers Section */
.officers-section {
  padding: 40px 20px;
}

.officers-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Officer Cards */
.officer-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(3, 43, 95, 0.08);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  border: 1px solid #e0e7f1;
  animation: fadeInUp 0.6s ease-out;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.officer-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(3, 43, 95, 0.12);
  border-color: #00bbf0;
}

.card-header {
  background: linear-gradient(135deg, #e8f0ff 0%, #f0f5ff 100%);
  padding: 35px 30px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  border-bottom: 2px solid #e0e7f1;
}

.card-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #00bbf0 0%, #0095cc 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.6rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #032b5f;
  margin: 0;
  line-height: 1.3;
}

.card-content {
  padding: 35px 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.officer-detail {
  display: flex;
  flex-direction: column;
}

.officer-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #032b5f;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.officer-position {
  font-size: 0.95rem;
  color: #6f7c8a;
  margin: 0;
  font-weight: 500;
}

.officer-contact {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  background: #f8fbff;
  border-radius: 10px;
  border-left: 4px solid #00bbf0;
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: #e8f0ff;
  transform: translateX(5px);
}

.contact-item i {
  color: #00bbf0;
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
}

.contact-icon {
  color: #00bbf0;
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-item span {
  font-size: 0.95rem;
  color: #495057;
  font-weight: 500;
  word-break: break-all;
}

/* Documents Section */
.documents-section {
  background: linear-gradient(135deg, #e8f0ff 0%, #f8faff 100%);
  padding: 80px 20px;
}

.documents-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title-secondary {
  font-size: 2rem;
  font-weight: 700;
  color: #032b5f;
  /* text-transform: uppercase; */
  letter-spacing: 1px;
  margin: 0 0 20px 0;
  text-align: center;
}

.title-underline-secondary {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #00bbf0, #0095cc);
  margin: 0 auto 50px;
  border-radius: 2px;
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
  margin-bottom: 30px;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  animation: fadeInUp 0.6s ease-out;
}

.download-card:last-child {
  margin-bottom: 0;
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
  border: none;
  cursor: pointer;
}

.download-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(3, 43, 95, 0.25);
  text-decoration: none;
  color: #fff;
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
  .section-title {
    font-size: 2rem;
  }

  .officers-section {
    padding: 60px 20px;
  }

  .documents-section {
    padding: 60px 20px;
  }

  .card-header {
    padding: 30px 25px;
  }

  .card-content {
    padding: 30px 25px;
  }

  .download-card {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 768px) {
  .header-section {
    padding: 50px 20px;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .officers-section {
    padding: 50px 15px;
  }

  .documents-section {
    padding: 50px 15px;
  }

  .download-card {
    padding: 25px;
    flex-direction: column;
    align-items: flex-start;
  }

  .download-content {
    gap: 15px;
  }

  .download-icon {
    width: 60px;
    height: 60px;
    font-size: 1.8rem;
  }

  .download-card h3 {
    font-size: 1.1rem;
  }

  .download-card p {
    font-size: 0.85rem;
  }

  .download-btn {
    width: 100%;
    justify-content: center;
  }


  .section-title-secondary {
    font-size: 1.6rem;
  }

  .card-header {
    padding: 25px 20px;
    gap: 15px;
  }

  .card-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }

  .card-title {
    font-size: 1.2rem;
  }

  .card-content {
    padding: 25px 20px;
    gap: 20px;
  }

  .officer-name {
    font-size: 1.1rem;
  }

  .officer-position {
    font-size: 0.9rem;
  }

  .contact-item {
    padding: 10px 12px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .header-section {
    padding: 40px 12px;
  }

  .section-title {
    font-size: 1.4rem;
  }

  .section-subtitle {
    font-size: 0.95rem;
  }

  .title-underline {
    width: 80px;
  }

  .officers-section {
    padding: 40px 12px;
  }

  .documents-section {
    padding: 40px 12px;
  }

  .section-title-secondary {
    font-size: 1.3rem;
  }

  .title-underline-secondary {
    width: 60px;
    margin: 0 auto 35px;
  }

  .card-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px 15px;
  }

  .card-title {
    font-size: 1rem;
  }

  .card-content {
    padding: 20px 15px;
  }

  .officer-name {
    font-size: 1rem;
  }

  .officer-position {
    font-size: 0.85rem;
  }

  .contact-item {
    flex-direction: column;
    text-align: center;
    padding: 10px;
    font-size: 0.85rem;
  }

  .contact-item i {
    width: auto;
  }

  .contact-icon {
    width: auto;
  }

  .document-card {
    padding: 20px;
    gap: 15px;
    flex-direction: column;
    text-align: center;
  }

  .document-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    margin: 0 auto;
  }

  .document-title {
    font-size: 1rem;
  }

  .document-subtitle {
    font-size: 0.85rem;
  }

  .download-arrow {
    opacity: 1;
  }

  .download-card {
    padding: 20px;
  }

  .download-content {
    flex-direction: column;
    text-align: center;
    gap: 15px;
    width: 100%;
  }

  .download-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    margin: 0 auto;
  }

  .download-card h3 {
    font-size: 1rem;
  }

  .download-card p {
    font-size: 0.8rem;
  }

  .download-btn {
    width: 100%;
    padding: 12px 20px;
    font-size: 0.9rem;
  }
}
</style>