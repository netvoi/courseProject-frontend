import http from '../http-common'

class UsersSerialsDataService {
  getFields(id) {
    return http.request().get(`users_serials/fields/${ id }`)
  }

  addToUserSeries(keys) {
    return http.request().post('/users_serials/add', keys)
  }

  deleteSeriesFromUser(keys) {
    return http.request().post('/users_serials/delete', keys)
  }

  isUserExistsSeries(keys) {
    return http.request().post('/users_serials/isExists', keys)
  }

  updateFavouriteField(keys) {
    return http.request().post('/users_serials/favouriteField', keys)
  }

  updateRecommendationField(keys) {
    return http.request().post('/users_serials/recommendationField', keys)
  }

  updateRatingField(keys) {
    return http.request().post('/users_serials/ratingField', keys)
  }

  updateReviewField(keys) {
    return http.request().post('/users_serials/reviewField', keys)
  }

  updateDateField(keys) {
    return http.request().post('/users_serials/dateField', keys)
  }

  getMarkFields(keys) {
    return http.request().post('/users_serials/markFields', keys)
  }

  getUserBySeries(id) {
    return http.request().get(`/users_serials/user/${ id }`)
  }
}

export default new UsersSerialsDataService()
