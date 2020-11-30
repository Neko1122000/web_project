import React from 'react'
import { Button } from 'evergreen-ui'
import { connect } from 'react-redux'
import * as action from '../../actions'

class Test extends React.Component {
  test = () => {
    action.editFolderSets('5fc543a268cae4f0f3774aee', {
      sets: ['5fc23f38f156464895448515', '5fc2414ef15646489544851d','5fc2420bf156464895448520'],
    })
    
    this.props.fetchFolder('5fc543a268cae4f0f3774aee')
    this.props.fetchFoldersUser()
    this.props.fetchSetsUser()
  }
  render() {
    return <Button onClick={this.test}>Test</Button>
  }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps, action)(Test)
