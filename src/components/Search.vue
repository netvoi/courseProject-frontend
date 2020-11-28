<template>
    <div
      class="search"
      :class="{ showSearch }"
      v-if="allSeries.length"
    >
      <div
        class="search__item"
        v-for="series in allSeries"
        :key="series.id"
      >
        <div class="search__photo">
          <img
            :src="`${require(`@/assets/img/seriesPreview/libertad${series.id - 1}.jpg`)}`"
            :alt="series.seriesName"
          >
        </div>
        <div class="search__content">
          <router-link
            tag="a"
            :to="`/series/${series.id}`"
            @click.native="closeSearch"
          >{{ series.seriesName }}</router-link>
          <p v-if="series.description.length > 150">{{ series.description.slice(0, 150) + ' ...' }}</p>
          <p v-else>{{ series.description }}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'searchBlock',
  props: {
    showSearch: {
      type: Boolean,
      default: false
    },
    allSeries: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    closeSearch() {
      this.$emit('closeSearch')
    }
  }
}
</script>

<style lang="scss">
  .search {
    display: none;
    margin: 0 auto;

    position: fixed;
    top: 6.9rem;
    left: 0;
    right: 0;
    z-index: 100;


    width: calc((1140px / 3) * 1.5);
    height: calc(100% - 6.9rem);

    background-color:/*  #F8F9FB */#fff;

    overflow: auto;
    &::-webkit-scrollbar {
      width: 4px;
      background-color: rgba(#092C4C, .3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: #092C4C;
    }

    font-family: 'Inter', sans-serif;
    font-size: 1.6rem;
    font-weight: 400;

    color: #092C4C;
  }

  .search__item {
    padding: 1.5rem 1rem;

    display: flex;
  }

  .search__photo {
    position: relative;

    width: 200px;
    height: 100px;

    border-radius: 1rem;

    overflow: hidden;

    img {
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      width: 100%;
      height: 100%;

      object-fit: cover;
    }
  }

  .search__content {
    padding: 0 2rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: calc(100% - 200px);
    height: 100px;

    overflow: hidden;

    a {
      height: 20px;

      font-weight: 700;
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: none;
      }
    }

    p {
      max-height: 70px;

      overflow: hidden;
      text-rendering: optimizeLegibility;

      font-size: 1.4rem;
      font-weight: 300;
    }
  }

  .showSearch {
    display: block;
  }
</style> 