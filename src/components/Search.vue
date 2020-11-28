<template>
    <div
      class="search"
      :class="{ showSearch }"
      v-if="allSeries.length"
    >
      <div
        class="search__item"
        v-for="series in allSeries"
        :key="series.id"
      >
        <div class="search__photo">
          <img
            :src="`${require(`@/assets/img/seriesPreview/libertad${series.id - 1}.jpg`)}`"
            :alt="series.seriesName"
          >
        </div>
        <div class="search__content">
          <router-link
            tag="a"
            :to="`/series/${series.id}`"
            @click.native="closeSearch"
          >{{ series.seriesName }}</router-link>
          <p v-if="series.description.length > 150">{{ series.description.slice(0, 150) + ' ...' }}</p>
          <p v-else>{{ series.description }}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'searchBlock',
  props: {
    showSearch: {
      type: Boolean,
      default: false
    },
    allSeries: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    closeSearch() {
      this.$emit('closeSearch')
    }
  }
}
</script>

<style lang="scss">
</style> 