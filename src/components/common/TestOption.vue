<template>
  <li class="test-option">
    <input
      class="test-option-radio"
      type="radio"
      :id="optionId"
      :name="itemId"
      @input="onAnswer(optionId, itemId)"
    />
    <label :for="optionId" class="test-option-label">
      <slot></slot>
    </label>
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
  },
  methods: {
    onAnswer(optionId, itemId) {
      this.$emit('on-answer', { optionId, itemId })
    }
  }
}
</script>

<style lang="scss">
$radioSize: 20px;
$radioSpacing: 40px;
$labelBackground: #f5f5f5;
$redColor: #ee7d3b;

.test-option {
  width: 100%;
  &-radio {
    display: none;
  }
  &-label {
    width: 100%;
    display: inline-block;
    position: relative;
    padding-left: $radioSpacing;
    padding: 1rem 2rem 1rem $radioSpacing;
    border-radius: 10px;
    transition: background-color 0.3s ease 0.04s;
    &:hover {
      background-color: $labelBackground;
      &::before {
        transition: background-color 0.3s ease;
        background-color: #ffffff;
      }
    }
    &::before {
      content: '';
      position: absolute;
      width: $radioSize;
      height: $radioSize;
      left: 10px;
      border-radius: 50%;
      border: 2px solid transparent;
      background-color: $labelBackground;
      transition: border 0.3s ease, box-shadow 0.3s ease,
        background-color 0.3s ease 0.05s;
    }
  }
  &-radio:checked + &-label::before {
    background-color: $redColor;
    border: 2px solid $redColor;
    box-shadow: inset 0 0 0 4px #ffffff;
  }
  &-radio:checked + &-label {
    background-color: $labelBackground;
  }
}
</style>
