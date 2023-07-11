import React from 'react';
import PropTypes from 'prop-types'



const Uusiblogi = ({ handleSubmit, setTitle, setAuthor, setUrl, suljeFormi, title, author, url }) => {
 

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={setTitle} />
      </div>
      <div>
        <label>Author:</label>
        <input type="text" value={author} onChange={setAuthor} />
      </div>
      <div>
        <label>URL:</label>
        <input type="text" value={url} onChange={setUrl} />
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
}


export default Uusiblogi;
