import http from '../http-common'

class UsersSerialsDataService {
  getStatistic(id) {
    return http.get(`users_serials/statistic/${id}`)
  }

  getFields(id) {
    return http.get(`users_serials/fields/${id}`)
  }

  addToUserSeries(keys) {
    return http.post('/users_serials/add', keys)
  }

  deleteSeriesFromUser(keys) {
    return http.post('/users_serials/delete', keys)
  }

  isUserExistsSeries(keys) {
    return http.post('/users_serials/isExists', keys)
  }

  updateFavouriteField(keys) {
    return http.post('/users_serials/favouriteField', keys)
  }

  updateRecommendationField(keys) {
    return http.post('/users_serials/recommendationField', keys)
  }

  updateRatingField(keys) {
    return http.post('/users_serials/ratingField', keys)
  }

  updateReviewField(keys) {
    return http.post('/users_serials/reviewField', keys)
  }

  getMarkFields(keys) {
    return http.post('/users_serials/markFields', keys)
  }
}

export default new UsersSerialsDataService()
