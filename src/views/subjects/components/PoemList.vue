<template>
  <div class="card h-full flex flex-col overflow-hidden p-0">
    <h2 class="text-xl font-bold mb-4 text-red-600 flex-shrink-0 px-6 pt-6">诗词列表</h2>
    <div class="space-y-2 overflow-y-auto flex-grow px-6 pb-6 pr-2">
      <button
        v-for="poem in poems"
        :key="poem.id"
        @click="selectPoem(poem)"
        class="w-full text-left p-3 rounded-lg transition-all relative min-h-[60px]"
        :class="[
          currentPoem?.id === poem.id 
            ? 'bg-primary text-white' 
            : 'bg-gray-50 hover:bg-gray-100'
        ]"
      >
        <div class="relative">
          <div class="font-bold pr-16">{{ poem.titleChars.join('') }}</div>
          <div v-if="poem.mastery === 2" class="mastery-stamp absolute top-0 right-0">已掌握</div>
        </div>
        <div class="text-sm opacity-80">{{ poem.dynastyChars.join('') }} · {{ poem.authorChars.join('') }}</div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  poems: any[]
  currentPoem: any
}>()

const emit = defineEmits<{
  'select': [poem: any]
}>()

const selectPoem = (poem: any) => {
  emit('select', poem)
}
</script>

<style scoped>
.mastery-stamp {
  background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: bold;
  transform: rotate(-5deg);
  white-space: nowrap;
  line-height: 1.2;
}
</style>
