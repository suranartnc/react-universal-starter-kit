import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

import EntryContent from './EntryContent/EntryContent';

const EntryPage = ({ post }) => {
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

EntryPage.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string
  }).isRequired
}

export default EntryPage;