As you can see, this is a blog, a new blog, my most satisfying one so far. If you want to see the immediate effect, please click this link
https://wwwtarea.vercel.app/

## 内容维护

- 保留原首页、STU 顶部导航和 BLOG 侧栏布局。统一配色位于 `src/constants/colors.js`。
- 项目、笔记和资料维护在 `src/data/technical-library.js`，支持标题、正文与标签搜索、标签筛选和卡片展开阅读。修改数据文件并重新构建部署即可更新内容；当前没有在线后台或云端数据库。
- 原 STU 的学习感想保存在 `src/data/study-thoughts.js`，显示于 BLOG 首页。原个人文章、照片和音乐继续保留。
- 背词功能与静态百分比进度条已移除。
- 使用 `npm run dev` 本地预览；使用 `npm run build` 和 `npm run lint` 检查。
