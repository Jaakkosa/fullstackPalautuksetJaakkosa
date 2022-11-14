const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://username:${password}@cluster0.l4acfsc.mongodb.net/numerot?retryWrites=true&w=majority`
// piilotin myös käyttiksen



console.log(url)
console.log('tryin to connect')
mongoose.connect(url).then(() => Seivi())
  .catch(e => console.log(e))

const numberSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true }
  ,
  number: String,
})
console.log(1)

const Note = mongoose.model('Note', numberSchema)

const person = new Note({
  name: process.argv[3],
  number: process.argv[4]
})
// mongo näköjänä ite loi id:t joten ei ollut tarvetta luoda niitä itse

const Seivi = () => {
  if(process.argv.length === 5){
    person.save().then(result => {
      console.log('result:')
      console.log(result)
      console.log('Added ' + process.argv[3] + 'number ' + process.argv[4] + ' to phonebook' )
      mongoose.connection.close()
    })}
  else if(process.argv.length === 3) {
    Note.find({}).then(result => {
      result.forEach(note => {
        console.log(note.name + ' ' + note.number)
      })
      mongoose.connection.close()
    })
  }
  else mongoose.connection.close()
}
