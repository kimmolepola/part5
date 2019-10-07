import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import NewBlogForm from './components/NewBlogForm';
import Blog from './components/Blog';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const states = {
    blogs,
    setBlogs,
    username,
    setUsername,
    password,
    setPassword,
    user,
    setUser,
  };

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
      blogService.setConfig(usr.token);
    }
  }, []);

  const notify = (message, className) => {
    setNotification({ message, className });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleBlogDelete = async (id, title, author) => {
    if (window.confirm(`remove blog ${title} by ${author}`)) { // eslint-disable-line no-alert
      const response = await blogService.remove(id);
      if (response.status === 204) {
        const newBlogs = blogs.reduce((result, x) => {
          if (x.id !== id) {
            result.push(x);
          }
          return result;
        }, []);
        setBlogs(newBlogs);
      } else {
        notify('failed', 'error');
      }
    }
  };

  const handleBlogUpdate = async (content) => {
    const response = await blogService.put(content);
    const newBlogs = blogs.map((blg) => {
      if (blg.id === response.id) {
        const fullContent = { ...response };
        fullContent.user = blg.user;
        return fullContent;
      }
      return blg;
    });
    setBlogs(newBlogs);
  };

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
      blogService.setConfig(usr.token);
      setUser(usr);
      setUsername('');
      setPassword('');
    } catch (exception) {
      notify('Wrong username or password', 'error');
    }
  };

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>{user.name} logged in
        <button onClick={handleLogout} type="button">logout</button>
      </p>
      <NewBlogForm states={states} notify={notify} />
      {blogs.sort((a, b) => a.likes - b.likes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleBlogUpdate={handleBlogUpdate}
          handleBlogDelete={handleBlogDelete}
          user={user}
        />
      ))}
    </div>
  );

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification notification={notification} />
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
