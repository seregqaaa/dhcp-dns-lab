<template>
  <div class="access-test-wrapper">
    <h1>Тест для допуска</h1>
    <app-button>Подтвердить</app-button>
  </div>
</template>

<script>
import ApiManager from '@/api/Manager'

import AppButton from '@/components/common/AppButton'

export default {
  name: 'access-test',
  components: {
    'app-button': AppButton
  },
  data() {
    return {
      test: []
    }
  },
  methods: {
    async getTest() {
      return ApiManager.accessTest.getTest()
    }
  },
  async created() {
    try {
      this.test = [...(await this.getTest())]
      console.log(this.test)
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style></style>
