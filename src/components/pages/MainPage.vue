<template>
  <div class="wrapper">
    <img class="logo" src="@/assets/img/logo_uisi.png" alt="УрТИСИ" />
    <div class="cards-wrapper" v-for="group in groups" :key="group.id">
      <main-card
        v-for="card in group.content"
        :key="card.id"
        :cardTitle="card.title"
        @click.native="onClick(card.id)"
      />
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from '@/constants'

import { getRandomNumber } from '@/utils/numbers'

import MainCard from '@/components/common/MainCard'

export default {
  name: 'home',
  components: {
    'main-card': MainCard
  },
  data() {
    return {
      groups: [
        {
          id: getRandomNumber(),
          content: [
            {
              id: getRandomNumber(),
              title: 'Тест для допуска',
              routeName: ROUTE_NAMES.ACCESS_TEST
            },
            {
              id: getRandomNumber(),
              title: 'Теория',
              routeName: ROUTE_NAMES.THEORY
            }
          ]
        },
        {
          id: getRandomNumber(),
          content: [
            {
              id: getRandomNumber(),
              title: 'Практика',
              routeName: ROUTE_NAMES.PRACTICE
            },
            {
              id: getRandomNumber(),
              title: 'Финальный тест',
              routeName: ROUTE_NAMES.FINAL_TEST
            }
          ]
        }
      ]
    }
  },
  methods: {
    onClick(cardId) {
      const card = this.groups
        .flatMap(group => group.content)
        .find(card => card.id === cardId)
      this.$router.push({ name: card.routeName })
    }
  }
}
</script>

<style lang="scss">
.logo {
  position: absolute;
  top: 10px;
  left: 10px;
  opacity: 0.5;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 1;
  }
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 94vh;
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
