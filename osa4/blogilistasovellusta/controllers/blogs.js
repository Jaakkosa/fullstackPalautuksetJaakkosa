const notesRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

notesRouter.get('/api/blogs', (request, response) => {
   Blog.find({}).then(notes => {
      response.json(notes)
    }).catch(error => logger(error))
  })

notesRouter.post('/api/blogs'), (request,response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        }).catch(error => logger(error))

}

module.exports = notesRouter