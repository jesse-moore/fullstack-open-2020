const testData = require('./testData')
const Blog = require('../models/blog')
const User = require('../models/user')

const initUsers = async () => {
    await User.deleteMany({})
    const savePromises = testData.users.map((user) => {
        const userObject = new User(user)
        return userObject.save()
    })
    return await Promise.all(savePromises)
}

const initBlogs = async (users) => {
    await Blog.deleteMany({})
    const savedBlogs = await Promise.all(
        testData.blogs.map((blog, i) => {
            const user = i < 2 ? users[0] : i < 4 ? users[1] : users[2]
            const blogObject = new Blog({ ...blog, user: user.id })
            return blogObject.save()
        })
    )
    await Promise.all(
        savedBlogs.map((blog) => {
            return User.findByIdAndUpdate(blog.user, {
                $push: { blogs: blog._id },
            })
        })
    )
}

module.exports = { initUsers, initBlogs }
