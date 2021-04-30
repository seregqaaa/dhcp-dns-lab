<template>
  <button
    :class="`btn ${background}`"
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
      default: 'red'
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
  transition: transform 0.2s ease, box-shadow 0.133s ease 0.1s;
  &-text {
    color: #ffffff;
    opacity: 0.97;
    font-size: 1.6rem;
    font-weight: 700;
  }
  &:hover {
    transform: scale(0.98);
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.55);
  }
}
</style>
