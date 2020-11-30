import React, { useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Pane } from 'evergreen-ui'
import { connect } from 'react-redux'

import {
  Landing,
  Latest,
  Sets,
  Folders,
  Classes,
  CreateSet,
  EditSet,
  Set,
  Folder,
  Test,
  Learn,
  Exam,
  Game,
  CreateFolder,
  Class,
} from '../pages'
import SideBar from '../SideBar'

const routes = [
  {
    path: '/latest',
    tab: 'Home',
    page: <Latest />,
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
    page: <Folders />,
  },
  {
    path: '/classes',
    tab: 'Classes',
    page: <Classes />,
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
      <Route path="/create-set" component={CreateSet} />
      <Route path="/edit-set/:id" component={EditSet} />
      <Route path="/create-folder" component={CreateFolder} />
      <Route path="/learn/:id" component={Learn} />
      <Route path="/exam/:id" component={Exam} />
      <Route path="/game/:id" component={Game} />
      <Route path="/test" component={Test} />
      <Route path="/folders/:id" component={Folder} />
      <Route path="/classes/:id" component={Class} />
      <Route path="/set/:id" component={Set} />
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
