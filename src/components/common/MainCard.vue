<template>
  <div class="card-container">
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
    }
  }
}
</script>

<style lang="scss">
.card {
  width: 100%;
  height: 100%;
  &-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 250px;
    padding: 30px 15px;
    margin-right: 50px;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    background: #7f00ff;
    background: -webkit-linear-gradient(to right, #e100ff, #7f00ff);
    background: linear-gradient(to bottom, #e100ff, #7f00ff);
    &:last-child {
      margin-right: 0;
    }
  }
  &-text {
    max-width: 100%;
    color: white;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    opacity: 0.97;
    user-select: none;
  }
}
</style>
