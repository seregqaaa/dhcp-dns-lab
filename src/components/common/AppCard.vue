<template>
  <div
    :title="isDisabled && 'Сначала выполните тест для допуска'"
    :class="`card-container ${isDisabled && 'disabled'}`"
  >
    <span class="card-text">
      {{ cardTitle }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    cardTitle: {
      type: String,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
$cardSize: 250px;

.card {
  &-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: $cardSize;
    height: $cardSize;
    padding: 30px 15px;
    margin-right: 50px;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.5);
    border-radius: 30px;
    background: #7f00ff;
    background: -webkit-linear-gradient(to bottom, #e100ff, #7f00ff);
    background: linear-gradient(to bottom, #e100ff, #7f00ff);
    opacity: 0.65;
    transition: opacity 0.3s ease, box-shadow 0.3s ease 0.05s;
    cursor: pointer;
    &:hover {
      opacity: 1;
      box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.5);
    }
    &:last-child {
      margin-right: 0;
    }
    &.disabled {
      cursor: not-allowed;
      box-shadow: none;
      opacity: 0.3;
    }
  }
  &-text {
    max-width: 100%;
    color: white;
    font-size: 2.2rem;
    font-weight: 700;
    text-align: center;
    opacity: 0.97;
    user-select: none;
  }
}
</style>
