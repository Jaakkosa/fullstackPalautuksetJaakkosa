const notesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { request, response } = require('express')
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')
const usersRouter = require('./users')


notesRouter.get('/api/blogs', (request, response) => {
  console.log("blogslisted")
   Blog.find({}).populate('user', { username: 1, name: 1 }).then(notes => {
      response.json(notes)
    }).catch(error => logger(error))
  })

  const getTokenFrom = request => {
    console.log(1)
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

notesRouter.post('/api/blogs', async (request,response) => {
console.log("post")
console.log(request.body)
  const token = getTokenFrom(request)
  console.log(token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json(
      { error: 'token missing or invalid' })
  }
 const user = await User.findById(decodedToken.id)

  console.log(user)
  console.log(user._id.toString())


  if (!request.body.likes) {
    request.body.likes = 0
}
if(!request.body.url || !request.body.title){
  response.status(400).end()
}


if(request.body.title && request.body.author && request.body.url){
const blog = new Blog({
  title: request.body.title,
  author: request.body.author,
  url: request.body.url,
  likes: request.body.likes,
  user: user._id
})
  

   const savedBlog = await blog.save()
          user.notes = user.notes.concat(savedBlog._id)
            response.status(201).json(savedBlog.toJSON())


        await user.save()
}
})

notesRouter.delete('/api/blogs/:id', async (request,response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
const id = request.params.id

const poistettava = await Blog.findById(id)
console.log(poistettava)
const user = await User.findById(decodedToken.id)

if(poistettava.user._id.toString() === user._id.toString()){

await Blog.findByIdAndRemove(id)
.then(result  => {response.status(204).json().end()})
.catch(error => logger(error))}

else {
  return response.status(401).json({error: 'Ei oikeuksia'})
}
})
notesRouter.put('/api/blogs/:id', async(request,response) => {
  const liket = {
    likes: request.body.likes
  }
  const id = request.params.id
 await Blog.findByIdAndUpdate(id,liket,{ new: true })
  response.status(200).end()
 
})

module.exports = notesRouter