<template>
  <div class="ourteam-page">
    <section class="team-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header animate-fade-down">
          <h2 class="section-title">Top <span class="highlight">Management</span></h2>
          <div class="title-underline"></div>
        </div>

        <!-- Management Grid -->
        <div class="management-grid animate-fade-up">

          <div class="management-card">
            <div class="profile-frame">
              <img src="../../assets/profile.png" alt="Your Name" class="profile-img" />
              <div class="profile-overlay">
                <div class="social-links">
                  <span>Your Position</span>
                </div>
              </div>
            </div>
            <div class="member-info">
              <h5>Your Name</h5>
              <p>Your Position</p>
            </div>
          </div>

          <div class="management-card">
            <div class="profile-frame">
              <img src="../../assets/profile.png" alt="Your Name" class="profile-img" />
              <div class="profile-overlay">
                <div class="social-links">
                  <a href="#" target="_blank">
                    <i class="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="https://www.linkedin.com/" target="_blank">
                    <i class="fa-brands fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="member-info">
              <h5>Your Name</h5>
              <p>Your Position</p>
            </div>
          </div>
        </div>

        <!-- Team Image Section -->
        <div class="team-image-section animate-fade-up">
          <img src="../../assets/team_image.png" alt="Our Team" class="team-image" />
        </div>

        <!-- CTA -->
        <div class="cta-container">
          <router-link to="/Teldirec#contactteam" class="outline-btn">Our Team</router-link>
        </div>
      </div>
    </section>
  </div>
</template>


<style scoped>
.ourteam-page {
  font-family: 'Open Sans', sans-serif;
  color: #102741;
  background: #f7fbff;
  overflow-x: hidden;
  padding-top: 130px;
}

.team-section {
  padding: 80px 20px;
}

.container {
  max-width: 1140px;
  margin: 0 auto;
}

/* Section Header */
.section-header {
  text-align: center;
  margin: 10px 0 24px 0;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 16px;
  font-weight: 700;
  color: #008E9B;
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

/* Management Grid */
.management-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin-bottom: 50px;
  max-width: 800px;
  margin: 0 auto 50px;
}

.management-card {
  text-align: center;
}

.profile-frame {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 25px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #fff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(3, 43, 95, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-frame:hover .profile-overlay {
  opacity: 1;
}

.social-links {
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
}

.social-links a {
  color: white;
  font-size: 1.2rem;
  transition: color 0.3s;
}

.social-links a:hover {
  color: #008E9B;
}

.social-links span {
  color: #008E9B;
  font-weight: 700;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.member-info h5 {
  color: #008E9B;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.member-info p {
  color: #666;
  font-size: 0.9rem;
}

/* Team Image Section */
.team-image-section {
  width: 100%;
  max-width: 800px;
  margin: 60px auto 40px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
}

.team-image {
  width: 100%;
  height: auto;
  display: block;
}

/* CTA Container */
.cta-container {
  text-align: center;
}

.outline-btn {
  display: inline-block;
  padding: 12px 30px;
  border: 2px solid #008E9B;
  color: #008E9B;
  font-weight: 700;
  border-radius: 50px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.outline-btn:hover {
  background: #008E9B;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .ourteam-page {
    padding-top: 90px;
  }

  .team-section {
    padding: 50px 20px;
  }

  .section-title {
    font-size: 2rem;
  }

  .management-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .profile-frame {
    width: 180px;
    height: 180px;
  }

  .member-info h5 {
    font-size: 1rem;
  }

  .member-info p {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .team-section {
    padding: 40px 15px;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .management-grid {
    gap: 25px;
  }

  .profile-frame {
    width: 150px;
    height: 150px;
    margin-bottom: 15px;
  }

  .member-info h5 {
    font-size: 0.95rem;
  }

  .member-info p {
    font-size: 0.8rem;
  }

  .outline-btn {
    padding: 10px 25px;
    font-size: 0.9rem;
  }
}
</style>
