<template>
  <div>
    <div v-if="userSeries.length !== 0">
      <div v-for="user in userSeries" :key="user.id">
        <div class="otherReview" v-if="friendsList.includes(user.users_id)" :flag="flag = true">
          <div class="otherReview__rating">
            <h2 class="otherReview__title title--h2"><span>{{ user.user.first_name }} {{ user.user.last_name }}</span> оценил данный сериал</h2>
            <div class="rating">

              <div class="rating__item rating__item--rec" v-if="user.is_recommendation">
                <img src="@/assets/img/rating-icons/bookmark.svg" alt="">
              </div>
              <div class="rating__item rating__item--rec" v-else>
                <img src="@/assets/img/rating-icons/unBookmark.svg" alt="">
              </div>

              <div class="rating__item rating__item--fav" v-if="user.is_favourite">
                <img src="@/assets/img/rating-icons/favourite.svg" alt="">
              </div>
              <div class="rating__item rating__item--fav" v-else>
                <img src="@/assets/img/rating-icons/unFavourite.svg" alt="">
              </div>
              
              <div>
                <star-rating
                  :rating="user.rating"
                  :read-only="true"
                  :increment="0.5"
                  :star-size="30"
                  :padding="5"
                  :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                  :rounded-corners="true"
                  :glow="5"
                  :show-rating="false"
                ></star-rating>
              </div>
            </div>
          </div>
          <div v-if="user.review.length !== 0">
            <h3 class="otherReview__subtitle title--h3">Отзыв:</h3>

            <div class="otherReview__text">
              <p>{{ user.review }}</p>
              <div class="datetime"><span>{{ user.dateComment }}</span></div>
            </div>
          </div>
          
        </div>
      </div>

      <div v-if="!flag" class="otherReview">
        <p>Никто из друзей не оценил данный сериал</p>
      </div>
    </div>

    <div
      class="otherReview"
      v-else
      :flag="flag = false"
    >
      <p>Никто не посмотрел данный сериал, станьте первым, кто оценит его!</p>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  name: 'otherReview',
  components: { StarRating },
  data: () => ({
    flag: false,
  }),
  props: {
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
};
</script>

<style lang="scss">
</style>
