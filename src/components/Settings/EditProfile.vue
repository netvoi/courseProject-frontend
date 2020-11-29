<template>
  <form class="settings__form" @submit.prevent="eventUpdateData">
    <div class="settings__form-item">
      <label for="name">Имя</label>
      <input
        id="name"
        type="text"
        v-model="aUser.username"
        :class="{ invalid: $v.user.username.$dirty && !$v.user.username.required }"
      >
      <small
        class="form__invalid"
        v-if="$v.user.username.$dirty && !$v.user.username.required"
      >Вы не можете оставить это поле пустым</small>
    </div>
    <div class="settings__form-item">
      <label for="surname">Фамилия</label>
      <input
        id="surname"
        type="text"
        v-model="aUser.surname"
      >
    </div>
    <button class="btn btn--auth" type="submit">Сохранить</button>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'editProfile',
  data: () => ({
    user: {
      username: '',
      surname: '',
    }
  }),
  props: {
    authUser: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  validations: {
    user: {
      username: {
        required
      },
    }
  },
  methods: {
    eventUpdateData() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.$emit('eventUpdateData', this.user)
    }
  },
  computed: {
    aUser() {
      this.user.username = this.authUser.firstName
      this.user.surname = this.authUser.lastName
      return this.user
    },
  },
}
</script>

<style lang="scss" scoped>
</style> 