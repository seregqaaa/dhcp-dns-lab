<template>
  <transition-group appear name="fade">
    <div
      class="access-test-page"
      :class="{
        completed: isTestCompleted
      }"
      key="accessTestPage"
      ref="accessTestPage"
    >
      <div class="access-test-wrapper">
        <h1 class="access-test-title">Тест для допуска</h1>
        <transition appear name="fade">
          <ol v-if="testItems && testItems.length" class="access-test-list">
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
          <h3 v-else style="position: absolute; top: 10rem;">
            Загрузка
          </h3>
        </transition>
        <app-button
          background="red"
          :class="`${completedClassName} to-right`"
          :isDisabled="!isAllAnswered"
          titleText="Ответьте на все вопросы"
          @click.native="onComplete"
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
    <app-modal v-if="isTestCompleted" key="modal-window">
      <transition appear name="fade">
        <div class="modal-content">
          <h3 :class="`modal-title${isPassed ? ' passed' : ' failed'}`">
            {{ `Тест${isPassed ? '' : ' не'} пройден` }}
          </h3>
          <div class="modal-buttons">
            <router-link
              key="homeLink"
              :to="{ name: 'home' }"
              style="border-radius: 25px;"
            >
              <app-button
                :height="homeButtonSize"
                :width="homeButtonSize"
                :shadowed="false"
                ><home-icon
              /></app-button>
            </router-link>
            <app-button
              v-if="!isPassed"
              key="restartButton"
              :height="homeButtonSize"
              :width="homeButtonSize"
              :shadowed="false"
              @click.native="onRestart"
              ><refresh-icon
            /></app-button>
          </div>
        </div>
      </transition>
    </app-modal>
  </transition-group>
</template>

<script>
import Vue from 'vue'

import { ACTIONS, GETTERS } from '../../constants'

import AppButton from '@/components/common/AppButton'
import AppModal from '@/components/common/AppModal'
import TestItem from '@/components/common/TestItem'
import ProgressBar from '@/components/common/ProgressBar'

import HomeIcon from '@/components/common/icons/HomeIcon'
import RefreshIcon from '@/components/common/icons/RefreshIcon'

export default {
  name: 'access-test',
  components: {
    'app-button': AppButton,
    'app-modal': AppModal,
    'home-icon': HomeIcon,
    'progress-bar': ProgressBar,
    'refresh-icon': RefreshIcon,
    'test-item': TestItem
  },
  computed: {
    filledClass() {
      return this.isAllAnswered ? 'filled' : ''
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
    testItems() {
      return this.$store.getters[GETTERS.GET_ACCESS_TEST]
    }
  },
  data() {
    return {
      answers: {},
      completedClassName: '',
      homeButtonSize: 150,
      isProgressRendered: true,
      isProgressVisible: true,
      isRestartDebounced: false,
      isTestCompleted: false,
      testProgress: 0
    }
  },
  methods: {
    async onComplete() {
      await this.$store.dispatch(ACTIONS.SEND_ACCESS_TEST_RESULT, {
        answers: this.answers
      })
      this.isTestCompleted = true
      console.log(this.isPassed)
    },
    async fetchTest() {
      await this.$store.dispatch(ACTIONS.FETCH_ACCESS_TEST)
    },
    onAnswer({ itemId, optionId }) {
      Vue.set(this.answers, itemId, optionId)
    },
    async onRestart() {
      if (this.isRestartDebounced) return
      this.isRestartDebounced = true
      const timeoutId = setTimeout(() => {
        this.isRestartDebounced = false
        clearTimeout(timeoutId)
      }, 1000)
      await this.fetchTest()
      this.answers = {}
      this.completedClassName = ''
      this.isProgressRendered = true
      this.isProgressVisible = true
      this.isTestCompleted = false
      this.testProgress = 0
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
      }, 15)
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
    if (!this.testItems?.length) {
      await this.fetchTest()
    }
  }
}
</script>

<style lang="scss">
$redColor: #ee7d3b;
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
  transform: translateY(50px), scale(1.2);
}

.access-test {
  &-page {
    transition: filter 0.5s ease 0.5s;
    &.completed * {
      filter: blur(4px);
    }
  }
  &-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 2rem $bottomSpacing;
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

.modal {
  &-title {
    font-size: 1.8rem;
    text-align: center;
    padding-bottom: 3rem;
    &.passed {
      color: rgb(50, 150, 50);
    }
    &.failed {
      color: rgb(200, 50, 50);
    }
  }
  &-buttons {
    display: flex;
    justify-content: center;
    & svg {
      width: 48px;
      height: 48px;
    }
    & > *:first-child:not(:last-child) {
      padding-right: 30px;
    }
  }
}
</style>
