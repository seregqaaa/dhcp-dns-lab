<template>
  <div id="app">
    <transition appear name="fade">
      <app-loader key="loader" v-if="!isMounted" />
    </transition>
    <div class="backplate" :class="{ blur: isModalActive }"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import { GETTERS } from '../../constants'

import AppLoader from '@/components/common/AppLoader'

export default {
  name: 'app-vue',
  components: { 'app-loader': AppLoader },
  computed: {
    isModalActive() {
      return this.$store.getters[GETTERS.GET_IS_MODAL_ACTIVE]
    }
  },
  data() {
    return {
      isMounted: false
    }
  },
  mounted() {
    this.isMounted = true
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
