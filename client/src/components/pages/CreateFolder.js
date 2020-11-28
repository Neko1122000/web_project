import React from 'react'
import { Heading } from 'evergreen-ui'
import { connect } from 'react-redux'
import { fetchSet, fetchSetsUser } from '../../actions'

const Test = (props) => {
  console.log('p:')
  props.fetchSet('5fb4f8cd0da1be32a047f48e')
  console.log(props)
  return <Heading size={600}>Test</Heading>
}

const mapStateToProps = ({ sets }) => {
  return { sets }
}
export default connect(mapStateToProps, { fetchSet, fetchSetsUser })(Test)
