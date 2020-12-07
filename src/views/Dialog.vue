<template>
  <div class="dialog">
    <header class="dialog__header">
      <div class="dialog__user">
        <div class="dialog__user-img image">
          <img
              v-if="USER.avatar !== null"
              :src="`${root}${USER.avatar}`"
              alt="avatar"
            >
          <img
            v-else
            src="@/assets/img/avatar.svg"
            alt="avatar"
          >
        </div>
        <router-link
          tag="a"
          :to="`/user/${USER.id}`"
          class="dialog__user-name"
        >{{USER.first_name}} {{USER.last_name}}</router-link>
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
import Message from '@/components/Dialog/Message.vue'
import r from '@/utils/root'

export default {
  name: 'chat-dialog',
  data: () => ({
    msg: '',
    root: ''
  }),
  components: {
    Message,
  },
  methods: {
    ...mapActions([
      'IS_DIALOG_EXIST',
      'CREATE_DIALOG',
      'CREATE_MESSAGE',
      'CREATE_DIALOG_BETWEEN_USERS',
      'GET_USER_FROM_DB'
    ]),
    async sendMsg() {
      if(!this.msg.length) return

      console.log('!!!!!!!!!!!!!!!!!!!', this.DIALOG_EXIST);

      if(this.DIALOG_EXIST) {
        // Логика для записи в бд в сущ-ий диалог
        console.log(`Записываю данные в сущ-ий диалог №${this.DIALOG_ID}`)

        const message = await this.CREATE_MESSAGE({
          dialogsId: this.DIALOG_ID,
          text: this.msg
        })
        message.status === 200 ? this.msg = '' : console.log('Что-то пошло не так!')
        
      } else {
        // Логика для записи данных в бд в новый диалог
        console.log('Создаю новый диалог и записываю данные')

        const dialog = await this.CREATE_DIALOG()

        const data = { id: this.$route.params.id, dialogsId: dialog.data.id }
        const usersDialog = await this.CREATE_DIALOG_BETWEEN_USERS(data)

        const message = await this.CREATE_MESSAGE({
          dialogsId: dialog.data.id,
          text: this.msg
        })
        if(message.status === 200) {
          this.msg = ''
          this.IS_DIALOG_EXIST({ assigneeId: this.$route.params.id })
        } else {
          console.log('Что-то пошло не так!')
        } 
      }
    },
    __mounted(id) {
      this.GET_USER_FROM_DB(id)
      this.IS_DIALOG_EXIST({ assigneeId: id })
      this.root = r
    }
  },
  mounted() {
    this.__mounted(this.$route.params.id)
  },
  computed: {
    ...mapGetters([
      'DIALOG_EXIST',
      'DIALOG_ID',
      'USER',
    ])
  },
  beforeRouteUpdate(to, from, next) {
    this.__mounted(to.params.id)
    next()
  }
}
</script>

<style lang="scss">
</style> 