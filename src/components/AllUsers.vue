<template>
  <div
    id="modal6"
    class="modal modal-dialog"
    ref="modalUsers"
  >
    <div class="modal-dialog__header">
      <h3 class="title--h3">Все пользователи</h3>
    </div>

    <router-link
      class="modal-dialog__item modal-close"
      tag="a"
      v-for="user in users"
      :key="user.id"
      :to="`/user/${user.id}`"
    >
      <div class="modal-dialog__item-left">
        <div class="modal-dialog__item-img image">
          <img
            :src="root + user.avatar"
            alt="avatar"
          >
        </div>
      </div>
      <div class="modal-dialog__item-right">
        <span class="modal-dialog__item-name">{{ user.first_name }} {{ user.last_name }}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'AllUsers',
  props: {
    users: {
      type: Array,
      default() {
        return []
      }
    },
    root: {
      type: String,
      default: ''
    }
  },
  mounted() {
    M.Modal.init(this.$refs.modalUsers)
  }
};
</script>

<style scoped>

</style>
