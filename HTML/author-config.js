// author-config.js
// 作者配置文件，可以在多个页面中引用

const AUTHOR_CONFIG = {
    // 作者基本信息
    name: "张三",
    bio: "一个喜欢简单Web开发的前端开发者。相信技术应该服务于内容，而不是反过来。",
    avatar: "images/avatar.jpg",  // 可选
    
    // 联系信息
    email: "contact@example.com",
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername",
    
    // 社交链接
    social: {
        github: {
            icon: "fab fa-github",
            url: "https://github.com/yourusername",
            text: "GitHub"
        },
        twitter: {
            icon: "fab fa-twitter",
            url: "https://twitter.com/yourusername",
            text: "Twitter"
        },
        email: {
            icon: "fas fa-envelope",
            url: "mailto:contact@example.com",
            text: "Email"
        }
    },
    
    // 博客信息
    blog: {
        name: "我的博客",
        description: "一个专注于技术分享和个人思考的纯HTML静态博客",
        startYear: "2024"
    }
};

// 获取作者信息函数
function getAuthorInfo(postId = null) {
    if (postId) {
        // 如果提供了文章ID，从文章数据中查找
        const post = blogDatabase?.find(p => p.id === postId);
        if (post && post.author) {
            return {
                name: post.author,
                bio: post.authorBio || AUTHOR_CONFIG.bio,
                ...AUTHOR_CONFIG
            };
        }
    }
    
    // 返回默认作者信息
    return AUTHOR_CONFIG;
}

// 在全局可用
window.AUTHOR_CONFIG = AUTHOR_CONFIG;
window.getAuthorInfo = getAuthorInfo;