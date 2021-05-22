<template>
  <button
    :title="
      isCompleted
        ? 'Вы уже выполнили тест для допуска'
        : isDisabled
        ? titleText
        : ''
    "
    :class="className"
    :style="styleString"
    @keypress.enter.prevent
    @keypress.space.prevent
    @keypress.tab.prevent
  >
    <transition appear name="fade">
      <check-icon class="completed-icon" v-if="isCompleted" />
      <span v-else class="btn-text">
        <slot></slot>
      </span>
    </transition>
  </button>
</template>

<script>
import CheckIcon from '@/components/common/icons/CheckIcon'

export default {
  components: {
    'check-icon': CheckIcon
  },
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
      default: ''
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    titleText: {
      type: String,
      default: ''
    },
    shadowed: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    className() {
      return `btn ${this.background}${this.isDisabled ? ' disabled' : ''}${
        this.shadowed ? ' shadowed' : ''
      }${this.isCompleted ? ' completed' : ''}`
    },
    styleString() {
      return `width: ${this.width}px; height: ${this.height}px; border-radius: ${this.borderRadius}px`
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
  cursor: pointer;
  opacity: 0.9;
  transition: opacity 0.3s ease, box-shadow 0.3s ease 0.05s, background 2s ease;
  &-text {
    text-align: center;
    color: #ffffff;
    opacity: 0.97;
    font-size: 1.6rem;
    font-weight: 700;
    & > * {
      width: 100%;
      height: 100%;
    }
  }
  &.shadowed {
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.45);
    &:hover:not(.disabled) {
      opacity: 1;
      box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.5);
    }
  }
  &.disabled {
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.25;
  }
}

$iconSize: 100px;

.completed-icon {
  z-index: 1;
  position: absolute;
  height: $iconSize;
  width: $iconSize;
}
</style>
