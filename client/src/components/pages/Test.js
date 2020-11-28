import React from 'react'
import { Button } from 'evergreen-ui'
import { connect } from 'react-redux'
import * as action from '../../actions'

class Test extends React.Component {
  test = () => {
    this.props.fetchSet('5fc1b600d6d6ea1ae0692a3e')
  }
  render() {
    return <Button onClick={this.test}>Test</Button>
  }
}

export default connect(null, action)(Test)
