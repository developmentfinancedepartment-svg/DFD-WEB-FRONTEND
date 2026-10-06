<template>
  <div class="accessibility-wrapper" :class="{ 'menu-open': isOpen }">
    <!-- Floating Button -->
    <button class="accessibility-btn" @click="toggleMenu" aria-label="Accessibility Options">
      <i class="fas fa-wheelchair"></i>
    </button>

    <!-- Accessibility Menu -->
    <div class="accessibility-menu" v-if="isOpen">
      <div class="menu-header">
        <h3>Accessibility Options</h3>
        <button class="close-btn" @click="toggleMenu">&times;</button>
      </div>
      
      <div class="menu-content">
        <div class="option-grid">
          <button @click="adjustText(1)" class="option-item">
            <i class="fas fa-text-height"></i>
            <span>Increase Text</span>
          </button>
          <button @click="adjustText(-1)" class="option-item">
            <i class="fas fa-text-width"></i>
            <span>Decrease Text</span>
          </button>
          <button @click="toggleInvert" class="option-item" :class="{ active: isInverted }">
            <i class="fas fa-adjust"></i>
            <span>Invert Color</span>
          </button>
          <button @click="toggleGrayscale" class="option-item" :class="{ active: isGrayscale }">
            <i class="fas fa-palette"></i>
            <span>Gray Colors</span>
          </button>
          <button @click="toggleBigCursor" class="option-item" :class="{ active: isBigCursor }">
            <i class="fas fa-mouse-pointer"></i>
            <span>Big Cursor</span>
          </button>
          <button @click="toggleReadingGuide" class="option-item" :class="{ active: isReadingGuide }">
            <i class="fas fa-grip-lines"></i>
            <span>Reading Guide</span>
          </button>
          <button @click="toggleTextToSpeech" class="option-item" :class="{ active: isTTSActive }">
            <i class="fas fa-volume-up"></i>
            <span>Text to Speech</span>
          </button>
          <button @click="resetOptions" class="option-item reset-btn">
            <i class="fas fa-undo"></i>
            <span>Reset All</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Reading Guide Line -->
    <div v-if="isReadingGuide" class="reading-guide" :style="{ top: mouseY + 'px' }"></div>
  </div>
</template>

<script>
export default {
  name: "Accessibility",
  data() {
    return {
      isOpen: false,
      fontSize: 100, // percentage
      isInverted: false,
      isGrayscale: false,
      isBigCursor: false,
      isReadingGuide: false,
      isTTSActive: false,
      mouseY: 0,
      speechSynthesis: window.speechSynthesis,
      currentUtterance: null,
    };
  },
  mounted() {
    window.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('click', this.handleTextToSpeech);
  },
  unmounted() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('click', this.handleTextToSpeech);
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    adjustText(delta) {
      this.fontSize += delta * 10;
      if (this.fontSize < 70) this.fontSize = 70;
      if (this.fontSize > 200) this.fontSize = 200;
      document.documentElement.style.fontSize = this.fontSize + '%';
      document.body.style.fontSize = this.fontSize + '%';
    },

    toggleInvert() {
      this.isInverted = !this.isInverted;
      this.applyFilters();
    },
    toggleGrayscale() {
      this.isGrayscale = !this.isGrayscale;
      this.applyFilters();
    },
    applyFilters() {
      let filter = '';
      if (this.isInverted) filter += 'invert(1) ';
      if (this.isGrayscale) filter += 'grayscale(1) ';
      document.documentElement.style.filter = filter || 'none';
    },
    toggleBigCursor() {
      this.isBigCursor = !this.isBigCursor;
      document.body.classList.toggle('big-cursor', this.isBigCursor);
    },
    toggleReadingGuide() {
      this.isReadingGuide = !this.isReadingGuide;
    },
    handleMouseMove(e) {
      if (this.isReadingGuide) {
        this.mouseY = e.clientY;
      }
    },
    toggleTextToSpeech() {
      this.isTTSActive = !this.isTTSActive;
      if (!this.isTTSActive) {
        this.speechSynthesis.cancel();
      }
    },
    handleTextToSpeech(e) {
      if (!this.isTTSActive) return;
      
      // Don't speak if clicking on the accessibility menu itself
      if (e.target.closest('.accessibility-wrapper')) return;

      const text = e.target.innerText || e.target.getAttribute('alt');
      if (text && text.trim().length > 0) {
        this.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        this.speechSynthesis.speak(utterance);
      }
    },
    resetOptions() {
      this.fontSize = 100;
      this.isInverted = false;
      this.isGrayscale = false;
      this.isBigCursor = false;
      this.isReadingGuide = false;
      this.isTTSActive = false;
      
      document.documentElement.style.fontSize = '100%';
      document.documentElement.style.filter = 'none';
      document.body.classList.remove('big-cursor');

      this.speechSynthesis.cancel();
    }
  }
};
</script>

<style scoped>
/* ============================================
   BASE / DESKTOP (>= 1024px)
   Widget floats on the right side, menu opens to the left
   ============================================ */
.accessibility-wrapper {
  position: fixed;
  right: 20px;
  top: 18%;
  z-index: 10001;
}

.accessibility-btn {
  width: 52px;
  height: 52px;
  /* background: #008E9B; */
  background: #005FCC;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 26px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.accessibility-btn:hover {
  /* background: #008E9B; */
  background: #003F8A;
  transform: scale(1.1) rotate(5deg);
}

/* Desktop: menu appears to the LEFT of the button */
.accessibility-menu {
  position: absolute;
  right: 62px;
  top: 0;
  width: 320px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: slideInDesktop 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid rgba(0, 0, 0, 0.06);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

@keyframes slideInDesktop {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0);    }
}

.menu-header {
  background: linear-gradient(135deg, #008E9B 0%, #084D52 100%);
  color: white;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.menu-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.close-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
  flex-shrink: 0;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

.menu-content {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.option-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.option-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px;
  background: #f8faff;
  border: 2px solid #edf2f7;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #008E9B;
  text-align: center;
  font-family: inherit;
}

.option-item i {
  font-size: 20px;
  transition: transform 0.3s;
}

.option-item span {
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.2;
}

.option-item:hover {
  border-color: #008E9B;
  background: #f0f8ff;
  transform: translateY(-2px);
}

.option-item:hover i {
  transform: scale(1.2);
}

.option-item.active {
  background: #008E9B;
  color: white;
  border-color: #008E9B;
  box-shadow: 0 6px 14px rgba(0, 142, 155, 0.35);
}

.reset-btn {
  grid-column: span 2;
  margin-top: 6px;
  background: #fff5f5;
  border-color: #feb2b2;
  color: #e53e3e;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  padding: 12px;
}

.reset-btn:hover {
  background: #e53e3e;
  color: white;
  border-color: #e53e3e;
}

.reading-guide {
  position: fixed;
  left: 0;
  width: 100%;
  height: 3px;
  background: #008E9B;
  box-shadow: 0 0 15px 2px rgba(0, 142, 155, 0.6);
  pointer-events: none;
  z-index: 10002;
  transition: top 0.08s linear;
}

/* Scrollbar */
.menu-content::-webkit-scrollbar { width: 5px; }
.menu-content::-webkit-scrollbar-track { background: #f1f1f1; }
.menu-content::-webkit-scrollbar-thumb { background: #008E9B; border-radius: 10px; }

/* ============================================
   TABLET (768px – 1023px)
   Button moves to bottom-right corner
   Menu opens upward
   ============================================ */
@media (max-width: 1023px) {
  .accessibility-wrapper {
    right: 16px;
    top: auto;
    bottom: 24px;
  }

  .accessibility-menu {
    right: 0;
    top: auto;
    bottom: 62px;
    width: 300px;
    max-height: 80vh;
  }

  @keyframes slideInDesktop {
    from { opacity: 0; transform: translateY(15px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
}

/* ============================================
   MOBILE (< 768px)
   Button centred at the bottom
   Menu is a full-width bottom sheet
   ============================================ */
@media (max-width: 767px) {
  .accessibility-wrapper {
    right: 0;
    left: 0;
    bottom: 0;
    top: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 0 14px 14px;
    pointer-events: none; /* let clicks through except on children */
    background: transparent;
  }

  /* Re-enable pointer events on the actual interactive children */
  .accessibility-btn,
  .accessibility-menu {
    pointer-events: auto;
  }

  .accessibility-btn {
    width: 50px;
    height: 50px;
    font-size: 22px;
    border-radius: 50%;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45);
  }

  /* Full-width bottom sheet */
  .accessibility-menu {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: auto;
    width: 100%;
    border-radius: 22px 22px 0 0;
    max-height: 75vh;
    box-shadow: 0 -6px 30px rgba(0, 0, 0, 0.25);
    animation: slideUp 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(100%); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  .option-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  .option-item {
    padding: 14px 6px;
  }

  .option-item i {
    font-size: 18px;
  }

  .option-item span {
    font-size: 0.65rem;
  }

  .reset-btn {
    grid-column: span 4;
  }
}

/* ============================================
   VERY SMALL PHONES (< 400px)
   Keep 2-column grid for readability
   ============================================ */
@media (max-width: 399px) {
  .option-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .reset-btn {
    grid-column: span 2;
  }
}
</style>

<style>
/* Global styles for accessibility - Cannot be scoped */
body.big-cursor,
body.big-cursor * {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="%23032b5f" stroke="white" stroke-width="1"><path d="M7 2l12 11.2-5.8 2.3 3.3 5.4-3 1.8-3.4-5.6-3.1 3.2z"/></svg>') 0 0, auto !important;
}
</style>

