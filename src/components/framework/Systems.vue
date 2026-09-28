<template>
  <div class="systems-page">
    <section class="systems-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header animate-fade-down">
          <h2 class="section-title">Our <span class="highlight">Systems</span></h2>
          <div class="title-underline"></div>
        </div>

        <!-- Systems Grid -->
        <div class="systems-grid animate-fade-up">
          
          <div class="system-card">
            <div class="card-wrapper">
              <div class="system-image">
                <a href="" target="_blank">
                  <img src="../../assets/lettr1.png" alt="Your System Name" />
                </a>
              </div>
              <div class="system-content">
                <h3>
                  <a href="" target="_blank">
                    Your System Name
                  </a>
                </h3>
                <p>
                  system description
                </p>
                <a href="" target="_blank" class="visit-btn">
                  Visit App <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="system-card">
            <div class="card-wrapper">
              <div class="system-image">
                <a href="" target="_blank">
                  <img src="../../assets/lettr1.png" alt="Your System Name" />
                </a>
              </div>
              <div class="system-content">
                <h3>
                  <a href="" target="_blank">
                    Your System Name
                  </a>
                </h3>
                <p>
                  system description
                </p>
                <a href="" target="_blank" class="visit-btn">
                  Visit App <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.systems-page {
  font-family: 'Open Sans', sans-serif;
  color: #102741;
  background: #f7fbff;
  overflow-x: hidden;
  padding-top: 100px;
}

/* Systems Section */
.systems-section {
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
  margin-bottom: 16px;
  font-weight: 700;
  color: #032b5f;
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

/* Systems Grid */
.systems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  margin-bottom: 30px;
}

.system-card {
  perspective: 1000px;
}

.card-wrapper {
  background: linear-gradient(135deg, #fff 0%, #f7fbff 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 2px solid rgba(3, 43, 95, 0.08);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(2, 16, 47, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #00bbf0, #0095cc);
  z-index: 1;
}

.system-card:hover .card-wrapper {
  transform: translateY(-10px);
  box-shadow: 0 35px 80px rgba(2, 16, 47, 0.12);
  background: linear-gradient(135deg, #fff 0%, #f0f8ff 100%);
  border-color: #00bbf0;
}

/* System Image */
.system-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: linear-gradient(135deg, #f0f5ff 0%, #e8f2ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.system-image img {
  width: auto;
  height: 90%;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.system-card:hover .system-image img {
  transform: scale(1.08);
}

.system-image a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* System Content */
.system-content {
  padding: 35px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.system-content h3 {
  margin-bottom: 15px;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.4;
}

.system-content h3 a {
  color: #032b5f;
  text-decoration: none;
  transition: color 0.3s ease;
}

.system-content h3 a:hover {
  color: #00bbf0;
}

.system-content p {
  color: #4f647d;
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 25px;
  flex-grow: 1;
}

.visit-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  background: linear-gradient(135deg, #00bbf0 0%, #0095cc 100%);
  color: #ffffff !important;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.85rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(0, 187, 240, 0.2);
  width: fit-content;
}

.visit-btn:hover {
  background: linear-gradient(135deg, #0095cc 0%, #00bbf0 100%);
  box-shadow: 0 15px 35px rgba(0, 187, 240, 0.3);
  transform: translateY(-3px);
  color: #ffffff !important;
}

.visit-btn:active {
  transform: translateY(-1px);
}

.visit-btn i {
  font-size: 0.75rem;
  transition: transform 0.3s ease;
}

.visit-btn:hover i {
  transform: translateX(3px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .systems-page {
    padding-top: 80px;
  }

  .systems-section {
    padding: 50px 20px;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 15px;
  }

  .systems-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .system-image {
    height: 200px;
  }

  .system-content {
    padding: 25px;
  }

  .system-content h3 {
    font-size: 1.1rem;
  }

  .system-content p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .systems-section {
    padding: 40px 15px;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .system-image {
    height: 180px;
  }

  .system-content {
    padding: 20px;
  }

  .system-content h3 {
    font-size: 1rem;
    margin-bottom: 12px;
  }

  .system-content p {
    font-size: 0.85rem;
    margin-bottom: 20px;
  }

  .visit-btn {
    padding: 10px 22px;
    font-size: 0.75rem;
  }
}
</style>
