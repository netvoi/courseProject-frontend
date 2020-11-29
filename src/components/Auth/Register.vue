<template>
  <div id="register" class="auth__wrapper-item" :class="{ active: isActive('register') }">
    <h2 class="auth__subtitle auth__subtitle--opacity">Регистрация в системе</h2>
    <form class="form" @submit.prevent="eventRegister">
      <div class="form__item">
        <label class="form__label" for="name">Имя<sup>*</sup></label>
        <input
          id="name"
          name="name"
          type="text"
          v-model="userRegister.username"
          :class="{ invalid: $v.userRegister.username.$dirty && !$v.userRegister.username.required}"
        >
        <small
          class="form__invalid"
          v-if="$v.userRegister.username.$dirty && !$v.userRegister.username.required"
        >Вы не можете оставить это поле пустым</small>
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
        <label class="form__label" for="email">Эл. почта<sup>*</sup></label>
        <input
          id="email"
          name="email"
          type="text"
          v-model="userRegister.email"
          :class="{invalid:($v.userRegister.email.$dirty && !$v.userRegister.email.required) || ($v.userRegister.email.$dirty && !$v.userRegister.email.email) || ($v.userRegister.email.$dirty && !$v.userRegister.email.minLength) || ($v.userRegister.email.$dirty && !$v.userRegister.email.maxLength) || isExist}"
        >
        <small
          class="form__invalid"
          v-if="$v.userRegister.email.$dirty && !$v.userRegister.email.required"
        >Вы не можете оставить это поле пустым</small>
        <small
          class="form__invalid"
          v-else-if="$v.userRegister.email.$dirty && !$v.userRegister.email.email"
        >Введен некорректный email</small>
        <small 
          class="form__invalid"
          v-else-if="$v.userRegister.email.$dirty && !$v.userRegister.email.minLength"
        >Логин(email) должен содержать в себе от 4 символов до 30</small>
        <small 
          class="form__invalid"
          v-else-if="$v.userRegister.email.$dirty && !$v.userRegister.email.maxLength"
        >Логин(email) должен содержать в себе от 4 символов до 30</small>
        <small 
          class="form__invalid"
          v-else-if="isExist"
        >Данный логин(email) уже зарегистрирован</small>
        <small 
          class="form__invalid"
          v-else-if="error"
        >Что-то пошло не так</small>
      </div>
      <div class="form__item">
        <label class="form__label" for="password">Пароль<sup>*</sup></label>
        <input
          id="password"
          name="password"
          type="password"
          v-model="userRegister.password"
          :class="{ invalid: ($v.userRegister.password.$dirty && !$v.userRegister.password.required) || ($v.userRegister.password.$dirty && !$v.userRegister.password.minLength) || ($v.userRegister.password.$dirty && !$v.userRegister.password.maxLength) }"
        >
        <small
          class="form__invalid"
          v-if="$v.userRegister.password.$dirty && !$v.userRegister.password.required"
        >Вы не можете оставить это поле пустым</small>
        <small 
          class="form__invalid"
          v-else-if="$v.userRegister.password.$dirty && !$v.userRegister.password.minLength"
        >Пароль должен содержать в себе от 8 символов до 30</small>
        <small 
          class="form__invalid"
          v-else-if="$v.userRegister.password.$dirty && !$v.userRegister.password.maxLength"
        >Пароль должен содержать в себе от 8 символов до 30</small>
      </div>
      <button
        class="btn btn--auth"
        type="submit"
      >Зарегистрироваться</button>
    </form>
    <div class="auth__footer">
      <span>Уже участник?</span>
      <a
        class="form__link" 
        href="#login"
        @click="setActive('login')"
      >Войти</a>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'register',
  data: () => ({
    userRegister: {
      username: '',
      surname: '',
      email: '',
      password: ''
    },
  }),
  props: {
    isActive: {
      type: Function
    },
    setActive: {
      type: Function
    },
    isExist: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    eventRegister() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.$emit('eventRegister', this.userRegister)
    },
  },
  validations: {
    userRegister: {
      email: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(30),
        email
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(30)
      },
      username: {
        required
      },
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