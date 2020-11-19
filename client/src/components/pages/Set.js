import React from 'react'
import { useParams } from 'react-router-dom'

const Set = () => {
  let { id } = useParams()
  return <p>{id}</p>
}

export default Set
