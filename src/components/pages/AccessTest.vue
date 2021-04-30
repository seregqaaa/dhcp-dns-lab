<template>
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
    <app-button @click.native="onComplete">Подтвердить</app-button>
  </div>
</template>

<script>
import { ACTIONS, GETTERS } from '../../constants'

import ApiManager from '@/api/Manager'

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
    }
  },
  data() {
    return {
      answers: {}
    }
  },
  methods: {
    onAnswer({ itemId, optionId }) {
      this.answers[itemId] = optionId
    },
    async onComplete() {
      const res = await ApiManager.accessTest.getResult(this.answers)
      await this.$store.dispatch(ACTIONS.SET_ACCESS_TEST_PASSED_STATUS, {
        isAccessTestPassed: true
      })
      console.log(res)
    }
  },
  async created() {
    await this.$store.dispatch(ACTIONS.FETCH_ACCESS_TEST)
  }
}
</script>

<style lang="scss">
.access-test {
  &-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: 3rem;
  }
  &-title {
    color: #000000;
    font-size: 2.4rem;
    margin-bottom: 3rem;
    padding: 1rem 2rem 0.5rem 2rem;
    text-align: center;
    border-bottom: 0.2rem solid #ff5f6d;
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
    & > li {
      margin-bottom: 3rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
