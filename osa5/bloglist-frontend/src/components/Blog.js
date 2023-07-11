import { useState } from "react"
import axios from "axios";



const Blog = ({ blog, deleteBlogi}) => {

  const [showNewBlogForm, setShowNewBlogForm] = useState(false)
  const [likes, setLikes] = useState(blog.likes);

  const handleLike = async () => {
    try {
      const updatedBlog = { ...blog, likes: likes + 1 };
      await axios.put(`/api/blogs/${blog.id}`, updatedBlog);
      setLikes(likes + 1);
    } catch (error) {
      console.log("errori tykkäyksissä:", error);
    }
  };


  const handleDelete = async () => {
  if (window.confirm(`Are you sure you want to delete the blog "${blog.title}"?`)) {
    try {
     
      const deleted = await deleteBlogi(blog.id)
      if (deleted) {
        console.log("Blog deleted");
      }
    } catch (error) {
      console.log("Error deleting blog:", error);
    }
  }
};


  const avaaFormi = () => {
    setShowNewBlogForm(true)
    setButton(<button type="button" onClick={suljeFormi}>hide</button>)
      }
  const [button, setButton] = useState(<button type="button" onClick={avaaFormi}>Info</button>)

  const suljeFormi = () => {

      setShowNewBlogForm(false)
      setButton(<button type="button" onClick={avaaFormi}>Info</button>)
    
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const RestOfInfo = () => {
    return(
      <div>
    Author:{blog.author} URL:{blog.url} Likes: {likes} 
    <button onClick={handleLike}>Like</button>
    <button onClick={handleDelete}>Delete</button>

    </div>
  )
    }
  return (

    
  <div style={blogStyle}>
    {button}
    Title:{blog.title} {showNewBlogForm && <RestOfInfo/>}
   

  </div>  
)
}
export default Blog