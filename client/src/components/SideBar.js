import React from 'react'
import {
  ApplicationsIcon,
  Icon,
  FolderCloseIcon,
  PeopleIcon,
  HomeIcon,
  CogIcon,
  TimelineBarChartIcon,
} from 'evergreen-ui'
import { Link } from 'react-router-dom'
import { Pane, Tablist, SidebarTab } from 'evergreen-ui'
import { Menu } from 'evergreen-ui'

const tabs1 = [
  {
    path: '/latest',
    tab: 'Home',
    icon: HomeIcon,
  },
  {
    path: '/progress',
    tab: 'Progress',
    icon: TimelineBarChartIcon,
  },
  {
    path: '/settings',
    tab: 'Settings',
    icon: CogIcon,
  },
]

const tabs2 = [
  {
    path: '/sets',
    tab: 'Sets',
    icon: ApplicationsIcon,
  },
  {
    path: '/folders',
    tab: 'Folders',
    icon: FolderCloseIcon,
  },
  {
    path: '/classes',
    tab: 'Classes',
    icon: PeopleIcon,
  },
]

const SideBar = (props) => (
  <Pane paddingTop={24} marginBottom={16} flexBasis={264} className="sidebar" elevation={2}>
    <Tablist>
      {tabs1.map(({ path, tab, icon }) => (
        <Link to={path} key={tab} id={tab}>
          <SidebarTab
            isSelected={tab === props.selectedTab}
            size={400}
            height={48}
            paddingLeft={32}
          >
            <Icon icon={icon} marginRight={16} />
            {tab}
          </SidebarTab>
        </Link>
      ))}
      <Pane marginTop={16} marginBottom={16}>
        <Menu.Divider />
      </Pane>
      {tabs2.map(({ path, tab, icon }) => (
        <Link to={path} key={tab} id={tab}>
          <SidebarTab
            isSelected={tab === props.selectedTab}
            size={400}
            height={48}
            paddingLeft={32}
          >
            <Icon icon={icon} marginRight={16} />
            {tab}
          </SidebarTab>
        </Link>
      ))}
    </Tablist>
  </Pane>
)

export default SideBar
