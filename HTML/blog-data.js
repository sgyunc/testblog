// 文章数据库
// 每次发布新文章时，需要在这里添加文章信息

const blogDatabase = [
    {
        id: 1,
        title: "你好，世界！",
        url: "posts/2024-01-20-hello-world.html",
        tags: ["随笔", "开始"],
        content: `欢迎来到我的博客！这是开篇的第一篇文章，用来记录这个博客的诞生和我的初衷。在当今快速发展的技术世界中，我们经常被各种框架、工具和库所包围。有时候，我会怀念早期Web开发的简单性——只有HTML和CSS，没有复杂的构建过程，没有依赖管理，就是纯粹的编写和发布。这个博客是我对Web初心的一次回归。`,
        excerpt: "博客开通的第一篇文章，记录开始写博客的初衷和想法...",
        date: "2024-01-20",
        readTime: "2分钟",
        author: "作者名",
        featured: true
    },
    {
        id: 2,
        title: "如何学习HTML",
        url: "posts/2024-01-21-learn-html.html",
        tags: ["学习", "HTML", "CSS", "前端"],
        content: `HTML是Web开发的基石，是所有网页的基础。学习HTML并不难，但需要正确的方法和持续的练习。本文将分享我学习HTML的经验和方法。从基础标签开始，到语义化HTML5，再到现代Web开发的最佳实践。`,
        excerpt: "分享一些学习HTML的心得体会，以及实用的学习资源推荐...",
        date: "2024-01-21",
        readTime: "5分钟",
        author: "上官云琛",
        featured: true
    },
    {
        id: 3,
        title: "我的第一篇文章",
        url: "posts/2024-01-22-my-first-post.html",
        tags: ["技术", "HTML", "静态网站"],
        content: `这是我的第一篇博客文章，用来记录我创建这个静态博客的过程。为什么选择纯HTML？我选择使用纯HTML创建博客，因为简单直接、快速加载、完全控制、易于维护。博客结构包含 index.html（首页）、style.css（样式文件）、about.html（关于页面）、archive.html（归档页面）和 posts/ 文章目录。`,
        excerpt: "这是我的第一篇博客文章，用来记录我创建这个静态博客的过程...",
        date: "2024-01-22",
        readTime: "3分钟",
        author: "作者名",
        featured: true
    }
];

// 按日期降序排序（最新在前）
blogDatabase.sort((a, b) => new Date(b.date) - new Date(a.date));

// 导出数据供其他页面使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = blogDatabase;
}