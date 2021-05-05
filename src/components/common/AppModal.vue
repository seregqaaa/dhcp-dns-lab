<template>
  <div @click="onClose" class="modal-wrapper">
    <div @click.stop class="modal-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-modal',
  props: {
    isClosable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClose() {
      if (this.isClosable) this.$emit('on-close')
    }
  }
}
</script>

<style lang="scss">
.modal {
  &-wrapper {
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 3rem;
    background-color: rgba(0, 0, 0, 0.3);
  }
  &-body {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    max-width: 600px;
    max-height: 400px;
    padding: 2rem 4rem;
    border-radius: 30px;
    background-color: #ffffff;
    box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.5);
  }
}
</style>
