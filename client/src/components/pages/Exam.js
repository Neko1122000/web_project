import React from 'react'
import { Button } from 'evergreen-ui'
import { connect } from 'react-redux'
import { fetchSet } from '../../actions'

class Test extends React.Component {
  componentDidMount() {
    this.props.fetchSet(this.props.location.pathname.substring(5))
  }
  render() {
    console.log(this.props.sets)
    return <Button>Exam</Button>
  }
}

const mapStateToProps = ({ sets }) => {
  return { sets: { ...sets }.data }
}

export default connect(mapStateToProps, { fetchSet })(Test)
