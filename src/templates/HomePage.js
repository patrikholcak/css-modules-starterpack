import React, {Component} from 'react'
import DocumentMeta from 'react-document-meta'
import styles from '../styles/components/home-page.css'

export default class HomePage extends Component {
  render() {
    const metaData = {
      title: 'CSS Modules Demo',
      description: 'Working demo of CSS Modules with webpack'
    }

    return (
      <div id="page">
        <DocumentMeta {...metaData} />
        <div className={styles.text}>
          Hello world!
        </div>
      </div>
    )
  }
}
