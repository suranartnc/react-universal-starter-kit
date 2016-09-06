import React, { Component } from 'react'

if (process.env.BROWSER === true) {
  var WriteEditor = require('./WriteEditor').default;
}

const WritePage = (props) => {
  if (WriteEditor) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <WriteEditor onFormSubmit={props.onFormSubmit} />
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default WritePage