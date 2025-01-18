// app.js
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('./config/passport')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const twoFARouter = require('./routes/2fa')

// Connect to MongoDB
const dbUri =
  process.platform === 'win32'
    ? 'mongodb://127.0.0.1:27017/tpg_dev'
    : 'mongodb+srv://nahometete:nQrTPkfeQzHNV06x@cluster0.q5etcxu.mongodb.net/tpg_dev'

const app = express()
const corsOptions = {
  origin: '*', // replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
  credentials: true // Allow credentials if you're using cookies
}

app.use(cors(corsOptions))

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Session Management (we'll configure this in the next step)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Replace with a strong secret in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set secure to true if using HTTPS
  })
)
app.use(passport.initialize())
app.use(passport.session())

// app.js (continue from previous code)
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Top Game Server List API',
      version: '1.0.0'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT' // or 'Session' if using session cookies
        }
      },
      schemas: {
        // Include the schemas defined above (Game, Server, Review, etc.)
        Game: {
          type: 'object',
          required: ['name'],
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the game'
            },
            name: {
              type: 'string',
              description: 'Name of the game'
            },
            iconUrl: {
              type: 'string',
              description: 'URL of the game icon image'
            },
            description: {
              type: 'string',
              description: 'Description of the game'
            },
            releaseDate: {
              type: 'string',
              format: 'date',
              description: 'Release date of the game'
            },
            developer: {
              type: 'string',
              description: 'Developer of the game'
            },
            genres: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Genres associated with the game'
            },
            platforms: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Platforms the game is available on'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the game was created'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the game was last updated'
            }
          },
          example: {
            _id: '60d21b4667d0d8992e610c85',
            name: 'Example Game',
            iconUrl: 'https://example.com/icon.png',
            description: 'An exciting multiplayer game.',
            releaseDate: '2021-01-01',
            developer: 'Game Studios',
            genres: ['Action', 'Adventure'],
            platforms: ['PC', 'Xbox', 'PlayStation'],
            createdAt: '2021-06-23T18:25:43.511Z',
            updatedAt: '2021-06-23T18:25:43.511Z'
          }
        },
        Server: {
          type: 'object',
          required: ['game', 'name', 'owner'],
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the server'
            },
            game: {
              type: 'string',
              description: 'ID of the game this server belongs to'
            },
            name: {
              type: 'string',
              description: 'Name of the server'
            },
            gameMode: {
              type: 'string',
              description: 'Game mode of the server'
            },
            region: {
              type: 'string',
              description: 'Region where the server is hosted'
            },
            description: {
              type: 'string',
              description: 'Description of the server'
            },
            website: {
              type: 'string',
              description: 'Website URL of the server'
            },
            socialLinks: {
              type: 'object',
              additionalProperties: {
                type: 'string'
              },
              description: 'Social media links related to the server'
            },
            screenshots: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'URLs of server screenshots'
            },
            currentPlayerCount: {
              type: 'number',
              description: 'Current number of players on the server'
            },
            serverStatus: {
              type: 'string',
              enum: ['online', 'offline'],
              description: 'Status of the server'
            },
            rating: {
              type: 'number',
              description: 'Average rating of the server'
            },
            totalVotes: {
              type: 'number',
              description: 'Total number of votes the server has received'
            },
            owner: {
              type: 'string',
              description: 'ID of the user who owns the server'
            },
            tags: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Tags associated with the server'
            },
            serverIP: {
              type: 'string',
              description: 'IP address of the server'
            },
            apiInfo: {
              type: 'object',
              properties: {
                apiUrl: {
                  type: 'string',
                  description: 'API URL for server data'
                },
                apiKey: {
                  type: 'string',
                  description: 'API key for accessing server data'
                }
              },
              description: 'Information for integrating with server APIs'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the server was created'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the server was last updated'
            }
          },
          example: {
            _id: '60d21b9667d0d8992e610c87',
            game: '60d21b4667d0d8992e610c85',
            name: 'Awesome Server',
            gameMode: 'Survival',
            region: 'NA',
            description: 'The best server for adventure.',
            website: 'https://awesomeserver.com',
            socialLinks: {
              discord: 'https://discord.gg/awesomeserver'
            },
            screenshots: [
              'https://awesomeserver.com/screenshot1.png',
              'https://awesomeserver.com/screenshot2.png'
            ],
            currentPlayerCount: 120,
            serverStatus: 'online',
            rating: 4.8,
            totalVotes: 256,
            owner: '60d21bf667d0d8992e610c89',
            tags: ['PvP', 'Adventure'],
            serverIP: '192.168.1.1',
            apiInfo: {
              apiUrl: 'https://api.awesomeserver.com',
              apiKey: 'abc123'
            },
            createdAt: '2021-06-23T18:25:43.511Z',
            updatedAt: '2021-06-23T18:25:43.511Z'
          }
        },
        Review: {
          // ... schema definition ...
        }
        // Add other schemas as needed
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ]
  },
  apis: ['src/routes/*.js'], // Files containing annotations as above
  explorer: true
}

const swaggerSpec = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// app.js (continue from previous code)
const usersRouter = require('./routes/users')
const gamesRouter = require('./routes/games')
const serversRouter = require('./routes/servers')
const votesRouter = require('./routes/votes')
const reviewsRouter = require('./routes/reviews')
const gameMetaRouter = require('./routes/gameMeta')
const fileUploadRouter = require('./routes/files')
const adSlotRouter = require('./routes/advertSlot')

app.use('/users', usersRouter)
app.use('/games', gamesRouter)
app.use('/servers', serversRouter)
app.use('/votes', votesRouter)
app.use('/reviews', reviewsRouter)
app.use('/auth', authRouter)
app.use('/2fa', twoFARouter)
app.use('/game-meta', gameMetaRouter)
app.use('/raw', fileUploadRouter)
app.use('/adslot', adSlotRouter)

// Start the server
const PORT = process.env.PORT || 4000
app.listen(PORT, async () => {
  await mongoose.connect(dbUri)
  console.log(`Server running on port ${PORT}`)
})
