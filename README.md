# 六七帝国 Minecraft 服务器官网

一个纯静态 HTML/CSS/JavaScript 网站，可免费部署到 GitHub Pages。

## 本地预览
直接双击 `index.html` 通常可以预览页面。若浏览器限制复制功能，请通过本地静态服务器预览；发布到 HTTPS 网站后复制功能正常。

## 发布前先修改
打开 `config.js`，填写：
- `serverAddress`：Java 版服务器地址
- `serverPort`：服务器端口
- `downloadUrl`：GitHub Releases 页面或具体下载文件 URL
- `communityUrl`：可选的社群链接
- `packVersion`：整合包版本号

## GitHub Pages 免费发布步骤
1. 登录 GitHub，创建一个新仓库，例如 `six-seven-empire-site`。
2. 将本文件夹内所有文件和 `assets` 文件夹上传到仓库根目录。确保 `index.html` 位于根目录。
3. 打开仓库 Settings → Pages。
4. 在 Build and deployment 下选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/ (root)`，点击 Save。
6. 等待部署完成。页面会显示类似 `https://你的用户名.github.io/six-seven-empire-site/` 的网址。
7. 后续更新网页，直接修改仓库中的文件并提交即可。

## GitHub Releases 发布整合包
1. 打开用于整合包发布的 GitHub 仓库，进入 Releases → Draft a new release。
2. 填写版本标签，例如 `v1.0.0`。
3. 上传整合包压缩文件作为 release asset，填写更新说明后发布。
4. 将 Release 页面链接或文件链接粘贴到 `config.js` 的 `downloadUrl`。
5. 注意 GitHub 对单个 Release 文件和仓库流量有使用限制；大文件高流量分发建议另备下载渠道。

## 图片替换
默认首页背景图位于 `assets/hero-banner.png`。可替换为你自己的 16:9 宣传图，建议使用同名文件覆盖。

## 说明
- 服务器地址、端口和下载链接当前为空，必须在正式发布前填写。
- 本网站不会自动探测服务器在线状态，符合“只显示地址和端口”的需求。
- 页面为纯静态网站，不需要后端服务器或数据库。
