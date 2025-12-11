// 每页显示数量
const PAGE_SIZE = 6;

// 说说数据（可无限扩展）
const shuoshuo = [
    {
        text: "今天做了一个超动态的说说页面 ✨",
        time: "2025-12-11 15:20",
        img: "https://picsum.photos/400/260?1"
    },
    {
        text: "增加了暗色模式、动画、分页，好看又实用。",
        time: "2025-12-10 17:11"
    },
    {
        text: "支持图片啦，瀑布流更美观。",
        time: "2025-12-09 10:50",
        img: "https://picsum.photos/400/300?2"
    },
    // ...继续写即可
];

// 当前页
let page = 1;

// 获取当前页数据
function getPageData() {
    const start = (page - 1) * PAGE_SIZE;
    return shuoshuo.slice(start, start + PAGE_SIZE);
}

// 渲染函数（带动画）
function renderShuoShuo() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    getPageData().forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "item";
        div.style.animationDelay = `${index * 0.06}s`; // 逐条动画

        div.innerHTML = `
            ${item.img ? `<img src="${item.img}" class="pic">` : ""}
            <div class="text">${item.text}</div>
            <div class="time">${item.time}</div>
        `;

        list.appendChild(div);
    });

    updatePager();
}

// 更新分页按钮状态
function updatePager() {
    const totalPage = Math.ceil(shuoshuo.length / PAGE_SIZE);

    document.getElementById("prev").disabled = page === 1;
    document.getElementById("next").disabled = page === totalPage;
    document.getElementById("pageNum").innerText = `${page} / ${totalPage}`;
}

// 按钮事件
function prevPage() {
    if (page > 1) {
        page--;
        renderShuoShuo();
    }
}

function nextPage() {
    const totalPage = Math.ceil(shuoshuo.length / PAGE_SIZE);
    if (page < totalPage) {
        page++;
        renderShuoShuo();
    }
}

window.onload = renderShuoShuo;