// 文章数据库
// 每次发布新文章时，需要在这里添加文章信息

const blogDatabase = [
    {
        id: 1,
        title: "你好，世界！",
        url: "posts/2024-01-20-hello-world.html",
        tags: ["随笔", "开始"],
        content: `欢迎来到我的博客！这是开篇的第一篇文章，用来记录这个博客的诞生和我的初衷...`,
        excerpt: "博客开通的第一篇文章，记录开始写博客的初衷和想法...",
        date: "2024-01-20",
        readTime: "2分钟",
        author: "张三",  // 明确的作者名
        featured: true,
        authorBio: "一个喜欢简单Web开发的前端开发者。相信技术应该服务于内容。"
    },
    {
        id: 2,
        title: "如何学习HTML",
        url: "posts/post1.html",
        tags: ["学习", "HTML", "CSS", "前端"],
        content: `HTML是Web开发的基石，是所有网页的基础...`,
        excerpt: "分享一些学习HTML的心得体会，以及实用的学习资源推荐...",
        date: "2024-01-21",
        readTime: "5分钟",
        author: "张三",  // 统一的作者名
        featured: true,
        authorBio: "一个喜欢简单Web开发的前端开发者。相信技术应该服务于内容。"
    },
    {
        id: 3,
        title: "我的第一篇文章",
        url: "posts/2024-01-22-my-first-post.html",
        tags: ["技术", "HTML", "静态网站"],
        content: `这是我的第一篇博客文章，用来记录我创建这个静态博客的过程...`,
        excerpt: "这是我的第一篇博客文章，用来记录我创建这个静态博客的过程...",
        date: "2024-01-22",
        readTime: "3分钟",
        author: "张三",  // 统一的作者名
        featured: true,
        authorBio: "一个喜欢简单Web开发的前端开发者。相信技术应该服务于内容。"
    }
];

// 按日期降序排序（最新在前）
blogDatabase.sort((a, b) => new Date(b.date) - new Date(a.date));

// 全局作者配置
const BLOG_CONFIG = {
    author: "张三",
    authorBio: "一个喜欢简单Web开发的前端开发者。相信技术应该服务于内容。",
    siteName: "我的博客",
    siteUrl: window.location.origin || "https://example.com",
    defaultAuthor: "张三"  // 默认作者名
};

// 导出数据供其他页面使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { blogDatabase, BLOG_CONFIG };
}
