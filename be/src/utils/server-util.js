const dgram = require('dgram')

const queryGameServer = async (ip, port) => {
  const client = dgram.createSocket('udp4')
  const queryHeader = Buffer.from([
    0xff,
    0xff,
    0xff,
    0xff, // Header
    0x54, // Request Type (A2S_INFO)
    ...Buffer.from('Source Engine Query\0') // Query String
  ])

  return new Promise((resolve, reject) => {
    client.send(queryHeader, port, ip, err => {
      if (err) {
        client.close()
        return reject('Failed to send request to the server')
      }
    })

    client.on('message', message => {
      try {
        let offset = 6 // Start parsing after the initial header
        console.log('###>message: ', message)
        const response = {} // Initialize response object
        response.title = parseNullTerminatedString(message, offset)
        offset += response.title.length + 1
        response.description = parseNullTerminatedString(message, offset)

        resolve(response)
      } catch (error) {
        reject('Failed to parse server response')
      } finally {
        client.close()
      }
    })

    client.on('error', err => {
      reject(`Error: ${err.message}`)
      client.close()
    })
  })
}

function parseNullTerminatedString (buffer, offset) {
  let end = offset
  while (buffer[end] !== 0x00 && end < buffer.length) end++
  return buffer.toString('utf-8', offset, end)
}

module.exports = {
  queryGameServer,
  parseNullTerminatedString
}
