<template>
  <div class="practice-wrapper">
    <p>
      Для каждого пула адресов при необходимости укажите параметры DHCP для
      клиента. Вы можете настроить пул адресов DHCP с именем, которое является
      строкой (например, «инженерное дело») или целым числом (например, 0).
    </p>
    <p>
      Настройка пула адресов DHCP также переводит устройство в режим настройки
      пула DHCP, определяемый приглашением (dhcp-config) #, в котором вы можете
      настроить параметры пула (например, номер IP-подсети и список устройств по
      умолчанию).
    </p>

    <p>
      DHCP определяет процесс, с помощью которого DHCP-сервер знает IP-подсеть,
      в которой находится DHCP-клиент, и может назначить IP-адрес из пула
      действительных IP-адресов в этой подсети. Процесс, с помощью которого
      DHCP-сервер определяет пул адресов DHCP для использования для клиентского
      запроса, описан в разделе « Настройка привязок вручную ».
    </p>

    <p>
      Сервер DHCP определяет и использует пулы адресов DHCP для клиентского
      запроса следующим образом: Если клиент не подключен напрямую к
      DHCP-серверу (поле giaddr широковещательного сообщения DHCPDISCOVER не
      равно нулю), сервер сопоставляет DHCPDISCOVER с пулом DHCP, подсеть
      которого содержит IP-адрес в поле giaddr. Если клиент напрямую подключен к
      DHCP-серверу (поле giaddr равно нулю), DHCP-сервер сопоставляет
      DHCPDISCOVER с пулами DHCP, которые содержат подсети, настроенные на
      принимающем интерфейсе.
    </p>

    <p style="margin-bottom: 30px;">
      Если интерфейс имеет вторичные IP-адреса, подсети, связанные с вторичными
      IP-адресами, проверяются на предмет возможного распределения только после
      того, как подсеть, связанная с первичным IP-адресом (на интерфейсе),
      исчерпана.
    </p>
    <div class="practice-cli">
      <transition name="fade" appear>
        <terminal-cli></terminal-cli>
      </transition>
    </div>
  </div>
</template>

<script>
import TerminalCli from '@/components/common/TerminalCli.vue'

export default {
  name: 'practice-task',
  components: {
    'terminal-cli': TerminalCli
  }
}
</script>

<style lang="scss">
@import '@/assets/transition.scss';

.practice {
  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px;
    & > p {
      width: 777px;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
  &-cli {
    height: 600px;
    width: 600px;
  }
}
</style>
