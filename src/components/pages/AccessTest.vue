<template>
  <div class="access-test-wrapper">
    <h1 class="access-test-title">Тест для допуска</h1>
    <ol class="access-test-list">
      <test-item
        v-for="item in testItems"
        :key="item.id"
        :itemId="item.id"
        :options="item.options"
      >
        {{ item.title }}
      </test-item>
    </ol>
    <app-button>Подтвердить</app-button>
  </div>
</template>

<script>
import ApiManager from '@/api/Manager'

import AppButton from '@/components/common/AppButton'
import TestItem from '@/components/common/TestItem'

export default {
  name: 'access-test',
  components: {
    'app-button': AppButton,
    'test-item': TestItem
  },
  data() {
    return {
      testItems: [],
      answers: []
    }
  },
  methods: {
    async getTest() {
      return ApiManager.accessTest.getTest()
    }
  },
  async created() {
    try {
      this.testItems = [...(await this.getTest())]
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style lang="scss">
.access-test {
  &-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
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
