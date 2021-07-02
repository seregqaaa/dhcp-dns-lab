<template>
  <transition-group appear name="fade">
    <app-test
      v-if="testItems && testItems.length"
      key="app-test"
      testTitle="Финальный тест"
      :testItems="testItems"
      :testResult="testResult"
      :submitButtonText="submitButtonText"
      :isBackplateEnabled="isBackplateEnabled"
      :testLength="15"
      @on-complete="onComplete"
      @on-test-completed-change="onTestCompletedChange"
    ></app-test>
    <app-loader key="loader" v-else></app-loader>
    <app-modal v-if="isTestCompleted && isModalActive" key="modal-window">
      <transition appear name="fade">
        <div class="modal-content">
          <h3 :class="`modal-title${isPassed ? ' passed' : ' failed'}`">
            {{ `Тест${isPassed ? '' : ' не'} пройден` }}
          </h3>
          <div class="modal-options">
            <app-button v-if="isPassed" background="red" :width="300">
              <a :href="tableLink" rel="noopener noreferrer"
                >Таблица результатов</a
              >
            </app-button>
            <app-button
              v-else
              background="red"
              :width="320"
              @click.native="onLookErrors"
            >
              Посмотреть результат
            </app-button>
          </div>
        </div>
      </transition>
    </app-modal>
    <app-loader key="complete-loader" v-if="isLoaderVisible"></app-loader>
  </transition-group>
</template>

<script>
import { ACTIONS, GETTERS, ROUTE_NAMES, url } from '@/constants'

import AppButton from '@/components/common/AppButton.vue'
import AppLoader from '@/components/common/AppLoader.vue'
import AppModal from '@/components/common/AppModal.vue'
import AppTest from '@/components/common/AppTest.vue'

export default {
  name: 'final-test',
  components: {
    'app-button': AppButton,
    'app-modal': AppModal,
    'app-test': AppTest,
    'app-loader': AppLoader
  },
  computed: {
    testItems() {
      return this.$store.getters[GETTERS.GET_FINAL_TEST]
    },
    isModalActive() {
      return this.$store.getters[GETTERS.GET_IS_MODAL_ACTIVE]
    },
    testResult() {
      return this.$store.getters[GETTERS.GET_FINAL_TEST_RESULT]
    },
    isPassed() {
      return this.$store.getters[GETTERS.GET_FINAL_TEST_PASSED_STATUS]
    },
    attemptsCount() {
      return this.$store.getters[GETTERS.GET_FINAL_TEST_ATTEMPTS_COUNTER]
    },
    submitButtonText() {
      return this.attemptsCount === 0
        ? 'На главную'
        : Object.keys(this.testResult).length && !this.isPassed
        ? 'Повторить'
        : undefined
    }
  },
  data() {
    return {
      isTestCompleted: false,
      homeButtonSize: 150,
      isBackplateEnabled: false,
      isLoaderVisible: false,
      tableLink: url.sheet
    }
  },
  methods: {
    async onComplete(payload) {
      this.isLoaderVisible = true
      if (!this.submitButtonText) {
        await this.$store.dispatch(ACTIONS.SEND_FINAL_TEST_RESULT, {
          answers: payload.answers
        })
        this.isLoaderVisible = false
        this.setModalStatus(true)
      } else {
        if (this.attemptsCount) {
          await this.onRestart()
        } else {
          this.$router.push({ name: ROUTE_NAMES.HOME })
        }
      }
    },
    async fetchTest() {
      if (this.isPassed) return console.log('Final test already passed')
      await this.$store.dispatch(ACTIONS.FETCH_FINAL_TEST)
    },
    async onRestart() {
      await this.fetchTest()
      this.$root.$emit('on-test-restart')
      this.setModalStatus(false)
      this.isBackplateEnabled = false
      this.isLoaderVisible = false
    },
    onLookErrors() {
      this.isBackplateEnabled = true
      this.setModalStatus(false)
    },
    onTestCompletedChange(isTestCompleted) {
      this.isTestCompleted = isTestCompleted
    },
    setModalStatus(status) {
      this.$store.dispatch(ACTIONS.SET_MODAL_STATUS, { status })
    },
    onMainPage() {
      this.$router.push({ name: ROUTE_NAMES.HOME })
    }
  },
  watch: {
    attemptsCount: function(count) {
      if (!count && !this.isPassed) {
        this.$store.dispatch(ACTIONS.SET_FINAL_TEST_DISABLED_UNTIL, {
          until: Date.now() + 1000 * 60 * 5
        })
      }
    }
  },
  async created() {
    if (!this.testItems?.length && !this.isPassed) {
      try {
        await this.fetchTest()
      } catch (e) {
        console.error(e)
      }
    }
  },
  beforeDestroy() {
    this.setModalStatus(false)
    this.onRestart()
  }
}
</script>

<style lang="scss">
@import '@/assets/transition.scss';

body {
  overflow-y: hidden;
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
}
</style>
