import React from 'react';
import PropTypes from 'prop-types';

const Uusiblogi = ({ handleSubmit, setTitle, setAuthor, setUrl, suljeFormi, title, author, url }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="titleInput">Title:</label>
        <input type="text" value={title} onChange={setTitle} id="titleInput" placeholder='title'/>
      </div>
      <div>
        <label htmlFor="authorInput">Author:</label>
        <input type="text" value={author} onChange={setAuthor} id="authorInput" placeholder='author' />
      </div>
      <div>
        <label htmlFor="urlInput">URL:</label>
        <input type="text" value={url} onChange={setUrl} id="urlInput" placeholder='url'/>
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={suljeFormi}>
        Cancel
      </button>
    </form>
  );
};

Uusiblogi.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setAuthor: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
  suljeFormi: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Uusiblogi;
