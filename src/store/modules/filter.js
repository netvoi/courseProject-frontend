export default {
  state: {
    seriesFiltered: []
  },
  actions: {
    GET_SERIES_FILTERED({commit}, params) {
      let series = []

      function sortByFilter(array, filter) {
        array.sort((a, b) => a[filter] < b[filter] ? 1 : -1)
      }

      if(params.filter === 'is_favourite' || params.filter === 'is_recommendation') {
        series = params.info.filter(s => s[params.filter] === true)
        commit('SET_SERIES_FILTERED', series)
      } else {
        series = params.info
        sortByFilter(series, params.filter)
        commit('UNSET_SERIES_FILTERED')
      }
    }
  },
  mutations: {
    SET_SERIES_FILTERED: (state, series) => {
      state.seriesFiltered = series
    },
    UNSET_SERIES_FILTERED: state => {
      state.seriesFiltered = []
    }
  },
  getters: {
    SERIES_FILTERED(state) {
      return state.seriesFiltered
    }
  }
}