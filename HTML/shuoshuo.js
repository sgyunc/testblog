// Masonry 列数
let columnCount = 2;
let columns = [];

// 数据（你自己的数据）
const shuoshuo = [
    { text: "动态说说页面增强版上线 ✨", time: "2025-12-11", img: "https://picsum.photos/400/260?1" },
    { text: "图片支持懒加载，更快更省流量", time: "2025-12-11", img: "https://picsum.photos/400/300?2" },
    { text: "加入专业 Masonry 布局，无断层！", time: "2025-12-10" },
    { text: "返回顶部按钮保留", time: "2025-12-09", img: "https://picsum.photos/400/280?3" },
];

// 初始化 Masonry 列
function initColumns() {
    const list = document.getElementById("list");
    list.innerHTML = "";

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

// 渲染全部数据（不再分批）
function renderAll() {
    shuoshuo.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "item";
        div.style.animationDelay = `${index * 0.05}s`;

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

// 滚动事件只保留：懒加载 + 返回顶部
window.addEventListener("scroll", () => {
    lazyLoadImages();

    const topBtn = document.getElementById("topBtn");
    if (window.scrollY > 300) topBtn.classList.add("show");
    else topBtn.classList.remove("show");
});

// 返回顶部
function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// 初次加载
window.onload = () => {
    initColumns();
    renderAll();
};

// 响应式重排
window.onresize = () => {
    initColumns();
    renderAll();
};