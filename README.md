# 6-12岁儿童学习平台

面向6-12岁学龄儿童的在线学习平台，覆盖语文、数学、英语核心科目学习。

## 技术栈

- **前端**: Vue3 + TypeScript + Vite
- **状态管理**: Pinia + Vue Query
- **样式**: Tailwind CSS
- **路由**: Vue Router

## 功能模块

✅ 已实现：
- 首页导航界面
- 语文学习模块（古诗词带拼音、汉字听写、阅读理解）
- 完整的项目基础架构

🚧 待开发：
- 数学学习模块
- 英语学习模块
- 学习记录系统
- 打卡系统
- 统计分析功能
- 知识点掌握图谱

## 安装运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
src/
├── views/              # 页面组件
│   ├── Home.vue        # 首页
│   ├── subjects/       # 科目页面
│   │   ├── Chinese.vue # 语文学习页
│   │   ├── Math.vue    # 数学学习页
│   │   └── English.vue # 英语学习页
│   ├── Record.vue      # 学习记录页
│   ├── Checkin.vue     # 打卡页
│   ├── Statistics.vue  # 统计页
│   └── Knowledge.vue   # 知识图谱页
├── router/             # 路由配置
├── stores/             # Pinia状态管理
├── components/         # 公共组件
├── utils/              # 工具函数
├── App.vue             # 根组件
├── main.ts             # 入口文件
└── style.css           # 全局样式
```
