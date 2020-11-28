<template>
  <div class="sidebar">
    <div class="sidebar__searh">
      <input type="search" placeholder="Поиск">
    </div>
    <router-link @click.native="userJoin" tag="a" to="/inbox/im1" class="sidebar__item">
      <div class="sidebar__item-left">
        <div class="sidebar__item-img">
          <img src="@/assets/img/avatar.svg" alt="avatar">
        </div>
      </div>
      <div class="sidebar__item-right">
        <span class="sidebar__item-name">Джон</span>
        <span class="sidebar__item-msg">Message</span>
      </div>
    </router-link>

    <div class="sidebar__item">
      <div class="sidebar__item-left">
        <div class="sidebar__item-img">
          <img src="@/assets/img/avatar.svg" alt="avatar">
        </div>
      </div>
      <div class="sidebar__item-right">
        <span class="sidebar__item-name">Джон</span>
        <span class="sidebar__item-msg">Message</span>
      </div>
    </div>

    <div class="sidebar__item">
      <div class="sidebar__item-left">
        <div class="sidebar__item-img">
          <img src="@/assets/img/avatar.svg" alt="avatar">
        </div>
      </div>
      <div class="sidebar__item-right">
        <span class="sidebar__item-name">Джон</span>
        <span class="sidebar__item-msg">It is a big message in my life and in the world</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'chat-sidebar',
  methods: {
    ...mapActions([
      'GET_SOCKET',
    ]),
    userJoin() {
      const dialog = {
        id: 1
      }

      this.$socket.emit("userJoin", dialog, data => {
        if (typeof data === "string") {
          console.error(data);
        } else {
          this.GET_SOCKET(data.userId)
        }
      });
    }
  }
}
</script>

<style lang="scss">
</style> 