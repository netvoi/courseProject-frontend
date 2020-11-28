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
          <form class="" action="/">
            <input
              class=""
              id="search-serial"
              type="search"
              name="search-serial"
              placeholder="Search"
              v-model="search"
              @input="foundSeries"
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
            >
            </router-link>

            <router-link
              class="menu__link menu__link--chat"
              to="/inbox"
              tag="a"
            ><span></span>
            </router-link>

            <div class="dropdown menu__avatar">
              <a
                class='dropdown-trigger'
                href='#'
                data-target='dropdown1'
                ref="dropdown"
              >
                <div class="menu__btn">
                  <img
                    src="@/assets/img/avatar.svg"
                    alt="avatar">
                </div>
              </a>

              <ul id='dropdown1' class='dropdown-content'>
                <li>
                  <router-link
                    tag="a" 
                    :to="`/user/${ ME.userId }`"
                  >Профиль</router-link>
                </li>
                <li>
                  <!-- <router-link
                    tag="a"
                    to="#seting"
                  >Настройки</router-link> -->
                  <!-- <a
                    class="waves-effect modal-trigger"
                    href="#modalSettings"
                  >Настройки</a> -->
                  <a class="waves-effect modal-trigger" href="#modal3">Настройки</a>


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
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container -->
  </header>
  <!-- /.header -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'main-header',
  data: () => ({
    search: ''
  }),
  props: {
  },
  methods: {
    ...mapActions([
      'LOGOUT',
      'GET_ME'
    ]),
    logout() {
      this.LOGOUT()
        .then(() => {
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
    this.GET_ME()
  },
  computed: {
    ...mapGetters([
      'ME'
    ])
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