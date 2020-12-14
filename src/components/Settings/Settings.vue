<template>
  <div>
    <div id="modal3" class="modal bottom-sheet" ref="setting">
      <div class="modal-content" v-if="!!authUser && Object.keys(authUser).length">
        <div class="settings">
          <div class="settings__header">
            <h3 class="settings__title title--h3">Настройки</h3>
          </div>
          <div class="settings__content">
            <div class="settings__image">
              <div class="settings__image-wrapper image">
                <img
                  v-if="photo.length"
                  :src="photo"
                  alt="avatar"
                >
                <img
                  v-else
                  :src="root + authUser.avatar"
                  alt="avatar"
                >
              </div>
              <form class="upload" @submit.prevent="eventUpdatePhoto">
                <input
                  id="img"
                  name="uploaded_file"
                  type="file"
                  accept="image/*"
                  @change="uploadImage"
                  ref="uploadBtn"
                >
                <label for="img">Выбрать изображение</label>
                <button class="btn btn--setting" type="submit">Обновить</button>
              </form>
            </div>
            <div class="settings__data">

              <div class="settings__tabs">
                <ul class="tabs" ref="settingTabs">
                  <li class="tab"><a id="firstTab" class="active" href="#edit-profile">Редактировать профиль</a></li>
                  <li class="tab"><a href="#edit-password">Изменить пароль</a></li>
                </ul>
              </div>

              <div id="edit-profile">
                <EditProfile
                  @eventUpdateData="eventUpdateData"
                  :authUser="authUser"
                />
              </div>


              <div id="edit-password">
                <EditPassword
                  @eventUpdatePassword="eventUpdatePassword"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditProfile from '@/components/Settings/EditProfile.vue'
import EditPassword from '@/components/Settings/EditPassword.vue'

import axios from 'axios'

export default {
  name: 'settings',
  data: () => ({
    photo: '',
    formData: null,
  }),
  props: {
    authUser: {
      type: Object,
      default() {
        return {}
      }
    },
    root: {
      type: String,
      default: ''
    }
  },
  components: {
    EditProfile,
    EditPassword,
  },
  methods: {
    uploadImage(e) {
      const files = this.$refs.uploadBtn.files
      const reader = new FileReader()
      const $vue = this
      let formData = new FormData()

      formData.append('attachment', files[0])
      this.formData = formData

      reader.onload = function(e) { $vue.photo = e.target.result }
      reader.readAsDataURL(files[0])
    },
    eventUpdateData(user) {
      this.$emit('eventUpdateData', user)
    },
    eventUpdatePassword(password) {
      this.$emit('eventUpdatePassword', password)
    },
    eventUpdatePhoto() {
      axios.put('http://localhost:8081/api/upload', this.formData, {
        headers: { 'Authorization': localStorage.getItem('jwt') },
      })
        .then(() => {
          this.$emit('eventUpdatePhoto')
          this.photo = ''
        })
    },
  },
  mounted() {
    M.Modal.init(this.$refs.setting, {
      onOpenEnd: () => {
        M.Tabs.init(this.$refs.settingTabs, {duration: 500})
      }
    })
  },
}
</script>

<style lang="scss">
</style>
