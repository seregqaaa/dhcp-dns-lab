<template>
  <transition appear name="fade">
    <div class="wrapper">
      <header class="header" ref="pageHeader">
        <h1 class="header-title">
          Принципы работы DHCP, DNS и почтового серверов
        </h1>
      </header>
      <app-button
        v-for="card in cards"
        :key="card.id"
        :width="cardMeasurements.width"
        :height="cardMeasurements.height"
        :borderRadius="cardMeasurements.borderRadius"
        :background="card.background"
        :isDisabled="card.isDisabled"
        :isCompleted="card.isPassed"
        titleText="Сначала выполните тест для допуска"
        @click.native.prevent="onClick(card.id)"
        >{{ card.title }}</app-button
      >
      <app-button
        :key="finalTestCard.id"
        :width="cardMeasurements.width"
        :height="cardMeasurements.height"
        :borderRadius="cardMeasurements.borderRadius"
        :background="finalTestCard.background"
        :isDisabled="finalTestCard.isDisabled"
        :isCompleted="finalTestCard.isPassed"
        titleText="Сначала выполните тест для допуска"
        @click.native.prevent="onClick(finalTestCard.id)"
      >
        {{ finalTestCard.title }}
      </app-button>
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
    attemptsCount() {
      return this.$store.getters[GETTERS.GET_FINAL_TEST_ATTEMPTS_COUNTER]
    },
    finalTestDisabledUntil() {
      return this.$store.getters[GETTERS.GET_FINAL_TEST_DISABLED_UNTIL]
    },
    finalTestTimer() {
      const dateTime = Date.now()
      if (
        this.finalTestDisabledUntil &&
        dateTime < this.finalTestDisabledUntil
      ) {
        const formatTime = time =>
          `${time.toString().length < 2 ? '0' : ''}${time}`

        const minutes = Math.trunc(this.finalTestTimeout / (1000 * 60))
        const seconds = Math.trunc((this.finalTestTimeout / 1000) % 60)

        return `${minutes}:${formatTime(seconds)}`
      }
      return null
    },
    cards() {
      return [
        {
          id: getRandomString(),
          title: 'Тест для допуска',
          routeName: ROUTE_NAMES.ACCESS_TEST,
          isDisabled: this.isAccessTestPassed,
          isPassed: this.isAccessTestPassed,
          background: this.cardColors[0]
        },
        {
          id: getRandomString(),
          title: 'Теория',
          routeName: ROUTE_NAMES.THEORY,
          isDisabled: false,
          background: this.cardColors[1]
        },
        {
          id: getRandomString(),
          title: 'Практика',
          routeName: ROUTE_NAMES.PRACTICE,
          isDisabled: !this.isAccessTestPassed,
          background: this.cardColors[2]
        }
      ]
    },
    finalTestCard() {
      return {
        id: getRandomString(),
        title: this.attemptsCount
          ? `Финальный тест, осталось попыток: ${this.attemptsCount}`
          : this.finalTestTimer,
        routeName: ROUTE_NAMES.FINAL_TEST,
        isDisabled:
          !this.isAccessTestPassed ||
          (!this.attemptsCount && !!this.finalTestTimeout),
        background: this.cardColors[3]
      }
    }
  },
  data() {
    return {
      headerTimeout: null,
      cardColors: ['red', 'purple', 'green', 'blue'],
      cardMeasurements: {
        width: 250,
        height: 250,
        borderRadius: 30
      },
      finalTestTimeout: 0
    }
  },
  methods: {
    onClick(cardId) {
      const card =
        this.cards.find(card => card.id === cardId) ?? this.finalTestCard

      if (!card.isDisabled) this.$router.push({ name: card.routeName })
    }
  },
  mounted() {
    this.headerTimeout = setTimeout(() => {
      clearTimeout(this.headerTimeout)
      this.$refs.pageHeader.classList.add('hidden')
    }, 5000)

    this.finalTestTimeout =
      this.finalTestDisabledUntil && this.finalTestDisabledUntil > Date.now()
        ? this.finalTestDisabledUntil - Date.now()
        : 0

    if (this.finalTestTimeout) {
      const intervalId = setInterval(() => {
        this.finalTestTimeout -= 1000
        if (this.finalTestTimeout <= 0) {
          clearInterval(intervalId)
          this.finalTestTimeout = 0
          this.$store.state.attemptsCount = 1
        }
      }, 1000)
    }
  },
  beforeDestroy() {
    if (this.headerTimeout) {
      clearTimeout(this.headerTimeout)
      this.headerTimeout = null
    }
  }
}
</script>

<style lang="scss">
$headerBorderRadius: 25px;

.header {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  opacity: 0.8;
  background: #ffe259;
  background: -webkit-linear-gradient(to right, #ffa751, #ffe259);
  background: linear-gradient(to right, #ffa751, #ffe259);
  border-bottom-left-radius: $headerBorderRadius;
  border-bottom-right-radius: $headerBorderRadius;
  transition: top 0.2s ease, opacity 0.2s ease;
  &-title {
    font-size: 1.6rem;
    text-align: center;
    color: #ffffff;
    transition: font-size 0.2s ease;
  }
  &.hidden {
    top: -50px;
    opacity: 0.3;
    &:hover {
      top: 0;
      opacity: 0.8;
    }
  }
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  width: 100%;
  min-height: 100vh;
  padding: 8rem 2rem;
  gap: 3rem;
  transition: padding 0.2s ease;
}

@media (max-width: 600px) {
  .header {
    &-title {
      font-size: 1.2rem;
    }
    &.hidden {
      top: -70px;
    }
  }

  .wrapper {
    padding: 10rem 2rem;
  }
}
</style>
