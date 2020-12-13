<template>
  <div class="dialog" v-if="!!USER && Object.keys(USER).length">

    <DialogHeader
      :user="USER"
      :root="ROOT"
    />

    <div class="dialog__content" ref="block">
      <Message
        :messages="MESSAGES"
        :owner="ME.userId"
      />
    </div>

    <footer class="dialog__footer">
      <textarea
        @input="auto_grow"
        class="dialog__footer-send"
        placeholder="Написать сообщение..."
        v-model="msg"
        ref="area"
        v-hotkey="keymap"
      ></textarea>

      <div class="dialog__footer-btns">
<!--        <button class="dialog__footer-btn dialog__footer-btn&#45;&#45;smile"></button>-->
        <emoji-picker @emoji="append" :search="search">
          <button
              class="emoji-invoker dialog__footer-btn dialog__footer-btn--smile"
              slot="emoji-invoker"
              slot-scope="{ events: { click: clickEvent } }"
              @click.stop="clickEvent"
          >
          </button>
          <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
            <div class="emoji-picker" :style="{ top: display.y + 'px', left: display.x + 'px' }">
              <div class="emoji-picker__search">
                <input type="text" v-model="search" v-focus>
              </div>
              <div>
                <div v-for="(emojiGroup, category) in emojis" :key="category">
                  <h5>{{ category }}</h5>
                  <div class="emojis">
                <span
                    v-for="(emoji, emojiName) in emojiGroup"
                    :key="emojiName"
                    @click="insert(emoji)"
                    :title="emojiName"
                >{{ emoji }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </emoji-picker>

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
import DialogHeader from '@/components/Dialog/DialogHeader'

export default {
  name: 'Dialog',
  data: () => ({
    msg: '',
    search: ''
  }),
  components: {
    Message,
    DialogHeader,
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
  methods: {
    ...mapActions([
      'IS_DIALOG_EXIST',
      'CREATE_DIALOG',
      'CREATE_MESSAGE',
      'CREATE_DIALOG_BETWEEN_USERS',
      'GET_USER_FROM_DB',
      'GET_ME',
      'GET_MESSAGES'
    ]),
    append(emoji) {
      this.msg += emoji
    },
    async sendMsg() {
      if(this.msg === '') {
        return
      }

      this.$socket.emit('sendMessage', {
        message: this.msg,
        to: Number(this.$route.params.id),
        from: this.ME.userId,
        created: new Date()
      }, cb => {
        if(cb) console.log('Успешно!')
        else console.error('Что-то пошло не так!')
      })

      if(this.DIALOG_EXIST) {
        // Логика для записи в бд в сущ-ий диалог
        console.log(`Записываю данные в сущ-ий диалог №${this.DIALOG_ID}`)

        const message = await this.CREATE_MESSAGE({
          dialogsId: this.DIALOG_ID,
          text: this.msg
        })
        message.status === 200 ? this.msg = '' : console.error('Что-то пошло не так!', message)
        this.$refs.area.style.height = '30px'
      } else {
        // Логика для записи данных в бд в новый диалог
        console.log('Создаю новый диалог и записываю данные')

        const dialog = await this.CREATE_DIALOG()
        const data = {
          id: this.$route.params.id,
          dialogsId: dialog.data.id
        }
        await this.CREATE_DIALOG_BETWEEN_USERS(data)

        const message = await this.CREATE_MESSAGE({
          dialogsId: dialog.data.id,
          text: this.msg
        })
        if (message.status === 200) {
          this.$socket.emit('dialogCreate', {
            to: Number(this.$route.params.id),
            from: this.ME.userId,
          })

          this.msg = ''
          this.$refs.area.style.height = '30px'
          await this.IS_DIALOG_EXIST({ assigneeId: this.$route.params.id })
        } else {
          console.error('Что-то пошло не так!', message)
        }
      }
    },
    auto_grow() {
      this.$refs.area.style.height = '30px';
      this.$refs.area.style.height = (this.$refs.area.scrollHeight) + 'px';
    },
    __mounted(id) {
      this.GET_USER_FROM_DB(id)
      this.IS_DIALOG_EXIST({ assigneeId: id }).then(() => { this.GET_MESSAGES({ id: this.DIALOG_ID }) })
      this.GET_ME()
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
      'ME',
      'MESSAGES',
      'ROOT'
    ]),
    keymap () {
      return {
        'enter': this.sendMsg
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.__mounted(to.params.id)
    next()
  },
  watch: {
    MESSAGES() {
      setTimeout(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
      });
    }
  }
}
</script>

<style lang="scss">
</style>
