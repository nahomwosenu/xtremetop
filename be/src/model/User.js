// models/User.js
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String }, // For basic auth
    displayName: { type: String },
    avatarUrl: { type: String },
    bio: { type: String },

    // Social login providers
    socialProviders: [
      {
        provider: { type: String }, // 'google', 'facebook'
        providerId: { type: String },
        accessToken: { type: String },
        refreshToken: { type: String }
      }
    ],

    // Two-Factor Authentication
    isTwoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String }, // For TOTP
    emailVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
