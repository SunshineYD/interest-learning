<template>
  <div class="card h-full flex flex-col relative overflow-hidden p-0">
    <!-- 内容滚动区域 -->
    <div class="flex-grow overflow-y-auto pb-[80px]">
      <!-- 场景图片 -->
      <div class="w-full h-24 bg-gradient-to-r from-blue-100 to-purple-100 mb-6 flex items-center justify-center overflow-hidden flex-shrink-0">
        <img 
          :src="poem.sceneImage" 
          :alt="poem.titleChars.join('')"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
      </div>

      <!-- 诗词内容 -->
      <div class="text-center">
        <!-- 标题区域 -->
        <div class="relative inline-flex items-start">
          <!-- 标题 -->
          <div class="flex justify-center gap-x-4 mb-2 whitespace-nowrap">
            <div 
              v-for="(char, index) in poem.titleChars" 
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
                {{ poem.titlePinyin[index] }}
              </p>
              <p class="text-xl font-bold transition-colors duration-200">
                {{ char }}
              </p>
            </div>
          </div>
          <!-- 标题右上方的透明盖章 -->
          <div v-if="poem?.mastery === 2" class="mastery-stamp-transparent absolute top-2 right-[-25px] z-10">已掌握</div>
        </div>
        <!-- 朝代作者 -->
        <div class="flex flex-wrap justify-center mb-6">
          <div 
            v-for="(char, index) in poem.dynastyChars" 
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
              {{ poem.dynastyPinyin[index] }}
            </p>
            <p class="text-base transition-colors duration-200" :class="isCurrentChar(-2, index) ? 'text-orange-600 font-medium' : 'text-gray-600'">
              {{ char }}
            </p>
          </div>
          <!-- "代"字 -->
          <div 
            class="text-center transition-all relative"
            :class="{
              'scale-110': isCurrentChar(-2, poem.dynastyChars.length),
              'text-orange-600': isCurrentChar(-2, poem.dynastyChars.length),
            }"
          >
            <div 
              v-if="isCurrentChar(-2, poem.dynastyChars.length) && isPlaying && !isPaused" 
              class="absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce text-2xl z-10"
            >
              🐶
            </div>
            <!-- <p class="text-sm mb-1 text-gray-500">dài</p>
            <p class="text-base" :class="isCurrentChar(-2, poem.dynastyChars.length) ? 'text-orange-600 font-medium' : 'text-gray-600'">代</p> -->
          </div>
          <span class="mx-2 text-gray-600">·</span>
          <!-- 作者部分 -->
          <div 
            v-for="(char, index) in poem.authorChars" 
            :key="index" 
            class="text-center transition-all duration-200 relative"
            :class="{
              'scale-110': isCurrentChar(-2, poem.dynastyChars.length + 2 + index),
              'text-orange-600': isCurrentChar(-2, poem.dynastyChars.length + 2 + index),
            }"
          >
            <!-- 蹦蹦跳跳小狗 -->
            <div 
              v-if="isCurrentChar(-2, poem.dynastyChars.length + 2 + index) && isPlaying && !isPaused" 
              class="absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce text-2xl z-10"
            >
              🐶
            </div>
            <p 
              class="text-sm mb-1 transition-colors duration-200"
              :class="isCurrentChar(-2, poem.dynastyChars.length + 2 + index) ? 'text-orange-600 font-bold' : 'text-gray-500'"
            >
              {{ poem.authorPinyin[index] }}
            </p>
            <p class="text-base transition-colors duration-200" :class="isCurrentChar(-2, poem.dynastyChars.length + 2 + index) ? 'text-orange-600 font-medium' : 'text-gray-600'">
              {{ char }}
            </p>
          </div>
        </div>
        <!-- 正文 -->
        <div class="space-y-6">
          <div v-for="(line, lineIndex) in poem.contentLines" :key="lineIndex" class="flex flex-wrap justify-center gap-x-6">
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
                {{ poem.pinyinLines[lineIndex][charIndex] }}
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
      <button class="btn-secondary" @click="toggleMastery">
        <span v-if="poem?.mastery === 2">❌ 取消掌握</span>
        <span v-else>✅ 我会背了</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  poem: any
}>()

const emit = defineEmits<{
  'toggle-mastery': []
  'stop': []
}>()

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

// 监听诗词变化，自动停止播放
watch(() => props.poem, () => {
  stopPlay()
})

// 切换掌握状态
const toggleMastery = () => {
  emit('toggle-mastery')
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
  if (!props.poem) return
  
  stopPlay()
  isPlaying.value = true
  
  // 预先生成字符位置映射表
  buildCharPositionMap()
  
  try {
    // 如果有预存的豆包语音文件，优先播放
    if (props.poem.audioUrl) {
      const audio = new Audio(props.poem.audioUrl)
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
  props.poem.titleChars.forEach((_: any, index: number) => {
    charPositionMap.value.push({ line: -1, char: index })
  })
  // 朝代 + 作者
  ;[...props.poem.dynastyChars, ...['代', '，'], ...props.poem.authorChars].forEach((_: any, index: number) => {
    charPositionMap.value.push({ line: -2, char: index })
  })
  // 正文部分
  props.poem.contentLines.forEach((line: string[], lineIndex: number) => {
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
    props.poem.titleChars.join('') + '。',
    props.poem.dynastyChars.join('') + '',
    props.poem.authorChars.join('') + '。',
    ...props.poem.contentLines.map(line => line.join('') + '。')
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
  if (!isPlaying.value || isPaused.value || currentHighlightIndex.value >= charPositionMap.value.length || !props.poem) {
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
</script>

<style scoped>
.mastery-stamp-transparent {
  background: linear-gradient(135deg, rgba(229, 62, 62, 0.15), rgba(229, 62, 62, 0.08));
  color: rgba(229, 62, 62, 0.7);
  border: 2px solid rgba(229, 62, 62, 0.25);
  padding: 3px 10px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 600;
  transform: rotate(20deg);
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.3);
}
</style>
