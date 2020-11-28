<template>
  <div id="modal1" class="modal" ref="modal">
    <div class="friends">
      
      <div class="inset tabs__wrapper">
        <ul class="inset__list tabs">
          <li class="inset__item tabs__item">
            <a
              class="inset__item-link tabs__item-link"
              :class="{ activeTab: isActive('friends') }"
              @click="setActive('friends')"
            >Друзья<span>{{ friends.length }}</span></a>
          </li>
          <li class="inset__item tabs__item" v-if="Number(userId) === myId">
            <a
              class="inset__item-link tabs__item-link"
              :class="{ activeTab: isActive('requestToMeList') }"
              @click="setActive('requestToMeList')"
            >Входящие заявки<span>{{ requestToMe.length }}</span></a>
          </li>
          <li class="inset__item tabs__item" v-if="Number(userId) === myId">
            <a
              class="inset__item-link tabs__item-link"
              :class="{ activeTab: isActive('requestFromMeList') }"
              @click="setActive('requestFromMeList')"
            >Исходящие заявки<span>{{ requestFromMe.length }}</span></a>
          </li>
        </ul>
        <!-- <button class="tabs__btn-close modal-close"></button> -->
      </div>

      <div class="inset__content tabs__page">
        <div
          class="inset__content-item tabs__page-item"
          id="friends"
          :class="{ show: isActive('friends') }">
            <FriendListTemplate
              :list="friends"
              :status="status.friend"
            />
          </div>
        <div
          class="inset__content-item tabs__page-item"
          id="requestToMeList"
          :class="{ show: isActive('requestToMeList') }"
        >
          <FriendListTemplate
              @confirm="confirm"
              @cancel="cancel"

              :list="requestToMe"
              :status="status.requestToMe"
            />
        </div>
        <div
          class="inset__content-item tabs__page-item"
          id="requestFromMeList"
          :class="{ show: isActive('requestFromMeList') }"
        >
          <FriendListTemplate
              @cancel="cancel"

              :list="requestFromMe"
              :status="status.requestFromMe"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FriendListTemplate from '@/components/FriendListTemplate.vue'
import statusFriendship from '@/utils/statusFriendship'

export default {
  name: 'Friends',
  data: () => ({
    activeTab: 'friends',
    status: {}
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
      default() {
        return []
      }
    },
    requestFromMe: {
      type: Array,
      default() {
        return []
      }
    },
    myId: {
      type: Number,
      default: null
    },
    userId: {
      type: Number,
      default: null
    },
  },
  methods: {
    setActive(tab) {
      this.activeTab = tab
    },
    isActive(tab) {
      return this.activeTab === tab
    },
    confirm(id) {
      this.$emit('confirm', id)
    },
    cancel(id) {
      this.$emit('cancel', id)
    }
  },
  mounted() {
    this.modal = M.Modal.init(this.$refs.modal, {
      startingTop: '0%',
    });
    this.status = statusFriendship
  },
  watch: {
    $route (to, from) {
      this.activeTab = 'friends'
    }
  }
};
</script>

<style lang="scss">
</style>
