import FriendsDataService from '@/services/FriendsDataService'

export default {
  state: {
    requestFromMeList: [],
    requestToMeList: [],
    friends: []
  },
  actions: {
    async GET_FRIENDS({commit}) {
      const res = await FriendsDataService.friends()
        .then(response => {
          return response
        })
        .catch(error => {
          return error
        })
        commit('SET_FRIENDS', res.data)
    }
  },
  mutations: {
    SET_FRIENDS: (state, lists) => {
      state.friends = lists.friends
      state.requestFromMeList = lists.requestFromMeList
      state.requestToMeList = lists.requestToMeList
    }
  },
  getters: {
    REQUEST_FROM_ME_LIST(state) {
      return state.requestFromMeList
    },
    REQUEST_TO_ME_LIST(state) {
      return state.requestToMeList
    },
    FRIENDS(state) {
      return state.friends
    }
  }
}