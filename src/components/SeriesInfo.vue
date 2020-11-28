<template>
  <div class="row align-items-start pt-5 pb-4 separator">
    <div class="col-6">
      <div class="card">
        <div class="card__image" v-if="this.SERIES.id">
          <img
          class="card__photo"
          :src="`${require(`@/assets/img/seriesPreview/libertad${this.SERIES.id - 1}.jpg`)}`"
          :alt="SERIES.seriesName"
          >
        </div>
      </div>
    </div>
    <!-- /.col -->
    <div class="col-6">
      <div
        class="info"
      >
        <div class="info__header">
          <h1 class="info__title title--h1">
            {{ SERIES.seriesName }}
            <input
              type="checkbox"
              id="checkWatched"
              :lever="lever = isWatched"
              v-model="lever"
            />
            <label
              for="checkWatched"
              @click="changeWatchedStatus(!lever, SERIES.id)"
            ></label>
          </h1>
          <span class="info__subtitle">{{ SERIES.seriesOriginalName }}</span>
        </div>
        <ul class="info__content">
          <li class="info__content-item">
            <span>Год:</span> <div>{{ SERIES.year }}</div>
          </li>
          <li class="info__content-item">
            <span>Страна:</span> <div>{{ SERIES.country }}</div>
          </li>
          <li class="info__content-item">
            <span>Жанр:</span> <div>{{ SERIES.genre }}</div>
          </li>
          <li class="info__content-item">
            <span>Телеканал:</span> <div>{{ SERIES.tvChannel }}</div>
          </li>
          <li class="info__content-item">
            <span>Рейтинг:</span> <div>{{ SERIES.rating }}</div>
          </li>
          <li class="info__content-item">
            <span>Режиссер:</span> <div>{{ SERIES.director }}</div>
          </li>
          <li class="info__content-item">
            <!-- eslint-disable-next-line max-len -->
            <span>Актеры:</span> <div>{{ SERIES.actors }}</div>
          </li>
          <li class="info__content-item info__content-item--description">
            <span>Описание:</span>
            <div class="info__description">
              <!-- eslint-disable-next-line max-len -->
              <p class="info__description-text"> {{ SERIES.description }} </p>
            </div>
          </li>
        </ul>
      </div>
      <!-- /.info -->
    </div>
    <!-- /.col -->
  </div>
  <!-- /.series -->
</template>

<script>

export default {
  data: () => ({
    lever: null
  }),
  props: {
    SERIES: {
      type: Object,
      default() {
        return {}
      }
    },
    isWatched: {
      type: Boolean,
      default: null
    }
  },
  methods: {
    changeWatchedStatus(isWatched, id) {
      this.$emit('changeWatchedStatus', isWatched, id)
    },
    addLever() {
      this.lever = this.isWatched
    }
  },
  mounted() {
    this.addLever()
  }
};
</script>

<style lang="scss">
</style>
