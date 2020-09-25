const listHelper = require('../utils/list_helper')
const { blogs } = require('./testData')

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('blog with most likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url:
                'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0,
        })
    })
})

describe('most blogs', () => {
    test('author with most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3,
        })
    })
})

describe('most likes', () => {
    test('author with most likes', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17,
        })
    })
})
