<template>
  <div>
    <img class="imgSize" :src="ddd" />
  </div>
</template>

<script>
export default {
  props: {
    ddd: String,
  },
};
</script>

<style scoped>
.imgSize {
  width: 200px;
}
</style>
