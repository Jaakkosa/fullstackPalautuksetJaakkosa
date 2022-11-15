const notesRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')

notesRouter.get('/api/blogs', (request, response) => {
   Blog.find({}).then(notes => {
      response.json(notes)
    }).catch(error => console.log(error))
  })

notesRouter.post('/api/blogs'), (request,response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })

}

module.exports = notesRouter