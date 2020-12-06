<template>
  <div class="sidebar">
    <div class="sidebar__searh">
      <input type="search" placeholder="Поиск">
    </div>
    <router-link 
      tag="a" 
      :to="`/inbox/im${dialog.assignee.id}`"
      class="sidebar__item"
      v-for="(dialog, index) in dialogs"
      :key="index"
    >
      <div class="sidebar__item-left">
        <div class="sidebar__item-img">
          <img src="@/assets/img/avatar.svg" alt="avatar">
        </div>
      </div>
      <div class="sidebar__item-right">
        <span class="sidebar__item-name">{{ dialog.assignee.first_name }} {{ dialog.assignee.last_name }}</span>
        <span class="sidebar__item-msg">Message</span>
      </div>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'chat-sidebar',
  props: {
    dialogs: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
</style> 