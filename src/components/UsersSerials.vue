/* eslint-disable no-restricted-syntax */
<template>
  <section class="serials" >
    <div class="serials__header">
      <h2 class="serials__title title--h2">Сериалы</h2>
    </div>

    <div class="row mb-5">
      <div class="col-4 mr-auto">
        <form class="input-field" action="/">
          <select ref="select">
            <option value="rating">По рейтингу</option>
            <option value="last" selected>Последние просмотренные</option>
            <option value="rec">Избранное</option>
          </select>
        </form>
      </div>
    </div>

    <div class="row mb-0">
      <div class="col-6 mb-5" v-for="(item, idx) in info" :key="idx">
        <div class="card">
          <div
          class="card__image"
          v-if="item.serials_id">
            <img
            class="card__photo"
            :src="`${require(`@/assets/img/seriesPreview/libertad${item.serials_id - 1}.jpg`)}`"
            alt="">
            <div class="card__mask">
              <h3 class="card__mask-titl title--h3">
                {{ item.seriesName }}
              </h3>
              <div class="card__mask-item card__mask-item--star" v-if="item.rating !== 0">
                <star-rating
                  :rating="item.rating"
                  :read-only="true"
                  :increment="0.5"
                  :star-size="30"
                  :padding="10"
                  :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                  :rounded-corners="true"
                  :glow="5"
                  :show-rating="false"
                >
                </star-rating>
              </div>
              <div class="card__mask-item" v-if="item.is_favourite">
                <img src="@/assets/img/heart-icon.svg" alt="">
              </div>
              <div class="card__mask-item" v-if="item.is_recomendation">
                <img src="@/assets/img/bookmark-checked.svg" alt="">
              </div>
              <!-- eslint-disable-next-line max-len -->
              <router-link class="btn btn--light" tag="a" :to="{path: '/series/' + item.serials_id}">
                Узнать больше
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row -->
  </section>
  <!-- /.serials -->
</template>

<script>
import StarRating from 'vue-star-rating';

export default {
  props: {
    info: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data: () => ({
  }),
  components: { StarRating },
  mounted() {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select);
  },
};
</script>

<style lang="scss">
</style>
