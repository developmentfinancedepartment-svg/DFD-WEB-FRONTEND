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
            
            <!-- Category 1: About DFD -->
            <div class="col-lg-4 col-md-6">
              <div class="sitemap-block">
                <h4 class="block-header"><i class="fas fa-university me-2"></i> About DFD</h4>
                <ul class="sitemap-ul">
                  <li><router-link to="/">Home Page</router-link></li>
                  <li><router-link to="/about">About the Department</router-link></li>
                  <li><router-link to="/our-team">Our Team &amp; Divisions</router-link></li>
                  <li><router-link to="/our-team#rti">Right to Information (RTI)</router-link></li>
                </ul>
              </div>
            </div>

            <!-- Category 2: Schemes & Services -->
            <div class="col-lg-4 col-md-6">
              <div class="sitemap-block">
                <h4 class="block-header"><i class="fas fa-hand-holding-usd me-2"></i> Schemes &amp; Services</h4>
                <ul class="sitemap-ul">
                  <li>
                    <router-link to="/Services">All Development Schemes</router-link>
                    <ul class="nested-ul">
                      <li><router-link to="/Services">Concessionary Loan Schemes</router-link></li>
                      <li><router-link to="/Services">Interest Subsidy Programs</router-link></li>
                      <li><router-link to="/Services">Institutional Services &amp; Facilities</router-link></li>
                    </ul>
                  </li>
                  <li><router-link to="/Services">Upcoming Schemes</router-link></li>
                </ul>
              </div>
            </div>

            <!-- Category 3: Publications & Support -->
            <div class="col-lg-4 col-md-6">
              <div class="sitemap-block">
                <h4 class="block-header"><i class="fas fa-file-alt me-2"></i> Publications &amp; Support</h4>
                <ul class="sitemap-ul">
                  <li><router-link to="/publications">Publications &amp; Circulars</router-link></li>
                  <li><router-link to="/gallery">Gallery &amp; Events</router-link></li>
                  <li>
                    <router-link to="/contact">Contact Directory</router-link>
                    <ul class="nested-ul">
                      <li><router-link to="/contact#inquiries">Submit Inquiries</router-link></li>
                      <li><router-link to="/contact#hotline">Hotline &amp; Office Location</router-link></li>
                    </ul>
                  </li>
                  <li><router-link to="/disclaimer">Website Disclaimer</router-link></li>
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
  padding-top: 130px;
  color: #333;
}

.sitemap-container {
  padding-bottom: 80px;
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
  padding-top: 130px;

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
  color: #008E9B;
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
  background: #008E9B;
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
  color: #008E9B;
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
  color: #008E9B;
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
