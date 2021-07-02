<template>
  <div class="practice-wrapper">
    <div class="task">
      <div class="task-item">
        <p class="task-item-text" v-html="pages[pageIndex].html"></p>

        <template v-if="pages[pageIndex].type === TaskType.Practice">
          <div
            v-for="(line, index) in pages[pageIndex].cli"
            :key="line.id"
            class="task-item-cli"
            :class="{
              first: index === 0,
              last: index === pages[pageIndex].cli.length - 1
            }"
          >
            <span class="task-item-prefix">{{ line.prefix }}</span>
            <input type="text" class="task-item-input" v-model="line.input" />
          </div>
        </template>

        <template v-else-if="pages[pageIndex].type === TaskType.Custom">
          <component
            :ref="pages[pageIndex].id"
            :is="pages[pageIndex].component"
            :arr="pages[pageIndex].content"
          ></component>
        </template>

        <p
          v-if="isPassed !== null"
          class="task-item-result"
          :class="{
            passed: isPassed,
            failed: !isPassed
          }"
        >
          {{ statusText }}
        </p>

        <div class="task-item-options">
          <app-button
            :background="pages[pageIndex].button.background"
            :borderRadius="10"
            :width="150"
            :height="35"
            @click.native="pages[pageIndex].button.handler"
          >
            {{ pages[pageIndex].button.text }}
          </app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ACTIONS, GETTERS, ROUTE_NAMES } from '@/constants'

import AppButton from '@/components/common/AppButton.vue'
import ClientServerTask from '@/components/common/PracticeTask/ClientServerTask.vue'

const TaskType = {
  Theory: 'theory',
  Practice: 'practice',
  Custom: 'custom'
}

export default {
  name: 'practice-task',
  components: {
    'app-button': AppButton
  },
  computed: {
    statusText() {
      return this.isPassed !== null
        ? this.isPassed
          ? 'Верно'
          : 'Неверно'
        : null
    },
    isPracticePassed() {
      return this.$store.getters[GETTERS.GET_PRACTICE_RESULT]
    }
  },
  data() {
    return {
      TaskType,
      pageIndex: 0,
      isPassed: null,
      pages: [
        {
          id: 'page-custom-0',
          type: TaskType.Custom,
          component: ClientServerTask,
          check(answers) {
            const correctAnswers = ['3', '2', '1', '4']
            for (let i = 0; i < correctAnswers.length; i++) {
              if (answers[i] !== correctAnswers[i]) return false
            }
            return true
          },
          button: {
            background: 'green-plain',
            text: 'Проверить',
            handler: this.onPracticeButtonClick
          },
          content: [
            {
              id: '3',
              text: 'Отправка запроса на DNS-сервер'
            },
            {
              id: '2',
              text: 'Ответ с DNS-сервера'
            },
            {
              id: '1',
              text: 'Отправка запроса по IP-адресу'
            },
            {
              id: '4',
              text: 'Ответ от сервера'
            }
          ]
        },
        {
          id: 'page-0',
          type: TaskType.Theory,
          html: `
            Маршрутизатор, работающий как DHCP сервер, назначает все адреса IPv4 в
            диапазоне (пуле), если не настроен на исключение определенных адресов.
            Как правило, некоторые IP адреса из пула принадлежат сетевым
            устройствам, таким как маршрутизаторы, сервера или принтеры, которым
            требуются статические адреса, поэтому эти адреса не должны назначаться
            другим устройствам. Чтобы их исключить, используется команда <span class="task-item-text-code">ip dhcp
            excluded-address</span>. При помощи этой команды можно исключить как один
            единственный адрес, так и диапазон адресов, указав из него первый и
            последний.
          `,
          button: {
            background: 'green-plain',
            text: 'Далее',
            handler: this.onTheoryButtonClick
          }
        },
        {
          id: 'page-1',
          type: TaskType.Practice,
          html: `
            <b>Задача:</b> Исключите из раздачи адрес
            <span class="task-item-text-code">192.168.1.1</span> и адреса с
            <span class="task-item-text-code">192.168.1.2</span> по
            <span class="task-item-text-code">192.168.1.9</span>
          `,
          cli: [
            {
              id: 'page-1-cli-0',
              prefix: 'Router(config)#',
              input: '',
              correct: 'ip dhcp excluded-address 192.168.1.1'
            },
            {
              id: 'page-1-cli-1',
              prefix: 'Router(config)#',
              input: '',
              correct: 'ip dhcp excluded-address 192.168.1.2 192.168.1.9'
            }
          ],
          button: {
            background: 'green-plain',
            text: 'Проверить',
            handler: this.onPracticeButtonClick
          }
        },
        {
          id: 'page-2',
          type: TaskType.Theory,
          html: `
            Настройка DHCP сервера включает в себя определение пула адресов, которые
            будут раздаваться. Для создания пула используется команда
            <span class="task-item-text-code">ip dhcp pool [название_пула]</span>.
            После этого необходимо ввести две обязательные команды –
            <span class="task-item-text-code"
              >network [адрес_сети][маска/длина_префикса]</span
            >
            для указания сети из которой будут раздаваться адреса и
            <span class="task-item-text-code"
              >default-router[адрес_default_gateway]</span
            >
            для указания шлюза по умолчанию (можно ввести до 8 адресов). <br />
            Также можно использовать дополнительные команды – например, указать DNS
            сервер (команда
            <span class="task-item-text-code">dns-server [адрес]</span>), доменное
            имя (команда
            <span class="task-item-text-code">domain-name [домен]</span>), NetBIOS
            WINS сервер (команда
            <span class="task-item-text-code">netbios-name-server[адрес]</span>), а
            так же время аренды адреса (команда
            <span class="task-item-text-code"
              >lease [количество_дней_часов_минут]</span
            >, сначала указываются дни, затем через пробел часы, а затем минуты). По
            умолчанию время аренды выставляется 1 день.
          `,
          button: {
            background: 'green-plain',
            text: 'Далее',
            handler: this.onTheoryButtonClick
          }
        },
        {
          id: 'page-3',
          type: TaskType.Practice,
          html: `
            <b>Задача:</b>
            <ul>
              <li>
                1. Создайте пул с названием <span class="task-item-text-code">UISI-POOL-1</span>
              </li>
              <li>
                2. Укажите сеть из которой будут раздаваться адреса. Номер сети <span class="task-item-text-code">192.168.1.0</span>
              </li>
              <li>
                3. Задайте шлюз с адресом <span class="task-item-text-code">192.168.1.1</span>
              </li>
              <li>
                4. Укажите <span class="task-item-text-code">192.168.1.2</span> в качестве DNS-сервера
              </li>
              <li>
                5. Задайте <span class="task-item-text-code">uisi.ru</span>, как доменное имя
              </li>
              <li>
                6. Арендуйте адрес на 12 часов
              </li>
            </ul>
          `,
          cli: [
            {
              id: 'page-2-cli-0',
              prefix: 'Router(config)#',
              input: '',
              correct: 'ip dhcp pool UISI-POOL-1'
            },
            {
              id: 'page-2-cli-1',
              prefix: 'Router(dhcp-config)#',
              input: '',
              correct: 'network 192.168.1.0 255.255.255.0'
            },
            {
              id: 'page-2-cli-2',
              prefix: 'Router(dhcp-config)#',
              input: '',
              correct: 'default-router 192.168.1.1'
            },
            {
              id: 'page-2-cli-3',
              prefix: 'Router(dhcp-config)#',
              input: '',
              correct: 'dns-server 192.168.1.2'
            },
            {
              id: 'page-2-cli-4',
              prefix: 'Router(dhcp-config)#',
              input: '',
              correct: 'domain-name uisi.ru'
            },
            {
              id: 'page-2-cli-5',
              prefix: 'Router(dhcp-config)#',
              input: '',
              correct: 'lease 0 12'
            }
          ],
          button: {
            background: 'green-plain',
            text: 'Проверить',
            handler: this.onPracticeButtonClick
          }
        }
      ]
    }
  },
  methods: {
    onTheoryButtonClick() {
      this.pageIndex++
      this.isPassed = null
    },
    onPracticeButtonClick() {
      const page = this.pages[this.pageIndex]
      const isLastPage = this.pageIndex === this.pages.length - 1
      let isTaskCorrect = false

      if (this.isPassed) {
        return isLastPage ? this.onComplete() : this.onTheoryButtonClick()
      }

      if (page.type === TaskType.Custom) {
        if (page.check(this.$refs[page.id].list.map(item => item.id))) {
          isTaskCorrect = true
        }
      } else {
        if (
          !page.cli.every(line => {
            line.input = line.input.replace(/\s{2,}/g, ' ').trim()
            return !!line.input
          })
        ) {
          return
        }

        const cli = page.cli
        const counter = cli.reduce(
          (acc, val) => (val.input === val.correct ? acc + 1 : acc),
          0
        )

        if (cli.length === counter) {
          isTaskCorrect = true
        }
      }

      if (isTaskCorrect) {
        page.button.text = isLastPage ? 'Главная' : 'Далее'
        this.isPassed = true
      } else {
        this.isPassed = false
      }
    },
    onComplete() {
      this.$store
        .dispatch(ACTIONS.SET_PRACTICE_RESULT)
        .then(this.$router.push({ name: ROUTE_NAMES.HOME }))
    }
  },
  created() {
    if (this.isPracticePassed) {
      return this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/transition.scss';

$codeBackground: rgba(0, 0, 0, 0.08);
$taskWidth: 777px;
$borderRadius: 10px;

.practice {
  &-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    html {
      overflow-y: hidden;
    }
  }
}

.task {
  max-width: $taskWidth;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.15);
  &-item {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-text {
      &-code {
        padding: 0 10px;
        border-radius: 5px;
        background-color: $codeBackground;
        font-family: monospace;
      }
    }
    &-cli {
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
      padding: 5px 10px;
      background-color: $codeBackground;
      &.first {
        margin-top: 20px;
        border-top-right-radius: $borderRadius;
        border-top-left-radius: $borderRadius;
      }
      &.last {
        border-bottom-right-radius: $borderRadius;
        border-bottom-left-radius: $borderRadius;
      }
    }
    &-prefix {
      width: 132px;
      display: inline-block;
      margin-right: 5px;
      font-size: 12px;
      font-family: monospace;
      text-align: right;
    }
    &-input {
      width: 75%;
      display: inline-block;
      font-size: 12px;
      font-family: monospace;
      border: none;
      background-color: transparent;
    }
    &-result {
      margin-top: 20px;
      &.passed {
        color: rgb(50, 150, 50);
      }
      &.failed {
        color: rgb(200, 50, 50);
      }
    }
    &-options {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 20px;
    }
  }
}

@media (min-width: 799px) {
  .task {
    width: $taskWidth;
  }
}

@media (max-width: 650px) {
  .task {
    &-item {
      &-input {
        width: 50%;
      }
    }
  }
}

@media (max-width: 600px) {
  .practice {
    &-wrapper {
      align-items: flex-end;
    }
  }
  .task {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.95);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    &-item {
      &-input {
        width: 45%;
      }
    }
  }
}

@media (max-width: 321px) {
  .practice {
    &-wrapper {
      align-items: flex-end;
    }
  }
  .task {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.95);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    font-size: 10px;
    &-item {
      &-prefix,
      &-input {
        font-size: 10px;
      }
    }
  }
}
</style>
