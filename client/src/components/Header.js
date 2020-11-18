import React from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Pane, Button, Heading } from 'evergreen-ui'

class Header extends React.Component {
  logOut = () => {
    console.log(this.props)
    document.cookie =
      'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    document.cookie =
      'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    window.open('/', '_self')
  }
  renderContent() {
    switch (this.props.auth) {
      case null:
        return
      case false:
        return (
          <li>
            <Button onClick={googleOauth}>Login with Google</Button>
          </li>
        )
      default:
        return (
          <li>
            <Button onClick={this.logOut}>Logout</Button>
          </li>
        )
    }
  }
  render() {
    return (
      <Pane display="flex" background="#4257b2" className="header">
        <Pane flex={1} alignItems="center" display="flex">
          <Link
            to={this.props.auth ? '/latest' : '/'}
            style={{ textDecoration: 'none' }}
          >
            <Heading size={800} color="#F9F9FB">
              <strong>Quizlet</strong>
            </Heading>
          </Link>
        </Pane>
        <Pane alignItems="center" display="flex">
          {this.renderContent()}
        </Pane>
      </Pane>
    )
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth }
}

const googleOauth = () => {
  window.open('/auth/google', '_self')
}

export default connect(mapStateToProps)(withRouter(Header))
