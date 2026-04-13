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
      <!-- 古诗词背诵Tab -->
      <div v-if="activeTab === 0" class="h-full grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-[18px] w-full">
        <!-- 诗词列表 固定高度 独立滚动 -->
        <div class="h-full overflow-hidden">
          <div class="card h-full flex flex-col overflow-hidden p-0">
            <h2 class="text-xl font-bold mb-4 text-red-600 flex-shrink-0 px-6 pt-6">诗词列表</h2>
            <div class="space-y-2 overflow-y-auto flex-grow px-6 pb-6 pr-2">
              <button
                v-for="poem in poems"
                :key="poem.id"
                @click="selectPoem(poem)"
                class="w-full text-left p-3 rounded-lg transition-all"
                :class="{
                  'bg-primary text-white': currentPoem?.id === poem.id,
                  'hover:bg-gray-100': currentPoem?.id !== poem.id
                }"
              >
                <div class="font-bold">{{ poem.titleChars.join('') }}</div>
                <div class="text-sm opacity-80">{{ poem.dynastyChars.join('') }} · {{ poem.authorChars.join('') }}</div>
              </button>
            </div>
          </div>
        </div>

        <!-- 诗词详情 固定高度 独立滚动 -->
        <div class="h-full overflow-hidden" v-if="currentPoem">
          <div class="card h-full flex flex-col relative overflow-hidden p-0">
            <!-- 内容滚动区域 -->
            <div class="flex-grow overflow-y-auto pb-[80px]">
              <!-- 场景图片 -->
              <div class="w-full h-24 bg-gradient-to-r from-blue-100 to-purple-100 mb-6 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img 
                  :src="currentPoem.sceneImage" 
                  :alt="currentPoem.titleChars.join('')"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>

              <!-- 诗词内容 -->
              <div class="text-center">
                <!-- 标题 -->
                <div class="flex flex-wrap justify-center gap-x-4 mb-2">
                  <div 
                    v-for="(char, index) in currentPoem.titleChars" 
                    :key="index" 
                    class="text-center transition-all duration-200 relative"
                    :class="{
                      'scale-110': isCurrentChar(-1, index),
                      'text-orange-600': isCurrentChar(-1, index),
                    }"
                  >
                    <!-- 蹦蹦跳跳小狗 -->
                    <div 
                      v-if="isCurrentChar(-1, index) && isPlaying && !isPaused" 
                      class="absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce text-2xl z-10"
                    >
                      🐶
                    </div>
                    <p 
                      class="text-sm mb-1 transition-colors duration-200"
                      :class="isCurrentChar(-1, index) ? 'text-orange-600 font-bold' : 'text-gray-500'"
                    >
                      {{ currentPoem.titlePinyin[index] }}
                    </p>
                    <p class="text-xl font-bold transition-colors duration-200">
                      {{ char }}
                    </p>
                  </div>
                </div>
                <!-- 朝代作者 -->
                <div class="flex flex-wrap justify-center mb-6">
                  <div 
                    v-for="(char, index) in currentPoem.dynastyChars" 
                    :key="index" 
                    class="text-center transition-all duration-200 relative"
                    :class="{
                      'scale-110': isCurrentChar(-2, index),
                      'text-orange-600': isCurrentChar(-2, index),
                    }"
                  >
                    <!-- 蹦蹦跳跳小狗 -->
                    <div 
                      v-if="isCurrentChar(-2, index) && isPlaying && !isPaused" 
                      class="absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce text-2xl z-10"
                    >
                      🐶
                    </div>
                    <p 
                      class="text-sm mb-1 transition-colors duration-200"
                      :class="isCurrentChar(-2, index) ? 'text-orange-600 font-bold' : 'text-gray-500'"
                    >
                      {{ currentPoem.dynastyPinyin[index] }}
                    </p>
                    <p class="text-base transition-colors duration-200" :class="isCurrentChar(-2, index) ? 'text-orange-600 font-medium' : 'text-gray-600'">
                      {{ char }}
                    </p>
                  </div>
                  <!-- "代"字 -->
                  <div 
                    class="text-center transition-all relative"
                    :class="{
                      'scale-110': isCurrentChar(-2, currentPoem.dynastyChars.length),
                      'text-orange-600': isCurrentChar(-2, currentPoem.dynastyChars.length),
                    }"
                  >
                    <div 
                      v-if="isCurrentChar(-2, currentPoem.dynastyChars.length) && isPlaying && !isPaused" 
                      class="absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce text-2xl z-10"
                    >
                      🐶
                    </div>
                    <!-- <p class="text-sm mb-1 text-gray-500">dài</p>
                    <p class="text-base" :class="isCurrentChar(-2, currentPoem.dynastyChars.length) ? 'text-orange-600 font-medium' : 'text-gray-600'">代</p> -->
                  </div>
                  <span class="mx-2 text-gray-600">·</span>
                  <!-- 作者部分 -->
                  <div 
                    v-for="(char, index) in currentPoem.authorChars" 
                    :key="index" 
                    class="text-center transition-all duration-200 relative"
                    :class="{
                      'scale-110': isCurrentChar(-2, currentPoem.dynastyChars.length + 2 + index),
                      'text-orange-600': isCurrentChar(-2, currentPoem.dynastyChars.length + 2 + index),
                    }"
                  >
                    <!-- 蹦蹦跳跳小狗 -->
                    <div 
                      v-if="isCurrentChar(-2, currentPoem.dynastyChars.length + 2 + index) && isPlaying && !isPaused" 
                      class="absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce text-2xl z-10"
                    >
                      🐶
                    </div>
                    <p 
                      class="text-sm mb-1 transition-colors duration-200"
                      :class="isCurrentChar(-2, currentPoem.dynastyChars.length + 2 + index) ? 'text-orange-600 font-bold' : 'text-gray-500'"
                    >
                      {{ currentPoem.authorPinyin[index] }}
                    </p>
                    <p class="text-base transition-colors duration-200" :class="isCurrentChar(-2, currentPoem.dynastyChars.length + 2 + index) ? 'text-orange-600 font-medium' : 'text-gray-600'">
                      {{ char }}
                    </p>
                  </div>
                </div>
                <!-- 正文 -->
                <div class="space-y-6">
                  <div v-for="(line, lineIndex) in currentPoem.contentLines" :key="lineIndex" class="flex flex-wrap justify-center gap-x-6">
                    <div 
                      v-for="(char, charIndex) in line" 
                      :key="charIndex" 
                      class="text-center transition-all duration-200 relative"
                      :class="{
                        'scale-110': isCurrentChar(lineIndex, charIndex),
                        'text-orange-600': isCurrentChar(lineIndex, charIndex),
                      }"
                    >
                      <!-- 蹦蹦跳跳小狗 -->
                      <div 
                        v-if="isCurrentChar(lineIndex, charIndex) && isPlaying && !isPaused" 
                        class="absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce text-2xl z-10"
                      >
                        🐶
                      </div>
                      <p 
                        class="text-sm mb-1 transition-colors duration-200"
                        :class="isCurrentChar(lineIndex, charIndex) ? 'text-orange-600 font-bold' : 'text-gray-500'"
                      >
                        {{ currentPoem.pinyinLines[lineIndex][charIndex] }}
                      </p>
                      <p class="text-3xl font-medium transition-colors duration-200">
                        {{ char }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 操作按钮 固定悬浮在底部 -->
            <div class="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 border-t flex justify-center gap-4 shadow-lg">
              <button 
                class="btn-primary" 
                @click="togglePlay"
              >
                <span v-if="isPlaying && !isPaused">⏸️ 暂停</span>
                <span v-else-if="isPaused">▶️ 继续</span>
                <span v-else>🔊 播放朗诵</span>
              </button>
              <button class="btn-secondary">
                ✅ 我会背了
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 汉字听写练习Tab -->
      <div v-if="activeTab === 1">
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
      </div>

      <!-- 阅读理解Tab -->
      <div v-if="activeTab === 2">
        <div class="card">
          <h2 class="text-xl font-bold mb-4 text-red-600">阅读理解</h2>
          <div class="space-y-3">
            <div v-for="article in articles" :key="article.id" class="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
              <h3 class="font-bold">{{ article.title }}</h3>
              <p class="text-sm text-gray-600">适合年级：{{ article.grade }}年级</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '@/components/common/Breadcrumb.vue'

// 面包屑配置
const breadcrumbItems = [
  { name: '语文学习' }
]

// Tab配置
const tabs = ['古诗词背诵', '汉字听写', '阅读理解']
const activeTab = ref(0)

// 当前选中的诗词
const currentPoem = ref<any>(null)
// 播放状态
const isPlaying = ref(false)
const isPaused = ref(false)
// 当前播放位置，用于文字高亮
const currentLine = ref(-1)
const currentChar = ref(-1)
// 字符位置映射，记录每个字符对应的行号和列号
const charPositionMap = ref<{line: number, char: number}[]>([])
// 高亮定时器ID，用于停止时清除
const highlightTimeoutId = ref<NodeJS.Timeout | null>(null)
// 当前高亮进度，暂停时保持状态
const currentHighlightIndex = ref(0)
// 高亮时长配置，统一固定时长，所有字符步调一致
const charDuration = ref(400) // 每个字符停留440ms，比之前放慢20ms，匹配语音节奏

const poems = [
  {
    id: 1,
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
]

const articles = [
  { id: 1, title: '小猫钓鱼', grade: 1 },
  { id: 2, title: '三只小猪', grade: 2 },
  { id: 3, title: '司马光砸缸', grade: 3 }
]

const currentWord = '明'

// 选择诗词
const selectPoem = (poem: any) => {
  // 切换诗词时停止当前播放，重置所有状态
  stopPlay()
  currentPoem.value = poem
}

// 图片加载失败处理
const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNjZmRmZmY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZTBmOWZmO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7or7fmnKzkuozmmI88L3RleHQ+PC9zdmc+'
}

// 切换播放/暂停
const togglePlay = () => {
  if (!isPlaying.value) {
    startPlay()
  } else if (isPaused.value) {
    resumePlay()
  } else {
    pausePlay()
  }
}

// 停止播放
const stopPlay = () => {
  speechSynthesis.cancel()
  isPlaying.value = false
  isPaused.value = false
  currentLine.value = -1
  currentChar.value = -1
  // 清除高亮定时器
  if (highlightTimeoutId.value) {
    clearTimeout(highlightTimeoutId.value)
    highlightTimeoutId.value = null
  }
}

// 暂停播放
const pausePlay = () => {
  speechSynthesis.pause()
  isPaused.value = true
  // 暂停时清除当前定时器，保持当前高亮位置
  if (highlightTimeoutId.value) {
    clearTimeout(highlightTimeoutId.value)
    highlightTimeoutId.value = null
  }
}

// 继续播放
const resumePlay = () => {
  speechSynthesis.resume()
  isPaused.value = false
  // 继续播放时重新启动高亮定时器，从当前位置继续
  highlightNextChar()
}

// 开始播放
const startPlay = async () => {
  if (!currentPoem.value) return
  
  stopPlay()
  isPlaying.value = true
  
  // 预先生成字符位置映射表
  buildCharPositionMap()
  
  try {
    // 如果有预存的豆包语音文件，优先播放
    if (currentPoem.value.audioUrl) {
      const audio = new Audio(currentPoem.value.audioUrl)
      await audio.play()
      audio.onended = () => {
        stopPlay()
      }
      audio.onerror = () => {
        // 音频播放失败，降级使用浏览器语音合成
        playWithNaturalSpeech()
      }
    } else {
      // 无预存音频，使用优化的自然语音合成
      playWithNaturalSpeech()
    }
  } catch (e) {
    console.error('播放失败', e)
    stopPlay()
  }
}

// 构建字符位置映射表，用于同步高亮
const buildCharPositionMap = () => {
  charPositionMap.value = []
  // 标题部分
  currentPoem.value.titleChars.forEach((_: any, index: number) => {
    charPositionMap.value.push({ line: -1, char: index })
  })
  // 朝代 + 作者
  ;[...currentPoem.value.dynastyChars, ...[,], ...currentPoem.value.authorChars].forEach((_: any, index: number) => {
    charPositionMap.value.push({ line: -2, char: index })
  })
  // 正文部分
  currentPoem.value.contentLines.forEach((line: string[], lineIndex: number) => {
    line.forEach((_: string, charIndex: number) => {
      charPositionMap.value.push({ line: lineIndex, char: charIndex })
    })
  })
}

// 自然语音合成实现（优化圆润度，减少机械感）
const playWithNaturalSpeech = () => {
  if (!('speechSynthesis' in window)) {
    alert('当前浏览器不支持语音播放功能，请使用Chrome/Edge浏览器')
    stopPlay()
    return
  }

  // 拼接完整朗诵文本
  const fullText = [
    currentPoem.value.titleChars.join('') + '。',
    currentPoem.value.dynastyChars.join('') + '',
    currentPoem.value.authorChars.join('') + '。',
    ...currentPoem.value.contentLines.map(line => line.join('') + '。')
  ].join('')
  
  const utterance = new SpeechSynthesisUtterance(fullText)
  utterance.lang = 'zh-CN'
  utterance.volume = 1.2
  utterance.rate = 0.60 // 小学教师带读语速，每个字发音清晰，适合儿童跟读
  utterance.pitch = 1.1 // 音调更柔和，贴近真实教师发音

  // 优先选择自然度最高的中文女声（微软晓晓、阿里云小爱效果最优）
  const voices = speechSynthesis.getVoices()
  const preferredVoices = [
    'Microsoft Yaoyao - Chinese (Simplified, PRC)',
    'Microsoft Xiaoxiao Online (Natural) - Chinese (Simplified, PRC)',
    'Microsoft Huihui Desktop',
    'alice',
    'tingting'
  ]
  
  let selectedVoice = null
  for (const voiceName of preferredVoices) {
    selectedVoice = voices.find(v => v.name.includes(voiceName))
    if (selectedVoice) break
  }
  
  // 没找到优选语音， fallback到任意中文女声
  if (!selectedVoice) {
    selectedVoice = voices.find(voice => 
      voice.lang.includes('zh') && 
      (voice.name.includes('female') || voice.name.includes('女'))
    )
  }
  
  if (selectedVoice) {
    utterance.voice = selectedVoice
  }

  // 如果是暂停状态继续播放，从当前位置继续；否则从头开始
  if (!isPaused.value) {
    currentHighlightIndex.value = 0
  }
  highlightNextChar()

  utterance.onend = () => {
    stopPlay()
  }
  
  utterance.onerror = (e) => {
    console.error('语音合成错误', e)
    stopPlay()
  }

  speechSynthesis.speak(utterance)
}

// 判断是否是当前播放的字符
const isCurrentChar = (lineIndex: number, charIndex: number) => {
  return currentLine.value === lineIndex && currentChar.value === charIndex
}

// 逐字高亮函数，全局可调用
const highlightNextChar = () => {
  if (!isPlaying.value || isPaused.value || currentHighlightIndex.value >= charPositionMap.value.length || !currentPoem.value) {
    return
  }
  
  const pos = charPositionMap.value[currentHighlightIndex.value]
  currentLine.value = pos.line
  currentChar.value = pos.char
  
  currentHighlightIndex.value++
  highlightTimeoutId.value = setTimeout(highlightNextChar, charDuration.value)
}

// 加载语音列表
if ('speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = () => {
    // 语音列表加载完成，自动优选最佳女声
  }
}

// 默认选中第一首诗
if (poems.length > 0) {
  currentPoem.value = poems[0]
}
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
