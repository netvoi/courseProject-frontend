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
                  class=""
                  type="file"
                  accept="image/*"
                  @change="uploadImage"
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

export default {
  name: 'settings',
  data: () => ({
    photo: 'https://placehold.it/300',
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
      if(!e.target.files[0]) return

      const image = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = e =>{
          this.photo = e.target.result
      };
    },
    eventUpdateData(user) {
      this.$emit('eventUpdateData', user)
    },
    eventUpdatePassword(password) {
      this.$emit('eventUpdatePassword', password)
    },
    eventUpdatePhoto() {
      console.log(this.photo);
    }
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