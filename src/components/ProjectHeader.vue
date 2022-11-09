<script setup lang="ts">
import type { ProjectModel } from "@/models/ProjectModel";
import { reactive, ref, watchEffect } from "vue";

let props = defineProps([
  "project",
  "editMode",
  "deleteProject",
  "saveProject",
]);

let editMode = ref(!!props.editMode);
const projectModel: ProjectModel = reactive({ ...props.project });
// const update = debounce((title: string) => {
//   console.log(`New project title ${title}`);
// }, 300);
function toggleEditMode() {
  if (editMode.value) {
    props.saveProject(projectModel);
  }
  editMode.value = !editMode.value;
}
watchEffect(() => Object.assign(projectModel, props.project));
watchEffect(() => (editMode.value = !projectModel.id));
</script>

<template>
  <div class="project form">
    <input
      v-model="projectModel.title"
      :readonly="!editMode"
      placeholder="Project name"
    />
    <span v-if="editMode" class="button delete" @click="deleteProject(project)"
      >🗑️</span
    >
    <span class="button edit" @click="toggleEditMode()">{{
      editMode ? "💾" : "🖋️"
    }}</span>
  </div>
</template>

<style scoped>
.project {
  color: white;
  margin: 0 8px;
  display: flex;
  align-items: center;
}
.form input {
  font-size: 22px;
  font-style: italic;
}
.button {
  cursor: pointer;
  margin-right: 8px;
}
</style>
