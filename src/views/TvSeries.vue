<template>
  <div class="page">
    <div class="container" v-if="IS_EXIST !== null"> 
      <SeriesInfo
        @changeWatchedStatus="changeWatchedStatus"
        :isWatched="IS_EXIST"
        :SERIES = 'SERIES'
      />
      
      <div v-if="IS_EXIST">
        <Tabs
          @changeFavouriteStatus="changeFavouriteStatus"
          @changeRecommendationStatus="changeRecommendationStatus"
          @setRating="setRating"
          @setReview="setReview"
          :isFavourite="IS_FAVOURITE"
          :isRecommendation="IS_RECOMMENDATION"
          :rating="RATING"
          :review="REVIEW"
        />
      </div>
      <div v-else>
        <OtherReview />
      </div>

    </div>
    <!-- /.container -->
  </div>
  <!-- /.page -->
</template>

<script>
import SeriesInfo from '@/components/SeriesInfo.vue';
import Tabs from '@/components/Tabs.vue';
import OtherReview from '@/components/OtherReview.vue';

import UsersSerialsDataService from '@/services/UsersSerialsDataService'

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
    ]),
    changeWatchedStatus(isWatched, id) {
      this.CHANGED_WATCHED_STATUS({ id, isWatched })
    },
    changeFavouriteStatus(isFavourite) {
      const seriesId = this.$route.params.id
      this.CHANGED_FAVOURITE_STATUS({ seriesId, isFavourite })
    },
    changeRecommendationStatus(isRecommendation) {
      const seriesId = this.$route.params.id
      this.CHANGED_RECOMMENDATION_STATUS({ seriesId, isRecommendation })
    },
    setRating(rating) {
      const seriesId = this.$route.params.id
      this.CHANGED_RATING({ seriesId, rating })
    },
    setReview(review) {
      const seriesId = this.$route.params.id
      this.CHANGED_REVIEW({ seriesId, review })
    },
  },
  mounted() {
    this.GET_INFO_FROM_DB(this.$route.params.id)
    this.IS_EXIST_SERIES({
      users_id: localStorage.getItem('sub'),
      serials_id: this.$route.params.id
    })
    this.GET_MARK_FIELDS({
      users_id: localStorage.getItem('sub'),
      serials_id: this.$route.params.id
    })
  },
  computed: {
    ...mapGetters([
      'SERIES',
      'IS_EXIST',
      'IS_FAVOURITE',
      'IS_RECOMMENDATION',
      'RATING',
      'REVIEW'
    ])
  }
};
</script>

<style lang="scss">
  .series {
    padding: 2rem 0;
  }
</style>
