import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen,fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Uusiblogi from './uusiBlog'

test('renders content', () => {
  const blog = {
    title:"Test Title",

  }



  render(<Blog blog={blog} />)


  const titleElement = screen.getByText(/Test\s+Title/);

  expect(titleElement).toBeDefined();
})


test('renders content after button push', async() => {
    const blog = {
        title: "Test Title",
        author: "author",
        url: "https://example.com",
        likes: 42,
    }
  
    


  
    render(<Blog blog={blog}/>)
  
    const user = userEvent.setup()
    const button = screen.getByText('Info');
     await user.click(button)

     screen.debug()
  
     expect(screen.getByText(/Author:\s*author/)).toBeInTheDocument();
     expect(screen.getByText(/URL:\s*https:\/\/example\.com/)).toBeInTheDocument();
     expect(screen.getByText(/Likes:\s*42/)).toBeInTheDocument();
  })


  test('likeä klikattu 2x', async () => {
    
    const likeBlogiMock = jest.fn();
  
    const blog = {
      title: "Test Title",
      author: "author",
      url: "https://example.com",
      likes: 42,
    };
  
   render(<Blog blog={blog} likeBlogi={likeBlogiMock} />);
  
    const user = userEvent.setup()

   
    const infoButton = screen.getByText('Info');
    await user.click(infoButton);


    const likeButton = screen.getByText('Like');

await user.click(likeButton)
await user.click(likeButton)

   

    
      expect(likeBlogiMock.mock.calls).toHaveLength(2)
  });


