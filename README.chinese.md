# The Quiet Atlas · 视觉旅行手记

<div align="center">

[![English](https://img.shields.io/badge/English-Readme-3d7ae4?style=for-the-badge)](README.md)

</div>



一个静态的个人旅行展示网站（站点名 **The Quiet Atlas**）：多页面、电影级视觉、沉浸式开场 logo 动画与摄影作品集式排版。
纯 HTML5 + CSS3 + 原生 JavaScript，无框架、无构建步骤、无后端，可直接部署到任意静态托管。

---

> 站内的旅行故事、观察与统计数字是便于替换的演示文本：直接改写各页 HTML 中对应段落即可（长文见 `destinations/*.html` 的 `.story` 与 `places.html` 的 `.place-story`）。

## 1. 本地运行

直接双击 `index.html` 即可预览（部分浏览器的图片懒加载/字体在 `file://` 下表现略有差异）。推荐用任意静态服务器：

```bash
# Python（自带）
cd seth-travels
python -m http.server 8788
# 然后打开 http://localhost:8788/

# 或者 Node.js
npx serve .
```

## 2. 目录结构

```
seth-travels/
├── index.html            首页：开场 → 主视觉 → 宣言 → 精选目的地 → 专题 → 日志 → 照片条
├── destinations.html     目的地总览（9 个目的地）
├── destinations/         目的地详情页（每个目的地一页）
│   ├── kyoto.html        京都
│   ├── iceland.html      冰岛
│   ├── alps.html         瑞士阿尔卑斯
│   ├── amalfi.html       阿马尔菲海岸
│   ├── paris.html        巴黎
│   ├── nyc.html          纽约
│   ├── tokyo.html        东京
│   ├── venice.html       威尼斯
│   └── santorini.html    圣托里尼
├── places.html           著名景点与地点（12 处，带锚点，可从目的地页直达）
├── journal.html          旅行日志（3 篇，三种不同版式）
├── gallery.html          摄影画廊（25 张，灯箱查看）
├── about.html            个人介绍、旅行理念、偏好与联系方式
├── interests.html        旅行偏好集（About 页 10 个兴趣按钮的图文子页）
├── 404.html              404 错误页（复用导航/页脚，含返回首页入口）
├── assets/
│   ├── css/main.css      设计系统：变量、排版、动效、响应式
│   ├── css/fonts.css     自托管字体（Cormorant Garamond + Inter）
│   ├── fonts/            woff2 字体文件
│   ├── js/main.js        开场动画、导航、滚动显现、视差、页面转场、动态年份
│   └── js/gallery.js     画廊灯箱（键盘 / 触摸 / 焦点管理）
├── robots.txt            搜索引擎抓取规则
├── sitemap.xml           站点地图（16 个页面）
└── README.md
```

## 3. 部署到静态托管

- **GitHub Pages**：把 `seth-travels/` 内的全部文件推到仓库根目录（或 `/docs`），在 Settings → Pages 选择分支与目录即可。站点使用相对路径，放在子目录下也能正常工作。
- **Cloudflare Pages / Netlify / Vercel**：构建命令留空，发布目录填 `seth-travels`（或仓库根目录）。
- 无需环境变量、无需 Node 版本要求、无需服务端渲染。

## 4. 如何改成你自己的内容

| 要改什么 | 改哪里 |
| --- | --- |
| 站点名称（浏览器标题） | 每个 HTML 的 `<title>`，形如 `PAGE — 栏目 | The Quiet Atlas` |
| 站点名称（开场文字标） | 开场动画里 Logo 下方淡入的 `The Quiet Atlas` 字样，位于每页 `<p class="intro-brand">`（15 个有开场层的页面，`interests.html` 无开场） |
| 站点名称（导航栏文字标） | 导航栏 Logo 图标右侧的 `The Quiet Atlas` 字样，位于每页 `.nav-logo` 内的 `<span class="logo-word">` |
| 个人名字（About 页与首页正文） | `about.html` 的 `<em>Seth</em>`、`index.html` 的 `— Seth` 署名与 `About Seth` 按钮 |
| 图形 Logo（Horizon 罗盘徽标） | 内联 SVG（每页三处：`.intro` 开场、`.nav-logo`、`.footer-logo`），统一类名 `.logo-horizon`，9 个 `.stage` 分组由外向内描线。SVG 源定义在 `assets/css/main.css` 的 `logo-horizon` 区段（描线动画、时序 `--at`、缓动均可在此调整）；`<link rel="icon">` 指向 `assets/img/favicon.png` 与 `assets/img/favicon.ico`。换图形时替换各页 `<svg class="logo-horizon">…</svg>` 与两个 favicon 即可 |
| 联系邮箱 | 搜 `onion@humorseth.com`：出现在页脚居中的 `CONTACT` 按钮（`.footer-contact`，`class="btn"`）与移动菜单的 `CONTACT · 联系我`，两处都是标准 `mailto:`（页脚按钮预填主题 `Hello Seth`） |
| 版权年份 | 无需修改：页脚 `<span data-year>` 由 `main.js` 用 `new Date()` 自动写入当年（2026 → 2027 自动跟随） |
| 长文旅行经历 | `destinations/*.html` 中 `<div class="story">` 内 5 段正文；`places.html` 中每行的 `<p class="place-story">`；每个详情页的 `.story` 里还各有一张 `<figure class="story-figure">` 插图（居中间距由 `.story-figure` 控制） |
| 主题色 / 字体 / 间距 | `assets/css/main.css` 顶部 `:root` 自定义属性（`--ink`、`--paper`、`--accent`、`--serif`、`--sans`、`--mono`、`--ease-*` 等） |
| 动画时长与缓动 | 同上，`:root` 中的 `--ease-*` 变量统一控制；描线动画的时序在各页 `.stage` 的 `--at` 与 `--line-duration` 中（见 `main.css` `logo-horizon` 区段） |
| 图片 | 全部已本地化在 `assets/img/`（51 张 `.jpg` + 1 张 `.png`，直接相对路径引用，无远程图片依赖）。替换时用同名文件覆盖即可；`.frame`、`.g-item`、`.place-media` 会自动处理裁切 |
| 目的地 / 景点 / 日志内容 | 直接编辑对应的 HTML 文本段落，结构与类名保持不变即可继承全部样式 |
| 个人介绍与统计数字 | `about.html`（`.stat-num b[data-count]` 的数字会被计数动画读取） |

## 5. 设计与技术说明

- **开场 logo 动画**（约 10s，纯 CSS + 少量 JS，无依赖）：深蓝黑背景上，Horizon 罗盘由外向内逐笔描线（9 个 `.stage`，`stroke-dashoffset` 描线 + 暖色 `trace-head` 笔头 + 星芯/北极星/引导线点缀）；全部线条绘毕（由 `animationend` 事件驱动，非固定延时）后，站点名称 `The Quiet Atlas` 淡入，两者短暂停留，再整幕淡出揭场进入主页。每个浏览器会话只播放一次（`sessionStorage`），可点击跳过；系统设置「减少动态效果」时自动跳过。调试时可用 `index.html?intro=1` 强制重播（`?introtest=1` 放慢便于观察）。
- **页脚**（三行全居中）：图形 logo + 站点名 → 标语 → 六个栏目横向居中 → 细分隔线 → 居中 `CONTACT` 按钮（`mailto:`）→ 居中版权行（年份由脚本写入）；`TOP ↑` 单独置于右下角。移动端自动改为居中流式排布。
- **页面转场**：多页面结构 + 轻量离场过渡，浏览器前进/后退、直接打开任意 URL、刷新均正常（`pageshow` 会清理转场状态，兼容 bfcache）。
- **动效性能**：只动画 `transform` 与 `opacity`；滚动显现用 `IntersectionObserver`；视差用 `requestAnimationFrame` 节流。
- **无障碍**：语义化标签、跳转到主内容链接、图片 `alt`、可见焦点样式、`aria-current` 标记当前页、灯箱支持 `Esc`/`←`/`→`/`Tab` 焦点循环，并尊重 `prefers-reduced-motion`。
- **图片策略**：首屏使用 CSS 背景图；其余图片固定宽高比（`width`/`height` 属性 + `aspect-ratio`）以避免布局跳动，`loading="lazy"` + `decoding="async"`，加载失败时优雅降级为色调占位。全部图片本地化，不依赖任何外部图片服务。
- **字体**：Cormorant Garamond + Inter 已自托管在 `assets/css/fonts.css`（`assets/fonts/*.woff2`，Google Fonts latin 子集），零外部字体依赖，加载失败自动回退到系统衬线/无衬线字体栈。
- **图片版权**：演示图片共 51 张（`assets/img/`，不依赖远程图床）。其中约 35 张来自 [Unsplash](https://unsplash.com)（Unsplash License：可免费用于商业与非商业用途，无需署名，但不可转售原图），已本地化保存；16 张来自 [Wikimedia Commons](https://commons.wikimedia.org)（自由授权，见下方署名清单）。用于正式发布时，请替换为你自己拍摄或已获授权的照片。
- **图形标记**：logo 为内联 SVG 的 Horizon 罗盘（罗盘环、星芒、柱门、地平线、轨道与行星、山峦、河流等元素，带描线动画）。导航栏小图标（`class="logo-replay"`）自动循环描线，向下滚动时淡出隐藏、回到顶部再显示，图标右侧带站点名 `The Quiet Atlas`（`<span class="logo-word">`）；页脚小图标为同一 SVG，鼠标悬停时描线一次、播完即停；开场为同一 SVG 的自动播放版本（`class="playing"`）。如需更换图形，替换各页内联 SVG 与 `assets/img/favicon.png` 即可。
- **本地图片**（`assets/img/`，均来自 [Wikimedia Commons](https://commons.wikimedia.org)，自由授权；发布前请按原文件页核对署名要求）：
  - `amalfi-coast.jpg`（阿马尔菲海岸）、`santorini.jpg`（圣托里尼伊亚）、`louvre.jpg`（卢浮宫金字塔夜景）
  - `kyoto-path.jpg`（哲学之道旁运河里的绿头鸭，作者 KimonBerlin，CC BY-SA 2.0）
  - `amalfi-lemon.jpg`（阿马尔菲山坡的柠檬园藤架，作者 Jensens，Public domain）
  - `amalfi-town.jpg`（从海上看阿马尔菲镇与圣安德烈亚大教堂，作者 Bernard Gagnon，CC BY 4.0）
  - `paris-quay.jpg`（圣米歇尔河岸的旧书摊与巴黎圣母院，作者 Daniel Villafruela，CC BY-SA 4.0）
  - `tokyo-night.jpg`（新宿南口夜景，作者 康复 calvision，CC0）
  - `tokyo-crossing.jpg`（涩谷全向十字路口，作者 Benh LIEU SONG，CC BY-SA 2.0）
  - `tokyo-sensoji.jpg`（浅草寺，作者 Balon Greyjoy，CC0）
  - `venice-canal.jpg`（大运河与安康圣母教堂，作者 Wolfgang Moroder，CC BY-SA 3.0）
  - `venice-sunset.jpg`（威尼斯运河黄昏，作者 Satyajitc，CC BY-SA 3.0）
  - `venice-rain.jpg`（雨后里亚托桥，作者 Ввласенко，CC BY-SA 3.0）
  - `santorini-oia.jpg`（伊亚蓝顶教堂，作者 palindrome6996，CC BY 2.0）
  - `santorini-sunset.jpg`（伊亚落日，作者 Anna.Tsolidou，CC BY-SA 4.0）
  - `santorini-fira.jpg`（费拉白房子钟楼，作者 Dietmar Rabich，CC BY-SA 4.0）

## 6. 验收自测清单

- [x] 首屏品牌 logo 动画（Horizon 罗盘描线揭场，可跳过，每会话仅播放一次）
- [x] 六个导航入口均为真实页面，当前页高亮，支持前进/后退/直接访问
- [x] 画廊灯箱：开合、上一张/下一张、键盘、触摸滑动、焦点管理
- [x] 页脚居中的 `CONTACT` 按钮（`mailto:` 标准协议，点击调用系统邮件客户端并自动填写收件人）
- [x] 版权年份由 JavaScript 自动写入当前年份
- [x] 桌面 / 平板 / 手机响应式；无横向溢出
- [x] 无后端依赖，可任意静态托管
