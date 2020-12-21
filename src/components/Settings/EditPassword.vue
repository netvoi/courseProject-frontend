<template>
  <form class="settings__form" @submit.prevent="eventUpdatePassword">
    <div class="settings__form-item">
      <label for="oldPassword">Старый пароль</label>
      <input
          id="oldPassword"
          type="password"
          v-model="password.oldPassword"
          :class="{ invalid: $v.password.oldPassword.$dirty && !$v.password.oldPassword.required }"
      >
      <small
          class="form__invalid"
          v-if="$v.password.oldPassword.$dirty && !$v.password.oldPassword.required"
      >Для изменения пароля, данное поле должно быть заполненно</small>
    </div>
    <div class="settings__form-item">
      <label for="newPassword">Новый пароль</label>
      <input
          id="newPassword"
          type="password"
          v-model="password.newPassword"
          :class="{ invalid: ($v.password.newPassword.$dirty && !$v.password.newPassword.minLength) || ($v.password.newPassword.$dirty && !$v.password.newPassword.maxLength) || ($v.password.newPassword.$dirty && !$v.password.newPassword.required) }"
      >
      <small
          class="form__invalid"
          v-if="$v.password.newPassword.$dirty && !$v.password.newPassword.minLength"
      >Пароль должен содержать в себе от 8 до 30 символов</small>
      <small
          class="form__invalid"
          v-else-if="$v.password.newPassword.$dirty && !$v.password.newPassword.maxLength"
      >Пароль должен содержать в себе от 8 до 30 символов</small>
      <small
          class="form__invalid"
          v-if="($v.password.newPassword.$dirty && !$v.password.newPassword.required) "
      >Для изменения пароля, данное поле должно быть заполненно</small>
    </div>
    <button class="btn btn--auth" type="submit">Сменить пароль</button>
  </form>
</template>

<script>
import { maxLength, minLength, required } from 'vuelidate/lib/validators';

export default {
  name: 'editPassword',
  data: () => ({
    password: {
      oldPassword: '',
      newPassword: '',
    },
  }),
  validations: {
    password: {
      oldPassword: {
        required
      },
      newPassword: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(30)
      }
    }
  },
  methods: {
    eventUpdatePassword() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      this.$emit('eventUpdatePassword', this.password);

      //TODO:
      this.password.oldPassword = '';
      this.password.newPassword = '';
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
