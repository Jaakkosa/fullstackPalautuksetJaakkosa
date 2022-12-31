const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const api = supertest(app)

const Blog = require('../models/blog')
const { response } = require('../app')

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

  describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await api.get('/api/users')
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await api.get('/api/users')
      expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length + 1)
  
      const usernames = usersAtEnd.body.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
    test('error occurs if password  is too short', async () => {
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'sa',
      }
     const testi =  await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

      .expect('Content-Type', /application\/json/)

      expect(testi.body.error).toBe("a password must be defined and it must be 3 characters or longer")

    })

    test('error occurs if password doesnt exist', async () => {
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
      }
      const testi = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(testi.body.error).toBe("a password must be defined and it must be 3 characters or longer")

    
    })
    test('error occurs if username doesnt exist', async () => {
      const newUser = {
        name: 'Matti Luukkainen',
       password: 'askdjk123'
      }
      const testi = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(testi.body.error).toBe('a username must be defined')
    
    })

    test('error occurs if username isnt unique', async () => {
      const newUser = {
        username: 'root',
       password: 'askdjk123'
      }
      const testi = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(testi.body.error).toBe("username must be unique")
    
    })

  })

  afterAll(() => {
    mongoose.connection.close()
  })
  