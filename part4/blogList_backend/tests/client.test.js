const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const user = require('./testData').users[0]
const { SECRET } = require('../utils/config')
const { initBlogs, initUsers } = require('./init_db')

const api = supertest(app)

beforeAll(async () => {
    const users = await initUsers()
    await initBlogs(users)
})

describe('client login', () => {
    test('valid bearer token returned on initial login', async () => {
        const { username, password } = user
        await api
            .post('/api/login')
            .send({ username, password })
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(({ body }) => {
                expect(body.token).toBeDefined()
                const usernameFromToken = jwt.verify(body.token, SECRET)
                    .username
                expect(usernameFromToken).toBe(username)
            })
    })
})

afterAll(() => {
    mongoose.connection.close()
})
