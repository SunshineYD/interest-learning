<template>
  <div class="container mx-auto px-4 py-8">
    <header class="text-center mb-12">
      <h1 class="text-[clamp(2rem,5vw,3rem)] font-bold text-primary mb-2">
        小朋友学习乐园
      </h1>
      <p class="text-gray-600 text-lg">快乐学习，天天向上！</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div 
        class="card cursor-pointer"
        @click="$router.push('/chinese')"
      >
        <div class="text-center">
          <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-4xl">📚</span>
          </div>
          <h2 class="text-2xl font-bold text-red-600 mb-2">语文</h2>
          <p class="text-gray-600">汉字听写 · 古诗词 · 阅读理解</p>
        </div>
      </div>

      <div 
        class="card cursor-pointer"
        @click="$router.push('/math')"
      >
        <div class="text-center">
          <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-4xl">🔢</span>
          </div>
          <h2 class="text-2xl font-bold text-blue-600 mb-2">数学</h2>
          <p class="text-gray-600">口算练习 · 应用题 · 公式学习</p>
        </div>
      </div>

      <div 
        class="card cursor-pointer"
        @click="$router.push('/english')"
      >
        <div class="text-center">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-4xl">🔤</span>
          </div>
          <h2 class="text-2xl font-bold text-green-600 mb-2">英语</h2>
          <p class="text-gray-600">单词记忆 · 听力训练 · 口语跟读</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div 
        class="card cursor-pointer"
        @click="$router.push('/checkin')"
      >
        <div class="text-center">
          <div class="text-3xl mb-2">✅</div>
          <h3 class="font-bold text-lg mb-1">每日打卡</h3>
          <p class="text-sm text-gray-500">获取积分和勋章</p>
        </div>
      </div>

      <div 
        class="card cursor-pointer"
        @click="$router.push('/record')"
      >
        <div class="text-center">
          <div class="text-3xl mb-2">📝</div>
          <h3 class="font-bold text-lg mb-1">学习记录</h3>
          <p class="text-sm text-gray-500">查看历史学习情况</p>
        </div>
      </div>

      <div 
        class="card cursor-pointer"
        @click="$router.push('/statistics')"
      >
        <div class="text-center">
          <div class="text-3xl mb-2">📊</div>
          <h3 class="font-bold text-lg mb-1">学习统计</h3>
          <p class="text-sm text-gray-500">近一周/一月数据分析</p>
        </div>
      </div>

      <div 
        class="card cursor-pointer"
        @click="$router.push('/knowledge')"
      >
        <div class="text-center">
          <div class="text-3xl mb-2">🌳</div>
          <h3 class="font-bold text-lg mb-1">知识图谱</h3>
          <p class="text-sm text-gray-500">查看知识点掌握情况</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
