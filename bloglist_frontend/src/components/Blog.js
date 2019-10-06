import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const hideWhenExpanded = {
    display: expanded ? 'none' : '',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const showWhenExpanded = {
    display: expanded ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {/* eslint-disable-next-line */}
      <div style={hideWhenExpanded} onClick={() => toggleExpanded()}>
        {blog.title} {blog.author}
      </div>
      {/* eslint-disable-next-line */}
      <div style={showWhenExpanded} onClick={() => toggleExpanded()}>
        {blog.title} {blog.author}<br />
        <a href={blog.url}>{blog.url}</a><br />
        {blog.likes}<button type="button">like</button> <br />
        added by {blog.user.name}
      </div>
    </div>
  );
};

export default Blog;
