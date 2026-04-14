<template>
  <div class="h-full grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-[18px] w-full">
    <!-- 诗词列表 -->
    <div class="h-full overflow-hidden">
      <PoemList 
        :poems="poems" 
        :current-poem="currentPoem" 
        @select="selectPoem"
      />
    </div>

    <!-- 诗词详情 -->
    <div class="h-full overflow-hidden" v-if="currentPoem">
      <PoemDetail 
        :poem="currentPoem" 
        @toggle-mastery="toggleMastery"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PoemList from './PoemList.vue'
import PoemDetail from './PoemDetail.vue'

// 古诗文模拟数据（后期替换为接口请求）
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

// 当前选中的诗词
const currentPoem = ref<any>(poems.value[0] || null)

// 选择诗词
const selectPoem = (poem: any) => {
  currentPoem.value = poem
}

// 切换掌握状态
const toggleMastery = () => {
  if (!currentPoem.value) return
  currentPoem.value.mastery = currentPoem.value.mastery === 2 ? 0 : 2
}
</script>
