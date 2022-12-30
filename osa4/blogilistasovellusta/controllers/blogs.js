const notesRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

notesRouter.get('/api/blogs', (request, response) => {
  console.log("blogslisted")
   Blog.find({}).then(notes => {
      response.json(notes)
    }).catch(error => logger(error))
  })

notesRouter.post('/api/blogs', async (request,response) => {
  
console.log(request.body)
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
})
  

   await blog.save()
        .then(result => {
            response.status(201).json(result.toJSON())
        }).catch(error => console.log(error))
}
})

notesRouter.delete('/api/blogs/:id', async (request,response) => {
  console.log("delete started")
const id = request.params.id
const poistettava = await Blog.findById(id)
await Blog.findByIdAndRemove(id)
.then(result  => {response.status(204).json().end()})
.catch(error => logger(error))
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