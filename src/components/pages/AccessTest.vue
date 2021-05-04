<template>
  <transition appear name="fade">
    <div class="access-test-page" ref="accessTestPage">
      <div class="access-test-wrapper">
        <h1 class="access-test-title">Тест для допуска</h1>
        <transition appear name="fade">
          <ol class="access-test-list" v-if="testItems && testItems.length">
            <transition-group appear name="list">
              <test-item
                v-for="item in testItems"
                :key="item.id"
                :itemId="item.id"
                :options="item.options"
                @on-answer="onAnswer"
              >
                {{ item.title }}
              </test-item>
            </transition-group>
          </ol>
          <h3 style="position: absolute; top: 10rem;" v-else>Загрузка</h3>
        </transition>
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
      <progress-bar
        v-if="isProgressRendered"
        :completedClassName="completedClassName"
        :filledClass="filledClass"
        :isAllAnswered="isAllAnswered"
        :isProgressVisible="isProgressVisible"
        :testProgress="testProgress"
        >{{ progressBarText }}</progress-bar
      >
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'

import { ACTIONS, GETTERS } from '../../constants'

import AppButton from '@/components/common/AppButton'
import TestItem from '@/components/common/TestItem'
import ProgressBar from '@/components/common/ProgressBar'

export default {
  name: 'access-test',
  components: {
    'app-button': AppButton,
    'test-item': TestItem,
    'progress-bar': ProgressBar
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
  overflow-y: scroll;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
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
</style>
