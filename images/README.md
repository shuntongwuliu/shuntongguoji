# 图片资源说明

## 文件夹结构
```
images/
├── logo/           # 公司标志和品牌图片
├── banners/        # 横幅和背景图片
├── icons/          # 图标文件
└── news/           # 最新动态图片
```

## 需要准备的图片

### 1. logo/ 文件夹
- **logo.png** - 公司主要标志（建议尺寸：200x200px，PNG格式，透明背景）
- **logo-white.png** - 白色版本标志（用于深色背景）

### 2. banners/ 文件夹
- **hero-bg.jpg** - 首页横幅背景图（建议尺寸：1200x800px，JPG格式）
- **about-bg.jpg** - 关于我们页面背景图
- **services-bg.jpg** - 服务介绍页面背景图

### 3. news/ 文件夹
- **news1.jpg** - 新航线开通新闻图片
- **news2.jpg** - 服务升级新闻图片
- **news3.jpg** - 战略合作新闻图片

### 4. icons/ 文件夹
- 各种业务相关的图标文件（可选）

## 图片要求
- **格式**: 优先使用JPG（照片）和PNG（图标、标志）
- **尺寸**: 根据建议尺寸准备，确保清晰度
- **文件大小**: 单张图片不超过500KB，优化加载速度
- **质量**: 高清图片，体现公司专业形象

## 临时替代方案
如果暂时没有合适的图片，可以使用以下占位图片服务：
- https://via.placeholder.com/  - 纯色占位图
- https://picsum.photos/ - 随机高质量图片

## 示例命令
```bash
# 下载占位图片作为临时使用
curl "https://via.placeholder.com/1200x800/1e3a8a/ffffff?text=恒达运输" -o images/banners/hero-bg.jpg
curl "https://via.placeholder.com/200x200/ea580c/ffffff?text=LOGO" -o images/logo/logo.png
curl "https://via.placeholder.com/400x200/3b82f6/ffffff?text=新航线开通" -o images/news/news1.jpg
curl "https://via.placeholder.com/400x200/ea580c/ffffff?text=服务升级" -o images/news/news2.jpg
curl "https://via.placeholder.com/400x200/1e3a8a/ffffff?text=战略合作" -o images/news/news3.jpg
```
