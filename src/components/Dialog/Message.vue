<template>
  <div class="pt">
    <div></div>
    <div class="messages">
      <div
          v-for="(message, index) in messages"
          :key="index"
          :class="{ 'messages__item--owner': owner === message.from }"
          class="messages__item"
      >
        <p>{{ message.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'messages',
  props: {
    messages: {
      type: Array,
      default() {
        return [];
      }
    },
    owner: {
      type: Number,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.pt {
  & + & {
    margin-top: 3rem;
  }
}
</style>
