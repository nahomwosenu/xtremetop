// tests/reviews.test.js
const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Server = require('../model/Server')
const User = require('../model/User')
const Review = require('../model/Review')
const Game = require('../model/Game')
const bcrypt = require('bcryptjs')

let server
let agent
let userId
let serverId

beforeAll(async done => {
  server = app.listen(4003, () => {
    console.log('Test server running on port 4003')
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
  agent = request.agent(app)
  await agent.post('/users/login').send({ email: user.email, password })

  // Create a test game
  const game = new Game({ name: 'Test Game' })
  await game.save()

  // Create a test server
  const serverData = new Server({
    game: game._id,
    name: 'Review Server',
    owner: userId
  })
  await serverData.save()
  serverId = serverData._id
})

afterAll(done => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => {
      server.close(done)
    })
  })
})

describe('Reviews Routes', () => {
  it('should allow a user to add a review to a server', async () => {
    const res = await agent.post('/reviews').send({
      serverId,
      content: 'Great server!',
      rating: 5
    })

    expect(res.statusCode).toEqual(201)
    expect(res.body.content).toEqual('Great server!')
    expect(res.body.rating).toEqual(5)
    expect(res.body.user).toEqual(userId.toString())
  })

  it('should retrieve all reviews for a server', async () => {
    const res = await request(app).get(`/reviews/server/${serverId}`)

    expect(res.statusCode).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
    expect(res.body[0].content).toEqual('Great server!')
  })
})
