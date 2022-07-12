<template>
  <section>
    <transition-group name="list" tag="ul">
      <li v-for="todoItem in PropsItems" :key="todoItem.key" class="shadow">
        <i class="checkBtn fas fa-check" aria-hidden="true"></i>
        {{ todoItem.value }}
        <span class="removeBtn" type="button" @click="removeTodo(todoItem.key)">
          <i class="far fa-trash-alt" aria-hidden="true"></i>
        </span>
      </li>
    </transition-group>
  </section>
</template>

<script>
export default {
  props: { PropsItems: Array },

  methods: {
    removeTodo(key) {
      // console.log(todoItem + ',' + idx);
      this.$emit('childRemoveTodo', key);
      return;
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background-color: white;
  border-radius: 5px;
}

.checkBtn {
  line-height: 50px;
  color: #62acde;
  margin-right: 5px;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
</style>
