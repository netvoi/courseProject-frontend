<template>
  <div>
    <h1>Login</h1>
    <form>
      <div>
        <label for="email">Email</label>
        <input type="text" id="email" name="email" required v-model="user.email">
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required v-model="user.password">
      </div>
      <button @click.prevent="login()" type="submit">Login</button>
    </form>
    <router-link tag="a" to="/register">Register</router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data: () => ({
    user: {
      email: '',
      password: ''
    }
  }),
  methods: {
    ...mapActions([
      'LOGIN',
    ]),
    login() {
      this.LOGIN(this.user)
    },
  },
}
</script>

<style lang="scss">
</style> 