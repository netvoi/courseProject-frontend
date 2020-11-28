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
  .chat {
    height: 100vh;
    border-right: 1px solid rgba(#000, .05);
  }
</style>
