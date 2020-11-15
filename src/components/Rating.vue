<template>
  <div>
    <div class="rating">
      <div class="rating__item rating__item--rec">
        <input
          class="checkbox checkbox--rec"
          type="checkbox"
          :id="`rec` + userId"
          :recommendationLever="recommendationLever = isRecommendation"
          v-model="recommendationLever"
        >
        <label 
          :for="`rec` + userId"
          @click="changeRecommendationStatus(!recommendationLever)"
        ></label>
      </div>
      <div class="rating__item rating__item--fav">
        <input
          class="checkbox checkbox--favourite"
          type="checkbox"
          :id="`fav` + userId"
          :favouriteLever="favouriteLever = isFavourite"
          v-model="favouriteLever"
        >
        <label
          :for="`fav` + userId"
          @click="changeFavouriteStatus(!favouriteLever)"
        ></label>
      </div>
      <div>
        <star-rating
          :rating="rating"
          :increment="0.5"
          :star-size="30"
          :padding="5"
          :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
          :rounded-corners="true"
          :glow="5"
          :show-rating="false"
          @rating-selected="setRating"
        >
        </star-rating>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';

export default {
  components: { StarRating },
  data: () => ({
    userId: localStorage.getItem('sub'),
    favouriteLever: null,
    recommendationLever: null,
  }),
  props: {
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
      default: null
    }
  },
  methods: {
    changeFavouriteStatus(isFavourite) {
      console.log('changeFavouriteStatus');
      this.$emit('changeFavouriteStatus', isFavourite)
    },
    changeRecommendationStatus(isRecommendation) {
      console.log('changeRecommendationStatus');
      this.$emit('changeRecommendationStatus', isRecommendation)
    },
    setRating(rating) {
      console.log('setRating');
      this.$emit('setRating', rating)
    },
  },
};
</script>

<style lang="scss">
</style>
