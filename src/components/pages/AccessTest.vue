<template>
  <transition-group appear name="fade">
    <app-test
      v-if="testItems && testItems.length"
      key="app-test"
      testTitle="Тест для допуска"
      :isPassed="isPassed"
      :testItems="testItems"
      :testLength="5"
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
    <app-loader key="loader" v-if="isLoaderVisible"></app-loader>
  </transition-group>
</template>

<script>
import { ACTIONS, GETTERS } from '@/constants'

import AppButton from '@/components/common/AppButton.vue'
import AppLoader from '@/components/common/AppLoader.vue'
import AppModal from '@/components/common/AppModal.vue'
import AppTest from '@/components/common/AppTest.vue'

import HomeIcon from '@/components/common/icons/HomeIcon.vue'
import RefreshIcon from '@/components/common/icons/RefreshIcon.vue'

export default {
  name: 'access-test',
  components: {
    AppLoader,
    'app-button': AppButton,
    'app-modal': AppModal,
    'home-icon': HomeIcon,
    'refresh-icon': RefreshIcon,
    'app-test': AppTest,
    'app-loader': AppLoader
  },
  computed: {
    isPassed() {
      return this.$store.getters[GETTERS.GET_ACCESS_TEST_PASSED_STATUS]
    },
    testItems() {
      return this.$store.getters[GETTERS.GET_ACCESS_TEST]
    },
    isModalActive() {
      return this.$store.getters[GETTERS.GET_IS_MODAL_ACTIVE]
    }
  },
  data() {
    return {
      isTestCompleted: false,
      homeButtonSize: 150,
      isLoaderVisible: false
    }
  },
  methods: {
    async onComplete(payload) {
      this.isLoaderVisible = true
      await this.$store.dispatch(ACTIONS.SEND_ACCESS_TEST_RESULT, {
        answers: payload.answers
      })
      this.isLoaderVisible = false
      this.setModalStatus(true)
    },
    async fetchTest() {
      await this.$store.dispatch(ACTIONS.FETCH_ACCESS_TEST)
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
    if (this.isPassed) {
      return this.$router.push({ name: 'home' })
    }
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
@import '~assets/transition.scss';

$redColor: #ee7d3b;
$bottomSpacing: 5rem;

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
