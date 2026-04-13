<template>
  <div class="card">
    <h2 class="text-xl font-bold mb-4 text-red-600">阅读理解</h2>
    <div class="space-y-3">
      <div v-for="article in articles" :key="article.id" class="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
        <h3 class="font-bold">{{ article.title }}</h3>
        <p class="text-sm text-gray-600">适合年级：{{ article.grade }}年级</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  articles: Array<{id: number; title: string; grade: number}>
}>()
</script>
