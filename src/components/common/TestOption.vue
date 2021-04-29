<template>
  <li class="test-option">
    <label :for="optionId" class="test-option-label">
      <slot></slot>
    </label>
    <input type="radio" :id="optionId" :name="itemId" />
  </li>
</template>

<script>
export default {
  name: 'test-option',
  props: {
    itemId: {
      type: String,
      required: true
    },
    optionId: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss "></style>
