import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import Blog from './components/Blog';
import loginService from './services/login';

const App = () => {
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService
      .getAll().then((initialBlogs) => {
        setBlogs(initialBlogs);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const usr = JSON.parse(loggedUserJSON);
      setUser(usr);
      blogService.setToken(usr.token);
    }
  }, []);


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const usr = await loginService.login({
        username, password,
      });
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(usr),
      );
      blogService.setToken(usr.token);
      setUser(usr);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const CreateNewBlog = () => {
    const handleCreateNewBlog = async (event) => {
      event.preventDefault();
      try {
        const response = await blogService.create({
          title, author, url,
        });
        setBlogs(blogs.concat(response));
        setTitle('');
        setAuthor('');
        setUrl('');
      } catch (exception) {
        setErrorMessage('Failed');
        setTimeout(() => {
          setErrorMessage(null);
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

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in
        <button onClick={handleLogout} type="button">logout</button>
      </p>
      {CreateNewBlog()}
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          />
        </div>
        <div>
            password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  );
};

export default App;
