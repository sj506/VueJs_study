<template>
  <h1>Hello</h1>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <div>{{ hello }}</div>
  <input type="text" v-model="hello" />
  <!-- v-model value? -->
  <button @click="changeHello">안녕하세요 변경</button>
  <FavoriteSinger></FavoriteSinger>
  <FavoriteSingerProps ddd="https://img.hankyung.com/photo/201906/8e6c04723ab7a28db9402391e32358a0.jpg"></FavoriteSingerProps>
</template>

<script>
import FavoriteSinger from './components/FavoriteSinger.vue';
import FavoriteSingerProps from './components/FavoriteSingerProps.vue';

export default {
  name: 'App',
  data() {
    return {
      hello: '안녕~',
    };
  },
  methods: {
    changeHello() {
      this.hello = '안녕하세요';
    },
  },
  components: {
    FavoriteSinger,
    FavoriteSingerProps,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
