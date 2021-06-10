<template>
  <transition appear name="fade" mode="out-in">
    <div class="theory-wrapper">
      <transition-group appear name="fade" mode="out-in">
        <nav key="theory-menu" class="theory-nav">
          <ul class="theory-nav-list">
            <li
              class="theory-nav-item"
              v-for="item in menuItems"
              :key="item.link"
            >
              <router-link
                :to="`#${item.link}`"
                @click.native="scrollFix(item.link)"
                >{{ item.title }}</router-link
              >
              <ul class="theory-nav-sub-list">
                <li
                  class="theory-nav-sub-item"
                  v-for="subItem in item.sub"
                  :key="subItem.link"
                >
                  <router-link
                    :to="`#${subItem.link}`"
                    @click.native="scrollFix(subItem.link)"
                    >{{ subItem.title }}</router-link
                  >
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <main key="main-content" class="theory-content">
          <section class="theory-section">
            <h3 :id="content.dhcp.link" class="theory-section-header">
              <router-link
                :to="`#${content.dhcp.link}`"
                @click.native="scrollFix(content.dhcp.link)"
                >{{ content.dhcp.title }}</router-link
              >
            </h3>
            <div class="theory-section-content">
              <h4
                :id="content.dhcp.section.whatIs.link"
                class="theory-section-content-header"
              >
                <router-link
                  :to="`#${content.dhcp.section.whatIs.link}`"
                  @click.native="scrollFix(content.dhcp.section.whatIs.link)"
                  >{{ content.dhcp.section.whatIs.title }}</router-link
                >
              </h4>
              <p
                v-for="(text, index) in content.dhcp.section.whatIs.data"
                :key="(index + 1) * Math.random()"
              >
                {{ text }}
              </p>
              <h4
                :id="content.dhcp.section.workExample.link"
                class="theory-section-content-header"
              >
                <router-link
                  :to="`#${content.dhcp.section.workExample.link}`"
                  @click.native="
                    scrollFix(content.dhcp.section.workExample.link)
                  "
                  >{{ content.dhcp.section.workExample.title }}</router-link
                >
              </h4>
              <p
                v-for="(text, index) in content.dhcp.section.workExample.data"
                :key="(index + 1) * Math.random()"
              >
                {{ text }}
              </p>
            </div>
          </section>
          <section class="theory-section">
            <h3 :id="content.dns.link" class="theory-section-header">
              <router-link
                :to="`#${content.dns.link}`"
                @click.native="scrollFix(content.dns.link)"
                >{{ content.dns.title }}</router-link
              >
            </h3>
            <div class="theory-section-content">
              <h4
                :id="content.dns.section.whatIs.link"
                class="theory-section-content-header"
              >
                <router-link
                  :to="`#${content.dns.section.whatIs.link}`"
                  @click.native="scrollFix(content.dns.section.whatIs.link)"
                  >{{ content.dns.section.whatIs.title }}</router-link
                >
              </h4>
            </div>
          </section>
          <section class="theory-section">
            <h3 :id="content.mail.link" class="theory-section-header">
              <router-link
                :to="`#${content.mail.link}`"
                @click.native="scrollFix(content.mail.link)"
                >{{ content.mail.title }}</router-link
              >
            </h3>
            <div class="theory-section-content">
              <h4
                :id="content.mail.section.whatIs.link"
                class="theory-section-content-header"
              >
                <router-link
                  :to="`#${content.mail.section.whatIs.link}`"
                  @click.native="scrollFix(content.mail.section.whatIs.link)"
                  >{{ content.mail.section.whatIs.title }}</router-link
                >
              </h4>
            </div>
          </section>
        </main>
        <home-icon
          key="home-icon"
          class="theory-home"
          @click.native="onHomeClick"
        ></home-icon>
      </transition-group>
    </div>
  </transition>
</template>

<script>
import HomeIcon from '@/components/common/icons/HomeIcon.vue'

export default {
  name: 'theory',
  components: {
    'home-icon': HomeIcon
  },
  computed: {
    menuItems() {
      return Object.values(this.content).map(content => ({
        link: content.link,
        title: content.title,
        sub: Object.values(content.section).map(section => ({
          link: section.link,
          title: section.title
        }))
      }))
    }
  },
  data() {
    return {
      content: {
        dhcp: {
          title: 'DHCP',
          link: 'dhcp',
          section: {
            whatIs: {
              title: 'Что такое DHCP',
              link: 'what-is-dhcp',
              data: [
                'Протокол динамической конфигурации хоста (DHCP) - это протокол прикладного уровня, используемый для автоматизации процесса настройки устройств в IP-сетях, что позволяет им использовать сетевые службы, такие как DNS, NTP, и любой протокол связи, основанный на UDP или TCP. Сервер DHCP динамически назначает IP-адрес и другие параметры конфигурации сети каждому устройству в сети, чтобы они могли взаимодействовать с другими IP-сетями. DHCP - это расширение старого протокола BOOTP.',
                'DHCP был разработан для того, чтобы освободить администратора от ручной работы. DHCP осуществляет не только назначение адресов по динамическому признаку, но и поддерживает способы ручного и автоматического статического назначения IP–адресов. При ручном способе – администратор представляет DHCP-серверу информацию о соответствии IP–адресов между физическим адресом или идентификатором клиента. Эти адреса сообщаются клиентам в ответ на их запросы DHCP серверу. При автоматическом статическом способе DHCP-сервер присваивает IP– адрес (и ряд других параметров конфигурации клиента) из пула памяти намеченных IP–адресов без вмешательства администратора назначает каждому узлу свой адрес. Граница адресов определяется администратором при конфигурировании DHCP-сервера. Между идентификаторами клиента и его IP–адресом существует постоянное соответствие. Оно устанавливается в момент первичного назначения с сервером DHCP IP–адреса клиенту. При последовательных запросах сервер возвращает тот же самый IP–адрес. При динамическом распределении адресов DHCP-сервер выдает адрес клиенту на ограниченное время, что дает в последствии возможность повторно использовать IP–адрес другой компании. Динамическое разделение адресов позволяет строить IP–сеть, количество узлов которой на много превышает количества имеющихся в распоряжении администраторов IP–адресов. DHCP-протокол обеспечивает надежный и простой способ конфигурирования в сети TCP/IP, гарантируя отсутствие конфликтных адресов за счет централизованного управления и распределения адресов. Администратор управляет процессом назначения адресов с помощью параметра «продолжительность аренды», которая определяет, как долго компьютер может использовать назначенный IP–адрес перед тем, как снова запросить его от сервера DHCP в аренду.',
                'Протокол DHCP является клиент-серверным, то есть в его работе участвуют клиент DHCP и сервер DHCP. Передача данных производится при помощи протокола UDP. По умолчанию запросы от клиента делаются к серверу на порт 67, сервер в свою очередь отвечает клиенту на порт 68, выдавая адрес IP и другую необходимую информацию, такую, как сетевую маску, маршрутизатор и серверы DNS.'
              ]
            },
            workExample: {
              title: 'Пример работы протокола DHCP',
              link: 'dhcp-work-example',
              data: [
                'DHCP может использовать свои возможности в основном, если компьютер удаляется из сети и IP–адрес автоматически освобождается.',
                'Когда компьютер подключается к другой подсети, то ему автоматически назначается новый адрес, при этом ни пользователь, ни администратор не вмешиваются в данный процесс назначения IP–адреса. Особенно это важно для мобильных пользователей.',
                'DHCP использует модель клиент-сервер. Во время старта системы компьютера сервер–клиент DHCP, находящийся в состоянии инициализации посылает сообщение «исследователей», которое широковещательно посылает, сообщение по локальной сети передается, всем DHCP серверам частной интерсети «Исследователь» – 127.0.0.1.',
                'Каждый DHCP-сервер, получивший данное сообщение отвечает на него сообщением OFFER – предложение, которое содержит IP–адреса и информацию о конфигурации данного узла.',
                'Компьютер DHCP переходит в состояние выбора и собирает конфигурационные предложения от DHCP-серверов, затем он выбирает одно из этих предложений, переходит в состояние «запрос» и отправляет сообщение «Request» (запрос) тому DHCP-серверу, чье предложение было выбрано. Выбранный DHCP-сервер посылает сообщение – подтверждение, которое содержит тот же IP–адрес, который уже был послан ранее на стадии исследования, а также параметр аренды этого адреса. Кроме того, DHCP-сервер посылает параметры сетевой конфигурации.',
                'После получения клиентом этого подтверждения, он переходит в состояние связь, после чего он может принимать участие в работе сети TCP/IP.',
                'Компьютеры и клиенты, которые имеют локальные диски, сохраняют полученный адрес для использования при последующих стартах системы. При приближении момента истечения срока аренды адреса компьютер пытается обновить параметры аренды у DHCP-сервера. Если этот IP–адрес ему не может быть выделен снова, то ему возвращается другой IP–адрес.',
                'В DHCP-сервере описывается несколько типов сообщений, которые используются для обнаружения и выбора DHCP-адресов для запросов информации о конфигурации для продления лицензии досрочного прекращения IP –адреса, что освобождает труд администратора сети.'
              ]
            }
          }
        },
        dns: {
          title: 'DNS',
          link: 'dns',
          section: {
            whatIs: {
              type: 'link',
              title: 'Что такое DNS',
              link: 'what-is-dns',
              data: []
            }
          }
        },
        mail: {
          title: 'Почтовый сервер',
          link: 'mail-server',
          section: {
            whatIs: {
              type: 'link',
              title: 'Что такое почтовый сервер',
              link: 'what-is-mail-server',
              data: []
            }
          }
        }
      },
      isHomeButtonDebounced: false
    }
  },
  methods: {
    scrollFix(hashbang) {
      location.hash = `#${hashbang}`
    },
    onHomeClick() {
      if (this.isHomeButtonDebounced) return
      this.isHomeButtonDebounced = true
      const timeoutId = setTimeout(() => {
        this.isHomeButtonDebounced = false
        clearTimeout(timeoutId)
      }, 1000)
      this.$router.push({ name: 'home' })
    }
  },
  mounted() {
    setTimeout(() => this.scrollFix(this.$route.hash.replace('#', '')), 1)
  }
}
</script>

<style lang="scss">
@import '~assets/transition.scss';

:root {
  --nav-width: 300px;
  --nav-spacing: 20px;
}

$orangeColor: #ffc371;
$navWidth: var(--nav-width);
$navSpacing: var(--nav-spacing);
$transitionTime: 0.2s;
$transitionFunc: ease;
$mainBg: rgba(255, 255, 255, 0.95);
$mainShadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
$mainBorderRadius: 10px;
$homeButtonSize: 60px;

.theory {
  &-home {
    bottom: 20px;
    right: 20px;
    position: fixed;
    z-index: 10;
    padding: 15px;
    width: $homeButtonSize;
    height: $homeButtonSize;
    background-color: #ffffff;
    border-radius: 50%;
    box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.18);
    color: black;
    cursor: pointer;
    transition: background-color $transitionTime $transitionFunc;
    &:hover {
      background-color: #f9f9f9;
    }
  }
  &-wrapper {
    padding: 20px 30px 20px 0;
    transition: padding $transitionTime $transitionFunc;
  }
  &-nav {
    position: fixed;
    left: 10px;
    padding: 20px;
    width: $navWidth;
    height: calc(100vh - var(--nav-spacing) * 2);
    border-radius: $mainBorderRadius;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: $mainShadow;
    background-color: $mainBg;
    transition-property: left, opacity;
    transition-duration: $transitionTime;
    transition-timing-function: $transitionFunc;
    overflow-y: scroll;
    &-item {
      position: relative;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      & a {
        transition-property: font-weight, color;
        transition-duration: $transitionTime;
        transition-timing-function: $transitionFunc;
        &:hover {
          font-weight: 700;
          color: $orangeColor;
        }
      }
    }
    &-sub {
      &-list {
        padding-left: 20px;
      }
      &-item {
        margin: 10px 0;
      }
    }
  }
  &-content {
    position: relative;
    left: calc(var(--nav-width) + var(--nav-spacing));
    width: calc(100% - (var(--nav-width) + var(--nav-spacing)));
    padding: 20px 30px;
    border-radius: $mainBorderRadius;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-shadow: $mainShadow;
    background-color: $mainBg;
    transition-property: width, left, border-radius, padding;
    transition-duration: $transitionTime;
    transition-timing-function: $transitionFunc;
  }
  &-section {
    &:not(:first-child) {
      margin-top: 50px;
    }
    &-header {
      font-size: 28px;
    }
    &-content {
      &-header {
        font-size: 24px;
        margin: 20px 0;
        &:first-child {
          margin-top: 0;
        }
      }
      & > p {
        text-indent: 30px;
        padding: 10px;
        font-size: 18px;
        text-align: justify;
        line-height: 1.5;
      }
    }
    &-header,
    &-content-header {
      position: relative;
      padding-left: 50px;
      &::before {
        content: '# ';
        position: absolute;
        left: 20px;
        top: 2px;
        color: transparent;
        filter: blur(4px);
        transition-property: left, color, filter;
        transition-duration: $transitionTime;
        transition-timing-function: $transitionFunc;
      }
      &:hover {
        &::before {
          left: 30px;
          top: 2px;
          color: $orangeColor;
          font-size: 0.9em;
          filter: blur(0);
        }
      }
    }
  }
}

@media (max-width: 950px) {
  $homeButtonSize: 40px;
  .theory {
    &-home {
      width: $homeButtonSize;
      height: $homeButtonSize;
      padding: 8px;
    }
    &-wrapper {
      padding: 0;
    }
    &-nav {
      opacity: 0;
      left: -300px;
    }
    &-content {
      left: 0;
      width: 100%;
      padding: 10px 15px;
      border-radius: 0;
    }
  }
}
</style>
