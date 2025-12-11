// 每批加载数量
const BATCH = 6;

// 当前已加载数量
let loaded = 0;

// Masonry 列数
let columnCount = 2;

// 列数组
let columns = [];

let loading = false;

// 示例数据（继续写即可）
const shuoshuo = [
    { text: "动态说说页面增强版上线 ✨", time: "2025-12-11", img: "https://picsum.photos/400/260?1" },
    { text: "图片支持懒加载，更快更省流量", time: "2025-12-11", img: "https://picsum.photos/400/300?2" },
    { text: "加入专业 Masonry 布局，无断层！", time: "2025-12-10" },
    { text: "无限滚动 + 返回顶部按钮", time: "2025-12-09", img: "https://picsum.photos/400/280?3" },
];

// 初始化 Masonry 列
function initColumns() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    // 手机端1列
    columnCount = window.innerWidth < 600 ? 1 : 2;

    columns = [];

    for (let i = 0; i < columnCount; i++) {
        const col = document.createElement("div");
        col.className = "masonry-col";
        list.appendChild(col);
        columns.push(col);
    }
}

// 找最短列
function getShortestColumn() {
    return columns.reduce((a, b) =>
        a.offsetHeight <= b.offsetHeight ? a : b
    );
}

// 渲染一批
function renderBatch(batch) {
    batch.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "item";
        div.style.animationDelay = `${index * 0.05}s`;

        // 懒加载图
        const imgHTML = item.img
            ? `<img class="pic lazy" data-src="${item.img}">`
            : "";

        div.innerHTML = `
            ${imgHTML}
            <div class="text">${item.text}</div>
            <div class="time">${item.time}</div>
        `;

        getShortestColumn().appendChild(div);
    });

    lazyLoadImages();
}

// 加载更多
function loadMore() {
    if (loading || loaded >= shuoshuo.length) return;
    loading = true;

    showSpinner();

    setTimeout(() => {
        const slice = shuoshuo.slice(loaded, loaded + BATCH);
        loaded += slice.length;

        renderBatch(slice);

        hideSpinner();
        loading = false;
    }, 600); // 模拟网络延迟
}

// 图片懒加载
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll("img.lazy");

    lazyImages.forEach(img => {
        const rect = img.getBoundingClientRect();

        if (rect.top < window.innerHeight + 200) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
        }
    });
}

// 滚动触发加载
window.addEventListener("scroll", () => {
    lazyLoadImages();

    // 自动加载更多
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
        loadMore();
    }

    // 显示返回顶部按钮
    const topBtn = document.getElementById("topBtn");
    if (window.scrollY > 300) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

// 返回顶部
function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Loading spinner
function showSpinner() {
    document.getElementById("spinner").style.opacity = 1;
}
function hideSpinner() {
    document.getElementById("spinner").style.opacity = 0;
}

// 初次加载
window.onload = () => {
    initColumns();
    loadMore();
};

// 监听窗口大小变化
window.onresize = () => {
    const oldCount = columnCount;
    initColumns();
    loaded = 0;
    loadMore();
};