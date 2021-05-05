<template>
  <transition appear name="fade">
    <div class="wrapper">
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
          @click.native.prevent="onClick(card.id)"
          >{{ card.title }}</app-button
        >
      </div>
    </div>
  </transition>
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

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
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

@media (max-width: 640px) {
  $vSpacing: 3rem;

  .cards-wrapper {
    flex-direction: column;
    padding-top: $vSpacing;
    transition: padding 0.3s ease;
    &:last-child {
      padding-top: 0;
      padding-bottom: $vSpacing;
      margin-bottom: 0;
    }
    & > * {
      margin-bottom: $cardSpacing;
      margin-right: 0;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
