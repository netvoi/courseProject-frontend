<template>
  <div class="alphabet mb-5">
    <div>
      <h3 class="alphabet__letter" >
        {{ block.letter }}
      </h3>
      <ul v-if="block.active">
        <li
          class="alphabet__list-item"
          v-for="(series, index) in block.series"
          :key="index"
        >
          <router-link
            tag="a"
            :to="`series/${ series.id }`"
            v-if="index < 6"
          >{{ series.seriesName }}</router-link >
        </li>
      </ul>

      <ul v-else>
        <li
          class="alphabet__list-item"
          v-for="(series, index) in block.series"
          :key="index"
        >
          <router-link
            tag="a"
            :to="`series/${ series.id }`"
          >{{ series.seriesName }}</router-link >
        </li>
      </ul>
      <button
        class="alphabet_btn underline"
        @click.prevent="isListActive(idx)"
        v-if="block.series.length > 7 && block.active"
      >
        Показать всё
      </button>
      <button 
        class="alphabet_btn underline"
        @click.prevent="isListActive(idx)"
        v-else-if="block.series.length > 7"
      >
        Скрыть
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      default() {
        return {}
      }
    },
    idx: {
      type: Number,
      default: 0
    }
  },
  methods: {
    isListActive(index) {
      this.$emit('isListActive', index)
    },
  },
}
</script>

<style lang="scss">
</style> 