import React from 'react'
import { Button } from 'evergreen-ui'
import { connect } from 'react-redux'
import * as action from '../../actions'

class Test extends React.Component {
  test = () => {
    // action.createClass({
    //   name: '123',
    //   description: '213',
    //   address: '123',
    //   allow_member_change: true,
    // })

    this.props.fetchClasses()
    this.props.fetchSetsUser()
  }
  render() {
    return <Button onClick={this.test}>Test</Button>
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps, action)(Test)
