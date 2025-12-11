/* =========================================================================
   1. 说说数据（你可以在这里随意添加）
   ========================================================================= */
window.SHUOSHUO_DATA = [
    { text: "新版 Masonry 超级丝滑 ✨", time: "2025-12-11", img: "https://picsum.photos/400/300?1" },
    { text: "IntersectionObserver = 真正无限性能", time: "2025-12-11", img: "https://picsum.photos/400/280?2" },
    { text: "懒加载升级成功 🚀", time: "2025-12-10" },
    { text: "全站玻璃化风格上线 😌", time: "2025-12-09", img: "https://picsum.photos/400/260?3" },
];


/* =========================================================================
   2. Masonry 瀑布流布局（已自动处理高度问题）
   ========================================================================= */

function masonryLayout() {
    const wrap = document.querySelector("#ss-wrap");
    if (!wrap) return;

    const items = Array.from(document.querySelectorAll(".ss-item"));
    if (!items.length) return;

    const columns = 2;            // ← 你要 3 列/4 列我也能帮你改
    const gap = 18;

    wrap.style.position = "relative";

    const colHeights = Array(columns).fill(0);

    items.forEach(el => {
        const minCol = colHeights.indexOf(Math.min(...colHeights));

        // 绝对定位
        el.style.top = colHeights[minCol] + "px";
        el.style.left = `calc(${100 / columns}% * ${minCol})`;

        // 更新高度
        colHeights[minCol] += el.offsetHeight + gap;
    });

    wrap.style.height = Math.max(...colHeights) + "px";
}


/* =========================================================================
   3. 图片懒加载（带模糊淡入动画）
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
const ssPerPage = 4; // 每次加载几条

function loadMoreShuoshuo() {
    const wrap = document.querySelector("#ss-wrap");
    if (!wrap) return;

    const start = ssPage * ssPerPage;
    const items = SHUOSHUO_DATA.slice(start, start + ssPerPage);

    if (!items.length) return;

    items.forEach(d => {
        const el = document.createElement("div");
        el.className = "ss-item";

        const imgHTML = d.img
            ? `<img class="pic lazy" data-src="${d.img}">`
            : "";

        el.innerHTML = `
            ${imgHTML}
            <div class="text">${d.text}</div>
            <div class="time">${d.time}</div>
        `;

        wrap.appendChild(el);
    });

    ssPage++;

    // 延迟以确保 offsetHeight 获取正确
    setTimeout(() => {
        lazyLoadImages();
        masonryLayout();
    }, 200);
}

function initInfiniteScroll() {
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
            loadMoreShuoshuo();
        }
    });
}


/* =========================================================================
   5. 全站可用的“随机说说小卡片”
   ========================================================================= */

function renderRandomShuoCard() {
    const boxes = document.querySelectorAll(".shuoshuo-widget");
    if (!boxes.length) return;

    boxes.forEach(box => {
        const d = SHUOSHUO_DATA[Math.floor(Math.random() * SHUOSHUO_DATA.length)];

        const card = document.createElement("div");
        card.className = "ss-widget-card";

        card.innerHTML = `
            ${d.img ? `<img class="ss-widget-img" src="${d.img}">` : ""}
            <div class="ss-widget-text">${d.text}</div>
            <div class="ss-widget-time">${d.time}</div>
        `;

        box.appendChild(card);
    });
}


/* =========================================================================
   6. 初始化运行
   ========================================================================= */

window.addEventListener("DOMContentLoaded", () => {

    // 主页面（有瀑布流容器）
    if (document.querySelector("#ss-wrap")) {
        loadMoreShuoshuo();   // 第一次加载
        initInfiniteScroll(); // 无限加载
    }

    // 所有页面可使用随机说说小卡片
    renderRandomShuoCard();
});