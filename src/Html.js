import React from 'react'
import DocumentMeta from 'react-document-meta'

const date = +new Date()

let getStyles = () => {
  if (process.env.NODE_ENV === 'production')
    return <link rel="stylesheet" href={`/main.css?${date}`} />
}

let Base = ({children}) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        {DocumentMeta.renderAsReact()}
        {getStyles()}
        <link rel="shortcut icon" href="favicon.ico" />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{__html: children}}></div>
        <script src={`/client.js?${date}`}></script>
      </body>
    </html>
  )
}

export default Base
