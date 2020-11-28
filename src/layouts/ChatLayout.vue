<template>
  <div class="chat-layout">
    <!-- Header -->
    <Header
      v-if="this.$route.name !== null"
    />

    <!-- Modal windows -->
    <About />

    <div class="container">
      <div class="row">
        <div class="col-3">
          <Sidebar />
        </div>
        <div class="col-9">
          <router-view />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer
    />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import About from '@/components/About.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'chat',
  components: {
    Header,
    Footer,
    About,
    Sidebar
  },
}
</script>

<style lang="scss">
</style> 