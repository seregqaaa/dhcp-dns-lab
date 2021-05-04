<template>
  <div :class="wrapperClassName">
    <div
      :class="`progress-bar red to-right ${filledClass}`"
      :style="`width: ${testProgress}%`"
    ></div>
    <span :class="textClassName">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'progress-bar',
  props: {
    completedClassName: {
      type: String,
      required: true
    },
    isProgressVisible: {
      type: Boolean,
      required: true
    },
    filledClass: {
      type: String,
      required: true
    },
    isAllAnswered: {
      type: Boolean,
      required: true
    },
    testProgress: {
      type: Number,
      required: true
    }
  },
  computed: {
    wrapperClassName() {
      return `progress-wrapper ${this.completedClassName} ${this.filledClass} ${
        this.isAllAnswered ? 'red to-right' : ''
      }`
    },
    textClassName() {
      return `progress-text ${this.isProgressVisible ? this.filledClass : ''} ${
        this.completedClassName
      }`
    }
  }
}
</script>

<style lang="scss">
:root {
  --filled-width: 230px;
}

$bottomSpacing: 5rem;
$progressHeight: 30px;
$filledHeight: 50px;
$filledWidth: var(--filled-width);
$filledRadius: 30px;

.progress {
  &-wrapper {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.1);
    left: 0;
    bottom: 0;
    height: $progressHeight;
    width: 100%;
    transition-property: width, border-radius, height, left, bottom, opacity;
    transition-duration: 1s;
    transition-delay: 0.6s;
    transition-timing-function: ease;
    display: flex;
    justify-content: center;
    align-items: center;
    &.filled {
      left: calc(50% - var(--filled-width) / 2);
      bottom: $bottomSpacing;
      width: $filledWidth;
      height: $filledHeight;
      border-radius: $filledRadius;
    }
    &.completed {
      opacity: 0;
    }
  }
  &-bar {
    position: absolute;
    height: $progressHeight;
    transition: opacity 0.2s ease;
    &.filled {
      opacity: 0;
    }
  }
  &-text {
    z-index: 1;
    width: 100%;
    color: #ffffff;
    line-height: $progressHeight;
    position: absolute;
    text-align: center;
    font-size: 1.4rem;
    font-weight: 700;
    transition-property: font-size, opacity;
    transition-duration: 0.5s;
    transition-timing-function: ease;
    cursor: default;
    &.filled {
      opacity: 0;
      font-size: 0;
    }
    &.completed {
      font-size: 1.6rem;
    }
  }
}
</style>
