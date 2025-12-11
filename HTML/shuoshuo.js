// ===== 配置 =====
const COL_GAP = 16;
const CARD_WIDTH = 0;  // 自动计算
let columnWidth;

// ===== 数据（你的说说数据） =====
const shuoshuo = [
    { text: "新版 Masonry 超级丝滑 ✨", time: "2025-12-11", img: "https://picsum.photos/400/300?1" },
    { text: "IntersectionObserver = 真正不限性能", time: "2025-12-11", img: "https://picsum.photos/400/280?2" },
    { text: "不再依赖 offsetHeight，0 闪烁", time: "2025-12-10" },
    { text: "懒加载大升级 🚀", time: "2025-12-09", img: "https://picsum.photos/400/260?3" },
];


// ===== 动态列系统 =====
let columns = [];
let colHeights = [];
let colCount = 0;

function setupColumns() {
    const list = document.getElementById("list");
    list.innerHTML = '';

    const width = list.clientWidth;
    colCount = width < 600 ? 1 : 2;

    columnWidth = (width - (colCount - 1) * COL_GAP) / colCount;

    columns = [];
    colHeights = new Array(colCount).fill(0);

    for (let i = 0; i < colCount; i++) {
        const col = document.createElement("div");
        col.className = "masonry-col";
        col.style.width = columnWidth + "px";
        columns.push(col);
        document.getElementById("list").appendChild(col);
    }
}


// ===== 计算图片高度（不依赖 DOM） =====
function calcImageHeight(url) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
            const scale = columnWidth / img.width;
            resolve(img.height * scale);
        };
        img.src = url;
    });
}


// ===== 渲染一条说说 =====
async function renderItem(item) {
    const card = document.createElement("div");
    card.className = "item";

    // 计算卡片预期高度（不触发DOM）
    let imgHTML = "";
    let imgHeight = 0;

    if (item.img) {
        imgHeight = await calcImageHeight(item.img);
        imgHTML = `<img data-src="${item.img}" class="pic lazy">`;
    }

    card.innerHTML = `
        ${imgHTML}
        <div class="text">${item.text}</div>
        <div class="time">${item.time}</div>
    `;

    // 找到最矮的一列
    const minIndex = colHeights.indexOf(Math.min(...colHeights));

    // 放进去
    columns[minIndex].appendChild(card);

    // 更新列高（提前计算数值，不读取 DOM）
    const baseHeight = imgHeight + 80; // 文本区域的预估高度
    colHeights[minIndex] += baseHeight;

    // 观察懒加载
    observeImages(card);
}


// ===== 渲染全部 =====
async function renderAll() {
    for (const item of shuoshuo) {
        await renderItem(item);
    }
}


// ===== IntersectionObserver：懒加载 =====
const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.onload = () => img.classList.add("loaded");
            imgObserver.unobserve(img);
        }
    });
});

function observeImages(card) {
    const img = card.querySelector("img.lazy");
    if (img) imgObserver.observe(img);
}


// ===== 返回顶部 =====
function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", () => {
    const btn = document.getElementById("topBtn");
    if (window.scrollY > 300) btn.classList.add("show");
    else btn.classList.remove("show");
});


// ===== 启动 =====
window.onload = async () => {
    setupColumns();
    await renderAll();
};