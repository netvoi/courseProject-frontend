<template>
  <div id="modal2" class="about modal modal-fixed-footer" ref="about">
    <div class="about__content modal-content">
      <h2 class="about__title modal__title">О нас</h2>

      <ul class="about__list">
        <li class="about__list-item">
          <!-- eslint-disable-next-line max-len -->
          <p class="about__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas pariatur sed explicabo excepturi reprehenderit, tempore eligendi. Similique perferendis saepe porro corrupti quam repellendus eligendi sapiente amet quo ipsa. Dolorem, repellendus?</p>
        </li>
        <li class="about__list-item">
          <!-- eslint-disable-next-line max-len -->
          <p class="about__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas pariatur sed explicabo excepturi reprehenderit, tempore eligendi. Similique perferendis saepe porro corrupti quam repellendus eligendi sapiente amet quo ipsa. Dolorem, repellendus?</p>
        </li>
        <li class="about__list-item">
          <!-- eslint-disable-next-line max-len -->
          <p class="about__text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus corrupti quae consectetur? Ipsam tempore nihil voluptatem porro aut ad aliquid, hic ducimus delectus magnam sint mollitia cum corporis sed adipisci!</p>
        </li>
        <li class="about__list-item">
          <!-- eslint-disable-next-line max-len -->
          <p class="about__text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero perferendis sed quod cum quidem nam. Accusamus repellendus cum porro. Magnam asperiores, consequuntur corrupti optio animi dolore a sit tenetur quam?</p>
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
