<template>
  <div class="flex items-center gap-2 text-gray-500 text-lg">
    <router-link to="/" class="hover:text-primary transition-colors">
      首页
    </router-link>
    <template v-for="(item, index) in items" :key="index">
      <span class="mx-1">></span>
      <span 
        v-if="index === items.length - 1"
        class="text-red-600 font-medium"
      >
        {{ item.name }}
      </span>
      <router-link 
        v-else
        :to="item.path"
        class="hover:text-primary transition-colors"
      >
        {{ item.name }}
      </router-link>
    </template>
  </div>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  name: string
  path?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>
