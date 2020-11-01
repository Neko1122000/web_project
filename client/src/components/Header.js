import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pane, Button, Heading } from 'evergreen-ui'

class Header extends React.Component {
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
            <Button>
              <a href="/api/logout">Logout</a>
            </Button>
          </li>
        )
    }
  }
  render() {
    return (
      <Pane display="flex" background="#4257b2" className="header">
        <Pane flex={1} alignItems="center" display="flex">
          <Link
            to={this.props.auth ? '/test' : '/'}
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

export default connect(mapStateToProps)(Header)
