<template>
  <div class="chat">
    <span>Выберите, с кем хотели бы обсудить новую серию</span>
  </div>
</template>

<script>

export default {
  name: 'inbox',
  sockets: {
    connect() {
      console.log('socket connected');
    },
  },
};
</script>

<style lang="scss">
</style>
