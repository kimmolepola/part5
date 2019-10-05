import PropTypes from 'prop-types';
import React, { useState } from 'react';
import blogService from '../services/blogs';

const NewBlogForm = ({ states }) => {
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');

  const handleCreateNewBlog = async (event) => {
    event.preventDefault();
    try {
      const response = await blogService.create({
        title, author, url,
      });
      states.setBlogs(states.blogs.concat(response));
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      states.setErrorMessage('Failed');
      setTimeout(() => {
        states.setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNewBlog}>
        <div>
            title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />
        </div>
        <div>
            author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => {
              setAuthor(target.value);
            }}
          />
        </div>
        <div>
            url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => {
              setUrl(target.value);
            }}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};


NewBlogForm.propTypes = {
  states: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default NewBlogForm;
