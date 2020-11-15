<template>
  <div>
    <h1>Register</h1>
    <form>
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required v-model="user.username">
      </div>
      <div>
        <label for="email">Email</label>
        <input type="text" id="email" name="email" required v-model="user.email">
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required v-model="user.password">
      </div>
      <button @click.prevent="test()" type="submit">Register</button>
    </form>
    <router-link tag="a" to="/login">Login</router-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'register',
  data: () => ({
    user: {
      username: '',
      email: '',
      password: ''
    }
  }),
  methods: {
    test() {
      console.log('test');
      axios.post('http://localhost:8081/api/register', this.user)
        .then(res => {
          console.log(res);
        })
    }
  }
}
</script>

<style lang="scss">
</style> 