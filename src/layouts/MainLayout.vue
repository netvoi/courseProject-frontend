<template>
  <div
    class="main-layout"
    @click="closeSearch"
  >

    <Header
      @searchStatus="searchStatus"
      :authUser="ME"
      :root="ROOT"
    />

    <div @click.stop="">
      <Search
        @closeSearch="closeSearch"
        :showSearch="showSearch"
        :allSeries="FOUND_SERIES"
      />
    </div>

    <Settings
      @eventUpdateData="eventUpdateData"
      @eventUpdatePassword="eventUpdatePassword"
      @eventUpdatePhoto="eventUpdatePhoto"

      :authUser="ME"
      :root="ROOT"
    />

    <About />

    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import About from '@/components/About.vue'
import Settings from '@/components/Settings/Settings.vue'
import Search from '@/components/Search.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'main-layout',
  data: () => ({
    showSearch: false,
    tabs: null,
  }),
  components: {
    Header,
    About,
    Settings,
    Search,
  },
  methods: {
    ...mapActions([
      'GET_ALL_SERIES',
      'GET_FOUND_SERIES',
      'GET_ME',
      'UPDATE_USER_DATA',
      'UPDATE_USER_PASSWORD',
    ]),
    searchStatus(status, search) {
      if(status) {
        this.showSearch = status
        this.GET_FOUND_SERIES(search)
      } else {
        this.showSearch = status
      }
    },
    closeSearch() {
      this.showSearch = false
    },
    async eventUpdateData(user) {
      this.$socket.emit('updateUserInfo', { id: this.ME.userId })

      await this.UPDATE_USER_DATA(user)
      await this.GET_ME()
    },
    async eventUpdatePassword(password) {
      await this.UPDATE_USER_PASSWORD(password)
    },
    async eventUpdatePhoto() {
      this.$socket.emit('updateUserInfo', { id: this.ME.userId })

      await this.GET_ME()
    }
  },
  async mounted() {
    await this.GET_ALL_SERIES()
    await this.GET_ME()

    this.$socket.emit('userJoin', { id: this.ME.userId })
  },
  computed: {
    ...mapGetters([
      'FOUND_SERIES',
      'ME',
      'ROOT'
    ])
  }
}
</script>

<style lang="scss">
  .main-layout {
    position: relative;
  }
</style>
