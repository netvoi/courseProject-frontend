<template>
  <div class="page">
      <div class="container">
        <UserInfo
          @confirm="confirm"
          @cancel="cancel"
          @request="request"
          @favourite="favourite"

          :user="USER"
          :src="SRC"
          :statistic="STATISTIC"
          :myId="ME.userId"
          :userId="userId"
          :countFriends="friendList.length"

          :myFriendList="MY_FRIENDS"
          :requestFromMeList="REQUEST_FROM_ME_LIST"
          :requestToMeList="REQUEST_TO_ME_LIST"
        />

        <UsersSerials
          v-if="!!INFO && INFO.length"
          @filtered="filtered"

          :info="INFO"
          :seriesFiltered="SERIES_FILTERED"
        />
        <div
          v-else
          class="serials__no-series"
        ><span>У вас пока ни одного просмотренного сериала</span>
        </div>


        <Friends
          @confirm="confirm"
          @cancel="cancel"

          :friends="friendList"
          :requestToMe="requestToMeList"
          :requestFromMe="requestFromMeList"

          :userId="userId"
          :myId="ME.userId"
        />
      </div>
  </div>
</template>

<script>
import UsersSerials from '@/components/User/UsersSerials.vue'
import UserInfo from '@/components/User/UserInfo.vue'
import Friends from '@/components/User/Friends.vue'

import { mapActions, mapGetters } from 'vuex'

import FriendsDataService from '@/services/FriendsDataService'

export default {
  name: 'user',
  data: () => ({
    userId: null,

    friendList: [],

    myFriendList: [],
    requestFromMeList: [],
    requestToMeList: []
  }),
  components: {
    UserInfo,
    UsersSerials,
    Friends
  },
  methods: {
    ...mapActions([
      'GET_USER_FROM_DB',
      'GET_INFO_USER_SERIALS',

      'GET_ME',
      'GET_SOME_USERS',

      'GET_MY_FRIENDS',
      'GET_FRIEND_LIST',

      'GET_SERIES_FILTERED',
    ]),
    async friends(id) {
      await this.GET_FRIEND_LIST(id)

      await this.GET_SOME_USERS({ id: this.FRIEND_LIST })
      this.friendList = this.SOME_USERS
    },
    async myFriends() {
      await this.GET_MY_FRIENDS()

      await this.GET_SOME_USERS({ id: this.MY_FRIENDS })
      this.myFriendList = this.SOME_USERS

      await this.GET_SOME_USERS({ id: this.REQUEST_FROM_ME_LIST })
      this.requestFromMeList = this.SOME_USERS

      await this.GET_SOME_USERS({ id: this.REQUEST_TO_ME_LIST })
      this.requestToMeList = this.SOME_USERS
    },
    async confirm(id) {
      this.$socket.emit('confirmRequest', {
        to: id,
        from: this.ME.userId
      })
      await FriendsDataService.confirmRequest({id})
        .then(response => response)
        .catch(error => console.error('Что-то пошло не так:', error))
    },
    async cancel(id) {
      this.$socket.emit('cancelRequest', {
        to: id,
        from: this.ME.userId
      })
      await FriendsDataService.cancelRequest({id})
        .then(response => response)
        .catch(error => console.error('Что-то пошло не так:', error))
    },
    async request(id) {
      this.$socket.emit('sendRequest', {
        to: id,
        from: this.ME.userId
      })
      await FriendsDataService.sendRequest({id})
        .then(response => response)
        .catch(error => console.error('Что-то пошло не так:', error))
    },
    filtered(filter) {
      this.GET_SERIES_FILTERED({ info: this.INFO, filter: filter })
    },
    favourite() {
      this.GET_SERIES_FILTERED({ info: this.INFO, filter: 'is_favourite' })
    },
    async __mounted(id) {
      this.userId = Number(id)

      await this.GET_USER_FROM_DB(id)
      await this.GET_INFO_USER_SERIALS(id)

      await this.friends(id)
      await this.myFriends()

      await this.GET_ME()

      this.sockets.subscribe('send-request', async () => {
        await this.friends(this.$route.params.id)
        await this.myFriends()
      })

      this.sockets.subscribe('cancel-request', async () => {
        await this.friends(this.$route.params.id)
        await this.myFriends()
      })

      this.sockets.subscribe('confirm-request', async () => {
        await this.friends(this.$route.params.id)
        await this.myFriends()
      })

      this.sockets.subscribe('update-series', async () => {
        console.log('update-series');
        await this.GET_INFO_USER_SERIALS(id)
      })
    }
  },
  mounted() {
    this.__mounted(this.$route.params.id)
  },
  computed: {
    ...mapGetters([
      'USER',
      'SRC',
      'INFO',
      'STATISTIC',
      'ME',

      'FRIEND_LIST',
      'MY_FRIENDS',
      'REQUEST_TO_ME_LIST',
      'REQUEST_FROM_ME_LIST',

      'SOME_USERS',

      'SERIES_FILTERED'
    ]),
  },
  watch: {
    $route (to, from) {
      if(to.params.id !== from.params.id) {
        this.__mounted(to.params.id)
      }
    }
  },
  beforeDestroy() {
    this.sockets.unsubscribe('update-series')
    this.sockets.unsubscribe('confirm-request')
  }
};
</script>
