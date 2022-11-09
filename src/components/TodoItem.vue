<script setup lang="ts">
import type { TodoModel } from "@/models/TodoModel";
import { useConfetti } from "@/services/ConfettiService";
import { reactive, ref } from "vue";

const props = defineProps<{
  todo: TodoModel;
  saveTodo: Function;
  deleteTodo: Function;
}>();

const { addConfetti } = useConfetti();

const editMode = ref(!props.todo?.id);
const todoModel = reactive(props.todo);

function toggleEditMode() {
  if (editMode.value) {
    props.saveTodo(todoModel);
  }
  editMode.value = !editMode.value;
}

function taskDone() {
  if (!props.todo.done) {
    addConfetti();
  }
  props.saveTodo({ ...props.todo, done: !props.todo.done });
}
</script>

<template>
  <li class="todo-item" :data-todo-id="todoModel.id">
    <label class="form-control">
      <input
        type="checkbox"
        name="checkbox"
        :checked="todoModel.done"
        @change="taskDone()"
      />
      <span class="form">
        <input
          v-model="todoModel.title"
          :readonly="!editMode"
          placeholder="Todo title"
        />
      </span>
    </label>
    <span v-if="editMode" class="button delete" @click="deleteTodo(todoModel)"
      >🗑️</span
    >
    <span class="button edit" @click="toggleEditMode()">{{
      editMode ? "💾" : "🖋️"
    }}</span>
    <span class="handle">☰</span>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  margin-right: 12px;
}

.button {
  margin-right: 8px;
  cursor: pointer;
}

.handle {
  cursor: move;
  margin-top: -4px;
  user-select: none;
}
.form-control {
  flex: 1;
  line-height: 1.1;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
  margin: 8px 16px;
}

.form-control--disabled {
  color: var(--form-control-disabled);
  cursor: not-allowed;
}

input[type="checkbox"] {
  appearance: none;
  background-color: var(--color-background);
  margin-left: -6px;
  margin-top: 8px;

  font: inherit;
  color: currentColor;
  width: 1.5em;
  height: 1.5em;
  border: 0.15em solid currentColor;
  border-radius: 0.15em;
  transform: translateY(-0.2em);

  display: grid;
  place-content: center;
}

input[type="checkbox"]::before {
  content: "";
  width: 1em;
  height: 1em;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
  transform-origin: bottom left;
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}

input[type="checkbox"]:focus {
  outline: max(1px, 0.08em) solid #777;
  outline-offset: max(2px, 0.15em);
}

input[type="checkbox"]:disabled {
  color: var(--form-control-disabled);
  cursor: not-allowed;
}
</style>
