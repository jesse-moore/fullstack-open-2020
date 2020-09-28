const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeAll(async () => {
    await User.deleteMany({})
    const newUser = new User({
        username: 'johnny82',
        name: 'johnny smith',
        password: 'password123',
    })
    await newUser.save()
})

describe('retrieving users', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})

describe('creating users', () => {
    test('user is created', async () => {
        const newUser = {
            username: 'jamie85',
            name: 'jamie smith',
            password: '123password',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const user = await User.findOne({ username: newUser.username })
        expect(user).not.toBe(null)
    })
    test('username cannot be less than 3 characters', async () => {
        const invalidUser = {
            username: 'ja',
            name: 'jamie smith',
            password: '123password',
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect((res) => res.body.error)
    })
    test('password cannot be less than 3 characters', async () => {
        const invalidUser = {
            username: 'jamie85',
            name: 'jamie smith',
            password: '12',
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect((res) => res.body.error)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
