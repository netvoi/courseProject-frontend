<template>
  <div class="user" v-if="!!user && Object.keys(user).length">
    <div class="row align-items-center mb-0">
      <div class="col-4">
        <div
          class="user__photo ml-auto mr-auto"
          v-if="user.id"
        >
          <img
            :src="root + user.avatar"
            alt="avatar"
          >
        </div>
      </div>
      <!-- /.col -->

      <div class="col-8">
        <div class="user__info">
          <div class="user__header">
            <h1 class="title--h1">{{ user.first_name }} {{ user.last_name }}</h1>
            <!-- <p class="user__status">Таков путь<span id="status"></span></p> -->
          </div>
          <div class="user__links">
            <a href="#modal1" class="user__link modal-trigger">
                Друзей: <span id="friendCount">{{ countFriends }}</span>
            </a>
            <a
              href="#serials"
              class="user__link"
              @mouseover="isActive = true"
              @mouseleave="isActive = false"
            >
              Сериалов просмотренно: <span>{{ statistic.countSeries }}</span>
              <div class="series-statisctic" :class="{ showTtip: isActive }">
                <small class="series-fav">Избранное:<span>{{ statistic.countFav }}</span></small>
                <small class="series-rec">Рекомендуемое:<span>{{ statistic.countRec }}</span></small>
              </div>
            </a>
          </div>
          <div class="user__buttons" v-if="myId !== userId">
            <button
              class="btn btn--delete"
              v-if="myFriendList.includes(user.id)"
              @click.prevent="cancel(user.id)"
            >Удалить<span></span></button>
            <div
              class="btn__block"
              v-else-if="requestToMeList.includes(user.id)"
            >
              <button
                class="btn btn--add"
                @click.prevent="confirm(user.id)"
              >Принять<span></span></button>
              <button
                class="btn btn--delete"
                @click.prevent="cancel(user.id)"
              >Отклонить<span></span></button>
            </div>
            <button
              class="btn btn--delete"
              v-else-if="requestFromMeList.includes(user.id)"
              @click.prevent="cancel(user.id)"
            >Отменить заявку<span></span></button>
            <button
              class="btn btn--add"
              v-else
              @click.prevent="request(user.id)"
            >Добавить<span></span></button>
            <button
              class="btn btn--message"
              @click="() => { this.$router.push(`/inbox/im${user.id}`) }"
            >Отправить сообщение</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import r from '@/utils/root'

export default {
  name: 'UserInfo',
  data: () => ({
    isActive: false,
  }),
  props: {
    user: {
      type: Object,
      default() {
        return {}
      },
    },
    statistic: {
      type: Object,
      default() {
        return {}
      },
    },
    myId: {
      type: Number,
      default: null
    },
    userId: {
      type: Number,
      default: null
    },
    countFriends: {
      type: Number,
      default: null
    },

    myFriendList: {
      type: Array,
      default() {
        return []
      }
    },
    requestFromMeList: {
      type: Array,
      default() {
        return []
      }
    },
    requestToMeList: {
      type: Array,
      default() {
        return []
      }
    },
    root: {
      type: String,
      default: ''
    }
  },
  methods: {
    confirm(id) {
      this.$emit('confirm', id)
    },
    cancel(id) {
      this.$emit('cancel', id)
    },
    request(id) {
      this.$emit('request', id)
    },
    favourite() {
      this.$emit('favourite')
    },
    mouseOver() {
      this.isActive = !this.isActive
    }
  },
};
</script>

<style lang="scss">
</style>
