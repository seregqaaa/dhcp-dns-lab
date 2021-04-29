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
    options: {
      type: Array,
      required: true
    },
    itemId: {
      type: String,
      required: true
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
    width: 777px;
    padding: $vSpacing $hSpacing $vSpacing $hSpacing;
    border-radius: 30px;
    background-color: #ffffff;
    box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.1);
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
      margin-bottom: 1.2rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
