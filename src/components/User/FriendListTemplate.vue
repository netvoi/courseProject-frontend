<template>
  <div>
    <div
      class="friends__item"
      v-for="item in list"
      :key="item.id"
    >
      <div class="friends__image">
        <img :src="`http://localhost:8081/static/uploads/${item.avatar}`" alt="avatar">
      </div>
      <router-link
        class="friends__link modal-close"
        tag="a"
        :to="{ name: 'user', params: { id: item.id }}"
      >
        {{ item.first_name }} {{ item.last_name }}
      </router-link>
      <button
        class="friends__btn"
        v-if="status === 0"
      ></button>
      <div class="ml-auto" v-if="status === 1">
        <button
          class="friends__btn friends__btn--confirm mr-2"
          @click.prevent="confirm(item.id)"
        ></button>
        <button
          class="friends__btn friends__btn--cancel ml-2"
          @click.prevent="cancel(item.id)"
        ></button>
      </div>
      <button
        class="friends__btn friends__btn--cancel"
        v-if="status === 2"
        @click.prevent="cancel(item.id)"
      ></button>
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
    },
    status: {
      type: Number,
      default: null
    }
  },
  methods: {
    confirm(id) {
      this.$emit('confirm', id)
    },
    cancel(id) {
      this.$emit('cancel', id)
    }
  },
}
</script>

<style lang="scss">
</style>
