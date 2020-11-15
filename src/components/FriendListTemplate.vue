<template>
  <div>
    <h3 class="modal__title">Друзья</h3>

      <div class="friends__item" v-for="item in list" :key="item.id">
        <div class="friends__image">
          <!-- <img :src="require(`@/assets/img/${friend.imgUrl}`)" alt="avatar"> -->
          <img src="https://placehold.it/265x265" alt="avatar">
        </div>
        <router-link
          class="friends__link"
          tag="a"
          :to="'/' + item.id"
        >
          {{ item.first_name }} {{ item.last_name }}
        </router-link>
        <button class="friends__btn" type="button"></button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'FriendListTemplate',
  props: {
    list: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss">
</style> 