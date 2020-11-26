import React from 'react'
import { Heading } from 'evergreen-ui'
import { connect } from 'react-redux'
import { fetchSet, fetchSetsUser } from '../../actions/sets'

const Test = (props) => {
  return <Heading size={600}>Test</Heading>
}

const mapStateToProps = ({ sets }) => {
  return { sets }
}
export default connect(mapStateToProps, { fetchSet, fetchSetsUser })(Test)
