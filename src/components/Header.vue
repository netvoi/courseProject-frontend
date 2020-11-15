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
            placeholder="Search">
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

            <!-- Dropdown Trigger -->
            <div class="dropdown menu__avatar">
              <a class='dropdown-trigger' href='#' data-target='dropdown1' ref="dropdown">
                <div class="menu__btn">
                  <img
                    src="@/assets/img/avatar0.jpg"
                    alt="avatar">
                </div>
              </a>

              <!-- Dropdown Structure -->
              <ul id='dropdown1' class='dropdown-content'>
                <li><router-link tag="a" :to="`/user/${ ME.userId }`">Профиль</router-link></li>
                <li><router-link tag="a" to="#seting">Настройки</router-link></li>
                <hr>
                <li @click.prevent="logout"><router-link tag="a" to="#logout">Выход</router-link></li>
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
  name: 'Header',
  methods: {
    ...mapActions([
      'LOGOUT',
      'GET_ME'
    ]),
    logout() {
      this.LOGOUT()
        .then(() => {
          this.$router.push('/login')
        })
    },
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
    });
    this.GET_ME()
  },
  computed: {
    ...mapGetters([
      'ME'
    ])
  }
};
</script>