<template>
  <div class="wrapper">
    <img class="logo" src="@/assets/img/logo_uisi.png" alt="УрТИСИ" />
    <div class="cards-wrapper" v-for="group in groups" :key="group.id">
      <app-button
        v-for="card in group.content"
        :key="card.id"
        :width="cardMeasurements.width"
        :height="cardMeasurements.height"
        :borderRadius="cardMeasurements.borderRadius"
        :background="card.background"
        :isDisabled="card.isDisabled"
        titleText="Сначала выполните тест для допуска"
        @click.native="onClick(card.id)"
        >{{ card.title }}</app-button
      >
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES, GETTERS } from '../../constants'

import { getRandomString } from '@/utils/strings'

import AppButton from '@/components/common/AppButton'

export default {
  name: 'home',
  components: {
    'app-button': AppButton
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
              isDisabled: false,
              background: this.cardColors[0]
            },
            {
              id: getRandomString(),
              title: 'Теория',
              routeName: ROUTE_NAMES.THEORY,
              isDisabled: false,
              background: this.cardColors[1]
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
              isDisabled: !this.isAccessTestPassed,
              background: this.cardColors[2]
            },
            {
              id: getRandomString(),
              title: 'Финальный тест',
              routeName: ROUTE_NAMES.FINAL_TEST,
              isDisabled: !this.isAccessTestPassed,
              background: this.cardColors[3]
            }
          ]
        }
      ]
    }
  },
  data() {
    return {
      cardColors: ['red', 'purple', 'green', 'blue'],
      cardMeasurements: {
        width: 250,
        height: 250,
        borderRadius: 30
      }
    }
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
$cardSpacing: 50px;

.logo {
  z-index: -1;
  position: absolute;
  top: 10px;
  left: 10px;
  opacity: 0.7;
  transform: scale(0.9);
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
  height: 100vh;
}

.cards-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: $cardSpacing;
  &:last-child {
    margin-bottom: 0;
  }
  & > * {
    margin-right: $cardSpacing;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
