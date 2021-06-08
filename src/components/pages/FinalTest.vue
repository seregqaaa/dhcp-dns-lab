<template>
  <transition-group appear name="fade">
    <app-test
      v-if="testItems && testItems.length"
      key="app-test"
      testTitle="Финальный тест"
      :testItems="testItems"
      :testResult="testResult"
      :submitButtonText="submitButtonText"
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
            <app-button v-if="isPassed" background="red">
              На главную
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
  </transition-group>
</template>

<script>
import { ACTIONS, GETTERS } from '../../constants'

import AppButton from '@/components/common/AppButton'
import AppModal from '@/components/common/AppModal'
import AppTest from '@/components/common/AppTest'

// import HomeIcon from '@/components/common/icons/HomeIcon'
// import RefreshIcon from '@/components/common/icons/RefreshIcon'

export default {
  name: 'final-test',
  components: {
    'app-button': AppButton,
    'app-modal': AppModal,
    // 'home-icon': HomeIcon,
    // 'refresh-icon': RefreshIcon,
    'app-test': AppTest
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
      homeButtonSize: 150
    }
  },
  methods: {
    async onComplete(payload) {
      if (!this.submitButtonText) {
        await this.$store.dispatch(ACTIONS.SEND_FINAL_TEST_RESULT, {
          answers: payload.answers
        })
        this.setModalStatus(true)
      } else {
        if (this.attemptsCount) {
          await this.onRestart()
        } else {
          this.$router.push({ name: 'home' })
        }
      }
    },
    async fetchTest() {
      await this.$store.dispatch(ACTIONS.FETCH_FINAL_TEST)
    },
    async onRestart() {
      await this.fetchTest()
      this.$root.$emit('on-test-restart')
      this.setModalStatus(false)
    },
    onLookErrors() {
      this.setModalStatus(false)
    },
    onTestCompletedChange(isTestCompleted) {
      this.isTestCompleted = isTestCompleted
    },
    setModalStatus(status) {
      this.$store.dispatch(ACTIONS.SET_MODAL_STATUS, { status })
    }
  },
  watch: {
    attemptsCount: function(count) {
      if (!count) {
        this.$store.dispatch(ACTIONS.SET_FINAL_TEST_DISABLED_UNTIL, {
          until: Date.now() + 1000 * 60 * 5
        })
      }
    }
  },
  async created() {
    if (!this.testItems?.length) {
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
$redColor: #ee7d3b;
$bottomSpacing: 5rem;

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
  transform: translateY(50px) scale(1.2);
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
