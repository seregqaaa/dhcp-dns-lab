<template>
  <button
    :title="isDisabled ? titleText : ''"
    :class="`btn ${background} ${isDisabled ? 'disabled' : ''}`"
    :style="
      `width: ${width}px; height: ${height}px; border-radius: ${borderRadius}px`
    "
  >
    <span class="btn-text">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'app-button',
  props: {
    width: {
      type: Number,
      default: 230
    },
    height: {
      type: Number,
      default: 50
    },
    borderRadius: {
      type: Number,
      default: 25
    },
    background: {
      type: String,
      default: 'purple'
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    titleText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  border: none;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.45);
  cursor: pointer;
  opacity: 0.9;
  transition: opacity 0.3s ease, box-shadow 0.3s ease 0.05s, background 2s ease;
  &-text {
    color: #ffffff;
    opacity: 0.97;
    font-size: 1.6rem;
    font-weight: 700;
  }
  &:hover {
    opacity: 1;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.5);
  }
  &.disabled {
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.25;
  }
}
</style>
