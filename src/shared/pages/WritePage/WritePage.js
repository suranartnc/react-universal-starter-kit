import React, { Component } from 'react'

if (process.env.BROWSER === true) {
  var WriteEditor = require('./WriteEditor').default;
}

const WritePage = (props) => {
  if (WriteEditor) {
    return <WriteEditor />
  }
  return null
}

export default WritePage