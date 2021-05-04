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
    background-color: rgba(0, 0, 0, 0.8);
  }
  &-body {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 600px;
    height: 400px;
    padding: 2rem 4rem;
    border-radius: 30px;
    background-color: #ffffff;
  }
}
</style>
