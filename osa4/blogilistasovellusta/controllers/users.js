const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/api/users', async (request, response) => {
    const { username, name, password } = request.body
  
    const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })}
    if(!username){
        return response.status(400).json({
            error: 'a username must be defined'
        })
    }
   if(!password || password.length < 3){
        return response.status(400).json({
            error: "a password must be defined and it must be 3 characters or longer"
        })
    } 


    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

  response.status(201).json(savedUser)
})


   usersRouter.get('/api/users', (request, response) => {
         User.find({}).populate('notes').then(users => {
            response.json(users)
          }).catch(error => console.log(error))
        })


module.exports = usersRouter