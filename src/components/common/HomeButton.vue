<template>
  <transition appear name="fade">
    <home-icon class="home-button" @click.native="onHomeClick"></home-icon>
  </transition>
</template>

<script>
import { ROUTE_NAMES } from '@/constants'

import HomeIcon from '@/components/common/icons/HomeIcon.vue'

export default {
  name: 'button-home',
  components: {
    'home-icon': HomeIcon
  },
  methods: {
    onHomeClick() {
      if (this.isHomeButtonDebounced) return
      this.isHomeButtonDebounced = true
      const timeoutId = setTimeout(() => {
        this.isHomeButtonDebounced = false
        clearTimeout(timeoutId)
      }, 1000)
      this.$router.push({ name: ROUTE_NAMES.HOME })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/transition.scss';

$homeButtonSize: 60px;
$transitionTime: 0.2s;
$transitionFunc: ease;

.home-button {
  bottom: 20px;
  right: 20px;
  position: fixed;
  z-index: 10;
  padding: 15px;
  width: $homeButtonSize;
  height: $homeButtonSize;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.18);
  color: black;
  cursor: pointer;
  transition: background-color $transitionTime $transitionFunc;
  &:hover {
    background-color: #f9f9f9;
  }
}

@media (max-width: 950px) {
  $homeButtonSize: 40px;
  .home-button {
    width: $homeButtonSize;
    height: $homeButtonSize;
    padding: 8px;
  }
}
</style>
