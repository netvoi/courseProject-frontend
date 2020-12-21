<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <div class="sidebar__search">
        <input type="search" placeholder="Поиск">
      </div>
      <div class="sidebar__btn">
        <a class="modal-trigger" href="#modalDialogs"></a>
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
              :src="root + dialog.avatar"
              alt="avatar"
          >
        </div>
      </div>
      <div class="sidebar__item-right">
        <span class="sidebar__item-name">{{ dialog.first_name }} {{ dialog.last_name }}</span>
        <!--<span class="sidebar__item-msg">Message</span>-->
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
        return [];
      }
    },
    root: {
      type: String,
      default: ''
    }
  },
};
</script>

<style lang="scss">
</style>
