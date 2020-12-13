<template>
  <header class="dialog__header">
    <div class="dialog__user">
      <div class="dialog__user-img image">
        <img
            v-if="user.avatar !== null"
            :src="root + user.avatar"
            alt="avatar"
        >
      </div>
      <router-link
          tag="a"
          :to="`/user/${user.id}`"
          class="dialog__user-name"
      >{{user.first_name}} {{user.last_name}}</router-link>
    </div>
    <div class="dialog__options">
      <button class="dialog__btn dialog__btn--more"></button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'DialogHeader',
  props: {
    user: {
      type: Object,
      default() {
        return {}
      }
    },
    root: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss">

</style>
