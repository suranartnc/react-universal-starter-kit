import React from 'react'

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - 16px)'
}

export default (story) => (
  <div style={style}>
    {story()}
  </div>
)
