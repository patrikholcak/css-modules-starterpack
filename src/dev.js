import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {Router, match, RoutingContext} from 'react-router'
import {renderToStaticMarkup} from 'react-dom/server'
import routes from './routes'
import Html from './Html'


if (process.env.NODE_ENV !== 'production') {
  ReactDOM.render(
    <Router history={createBrowserHistory()}>
      {routes}
    </Router>, document.getElementById('app')
  )
}

export default (props, callback) => {
  match({routes, location: props.path}, (error, redirectLocation, renderProps) => {
    var Base = React.createElement(Html, {
      children: renderToStaticMarkup(<RoutingContext {...renderProps} />)
    })

    return callback(null, `<!doctype html>${renderToStaticMarkup(Base)}`)
  })
}
