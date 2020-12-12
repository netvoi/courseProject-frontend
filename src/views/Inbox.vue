<template>
  <div class="container">
    <div
      id="modalDialogs"
      class="modal modal-dialog"
      ref="modalDialogs"
    >
      <div class="modal-dialog__header">
        <h3>Новое сообщение</h3>
      </div>

      <router-link
        class="modal-dialog__item modal-close"
        tag="a"
        v-for="user in SOME_USERS"
        :key="user.id"
        :to="`/inbox/im${user.id}`"
      >
        <div class="modal-dialog__item-left">
          <div class="modal-dialog__item-img image">
            <img
              :src="`http://localhost:8081/static/uploads/${user.avatar}`"
              alt="avatar"
            >
          </div>
        </div>
        <div class="modal-dialog__item-right">
          <span class="modal-dialog__item-name">{{ user.first_name }} {{ user.last_name }}</span>
        </div>
      </router-link>
    </div>

    <div class="shadow">
      <div class="row no-gutters">
        <div class="col-3">
          <Sidebar
            :dialogs="ALL_DIALOGS"
          />
        </div>
        <div class="col-9 pr-5 pl-5">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'inbox',
  components: {
    Sidebar
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
  },
  methods: {
    ...mapActions([
      'GET_ALL_DIALOGS',
      'GET_MY_FRIENDS',
      'GET_SOME_USERS'
    ])
  },
  async mounted() {
    await this.GET_ALL_DIALOGS()
    await this.GET_MY_FRIENDS()
    await this.GET_SOME_USERS({ id: this.MY_FRIENDS })

    M.Modal.init(this.$refs.modalDialogs)
  },
  computed: {
    ...mapGetters([
      'ALL_DIALOGS',
      'MY_FRIENDS',
      'SOME_USERS'
    ])
  }
};
</script>

<style lang="scss">
</style>
