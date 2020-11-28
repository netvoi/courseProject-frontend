<template>
  <div class="auth">
    <div class="auth__wrapper auth__wrapper--greet" :class="{ show: isShow }">
      <transition name="fade-title">
        <h1 v-if="showTitle" class="auth__title">Привет!</h1>
      </transition>
    
      <transition name="fade-subtitle">
        <h2 v-if="showTitle" class="auth__subtitle">Добро пожаловать в Libertad</h2>  
      </transition>
    </div>

    <div class="auth__wrapper" :class="{ show: !isShow }">
      <Login
        @eventLogin="eventLogin"

        :isActive="isActive"
        :setActive="setActive"
        :isIncorrectData="isIncorrectData"
        :error="error"
      />

      <Register
        @eventRegister="eventRegister"

        :isActive="isActive"
        :setActive="setActive"
        :isExist="isExist"
        :error="error"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Login from '@/components/Auth/Login.vue'
import Register from '@/components/Auth/Register.vue'

export default {
  name: 'auth',
  data: () => ({
    showTitle: false,
    isShow: true,

    activeTab: 'login',

    isIncorrectData: false,
    isExist: false,
    error: false,
  }),
  components: {
    Login,
    Register
  },
  methods: {
    ...mapActions([
      'LOGIN',
      'REGISTER',
    ]),
    eventLogin(user) {
      console.log(user);
      this.LOGIN(user)
        .then(response => {
          if(response.status === 200) {
            this.isIncorrectData = false
            this.$router.push('/')
          } else if(response.status === 403) {
            this.isIncorrectData = true
          } else {
            this.error = true
            console.log('Что-то пошло не так');
          }
        })
    },
    eventRegister(user) {
      this.REGISTER(user)
        .then(response => {
          if(response.status === 200) {
            this.isExist = false
            this.$router.push('/')
          } else if(response.status === 403) {
            this.isExist = true
          } else {
            this.error = true
            console.log('Что-то пошло не так');
          }
        })
    },
    setActive(tab) {
      this.activeTab = tab
    },
    isActive(tab) {
      return this.activeTab === tab
    },
  },
  async mounted() {
    this.showTitle = true

    setTimeout(() => {
      this.isShow = false
    }, 8000)
  }
}
</script>

<style lang="scss">
</style> 