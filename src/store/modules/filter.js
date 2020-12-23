export default {
  state: {
    seriesFiltered: []
  },
  actions: {
    GET_SERIES_FILTERED({commit}, params) {
      let series = []

      if(params.filter === 'is_favourite' || params.filter === 'is_recommendation') {
        series = params.info.filter(s => s[params.filter] === true)
        commit('SET_SERIES_FILTERED', series)
      } else if(params.filter === 'created') {
        series = params.info
        series.sort((a, b) => a[params.filter] < b[params.filter] ? 1 : -1)
        commit('UNSET_SERIES_FILTERED')
      } else {
        series = params.info
        series.sort((a, b) => a[params.filter] < b[params.filter] ? 1 : -1)
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
