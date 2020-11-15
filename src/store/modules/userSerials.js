import UsersSerialsDataService from '@/services/UsersSerialsDataService'

export default {
  state: {
    info: [],
    statistic: [[]],
    isExist: null,
    isFavourite: null,
    isRecommendation: null,
    rating: 0,
    review: '',
  },
  actions: {
    GET_INFO_USER_SERIALS({commit}, id) {
      return UsersSerialsDataService.getFields(id)
        .then((item) => {
          commit('SET_FIELDS', item.data)
          return item
        })
        .catch((error) => {
          console.log(error);
          return error
        })
    },
    GET_STATISTIC({commit}, id) {
      return UsersSerialsDataService.getStatistic(id)
        .then((item) => {
          commit('SET_STATISTIC', item.data)
          return item
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    CHANGED_WATCHED_STATUS({commit}, params) {
      const serialsId = params.id
      const isWatched = params.isWatched
      const userId = localStorage.getItem('sub')

      if(isWatched) {
        UsersSerialsDataService.addToUserSeries({
          users_id: userId,
          serials_id: serialsId
        })
          .then(res => {
            commit('EXIST', res.data.isExist)
          })
      } else {
        UsersSerialsDataService.deleteSeriesFromUser({
          users_id: userId,
          serials_id: serialsId
        })
          .then(res => {
            commit('EXIST', res.data.isExist)
          })
      }
    },
    CHANGED_FAVOURITE_STATUS({commit} , params) {
      console.log('CHANGED_FAVOURITE_STATUS');
      const seriesId = params.seriesId
      const isFavourite = params.isFavourite
      const userId = localStorage.getItem('sub')

      UsersSerialsDataService.updateFavouriteField({
        users_id: userId,
        serials_id: seriesId,
        is_favourite: isFavourite
      })
        .then(res => {
          commit('SET_FAVOURITE', res.data.isFavourite)
        })
    },
    CHANGED_RECOMMENDATION_STATUS({commit} , params) {
      console.log('CHANGED_RECOMMENDATION_STATUS');
      const seriesId = params.seriesId
      const isRecommendation = params.isRecommendation
      const userId = localStorage.getItem('sub')

      UsersSerialsDataService.updateRecommendationField({
        users_id: userId,
        serials_id: seriesId,
        is_recomendation: isRecommendation
      })
        .then(res => {
          commit('SET_RECOMMENDATION', res.data.isRecommendation)
        })
    },
    CHANGED_RATING({commit}, params) {
      console.log('CHANGED_RATING');
      const seriesId = params.seriesId
      const rating = params.rating
      const userId = localStorage.getItem('sub')

      UsersSerialsDataService.updateRatingField({
        users_id: userId,
        serials_id: seriesId,
        rating: rating
      })
        .then(res => {
          commit('SET_RATING', res.data.rating)
        })
    },
    CHANGED_REVIEW({commit}, params) {
      console.log('CHANGED_REVIEW');
      const seriesId = params.seriesId
      const review = params.review
      const userId = localStorage.getItem('sub')

      UsersSerialsDataService.updateReviewField({
        users_id: userId,
        serials_id: seriesId,
        review: review
      })
        .then(res => {
          commit('SET_REVIEW', res.data.review)
        })
    },
    GET_MARK_FIELDS({commit}, keys) {
      UsersSerialsDataService.getMarkFields(keys)
        .then(res => {
          commit('SET_MARK_FIELDS', res.data)
        })
    },
    IS_EXIST_SERIES({commit}, keys) {
      UsersSerialsDataService.isUserExistsSeries(keys)
        .then(res => {
          commit('EXIST', res.data.isExist)
        })
    }
  },
  mutations: {
    SET_FIELDS: (state, info) => {
      state.info = info
    },
    SET_STATISTIC: (state, statistic) => {
      state.statistic = statistic
    },
    SET_MARK_FIELDS: (state, fields) => {
      state.isFavourite = fields.is_favourite
      state.isRecommendation = fields.is_recomendation
      state.review = fields.review
      state.rating = fields.rating
    },
    EXIST: (state, isExist) => {
      state.isExist = isExist
      if(!isExist) {
        state.isFavourite = null
        state.isRecommendation = null
        state.rating = null
        state.review = ''
      }
    },
    SET_FAVOURITE: (state, isFavourite) => {
      state.isFavourite = isFavourite
    },
    SET_RECOMMENDATION: (state, isRecommendation) => {
      state.isRecommendation = isRecommendation
    },
    SET_RATING: (state, rating) => {
      state.rating = rating
    },
    SET_REVIEW: (state, review) => {
      state.review = review
    }
  },
  getters: {
    INFO(state) {
      return state.info[0]
    },
    STATISTIC(state) {
      return state.statistic[0][0]
    },
    IS_EXIST(state) {
      if(state.isExist !== null) {
        return state.isExist
      }
    },
    IS_FAVOURITE(state) {
      return state.isFavourite
    },
    IS_RECOMMENDATION(state) {
      return state.isRecommendation
    },
    RATING(state) {
      return state.rating
    },
    REVIEW(state) {
      return state.review
    }
  }
}