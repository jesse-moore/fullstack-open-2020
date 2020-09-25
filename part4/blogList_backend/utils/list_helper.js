const totalLikes = (blogs) => {
    return blogs.map((blog) => blog.likes).reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((blogA, blogB) => {
        return blogA.likes > blogB.likes ? blogA : blogB
    })
}

const mostBlogs = (blogs) => {
    const bloggers = {}
    blogs.forEach((blog) => {
        const { author } = blog
        if (bloggers[author]) return (bloggers[author].blogs += 1)
        bloggers[author] = { blogs: 1, author }
    })
    return Object.values(bloggers).reduce((authorA, authorB) =>
        authorA.blogs > authorB.blogs ? authorA : authorB
    )
}

const mostLikes = (blogs) => {
    const bloggers = {}
    blogs.forEach((blog) => {
        const { author, likes } = blog
        if (bloggers[author]) return (bloggers[author].likes += likes)
        bloggers[author] = { likes, author }
    })
    return Object.values(bloggers).reduce((authorA, authorB) =>
        authorA.likes > authorB.likes ? authorA : authorB
    )
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
