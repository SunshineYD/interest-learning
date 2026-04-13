<template>
  <div class="card">
    <h2 class="text-xl font-bold mb-4 text-red-600">汉字听写练习</h2>
    <div class="space-y-4">
      <div class="flex items-center justify-between p-4 border rounded-lg">
        <span class="text-2xl font-bold">{{ currentWord }}</span>
        <button class="btn-secondary text-sm py-2 px-4">
          开始听写
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentWord: string
}>()
</script>
