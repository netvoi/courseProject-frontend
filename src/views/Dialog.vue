<template>
  <div class="dialog">
    <header class="dialog__header">
      <div class="dialog__user">
        <div class="dialog__user-img image">
          <img src="@/assets/img/avatar3.jpg" alt="avatar">
        </div>
        <router-link tag="a" to="#" class="dialog__user-name">Джон Сноу</router-link>
      </div>
      <div class="dialog__options">
        <button class="dialog__btn dialog__btn--more"></button>
      </div>
    </header>

    <div class="dialog__content">
      <Message
        v-for="(item, index) in MESSAGES"
        :key="index"
        :text="item.text"
        :owner="item.socketId === SOCKET"
      />
    </div>

    <footer class="dialog__footer">
      <input
        class="dialog__footer-send"
        type="text"
        placeholder="Написать сообщение..."
        v-model="msg"
        @keydown.enter="sendMsg"
      >

      <div class="dialog__footer-btns">
        <button class="dialog__footer-btn dialog__footer-btn--smile"></button>
        <button
          class="dialog__footer-btn dialog__footer-btn--send"
          @click.prevent="sendMsg"
        ></button>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Message from '@/components/Message.vue'

export default {
  name: 'chat-dialog',
  data: () => ({
    msg: ''
  }),
  components: {
    Message,
  },
  methods: {
    ...mapActions([
      'GET_SOCKET',
      'SOCKET_GET_DATA'
    ]),
    sendMsg() {
      this.$socket.emit('createMsg', {
        text: this.msg,
        socketId: this.SOCKET
      }, cb => {
        if(typeof cb === 'string') {
          console.error(cb)
        } else {
          this.SOCKET_GET_DATA(cb)
          this.msg = ''
        }
      })
      
    }
  },
  computed: {
    ...mapGetters([
      'SOCKET',
      'MESSAGES',
    ])
  }
}
</script>

<style lang="scss">
</style> 