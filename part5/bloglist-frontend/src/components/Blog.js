import React, { useState } from 'react'
import { blogService } from '../services'

const Blog = ({ blog, setBlogs }) => {
    const [showDetails, setShowDetails] = useState(false)
    const handleLike = async (event, id) => {
        event.preventDefault()
        const update = await blogService.likePost(id)
        setBlogs((blogs) => {
            const blogToUpdate = blogs.filter((blog) => blog.id === id)[0]
            const updatedBlog = { ...blogToUpdate, likes: update.likes }
            return blogs.map((blog) => {
                return blog.id === id ? updatedBlog : blog
            })
        })
    }
    return (
        <div style={{ padding: '10px' }}>
            {blog.title}: {blog.author}{' '}
            <button onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? 'hide' : 'view'}
            </button>
            {showDetails ? (
                <BlogDetails blog={blog} handleLike={handleLike} />
            ) : null}
        </div>
    )
}

const BlogDetails = ({ blog, handleLike }) => {
    const { url, user, likes, id } = blog
    return (
        <div>
            <div>
                <span style={{ fontWeight: 'bold' }}>URL:</span> {url}
            </div>
            <div>
                <span style={{ fontWeight: 'bold' }}>Likes:</span> {likes}{' '}
                <button onClick={(event) => handleLike(event, id)}>like</button>
            </div>
            <div>
                <span style={{ fontWeight: 'bold' }}>Submitted By:</span>{' '}
                {user.name}
            </div>
        </div>
    )
}

export default Blog
