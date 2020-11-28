<template>
  <div class="select">
    <div
      class="select__header"
      @click="fieldVisible(nameKey)"
    >
      <p class="select__title">{{ nameOption }}</p>
    </div>
    <ul
      class="select__options"
      v-if="field.visible"
    >
      <li
        class="select__options-item"
        v-for="item in field.options"
        :key="item"
        @click="selectedOption(item, nameKey), fieldVisible(nameKey)"
      >{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    field: {
      type: Object,
      default() {
        return {}
      },
    },
    nameKey: {
      type: String,
      default: ''
    },
    nameOption: {
      type: [String, Number],
      default: ''
    },
  },
  methods: {
    ...mapActions([
      'FIELD_VISIBLE'
    ]),
    fieldVisible(nameKey) {
      this.FIELD_VISIBLE(nameKey)
    },
    selectedOption(item, nameKey) {
      this.$emit('selectedOption', item, nameKey)
    }
  },
}
</script>

<style lang="scss">
</style>