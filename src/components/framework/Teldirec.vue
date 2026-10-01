<template>
  <div class="teldirec-page">
    <!-- Modern Header Section -->
    <section class="header-section animate-fade-down">
      <div class="header-container">
        <h2 class="section-title">Contact <span class="highlight">Us</span></h2>
        <div class="title-underline"></div>
        <!-- <p class="section-subtitle">Get in touch with our team</p> -->
      </div>
    </section>

    <!-- Social Media Section -->
    <section class="social-section animate-fade-up">
      <div class="container-fluid">
        <div class="social-container">
          <!-- <h3 class="social-title">Follow <span class="highlight">Us</span></h3> -->
          <div class="social-grid">
            <!-- Facebook -->
            <a href="https://www.facebook.com" target="_blank" class="social-card facebook">
              <div class="social-icon">
                <i class="fab fa-facebook-f"></i>
              </div>
              <span class="social-label">Facebook</span>
            </a>
            <!-- LinkedIn -->
            <a href="https://www.linkedin.com" target="_blank" class="social-card linkedin">
              <div class="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </div>
              <span class="social-label">LinkedIn</span>
            </a>
            <!-- YouTube -->
            <a href="https://www.youtube.com" target="_blank" class="social-card youtube">
              <div class="social-icon">
                <i class="fab fa-youtube"></i>
              </div>
              <span class="social-label">YouTube</span>
            </a>
            <!-- WhatsApp -->
            <a href="https://whatsapp.com" target="_blank" class="social-card whatsapp">
              <div class="social-icon">
                <i class="fab fa-whatsapp"></i>
              </div>
              <span class="social-label">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Inquiries and Map Section -->
    <section class="inquiries-section animate-fade-up">
      <div class="container-fluid">
        <div class="inquiries-container">
          <div class="row">
            <!-- Map Column -->
            <div class="col-lg-6 col-md-12 mb-4">
              <div class="map-card">
                <h3 class="card-heading">Find Us Here</h3>
                <iframe
                  src="https://www.google.com"
                  style="border: 0; border-radius: 15px; display: block; width: 100%; height: 400px;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <!-- Inquiries Form Column -->
            <div class="col-lg-6 col-md-12 mb-4">
              <div class="form-card">
                <h3 class="card-heading">Send us an <span class="highlight-text">Inquiry</span></h3>
                <form @submit.prevent="submitForm" class="modern-form">
                  <!-- First Name input -->
                  <div class="form-group">
                    <label for="firstName" class="form-label">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      v-model="formData.firstName"
                      maxlength="50"
                      class="form-input"
                      required
                    />
                  </div>

                  <!-- Last Name input -->
                  <div class="form-group">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      v-model="formData.lastName"
                      maxlength="50"
                      class="form-input"
                      required
                    />
                  </div>

                  <!-- Contact Number input -->
                  <div class="form-group">
                    <label for="contactNumber" class="form-label">Contact Number</label>
                    <input
                      type="text"
                      id="contactNumber"
                      v-model="formData.contactNumber"
                      class="form-input"
                      @input="restrictLengthAndNumbers"
                      required
                    />
                  </div>

                  <!-- Email input -->
                  <div class="form-group">
                    <label for="email" class="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      v-model="formData.email"
                      maxlength="80"
                      class="form-input"
                      required
                    />
                  </div>

                  <!-- Message input -->
                  <div class="form-group">
                    <label for="message" class="form-label">Message</label>
                    <textarea
                      id="message"
                      v-model="formData.message"
                      maxlength="2000"
                      rows="4"
                      class="form-input form-textarea"
                      required
                    ></textarea>
                  </div>

                  <!-- Submit button -->
                  <button
                    type="submit"
                    class="submit-btn"
                    :disabled="formSubmitted"
                  >
                    <i class="fas fa-paper-plane"></i> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Directory Section -->
    <section class="team-directory-section animate-fade-up">
      <div class="container-fluid">
        <div class="directory-container">
          <h2 class="section-title-secondary">Contact Our <span class="highlight">Team</span></h2>
          <div class="title-underline-secondary"></div>

          <div class="team-table-wrapper">
            <div v-for="allUnits in filteredStaffUnit" :key="allUnits.id" class="staff-unit-section">
              <h3 class="unit-title">{{ allUnits.staffUnit }}</h3>
              
              <div class="table-responsive">
                <table class="team-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Contact</th>
                      <th>Email</th>
                      <th>Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="details in allUnits.staffDetails.filter(
                        (detail) => detail.status === 1
                      )"
                      :key="details.id"
                    >
                      <td>{{ details.name }}</td>
                      <td>{{ details.designation }}</td>
                      <td>{{ details.contactNumber }}</td>
                      <td>{{ details.email }}</td>
                      <td class="profile-link">
                        <a
                          v-if="details.linkedIn"
                          :href="details.linkedIn"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="linkedin-btn"
                        >
                          <i class="fab fa-linkedin-in"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import BaseUrl from "../../services/baseURL";

export default {
  name: 'TeldirecPage',
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        contactNumber: "",
        email: "",
        message: "",
      },
      formSubmitted: false,
      allStaffUnits: [],
    };
  },

  mounted() {
    this.getAllStaffUnits();
  },

  computed: {
    topmostId() {
      return Math.min(...this.allStaffUnits.map((unit) => unit.id));
    },
    filteredStaffUnit() {
      return this.allStaffUnits.filter((unit) => unit.status === 1);
    },
  },

  methods: {
    restrictLengthAndNumbers() {
      this.formData.contactNumber = this.formData.contactNumber
        .replace(/\D/g, "")
        .slice(0, 10);
    },

    async submitForm() {
      try {
        this.formSubmitted = true;
        const response = await axios.post(
          `${BaseUrl.baseUrl}/api/public/inquiries`,
          this.formData
        );
        if (response.status == 200) {
          alert("Form Submitted succesfully.");
          this.resetForm();
        } else {
          throw new Error("Faild to submit form.");
        }
      } catch (error) {
        console.error(error);
        alert("Error submitting form.");
      } finally {
        this.formSubmitted = false;
      }
    },

    async getAllStaffUnits() {
      try {
        const unitsResponse = await axios.get(
          `${BaseUrl.baseUrl}/api/public/staff/units`
        );
        this.allStaffUnits = unitsResponse.data;
      } catch (error) {
        console.error("Error get staff units: ", error);
      }
    },

    resetForm() {
      this.formData.firstName = "";
      this.formData.lastName = "";
      this.formData.contactNumber = "";
      this.formData.email = "";
      this.formData.message = "";
    },
  },
};
</script>

<style scoped>
.teldirec-page {
  font-family: 'Open Sans', sans-serif;
}

/* Page Container */
.teldirec-page {
  overflow-x: hidden;
  background: linear-gradient(135deg, #f8faff 0%, #f0f5ff 100%);
  min-height: 100vh;
  padding-top: 100px;
}

/* Header Section */
.header-section {
  /* background: linear-gradient(135deg, #008E9B 0%, #084D52 100%); */
  padding: 70px 20px;
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
  color: #008E9B;
  letter-spacing: 1px;
  margin: 0 0 20px 0;
}

.highlight {
  color: #008E9B;
}

.title-underline {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #008E9B, #00B4C5);
  margin: 0 auto 20px;
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  margin: 0;
}

/* Social Media Section */
.social-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, #f8faff 0%, #f0f5ff 100%);
  padding-top: 0;
}

.social-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.social-title {
  font-size: 2rem;
  font-weight: 800;
  color: #008E9B;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 50px;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.social-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 30px 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(3, 43, 95, 0.08);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  border: 2px solid transparent;
  animation: fadeInUp 0.6s ease-out;
}

.social-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(3, 43, 95, 0.12);
  border-color: #008E9B;
}

.social-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  transition: all 0.3s ease;
  position: relative;
  line-height: 1;
}

.social-icon i {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
}



.social-card.facebook .social-icon {
  background: linear-gradient(135deg, #3b5998 0%, #1e3a75 100%);
}

.social-card.linkedin .social-icon {
  background: linear-gradient(135deg, #0082ca 0%, #005a96 100%);
}

.social-card.youtube .social-icon {
  background: linear-gradient(135deg, #dd4b39 0%, #bb3520 100%);
}

.social-card.whatsapp .social-icon {
  background: linear-gradient(135deg, #25d366 0%, #1da751 100%);
}

.social-card:hover .social-icon {
  transform: scale(1.15);
}

.social-label {
  font-weight: 700;
  color: #008E9B;
  font-size: 0.95rem;
}

/* Inquiries Section */
.inquiries-section {
  padding: 80px 20px;
}

.inquiries-container {
  max-width: 1200px;
  margin: 0 auto;
}

.map-card, .form-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(3, 43, 95, 0.08);
  overflow: hidden;
  border: 1px solid #e0e7f1;
  animation: fadeInUp 0.6s ease-out;
  transition: all 0.3s ease;
}

.map-card:hover, .form-card:hover {
  box-shadow: 0 20px 50px rgba(3, 43, 95, 0.12);
  transform: translateY(-5px);
}

.card-heading {
  font-size: 1.4rem;
  font-weight: 700;
  color: #008E9B;
  margin: 0;
  padding: 25px 30px;
  border-bottom: 2px solid #e0e7f1;
}

.highlight-text {
  color: #008E9B;
}

.map-card {
  padding: 25px;
}

/* Modern Form */
.form-card {
  padding: 35px;
}

.modern-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: #008E9B;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.form-input {
  padding: 12px 15px;
  border: 2px solid #e0e7f1;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: 'Open Sans', sans-serif;
  color: #495057;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #008E9B;
  box-shadow: 0 0 0 3px rgba(0, 187, 240, 0.1);
  background-color: #f8fbff;
}

.form-textarea {
  resize: vertical;
  font-family: 'Open Sans', sans-serif;
}

.submit-btn {
  padding: 14px 28px;
  background: linear-gradient(135deg, #008E9B 0%, #084D52 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(3, 43, 95, 0.25);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Team Directory Section */
.team-directory-section {
  background: linear-gradient(135deg, #e8f0ff 0%, #f8faff 100%);
  padding: 80px 20px;
}

.directory-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title-secondary {
  font-size: 2rem;
  font-weight: 700;
  color: #008E9B;
  letter-spacing: 1px;
  margin: 0 0 20px 0;
  text-align: center;
}

.title-underline-secondary {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #008E9B, #00B4C5);
  margin: 0 auto 50px;
  border-radius: 2px;
}

.team-table-wrapper {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(3, 43, 95, 0.08);
  border: 1px solid #e0e7f1;
}

.staff-unit-section {
  border-bottom: 1px solid #e0e7f1;
}

.staff-unit-section:last-child {
  border-bottom: none;
}

.unit-title {
  background: linear-gradient(135deg, #e8f0ff 0%, #f0f5ff 100%);
  padding: 20px 30px;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #008E9B;
  border-bottom: 2px solid #e0e7f1;
}

.table-responsive {
  overflow-x: auto;
}

.team-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
}

.team-table thead {
  background: #f8fbff;
  border-bottom: 2px solid #e0e7f1;
}

.team-table thead th {
  padding: 15px 20px;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 700;
  color: #008E9B;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.team-table tbody tr {
  border-bottom: 1px solid #e0e7f1;
  transition: all 0.3s ease;
}

.team-table tbody tr:hover {
  background-color: #f8fbff;
}

.team-table tbody td {
  padding: 15px 20px;
  font-size: 0.95rem;
  color: #495057;
}

.profile-link {
  text-align: center;
}

.linkedin-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #0082ca 0%, #005a96 100%);
  color: white;
  border-radius: 50%;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.linkedin-btn:hover {
  transform: scale(1.15);
  box-shadow: 0 5px 15px rgba(0, 130, 202, 0.3);
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

  .social-section {
    padding: 60px 20px;
  }

  .inquiries-section {
    padding: 60px 20px;
  }

  .team-directory-section {
    padding: 60px 20px;
  }
}

@media (max-width: 768px) {
  .header-section {
    padding: 70px 20px;
    margin-top: -50px;
    padding-top: 100px;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .social-section {
    padding: 50px 15px;
  }

  .social-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .social-icon {
    width: 70px;
    height: 70px;
    font-size: 2.2rem;
  }

  .social-icon i {
    font-size: 2.2rem;
  }

  .inquiries-section {
    padding: 50px 15px;
  }

  .team-directory-section {
    padding: 50px 15px;
  }

  .section-title-secondary {
    font-size: 1.6rem;
  }

  .card-heading {
    font-size: 1.2rem;
    padding: 20px 25px;
  }

  .form-card {
    padding: 25px;
  }
}

@media (max-width: 480px) {
  .header-section {
    padding: 60px 12px;
    margin-top: -50px;
    padding-top: 100px;
  }

  .section-title {
    font-size: 1.4rem;
  }

  .section-subtitle {
    font-size: 0.95rem;
  }

  .social-section {
    padding: 40px 12px;
  }

  .social-title {
    font-size: 1.3rem;
    margin-bottom: 35px;
  }

  .social-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .social-icon {
    width: 65px;
    height: 65px;
    font-size: 2rem;
  }

  .social-icon i {
    font-size: 2rem;
  }

  .inquiries-section {
    padding: 40px 12px;
  }

  .team-directory-section {
    padding: 40px 12px;
  }

  .section-title-secondary {
    font-size: 1.3rem;
  }

  .card-heading {
    font-size: 1.1rem;
    padding: 18px 20px;
  }

  .form-card {
    padding: 20px;
  }

  .team-table thead th {
    font-size: 0.8rem;
    padding: 10px 12px;
  }

  .team-table tbody td {
    padding: 10px 12px;
    font-size: 0.85rem;
  }

  .linkedin-btn {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }
}
</style>
