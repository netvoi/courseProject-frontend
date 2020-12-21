<template>
  <div
    id="modal2"
    class="about modal modal-fixed-footer"
    ref="about"
  >
    <div class="about__content modal-content">
      <h2 class="about__title modal__title">О нас</h2>

      <ul class="about__list">
        <li class="about__list-item">
          <p class="about__text">Libertad - </p>
        </li>
      </ul>
    </div>
    <div class="about__footer modal-footer">
      <a href="#!" class="modal-close btn btn--modal">Закрыть</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-about',
  mounted() {
    this.about = M.Modal.init(this.$refs.about);
  },
};
</script>

<style lang="scss">
</style>
