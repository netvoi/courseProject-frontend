<template>
  <div class="series page">
    <div class="container" v-if="IS_EXIST !== null">
      <SeriesInfo
        class="series__info"

        @changeWatchedStatus="changeWatchedStatus"
        :isWatched="IS_EXIST"
        :SERIES='SERIES'
      />

      <div v-if="IS_EXIST">
        <Tabs
          class="series__review"

          @changeFavouriteStatus="changeFavouriteStatus"
          @changeRecommendationStatus="changeRecommendationStatus"
          @setRating="setRating"
          @setReviewAndDate="setReviewAndDate"
          :isFavourite="IS_FAVOURITE"
          :isRecommendation="IS_RECOMMENDATION"
          :rating="RATING"
          :review="REVIEW"
          :date="DATE"

          :userSeries="USER_SERIES"
          :friendsList="MY_FRIENDS"
        />
      </div>
      <div v-else>
        <OtherReview
          :userSeries="USER_SERIES"
          :friendsList="MY_FRIENDS"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SeriesInfo from '@/components/TvSeries/SeriesInfo.vue';
import Tabs from '@/components/TvSeries/Tabs.vue';
import OtherReview from '@/components/TvSeries/OtherReview.vue';

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'tvSeries',
  data: () => ({
    isWatched: null,
  }),
  components: {
    SeriesInfo,
    Tabs,
    OtherReview
  },
  methods: {
    ...mapActions([
      'GET_INFO_FROM_DB',
      'GET_INFO_USER_SERIALS',
      'CHANGED_WATCHED_STATUS',
      'IS_EXIST_SERIES',
      'CHANGED_FAVOURITE_STATUS',
      'CHANGED_RECOMMENDATION_STATUS',
      'CHANGED_RATING',
      'CHANGED_REVIEW',
      'GET_MARK_FIELDS',
      'CHANGED_DATE',
      'GET_USER_BY_SERIES',
      'GET_MY_FRIENDS',
    ]),
    changeWatchedStatus(isWatched, id) {
      this.CHANGED_WATCHED_STATUS({ id, isWatched })

      this.$socket.emit('updateSeries')
    },
    changeFavouriteStatus(isFavourite) {
      const seriesId = this.$route.params.id
      this.CHANGED_FAVOURITE_STATUS({ seriesId, isFavourite })

      this.$socket.emit('updateSeries')
    },
    changeRecommendationStatus(isRecommendation) {
      const seriesId = this.$route.params.id
      this.CHANGED_RECOMMENDATION_STATUS({ seriesId, isRecommendation })

      this.$socket.emit('updateSeries')
    },
    setRating(rating) {
      const seriesId = this.$route.params.id
      this.CHANGED_RATING({ seriesId, rating })

      this.$socket.emit('updateSeries')
    },
    setReviewAndDate(review, date) {
      const seriesId = this.$route.params.id
      this.CHANGED_REVIEW({ seriesId, review })
      this.CHANGED_DATE({ seriesId, date })

      this.$socket.emit('updateSeries')
    },
  },
  mounted() {
    this.GET_INFO_FROM_DB(this.$route.params.id)
    this.IS_EXIST_SERIES({
      serials_id: this.$route.params.id
    })
    this.GET_MARK_FIELDS({
      serials_id: this.$route.params.id
    })

    this.GET_USER_BY_SERIES(this.$route.params.id)
    this.GET_MY_FRIENDS()

    this.sockets.subscribe('update-series', async () => {
      console.log('update-series');

      await this.GET_MARK_FIELDS({ serials_id: this.$route.params.id  })
      await this.GET_USER_BY_SERIES(this.$route.params.id)
    })
  },
  computed: {
    ...mapGetters([
      'SERIES',
      'IS_EXIST',
      'IS_FAVOURITE',
      'IS_RECOMMENDATION',
      'RATING',
      'REVIEW',
      'DATE',
      'USER_SERIES',
      'MY_FRIENDS'
    ])
  },
  beforeRouteUpdate (to, from, next) {
    if(to.params.id !== from.params.id) {
      this.GET_INFO_FROM_DB(to.params.id)
      this.IS_EXIST_SERIES({
        serials_id: to.params.id
      })
      this.GET_MARK_FIELDS({
        serials_id: to.params.id
      })

      this.GET_USER_BY_SERIES(to.params.id)
      next()
    }
  },
  beforeDestroy() {
    this.sockets.unsubscribe('update-series')
  }
};
</script>

<style lang="scss">
</style>
