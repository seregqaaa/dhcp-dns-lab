<template>
  <div id="app">
    <div class="backplate" :class="{ blur: isModalActive }"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import { GETTERS } from '../../constants'

export default {
  name: 'app-vue',
  computed: {
    isModalActive() {
      return this.$store.getters[GETTERS.GET_IS_MODAL_ACTIVE]
    }
  }
}
</script>

<style lang="scss">
.backplate {
  position: fixed;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url('../../assets/img/logo_uisi.png');
  &.blur {
    filter: blur(4px);
  }
}
</style>
