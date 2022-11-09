<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import draggable from "vuedraggable";
import TodoItem from "./TodoItem.vue";

const props = defineProps([
  "project",
  "todos",
  "addTodo",
  "saveTodo",
  "deleteTodo",
  "reorder",
  "moveTodo",
  "setDraggedTodoId",
]);
const todoList = ref([...props.todos]);
const dragOptions = computed(() => ({
  animation: 200,
}));

function dragStart(e: any) {
  if (e.item) {
    const el = e.item as HTMLElement;
    const id = el.getAttribute("data-todo-id");
    if (id) {
      props.setDraggedTodoId(parseInt(id));
    }
  }
}

const dragEnd = (dragEvent: any) => {
  props.reorder(
    props.project.id,
    dragEvent.moved.oldIndex,
    dragEvent.moved.newIndex
  );
};

watchEffect(() => (todoList.value = [...props.todos]));
</script>

<template>
  <draggable
    class="todo-list"
    v-model="todoList"
    v-bind="dragOptions"
    item-key="id"
    handle=".handle"
    @start="dragStart"
    :group="{ name: 'todos', pull: false }"
    @change="dragEnd"
  >
    <template #item="{ element }">
      <TodoItem :todo="element" :saveTodo="saveTodo" :deleteTodo="deleteTodo" />
    </template>
  </draggable>
  <button v-if="!!project.id" @click="addTodo()">Add todo</button>
</template>

<style scoped>
button {
  padding: 10px 16px;
  background-color: #00bd7e;
  border: 0;
  border-radius: 5px;
  margin: 8px auto;
  display: block;
}
button:hover {
  background-color: #2ecd98;
}
button:active {
  background-color: #49daa9;
}
</style>
