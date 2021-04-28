<template>
  <div id="app">
    <div class="wrapper">
      <div class="cards-wrapper">
        <div class="card-container">
          <span class="card-text">
            Тест для допуска
          </span>
        </div>
        <div class="card-container">
          <span class="card-text">
            Теория
          </span>
        </div>
      </div>
      <div class="cards-wrapper">
        <div class="card-container">
          <span class="card-text">
            Практика
          </span>
        </div>
        <div class="card-container">
          <span class="card-text">
            Финальный тест
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 20px 40px;
}

.cards-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  &:last-child {
    margin-bottom: 0;
  }
}

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
  }
}

@media (max-width: 1000px) {
}
</style>
