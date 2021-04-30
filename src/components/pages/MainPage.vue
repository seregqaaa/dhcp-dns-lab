<template>
  <div class="wrapper">
    <img class="logo" src="@/assets/img/logo_uisi.png" alt="УрТИСИ" />
    <div class="cards-wrapper" v-for="group in groups" :key="group.id">
      <app-card
        v-for="card in group.content"
        :key="card.id"
        :cardTitle="card.title"
        :isDisabled="card.isDisabled"
        @click.native="onClick(card.id)"
      />
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES, GETTERS } from '../../constants'

import { getRandomString } from '@/utils/strings'

import AppCard from '@/components/common/AppCard'

export default {
  name: 'home',
  components: {
    'app-card': AppCard
  },
  computed: {
    isAccessTestPassed() {
      return this.$store.getters[GETTERS.GET_ACCESS_TEST_PASSED_STATUS]
    },
    groups() {
      return [
        {
          id: 'group-1',
          content: [
            {
              id: getRandomString(),
              title: 'Тест для допуска',
              routeName: ROUTE_NAMES.ACCESS_TEST,
              isDisabled: false
            },
            {
              id: getRandomString(),
              title: 'Теория',
              routeName: ROUTE_NAMES.THEORY,
              isDisabled: false
            }
          ]
        },
        {
          id: 'group-2',
          content: [
            {
              id: getRandomString(),
              title: 'Практика',
              routeName: ROUTE_NAMES.PRACTICE,
              isDisabled: !this.isAccessTestPassed
            },
            {
              id: getRandomString(),
              title: 'Финальный тест',
              routeName: ROUTE_NAMES.FINAL_TEST,
              isDisabled: !this.isAccessTestPassed
            }
          ]
        }
      ]
    }
  },
  data() {
    return {}
  },
  methods: {
    onClick(cardId) {
      const card = this.groups
        .flatMap(group => group.content)
        .find(card => card.id === cardId)

      if (!card.isDisabled) this.$router.push({ name: card.routeName })
    }
  }
}
</script>

<style lang="scss">
.logo {
  position: absolute;
  top: 10px;
  left: 10px;
  opacity: 0.7;
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
