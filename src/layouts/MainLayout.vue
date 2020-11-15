<template>
  <div class="main-layout">
    <!-- Header -->
    <Header
    />

    <!-- Modal windows -->
    <About />

    <!-- Views -->
    <router-view />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import About from '@/components/About.vue';

export default {
  name: 'main-layout',
  components: {
    Header,
    Footer,
    About,
  },
}
</script>