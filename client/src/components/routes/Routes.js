import React, { useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Pane } from 'evergreen-ui'
import { connect } from 'react-redux'

import { Landing, Test, Sets } from '../pages'
import SideBar from '../SideBar'

const routes = [
  {
    path: '/latest',
    tab: 'Home',
    page: <Landing />,
  },
  {
    path: '/progress',
    tab: 'Progress',
    page: <Landing />,
  },
  {
    path: '/settings',
    tab: 'Settings',
    page: <Landing />,
  },
  {
    path: '/sets',
    tab: 'Sets',
    page: <Sets />,
  },
  {
    path: '/folders',
    tab: 'Folders',
    page: <Test />,
  },
  {
    path: '/classes',
    tab: 'Classes',
    page: <Test />,
  },
]

const Routes = (props) => {
  const [selectedTab, changeTab] = useState('Sets')
  return (
    <Pane display="flex" height={1000}>
      <Route exact path="/">
        {props.auth ? <Redirect to="/latest" /> : <Landing />}
      </Route>
      <Route path={routes.map((route) => route.path)}>
        <SideBar selectedTab={selectedTab} />
      </Route>
      <Switch>
        {routes.map(({ path, tab, page }, index) => (
          <Route key={index} path={path} exact>
            <Pane background="tint1" flex="1">
              <DummyPage onPageLoad={() => changeTab(tab)}>{page}</DummyPage>
            </Pane>
          </Route>
        ))}
      </Switch>
    </Pane>
  )
}

class DummyPage extends React.Component {
  componentDidMount = () => {
    console.log(this.props.children)
    this.props.onPageLoad()
  }
  render() {
    return <div>{this.props.children}</div>
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps)(Routes)
