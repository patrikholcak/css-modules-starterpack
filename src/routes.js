import React from 'react'
import {Route, IndexRoute} from 'react-router'

// Components
import Base from './templates/Base'
import HomePage from './templates/HomePage'

export default (
  <Route path="/" component={Base}>
    <IndexRoute component={HomePage} />
  </Route>
)
