/* =========================================================================
   1. 说说数据（集中管理）
   ========================================================================= */
window.SHUOSHUO_DATA = [
    { text: "新版 Masonry 超级丝滑 ✨", time: "2025-12-11", img: "https://picsum.photos/400/300?1" },
    { text: "IntersectionObserver = 真正无限性能", time: "2025-12-11", img: "https://picsum.photos/400/280?2" },
    { text: "懒加载升级成功 🚀", time: "2025-12-10" },
    { text: "好舒服的小动画 😌", time: "2025-12-09", img: "https://picsum.photos/400/260?3" },
];

/* =========================================================================
   2. Masonry 瀑布流布局（自动计算）
   ========================================================================= */
function masonryLayout(containerSelector, itemSelector, columnCount = 2, gap = 16) {
    const container = document.querySelector(containerSelector);
    const items = document.querySelectorAll(itemSelector);

    if (!container) return;

    const colHeights = new Array(columnCount).fill(0);

    items.forEach(item => {
        const minCol = colHeights.indexOf(Math.min(...colHeights));

        item.style.position = "absolute";
        item.style.top = colHeights[minCol] + "px";
        item.style.left = `calc((100% / ${columnCount}) * ${minCol})`;

        colHeights[minCol] += item.offsetHeight + gap;
    });

    container.style.position = "relative";
    container.style.height = Math.max(...colHeights) + "px";
}

/* =========================================================================
   3. 懒加载（带淡入 + 模糊动画）
   ========================================================================= */
function lazyLoadImages() {
    const imgs = document.querySelectorAll("img.lazy");

    imgs.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight + 200) {
            img.src = img.dataset.src;
            img.onload = () => img.classList.add("loaded");
            img.classList.remove("lazy");
        }
    });
}

/* =========================================================================
   4. 无限滚动加载更多
   ========================================================================= */
let ssPage = 0;
const ssPerPage = 4;

function loadMoreShuoshuo() {
    const start = ssPage * ssPerPage;
    const end = start + ssPerPage;
    const chunk = SHUOSHUO_DATA.slice(start, end);

    if (chunk.length === 0) return;

    const wrap = document.querySelector("#ss-wrap");

    chunk.forEach(item => {
        const card = document.createElement("div");
        card.className = "ss-item";

        const img = item.img
          ? `<img class="pic lazy" data-src="${item.img}">`
          : "";

        card.innerHTML = `
            ${img}
            <div class="text">${item.text}</div>
            <div class="time">${item.time}</div>
        `;

        wrap.appendChild(card);
    });

    ssPage++;
    setTimeout(() => {
        lazyLoadImages();
        masonryLayout("#ss-wrap", ".ss-item", 2, 16);
    }, 100);
}

function initInfiniteScroll() {
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
            loadMoreShuoshuo();
        }
    });
}

/* =========================================================================
   5. “随机说说小卡片”功能（可在任何页面使用）
   ========================================================================= */
function renderRandomShuoCard() {
    const widgets = document.querySelectorAll(".shuoshuo-widget");
    if (widgets.length === 0) return;

    widgets.forEach(w => {
        const d = SHUOSHUO_DATA[Math.floor(Math.random() * SHUOSHUO_DATA.length)];

        const card = document.createElement("div");
        card.className = "ss-widget-card";

        card.innerHTML = `
            ${d.img ? `<img class="ss-widget-img" src="${d.img}">` : ""}
            <div class="ss-widget-text">${d.text}</div>
            <div class="ss-widget-time">${d.time}</div>
        `;

        w.appendChild(card);
    });
}

/* =========================================================================
   6. 页面加载后自动初始化
   ========================================================================= */
window.addEventListener("DOMContentLoaded", () => {

    // 如果当前页面含有说说瀑布流，则初始化
    if (document.querySelector("#ss-wrap")) {
        loadMoreShuoshuo();
        initInfiniteScroll();
    }

    // 所有页面自动渲染随机说说卡片
    renderRandomShuoCard();
});