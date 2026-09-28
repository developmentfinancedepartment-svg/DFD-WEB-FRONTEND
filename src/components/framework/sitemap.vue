<template>
  <div class="sitemap-page">
    <section class="sitemap-container">
      <div class="container">
        
        <!-- Standard Header -->
        <div class="section-header animate-fade-down">
          <h1 class="section-title">Website <span class="highlight">Sitemap</span></h1>
          <div class="title-underline"></div>
        </div>

        <!-- Sitemap Directory -->
        <div class="sitemap-directory animate-fade-up">
          <div class="row g-5">
            
            <!-- Category 1: About & People -->
            <div class="col-lg-4 col-md-6">
              <div class="sitemap-block">
                <h4 class="block-header"><i class="fas fa-university me-2"></i> About ITMD</h4>
                <ul class="sitemap-ul">
                  <li><router-link to="/">Home Page</router-link></li>
                  <li><router-link to="/About">About the Department</router-link></li>
                  <li><router-link to="/OurTeam">Management Team</router-link></li>
                </ul>
              </div>
            </div>

            <!-- Category 2: Services & Solutions -->
            <div class="col-lg-4 col-md-6">
              <div class="sitemap-block">
                <h4 class="block-header"><i class="fas fa-microchip me-2"></i> Services & IT</h4>
                <ul class="sitemap-ul">
                  <li>
                    <router-link to="/Services">All Services</router-link>
                    <ul class="nested-ul">
                      <li><router-link to="/Development">Software Development</router-link></li>
                      <li><router-link to="/hardware">Hardware Troubleshooting</router-link></li>
                      <li><router-link to="/Network">Network & Security</router-link></li>
                    </ul>
                  </li>
                  <li><router-link to="/Systems">Managed Systems</router-link></li>
                </ul>
              </div>
            </div>

            <!-- Category 3: Information & Contact -->
            <div class="col-lg-4 col-md-6">
              <div class="sitemap-block">
                <h4 class="block-header"><i class="fas fa-info-circle me-2"></i> Resources & Support</h4>
                <ul class="sitemap-ul">
                  <li><router-link to="/Actionplan">Action Plan & Publications</router-link></li>
                  <li><router-link to="/Events">Latest Events</router-link></li>
                  <li><router-link to="/Officers">RTI Information</router-link></li>
                  <li><router-link to="/Disclaimer">Website Disclaimer</router-link></li>
                  <li>
                    <router-link to="/Teldirec">Contact Directory</router-link>
                    <ul class="nested-ul">
                      <li><router-link to="/Teldirec#inqui">Submit Inquiries</router-link></li>
                      <li><router-link to="/Teldirec#contactteam">Contact Our Team</router-link></li>
                    </ul>
                  </li>
                </ul>
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
  name: "Sitemap"
};
</script>

<style scoped>
.sitemap-page {
  font-family: 'Open Sans', 'Segoe UI', Tahoma, sans-serif;
  background-color: #fcfdfe;
  min-height: 100vh;
  padding-top: 100px;
  color: #333;
}

.sitemap-container {
  padding-bottom: 80px;
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
  padding-top: 100px;

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

/* Sitemap Directory Styles */
.sitemap-directory {
  padding: 20px 0;
}

.sitemap-block {
  margin-bottom: 40px;
}

.block-header {
  font-size: 1.25rem;
  font-weight: 700;
  color: #032b5f;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 15px;
  margin-bottom: 20px;
  position: relative;
}

.block-header::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 50px;
  height: 2px;
  background: #00bbf0;
}

.sitemap-ul {
  list-style: none;
  padding: 0;
}

.sitemap-ul > li {
  margin-bottom: 12px;
  position: relative;
  padding-left: 20px;
}

.sitemap-ul > li::before {
  content: '\f105';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  position: absolute;
  left: 0;
  color: #00bbf0;
  font-size: 0.9rem;
}

.sitemap-ul li a {
  color: #444;
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  transition: all 0.2s;
}

.sitemap-ul li a:hover {
  color: #001a38;
  padding-left: 5px;
}

.nested-ul {
  list-style: none;
  padding-left: 20px;
  margin-top: 12px;
  border-left: 1px solid #f0f0f0;
}

.nested-ul li {
  margin-bottom: 8px;
  position: relative;
}

.nested-ul li a {
  font-size: 0.95rem;
  color: #666;
}

.nested-ul li a:hover {
  color: #00bbf0;
}

@media (max-width: 991px) {
  .section-header {
    margin-bottom: 40px;
  }
}

@media (max-width: 768px) {
  .sitemap-page {
    padding-top: 50px;
  }
  .section-title {
    font-size: 1.8rem;
  }
}
</style>
