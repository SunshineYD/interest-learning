<template>
  <div class="h-screen flex flex-col overflow-hidden bg-bg-default">
    <div class="w-full flex-shrink-0">
      <!-- 面包屑导航 -->
      <Breadcrumb :items="breadcrumbItems" />

      <!-- Tab导航 -->
      <div class="flex border-b border-gray-200">
        <button 
          v-for="(tab, index) in tabs" 
          :key="index"
          @click="activeTab = index"
          class="px-6 py-3 font-bold text-lg transition-all"
          :class="{
            'text-primary border-b-2 border-primary': activeTab === index,
            'text-gray-500 hover:text-gray-700': activeTab !== index
          }"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- Tab内容 可滚动区域 占据全部剩余高度 -->
    <div class="tab-content flex-grow h-0 min-h-0 overflow-hidden">
      <component 
        :is="tabComponents[activeTab]" 
        v-bind="tabProps[activeTab]"
        v-on="tabEvents[activeTab]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import Breadcrumb from '@/components/common/Breadcrumb.vue'
import PoemRecitation from './components/PoemRecitation.vue'
import CharacterDictation from './components/CharacterDictation.vue'
import ReadingComprehension from './components/ReadingComprehension.vue'

// 面包屑配置
const breadcrumbItems = [
  { name: '语文学习' }
]

// Tab配置
const tabs = ['古诗词背诵', '汉字听写', '阅读理解']
const activeTab = ref(0)

// 动态组件配置
const tabComponents = [
  markRaw(PoemRecitation),
  markRaw(CharacterDictation),
  markRaw(ReadingComprehension)
]

// 模拟数据
const articles = [
  { id: 1, title: '小猫钓鱼', grade: 1 },
  { id: 2, title: '三只小猪', grade: 2 },
  { id: 3, title: '司马光砸缸', grade: 3 }
]

const currentWord = '明'

// 组件props配置
const tabProps = [
  {},
  { currentWord },
  { articles }
]

// 组件事件配置
const tabEvents = [
  {},
  {},
  {}
]
</script>

<style scoped>
.bg-bg-default {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 18px;
  box-sizing: border-box;
}
</style>
