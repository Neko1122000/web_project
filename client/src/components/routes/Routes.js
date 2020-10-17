import React, {useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Pane} from 'evergreen-ui'
import {Landing, Test} from '../pages'
import SideBar from '../SideBar'

const routes = [
	{
		path: '/latest',
		tab: 'Home',
		page: <Landing/>,
	},
	{
		path: '/progress',
		tab: 'Progress',
		page: <Landing/>,
	},
	{
		path: '/settings',
		tab: 'Settings',
		page: <Landing/>,
	},
	{
		path: '/sets',
		tab: 'Sets',
		page: <Landing/>,
	},
	{
		path: '/folders',
		tab: 'Folders',
		page: <Test/>
	},
	{
		path: '/classes',
		tab: 'Classes',
		page: <Test/>
	}
]

const Routes = () => {
		const [selectedTab, changeTab] = useState('Sets')
		return (
		<Pane display="flex" height={1000}>
			<SideBar selectedTab={selectedTab}/>
			<Switch>
				{routes.map(( {path, tab, page}, index )  => (
					<Route key={index} path={path} exact >
							<Pane paddingLeft={160} paddingTop={32} background="tint1" flex="1">
								<DummyPage onPageLoad={() => changeTab(tab)}>
									{page}
								</DummyPage>
							</Pane>
					</Route>
				))}
			</Switch>
		</Pane>)
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

export default Routes;