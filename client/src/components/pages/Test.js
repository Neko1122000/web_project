import React from 'react'
import { Button } from 'evergreen-ui'
import { connect } from 'react-redux'
import * as action from '../../actions'

class Test extends React.Component {
  test = () => {
    // action.editFolderSets('5fc389202934531d8ce5cf14', {
    //   sets: ['5fc1b600d6d6ea1ae0692a3e', '5fc23c29259b8c1bfc4c8cfc'],
    // })
    this.props.fetchFolder('5fc389202934531d8ce5cf14')
    this.props.fetchFoldersUser()
    this.props.fetchSetsUser()
  }
  render() {
    return <Button onClick={this.test}>Test</Button>
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps, action)(Test)
