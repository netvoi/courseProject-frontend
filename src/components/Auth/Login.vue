<template>
  <div id="login" class="auth__wrapper-item" :class="{ active: isActive('login') }">
    <h2 class="auth__subtitle auth__subtitle--opacity">Вход в систему</h2>

    <form class="form" @submit.prevent="eventLogin">
      <div class="form__item">
        <label class="form__label" for="emailLogin">Эл. почта</label>
        <input
          id="emailLogin"
          name="emailLogin"
          type="text"
          v-model.trim="userLogin.email"
          :class="{ invalid: ($v.userLogin.email.$dirty && !$v.userLogin.email.required) || ($v.userLogin.email.$dirty && !$v.userLogin.email.email)}"
        >
        <small
          class="form__invalid"
          v-if="$v.userLogin.email.$dirty && !$v.userLogin.email.required"
        >Вы не можете оставить это поле пустым</small>
        <small
          class="form__invalid"
          v-else-if="$v.userLogin.email.$dirty && !$v.userLogin.email.email"
        >Введен некорректный email</small>
        <small 
          class="form__invalid"
          v-else-if="isIncorrectData"
        >Неправильный email или password. Повторите попытку.</small>
        <small 
          class="form__invalid"
          v-else-if="error"
        >Что-то пошло не так</small>
      </div>
      <div class="form__item">
        <label class="form__label" for="passwordLogin">Пароль</label>
        <input
          id="passwordLogin"
          name="passwordLogin"
          type="password"
          v-model.trim="userLogin.password"
          :class="{ invalid: ($v.userLogin.password.$dirty && !$v.userLogin.password.required) || ($v.userLogin.password.$dirty && !$v.userLogin.password.minLength)}"
        >
        <small
          class="form__invalid"
          v-if="$v.userLogin.password.$dirty && !$v.userLogin.password.required"
        >Вы не можете оставить это поле пустым</small>
        <small 
          class="form__invalid"
          v-else-if="$v.userLogin.password.$dirty && !$v.userLogin.password.minLength"
        >Минимальная длина пароля 8 символов</small>
      </div>
      <button
        class="btn btn--auth"
        type="submit"
      >Войти</button>
    </form>
    <div class="auth__footer">
      <span>Не участник?</span>
      <a
        class="form__link" 
        href="#register"
        @click="setActive('register')"
      >Зарегистрироваться</a>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'login',
  data: () => ({
    userLogin: {
      email: '',
      password: '',
    },
  }),
  props: {
    isActive: {
      type: Function
    },
    setActive: {
      type: Function
    },
    isIncorrectData: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    eventLogin() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.$emit('eventLogin', this.userLogin)
    },
  },
  validations: {
    userLogin: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
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