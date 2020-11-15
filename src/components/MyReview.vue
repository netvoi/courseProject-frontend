<template>
  <div class="myReview">
    <h3 class="myReview__title title--h2">Моя оценка сериалу</h3>

    <Rating
      @changeFavouriteStatus="changeFavouriteStatus"
      @changeRecommendationStatus="changeRecommendationStatus"
      @setRating="setRating"
      :isFavourite="isFavourite"
      :isRecommendation="isRecommendation"
      :rating="rating"
    />

    <label for="review" class="review-form__label">Моё мнение</label>

    <form
      class="review-form"
      action="#"
      v-if="review === ''"
    >
      <div class="review-form__item">
        <textarea
          class="review-form__textarea"
          name="review"
          id="review"
          placeholder="Поделиться мнением"
          v-model="textReview"
        ></textarea>
      </div>
      <button
        class="review-form__btn btn btn--form"
        type="submit"
        @click.prevent="setReview(textReview)"
      >Отправить</button>
    </form>

    <div v-else>
      <div
        class="myReview__item"
        v-if="changedTextReview === null"
      >
        <div class="myReview__text">
          <p>{{ review }}</p>
          <div class="datetime"><span>{{ dateTime }}</span></div>
        </div>
  
        <div class="myReview__options">
          <button
            class="myReview__options-item myReview__options-item--edit"
            type="button"
            @click.prevent="change()"
          >
          </button>
          <button
            class="myReview__options-item myReview__options-item--delete"
            type="button"
            @click.prevent="setReview('')"
          >
          </button>
        </div>
      </div>
      <div v-else>
        <textarea
          class="review-form__textarea"
          placeholder="Поделиться мнением"
          v-model="changedTextReview"
        ></textarea>
        <span>
          <button
            class="review-form__btn btn btn--form"
            @click.prevent="setReview(changedTextReview)"
          >Редактировать</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from '@/components/Rating.vue';

export default {
  data: () => ({
    textReview: '',
    changedTextReview: null,
    dateTime: ''
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
      default: 0
    },
    review: {
      type: String,
      default: ''
    }
  },
  components: { Rating },
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
      this.changedTextReview = null
      this.textReview = ''

      this.dateTime = this.getDateTime()
    },
    change() {
      this.changedTextReview = this.review
    },
    getDateTime() {
      function zero_first_format(value) {
          if (value < 10) value = '0' + value
          return value;
        }

      /* zero_first_format: value => value < 10 ? value = '0' + value : value */

      const current_datetime = new Date()
      const day = zero_first_format(current_datetime.getDate())
      const month = zero_first_format(current_datetime.getMonth() + 1)
      const year = current_datetime.getFullYear()
      const hours = zero_first_format(current_datetime.getHours())
      const minutes = zero_first_format(current_datetime.getMinutes())
      const seconds = zero_first_format(current_datetime.getSeconds())

      const date = day + "." + month + "." + year + " " + hours + ":" + minutes + ":" + seconds
      return date
    }
  },
}
</script>

<style lang="scss">
</style>
