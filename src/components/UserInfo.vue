<template>
  <div class="user">
    <div class="row align-items-center mb-0">
      <div class="col-4">
        <div
          class="user__photo ml-auto mr-auto"
          v-if="user.id"
        >
          <img
            :src="require(`@/assets/img/${pathUserAvatar[user.id].url}`)"
            alt="avatar">
        </div>
      </div>
      <!-- /.col -->

      <div class="col-8">
        <div class="user__info">
          <div class="user__header">
            <h1 class="title--h1">{{ user.first_name }} {{ user.last_name }}</h1>
            <p class="user__status">Таков путь<span id="status"></span></p>
          </div>

          <div class="user__links">
            <a href="#modal1" class="user__link modal-trigger">
                Друзей: <span id="friendCount">0</span>
            </a>
            <router-link tag="a" to="#" class="user__link">
              Сериалов просмотренно: <span>{{ statistic.count_watched }}</span>
            </router-link>
            <router-link tag="a" to="#" class="user__link">
              Избранное: <span>{{ statistic.count_favourite }}</span>
            </router-link>
          </div>

          <div class="user__buttons" v-if="myId !== Number(userId)">
            <button class="btn btn--add" type="button">Добавить<span></span></button>
            <button class="btn btn--message" type="button">Отправить сообщение</button>
          </div>
        </div>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->
  </div>
  <!-- /.user -->
</template>

<script>

export default {
  name: 'UserInfo',
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
      type: String,
      default: null
    }
  },
  data: () => ({
    pathUserAvatar: [
      { url: 'avatar0.jpg' },
      { url: 'avatar1.jpg' },
      { url: 'avatar2.jpg' },
      { url: 'avatar3.jpg' },
      { url: 'avatar4.jpg' },
      { url: 'avatar5.jpg' },
      { url: 'avatar0.jpg' },
      { url: 'avatar0.jpg' },
      { url: 'avatar0.jpg' },
      { url: 'avatar0.jpg' },
      { url: 'avatar0.jpg' },
      { url: 'avatar0.jpg' },
      { url: 'avatar0.jpg' },
      { url: 'avatar0.jpg' },
      { url: 'avatar0.jpg' },
      { url: 'avatar0.jpg' },
      { url: 'avatar0.jpg' },
    ],
  }),
};
</script>

<style lang="scss">
</style>
