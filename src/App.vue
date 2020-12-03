<template>
  <div id="app">

    <component :is="layout">
      <router-view />
    </component>

  </div>
</template>

<script>
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'

export default {
  name: 'app',
  components: {
    AuthLayout,
    MainLayout,
  },
  computed: {
    layout() {
      if(!!this.$route.meta.layout) {
        return (this.$route.meta.layout) + '-layout'
      }
    }
  }
};
</script>

<style lang="scss">
</style>
