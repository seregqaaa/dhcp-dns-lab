<template>
  <div class="access-test-page" ref="accessTestPage">
    <div class="access-test-wrapper">
      <h1 class="access-test-title">Тест для допуска</h1>
      <ol class="access-test-list" v-if="testItems && testItems.length">
        <test-item
          v-for="item in testItems"
          :key="item.id"
          :itemId="item.id"
          :options="item.options"
          @on-answer="onAnswer"
        >
          {{ item.title }}
        </test-item>
      </ol>
      <app-button
        background="red"
        :class="`${completedClassName} to-right`"
        :isDisabled="!isAllAnswered"
        titleText="Ответьте на все вопросы"
        @click.native="onComplete"
        @keypress.enter.prevent
        @keypress.space.prevent
        @keypress.tab.prevent
        >Подтвердить</app-button
      >
    </div>
    <div
      v-if="isProgressRendered"
      :class="
        `progress-wrapper ${completedClassName} ${filledClass} ${
          isAllAnswered ? 'red to-right' : ''
        }`
      "
    >
      <div
        :class="`progress-bar red to-right ${filledClass}`"
        :style="`width: ${testProgress}%`"
      ></div>
      <span
        :class="
          `progress-text ${
            isProgressVisible ? filledClass : ''
          } ${completedClassName}`
        "
        >{{ progressBarText }}</span
      >
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import { ACTIONS, GETTERS } from '../../constants'

import AppButton from '@/components/common/AppButton'
import TestItem from '@/components/common/TestItem'

export default {
  name: 'access-test',
  components: {
    'app-button': AppButton,
    'test-item': TestItem
  },
  computed: {
    testItems() {
      return this.$store.getters[GETTERS.GET_ACCESS_TEST]
    },
    isPassed() {
      return this.$store.getters[GETTERS.GET_ACCESS_TEST_PASSED_STATUS]
    },
    isAllAnswered() {
      return this.testProgress === 100
    },
    progressBarText() {
      return this.isProgressVisible ? this.testProgress + '%' : 'Подтвердить'
    },
    filledClass() {
      return this.isAllAnswered ? 'filled' : ''
    }
  },
  data() {
    return {
      answers: {},
      testProgress: 0,
      isProgressVisible: true,
      isProgressRendered: true,
      completedClassName: ''
    }
  },
  methods: {
    onAnswer({ itemId, optionId }) {
      Vue.set(this.answers, itemId, optionId)
    },
    async onComplete() {
      await this.$store.dispatch(ACTIONS.SEND_ACCESS_TEST_RESULT, {
        answers: this.answers
      })
      console.log(this.isPassed)
    }
  },
  watch: {
    answers: function(answers) {
      const answersLen = Object.keys(answers).length
      const progress =
        answersLen > 0
          ? Math.trunc((answersLen / this.testItems.length) * 100)
          : 0
      const intervalId = setInterval(() => {
        if (this.testProgress < progress) {
          this.testProgress++
        }
        if (this.isAllAnswered) {
          clearInterval(intervalId)
        }
      }, 10)
    },
    isAllAnswered: function(isAllAnswered) {
      if (isAllAnswered) {
        window.scrollTo(
          { top: document.documentElement.scrollTop, behavior: 'smooth' },
          document.body.scrollHeight
        )
        const firstTimeout = setTimeout(() => {
          this.isProgressVisible = false
          clearTimeout(firstTimeout)
        }, 300)
        const secondTimeout = setTimeout(() => {
          this.completedClassName = 'completed'
          clearTimeout(secondTimeout)
        }, 1000)
        const thirdTimeout = setTimeout(() => {
          this.isProgressRendered = false
          clearTimeout(thirdTimeout)
        }, 2000)
      }
    }
  },
  async created() {
    await this.$store.dispatch(ACTIONS.FETCH_ACCESS_TEST)
  }
}
</script>

<style lang="scss">
$redColor: #ff5f6d;
$bottomSpacing: 5rem;

html {
  scroll-behavior: smooth;
}

.access-test {
  &-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: $bottomSpacing;
    & > button.btn {
      opacity: 0 !important;
      transition: opacity 0.1s ease-in 0.5s, box-shadow 0.2s ease;
      &.completed {
        opacity: 1 !important;
        z-index: 1;
      }
    }
  }
  &-title {
    color: #000000;
    font-size: 2.4rem;
    margin-bottom: 3rem;
    padding: 1rem 2rem 0.5rem 2rem;
    text-align: center;
    border-bottom: 0.2rem solid $redColor;
    transition: padding 0.3s ease;
    cursor: default;
    &:hover {
      padding: 1rem 5rem 0.5rem 5rem;
    }
  }
  &-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4rem;
  }
}

:root {
  --filled-width: 230px;
}

$progressHeight: 30px;
$filledHeight: 50px;
$filledWidth: var(--filled-width);
$filledRadius: 30px;

.progress {
  &-wrapper {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.1);
    left: 0;
    bottom: 0;
    height: $progressHeight;
    width: 100%;
    transition-property: width, border-radius, height, left, bottom, opacity;
    transition-duration: 1s;
    transition-delay: 0.6s;
    transition-timing-function: ease;
    display: flex;
    justify-content: center;
    align-items: center;
    &.filled {
      left: calc(50% - var(--filled-width) / 2);
      bottom: $bottomSpacing;
      width: $filledWidth;
      height: $filledHeight;
      border-radius: $filledRadius;
    }
    &.completed {
      opacity: 0;
    }
  }
  &-bar {
    position: absolute;
    height: $progressHeight;
    transition: width 0.133s linear, opacity 0.2s ease;
    &.filled {
      opacity: 0;
    }
  }
  &-text {
    z-index: 1;
    width: 100%;
    color: #ffffff;
    line-height: $progressHeight;
    position: absolute;
    text-align: center;
    font-size: 1.4rem;
    font-weight: 700;
    transition-property: font-size, opacity;
    transition-duration: 0.5s;
    transition-timing-function: ease;
    &.filled {
      opacity: 0;
      font-size: 0;
    }
    &.completed {
      font-size: 1.6rem;
    }
  }
}
</style>
