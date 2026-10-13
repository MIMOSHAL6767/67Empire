// 六七帝国官网配置：只需修改 config.js 中的服务器地址、端口和下载链接。
(function () {
  const config = window.SIXSEVEN_CONFIG || {};
  const address = config.serverAddress || "请在 config.js 中填写服务器地址";
  const port = config.serverPort || "请在 config.js 中填写端口";
  const downloadUrl = config.downloadUrl || "";
  const communityUrl = config.communityUrl || "";
  const version = config.packVersion || "待填写";

  document.getElementById("serverAddress").textContent = address;
  document.getElementById("serverPort").textContent = port;
  document.getElementById("releaseMeta").textContent = "整合包版本：" + version + "　·　文件信息请以 GitHub Releases 为准";
  document.getElementById("year").textContent = new Date().getFullYear();

  const downloadButton = document.getElementById("downloadButton");
  if (downloadUrl) {
    downloadButton.href = downloadUrl;
  } else {
    downloadButton.href = "https://github.com/";
    downloadButton.addEventListener("click", function (event) {
      if (!config.downloadUrl) {
        event.preventDefault();
        alert("请先编辑 config.js，填写 GitHub Releases 下载链接。");
      }
    });
  }

  const communityLink = document.getElementById("communityLink");
  if (communityUrl) communityLink.href = communityUrl;
  else {
    communityLink.href = "#connect";
    communityLink.addEventListener("click", function (event) {
      event.preventDefault();
      alert("请在 config.js 中填写社区邀请链接。");
    });
  }

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", async function () {
      const type = button.getAttribute("data-copy");
      const value = type === "address" ? config.serverAddress : config.serverPort;
      const notice = document.getElementById("copyNotice");
      if (!value || String(value).trim() === "") {
        notice.textContent = "请先在 config.js 中填写服务器" + (type === "address" ? "地址。" : "端口。");
        return;
      }
      try {
        await navigator.clipboard.writeText(String(value));
        notice.textContent = (type === "address" ? "服务器地址" : "端口") + "已复制。";
        button.innerHTML = "已复制 ✓";
        setTimeout(function () { button.innerHTML = type === "address" ? "复制地址 <span>⧉</span>" : "复制端口 <span>⧉</span>"; }, 1600);
      } catch (e) {
        notice.textContent = "浏览器未允许自动复制，请手动选择并复制：" + value;
      }
    });
  });

  const toggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".nav");
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
})();
