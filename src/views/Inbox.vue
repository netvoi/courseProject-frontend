<template>
  <div class="container">

    <ModalDialogs
      :users="SOME_USERS"
      :root="ROOT"
    />

    <div class="shadow">
      <div class="row no-gutters">
        <div class="col-3">
          <Sidebar
            :dialogs="ALL_DIALOGS"
            :root="ROOT"
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
import Sidebar from '@/components/Inbox/Sidebar.vue'
import ModalDialogs from '@/components/Inbox/ModalDialogs.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'inbox',
  components: {
    Sidebar,
    ModalDialogs
  },
  methods: {
    ...mapActions([
      'GET_ALL_DIALOGS',
      'GET_MY_FRIENDS',
      'GET_SOME_USERS'
    ])
  },
  async mounted() {
    this.sockets.subscribe('new-dialog', async () => {
      await this.GET_ALL_DIALOGS()
    })

    await this.GET_ALL_DIALOGS()
    await this.GET_MY_FRIENDS()
    await this.GET_SOME_USERS({ id: this.MY_FRIENDS })

    M.Modal.init(this.$refs.modalDialogs)
  },
  computed: {
    ...mapGetters([
      'ALL_DIALOGS',
      'MY_FRIENDS',
      'SOME_USERS',
      'ROOT'
    ])
  }
};
</script>

<style lang="scss">
</style>
