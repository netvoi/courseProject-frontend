<template>
  <div>
    <div id="modal3" class="modal bottom-sheet" ref="setting">
      <div class="modal-content">
        <div class="settings">
          <div class="settings__header">
            <h3 class="settings__title title--h3">Настройки</h3>
          </div>
          <div class="settings__content">
            <div class="settings__image">
              <div class="settings__image-wrapper image">
                <img :src="photo" alt="avatar">
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
      <!-- <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
      </div> -->
    </div>
  </div>
</template>

<script>
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import EditProfile from '@/components/Settings/EditProfile.vue'
import EditPassword from '@/components/Settings/EditPassword.vue'

import axios from 'axios'


export default {
  name: 'settings',
  data: () => ({
    photo: 'https://placehold.it/300',
    formData: null
  }),
  props: {
    authUser: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    EditProfile,
    EditPassword,
  },
  methods: {
    uploadImage(e) {
      const files = this.$refs.uploadBtn.files
      let formData = new FormData()

      formData.append('attachment', files[0])
      this.formData = formData
    },
    eventUpdateData(user) {
      this.$emit('eventUpdateData', user)
    },
    eventUpdatePassword(password) {
      this.$emit('eventUpdatePassword', password)
    },
    eventUpdatePhoto() {
      axios.put('http://localhost:8081/api/upload', this.formData, {
        headers: {
            'Authorization': localStorage.getItem('jwt')
          },
      })
        .then(response => {
          this.photo = response.data.file
          console.log(response.data.file);
        })
    },
    /* async test() {
      const response = await axios.get('http://localhost:8081/api/upload', {
        responseType: 'arraybuffer',
        headers: {
            'Authorization': localStorage.getItem('jwt')
          },
      })
      
      const bytes = new Uint8Array(response.data);
      const blob = new Blob([bytes.buffer]);

      const reader = new FileReader();

      reader.addEventListener('load', e => this.photo = e.target.result)
      reader.readAsDataURL(blob);
    } */
  },
  mounted() {
    console.log('settings');
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