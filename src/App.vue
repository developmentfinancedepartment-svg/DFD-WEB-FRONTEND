<template>
  <div class="hd">
    <navigation></navigation>
    <test></test>
  </div>

  <div class="rw">
    <router-view />
  </div>

  <div class="ft">
    <Footer></Footer>
  </div>

  <Accessibility />
</template>

<script>
import jQuery from "jquery";
window.$ = jQuery;

export default {
  data() {
    return {
      //global variables
    };
  },
  computed: {
    //computed data
  },
  methods: {
    //user methods
  },
};

</script>
<style>
.rw {
  height: auto;
  background: linear-gradient(to bottom, #ffffff, #9eb5cf);
  background-size: 100% 100%;

}
</style>
