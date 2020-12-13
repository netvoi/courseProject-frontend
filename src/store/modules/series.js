import SerialsDataService from '@/services/SerialsDataService'

export default {
  state: {
    series: {},
    allSeries: [],
    alphabetList: [],
    filteredAlphabetList: [],
    filterFields: {},
    isFiltered: false,
    foundSeries: [],
  },
  actions: {
    async GET_INFO_FROM_DB({commit}, id) {
      const res = await SerialsDataService.get(id)
        .then(response => response)
        .catch((error) => error.response)

      commit('SET_INFO', res.data)
      return res
    },
    async GET_ALL_SERIES({commit}) {
      const res = await SerialsDataService.getAll()
        .then(response => response)
        .catch((error) => error.response)

      commit('SET_SERIES', res.data)
      return res
    },
    GET_SERIALS_ORDER_ALPHABET({commit}) {
      let letters = []
      let alphabetList = []

      SerialsDataService.findFirstLetter()
        .then(response => {
          letters = response.data
        })
        .then(() => {
          letters.map(letter => {
            alphabetList.push({
              letter: letter.symbol,
              series: [],
              active: true
            })
          })
        })
        .then(() => {
          alphabetList.map(item => {
            SerialsDataService.findWithFirstLetter(item.letter)
              .then(res => {
                item.series = res.data.series
              })
          })
        })
        .then(() => {
          commit('SET_SERIES_ORDER_ALPHABET', alphabetList)
        })
    },
    STATUS_LIST({commit}, index) {
      commit('STATUS', index)
    },
    async GET_FILTER_FIELDS({commit}) {
      const res = await SerialsDataService.filters()
        .then(response => response)
        .catch(error => error.response)

      commit('SET_FILTER_FIELDS', res.data.filterFields)
      return res
    },
    FIELD_VISIBLE({commit}, nameKey) {
      commit('VISIBLE', nameKey)
    },
    FIELD_NOT_VISIBLE({commit}) {
      commit('NOT_VISIBLE')
    },
    GET_FILTERED_ALPHABET({commit, state}, params) {
      let filteredList = []

      for(let ob in params) {
        let copy = []

        if(filteredList.length) {
          copy = JSON.parse(JSON.stringify(filteredList))
          filteredList = []
        } else {
          copy = JSON.parse(JSON.stringify(state.alphabetList))
        }

        copy.map(block => {

          let arr = !(typeof params[ob] == 'number')
          ? block.series.filter(series => series[ob].includes(params[ob]))
          : block.series.filter(series => series[ob] === params[ob])

          if(arr.length !== 0) {
            filteredList.push({
              letter: block.letter,
              active: true,
              series: arr
            })
          }
        })
      }
      commit('SET_FILTERED_ALPHABET', filteredList)
    },
    GET_DROP_FILTERED_ALPHABET({commit}) {
      commit('DROP_FILTERED_ALPHABET')
    },
    GET_FOUND_SERIES({commit, state}, search) {
      let foundSeries = state.allSeries.filter(s => s.seriesName.toLowerCase().indexOf(search.toLowerCase()) + 1)
      commit('SET_FOUND_SERIES', foundSeries)
    }
  },
  mutations: {
    SET_INFO: (state, series) => {
      state.series = series
    },
    SET_SERIES: (state, allSeries) => {
      state.allSeries = allSeries
    },
    SET_SERIES_ORDER_ALPHABET: (state, alphabetList) => {
      state.alphabetList = alphabetList
    },
    STATUS: (state, index) => {
      state.filteredAlphabetList.length
      ? state.filteredAlphabetList[index].active = !(state.filteredAlphabetList[index].active)
      : state.alphabetList[index].active = !(state.alphabetList[index].active)
    },
    SET_FILTER_FIELDS: (state, filterFields) => {
      const temp = {}
      for(let ob in filterFields) {
        temp[ob] = {
          options: filterFields[ob],
          visible: false
        }
      }
      state.filterFields = temp
    },
    VISIBLE: (state, nameKey) => {
      for(let ob in state.filterFields) {
        if(ob !== nameKey) {
          state.filterFields[ob].visible = false
        }
      }
      state.filterFields[nameKey].visible = !(state.filterFields[nameKey].visible)
    },
    NOT_VISIBLE: state => {
      for(let ob in state.filterFields) {
        state.filterFields[ob].visible = false
      }
    },
    SET_FILTERED_ALPHABET: (state, filteredList) => {
      state.filteredAlphabetList = filteredList
      state.isFiltered = true
    },
    DROP_FILTERED_ALPHABET: (state) => {
      state.filteredAlphabetList = []
      state.isFiltered = false
    },
    SET_FOUND_SERIES: (state, foundSeries) => {
      state.foundSeries = foundSeries
    }
  },
  getters: {
    /* Получить сериал по ID */
    SERIES(state) {
      return state.series
    },
    /* Получить все сериалы */
    ALL_SERIES(state) {
      if(state.allSeries.length) return state.allSeries
    },
    /* Получить список сериалов расположенных по алфавиту */
    ALPHABET(state) {
      return state.alphabetList
    },
    /* Получить список с выбранным фильтром */
    FILTERED_ALPHABET(state) {
      return state.filteredAlphabetList
    },
    /* Получить всевозможные поля для фильтра */
    FILTER_FIELDS(state) {
      if(Object.keys(state.filterFields).length) {
        return state.filterFields
      }
    },
    IS_FILTERED(state) {
      return state.isFiltered
    },
    FOUND_SERIES(state) {
      return state.foundSeries
    }
  }
}
