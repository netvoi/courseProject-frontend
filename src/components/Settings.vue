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
                <img :src="photo" alt="">
              </div>
              <form class="upload">
                <label for="img">Select image:</label>
                <input
                  id="file-input"
                  class="btn btn--auth"
                  type="file"
                  accept="image/*"
                  @change="uploadImage"
                >
              </form>
            </div>
            <div class="settings__data">
              <form class="settings__form" action="">
                <div class="settings__form-item">
                  <label for="name">Имя</label>
                  <input id="name" type="text">
                </div>
                <div class="settings__form-item">
                  <label for="surname">Фамилия</label>
                  <input id="surname" type="text">
                </div>
                <div class="settings__form-item">
                  <label for="oldPassword">Старый пароль</label>
                  <input id="oldPassword" type="password">
                </div>
                <div class="settings__form-item">
                  <label for="newPassword">Новый пароль</label>
                  <input id="newPassword" type="password">
                </div>
                <button class="btn btn--auth" type="submit">Сохранить</button>
              </form>
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
export default {
  name: 'settings',
  data: () => ({
    photo: null
  }),
  methods: {
    uploadImage(e) {
      const image = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = e =>{
          this.photo = e.target.result
      };
    }
  },
  mounted() {
    this.setting = M.Modal.init(this.$refs.setting)
  }
}
</script>

<style lang="scss">
</style> 