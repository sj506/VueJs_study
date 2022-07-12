<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput @childAddTodo="addTodo" @noInputValue="showModal"></TodoInput>
    <TodoList :propsItems="todoItems" @childRemoveTodo="removeTodo"></TodoList>
    <TodoFooter @clearTodo="clearTodo"></TodoFooter>
  </div>
  <Modal :show="modalShow" header="알림창" body="내용을 입력해 주세요." @close="hiddenModal"></Modal>
</template>

<script>
import TodoFooter from './components/todo/TodoFooter.vue';
import TodoHeader from './components/todo/TodoHeader.vue';
import TodoList from './components/todo/TodoList.vue';
import TodoInput from './components/todo/Todo-input.vue';
import Modal from './components/common/Modal.vue';
import axios from 'axios';
//액시오스를 깔고 프록시도 설정
import DateUtils from './utils/DateUtils';

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
      // this.todoItems.push({
      //   itodo: this.cnt++,
      //   todo: todoItem,
      // });

      axios.post('/todo/index', { todo: todoItem }).then((res) => {
        console.log(res);
        if (res.status === 200 && res.data) {
          const item = {
            itodo: res.data.result,
            todo: todoItem,
            created_at: DateUtils.getTimestamp(new Date()),
          };
          this.todoItems.push(item);
        }
      });
    },
    clearTodo() {
      this.todoItems.splice(0);
      // this.todoItems = [];
      //splice(여기부터,요기까지) 지울거에요
      // localStorage.clear();
      axios.delete('/todo/index/').then((res) => console.log(res));
      this.cnt = 0;
    },
    removeTodo(key) {
      // this.todoItems.splice(key, 1);
      this.todoItems.forEach((item, idx) => {
        if (item.itodo === key) {
          this.todoItems.splice(idx, 1);
          axios.delete(`/todo/index/${item.itodo}`).then((res) => console.log(res));
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

  watch: {
    todoItems: {
      deep: true,
      // .이 두개 들어가면 deep 가능
      handler() {
        this.changeValue();
      },
    },
  },

  created() {
    // const json = localStorage.getItem('todoItems');
    // if (json) {
    //   const todoItems = JSON.parse(json);
    //   //parse 객체로 다시 변환?
    //   todoItems.forEach((item) => {
    //     this.todoItems.push(item);
    //   });
    //   const cnt = localStorage.getItem('cnt');
    //   this.cnt = cnt;
    // }
    axios.get('/todo/index').then((res) => {
      if (res.status === 200 && res.data.length > 0) {
        res.data.forEach((item) => {
          this.todoItems.push(item);
          const cnt = localStorage.getItem('cnt');
          this.cnt = cnt;
        });
      }
    });
  },
};
</script>

<style>
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
.ctnt {
  font-size: 1rem;
}
.d-flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.flex-row {
  flex-direction: row;
}
.grow_1 {
  flex-grow: 1;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
.justify_content_evenly {
  justify-content: space-evenly;
}
</style>
