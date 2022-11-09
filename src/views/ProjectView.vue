<script setup lang="ts">
import ProjectHeader from "@/components/ProjectHeader.vue";
import ProjectList from "@/components/ProjectList.vue";
import TodoList from "@/components/TodoList.vue";
import type { ProjectModel } from "@/models/ProjectModel";
import type { TodoModel } from "@/models/TodoModel";
import {
  createProject,
  deleteProject as doDeleteProject,
  editProject,
  getProjects,
} from "@/services/ProjectService";
import {
  createTodo,
  deleteTodo as doDeleteTodo,
  editTodo,
  getTodos,
  reorderTodos,
} from "@/services/TodoService";
import { ref, watchEffect } from "vue";

const projects = ref(getProjects());
const currentProject = ref<ProjectModel>();
const currentTodos = ref<TodoModel[]>([]);
const projectEditMode = ref(false);
const draggedTodoId = ref<number>();

function selectProject(project: ProjectModel) {
  currentProject.value = project;
}

function addProject() {
  const index = Math.max(0, ...projects.value.map((x) => x.index)) + 1;
  const project: ProjectModel = { id: 0, title: "", index };
  currentProject.value = project;
  currentTodos.value = [];
  projectEditMode.value = true;
}

function saveProject(project: ProjectModel) {
  if (currentProject.value) {
    let newProject: ProjectModel;
    if (project.id) {
      newProject = editProject(project);
    } else {
      newProject = createProject(project);
    }
    projects.value = getProjects();
    currentProject.value = projects.value.find((x) => x.id === newProject.id);
    if (currentProject.value) {
      currentTodos.value = getTodos(currentProject.value.id);
    }
  }
}

function deleteProject(project: ProjectModel) {
  const selectNewProject = currentProject.value?.id === project.id;
  doDeleteProject(project);
  projects.value = getProjects();
  if (selectNewProject) {
    currentProject.value = projects.value.length
      ? projects.value[0]
      : undefined;
    if (currentProject.value) {
      currentTodos.value = getTodos(currentProject.value.id);
    } else {
      currentTodos.value = [];
    }
  }
}

function addTodo() {
  if (!currentProject.value) {
    return;
  }
  const index = Math.max(0, ...currentTodos.value.map((x) => x.index)) + 1;
  currentTodos.value = [
    ...currentTodos.value,
    {
      projectId: currentProject.value.id,
      title: "",
      done: false,
      id: 0,
      index,
    },
  ];
}

function saveTodo(todo: TodoModel) {
  if (currentProject.value) {
    if (todo.id) {
      editTodo(todo);
    } else {
      createTodo(todo);
    }
    currentTodos.value = getTodos(currentProject.value.id);
  }
}

function deleteTodo(todo: TodoModel) {
  if (currentProject.value) {
    doDeleteTodo(todo);
    currentTodos.value = getTodos(currentProject.value.id);
  }
}

function setDraggedTodoId(id: number) {
  draggedTodoId.value = id;
}

function moveTodo(projectId: number) {
  if (!currentProject.value || !draggedTodoId.value) {
    return;
  }
  if (projectId === currentProject.value?.id) {
    return;
  }
  const todo = currentTodos.value.find((x) => x.id === draggedTodoId.value);
  if (!todo) {
    return;
  }
  todo.projectId = projectId;
  todo.index = Math.max(0, ...getTodos(projectId).map((x) => x.index)) + 1;
  editTodo(todo);
  currentTodos.value = getTodos(currentProject.value.id);
  draggedTodoId.value = undefined;
  console.log("todo moved", draggedTodoId.value);
}

function reorder(projectId: number, oldIndex: number, newIndex: number) {
  console.log("reorder", draggedTodoId.value);
  if (draggedTodoId.value) {
    reorderTodos(projectId, oldIndex, newIndex);
    draggedTodoId.value = undefined;
  }
}

watchEffect(() => {
  if (!currentProject.value) {
    currentProject.value = projects.value.length
      ? projects.value[0]
      : undefined;
  }
});

watchEffect(() => {
  currentTodos.value = currentProject.value?.id
    ? getTodos(currentProject.value.id)
    : [];
});
</script>

<template>
  <main>
    <ProjectList
      :projects="projects"
      :selectProject="selectProject"
      :addProject="addProject"
      :moveTodo="moveTodo"
    />
    <div class="lists">
      <ProjectHeader
        :project="currentProject"
        :editMode="projectEditMode"
        :saveProject="saveProject"
        :deleteProject="deleteProject"
      />
      <TodoList
        :project="currentProject"
        :todos="currentTodos"
        :addTodo="addTodo"
        :saveTodo="saveTodo"
        :deleteTodo="deleteTodo"
        :reorder="reorder"
        :setDraggedTodoId="setDraggedTodoId"
      />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
}
.lists {
  flex: 1;
}
</style>
