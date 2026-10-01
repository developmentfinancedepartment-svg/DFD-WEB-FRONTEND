<template>
  <footer class="footer-area">
    <div class="footer-top">
      <div class="container">
        <div class="row g-4">
          <!-- Contact Info -->
          <div class="col-lg-4 col-md-6">
            <div class="footer-widget contact-widget">
              <h4 class="widget-title">Contact Us</h4>
              <ul class="contact-info-list">
                <li>
                  <i class="fas fa-map-marker-alt"></i>
                  <span>
                    Your Address Line 1,<br />
                    Your Address Line 2,<br />
                    Your Address Line 3,<br />
                    Your Address Line 4
                  </span>
                </li>
                <li>
                  <i class="fas fa-phone-alt"></i>
                  <span>Your Phone Number</span>
                </li>
                <li>
                  <i class="fas fa-envelope"></i>
                  <span>Your Email Address</span>
                </li>
              </ul>
              <div class="footer-socials">
                <h5 class="social-title">Follow Us</h5>
                <div class="social-icons">
                  <a href="https://www.youtube.com" target="_blank" class="social-link" title="YouTube">
                    <i class="fab fa-youtube"></i>
                  </a>
                  <a href="https://www.linkedin.com" target="_blank" class="social-link" title="LinkedIn">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://www.facebook.com" target="_blank" class="social-link" title="Facebook">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.whatsapp.com" target="_blank" class="social-link" title="WhatsApp">
                    <i class="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="col-lg-3 col-md-6">
            <div class="footer-widget">
              <h4 class="widget-title">Quick Links</h4>
              <ul class="footer-links">
                <li><a href="https://www.presidentsoffice.gov.lk/" target="_blank">Presidential Secretariat</a></li>
                <li><a href="https://www.pmoffice.gov.lk/" target="_blank">Prime Minister's Office</a></li>
                <li><a href="https://www.treasury.gov.lk/" target="_blank">Ministry of Finance</a></li>
                <li><a href="https://www.cbsl.gov.lk/" target="_blank">Central Bank of Sri Lanka</a></li>
                <!-- <li><a href="https://mot.gov.lk/" target="_blank">Ministry of Technology</a></li> -->
                <li><a href="https://cert.gov.lk/" target="_blank">SL CERT</a></li>
              </ul>
            </div>
          </div>

          <!-- Map / Location -->
          <div class="col-lg-3 col-md-6">
            <div class="footer-widget map-widget">
              <h4 class="widget-title">Our Location</h4>
              <div class="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63372.90360784863!2d79.8405393!3d6.9137275!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25924de870667%3A0xa0d952b7f92c711d!2sMinistry%20of%20Finance!5e0!3m2!1sen!2slk!4v1730696640970!5m2!1sen!2slk"
                  style="border: 0"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <!-- Help & Info -->
          <div class="col-lg-2 col-md-6">
            <div class="footer-widget">
              <h4 class="widget-title">Help</h4>
              <ul class="footer-links">
                <li><router-link to="/sitemap">Sitemap</router-link></li>
                <li><router-link to="/Disclaimer">Disclaimer</router-link></li>
              </ul>
              <div class="footer-seal mt-4">
                <img src="../../assets/footerimg.jpeg" alt="Government Seal" class="img-fluid rounded shadow-sm" style="max-width: 120px;" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="footer-bottom">
      <div class="container">
        <div class="row align-items-center justify-content-between">
          <div class="col-lg-7 col-md-7 text-md-start text-center mb-3 mb-md-0">
            <p class="copyright-text">
              © {{ currentYear }}. your Department Name
            </p>
            <p class="last-updated-text">
              Last updated : {{ lastUpdated }}
            </p>
          </div>
          <div class="col-lg-5 col-md-5 text-md-end text-center">
            <p class="developer-text">
              Template by
              <a
                href="https://itmd.treasury.gov.lk/#/"
                target="_blank"
                rel="noopener noreferrer"
                class="itmd-link"
              >
                Department of Information Technology Management
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-area {
  background: #008E9B;
  color: #fff;
}

.footer-top {
  padding: 80px 0 50px;
  background-image: linear-gradient(to bottom, #008E9B 0%, #001a38 100%);
  border-top: 5px solid #008E9B;
}

.widget-title {
  color: #fff;
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.widget-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 3px;
  background: #008E9B;
}

.contact-info-list {
  padding: 0;
  list-style: none;
}

.contact-info-list li {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

.contact-info-list i {
  color: #008E9B;
  font-size: 1.1rem;
  margin-top: 5px;
}

.footer-links {
  padding: 0;
  list-style: none;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links li a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.footer-links li a:hover {
  color: #008E9B;
  padding-left: 5px;
}

.map-container {
  border-radius: 15px;
  overflow: hidden;
  height: 180px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

.map-container iframe {
  width: 100%;
  height: 100%;
}

.footer-socials {
  margin-top: 30px;
}

.social-title {
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.social-icons {
  display: flex;
  gap: 12px;
}

.social-link {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.social-link:hover {
  background: #008E9B;
  color: #fff;
  border-color: #008E9B;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 187, 240, 0.4);
}

.social-link i {
  font-size: 1rem;
}

.footer-bottom {
  padding: 22px 0;
  background: #00132b;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.copyright-text {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.3px;
}

.last-updated-text {
  margin: 4px 0 0;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.2px;
}

.developer-text {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
}

.itmd-link {
  color: #008E9B;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.itmd-link:hover {
  color: #5ce1e6;
  text-decoration: underline;
}

@media (max-width: 991px) {
  .footer-top {
    padding: 60px 0 30px;
  }
}

@media (max-width: 767px) {
  .widget-title {
    margin-bottom: 20px;
  }
  .footer-widget {
    margin-bottom: 40px;
  }
  .footer-bottom {
    padding: 18px 0;
  }
}
</style>

<script>
export default {
  props: {},

  data() {
    return {
      Version: import.meta.env.VITE_Version, // get from env files
      currentYear: new Date().getFullYear(),
    };
  },

  computed: {
    lastUpdated() {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date().toLocaleDateString('en-GB', options);
    },
  },

  methods: {},
};
</script>
