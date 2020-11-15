<template>
  <div class="filter-series">
    <h2 class="filter-series__header">Фильтры</h2>

    <form class="filter-series__form">
      <SelectorField
        @selectedOption="selectedOption"
        v-for="(field, name, index) in filterFields"
        :key="index"
        :field="field"
        :nameKey="name"
        :nameOption="selected[name]"
      />

      
      <div class="filter-series__buttons">
        <button @click.prevent="findWithFilter">Найти</button>
        <button @click.prevent="dropFilters">Сбросить</button>
      </div>

    </form>
  </div>
</template>

<script>
import SelectorField from '@/components/SelectorField.vue'

export default {
  name: 'filter-series',
  data: () => ({
    selected: {
      genre: 'Жанр',
      year: 'Год',
      country: 'Страна',
      rating: 'Рейтинг',
    },
    filter: {}
  }),
  props: {
    filterFields: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    SelectorField,
  },
  methods: {
    selectedOption(item, nameKey) {
      this.selected[nameKey] = item
      this.$emit('filterOption', item, nameKey)

      this.filter[nameKey] = item
    },
    findWithFilter() {
      this.$emit('findWithFilter', this.filter)
    },
    dropFilters() {
      this.$emit('dropFilters')
      this.selected.genre = 'Жанр'
      this.selected.year = 'Год'
      this.selected.country = 'Страна'
      this.selected.rating = 'Рейтинг'
    }
  },
}
</script>

<style lang="scss">
</style> 