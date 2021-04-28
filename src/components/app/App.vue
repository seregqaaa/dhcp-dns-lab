<template>
  <div id="app">
    <img class="logo" src="@/assets/img/logo_uisi.png" alt="УрТИСИ" />
    <div class="wrapper">
      <div class="cards-wrapper" v-for="group in groups" :key="group.id">
        <main-card
          v-for="card in group.content"
          :key="card.id"
          :cardTitle="card.title"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomNumber } from '@/utils/numbers'

import MainCard from '@/components/common/MainCard'

export default {
  name: 'App',

  components: {
    'main-card': MainCard
  },
  data: () => ({
    groups: [
      {
        id: getRandomNumber(),
        content: [
          {
            id: getRandomNumber(),
            title: 'Тест для допуска'
          },
          {
            id: getRandomNumber(),
            title: 'Теория'
          }
        ]
      },
      {
        id: getRandomNumber(),
        content: [
          {
            id: getRandomNumber(),
            title: 'Практика'
          },
          {
            id: getRandomNumber(),
            title: 'Финальный тест'
          }
        ]
      }
    ]
  })
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

.logo {
  position: absolute;
  top: 10px;
  left: 10px;
  opacity: 0.65;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 1;
  }
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
</style>
