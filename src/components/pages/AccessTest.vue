<template>
  <div class="access-test-page">
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
        :isDisabled="!isAllAnswered"
        titleText="Ответьте на все вопросы"
        @click.native="onComplete"
        >Подтвердить</app-button
      >
    </div>
    <div class="progress-wrapper">
      <div
        class="progress-bar red to-right"
        :style="`width: ${testProgress}%`"
      ></div>
      <span class="progress-text">{{ testProgress }}%</span>
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
    }
  },
  data() {
    return {
      answers: {},
      testProgress: 0
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
        if (this.testProgress === progress) {
          clearInterval(intervalId)
        }
      }, 10)
    }
  },
  async created() {
    await this.$store.dispatch(ACTIONS.FETCH_ACCESS_TEST)
  }
}
</script>

<style lang="scss">
$redColor: #ff5f6d;

.access-test {
  &-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: 5rem;
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

$progressHeight: 30px;
.progress {
  &-wrapper {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.1);
    bottom: 0;
    height: $progressHeight;
    width: 100%;
  }
  &-bar {
    position: absolute;
    height: $progressHeight;
    transition: width 0.133s linear;
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
  }
}
</style>
