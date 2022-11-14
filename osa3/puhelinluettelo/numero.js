const mongoose = require('mongoose')
const url = process.env.MONGODB_URI


mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const validaattori = [
  {
    validator: (number) => {
      if((number[2] === '-' || number[3] === '-') && number.length < 9){
        return false
      }
      return true
    },
    message: 'Tarkista numeron muoto sekä pituus'
  },
  {
    validator: (number) => {
      return /^\d{2,3}-\d+$/.test(number)
    },
    message: 'Tarkista numeron muoto'
  }
]

const numberSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true }
  ,
  number: {
    type: String,
    required: true,
    validate: validaattori,
  },
})

numberSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', numberSchema)

