import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Pane, Heading,Tablist, SidebarTab, Menu} from 'evergreen-ui'
import {
  CreditCardIcon, 
  ApplicationIcon,
  AutomaticUpdatesIcon, 
  AnnotationIcon, 
  VolumeUpIcon,
  Icon,
  ArrowRightIcon,
  ArrowLeftIcon
} from 'evergreen-ui'
class Set extends React.Component {
  render() {
    var tabs1 = [
      {
        path: '/latest',
        tabname: 'Thẻ ghi nhớ',
        icon: CreditCardIcon,
      },
      {
        path: '/latest',
        tabname: 'Học',
        icon: AutomaticUpdatesIcon,
      },
      {
        path: '/latest',
        tabname: 'Viết',
        icon: AnnotationIcon,
      },
      {
        path: '/latest',
        tabname: 'Chính tả',
        icon: VolumeUpIcon,
      },
      {
        path: '/latest',
        tabname: 'Kiểm tra',
        icon: ApplicationIcon,
      }
    ];

    return(
      <Pane>
          <Heading 
            size={800}
            padding={50}
            color="#303545"
          >
            Tiêu đề
          </Heading>
          <Pane
            display='flex'
          >
              <Tablist paddingLeft={20}>
                  {tabs1.map(tab =>(
                    <Link to={tab.path} style={{ textDecoration: 'none' }}>
                        <SidebarTab
                            size={400}
                            height={48}
                            width={200}
                            paddingLeft={32}
                        >
                          <Icon icon={tab.icon} marginRight={16} />
                          {tab.tabname}
                        </SidebarTab>
                    </Link>
                  ))}
              </Tablist>
              <Pane>
                <Pane
                  height={300}
                  width={550}
                  alignItems="center"
                  justifyContent="center"
                  border="default"
                  background="blueTint"
                  marginLeft={100}
                  paddingLeft={200}
                  paddingTop={140}
                >
                  <Heading size={600}>Nội dung thẻ</Heading>
                </Pane>
                <Pane
                   marginLeft={200}
                   paddingTop={20}
                   display='flex'
                >
                    <ArrowLeftIcon></ArrowLeftIcon>
                    <Heading size={400} marginLeft={130} marginRight={130}>1/2</Heading>
                    <ArrowRightIcon></ArrowRightIcon>
                </Pane>
              </Pane>
          </Pane>
          <Pane marginTop={50} marginBottom={30} paddingLeft={32}>
            <Menu.Divider />
          </Pane>
          <Pane height={500} width={1260} marginTop={50} paddingLeft={32} background="purpleTint">
            <Menu.Divider />
          </Pane>       
      </Pane>
    )
  }
}

export default Set
