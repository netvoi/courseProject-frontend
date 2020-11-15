<template>
  <div class="page">
      <div class="container">
          <UserInfo 
            :user="USER"
            :statistic="STATISTIC"
            :myId="ME.userId"
            :userId="userId"
          />

          <UsersSerials
            :info="INFO"
          />

          <Friends
            :friends="friendList"
            :requestToMe="requestToMeList"
            :requestFromMe="requestFromMeList"
          />
      </div>
      <!-- /.container -->
  </div>
  <!-- /.profile -->
</template>

<script>
import UserInfo from '@/components/UserInfo.vue';
import UsersSerials from '@/components/UsersSerials.vue';
import Friends from '@/components/Friends.vue';

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'user',
  data: () => ({
    userId: null,
    friendList: [],
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
      'GET_STATISTIC',
      
      'GET_ME',
      'GET_FRIENDS',
      'GET_SOME_USERS'
    ]),
  },
  mounted() {
    this.GET_USER_FROM_DB(this.$route.params.id)
    this.GET_INFO_USER_SERIALS(this.$route.params.id)
    this.GET_STATISTIC(this.$route.params.id)

    this.GET_ME()

    this.GET_FRIENDS()
      .then(() => {
        this.GET_SOME_USERS({ id: this.FRIENDS })
          .then(() => {
            console.log('friend');
            this.friendList = this.SOME_USERS
          })
        
        this.GET_SOME_USERS({ id: this.REQUEST_TO_ME_LIST })
          .then(() => {
            console.log('requestToMeList');
            this.requestToMeList = this.SOME_USERS
          })

          this.GET_SOME_USERS({ id: this.REQUEST_FROM_ME_LIST })
          .then(() => {
            console.log('requestFromMeList');
            this.requestFromMeList = this.SOME_USERS
          })
      })

    this.userId = this.$route.params.id
  },
  computed: {
    ...mapGetters([
      'USER',
      'INFO',
      'STATISTIC',
      'ME',
      'FRIENDS',
      'REQUEST_TO_ME_LIST',
      'REQUEST_FROM_ME_LIST',
      'SOME_USERS'
    ])
  }
};
</script>