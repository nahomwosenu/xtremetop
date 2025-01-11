// tests/servers.test.js
const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Server = require('../model/Server')
const User = require('../model/User')
const Game = require('../model/Game')
const bcrypt = require('bcryptjs')
const faker = require('faker')

let server
let token
let userId
let gameId

beforeAll(async done => {
  server = app.listen(4001, () => {
    console.log('Test server running on port 4001')
    done()
  })

  // Create a test user
  const password = 'Test@1234'
  const user = new User({
    username: 'testuser',
    email: 'testuser@example.com',
    passwordHash: await bcrypt.hash(password, 10)
  })
  await user.save()
  userId = user._id

  // Log in to get a session
  await request(app).post('/users/login').send({ email: user.email, password })

  // Create a test game
  const game = new Game({
    name: 'Test Game'
  })
  await game.save()
  gameId = game._id
})

afterAll(done => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => {
      server.close(done)
    })
  })
})

describe('Servers Routes', () => {
  let agent

  beforeEach(() => {
    agent = request.agent(app)
  })

  it('should create a new server', async () => {
    // Log in first
    await agent
      .post('/users/login')
      .send({ email: 'testuser@example.com', password: 'Test@1234' })

    const serverData = {
      game: gameId,
      name: 'Test Server',
      gameMode: 'Survival',
      region: 'NA',
      description: 'A test server'
    }

    const res = await agent.post('/servers').send(serverData)

    expect(res.statusCode).toEqual(201)
    expect(res.body.name).toEqual(serverData.name)
    expect(res.body.owner).toEqual(userId.toString())
  })

  it('should get a list of servers', async () => {
    const res = await request(app).get('/servers')

    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('should get server details', async () => {
    const server = new Server({
      game: gameId,
      name: 'Details Server',
      owner: userId
    })
    await server.save()

    const res = await request(app).get(`/servers/${server._id}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.name).toEqual('Details Server')
  })

  it('should update a server', async () => {
    const server = new Server({
      game: gameId,
      name: 'Update Server',
      owner: userId
    })
    await server.save()

    // Log in first
    await agent
      .post('/users/login')
      .send({ email: 'testuser@example.com', password: 'Test@1234' })

    const res = await agent
      .put(`/servers/${server._id}`)
      .send({ name: 'Updated Server' })

    expect(res.statusCode).toEqual(200)
    expect(res.body.name).toEqual('Updated Server')
  })

  it('should delete a server', async () => {
    const server = new Server({
      game: gameId,
      name: 'Delete Server',
      owner: userId
    })
    await server.save()

    // Log in first
    await agent
      .post('/users/login')
      .send({ email: 'testuser@example.com', password: 'Test@1234' })

    const res = await agent.delete(`/servers/${server._id}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toEqual('Server deleted successfully')
  })
})
