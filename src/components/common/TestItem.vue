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

<style lang="scss"></style>
