// 在相应数组中新增记录即可更新资料库。body 为纯文本段落，code 可选。
export const technicalLibrary = {
  projects: [
    {
      id: 'personal-blog', title: '这个博客：个人空间的持续迭代',
      summary: '保留自己的表达方式，在原有布局里完善技术内容与交互。',
      tags: ['React', 'CSS', 'Motion'], type: '站点项目',
      body: [
        '首页保留 Lovin Myself、漂浮线条和 STU / BLOG 两个入口。STU 沿用顶部导航和纵向卡片；BLOG 沿用侧栏与内容区。',
        '技术内容从页面中拆分为独立数据，按项目、笔记和资料分类。检索与标签筛选在本地完成，个人感想迁入 BLOG。',
        '冷白、墨黑、电光蓝统一界面配色。页面过渡、按钮反馈与背景线条在原有基础上调整，并尊重系统的减少动态效果设置。'
      ]
    }
  ],
  notes: [
    {
      id: 'content-structure', title: '开发记录 / 把技术内容和页面拆开',
      summary: '用结构化数据维护项目、笔记和资料，减少内容更新时对页面的改动。',
      tags: ['React', '数据组织'], type: '本站实现记录',
      body: [
        '每条内容包含 id、title、summary 和 tags。项目与笔记使用 body 保存纯文本段落，资料用 url 指向来源。页面按分类读取数组，以相同的卡片样式展示。',
        '检索匹配标题、摘要、标签和正文；标签选项从当前分类的数据生成。选中标签后再输入关键词，两种条件共同生效。',
        '内容保存在 src/data/technical-library.js。当前是静态资料库，修改文件并重新部署后发布更新，不涉及账户或云端保存。'
      ],
      code: "{\n  id: 'unique-id',\n  title: '笔记标题',\n  summary: '一句话摘要',\n  tags: ['React'],\n  body: ['第一段正文', '第二段正文']\n}"
    },
    {
      id: 'motion-boundaries', title: '开发记录 / 动效也要有边界',
      summary: '保留首页的线条氛围，让页面切换和悬停反馈更轻、更稳定。',
      tags: ['Motion', 'CSS', '可访问性'], type: '本站实现记录',
      body: [
        '页面过渡只做短距离位移和透明度变化，避免整页持续缩放和模糊。内容卡片保留轻微悬停反馈，不改变卡片的位置关系。',
        '首页线条在组件首次创建时生成，避免音乐状态变化导致背景重新随机排布。指针带来的微小偏移仅作用于背景层。',
        '系统启用减少动态效果时，背景动画与位移停止；文字和按钮仍然可见、可操作。键盘焦点使用清晰的蓝色轮廓。'
      ]
    }
  ],
  resources: [
    { id: 'react', title: 'React 官方文档', summary: '组件、状态与交互的学习入口。', tags: ['React'], type: '官方文档', url: 'https://react.dev/learn' },
    { id: 'mdn', title: 'MDN Web Docs', summary: 'HTML、CSS、JavaScript 与浏览器 API 参考。', tags: ['CSS', 'JavaScript'], type: '官方文档', url: 'https://developer.mozilla.org/zh-CN/' },
    { id: 'motion', title: 'Motion 文档', summary: 'React 动画、过渡与交互手势。', tags: ['Motion'], type: '官方文档', url: 'https://motion.dev/docs/react' }
  ]
};
