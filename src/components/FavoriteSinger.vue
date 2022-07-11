<template>
  <div>
    <img v-bind:src="imgSrc" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: 'http://res.heraldm.com/content/image/2022/07/05/20220705000839_0.jpg',
    };
  },
};
</script>

<style scoped>
img {
  width: 200px;
}
</style>
