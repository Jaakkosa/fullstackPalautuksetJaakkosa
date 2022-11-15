const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const Bloglist = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa74121b54a676234d17f8',
      title: 'Go To Statement Co124nsidered Harmful',
      author: 'Edsger W. D124ijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statefment Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 20,
        __v: 0
      },

    {
        _id: '5a422aa74124441b54a676234d17f8',
        title: 'Go To Statement Co44424nsidered Harmful',
        author: 'Eds444ger W. D12466ijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/c44opyright_violations/Go_To_Considered_Harmful.html',
        likes: 30,
        __v: 0
      }

  ]

describe('total likes', () => {
    
  
    test('adding all the likes together matches total likes', () => {
      const result = listHelper.totalLikes(Bloglist)
      expect(result).toBe(65)
    })
  })

  describe('total likes', () => {
    
  
    test('testing for the most liked blog', () => {
      const result = listHelper.favoriteBlog(Bloglist)
      expect(result).toEqual({
        _id: '5a422aa74124441b54a676234d17f8',
        title: 'Go To Statement Co44424nsidered Harmful',
        author: 'Eds444ger W. D12466ijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/c44opyright_violations/Go_To_Considered_Harmful.html',
        likes: 30,
        __v: 0
      })
    })
  })

  describe('most Blogs', () => {
    test('testing for most blogs', () => {
      const result = listHelper.mostBlogs(Bloglist)
      expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        blogs: 2
      })
    })
  })

  describe('most Likes', () => {
    test('testing for most likes for author', () => {
      const result = listHelper.mostLikes(Bloglist)
      expect(result).toEqual({
        author: 'Eds444ger W. D12466ijkstra',
       likes: 30
      })
    })
  })


