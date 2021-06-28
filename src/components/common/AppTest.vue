<template>
  <div
    class="test-page"
    :class="{ completed: isModalActive }"
    key="accessTestPage"
    ref="accessTestPage"
  >
    <div class="test-wrapper">
      <h1 class="test-title">{{ testTitle }}</h1>
      <transition appear name="fade">
        <ol v-if="testItems && testItems.length" class="test-list">
          <transition-group appear name="list">
            <test-item
              v-for="item in testItems"
              :key="item.id"
              :isCorrect="testResult[item.id]"
              :itemId="item.id"
              :options="item.options"
              @on-answer="onAnswer"
            >
              {{ item.title }}
            </test-item>
          </transition-group>
          <div class="test-block-backplate" v-if="isBackplateEnabled"></div>
        </ol>
      </transition>
      <app-button
        background="red"
        :class="`${completedClassName} to-right`"
        :isDisabled="!isAllAnswered"
        titleText="Ответьте на все вопросы"
        @click.native="onComplete"
        >{{ submitButtonText }}</app-button
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
</template>

<script>
import Vue from 'vue'

import { GETTERS } from '@/constants'

import AppButton from '@/components/common/AppButton.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import TestItem from '@/components/common/TestItem.vue'

export default {
  name: 'app-test',
  components: {
    'app-button': AppButton,
    'progress-bar': ProgressBar,
    'test-item': TestItem
  },
  props: {
    isPassed: {
      type: Boolean
    },
    testResult: {
      type: Object,
      default: () => ({})
    },
    testItems: {
      type: Array,
      required: true
    },
    testTitle: {
      type: String,
      required: true
    },
    submitButtonText: {
      type: String,
      default: 'Проверить'
    },
    isBackplateEnabled: {
      type: Boolean,
      default: false
    },
    testLength: {
      type: Number,
      required: true
    }
  },
  computed: {
    filledClass() {
      return this.isAllAnswered ? 'filled' : ''
    },
    isAllAnswered() {
      return this.testProgress === 100
    },
    progressBarText() {
      return this.isProgressVisible ? this.testProgress + '%' : 'Проверить'
    },
    isModalActive() {
      return this.$store.getters[GETTERS.GET_IS_MODAL_ACTIVE]
    }
  },
  data() {
    return {
      answers: {},
      completedClassName: '',
      isLoadCompleted: false,
      isProgressRendered: true,
      isProgressVisible: true,
      isRestartDebounced: false,
      isTestCompleted: false,
      testProgress: 0
    }
  },
  methods: {
    onComplete() {
      this.$emit('on-complete', { answers: this.answers })
      this.isTestCompleted = true
    },
    onRestart() {
      this.answers = {}
      this.completedClassName = ''
      this.isLoadCompleted = false
      this.isProgressRendered = true
      this.isProgressVisible = true
      this.isRestartDebounced = false
      this.isTestCompleted = false
      this.testProgress = 0
    },
    onAnswer({ itemId, optionId }) {
      Vue.set(this.answers, itemId, optionId)
    }
  },
  watch: {
    answers: function(answers) {
      const answersLen = Object.keys(answers).length
      const progress =
        answersLen > 0 ? Math.trunc((answersLen / this.testLength) * 100) : 0
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
    },
    isTestCompleted: {
      immediate: true,
      handler: function(isTestCompleted) {
        this.$emit('on-test-completed-change', isTestCompleted)
      }
    }
  },
  mounted() {
    this.$root.$on('on-test-restart', this.onRestart)
  },
  beforeDestroy() {
    this.$root.$off('on-test-restart')
  }
}
</script>

<style lang="scss">
@import '~assets/transition.scss';

$redColor: #ee7d3b;
$bottomSpacing: 5rem;

.test {
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
  &-block-backplate {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: transparent;
    z-index: 10;
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
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4rem;
  }
}
</style>
