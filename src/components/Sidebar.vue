<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <div class="sidebar__search">
        <input type="search" placeholder="Поиск">
      </div>
      <div class="sidebar__btn">
        <button data-target="modalDialogs" class="modal-trigger"></button>
      </div>
    </div>

    <router-link
      class="sidebar__item"
      v-for="(dialog, index) in dialogs"
      :key="index"
      tag="a"
      :to="`/inbox/im${dialog.id}`"
    >
      <div class="sidebar__item-left">
        <div class="sidebar__item-img">
          <img
            v-if="dialog.avatar !== null"
            :src="`${root}${dialog.avatar}`"
            alt="avatar"
          >
          <img
            v-else
            :src="`${root}default-avatar.svg`"
            alt="avatar"
          >
        </div>
      </div>
      <div class="sidebar__item-right">
        <span class="sidebar__item-name">{{ dialog.first_name }} {{ dialog.last_name }}</span>
        <span class="sidebar__item-msg">Message</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import r from '@/utils/root'

export default {
  name: 'chat-sidebar',
  data: () => ({
    root: ''
  }),
  props: {
    dialogs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    this.root = r
  },
}
</script>

<style lang="scss">
</style>
