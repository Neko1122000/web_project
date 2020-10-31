import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Routes from './routes/Routes'

import * as actions from '../actions'
import Header from './Header'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <Routes />
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App)
