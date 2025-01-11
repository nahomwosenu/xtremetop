const mongoose = require('mongoose')
const ServerSchema = new mongoose.Schema(
  {
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    title: { type: String, required: true },
    gameMode: { type: String },
    region: { type: String },
    description: { type: String },
    url: { type: String },
    socialLinks: {
      type: Map,
      of: String
    },
    screenshots: [{ type: String }], // URLs to images
    currentPlayerCount: { type: Number },
    serverStatus: {
      type: String,
      enum: ['online', 'offline'],
      default: 'online'
    },
    rating: { type: Number, default: 0 }, // Average rating
    totalVotes: { type: Number, default: 0 },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    contactEmail: { type: String },
    tags: [{ type: String }], // For future filtering
    server_ip: { type: String }, // For potential future integrations
    server_port: { type: String },
    server_query_port: { type: String },
    apiInfo: {
      apiUrl: { type: String },
      apiKey: { type: String }
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Server', ServerSchema)
