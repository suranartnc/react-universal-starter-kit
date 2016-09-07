import React from 'react'
import style from 'shared/theme/styles/app.scss'

export default (story) => (
    <div style={style}>
      {story()}
    </div>
)
