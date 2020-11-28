<template>
  <div class="pt">
    <div></div>
    <div class="messages">
      <div :class="{ 'messages__item--owner': owner }" class="messages__item">
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'messages',
  props: {
    text: {
      type: String,
      default: ''
    },
    owner: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .pt {
    & + & {
      margin-top: 3rem;
    }
  }
</style> 