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
              placeholder="Сериалы..."
              v-model="search"
              autocomplete="off"
            >
          </form>
        </div>

        <div class="col-4">
          <div class="menu">
            <router-link
              class="menu__link menu__link--list"
              to="/"
              tag="a"
            ></router-link>

            <router-link
              class="menu__link menu__link--chat"
              to="/inbox"
              tag="a"
            ></router-link>

            <div class="dropdown menu__avatar">
              <a
                class='dropdown-trigger'
                href='#'
                data-target='dropdown1'
                ref="dropdown"
              >
                <div class="menu__btn">
                  <img
                    v-if="authUser.avatar !== null"
                    :src="`${root}${authUser.avatar}`"
                    alt="avatar"
                  >
                  <img
                    v-else
                    :src="`${root}default-avatar.svg`"
                    alt="avatar"
                  >
                </div>
              </a>

              <ul id='dropdown1' class='dropdown-content'>
                <li>
                  <router-link
                    tag="a"
                    :to="`/user/${ authUser.userId }`"
                  >Профиль</router-link>
                </li>
                <li>
                  <a
                    class="waves-effect modal-trigger"
                    href="#modal3"
                  >Настройки</a>
                </li>
                <li @click.prevent="logout">
                  <router-link
                    tag="a"
                    to="#logout"
                  >Выход</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

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
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
    })
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
