<template>
  <div class="events-page">
    <!-- Modern Header Section -->
    <section class="header-section animate-fade-down">
      <div class="header-container">
        <h2 class="section-title">Event <span class="highlight">Calendar</span></h2>
        <div class="title-underline"></div>
      </div>
    </section>

    <!-- Calendar Section -->
    <section class="calendar-section animate-fade-up">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-8 offset-md-2">
            <div class="custom-calendar box bg-white p-4 modern-card" style="border-radius: 20px; box-shadow: 0px 15px 35px rgba(0,0,0,0.08); animation: fadeInUp 0.6s ease-out;">
              
              <!-- Calendar Header -->
              <div class="d-flex justify-content-between align-items-center mb-4">
                <button class="btn-nav-calendar" @click="prevMonth">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <h4 class="month-title">{{ monthName }} <span class="year-text">{{ year }}</span></h4>
                <button class="btn-nav-calendar" @click="nextMonth">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
              
              <!-- Calendar Grid -->
              <div class="calendar-grid">
                <!-- Day Names -->
                <div class="day-header" v-for="day in daysOfWeek" :key="day">
                  {{ day }}
                </div>
                
                <!-- Blank Days -->
                <div v-for="blank in blankDays" :key="'blank-' + year + '-' + month + '-' + blank" class="p-2 empty-cell"></div>
                
                <!-- Month Days -->
                <div v-for="day in daysInMonth" :key="'day-' + year + '-' + month + '-' + day" 
                     class="day-cell" 
                     :class="{'today-cell': isToday(day), 'has-event-cell': !isToday(day) && getEventsForDay(day).length > 0}"
                     @click="selectDay(day)">
                  <span class="day-number" :class="{'today-number': isToday(day), 'event-number': !isToday(day) && getEventsForDay(day).length > 0}">{{ day }}</span>
                  
                  <div class="events-label-container mt-1 px-1" v-if="getEventsForDay(day).length > 0">
                    <div class="event-mini-label" v-for="(event, idx) in getEventsForDay(day).slice(0, 1)" :key="idx">
                      {{ event.title }}
                    </div>
                    <div v-if="getEventsForDay(day).length > 1" class="more-events-count">
                      +{{ getEventsForDay(day).length - 1 }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Events Modal -->
    <div v-if="showModal" class="modal fade show" tabindex="-1" style="display: block; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 modern-modal" style="border-radius: 20px; overflow: hidden;">
          <div class="modal-header modern-modal-header border-bottom py-3">
            <h5 class="modal-title font-weight-bold" style="font-size: 1.25rem; color: #008E9B;">Events on <span v-if="selectedDateObj" style="color: #008E9B;">{{ selectedDateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) }}</span></h5>
          </div>
          <div class="modal-body text-left p-4" style="max-height: 65vh; overflow-y: auto; background-color: #f8faff;">
            <div v-if="selectedEvents.length === 0" class="text-center text-muted p-5 animate-fade-in">
              <i class="fas fa-calendar-times no-event-icon mb-3"></i>
              <h4 class="font-weight-light">No events scheduled for this day.</h4>
            </div>
            <div v-else class="event-cards-wrapper">
              <div v-for="(ev, idx) in selectedEvents" :key="ev.id" 
                   class="event-detail-card mb-4 animate-slide-up" 
                   :style="{'animation-delay': (idx * 0.1) + 's'}">
                <div class="card-inner">
                  <div class="event-image-side" v-if="ev.imageUrl">
                    <img :src="getImageUrl(ev.imageUrl)" alt="Event image">
                    <div class="image-overlay"></div>
                  </div>
                  <div class="event-info-side">
                    <div class="event-category">Event</div>
                    <h3 class="event-title">{{ ev.title }}</h3>
                    
                    <div class="event-meta-grid">
                      <div class="meta-item">
                        <div class="meta-icon"><i class="fas fa-clock"></i></div>
                        <div class="meta-content">
                          <span class="meta-label">Time</span>
                          <span class="meta-value">{{ ev.startTime }} - {{ ev.endTime || 'Ongoing' }}</span>
                        </div>
                      </div>
                      <div class="meta-item" v-if="ev.location">
                        <div class="meta-icon"><i class="fas fa-map-marker-alt"></i></div>
                        <div class="meta-content">
                          <span class="meta-label">Location</span>
                          <span class="meta-value">{{ ev.location }}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="event-description-box">
                      <p>{{ ev.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 pb-4 pr-4">
            <button type="button" class="btn btn-secondary px-4 py-2" style="border-radius: 8px; font-weight: bold;" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BaseUrl from '../../services/baseURL'

export default {
  name: 'CalendarPage',
  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      events: [],
      showModal: false,
      selectedDateObj: null,
      selectedEvents: []
    }
  },
  computed: {
    year() {
      return this.currentDate.getFullYear()
    },
    month() {
      return this.currentDate.getMonth()
    },
    monthName() {
      return this.currentDate.toLocaleString('default', { month: 'long' })
    },
    daysInMonth() {
      return new Date(this.year, this.month + 1, 0).getDate()
    },
    blankDays() {
      return new Date(this.year, this.month, 1).getDay()
    }
  },
  mounted() {
    this.fetchEvents()
  },
  methods: {
    fetchEvents() {
      axios.get(`${BaseUrl.baseUrl}/api/calendar`)
        .then(response => {
          this.events = response.data
        })
        .catch(error => {
          console.error("Error fetching calendar events: ", error)
        })
    },
    prevMonth() {
      this.currentDate = new Date(this.year, this.month - 1, 1)
    },
    nextMonth() {
      this.currentDate = new Date(this.year, this.month + 1, 1)
    },
    isToday(day) {
      const today = new Date()
      return day === today.getDate() && this.month === today.getMonth() && this.year === today.getFullYear()
    },
    getEventsForDay(day) {
      if (!this.events || !Array.isArray(this.events)) return []
      
      return this.events.filter(e => {
        if (!e || !e.eventDate) return false
        
        // Robust status check (numeric 1 = Active)
        if (Number(e.status) !== 1) return false;

        let eYear, eMonth, eDay
        
        // Case 1: Array format [YYYY, MM, DD]
        if (Array.isArray(e.eventDate)) {
          eYear = e.eventDate[0]
          eMonth = e.eventDate[1] - 1
          eDay = e.eventDate[2]
        } 
        // Case 2: String format (ISO or plain)
        else if (typeof e.eventDate === 'string') {
          const datePart = e.eventDate.split('T')[0]
          const parts = datePart.split('-')
          if (parts.length >= 3) {
            eYear = parseInt(parts[0], 10)
            eMonth = parseInt(parts[1], 10) - 1
            eDay = parseInt(parts[2], 10)
          } else {
            return false
          }
        } 
        // Case 3: Date object or numeric timestamp
        else {
          try {
            const d = new Date(e.eventDate)
            if (isNaN(d.getTime())) return false
            eYear = d.getFullYear()
            eMonth = d.getMonth()
            eDay = d.getDate()
          } catch (err) {
            return false
          }
        }
        
        return eYear === this.year && eMonth === this.month && eDay === day
      })
    },
    selectDay(day) {
      this.selectedDateObj = new Date(this.year, this.month, day)
      this.selectedEvents = this.getEventsForDay(day)
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    getImageUrl(path) {
      if (!path) return '';
      if (path.startsWith('http')) return path;
      const fileName = path.replace(/^uploads\//, '');
      return `${BaseUrl.baseUrl}/api/calendar/image/${fileName}`;
    }
  }
}
</script>

<style scoped>
.events-page {
  font-family: 'Open Sans', sans-serif;
  overflow-x: hidden;
  background: linear-gradient(135deg, #f8faff 0%, #f0f5ff 100%);
  min-height: 100vh;
  padding-top: 100px;
}

/* Header Section */
.header-section {
  padding: 70px 20px 0;
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

/* Calendar Section */
.calendar-section {
  padding: 30px 20px;
}

.modern-card {
  user-select: none;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid #e0e7f1;
  border-radius: 15px;
  overflow: hidden;
  background: white;
}

.calendar-grid > div {
  border-right: 1px solid #e0e7f1;
  border-bottom: 1px solid #e0e7f1;
}

.calendar-grid > div:nth-child(7n) {
  border-right: none;
}

.day-header {
  text-align: center;
  font-weight: 700;
  padding: 12px 8px;
  color: #008E9B;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: #f8fbff;
  border-bottom: 2px solid #e0e7f1;
}

.empty-cell {
  min-height: 70px;
  background-color: #f8fbff;
}

.day-cell {
  min-height: 70px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding: 6px;
}

.day-cell:hover {
  background-color: #e8f0ff;
  transform: scale(1.02);
  z-index: 10;
  box-shadow: inset 0 0 8px rgba(0, 142, 155, 0.1);
}

.today-cell {
  background-color: #e8f0ff;
}

.day-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 0.95rem;
  font-weight: 600;
  color: #495057;
  margin-top: 2px;
  transition: all 0.3s ease;
}

.today-number {
  background: linear-gradient(135deg, #008E9B 0%, #00B4C5 100%);
  color: #fff !important;
  box-shadow: 0 4px 12px rgba(0, 142, 155, 0.3);
}

.event-number {
  color: #008E9B;
  font-weight: 700;
}

.has-event-cell:not(.today-cell) {
  background-color: #f0fbff;
}

.events-label-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: center;
}

.event-mini-label {
  font-size: 0.65rem;
  background: linear-gradient(135deg, #008E9B 0%, #00B4C5 100%);
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  font-weight: 600;
  text-align: center;
}

.more-events-count {
  font-size: 0.65rem;
  color: #008E9B;
  font-weight: 700;
  text-align: center;
}

/* Month Navigation */
.btn-nav-calendar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid #e0e7f1;
  background: white;
  color: #008E9B;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-nav-calendar:hover {
  border-color: #008E9B;
  background: #f0fbff;
  transform: scale(1.1);
}

.month-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #008E9B;
  margin-bottom: 0;
  letter-spacing: 0.5px;
}

.year-text {
  font-weight: 400;
  color: #9ca3af;
  font-size: 1rem;
}

.no-event-icon {
  font-size: 3rem;
  color: #dee2e6;
  display: block;
  margin-bottom: 1rem;
}

/* Modal Styles */
.modern-modal {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.modern-modal-header {
  background: #f8fbff;
  border-bottom: 2px solid #e0e7f1 !important;
}

/* Event Detail Card */
.event-detail-card {
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  border: 1px solid #e0e7f1;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
}

.event-detail-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
  border-color: #008E9B;
}

.card-inner {
  display: flex;
  flex-direction: row;
  min-height: 240px;
}

@media (max-width: 768px) {
  .card-inner {
    flex-direction: column;
  }
  .event-image-side {
    height: 200px;
    width: 100% !important;
  }
}

.event-image-side {
  width: 40%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #e0e7f1 0%, #e8f0ff 100%);
}

.event-image-side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.event-detail-card:hover .event-image-side img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.1), transparent);
}

.event-info-side {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.event-category {
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #008E9B;
  background: rgba(0, 142, 155, 0.1);
  padding: 6px 14px;
  border-radius: 50px;
  letter-spacing: 1px;
}

.event-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #008E9B;
  margin-bottom: 20px;
  padding-right: 60px;
  line-height: 1.2;
}

.event-meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.meta-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #e0e7f1 0%, #e8f0ff 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #008E9B;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.meta-item:hover .meta-icon {
  background: linear-gradient(135deg, #008E9B 0%, #00B4C5 100%);
  color: white;
}

.meta-content {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 0.7rem;
  color: #9ca3af;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.meta-value {
  font-size: 0.9rem;
  color: #008E9B;
  font-weight: 600;
}

.event-description-box {
  background: #f8fbff;
  border-radius: 10px;
  padding: 15px;
  border-left: 4px solid #008E9B;
  flex: 1;
}

.event-description-box p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #4f647d;
  margin-bottom: 0;
}

/* Animations */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-down { animation: fadeInDown 0.6s ease-out; }
.animate-fade-up { animation: fadeInUp 0.6s ease-out backwards; }
.animate-slide-up { opacity: 0; animation: fadeInUp 0.5s ease forwards; }
.animate-fade-in { animation: fadeIn 0.5s ease forwards; }

/* Responsive */
@media (max-width: 1024px) {
  .section-title { font-size: 2rem; }
  .calendar-section { padding: 60px 20px; }
}
@media (max-width: 768px) {
  .section-title { font-size: 1.8rem; }
  .day-header { font-size: 0.7rem; padding: 10px 5px; }
  .day-cell { min-height: 60px; padding: 4px; }
  .day-number { width: 28px; height: 28px; font-size: 0.85rem; }
  .event-mini-label { font-size: 0.55rem; }
  .month-title { font-size: 1.2rem; }
}
@media (max-width: 480px) {
  .section-title { font-size: 1.5rem; }
  .day-cell { min-height: 50px; }
  .btn-nav-calendar { width: 35px; height: 35px; font-size: 0.9rem; }
}
</style>
