// tests/votes.test.js
const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Server = require('../model/Server')
const User = require('../model/User')
const Vote = require('../model/Vote')
const Game = require('../model/Game')
const bcrypt = require('bcryptjs')

let server
let agent
let userId
let serverId

beforeAll(async done => {
  server = app.listen(4002, () => {
    console.log('Test server running on port 4002')
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
    name: 'Vote Server',
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

describe('Votes Routes', () => {
  it('should allow a user to vote for a server', async () => {
    const res = await agent.post('/votes').send({
      serverId,
      rating: 5
    })

    expect(res.statusCode).toEqual(201)
    expect(res.body.message).toEqual('Vote recorded successfully')

    const vote = await Vote.findOne({ user: userId, server: serverId })
    expect(vote).not.toBeNull()
    expect(vote.rating).toEqual(5)
  })

  it('should not allow a user to vote twice for the same server', async () => {
    const res = await agent.post('/votes').send({
      serverId,
      rating: 4
    })

    expect(res.statusCode).toEqual(400)
    expect(res.body.message).toEqual('You have already voted for this server')
  })
})
