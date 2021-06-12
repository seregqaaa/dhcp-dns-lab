<template>
  <transition appear name="fade">
    <div v-if="isAuthorized" class="wrapper">
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
        :completedTitleText="card.completedTitleText"
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
        :completedTitleText="finalTestCard.completedTitleText"
        :isDisabled="finalTestCard.isDisabled"
        :isCompleted="finalTestCard.isPassed"
        titleText="Сначала выполните тест для допуска"
        @click.native.prevent="onClick(finalTestCard.id)"
      >
        {{ finalTestCard.title }}
      </app-button>
    </div>
    <app-modal v-else>
      <div class="auth-wrapper" @keypress.enter="onAuth">
        <div class="auth-input">
          <label for="user-group">Группа</label>
          <input
            id="user-group"
            ref="userGroup"
            type="text"
            placeholder="ИТ-01б или 078"
            v-model="userGroup"
          />
        </div>
        <div class="auth-input">
          <label for="user-name">ФИО</label>
          <input
            id="user-name"
            ref="userName"
            type="text"
            placeholder="Иванов И.И."
            v-model="userName"
          />
        </div>
        <app-button
          background="red"
          :width="150"
          :height="35"
          :isDisabled="!this.userName.trim() || !this.userGroup.trim()"
          @click.native="onAuth"
          >Далее</app-button
        >
      </div>
    </app-modal>
  </transition>
</template>

<script>
import { ROUTE_NAMES, GETTERS, ACTIONS } from '@/constants'

import { getRandomString } from '@/utils/strings'

import AppButton from '@/components/common/AppButton.vue'
import AppModal from '@/components/common/AppModal.vue'

export default {
  name: 'home',
  components: {
    'app-button': AppButton,
    'app-modal': AppModal
  },
  computed: {
    isAuthorized() {
      return this.$store.getters[GETTERS.GET_USER_AUTH_STATUS]
    },
    isAccessTestPassed() {
      return this.$store.getters[GETTERS.GET_ACCESS_TEST_PASSED_STATUS]
    },
    isFinalTestPassed() {
      return this.$store.getters[GETTERS.GET_FINAL_TEST_PASSED_STATUS]
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
          background: this.cardColors[0],
          completedTitleText: 'Тест для допуска уже пройден'
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
          this.isFinalTestPassed ||
          !this.isAccessTestPassed ||
          (!this.attemptsCount && !!this.finalTestTimeout),
        isPassed: this.isFinalTestPassed,
        background: this.cardColors[3],
        completedTitleText: 'Финальный тест уже пройден'
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
      finalTestTimeout: 0,
      userGroup: '',
      userName: '',
      isAuthDebounced: false
    }
  },
  methods: {
    onClick(cardId) {
      const card =
        this.cards.find(card => card.id === cardId) ?? this.finalTestCard

      if (!card.isDisabled) this.$router.push({ name: card.routeName })
    },
    onAuth() {
      if (this.isAuthDebounced) return
      this.isAuthDebounced = true
      const timeoutId = setTimeout(() => {
        this.isAuthDebounced = false
        clearTimeout(timeoutId)
      }, 1000)
      const userGroup = this.userGroup.trim()
      const userName = this.userName.trim().replace(/\. /, '.')
      if (userGroup && userName) {
        const throwError = (key, text) => {
          this[key] = ''
          const placeholder = this.$refs[key].placeholder
          this.$refs[key].placeholder = text
          const timeoutId = setTimeout(() => {
            this.$refs[key].placeholder = placeholder
            clearTimeout(timeoutId)
          }, 2000)
        }
        if (
          (userGroup.length <= 3 && !/[0-9]{3}/.test(userGroup)) ||
          (userGroup.length > 3 && !/[А-Я]{2}-[0-9]{2}[а-я]$/.test(userGroup))
        ) {
          throwError('userGroup', 'Группа указана некорректно')
        } else if (
          userName.length < 6 ||
          !/[А-Я][а-я]{1,} [А-Я]\.[А-Я]\.$/.test(userName)
        ) {
          throwError('userName', 'Имя указано некорректно')
        } else {
          this.$store
            .dispatch(ACTIONS.SET_USER_DATA, {
              name: userName,
              group: userGroup
            })
            .then(this.hideHeader)
        }
      }
    },
    hideHeader() {
      this.headerTimeout = setTimeout(() => {
        clearTimeout(this.headerTimeout)
        this.$refs.pageHeader.classList.add('hidden')
      }, 5000)
    }
  },
  mounted() {
    if (this.isAuthorized) {
      this.hideHeader()
    }

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
@import '@/assets/transition.scss';

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

.auth {
  &-wrapper {
    padding-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > .auth-input {
      margin-bottom: 50px;
      &:not(:first-child) {
        margin-bottom: 30px;
      }
    }
  }
  &-input {
    position: relative;
    & * {
      display: block;
    }
    & > input {
      width: 230px;
      height: 40px;
      padding: 5px 20px;
      border: none;
      border-radius: $headerBorderRadius;
      box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.15);
      font-size: 16px;
      font-weight: 700;
      color: #5a5a5a;
      &::placeholder {
        font-size: 12px;
        font-weight: 400;
        font-style: italic;
      }
    }
    & > label {
      position: absolute;
      left: 20px;
      top: -20px;
    }
  }
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
