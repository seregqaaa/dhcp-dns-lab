<template>
  <transition-group appear name="fade">
    <app-test
      key="app-test"
      testTitle="Финальный тест"
      :testItems="testItems"
      :testResult="testResult"
      @on-complete="onComplete"
      @on-test-completed-change="onTestCompletedChange"
    ></app-test>
    <!-- <app-modal v-if="isTestCompleted && isModalActive" key="modal-window">
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
    </app-modal> -->
  </transition-group>
</template>

<script>
import { ACTIONS, GETTERS } from '../../constants'

// import AppButton from '@/components/common/AppButton'
// import AppModal from '@/components/common/AppModal'
import AppTest from '@/components/common/AppTest'

// import HomeIcon from '@/components/common/icons/HomeIcon'
// import RefreshIcon from '@/components/common/icons/RefreshIcon'

export default {
  name: 'final-test',
  components: {
    // 'app-button': AppButton,
    // 'app-modal': AppModal,
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
      await this.$store.dispatch(ACTIONS.SEND_FINAL_TEST_RESULT, {
        answers: payload.answers
      })
      // this.setModalStatus(true)
    },
    async fetchTest() {
      await this.$store.dispatch(ACTIONS.FETCH_FINAL_TEST)
    },
    async onRestart() {
      await this.fetchTest()
      this.$root.$emit('on-test-restart')
      this.setModalStatus(false)
    },
    onTestCompletedChange(isTestCompleted) {
      this.isTestCompleted = isTestCompleted
    },

    setModalStatus(status) {
      this.$store.dispatch(ACTIONS.SET_MODAL_STATUS, { status })
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
