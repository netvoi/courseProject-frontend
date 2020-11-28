<template>
  <div class="login">
    <div class="login__wrapper login__wrapper--greet" :class="{ show: isShow }">
      <transition name="fade-title">
        <h1 v-if="showTitle" class="login__title">Привет!</h1>
      </transition>
    
      <transition name="fade-subtitle">
        <h2 v-if="showTitle" class="login__subtitle">Добро пожаловать в Libertad</h2>  
      </transition>
    </div>

    <div class="login__wrapper" :class="{ show: !isShow }">
      <div id="login" class="login__wrapper-item" :class="{ active: isActive('login') }">
        <h2 class="login__subtitle login__subtitle--opacity">Вход в систему</h2>
        <form class="form" @submit.prevent="eventLogin">
          <div class="form__item">
            <label class="form__label" for="emailLogin">Эл. почта</label>
            <input
              id="emailLogin"
              name="emailLogin"
              type="text"
              v-model="userLogin.email"
            >
          </div>
          <div class="form__item">
            <label class="form__label" for="passwordLogin">Пароль</label>
            <input
              id="passwordLogin"
              name="passwordLogin"
              type="password"
              v-model="userLogin.password"
            >
          </div>
          <button
            class="btn btn--auth"
            type="submit"
          >Войти</button>
        </form>
        <div class="login__footer">
          <span>Не участник?</span>
          <a
            class="form__link" 
            href="#register"
            @click="setActive('register')"
          >Зарегистрироваться</a>
        </div>
      </div>

      <div id="register" class="login__wrapper-item" :class="{ active: isActive('register') }">
        <h2 class="login__subtitle login__subtitle--opacity">Регистрация в системе</h2>
        <form class="form" @submit.prevent="eventRegister">
          <div class="form__item">
            <label class="form__label" for="name">Имя</label>
            <input
              id="name"
              name="name"
              type="text"
              v-model="userRegister.username"
            >
          </div>
          <div class="form__item">
            <label class="form__label" for="surname">Фамилия</label>
            <input
              id="surname"
              name="surname"
              type="text"
              v-model="userRegister.surname"
            >
          </div>
          <div class="form__item">
            <label class="form__label" for="email">Эл. почта</label>
            <input
              id="email"
              name="email"
              type="text"
              v-model="userRegister.email"
            >
          </div>
          <div class="form__item">
            <label class="form__label" for="password">Пароль</label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="userRegister.password"
            >
          </div>
          <button
            class="btn btn--auth"
            type="submit"
          >Зарегистрироваться</button>
        </form>
        <div class="login__footer">
          <span>Уже участник?</span>
          <a
            class="form__link" 
            href="#login"
            @click="setActive('login')"
          >Войти</a>
        </div>
      </div>
      
    </div>


  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data: () => ({
    userLogin: {
      email: '',
      password: '',
    },
    userRegister: {
      username: '',
      surname: '',
      email: '',
      password: ''
    },
    showTitle: false,
    isShow: true,

    activeTab: 'login',
  }),
  methods: {
    ...mapActions([
      'LOGIN',
      'REGISTER',
    ]),
    eventLogin() {
      this.LOGIN(this.userLogin)
        .then(response => {
          if(response.status === 200) {
            // console.log(response);
            this.$router.push('/')
          } else {
            console.log(response);
          }
        })
    },
    eventRegister() {
      this.REGISTER(this.userRegister)
        .then(response => {
          if(response.status === 200) {
            // console.log(response);
            this.$router.push('/')
          } else {
            console.log(response);
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

<style lang="scss" scoped>
  .show {
    display: block;
  }

  .active {
    display: block;
  }
</style> 