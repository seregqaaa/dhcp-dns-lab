<template>
  <div class="access-test-wrapper">
    <h1>Тест для допуска</h1>
    <ol class="access-test">
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

<style></style>
