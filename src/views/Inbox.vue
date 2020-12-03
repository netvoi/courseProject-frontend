<template>
  <div class="container">
    <div class="shadow">
      <div class="row no-gutters">
        <div class="col-3">
          <Sidebar />
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
};
</script>

<style lang="scss">
</style>
