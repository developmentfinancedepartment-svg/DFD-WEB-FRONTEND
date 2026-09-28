<template>
  <div v-if="visible" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <span class="close" @click="close">&times;</span>
      <div class="image-wrapper">
        <img :src="imageUrl" class="modal-image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    imageUrl: String
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  position: relative;
  background: #fff;
  border-radius: 10px;
  max-width: 50vw;
  /* Ensure modal is responsive */
  max-height: 90vh;
  /* Ensure modal is responsive */
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  /* Allow scrollbars if needed */
  padding: 20px;
  /* Space inside modal for better layout */
  box-sizing: border-box;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 30px;
  font-weight: 700;
  z-index: 1100;
  color: #f00;
  /* Ensure close button is above other content */
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* Hide overflow to handle large images */
}

.modal-image {
  max-width: 100%;
  max-height: 55vh;
  /* Ensure image fits within viewport */
  object-fit: contain;
  /* Preserve aspect ratio */
  border-radius: 10px;
}
</style>