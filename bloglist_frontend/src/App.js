import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import Blog from './components/Blog';
import loginService from './services/login';


/* const Contents = () => {
  if (user === null) {
    return (
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
                console.log(username);
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
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};
 */

const App = () => {
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const usr = await loginService.login({
        username, password,
      });

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

  /*   const blogForm = () => (
    <div>
      <h2>blogs</h2>
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
              console.log(username);
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
      </form>
    </div>
  ); */

  const contents = () => {
    if (user === null) {
      return (
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
                  console.log(username);
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
          </form>
        </div>
      );
    }
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      </div>
    );
  };

  return (
    <div>
      {contents()}
    </div>
  );

/*   return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  );
*/
};

export default App;
