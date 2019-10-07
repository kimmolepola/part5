import React, { useState } from 'react';
import blogService from '../services/blogs';
import Togglable from './Togglable';

/* eslint-disable react/prop-types */
const NewBlogForm = ({ states, notify }) => {
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');

  const noteFormRef = React.createRef();

  const handleCreateNewBlog = async (event) => {
    event.preventDefault();
    noteFormRef.current.toggleVisibility();
    try {
      const response = await blogService.create({
        title, author, url,
      });
      states.setBlogs(states.blogs.concat(response));
      setTitle('');
      setAuthor('');
      setUrl('');
      notify(`a new blog ${title} by ${author} added`, 'success');
    } catch (exception) {
      notify('Failed', 'error');
    }
  };

  return (
    <div>
      <Togglable buttonLabel="new note" ref={noteFormRef}>
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
      </Togglable>
    </div>
  );
};
/* eslint-enable react/prop-types */

export default NewBlogForm;
