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
const poems = ref([
  {
    id: 1,
    mastery: 0,
    titleChars: ['静', '夜', '思'],
    titlePinyin: ['jìng', 'yè', 'sī'],
    dynastyChars: ['唐'],
    dynastyPinyin: ['táng'],
    authorChars: ['李', '白'],
    authorPinyin: ['lǐ', 'bái'],
    sceneImage: 'https://picsum.photos/seed/jingyesi/800/400',
    contentLines: [
      ['床', '前', '明', '月', '光', '，'],
      ['疑', '是', '地', '上', '霜', '。'],
      ['举', '头', '望', '明', '月', '，'],
      ['低', '头', '思', '故', '乡', '。']
    ],
    pinyinLines: [
      ['chuáng', 'qián', 'míng', 'yuè', 'guāng', ''],
      ['yí', 'shì', 'dì', 'shàng', 'shuāng', ''],
      ['jǔ', 'tóu', 'wàng', 'míng', 'yuè', ''],
      ['dī', 'tóu', 'sī', 'gù', 'xiāng', '']
    ]
  },
  {
    id: 2,
    mastery: 0,
    titleChars: ['古', '朗', '月', '行', '（', '节', '选', '）'],
    titlePinyin: ['gǔ', 'lǎng', 'yuè', 'xíng', '', 'jié', 'xuǎn', ''],
    dynastyChars: ['唐'],
    dynastyPinyin: ['táng'],
    authorChars: ['李', '白'],
    authorPinyin: ['lǐ', 'bái'],
    sceneImage: 'https://picsum.photos/seed/gulangyuexing/800/400',
    contentLines: [
      ['小', '时', '不', '识', '月', '，'],
      ['呼', '作', '白', '玉', '盘', '。'],
      ['又', '疑', '瑶', '台', '镜', '，'],
      ['飞', '在', '青', '云', '端', '。']
    ],
    pinyinLines: [
      ['xiǎo', 'shí', 'bù', 'shí', 'yuè', ''],
      ['hū', 'zuò', 'bái', 'yù', 'pán', ''],
      ['yòu', 'yí', 'yáo', 'tái', 'jìng', ''],
      ['fēi', 'zài', 'qīng', 'yún', 'duān', '']
    ]
  }
])

const articles = [
  { id: 1, title: '小猫钓鱼', grade: 1 },
  { id: 2, title: '三只小猪', grade: 2 },
  { id: 3, title: '司马光砸缸', grade: 3 }
]

const currentWord = '明'

// 组件props配置
const tabProps = [
  { poems: poems.value },
  { currentWord },
  { articles }
]

// 组件事件配置
const tabEvents = [
  {
    'update:poems': (newPoems: any[]) => {
      poems.value = newPoems
    }
  },
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
