<template>
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
            v-if="authUser.avatar"
            :src="root + authUser.avatar"
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
        <li>
          <a
            class="waves-effect modal-trigger"
            href="#modal2"
          >Помощь</a>
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
</template>

<script>
export default {
  name: 'Menu',
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
    logout() {
      this.$emit('logout')
    }
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
    })
  }
};
</script>

<style lang="scss">
</style>
