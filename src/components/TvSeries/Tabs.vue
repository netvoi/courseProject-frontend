<template>
  <div>
    <div id="my-review">
      <MyReview
        @changeFavouriteStatus="changeFavouriteStatus"
        @changeRecommendationStatus="changeRecommendationStatus"
        @setRating="setRating"
        @setReviewAndDate="setReviewAndDate"
        :isFavourite="isFavourite"
        :isRecommendation="isRecommendation"
        :rating="rating"
        :review="review"
        :date="date"
      />
    </div>
    <div id="other-review">
      <OtherReview
         :userSeries="userSeries"
         :friendsList="friendsList"
      />
    </div>

    <ul id="tabs-swipe-demo" class="tabs tabs-review" ref="tabs">
      <li class="tab tabs-review__item">
        <a class="active" href="#my-review">Мои отзывы</a>
      </li>
      <li class="tab tabs-review__item">
        <a href="#other-review">Отзывы друзей</a>
      </li>
    </ul>
  </div>
</template>

<script>
import MyReview from '@/components/TvSeries/MyReview.vue';
import OtherReview from '@/components/TvSeries/OtherReview.vue';

export default {
  name: 'tabs',
  props: {
    isWatched: {
      type: Boolean,
      default: false
    },
    isFavourite: {
      type: Boolean,
      default: null
    },
    isRecommendation: {
      type: Boolean,
      default: null
    },
    rating: {
      type: Number,
      default: 0
    },
    review: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    userSeries: {
      type: Array,
      default() {
        return []
      }
    },
    friendsList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: { MyReview, OtherReview },
  methods: {
    changeFavouriteStatus(isFavourite) {
      this.$emit('changeFavouriteStatus', isFavourite)
    },
    changeRecommendationStatus(isRecommendation) {
      this.$emit('changeRecommendationStatus', isRecommendation)
    },
    setRating(rating) {
      this.$emit('setRating', rating)
    },
    setReviewAndDate(review, date) {
      this.$emit('setReviewAndDate', review, date)
    },
  },
  mounted() {
    this.tabs = M.Tabs.init(this.$refs.tabs, {
      duration: 500,
    });
  },
};
</script>

<style lang="scss">
</style>
