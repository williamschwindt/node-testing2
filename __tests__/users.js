const supertest = require('supertest')
const server = require('../index')
const db = require('../data/config')

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('users integration tests', () => {
    test('GET /users/', async () => {
        const res = await supertest(server).get('/users/')
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body).not.toHaveLength(0)
        expect(res.body[0].username).toBe('william')
    })

    test('GET /users/:id', async () => {
        const res = await supertest(server).get('/users/1')
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.username).toBe('william')
    })

    test('GET /users/:id (404)', async () => {
        const res = await supertest(server).get('/users/10')
        expect(res.statusCode).toBe(404)
    })

    test('POST /users/', async () => {
        const user = { username: 'bill', password: '123' }
        const res = await supertest(server).post('/users').send(user)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe('application/json')
        expect(res.body.username).toBe('bill')
    })

    test('PUT /users/:id', async () => {
        const user = { username: 'will', password: '123' }
        const res = await supertest(server).put('/users/1').send(user)
        expect(res.statusCode).toBe(200)
    })

    // test('PUT /users/:id (404)', async () => {
    //     const res = await supertest(server).put('/users/100')
    //     expect(res.statusCode).toBe(404)
    // })

    // test('DELETE /users/:id', async () => {
    //     const res = await supertest(server).delete('/users/1')
    //     expect(res.statusCode).toBe(204)
    // })

    // test('DELETE /users/:id (404)', async () => {
    //     const res = await supertest(server).del('/users/100')
    //     expect(res.statusCode).toBe(404)
    // })

})