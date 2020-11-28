import React from 'react'
import { Button } from 'evergreen-ui'
import { connect } from 'react-redux'
import * as action from '../../actions'

class Test extends React.Component {
  test = () => {
    this.props.fetchSetsUser()
  }
  render() {
    return <Button onClick={this.test}>Test</Button>
  }
}

export default connect(null, action)(Test)
