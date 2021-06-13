<template>
  <div class="cli-wrapper">
    <span id="ch">W</span>
    <ul class="cmds console">
      <li
        v-for="(h, i) in history"
        :class="{ active: i == history_ptr && !curr_ptr }"
        :key="i + h.text + getRandomHex()"
      >
        <span v-if="h.type == 'cmd'">
          <span>{{ h.hostname }}</span>
          <span v-if="!h.enabled">></span>
          <span v-else>
            <span v-if="h.mode">({{ h.mode }})</span>
            #
          </span>
          <strong>{{ h.description }}</strong>
        </span>
        <span v-if="h.type == 'text'">{{ h.text }}</span>
      </li>
      <li :class="{ active: curr_ptr }">
        <span>{{ hostname }}</span
        ><span v-if="!enabled">></span
        ><span v-else
          ><span v-if="mode">({{ mode }})</span>#</span
        >
        <span ref="cmdCli" class="cmd"
          >{{ cmd
          }}<span
            class="cursor"
            :style="{
              left: cmdCliWidth + 'px'
            }"
          ></span
        ></span>
        <span class="help"></span>
      </li>
    </ul>
    <ul class="cmds helps">
      <template v-for="(group, i) in helps">
        <li
          :key="i + group.group + getRandomHex()"
          v-if="group.commands.length > 0"
          class="help active"
          style="margin-top: 10px"
        >
          {{ group.group }}
        </li>
        <li
          v-for="(h, i) in group.commands"
          :key="i + h.mode + getRandomHex()"
          class="help"
        >
          <span>{{ hostname }}</span
          ><span v-if="!h.enabled">></span
          ><span v-else
            ><span v-if="h.mode">({{ h.mode }})</span>#</span
          >
          <strong>{{ h.description }}</strong>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
const router_cmds = [
  {
    group: 'General router configuration',
    commands: [
      {
        enabled: false,
        mode: '',
        description: 'enable'
      },

      // EXISTS
      {
        enabled: true,
        mode: '',
        description: '{exit|disable}'
      },
      {
        enabled: true,
        mode: 'config',
        description: '{exit|end}'
      },
      {
        enabled: true,
        mode: 'config-line',
        description: '{exit|end}'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: '{exit|end}'
      },
      {
        enabled: true,
        mode: 'config-subif',
        description: '{exit|end}'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: '{exit|end}'
      },
      {
        enabled: true,
        mode: 'config-keychain',
        description: '{exit|end}'
      },
      {
        enabled: true,
        mode: 'config-keychain-key',
        description: '{exit|end}'
      },
      // EXISTS

      {
        enabled: true,
        mode: '',
        description: 'erase startup-config'
      },
      {
        enabled: true,
        mode: '',
        description: 'reload'
      },
      {
        enabled: true,
        mode: '',
        description: 'configure terminal'
      },
      {
        enabled: true,
        mode: '',
        description: 'copy {running-config | tftp} {startup-config | tftp}'
      },
      {
        enabled: true,
        mode: '',
        description: 'write'
      },
      {
        enabled: true,
        mode: '',
        description: 'clock set <10:00:00> <20_September> <2017>'
      },
      {
        enabled: true,
        mode: 'config',
        description: 'no ip domain-lookup'
      },
      {
        enabled: true,
        mode: 'config',
        description: 'hostname <name>'
      },
      {
        enabled: true,
        mode: 'config',
        description: 'enable {password|secret} <password>'
      },
      {
        enabled: true,
        mode: 'config',
        description: 'line console 0'
      },
      {
        enabled: true,
        mode: 'config',
        description: 'line vty 0 15'
      },
      {
        enabled: true,
        mode: 'config-line',
        description: 'login'
      },
      {
        enabled: true,
        mode: 'config-line',
        description: 'password <password>'
      },
      {
        enabled: true,
        mode: 'config-line',
        description: 'logging synchronous'
      },
      {
        enabled: true,
        mode: 'config',
        description: 'default interface <type> <slot/port>',
        greedy: true
      },
      {
        enabled: true,
        mode: 'config',
        description: 'interface <type> <slot/port>',
        greedy: true
      },
      {
        enabled: true,
        mode: 'config',
        description: 'interface range <type> <slot/port>',
        greedy: true
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'ip address <address> <mask>'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'clock rate <bps>'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'no shutdown'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'description <text>'
      },
      {
        enabled: true,
        mode: 'config',
        description: 'banner motd # <message> #'
      }
    ]
  },
  {
    group: 'Router diagnostics',
    commands: [
      {
        enabled: true,
        mode: '',
        description: 'show version'
      },
      {
        enabled: true,
        mode: '',
        description: 'show running-config'
      },
      {
        enabled: true,
        mode: '',
        description: 'show startup-config'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip route'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip route <network-address> <mask>'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip protocols'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip interface'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip interface brief'
      },
      {
        enabled: true,
        mode: '',
        description: 'show interface'
      },
      {
        enabled: true,
        mode: '',
        description: 'show interface <type> <slot/port>',
        greedy: true
      },
      {
        enabled: true,
        mode: '',
        description: 'show controllers'
      },
      {
        enabled: true,
        mode: '',
        description: 'show controllers <type> <slot/port>',
        greedy: true
      }
    ]
  },
  {
    group: 'Router-on-a-stick',
    commands: [
      {
        enabled: true,
        mode: 'config',
        description: 'interface <type> <slot/port>',
        greedy: true
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'duplex {full|half}'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'shutdown'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'no shutdown'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'interface <type> <slot/port.subif_number>',
        greedy: true
      },
      {
        enabled: true,
        mode: 'config-subif',
        description: 'encapsulation dot1q <vlan_number>'
      },
      {
        enabled: true,
        mode: 'config-subif',
        description: 'ip address <gateway-IP-of-VLAN> <mask>'
      },
      {
        enabled: true,
        mode: '',
        description: 'show vlans'
      }
    ]
  },
  {
    group: 'Static route',
    commands: [
      {
        enabled: true,
        mode: 'config',
        description: 'ip route <network-address> <mask>'
      },
      {
        enabled: true,
        mode: 'config',
        description: 'ip route <network-address> <mask> <outgoing-interface>'
      },
      {
        enabled: true,
        mode: 'config',
        description:
          'ip route <network-address> <mask> <outgoing-interface> <next-hopaddress>'
      },
      {
        enabled: true,
        mode: 'config',
        description:
          'ip route <network-address> <mask> <outgoing-interface> <next-hopaddress> <administrative-distance>'
      }
    ]
  },
  {
    group: 'RIP',
    commands: [
      {
        enabled: true,
        mode: 'config',
        description: 'router rip'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'network <network-address>'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'version 2'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'no auto-summary'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'passive-interface <interface-type_number>'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'default-information originate'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'timers basic <update> <invalid> <holddown> <flush>'
      },

      {
        enabled: true,
        mode: 'config',
        description: 'key chain <name>' //does not need to match
      },
      {
        enabled: true,
        mode: 'config-keychain',
        description: 'key <number>' //needs to match
      },
      {
        enabled: true,
        mode: 'config-keychain-key',
        description: 'key-string <password>' //needs to match
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'ip rip authentication key-chain <name>'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'ip rip authentication mode {text|md5}'
      },

      {
        enabled: true,
        mode: '',
        description: 'debug ip rip'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip rip database'
      }
    ]
  },
  {
    group: 'EIGRP',
    commands: [
      {
        enabled: true,
        mode: 'config',
        description: 'router eigrp <AS-number>'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'network <network-address>'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'network <network-address> <wildcard-mask>'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'no auto-summary'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'passive-interface <interface-type_number>'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'redistribute static'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'variance <metric-multiplier>'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'bandwidth <value-in-kbps>'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'delay <value-in-tens-of-microseconds>'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'ip hello-interval eigrp <AS-number> <sec>'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'ip hold-time eigrp <AS-number> <sec>'
      },
      {
        enabled: true,
        mode: 'config-if',
        description:
          'ip summary-address eigrp <AS-number> <summary-address> <summarymask>'
      },

      {
        enabled: true,
        mode: 'config',
        description: 'key chain <name>' //does not need to match
      },
      {
        enabled: true,
        mode: 'config-keychain',
        description: 'key <number>' //needs to match
      },
      {
        enabled: true,
        mode: 'config-keychain-key',
        description: 'key-string <password>' //needs to match
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'ip authentication key-chain eigrp <AS-number> <name>'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'ip authentication mode eigrp <AS-number> md5'
      },

      {
        enabled: true,
        mode: '',
        description: 'show ip eigrp neighbors'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip eigrp neighbors <interface>'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip eigrp neighbors <AS-number>'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip eigrp topology'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip eigrp topology <AS-number>'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip eigrp topology <network-address> <mask>'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip eigrp topology all-links'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip eigrp interfaces'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip eigrp interfaces <AS-number>'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip eigrp traffic'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip eigrp traffic <AS-number>'
      },
      {
        enabled: true,
        mode: '',
        description: 'debug eigrp {fsm|packet}'
      },
      {
        enabled: true,
        mode: '',
        description: 'debug ip eigrp'
      },
      {
        enabled: true,
        mode: '',
        description: 'debug ip eigrp neighbor <neighbor-address>'
      }
    ]
  },
  {
    group: 'OSPF',
    commands: [
      {
        enabled: true,
        mode: 'config',
        description: 'router ospf <process-id>'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'router-id <ipv4-address>'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'network <net-address> <wildcard-mask> area <area-id>'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'passive-interface <interface-type_number>'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'auto-cost reference-bandwidth <value-in-Mbps>'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'default-information originate'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'area <area-id> range <summary-address> <subnet-mask>'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'ip ospf cost <value>'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'bandwidth <value-in-kbps>'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'ip ospf priority <value>'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'ip ospf {hello-interval|dead-interval} <seconds>'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'ip ospf network <network-type>'
      },

      {
        enabled: true,
        mode: 'config-router',
        description: 'area <area-id> authentication'
      },
      {
        enabled: true,
        mode: 'config-router',
        description: 'area <area-id> authentication message-digest'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'ip ospf authentication'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'ip ospf authentication message-digest'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'ip ospf authentication-key <password>'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'ip ospf message-digest-key <key-number> md5 <password>'
      },
      {
        enabled: true,
        mode: 'config-if',
        description: 'ip ospf message-digest-key <key-number> md5 <password>'
      },

      {
        enabled: true,
        mode: '',
        description: 'show ip ospf neighbor'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip ospf neighbor <interface-type_number>'
      },
      {
        enabled: true,
        mode: '',
        description:
          'show ip ospf neighbor <interface-type_number> <neighbor-id>'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip ospf interface'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip ospf interface <interface-type_number>'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip ospf database'
      },
      {
        enabled: true,
        mode: '',
        description: 'show ip ospf'
      },
      {
        enabled: true,
        mode: '',
        description: 'debug ip ospf'
      },
      {
        enabled: true,
        mode: '',
        description: 'debug ip ospf {events|adj}'
      },
      {
        enabled: true,
        mode: '',
        description: 'clear ip ospf process'
      },
      {
        enabled: true,
        mode: 'config',
        description: 'ip dhcp pool 1'
      },

      {
        enabled: true,
        mode: 'dhcp-config',
        description: 'utilization mark high {number} log'
      },
      {
        enabled: true,
        mode: 'dhcp-config',
        description: 'utilization mark low {number} log'
      },
      {
        enabled: true,
        mode: 'dhcp-config',
        description: 'network {number} [mask | /prefix-length] [secondary]'
      },
      {
        enabled: true,
        mode: 'dhcp-config',
        description: 'domain-name {domain}'
      },
      {
        enabled: true,
        mode: 'dhcp-config',
        description: 'dns-server {address} [address2 ... address8]'
      },
      {
        enabled: true,
        mode: 'dhcp-config',
        description: 'bootfile {filename}'
      },
      {
        enabled: true,
        mode: 'dhcp-config',
        description: 'next-server {address} [address2 ... address8]'
      },
      {
        enabled: true,
        mode: 'dhcp-config',
        description: 'netbios-name-server {address} [address2 ... address8]'
      },
      {
        enabled: true,
        mode: 'dhcp-config',
        description: 'netbios-node-type {type}'
      },
      {
        enabled: true,
        mode: 'dhcp-config',
        description: 'default-router {address} [address2 ... address8]'
      },
      {
        enabled: true,
        mode: 'dhcp-config',
        description:
          'option {code} [instance number] {ascii string | hex string | ip-address}'
      },
      {
        enabled: true,
        mode: 'dhcp-config',
        description: 'lease {days [hours [minutes]] | infinite}'
      },

      {
        enabled: true,
        mode: 'dhcp-config',
        description: 'end'
      },
      {
        enabled: true,
        mode: 'config',
        description: 'ip dhcp excluded-address'
      }
    ]
  }
]

export default {
  name: 'cisco-cli',
  data() {
    return {
      hostname: 'Router',
      enabled: false,
      mode: '',
      cmd: '',
      pos: 0,

      help: '',
      helps: [],
      cmds: router_cmds,
      history: [],
      history_ptr: 0,
      curr_ptr: true,
      ch_w: null,

      cmdCliWidth: 0
    }
  },
  methods: {
    KeyDown() {
      this.helps = []
      this.cmds.forEach(x =>
        this.helps.push({
          group: x.group,
          commands: x.commands.filter(
            cmd =>
              cmd.enabled == this.enabled &&
              cmd.mode == this.mode &&
              this.CmdCmpr(this.cmd, cmd.description)
          )
        })
      )

      //this.helps.sort((a, b) => a.length - b.length)
      let help = this.CmdMasks(this.cmd, true)

      if (help) {
        let ignoreWords = this.cmd.match(/([\s]+)/g)
        ignoreWords = ignoreWords == null ? 0 : ignoreWords.length
        this.help = help
          .split(' ')
          .slice(ignoreWords)
          .join(' ')
      } else {
        this.help = ''
      }
    },
    Autocomplete() {
      // let word = this.cmd.slice(0, this.pos).split(' ')
      // word = word[word.length - 1]

      // let newCmd = this.CmdExpand(this.cmd)
      // if (newCmd != this.cmd) {
      //   this.cmd = newCmd + ' '
      //   this.pos = this.cmd.length
      // }

      this.KeyDown()
    },
    Enter() {
      this.history.push({
        type: 'cmd',
        cmd: null,
        hostname: this.hostname,
        enabled: this.enabled,
        mode: this.mode,
        description: this.cmd
      })

      this.history_ptr = this.history.length - 1
      this.curr_ptr = true
      let expand = this.CmdExpand(this.cmd.trim())
      let func = this.GetCmd(expand)

      let handler = () => {
        if (typeof func == 'undefined') {
          this.history.push({
            type: 'text',
            text: '% Unknown command.'
          })
          return
        }

        if (typeof func.validate != 'undefined' && !func.validate(expand)) {
          this.history.push({
            type: 'text',
            text: '% Not valid input.'
          })
          return
        }

        this.StatesHandler(expand)

        // Debugging purposes
        if (typeof func.run == 'undefined') {
          this.history.push({
            type: 'text',
            text: '> ' + expand
          })
          return
        }

        let result = func.run(expand)
        if (typeof result == 'string') {
          this.history.push({
            type: 'text',
            text: result
          })
        } else if (Array.isArray(result)) {
          this.history.push(...result)
        } else {
          this.history.push(result)
        }
      }
      handler()

      this.cmd = ''
      this.pos = 0
      this.KeyDown()
      setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 0)
    },
    CmdCmpr(cmd, mask, greedy = false) {
      let a_cmd = String(cmd).split(' ')
      let a_mask = String(mask).split(' ')

      for (const i in a_cmd) {
        let w_cmd = a_cmd[i]
        let w_mask = a_mask[i]

        if (typeof w_mask == 'undefined') return greedy

        // Check for input
        if (w_mask.match(/<.*>/)) continue

        // Check for wildcard
        let wildcard
        if ((wildcard = w_mask.match(/\{(.*)\}/))) {
          wildcard = wildcard[1].split('|')

          if (
            typeof wildcard.find(rule => rule.startsWith(w_cmd)) === 'undefined'
          )
            return false
          else continue
        }

        if (!w_mask.startsWith(w_cmd)) return false
      }

      return true
    },
    sharedStart(array) {
      let A = array.concat().sort(),
        a1 = A[0],
        a2 = A[A.length - 1],
        L = a1.length,
        i = 0
      while (i < L && a1.charAt(i) === a2.charAt(i)) i++
      return a1.substring(0, i)
    },
    GetCmd(short) {
      let cmds = this.cmds.flatMap(x => x.commands)
      cmds = cmds.filter(
        cmd =>
          cmd.enabled == this.enabled &&
          cmd.mode == this.mode &&
          this.CmdCmpr(
            short,
            cmd.description,
            typeof cmd.greedy !== 'undefined' && cmd.greedy
          )
      )

      if (cmds.length == 1) return cmds[0]

      return undefined
    },
    CmdMasks(short, wildcard = false) {
      let cmds = this.cmds.flatMap(x => x.commands)
      cmds = cmds.filter(
        cmd =>
          cmd.enabled == this.enabled &&
          cmd.mode == this.mode &&
          this.CmdCmpr(
            short,
            cmd.description,
            typeof cmd.greedy !== 'undefined' && cmd.greedy
          )
      )

      if (!wildcard) return cmds

      if (cmds.length == 1) return cmds[0].description

      cmds.sort((a, b) => a.description.length - b.description.length)
      let word = null
      return typeof cmds.find(cmd => {
        if (word == null) {
          word = cmd.description
          return 0
        }

        word = this.sharedStart([word, cmd.description])
        return !cmd.description && !word.startsWith(cmd.description)
      }) == 'undefined'
        ? word
        : null
    },
    CmdExpand(short) {
      let cmd = this.CmdMasks(short, true)

      let a_cmd = String(short).split(' ')
      let a_mask = String(cmd).split(' ')
      let result = []
      for (const i in a_cmd) {
        let w_cmd = a_cmd[i]
        let w_mask = a_mask[i]

        if (typeof w_mask == 'undefined') {
          result.push(w_cmd)
          continue
        }

        // Check for input
        if (w_mask.match(/<.*>/)) {
          result.push(w_cmd)
          continue
        }
        // Check for wildcard
        let wildcard
        if ((wildcard = w_mask.match(/\{(.*)\}/))) {
          wildcard = wildcard[1].split('|')
          let res = wildcard.find(rule => rule.startsWith(w_cmd))

          if (typeof res === 'undefined') result.push(w_cmd)
          else result.push(res)

          continue
        }

        if (!w_mask.startsWith(w_cmd)) result.push(w_cmd)
        else result.push(w_mask)
      }

      return result.join(' ')
    },
    StatesHandler(cmd) {
      if (!this.enabled) {
        if (cmd == 'enable') {
          this.enabled = true
          return
        }

        return
      }

      if (this.mode === 'config') {
        if (cmd == 'ip dhcp pool 1') {
          this.mode = 'dhcp-config'
          return
        }
      }

      if (this.mode == '') {
        if (cmd == 'disable' || cmd == 'exit') {
          this.enabled = false
          return
        }
        if (cmd == 'configure terminal') {
          this.mode = 'config'
        }
        return
      }

      if (cmd == 'end') {
        this.mode = ''
        return
      }

      if (cmd == 'exit') {
        if (this.mode == 'config-keychain-key') {
          this.mode = 'config-keychain'
          return
        }
        if (this.mode == 'config') {
          this.mode = ''
          return
        }
        this.mode = 'config'
        return
      }

      if (this.mode == 'config') {
        let m
        if ((m = cmd.match(/^hostname (.*)/))) {
          this.hostname = m[1]
          return
        }
        if (cmd.startsWith('line')) {
          this.mode = 'config-line'
          return
        }
        if (cmd.startsWith('interface')) {
          this.mode = 'config-if'
          return
        }
        if (cmd.startsWith('vlan')) {
          this.mode = 'config-vlan'
          return
        }
        if (cmd.startsWith('router')) {
          this.mode = 'config-router'
          return
        }
        if (cmd.startsWith('key')) {
          this.mode = 'config-keychain'
          return
        }
        return
      }
    },
    contextMenuListener(e) {
      navigator.clipboard.readText().then(tex => {
        this.cmd =
          this.cmd.slice(0, this.pos) +
          tex +
          this.cmd.slice(this.pos, this.cmd.length)
        this.pos += tex.length
      })

      e.preventDefault()
    },
    keyDownListener(event) {
      if (event.ctrlKey) {
        switch (event.key) {
          case 'a':
            this.pos = 0
            break
          case 'e':
            this.pos = this.cmd.length
            break
          case 'd':
          case 'c':
            this.cmd = ''
            this.pos = 0
            break
        }
        event.preventDefault()
        return
      }

      switch (event.keyCode) {
        case 8: // backspace
          if (this.pos == 0) return
          this.pos--
        // eslint-disable-next-line
        case 46: // delete
          this.cmd =
            this.cmd.slice(0, this.pos) +
            this.cmd.slice(this.pos + 1, this.cmd.length)
          this.KeyDown()
          return event.preventDefault()

        case 37: // left
          this.pos <= 0 || this.pos--
          return event.preventDefault()

        case 39: // right
          this.pos == this.cmd.length || this.pos++
          return event.preventDefault()

        case 38: // top
          if (this.curr_ptr) {
            this.curr_ptr = false
            ;(this.cmd = this.history[this.history_ptr].description),
              (this.pos = this.cmd.length)
            return
          }

          if (this.history_ptr > 0) {
            this.history_ptr--
            while (
              this.history[this.history_ptr].type != 'cmd' &&
              this.history_ptr-- >= 0
            );
          }

          ;(this.cmd = this.history[this.history_ptr].description),
            (this.pos = this.cmd.length)

          return event.preventDefault()

        case 40: // bottom
          if (this.curr_ptr) return

          if (this.history_ptr < this.history.length) {
            this.history_ptr++
            while (
              this.history_ptr < this.history.length - 1 &&
              this.history[++this.history_ptr].type !=
                'cmd' /* && this.history_ptr++ < this.history.length*/
            );
            while (
              this.history[this.history_ptr].type != 'cmd' &&
              this.history_ptr-- >= 0 &&
              (this.curr_ptr = true)
            );
          }

          ;(this.cmd = this.history[this.history_ptr].description),
            (this.pos = this.cmd.length)

          return event.preventDefault()
        case 13: // enter
          this.Enter()

          return event.preventDefault()
        case 9: // tab
          this.Autocomplete()

          return event.preventDefault()
      }

      const keycode = event.keyCode
      let valid =
        (keycode > 47 && keycode < 58) || // number keys
        keycode == 32 ||
        keycode == 13 || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91) || // letter keys
        (keycode > 95 && keycode < 112) || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223) // [\]' (in order)

      if (valid) {
        this.cmd += event.key
        this.pos += event.key.length
        this.KeyDown()
      }
    },
    getRandomNumber() {
      return Math.trunc(Math.random() * 10 ** 6)
    },
    getRandomHex() {
      return this.getRandomNumber().toString(16)
    }
  },
  watch: {
    pos: function() {
      this.$nextTick(() => {
        this.cmdCliWidth = this.$refs.cmdCli.getBoundingClientRect().width
      })
    }
  },
  mounted() {
    // Paste on right click
    document.addEventListener('contextmenu', this.contextMenuListener, false)

    // Copy on selection
    document.onmouseup = function() {
      var text = ''
      if (window.getSelection) {
        text = window.getSelection()
      } else if (document.getSelection) {
        text = document.getSelection()
      } else if (document.selection) {
        text = document.selection.createRange().text
      }

      if (text.toString()) {
        navigator.clipboard.writeText(text.toString())
      }
    }

    document.addEventListener('keydown', this.keyDownListener)

    // Set cursor width
    let ch_w = getComputedStyle(document.getElementById('ch'))['width'].replace(
      /px/,
      ''
    )
    this.ch_w = ch_w

    document
      .querySelectorAll('.cursor')
      .forEach(e => e.setAttribute('style', 'width:' + ch_w + 'px;'))
  },
  beforeDestroy() {
    document.onmouseup = null
    document.removeEventListener('keydown', this.keyDownListener)
    document.removeEventListener('contextmenu', this.contextMenuListener)
  }
}
</script>

<style lang="scss" scoped>
.cli {
  &-wrapper {
    position: relative;
    background: #222;
    color: #ccc;
    font-family: Consolas, monospace;
    padding: 0;
    margin: 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
    border-radius: 5px;
  }
}

.cmds {
  padding: 0;
  margin: 0;
  width: 50%;
}

.cmds li {
  list-style-type: none;
}

.active {
  background: rgba(255, 255, 255, 0.1);
}

.cmd {
  position: relative;
  white-space: pre;
}

.cursor {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  background-color: #606060;
  vertical-align: top;
  width: 0.6rem;
  height: 1.2rem;
  -webkit-animation: blink 1s step-end infinite;
  animation: blink 1s step-end infinite;
}

.help {
  color: #aaa;
  font-style: italic;
}

.helps {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 10px;
  box-sizing: border-box;
}

.console li {
  white-space: pre;
}

@-webkit-keyframes blink {
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0.7;
  }
}

@keyframes blink {
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0.7;
  }
}

#ch {
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  bottom: 0;
}
</style>
