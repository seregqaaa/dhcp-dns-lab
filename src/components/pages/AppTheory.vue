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
              <p class="theory-section-image">
                <img
                  src="@/assets/img/dhcp-client-server-interaction.png"
                  alt="Взаимодействие DHCP клиента и сервера"
                />
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
              <p
                v-for="(text, index) in content.dns.section.whatIs.data"
                :key="(index + 1) * Math.random()"
              >
                {{ text }}
              </p>
              <p class="theory-section-image">
                <img
                  src="@/assets/img/dns-client-server-interaction.png"
                  alt="Взаимодействие клиента с DNS сервером"
                />
              </p>
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
              <p
                v-for="(text, index) in content.mail.section.whatIs.data"
                :key="(index + 1) * Math.random()"
              >
                {{ text }}
              </p>

              <h4
                :id="content.mail.section.mailServerTypes.link"
                class="theory-section-content-header"
              >
                <router-link
                  :to="`#${content.mail.section.mailServerTypes.link}`"
                  @click.native="
                    scrollFix(content.mail.section.mailServerTypes.link)
                  "
                  >{{ content.mail.section.mailServerTypes.title }}</router-link
                >
              </h4>
              <p
                v-for="(text, index) in content.mail.section.mailServerTypes
                  .data"
                :key="(index + 1) * Math.random()"
              >
                {{ text }}
              </p>
              <h4
                :id="content.mail.section.emailSendingProcess.link"
                class="theory-section-content-header"
              >
                <router-link
                  :to="`#${content.mail.section.emailSendingProcess.link}`"
                  @click.native="
                    scrollFix(content.mail.section.emailSendingProcess.link)
                  "
                  >{{
                    content.mail.section.emailSendingProcess.title
                  }}</router-link
                >
              </h4>
              <p
                v-for="(text, index) in content.mail.section.emailSendingProcess
                  .data"
                :key="(index + 1) * Math.random()"
              >
                {{ text }}
              </p>
              <p class="theory-section-image">
                <img
                  src="@/assets/img/mail-server-client-server-interaction.png"
                  alt="Взаимодействие клиента и почтового сервера"
                />
              </p>
            </div>
          </section>
        </main>
        <home-button key="theory-home-button" />
      </transition-group>
    </div>
  </transition>
</template>

<script>
import HomeButton from '@/components/common/HomeButton.vue'

export default {
  name: 'theory',
  components: {
    'home-button': HomeButton
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
              title: 'Что такое DNS',
              link: 'what-is-dns',
              data: [
                'Система доменных имен (DNS) – это система Интернета для сопоставления буквенных имен с числовыми IP-адресами, например, телефонная книга сопоставляет имя человека с номером телефона. Например, когда веб-адрес (URL) вводится в браузере, выполняется DNS-запрос, чтобы узнать IP-адрес веб-сервера, связанного с этим именем.',
                'Используя URL-адрес www.google.com, google.com – это имя домена, а www – имя хоста. Разрешение DNS сопоставляет www.example.com с IP-адресом (например, 192.0.2.1). Когда пользователю необходимо загрузить  веб-страницу, должно произойти преобразование между тем, что пользователь вводит в своем веб-браузере (www.google.com), в IP-адрес, необходимый для нахождения   сайта www.google.com.',
                'Система DNS – это открытая всемирная сеть серверов имен баз данных, в которую входят 13 авторитетных серверов имен, которые обслуживают уровень корневой зоны DNS, известные как «корневые серверы». Корневой сервер (также называемый корневым сервером имен DNS) получает запрос DNS, который включает имя домена (например, www.google.com), и отвечает, направляя этот запрос на сервер имен домена верхнего уровня (TLD) на основе TLD. этого домена, например .com, .net и .org. Он напрямую отвечает на запросы DNS-записей в корневой зоне, возвращая соответствующий список авторитетных серверов имен TLD для соответствующего TLD, который может разрешить первоначальный запрос поиска DNS для IP-адреса этого доменного имени.',
                'Авторитетные DNS-серверы – это инфраструктура DNS, которая удовлетворяет запросы от рекурсивных DNS-серверов (обсуждаемых ниже) с соответствующей информацией об IP-адресе. Авторитетные DNS-серверы также предоставляют важную информацию DNS для каждого веб-сайта (соответствующие IP-адреса, список почтовых серверов и другую информацию о записях DNS).',
                'Авторитетный DNS-сервер хранит и поддерживает записи DNS. Это последний сервер в цепочке поиска DNS, который отвечает запрошенной записью DNS. Авторитетный DNS в итоге позволяет веб-браузеру с URL-запросом достичь IP-адреса, необходимого для доступа к веб-сайту или другим веб-ресурсам. Авторитетный сервер доменных имен DNS является решающим источником разрешения доменных имен DNS.',
                'Технология безопасности DNS используется для защиты информации DNS, хранящейся в виде записи в системе доменных имен (DNS). Он обеспечивает безопасную аутентификацию источника данных DNS, помогая защитить себя от атак и защитить целостность данных.',
                'Всем доменам назначается уникальный IP-адрес в Интернете. Когда адрес веб-сайта вводится в браузере, например google.com, браузер отвечает за преобразование этого URL-адреса в правильный IP-адрес для этого веб-сайта. Веб-браузер запускает этот процесс, используя внутренний кэш последних результатов DNS-запросов. Этот кэш – первое место, где браузер проверяет (есть ли у него такая возможность), чтобы найти IP-адрес запрошенного домена. Если это не приводит к разрешению DNS, клиентский DNS-преобразователь отправляет DNS-запрос на рекурсивный DNS-сервер, который может находиться у поставщика услуг Интернета (ISP) или общедоступного поставщика DNS.',
                'Каждая запись DNS имеет параметр TTL или время жизни, который указывает, как долго рекурсивный DNS-сервер может ее кэшировать. Для повышения производительности сайта важно сократить количество запросов DNS. DNS-сервер не может эффективно использоваться без правильно настроенного TTL. По этой причине проверка DNS TTL может быть чрезвычайно важной при оценке скорости загрузки. Если рекурсивный сервер DNS имеет запись DNS в кэше или хранится в течение некоторого времени, как указывает параметр TTL, то он отвечает на запрос DNS, предоставляя кэшированный источник или IP-информацию (рекурсивный поиск).',
                'Если DNS-запись отсутствует в кэше рекурсивного DNS-сервера, она запрашивает у корневого DNS-сервера домен верхнего уровня сайта, на который пытается попасть пользователь / клиент. Затем корневой DNS-сервер отвечает указателем, чтобы перенаправить запрос поиска DNS на сервер имен TLD, который идентифицирует авторитетный DNS-сервер, который отвечает за возврат соответствующего IP-адреса сайта, позволяющего браузеру получить доступ к желаемому веб-сайту.',
                'Протокол прикладного уровня DNS использует для работы TCP- или UDP-порт 53 для ответов на запросы. Запросы и ответы отправляются в виде одной UDP-датаграммы. TCP используется, когда размер данных ответа превышает 512 байт, и для AXFR-запросов.'
              ]
            }
          }
        },
        mail: {
          title: 'Почтовый сервер',
          link: 'mail-server',
          section: {
            whatIs: {
              title: 'Что такое почтовый сервер',
              link: 'what-is-mail-server',
              data: [
                'Почтовый сервер – это компьютеризированный эквивалент вашего дружелюбного соседского почтальона. Каждое отправляемое электронное письмо проходит через ряд почтовых серверов на своем пути к предполагаемому получателю. Хотя может показаться, что сообщение отправляется мгновенно – скачивается с одного компьютера на другой в мгновение ока – на самом деле происходит сложная серия передач. Без этой серии почтовых серверов можно отправлять электронные письма только тем людям, чьи домены адресов электронной почты совпадают с вашими, то есть можно отправлять сообщения только из одной учетной записи example.com в другую учетную запись example.com.'
              ]
            },
            mailServerTypes: {
              title: 'Типы почтовых серверов',
              link: 'mail-server-types',
              data: [
                'Почтовые серверы можно разделить на две основные категории: серверы исходящей почты и серверы входящей почты. Серверы исходящей почты известны как серверы SMTP или Simple Mail Transfer Protocol. Серверы входящей почты бывают двух основных типов. Серверы POP3 или Post Office Protocol версии 3 наиболее известны тем, что хранят отправленные и полученные сообщения на локальных жестких дисках ПК. Серверы IMAP или Internet Message Access Protocol всегда хранят копии сообщений на серверах. Большинство серверов POP3 также могут хранить сообщения на серверах, что намного удобнее.'
              ]
            },
            emailSendingProcess: {
              title: 'Процесс отправки электронного письма',
              link: 'mail-sending-process',
              data: [
                '1)	После создания сообщения и нажатия кнопки «Отправить» ваш почтовый клиент - будь то Outlook Express или Gmail - подключается к SMTP-серверу вашего домена. Этот сервер можно назвать по-разному; стандартный пример - smtp.example.com.',
                '2)	Ваш почтовый клиент связывается с SMTP-сервером, сообщая ему ваш адрес электронной почты, адрес электронной почты получателя, тело сообщения и любые вложения.',
                '3)	SMTP-сервер обрабатывает адрес электронной почты получателя,',
                '4)	особенно его домен. Если имя домена совпадает с именем отправителя, сообщение направляется непосредственно на сервер POP3 или IMAP домена - маршрутизация между серверами не требуется. Однако, если домен отличается, SMTP-сервер должен будет взаимодействовать с сервером другого домена.',
                '5)	Чтобы найти сервер получателя, SMTP-сервер отправителя должен взаимодействовать с DNS или сервером доменного имени. DNS берет имя домена электронной почты получателя и переводит его в IP-адрес. SMTP-сервер отправителя не может правильно маршрутизировать электронную почту с одним доменным именем; IP-адрес - это уникальный номер, который присваивается каждому компьютеру, подключенному к Интернету. Зная эту информацию, сервер исходящей почты может выполнять свою работу более эффективно.',
                '6)	Теперь, когда SMTP-сервер имеет IP-адрес получателя, он может подключиться к своему SMTP-серверу. Однако обычно это не делается напрямую; вместо этого сообщение маршрутизируется через ряд несвязанных SMTP-серверов, пока не достигнет места назначения.',
                '7)	SMTP-сервер получателя сканирует входящее сообщение. Если он распознает домен и имя пользователя, он пересылает сообщение на сервер POP3 или IMAP домена. Оттуда он помещается в очередь sendmail до тех пор, пока почтовый клиент получателя не разрешит его загрузку. После этого сообщение может быть прочитано получателем.',
                'Когда пользователь набрал сообщение и посылает его получателю, почтовый клиент взаимодействует с почтовым сервером, используя протокол SMTP. Почтовый сервер отправителя взаимодействует с почтовым сервером получателя (напрямую или через промежуточный сервер — релей). На почтовом сервере получателя сообщение попадает в почтовый ящик посредством агента доставки сообщений MDA. MDA может быть частью POP/IMAP сервера, частью SMTP сервера, или отдельным ПО. Для финальной доставки полученных сообщений используется не SMTP, а другой протокол — часто POP3 или IMAP — который также поддерживается большинством почтовых серверов.',
                'Многие люди используют почтовые веб-клиенты, такие как Yahoo Mail и Gmail. Тем, кому требуется гораздо больше места, особенно предприятиям, часто приходится вкладывать средства в собственные серверы. Это означает, что у них также должен быть способ получения и передачи электронной почты, а это означает, что им необходимо настроить свои собственные почтовые серверы. С этой целью два наиболее популярных варианта – это такие программы, как Postfix и Microsoft Exchange. Такие программы облегчают предшествующий процесс за кулисами. Те, кто отправляет и получает сообщения через эти почтовые серверы, конечно, обычно видят только части процесса «отправить» и «получить».',
                'Почтовый сервер – это компьютер, который помогает перемещать файлы по назначению. В этом случае, конечно, эти файлы являются сообщениями электронной почты. Их легко принять как должное, но разумно иметь базовые представления о том, как работают почтовые серверы.'
              ]
            }
          }
        }
      },
      isHomeButtonDebounced: false
    }
  },
  methods: {
    scrollFix(hash) {
      location.hash = `#${hash}`
      const timeoutId = setTimeout(() => {
        if (location.hash === `#${hash}`) {
          location.hash = ''
        }
        clearTimeout(timeoutId)
      }, 2000)
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

.theory {
  &-wrapper {
    padding: 20px 10px 20px 0;
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
        text-decoration: underline;
        text-underline-offset: 1px;
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
        &.theory-section-image {
          text-align: center;
          & > img {
            max-width: 90%;
          }
        }
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
  .theory {
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
