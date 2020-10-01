import React from 'react'
import Blog from './Blog'

export default ({ blogs, setBlogs, setAppMessage, user }) => {
    const blogSort = (blogA, blogB) => {
        return blogB.likes - blogA.likes
    }

    return (
        <div>
            <h2>blogs</h2>
            {blogs.sort(blogSort).map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    setBlogs={setBlogs}
                    setAppMessage={setAppMessage}
                    user={user}
                />
            ))}
        </div>
    )
}
