
/* 六七帝国官网脚本
 * 保留服务器信息、复制、下载和手机导航功能
 * 新增：8 张背景图随机轮换，每 5 秒切换
 */
(function () {
  "use strict";

  const config = window.SIXSEVEN_CONFIG || {};

  // =================================
  // 1. 首页背景轮播
  // =================================

  const heroImage = document.querySelector(".hero-image");

  const backgrounds = [
    "assets/hero-banner.png",
    "assets/hero-2.jpg",
    "assets/hero-3.jpg",
    "assets/hero-4.jpg",
    "assets/hero-5.jpg",
    "assets/hero-6.jpg"
  ];

  if (heroImage && backgrounds.length === 8) {
    const track = document.createElement("div");
    track.className = "hero-slides";
    track.setAttribute("aria-hidden", "true");

    // 预加载图片，减少切换时的空白
    backgrounds.forEach(function (src) {
      const preload = new Image();
      preload.src = src;
    });

    // 创建 8 个背景画面
    backgrounds.forEach(function (src) {
      const slide = document.createElement("div");
      slide.className = "hero-slide";
      slide.style.backgroundImage =
        'url("' + src + '")';

      track.appendChild(slide);
    });

    // 只添加背景轨道，不改动标题、按钮和遮罩
    heroImage.appendChild(track);

    let currentIndex = 0;

    function showSlide(index) {
      const offset = index * 12.5;
      track.style.transform =
        "translate3d(-" + offset + "%, 0, 0)";
    }

    // 随机挑选下一张，避免连续显示同一张
    function nextRandomSlide() {
      let nextIndex = Math.floor(
        Math.random() * (backgrounds.length - 1)
      );

      if (nextIndex >= currentIndex) {
        nextIndex += 1;
      }

      currentIndex = nextIndex;
      showSlide(currentIndex);
    }

    // 首次显示第一张，之后每 5 秒随机切换
    showSlide(currentIndex);
    window.setInterval(nextRandomSlide, 5000);
  }

  // =================================
  // 2. 服务器地址、端口和版本信息
  // =================================

  const address =
    config.serverAddress || "请在 config.js 中填写服务器地址";

  const port =
    config.serverPort || "请在 config.js 中填写端口";

  const downloadUrl = config.downloadUrl || "";
  const communityUrl = config.communityUrl || "";
  const version = config.packVersion || "待填写";

  const addressElement = document.getElementById("serverAddress");
  const portElement = document.getElementById("serverPort");
  const releaseMeta = document.getElementById("releaseMeta");
  const yearElement = document.getElementById("year");

  if (addressElement) addressElement.textContent = address;
  if (portElement) portElement.textContent = port;

  if (releaseMeta) {
    releaseMeta.textContent =
      "整合包版本：" + version +
      "　·　文件信息请以 GitHub Releases 为准";
  }

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // =================================
  // 3. 整合包下载按钮
  // =================================

  const downloadButton =
    document.getElementById("downloadButton");

  if (downloadButton) {
    if (downloadUrl) {
      downloadButton.href = downloadUrl;
    } else {
      downloadButton.href = "https://github.com/";

      downloadButton.addEventListener("click", function (event) {
        event.preventDefault();
        alert("请先编辑 config.js，填写 GitHub Releases 下载链接。");
      });
    }
  }

  // =================================
  // 4. 社区链接
  // =================================

  const communityLink =
    document.getElementById("communityLink");

  if (communityLink) {
    if (communityUrl) {
      communityLink.href = communityUrl;
    } else {
      communityLink.href = "#connect";

      communityLink.addEventListener("click", function (event) {
        event.preventDefault();
        alert("请在 config.js 中填写社区邀请链接。");
      });
    }
  }

  // =================================
  // 5. 复制服务器地址和端口
  // =================================

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", async function () {
      const type = button.getAttribute("data-copy");

      const value =
        type === "address"
          ? config.serverAddress
          : config.serverPort;

      const notice = document.getElementById("copyNotice");

      if (!notice) return;

      if (!value || String(value).trim() === "") {
        notice.textContent =
          "请先在 config.js 中填写服务器" +
          (type === "address" ? "地址。" : "端口。");
        return;
      }

      try {
        await navigator.clipboard.writeText(String(value));

        notice.textContent =
          (type === "address" ? "服务器地址" : "端口") +
          "已复制。";

        const originalHTML = button.innerHTML;
        button.innerHTML = "已复制 ✓";

        window.setTimeout(function () {
          button.innerHTML = originalHTML;
        }, 1600);
      } catch (error) {
        notice.textContent =
          "浏览器未允许自动复制，请手动选择并复制：" +
          value;
      }
    });
  });

  // =================================
  // 6. 手机端导航菜单
  // =================================

  const toggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");

      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "×" : "☰";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      });
    });
  }
})();
