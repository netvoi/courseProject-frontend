<template>
  <div class="sidebar">
    <div class="sidebar__searh">
      <input type="search" placeholder="Поиск">
    </div>
    <router-link tag="a" to="/inbox/im8" class="sidebar__item">
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

    <router-link tag="a" to="/inbox/im2" class="sidebar__item">
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
        <span class="sidebar__item-msg">It is a big message in my life and in the world</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'chat-sidebar',
}
</script>

<style lang="scss">
</style> 