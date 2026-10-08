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
            <p>To become the key Government agency as facilitator for development financing.</p>
          </div>
          <div class="content-card">
            <div class="card-icon">
              <i class="fas fa-bullseye"></i>
            </div>
            <h3>Mission</h3>
            <p>Facilitate to formulate appropriate policies and strategies and mobilize financial resources for the development of MSMEs, financing primary sectors through necessary intervention with the relevant stakeholders.</p>
          </div>
        </div>

        <div class="objectives-section">
          <div class="objectives-header">
            <div class="header-icon" style="background: linear-gradient(135deg, #008795 0%, #00e5ff 100%);">
              <i class="fas fa-flag"></i>
            </div>
            <h3>Our Objectives</h3>
          </div>
          <div class="objectives-list">
            <div class="objective-item">
              <div class="check-icon"><i class="fas fa-check"></i></div>
              <p>Mobilize the financial resources and removal of the market impediments for the development of MSMEs.</p>
            </div>
            <div class="objective-item">
              <div class="check-icon"><i class="fas fa-check"></i></div>
              <p>Strengthen institutional capacities for development of financial markets.</p>
            </div>
            <div class="objective-item">
              <div class="check-icon"><i class="fas fa-check"></i></div>
              <p>Enhance rural entrepreneurship especially for low income entrepreneurs.</p>
            </div>
            <div class="objective-item">
              <div class="check-icon"><i class="fas fa-check"></i></div>
              <p>Financing for primary sector in line with Government policy framework.</p>
            </div>
            <div class="objective-item">
              <div class="check-icon"><i class="fas fa-check"></i></div>
              <p>Implementation of relevant budget proposals of each year.</p>
            </div>
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
              <p>Facilitate to formulate appropriate polices, strategies and programs for the development of MSMEs of the economy.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">02</span>
              <p>Monitor and Review the market data to Identify key issues and provide solutions to the smooth growth of the MSMEs and micro finance sectors.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">03</span>
              <p>Review Government Subsidy Schemes to ensure economic development and facilitate to formulate appropriate polices.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">04</span>
              <p>Facilitate innovative policies, strategies and programs where ever necessary for micro finance sector.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">05</span>
              <p>Facilitate in enacting legislations for banking, insurance, MSMEs and financial sector if the market review illustrates the need.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">06</span>
              <p>Implement budget proposals and donor funded projects related to MSME sector, primary sector and other sectors coming under the purview of this department.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">07</span>
              <p>Compile all data on MSME’s of Industrial, Agriculture and Service sectors and analyze to identify the impediments and policy interventions.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">08</span>
              <p>Facilitate annual budget preparation process of the Government in respect of MSME sector, Banking sector and financial market and other sectors coming under the purview of this department.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">09</span>
              <p>Oversee implementation of Government sponsored financial assistance schemes.</p>
            </div>
            <div class="responsibility-item">
              <span class="item-number">10</span>
              <p>Arranging local bank financing for development projects in MSME finance sectors in line with the Government policy.</p>
            </div>
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
  padding-top: 130px;
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
  margin: 10px 0 24px 0;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 16px;
  font-weight: 700;
}

.title-underline {
  width: 90px;
  height: 4px;
  background: linear-gradient(90deg, #008E9B, #00B4C5);
  margin: 0 auto;
  border-radius: 999px;
}

.highlight {
  color: #008E9B;
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
  background: linear-gradient(90deg, #008E9B, #00B4C5);
}

.content-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 80px rgba(2, 16, 47, 0.1);
  border-color: #008E9B;
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background: linear-gradient(135deg, #008E9B 0%, #00B4C5 100%);
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
  color: #008E9B;
}

.content-card p {
  line-height: 1.8;
  color: #4f647d;
  font-size: 0.95rem;
}

/* Objectives Section */
.objectives-section {
  background: linear-gradient(135deg, #fff 0%, #f7fbff 100%);
  border-radius: 25px;
  padding: 50px;
  box-shadow: 0 25px 70px rgba(2, 16, 47, 0.06);
  margin-bottom: 50px;
}

.objectives-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 35px;
  padding-bottom: 25px;
  border-bottom: 2px solid rgba(3, 43, 95, 0.08);
}

.objectives-header h3 {
  font-size: 1.8rem;
  margin: 0;
  color: #008795;
}

.objectives-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.objective-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 25px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.objective-item:hover {
  transform: translateX(5px);
  background: #ffffff;
  border-color: #00e5ff;
  box-shadow: 0 15px 40px rgba(0, 135, 149, 0.1);
}

.check-icon {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(135deg, #008795 0%, #00e5ff 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.objective-item p {
  margin: 0;
  color: #4f647d;
  line-height: 1.6;
  font-size: 1rem;
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
  background: linear-gradient(135deg, #008E9B 0%, #00B4C5 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}

.responsibility-header h3 {
  font-size: 1.8rem;
  margin: 0;
  color: #008E9B;
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
  border-left: 5px solid #008E9B;
  transition: all 0.3s ease;
}

.responsibility-item:hover {
  transform: translateX(5px);
  box-shadow: 0 15px 40px rgba(0, 142, 155, 0.1);
}

.item-number {
  flex-shrink: 0;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #008E9B 0%, #00B4C5 100%);
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



@media (max-width: 991px) {
  .content-grid {
    grid-template-columns: 1fr;
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

  .objectives-section,
  .responsibility-section {
    padding: 30px;
  }

  .section-header {
    margin-bottom: 40px;
  }
}
</style>
