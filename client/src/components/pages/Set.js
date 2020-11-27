import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Pane,
  Heading,
  Tablist,
  SidebarTab,
  Menu,
  Avatar,
  Popover,
  Button,
  Position,
  Table,
} from 'evergreen-ui'
import {
  CreditCardIcon,
  ApplicationIcon,
  AutomaticUpdatesIcon,
  AnnotationIcon,
  VolumeUpIcon,
  Icon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from 'evergreen-ui'
class Set extends React.Component {
  state = {
    slideIndex: 1,
    status: false,
    data: [
      {
        _id: '1',
        is_active: true,
        created_at: '2020-11-18T10:58:18.956Z',
        title: 1,
        description: 'số 1',
        language: 'VN',
        __v: 0,
      },
      {
        _id: '2',
        is_active: true,
        created_at: '2020-11-18T10:58:18.956Z',
        title: 2,
        description: 'số 2',
        language: 'VN',
        __v: 0,
      },
      {
        _id: '3',
        is_active: true,
        created_at: '2020-11-18T10:58:18.956Z',
        title: 3,
        description: 'số 3',
        language: 'VN',
        __v: 0,
      },
      {
        _id: '4',
        is_active: true,
        created_at: '2020-11-18T10:58:18.956Z',
        title: 4,
        description: 'số 4',
        language: 'VN',
        __v: 0,
      },
    ],
  }
  backward() {
    var length = this.state.data.length
    this.setState({
      slideIndex:
        --this.state.slideIndex > 0 ? this.state.slideIndex : length,
      status: true,
    })
  }

  next() {
    var length = this.state.data.length
    this.setState({
      slideIndex:
        ++this.state.slideIndex <= length ? this.state.slideIndex : 1,
      status: true,
    })
  }
  render() {
    var flash_cards = this.state.data
    var tabs1 = [
      {
        path: '/latest',
        tabname: 'Thẻ ghi nhớ',
        icon: CreditCardIcon,
      },
      {
        path: '/learn',
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
      },
    ]
    return (
      <Pane className="noselect">
        <Pane>
          <Heading size={900} padding={50} color="#303545" fontWeight={700}>
            Tiêu đề
          </Heading>
          <Pane display="flex">
            <Tablist paddingLeft={20}>
              {tabs1.map((tab, index) => (
                <Link
                  key={index}
                  to={tab.path}
                  style={{ textDecoration: 'none' }}
                >
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
                border="default"
                marginLeft={100}
                background="blueTint"
                textAlign="center"
                paddingTop={140}
                elevation={4}
                onClick={() => {
                  this.setState({ status: !this.state.status })
                }}
              >
                <Heading size={600}>
                  {this.state.status
                    ? flash_cards[this.state.slideIndex - 1].title
                    : flash_cards[this.state.slideIndex - 1].description}
                </Heading>
              </Pane>
              <Pane marginLeft={160} paddingTop={20} display="flex">
                <Button
                  onClick={() => {
                    this.backward()
                  }}
                >
                  {' '}
                  <ArrowLeftIcon />
                </Button>
                <Heading
                  size={400}
                  textAlign="center"
                  marginLeft={150}
                  marginRight={130}
                >
                  {this.state.slideIndex + '/' + this.state.data.length}
                </Heading>
                <Button
                  onClick={() => {
                    this.next()
                  }}
                >
                  {' '}
                  <ArrowRightIcon />
                </Button>
              </Pane>
            </Pane>
          </Pane>
          <Pane marginTop={50} marginBottom={30} paddingLeft={32}>
            <Menu.Divider />
            <Pane
              height={100}
              display="flex"
              backgroundColor="white"
              alignItems="center"
              paddingLeft={32}
              paddingTop={32}
              justifyContent="space-between"
            >
              <Pane display="flex">
                <Avatar
                  src={this.props.user.image_link}
                  name={this.props.user.username}
                  size={75}
                />
                <Pane
                  paddingLeft={15}
                  paddingTop={30}
                  display="flex"
                  height={100}
                  flexDirection="column"
                >
                  <Heading size={600} fontWeight={700} marginRight={40}>
                    {this.props.user.username}
                  </Heading>
                </Pane>
              </Pane>
              <Popover
                position={Position.BOTTOM_LEFT}
                content={
                  <Menu>
                    <Menu.Group>
                      <Menu.Item icon={VolumeUpIcon}>Tùy chỉnh</Menu.Item>
                      <Menu.Item icon={CreditCardIcon}>Điểm</Menu.Item>
                      <Menu.Item icon={AnnotationIcon}>In</Menu.Item>
                    </Menu.Group>
                    <Menu.Divider />
                  </Menu>
                }
              >
                <Button marginRight={16}>With Icons</Button>
              </Popover>
            </Pane>
          </Pane>
        </Pane>
        <Pane>
          <Pane
            width={1260}
            marginTop={50}
            paddingLeft={32}
            paddingBottom={32}
            background="purpleTint"
          >
            <Table paddingTop={50} height="100%">
              <Table.Head>
                <Table.TextHeaderCell>
                  <Heading size={700} fontWeight={700} paddingBottom={30}>
                    Thuật ngữ học trong phần này
                  </Heading>
                </Table.TextHeaderCell>
              </Table.Head>
              <Table.Body>
                {flash_cards.map((card, index) => (
                  <Pane
                    key={index}
                    background="#FFFFFF"
                    width={900}
                    borderRadius={10}
                    marginTop={15}
                    paddingLeft={30}
                    paddingTop={25}
                  >
                    <Table.Row display="flex">
                      <Table.TextCell>
                        <Heading size={600}>{card.title}</Heading>
                      </Table.TextCell>
                      <Table.TextCell>
                        <Heading size={600}>{card.description}</Heading>
                      </Table.TextCell>
                    </Table.Row>
                  </Pane>
                ))}
              </Table.Body>
            </Table>
          </Pane>
        </Pane>
      </Pane>
    )
  }
}
const mapStateToProps = ({ auth }) => {
  return { user: { ...{ ...auth }.data } }
}
export default connect(mapStateToProps)(Set)
