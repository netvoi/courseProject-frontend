<template>
  <div class="otherReview">
    <div class="otherReview__rating">
      <h2 class="otherReview__title title--h2"><span>User</span> оценил данный сериал</h2>

      <!-- <Rating /> -->

    </div>
    <h3 class="otherReview__subtitle title--h3">Мнение User</h3>

    <!-- eslint-disable-next-line max-len -->
    <div class="otherReview__text">
      <p> Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).</p>
      <div class="datetime"><span>09.10.2020</span></div>
    </div>
  </div>
  <!-- /.otherReview -->
</template>

<script>
import Rating from '@/components/Rating.vue';

export default {
  components: { Rating },
};
</script>

<style lang="scss">
</style>
