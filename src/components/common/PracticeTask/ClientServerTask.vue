<template>
  <div class="client-server-wrapper">
    <p class="client-server-task-title">
      <b>Задача:</b> Установите верный порядок взаимодействия клиента и сервера
    </p>

    <draggable
      tag="ul"
      v-model="list"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <li class="list-group-item" v-for="element in list" :key="element.id">
          <span class="list-group-item-text">{{ element.text }}</span>
        </li>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

import { shuffleArray } from '@/utils/arrays'

export default {
  name: 'client-server-task',
  components: {
    draggable
  },
  props: {
    arr: {
      type: Array,
      required: true
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  data() {
    return {
      drag: false,
      list: []
    }
  },
  methods: {
    onComplete() {
      this.$emit(
        'on-complete',
        this.list.map(item => item.id)
      )
    }
  },
  created() {
    this.list.push(...shuffleArray(this.arr))
  }
}
</script>

<style lang="scss">
$arrowSize: 16px;

.flip-list-move {
  transition: transform 0.2s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.4;
  background: #bbb;
}
.list-group-item {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;
  width: 400px;
  padding: 10px 15px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  cursor: move;
  &:not(:last-child) {
    margin-bottom: 40px;
    &:not(.ghost) {
      &::before {
        content: '';
        width: $arrowSize;
        height: $arrowSize;
        border-right: 2px solid currentcolor;
        border-bottom: 2px solid currentcolor;
        position: absolute;
        color: #bbb;
      }

      &::before {
        left: 50%;
        bottom: -20px;
        transform: rotate(45deg);
      }
    }
  }
}

.client-server {
  &-task-title {
    margin-bottom: 30px;
  }
}
</style>
