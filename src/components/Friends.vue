<template>
  <div id="modal1" class="friends modal" ref="modal">

    <div class="friends__content">

      <div :id="list.state">
        <FriendListTemplate
          v-if="list.state === 'friendList'"
          :list="friends"
        />

        <FriendListTemplate
          v-else-if="list.state === 'requestToMeList'"
          :list="requestToMe"
        />

        <FriendListTemplate
          v-else
          :list="requestFromMe"
        />
      </div>
      <ul class="tabs" ref="friendsTabs">
        <li class="tab width--sm">
          <a class="active" href="#friendList" @click="list.state='friendList'">Друзья</a>
        </li>
        <li class="tab width--sm">
          <a href="#requestToMeList" @click="list.state='requestToMeList'">Входящие заявки</a>
        </li>
        <li class="tab width--sm">
          <a href="#requestFromMeList" @click="list.state='requestFromMeList'">Исходящие заявки</a>
        </li>
      </ul>
    </div>

    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close btn btn--modal">Закрыть</a>
    </div>
  </div>
</template>

<script>
import FriendListTemplate from '@/components/FriendListTemplate.vue'

export default {
  name: 'Friends',
  data: () => ({
    list: {
      state: 'friendList',
      active: false
    }
  }),
  components: {
    FriendListTemplate
  },
  props: {
    friends: {
      type: Array,
      default: []
    },
    requestToMe: {
      type: Array,
      default: []
    },
    requestFromMe: {
      type: Array,
      default: []
    }
  },
  mounted() {
    this.modal = M.Modal.init(this.$refs.modal, {
      startingTop: '0%',
    });
    this.friendsTabs = M.Tabs.init(this.$refs.friendsTabs, {
      duration: 500,
    });
  },
};
</script>

<style lang="scss">
</style>
