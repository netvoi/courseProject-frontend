import FriendsDataService from '@/services/FriendsDataService'

export default {
  state: {
    requestFromMeList: [],
    requestToMeList: [],
    myFriends: [],
    friendList: []
  },
  actions: {
    async GET_MY_FRIENDS({commit}) {
      const res = await FriendsDataService.myFriendLists()
        .then(response => response)
        .catch(error => error.response)

      commit('SET_MY_FRIENDS', res.data)
      return res
    },
    async GET_FRIEND_LIST({commit}, id) {
      const res = await FriendsDataService.friendList(id)
        .then(response => response)
        .catch(error => error.response)

      commit('SET_FRIEND_LIST', res.data.friends)
      return res
    },
  },
  mutations: {
    SET_MY_FRIENDS: (state, lists) => {
      state.myFriends = lists.friends
      state.requestFromMeList = lists.requestFromMeList
      state.requestToMeList = lists.requestToMeList
    },
    SET_FRIEND_LIST: (state, friendList) => {
      state.friendList = friendList
    }
  },
  getters: {
    REQUEST_FROM_ME_LIST(state) {
      return state.requestFromMeList
    },
    REQUEST_TO_ME_LIST(state) {
      return state.requestToMeList
    },
    MY_FRIENDS(state) {
      return state.myFriends
    },
    FRIEND_LIST(state) {
      return state.friendList
    }
  }
}
