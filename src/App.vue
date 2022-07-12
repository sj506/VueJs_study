<template>
  <div>
    <TodoHeader></TodoHeader>
    <TodoInput @childAddTodo="addTodo" @modal="showModal"></TodoInput>
    <TodoList :PropsItems="todoItems" @childRemoveTodo="removeTodo"></TodoList>
    <!-- 변수를 줄 때는 바인딩을 해줘야함 -->
    <TodoFooter @childClearAllBtn="clearTodo"></TodoFooter>
  </div>
  <Modal :show="modalShow" header="알림창" body="내용을 입력해 주세요." footer="푸터" @close="hiddenModal"> </Modal>
</template>

<script>
import TodoFooter from './components/TodoFooter.vue';
import TodoHeader from './components/TodoHeader.vue';
import TodoList from './components/TodoList.vue';
import TodoInput from './components/Todo-input.vue';
import Modal from './components/common/Modal.vue';

export default {
  name: 'App',
  components: {
    TodoFooter,
    TodoHeader,
    TodoList,
    TodoInput,
    Modal,
  },

  data() {
    return {
      todoItems: [],
      test: true,
      cnt: 0,
      modalShow: false,
    };
  },
  methods: {
    hiddenModal() {
      return (this.modalShow = false);
    },
    showModal() {
      return (this.modalShow = true);
    },
    addTodo(todoItem) {
      if (todoItem == localStorage.getItem(todoItem)) {
        return;
      }
      // localStorage.setItem(todoItem, todoItem);
      this.todoItems.push({
        key: this.cnt++,
        value: todoItem,
      });
    },
    clearTodo() {
      this.todoItems.splice(0);
      // this.todoItems = [];
      //splice(여기부터,요기까지) 지울거에요
      // localStorage.clear();
      this.cnt = 0;
    },
    removeTodo(key) {
      // this.todoItems.splice(key, 1);
      this.todoItems.forEach((item, idx) => {
        if (item.key === key) {
          this.todoItems.splice(idx, 1);
        }
      });
      // localStorage.removeItem(todoItem, idx);
    },

    changeValue() {
      const json = JSON.stringify(this.todoItems);
      localStorage.setItem('todoItems', json);
      localStorage.setItem('cnt', this.cnt);
    },
  },

  created() {
    const json = localStorage.getItem('todoItems');
    if (json) {
      const todoItems = JSON.parse(json);
      //parse 객체로 다시 변환?
      todoItems.forEach((item) => {
        this.todoItems.push(item);
      });
      const cnt = localStorage.getItem('cnt');
      this.cnt = cnt;
    }
  },
  watch: {
    todoItems: {
      deep: true,
      // .이 두개 들어가면 deep 가능
      handler() {
        this.changeValue();
      },
    },
  },
};
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
body {
  text-align: center;
  background-color: #f6f6f8;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
