// tests/users.test.js
const request = require('supertest')
const app = require('../index')
const mongoose = require('mongoose')
const User = require('../model/User')
const faker = require('faker')

let server

beforeAll(done => {
  server = app.listen(4000, () => {
    console.log('Test server running on port 4000')
    done()
  })
})

afterAll(done => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => {
      server.close(done)
    })
  })
})

describe('User Routes', () => {
  describe('POST /users/register', () => {
    it('should register a new user', async () => {
      const userData = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'Test@1234'
      }

      const res = await request(app).post('/users/register').send(userData)

      expect(res.statusCode).toEqual(201)
      expect(res.body.message).toEqual('User registered successfully')

      const user = await User.findOne({ email: userData.email })
      expect(user).not.toBeNull()
    })

    it('should not register a user with an existing email', async () => {
      const userData = {
        username: faker.internet.userName(),
        email: 'existing@example.com',
        password: 'Test@1234'
      }

      // Create a user first
      await new User({
        username: 'existinguser',
        email: userData.email,
        passwordHash: 'hashedpassword'
      }).save()

      const res = await request(app).post('/users/register').send(userData)

      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toEqual('Email already registered')
    })
  })

  describe('POST /users/login', () => {
    it('should log in a user with correct credentials', async () => {
      const password = 'Test@1234'
      const user = new User({
        username: 'testuser',
        email: 'testuser@example.com',
        passwordHash: await bcrypt.hash(password, 10)
      })
      await user.save()

      const res = await request(app)
        .post('/users/login')
        .send({ email: user.email, password })

      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toEqual('Logged in successfully')
    })

    it('should not log in a user with incorrect credentials', async () => {
      const res = await request(app)
        .post('/users/login')
        .send({ email: 'wrong@example.com', password: 'wrongpassword' })

      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toEqual('Incorrect email or password.')
    })
  })
})
