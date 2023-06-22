import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('token')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log("loginpressed")
      console.log(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'token', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(window.localStorage.getItem('token'))
    } catch (exception) {
      console.log(exception) // Add this line to log the actual exception
      setErrorMessage('väärä käyttis tai')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="käyttis"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="salasana"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  return (
    <div>
      <h2>Blogs</h2>

      {errorMessage && <div style={{color: 'orange'}}>{errorMessage}</div>}

      {!user && loginForm()} 
      {user && 
        <div>
          <p>{user.name} logged in</p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      } 
    </div>
  )
}

export default App
