const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

jest.setTimeout(20000) // jostain syystä mongodb tarvitsi lisäaikaa


const initialNotes = [
 {
  title: "blogi",
  author: "jaakko",
  url: "www.keis.com",
  likes: undefined,
  id: "6373329a61830c0d8addec05"
 },
 {
  title: "bl4ogi",
  author: "jaa4kko",
  url: "www.k4eis.com",
  likes: 6,
  id: "6373334a61830c0d8addec08"
 }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialNotes[0])

  await blogObject.save()

  blogObject = new Blog(initialNotes[1])

  await blogObject.save()
 
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})



test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  console.log(response.body)
    expect(response.body).toHaveLength(2)
  })
  
  test('blogs are identified with id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined();
  })

  test('a blog is added with POST', async () => {
    const uusiBlogi = { 
    title: "kirjaa",
    author: "jakee",
    url: "https://www.4chan.org",
    likes: 7
    }
    console.log(uusiBlogi)
    await api
    .post('/api/blogs')
    .send(uusiBlogi)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3);
  })
  test('likes are 0 by default', async () => {
    const uusiBlogi = { 
      title: "kirjaa",
      author: "jakee",
      url: "https://www.4chan.org",
      }
      console.log(uusiBlogi)
      await api
      .post('/api/blogs')
      .send(uusiBlogi)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      const response = await api.get('/api/blogs')
      expect(response.body[initialNotes.length].likes).toBe(0)
  })

  test('modifying blog', async () => {
    const muutettavaBlogi =  { 
        likes: 10,
        }
    console.log(muutettavaBlogi)
        const Blogit = await api.get('/api/blogs/')
     const muutos = await api
      .put(`/api/blogs/${Blogit.body[0].id}`)
      .send(muutettavaBlogi)
      .expect(200)

      const uudetBlogit = await api.get('/api/blogs/')
      expect(uudetBlogit.body[0].likes).toBe(10)

    })

  test('deleting a single blog', async () => {
    const Blogit = await api.get('/api/blogs/')
    console.log(Blogit,"blogit")
    await api
    .delete(`/api/blogs/${Blogit.body[0].id}`)
    .expect(204)

    const response = await api.get(`/api/blogs`)
     expect(response.body).toHaveLength(1)
   
  })

  test('title and url missing', async () => {
    const uusiBlogi = { 
      author: "jakee",
      likes: 7,
     
      }
     
      await api
      .post('/api/blogs')
      .send(uusiBlogi)
      .expect(400)
  }) 

  

  afterAll(() => {
    mongoose.connection.close()
  })
  