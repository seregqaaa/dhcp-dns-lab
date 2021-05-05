<template>
  <li class="test-item-wrapper">
    <h3 class="test-item-title">
      <slot></slot>
    </h3>
    <ol class="test-item-options">
      <test-option
        v-for="option in options"
        :key="option.id"
        :itemId="itemId"
        :optionId="option.id"
        @on-answer="onAnswer"
      >
        {{ option.text }}
      </test-option>
    </ol>
  </li>
</template>

<script>
import TestOption from '@/components/common/TestOption.vue'

export default {
  name: 'test-item',
  components: {
    'test-option': TestOption
  },
  props: {
    itemId: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    onAnswer(payload) {
      this.$emit('on-answer', payload)
    }
  }
}
</script>

<style lang="scss">
$hSpacing: 3.2rem;
$vSpacing: 2.4rem;

body {
  background-color: #fafafa;
}
.test-item {
  &-wrapper {
    max-width: 777px;
    padding: $vSpacing $hSpacing $vSpacing $hSpacing;
    border-radius: 30px;
    background-color: #ffffff;
    box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 3rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &-title {
    margin-bottom: 2rem;
  }
  &-options {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    & > li {
      margin-bottom: 0.5rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
