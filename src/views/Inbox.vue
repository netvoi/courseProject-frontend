<template>
  <div class="container">
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
    ])
  },
  mounted() {
    this.GET_ALL_DIALOGS()
  },
  computed: {
    ...mapGetters([
      'ALL_DIALOGS'
    ])
  }
};
</script>

<style lang="scss">
</style>
