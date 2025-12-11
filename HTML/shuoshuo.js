// =========================
//    在 JS 中写说说数据
// =========================
const shuoshuo = [
    {
        text: "今天把首页改成极简风格，干净多了。",
        time: "2025-12-11 15:20"
    },
    {
        text: "准备做一个静态说说页面，全部数据由 JS 管理。",
        time: "2025-12-10 18:32"
    },
    {
        text: "尝试一下独立 JS 文件存储内容。",
        time: "2025-12-09 10:05"
    }
];

// =========================
//       渲染函数
// =========================
function renderShuoShuo() {
    const list = document.getElementById("list");

    shuoshuo.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
            <div>${item.text}</div>
            <div class="time">${item.time}</div>
        `;
        list.appendChild(div);
    });
}

// 页面加载后执行
renderShuoShuo();