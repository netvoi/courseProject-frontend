<template>
  <header class="header">
    <div class="container">
      <div class="row justify-content-between align-items-center mb-0">
        <div class="col-4">
          <div class="logo">
            <img class="logo__icon" src="@/assets/img/logo.svg" alt="Libertad logo">
            <router-link
              class="logo__name"
              tag="a"
              to="/"
            >Libertad</router-link>
          </div>
        </div>

        <div class="col-4">
          <form>
            <label for="search-serial"></label>
            <input
              @input="foundSeries"

              id="search-serial"
              type="search"
              name="search-serial"
              placeholder="Найти сериал"
              v-model="search"
              autocomplete="off"
            >
          </form>
        </div>

        <div class="col-4">
          <Menu
            @logout="logout"
            :authUser="authUser"
            :root="root"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
import Menu from '@/components/Menu'

export default {
  name: 'main-header',
  data: () => ({
    search: ''
  }),
  props: {
    authUser: {
      type: Object,
      default() {
        return {}
      }
    },
    root: {
      type: String,
      default: ''
    }
  },
  components: {
    Menu
  },
  methods: {
    ...mapActions([
      'LOGOUT',
    ]),
    logout() {
      this.LOGOUT()
        .then(() => {
          this.$socket.emit('logout')
          this.$router.push('/auth')
        })
    },
    foundSeries() {
      this.search.length >= 3
      ? this.$emit('searchStatus', true, this.search)
      : this.$emit('searchStatus', false)
    }
  },
  watch: {
    $route (to, from) {
      if(to.path !== from.path) {
        this.search = ''
      }
    }
  }
};
</script>
