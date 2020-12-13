<template>
  <div @click="closeFilter">
    <div class="container">
      <div class="row">
        <div class="col-3">
          <FilterSeries
            @dropFilters="dropFilters"
            @findWithFilter="findWithFilter"
            :filterFields="FILTER_FIELDS"
          />
        </div>
        <div class="col-9 d-flex flex-wrap">
          <Alphabet
            @isListActive="isListActive"
            v-for="(block, index) in filteredAlphabet"
            :key="index"
            :block="block"
            :idx="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilterSeries from '@/components/ListSerials/FilterSeries.vue';
import Alphabet  from '@/components/ListSerials/Alphabet.vue';

import {  mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListSerials',
  components: {
    FilterSeries, Alphabet
  },
  methods: {
    ...mapActions([
      'GET_SERIALS_ORDER_ALPHABET',
      'GET_ALL_SERIES',
      'GET_FILTERED_ALPHABET',
      'STATUS_LIST',
      'GET_DROP_FILTERED_ALPHABET',
      'GET_FILTER_FIELDS',
      'FIELD_NOT_VISIBLE'
    ]),
    findWithFilter(params) {
      this.GET_FILTERED_ALPHABET(params)
    },
    isListActive(index) {
      this.STATUS_LIST(index)
    },
    dropFilters() {
      this.GET_DROP_FILTERED_ALPHABET()
    },
    closeFilter() {
      this.FIELD_NOT_VISIBLE()
    }
  },
  mounted() {
    this.GET_SERIALS_ORDER_ALPHABET()
    this.GET_ALL_SERIES()
    this.GET_FILTER_FIELDS()
  },
  computed: {
    ...mapGetters([
      'ALL_SERIES',
      'ALPHABET',
      'FILTERED_ALPHABET',
      'IS_FILTERED',
      'FILTER_FIELDS'
    ]),
    filteredAlphabet() {
      return this.IS_FILTERED
      ? this.FILTERED_ALPHABET
      : this.ALPHABET
    },
  },
  beforeRouteLeave(to, from, next) {
    this.GET_DROP_FILTERED_ALPHABET()
    next()
  }
}
</script>

<style lang="scss">
</style>
