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
      />
    </div>

    <footer class="dialog__footer">
      <input
        class="dialog__footer-send"
        type="text"
        placeholder="Написать сообщение..."
        v-model="msg"
      >
      <!-- @keydown.enter="sendMsg" -->

      <div class="dialog__footer-btns">
        <button class="dialog__footer-btn dialog__footer-btn--smile"></button>
        <button
          class="dialog__footer-btn dialog__footer-btn--send"
        ></button>
        <!-- @click.prevent="sendMsg" -->

      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Message from '@/components/Dialog/Message.vue'

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
    ]),
    sendMsg(id) {
      this.$socket.emit('sendMsg', { id }, cb => {
        // console.log(cb.id);
      })
    },
  },
  mounted() {
    this.sendMsg(this.$route.params.id)
    this.$socket.on('customEmit', (response, cb) => {
      console.log('message:', response.msg)
      cb({ id: this.$route.params.id })
    })
  },
  computed: {
    ...mapGetters([
    ])
  }
}
</script>

<style lang="scss">
</style> 