<template>
  <div 
    class="main-layout"
    @click="closeSearch"
  >

    <Header
      @searchStatus="searchStatus"
      :authUser="ME"
      :root="root"
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
      :root="root"
    />

    <router-view />

    <!-- <Footer/> -->
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import About from '@/components/About.vue'
import Settings from '@/components/Settings/Settings.vue'
import Search from '@/components/Search.vue'

import { mapActions, mapGetters } from 'vuex'

import pathRoot from '@/utils/root'

export default {
  name: 'main-layout',
  data: () => ({
    showSearch: false,
    tabs: null,
    root: ''
  }),
  components: {
    Header,
    Footer,
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
    eventUpdateData(user) {
      this.UPDATE_USER_DATA(user)
        .then(() => this.GET_ME())
    },
    eventUpdatePassword(password) {
      this.UPDATE_USER_PASSWORD(password)
    },
    eventUpdatePhoto() {
      this.GET_ME()
    }
  },
  mounted() {
    console.log('Main layout');

    this.GET_ALL_SERIES()
    this.GET_ME()
      .then(() => this.$socket.emit('userJoin', { id: this.ME.userId }))

    this.root = pathRoot
  },
  computed: {
    ...mapGetters([
      'FOUND_SERIES',
      'ME'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .main-layout {
    position: relative;
  }
</style>