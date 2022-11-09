<script setup lang="ts">
import ProjectItem from "./ProjectItem.vue";
import ProjectCreateButton from "./ProjectCreateButton.vue";
import { ref, watchEffect } from "vue";
import draggable from "vuedraggable";
const props = defineProps([
  "projects",
  "selectProject",
  "addProject",
  "moveTodo",
]);
const colors = ref([
  "#c89933",
  "#197bbd",
  "#4fbfac",
  "#62a06a",
  "#69268f",
  "#824c71",
  "#c33c54",
  "#824C71",
]);
const projectList = ref([...props.projects]);
watchEffect(() => (projectList.value = [...props.projects]));

function dragEnd(e: any) {
  const projectId = e.currentTarget.getAttribute("data-project-id");
  if (projectId) {
    props.moveTodo(parseInt(projectId));
  }
}
</script>

<template>
  <div class="projects">
    <draggable
      class="project-list"
      v-model="projectList"
      item-key="id"
      :sort="false"
      :disabled="true"
      :group="{ name: 'todos' }"
    >
      <template #item="{ element, index }">
        <ProjectItem
          :key="index"
          :project="element"
          :selectProject="selectProject"
          :color="colors[index % 8]"
          @drop="dragEnd"
        />
      </template>
    </draggable>
    <ProjectCreateButton :addProject="addProject" />
  </div>
</template>

<style scoped>
.projects {
  margin: 8px 0px;
  padding-left: 0;
}

.projects .item {
  margin: 0 0 16px 0;
  padding: 16px;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
}

@media (min-width: 1024px) {
  .projects .item {
    border-radius: 9px;
  }
}
</style>
