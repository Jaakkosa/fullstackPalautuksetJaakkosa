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
  const [luotu,setLuotu] = useState(null)
  const [showNewBlogForm, setShowNewBlogForm] = useState(false)

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
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'token', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('väärä käyttis tai')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.location.reload();
  };

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      author,
      url
    };

    blogService.create(data)
      .then(response => {
        setLuotu(`${author} luoma blogi ${title} lisäty!`)
        setTimeout(() => {
          setLuotu(null)
          window.location.reload();
        }, 5000)
      })
      .catch(error => {
        console.log("lähetys kusi",error);
      });

    setShowNewBlogForm(false)
  };

  const avaaFormi = () => {
    setShowNewBlogForm(true)
  }

  const suljeFormi = () => {
    setShowNewBlogForm(false)
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

  const newBlogForm = () => (
    <form onSubmit={handleSubmit}>
      <div>
        <label >Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label >Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label >URL:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={suljeFormi}>Cancel</button>
    </form>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <button onClick={handleLogout}>Logout</button>
    {errorMessage && <div style={{color: 'orange'}}>{errorMessage}</div>}
        {luotu && <div style={{color: 'green'}}>{luotu}</div>}
 {!user && loginForm()} 
        {user && 
        <div>
          <p>{user.name} kirjautunut</p>
         

          <button type="button" onClick={avaaFormi}>Uus blogi</button>
             {showNewBlogForm && newBlogForm()}

                {blogs.map(blog =>
            <Blog key= {blog.id} blog={blog} />
          )}
        </div>
      } 
    </div>
  )
}

export default App
