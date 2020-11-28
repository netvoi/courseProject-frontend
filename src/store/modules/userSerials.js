import UsersSerialsDataService from '@/services/UsersSerialsDataService'

export default {
  state: {
    info: [],
    statistic: {},
    isExist: null,
    isFavourite: null,
    isRecommendation: null,
    rating: 0,
    review: '',
    date: '',
    userSeries: []
  },
  actions: {
    async GET_INFO_USER_SERIALS({commit}, id) {
      const res = await UsersSerialsDataService.getFields(id)
        .then(response => response)
        .catch(error => error.response)

      res.data.series.sort((a, b) => a.created < b.created ? 1 : -1)
      commit('SET_FIELDS', res.data.series)

      const statistic = {
        countSeries: 0,
        countFav: 0,
        countRec: 0,
      }
      res.data.series.map(s => {
        statistic.countSeries++
        if(s.is_favourite === true) statistic.countFav++
        if(s.is_recommendation === true) statistic.countRec++
      })
      commit('SET_STATISTIC', statistic)

      return res
    },
    async CHANGED_WATCHED_STATUS({commit}, params) {
      const serialsId = params.id
      const isWatched = params.isWatched

      if(isWatched) {
        const res = await UsersSerialsDataService.addToUserSeries({
          serials_id: serialsId
        })
          .then(resposne => resposne)
          .catch(error => error.response)
        
        commit('EXIST', res.data.isExist)
        return res
      } else {
        const res = await UsersSerialsDataService.deleteSeriesFromUser({
          serials_id: serialsId
        })
          .then(response => response)
          .catch(error => error.response)

          commit('EXIST', res.data.isExist)
          return res
      }
    },
    async CHANGED_FAVOURITE_STATUS({commit} , params) {
      const seriesId = params.seriesId
      const isFavourite = params.isFavourite

      const res = await UsersSerialsDataService.updateFavouriteField({
        serials_id: seriesId,
        is_favourite: isFavourite
      })
        .then(response => response)
        .catch(error => error.response)
      
      commit('SET_FAVOURITE', res.data.isFavourite)
      return res
    },
    async CHANGED_RECOMMENDATION_STATUS({commit} , params) {
      const seriesId = params.seriesId
      const isRecommendation = params.isRecommendation

      const res = await UsersSerialsDataService.updateRecommendationField({
        serials_id: seriesId,
        is_recommendation: isRecommendation
      })
        .then(response => response)
        .catch(error => error.response)

      commit('SET_RECOMMENDATION', res.data.isRecommendation)
      return res
    },
    async CHANGED_RATING({commit}, params) {
      const seriesId = params.seriesId
      const rating = params.rating

      const res = await UsersSerialsDataService.updateRatingField({
        serials_id: seriesId,
        rating: rating
      })
        .then(response => response)
        .catch(error => error.response)
      
      commit('SET_RATING', res.data.rating)
      return res
    },
    async CHANGED_REVIEW({commit}, params) {
      const seriesId = params.seriesId
      const review = params.review

      const res = await UsersSerialsDataService.updateReviewField({
        serials_id: seriesId,
        review: review
      })
        .then(response => response)
        .catch(error => error.response)

      commit('SET_REVIEW', res.data.review)
      return res
    },
    async CHANGED_DATE({commit}, params) {
      const seriesId = params.seriesId
      const date = params.date
      
      const res = await UsersSerialsDataService.updateDateField({
        serials_id: seriesId,
        date: date
      })
        .then(response => response)
        .catch(error => error.response)

      commit('SET_DATE', res.data.date)
      return res
    },
    async GET_MARK_FIELDS({commit}, keys) {
      const res = await UsersSerialsDataService.getMarkFields(keys)
        .then(response => response)
        .catch(error => error.response)
        
      commit('SET_MARK_FIELDS', res.data)
      return res
    },
    async IS_EXIST_SERIES({commit}, keys) {
      const res = await UsersSerialsDataService.isUserExistsSeries(keys)
        .then(response => response)
        .catch(error => error.response)

      commit('EXIST', res.data.isExist)
      return res
    },
    async GET_USER_BY_SERIES({commit}, id) {
      const res = await UsersSerialsDataService.getUserBySeries(id)
        .then(response => response)
        .catch(error => error.response)

      commit('SET_USER_BY_SERIES', res.data.user)
      return res
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
      state.isRecommendation = fields.is_recommendation
      state.review = fields.review
      state.rating = fields.rating
      state.date = fields.date_comment
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
    },
    SET_DATE: (state, date) => {
      state.date = date
    },
    SET_USER_BY_SERIES: (state, userSeries) => {
      state.userSeries = userSeries
    }
  },
  getters: {
    INFO(state) {
      return state.info
    },
    STATISTIC(state) {
      return state.statistic
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
    },
    DATE(state) {
      return state.date
    },
    USER_SERIES(state) {
      return state.userSeries
    }
  }
}