import React, { Component, PropTypes } from 'react'
import Post from 'shared/components/Post/Post';

const HomePage = ({ posts }) => (
  <div className="container">
    <div className="row">
      <div className="col-md-8">
        {posts.map((post, index) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
      <div className="col-md-4"></div>
    </div>
  </div>
)

HomePage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    tags: PropTypes.array
  })).isRequired
}

export default HomePage;