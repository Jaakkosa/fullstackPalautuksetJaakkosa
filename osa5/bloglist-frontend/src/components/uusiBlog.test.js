import React from 'react'
import { render, screen } from '@testing-library/react'
import Uusiblogi from './uusiBlog'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

test('<UusiBlogi toimii', async () => {
    const teeBlogimock = jest.fn()
    const user = userEvent.setup() 

    render(<Uusiblogi handleSubmit={teeBlogimock} />)

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const sendButton = screen.getByText('Submit')

   await user.type(titleInput, 'Test Title')
  await  user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'www.google.com')
 await    user.click(sendButton)

    expect(teeBlogimock.mock.calls).toHaveLength(1)

})