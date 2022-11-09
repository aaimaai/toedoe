<script setup lang="ts">
defineProps(["addProject"]);
</script>

<template>
  <div class="item" @click="addProject">
    <span class="icon">+</span>
    <span class="title"> New project</span>
  </div>
</template>

<style scoped>
.item {
  cursor: pointer;
  color: #fff;
  font-size: 25px;
  line-height: 20px;
  font-weight: normal;
  text-align: center;
  border: 3px dashed blueviolet;
}
.title {
  display: none;
}
@media (min-width: 480px) {
  .title {
    display: inline;
  }
}
</style>
