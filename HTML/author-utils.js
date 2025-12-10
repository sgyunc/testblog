// author-utils.js
// 作者相关的工具函数

// 获取文章作者
function getArticleAuthor(articleId) {
    if (!blogDatabase) return BLOG_CONFIG.defaultAuthor;
    
    const article = blogDatabase.find(post => post.id === articleId);
    if (article && article.author) {
        return article.author;
    }
    
    return BLOG_CONFIG.defaultAuthor;
}

// 获取所有作者（用于统计）
function getAllAuthors() {
    if (!blogDatabase) return [];
    
    const authors = new Set();
    blogDatabase.forEach(post => {
        if (post.author) {
            authors.add(post.author);
        }
    });
    
    return Array.from(authors);
}

// 获取作者的文章数量
function getAuthorArticleCount(authorName) {
    if (!blogDatabase) return 0;
    
    return blogDatabase.filter(post => 
        post.author === authorName
    ).length;
}

// 更新页面中的作者信息
function updatePageAuthorInfo(elementId, articleId = null) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const authorName = getArticleAuthor(articleId);
    element.textContent = authorName;
}

// 批量更新作者信息
function updateAllAuthorInfo() {
    // 更新所有包含 author 类的元素
    document.querySelectorAll('.author-name').forEach(element => {
        const articleId = element.dataset.articleId;
        element.textContent = getArticleAuthor(articleId);
    });
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getArticleAuthor,
        getAllAuthors,
        getAuthorArticleCount,
        updatePageAuthorInfo,
        updateAllAuthorInfo
    };
}
