import {Children} from 'react'

let Base = ({children}) => {
  return Children.only(children)
}

export default Base
