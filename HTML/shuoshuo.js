// 每次加载数量
const BATCH = 6;

// 当前已加载的项目数
let loaded = 0;

// 数据示例（你继续往下写就行）
const shuoshuo = [
    { text: "今天做了一个动态说说页面 ✨", time: "2025-12-11", img: "https://picsum.photos/400/260?1" },
    { text: "加入暗色模式、动画、无限滚动。", time: "2025-12-11" },
    { text: "支持图片显示。", time: "2025-12-10", img: "https://picsum.photos/400/300?2" },
    { text: "你可以继续写更多内容……", time: "2025-12-09" },
    // ……继续写
];

// 渲染一批（不会清空）
function renderBatch(batch) {
    const list = document.getElementById("list");

    batch.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "item";
        div.style.animationDelay = `${index * 0.06}s`;

        div.innerHTML = `
            ${item.img ? `<img class="pic" src="${item.img}">` : ""}
            <div class="text">${item.text}</div>
            <div class="time">${item.time}</div>
        `;

        list.appendChild(div);
    });
}

// 加载下一批
function loadMore() {
    // 如果全部加载完，就不再加载
    if (loaded >= shuoshuo.length) return;

    const slice = shuoshuo.slice(loaded, loaded + BATCH);
    loaded += slice.length;

    renderBatch(slice);
}

// 滚动触发无限加载
window.addEventListener("scroll", () => {
    // 如果距离底部不足 200px，加载
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMore();
    }
});

// 初次加载
window.onload = () => {
    loadMore();
};