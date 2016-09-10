import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

import EntryContent from './EntryContent/EntryContent';

const EntryPage = ({ post }) => {
  if (post !== null) {
    return (
      <div className="container">
        <Helmet title={post.title} />
        <div className="row">
          <div className="col-sm-12">
            <EntryContent post={post} />
          </div>
        </div>
      </div>
    );
  }
  return null;
}

EntryPage.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string
  })
}

export default EntryPage;