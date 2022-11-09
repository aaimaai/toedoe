<script setup lang="ts">
import type { ProjectModel } from "@/models/ProjectModel";

const props = defineProps<{
  project: ProjectModel;
  selectProject: Function;
  color: string;
}>();
</script>

<template>
  <div
    class="item"
    @click="selectProject(props.project)"
    :title="props.project.title"
    :data-project-id="props.project.id"
    :style="{ backgroundColor: props.color }"
  >
    <span class="icon">
      {{ props.project.title?.charAt(0) || "🌟" }}
    </span>
    <span class="title">
      {{ props.project.title }}
    </span>
  </div>
</template>

<style scoped>
.item {
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  color: white;
  line-height: 80%;
}
.title {
  display: none;
}
@media (min-width: 480px) {
  .icon {
    display: none;
  }
  .title {
    display: inline;
  }
}
</style>
