<template>
  <div 
    class="main-layout"
    @click="closeSearch"
  >
    <!-- Header -->
    <Header
      @searchStatus="searchStatus"
    />

    <!-- Search field -->
    <div @click.stop="">
      <Search
        @closeSearch="closeSearch"
        :showSearch="showSearch"
        :allSeries="FOUND_SERIES"
      />
    </div>

    <!-- Modal windows -->
    <About />

    <!-- Views -->
    <router-view/>

    <!-- Footer -->
    <Footer
    />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import About from '@/components/About.vue'
import Search from '@/components/Search.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'main-layout',
  data: () => ({
    showSearch: false,
  }),
  components: {
    Header,
    Footer,
    About,
    Search,
  },
  methods: {
    ...mapActions([
      'GET_ALL_SERIES',
      'GET_FOUND_SERIES',
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
    }
  },
  mounted() {
    this.GET_ALL_SERIES()
  },
  computed: {
    ...mapGetters([
      'FOUND_SERIES'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .main-layout {
    position: relative;
  }
</style>