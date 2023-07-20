import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Uusiblogi from './components/uusiBlog'




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
const likeBlogi = async (id) => {

  try {
await blogService.like(id)
return true
  }
  catch (error) {
    console.log("Error liking blog:", error);
    return false;
  }
}
  const deleteBlogi = async (id) => {
    
    console.log(id)
   
    try {
    await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id));
      return true;
    } catch (error) {
      console.log("Error deleting blog:", error);
      return false;
    }
  };

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
        blogService.getAll()
        .then(updatedBlogs => {
          setBlogs(updatedBlogs);
        })
                        .catch(error => {
          console.log("Failed to fetch blogs:", error);
        }   );
        setTimeout(() => {
          setLuotu(null)
     
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

  

  return (
    <div>
      <h2>Blogs</h2>
    {errorMessage && <div style={{color: 'orange'}}>{errorMessage}</div>}
        {luotu && <div style={{color: 'green'}}>{luotu}</div>}
 {!user && loginForm()} 

        {user && 
        <div>
           <button onClick={handleLogout}>Logout</button>
          <p>{user.name} kirjautunut</p>
         

          <button type="button" onClick={avaaFormi}>Uus blogi</button>
             {showNewBlogForm && <Uusiblogi 
              handleSubmit = {handleSubmit}
              setTitle= {(e) => setTitle(e.target.value)}
              setAuthor= {(e) => setAuthor(e.target.value)}
              setUrl= {(e) => setUrl(e.target.value)}
               suljeFormi={suljeFormi}
               title={title}
               author={author}
               url={url}
               />}

                {blogs.sort((enemmän,vähemmän) => vähemmän.likes - enemmän.likes)
                .map(blog =>
            <Blog key= {blog.id} blog={blog} deleteBlogi={deleteBlogi} likeBlogi={likeBlogi} user={user} />
          )}
        </div>
      } 
    </div>
  )
}

export default App
