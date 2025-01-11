const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/tpg_dev' // replace with your DB URI

// Define the Region schema
const RegionSchema = new mongoose.Schema({
  name: { type: String, required: true }
})

// Create the model
const Region = mongoose.model('Region', RegionSchema)

// Function to insert countries into the database
async function insertCountries () {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Connected to MongoDB')

    // Read the JSON file
    const countriesFile = path.join(__dirname, 'countries.json')
    const countriesData = JSON.parse(fs.readFileSync(countriesFile, 'utf-8'))

    // Insert the countries into the database
    await Region.insertMany(
      countriesData.map(({ name }) => ({
        name
      }))
    )
    console.log('Countries inserted successfully')

    // Close the connection
    mongoose.connection.close()
    console.log('Connection closed')
  } catch (error) {
    console.error('Error inserting countries:', error)
    mongoose.connection.close()
  }
}

// Call the function to insert countries
insertCountries()
