<template>
  <div>
    <div id="my-review">
      <MyReview
        @changeFavouriteStatus="changeFavouriteStatus"
        @changeRecommendationStatus="changeRecommendationStatus"
        @setRating="setRating"
        @setReview="setReview"
        :isFavourite="isFavourite"
        :isRecommendation="isRecommendation"
        :rating="rating"
        :review="review"
      />
    </div>
    <div id="other-review">
      <OtherReview />
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
import MyReview from '@/components/MyReview.vue';
import OtherReview from '@/components/OtherReview.vue';

export default {
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
    setReview(review) {
      this.$emit('setReview', review)
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
