const fs = require('fs')
function generateVerificationEmail (name, email, token) {
  const verificationLink = `http://localhost:3000/verify?token=${token}&email=${encodeURIComponent(
    email
  )}`
  const emailTemplate = fs
    .readFileSync(__dirname + '/../../templates/verification.html', 'utf-8')
    .toString()

  return emailTemplate
    .replace('{{name}}', name)
    .replace('{{verificationLink}}', verificationLink)
}

module.exports = {
  generateVerificationEmail
}
