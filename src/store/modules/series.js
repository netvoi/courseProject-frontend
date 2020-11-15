import SerialsDataService from '@/services/SerialsDataService'

export default {
  state: {
    series: {},
    allSeries: [],
    alphabetList: [],
    filteredAlphabetList: [],
    filterFields: {},
    isFiltered: false,
  },
  actions: {
    GET_INFO_FROM_DB({commit}, id) {
      return SerialsDataService.get(id)
        .then((item) => {
          commit('SET_INFO', item.data)
          return item
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    GET_ALL_SERIES({commit}) {
      return SerialsDataService.getAll()
        .then((item) => {
          commit('SET_SERIES', item.data)
          return item
        })
        .catch((error) => {
          console.log(error)
          return error
        })
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
                item.series = res.data
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
    GET_FILTER_FIELDS({commit}) {
      SerialsDataService.filters()
        .then(response => {
          commit('SET_FILTER_FIELDS', response.data.filterFields)
        })
        .catch(error => {
          return error
        })
    },
    FIELD_VISIBLE({commit}, nameKey) {
      commit('VISIBLE', nameKey)
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
          : block.series.filter(series => series[ob] === item)

          if(arr.length != 0) {
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
  },
  mutations: {
    SET_INFO: (state, series) => {
      state.series = series
    },
    SET_SERIES: (state, allSeries) => {
      state.allSeries = allSeries
    },
    SET_SERIES_ORDER_ALPHABET: (state, alphabetList) => {
      console.log(alphabetList);
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
      state.filterFields[nameKey].visible = !(state.filterFields[nameKey].visible)
    },
    SET_FILTERED_ALPHABET: (state, filteredList) => {
      state.filteredAlphabetList = filteredList
      state.isFiltered = true
    },
    DROP_FILTERED_ALPHABET: (state) => {
      state.filteredAlphabetList = {}
      state.isFiltered = false
    },
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
  }
}