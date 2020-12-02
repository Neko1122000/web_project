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
  Tooltip,
  Button,
  Table,
  Dialog,
  Text
} from 'evergreen-ui'
import {
  CreditCardIcon,
  ApplicationIcon,
  AutomaticUpdatesIcon,
  Icon,
  AddIcon,
  EditIcon,
  TrashIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  PredictiveAnalysisIcon
} from 'evergreen-ui'
import { fetchSet } from '../../actions'
class Set extends React.Component {
  componentDidMount() {
    this.props.fetchSet(this.props.location.pathname.substring(5))
    console.log(this.props.sets)
  }
  state = {
    slideIndex: 1,
    status: false,
    add:false,
    edit:false,
    remove:false,
    title:""
  }
  backward() {
    var length = this.props.sets.flash_cards.length
    this.setState({
      slideIndex:
        this.state.slideIndex - 1 > 0 ? this.state.slideIndex - 1 : length,
      status: true,
    })
  }

  next() {
    var length = this.props.sets.flash_cards.length
    this.setState({
      slideIndex:
        this.state.slideIndex + 1 <= length ? this.state.slideIndex + 1 : 1,
      status: true,
    })
  }
  render() {
    var flash_cards = this.props.sets ? this.props.sets.flash_cards : null
    var tabs1 = [
      {
        path: `/set/${this.props.match.params.id}`,
        tabname: 'Thẻ ghi nhớ',
        icon: CreditCardIcon,
      },
      {
        path: `/learn/${this.props.location.pathname.substring(5)}`,
        tabname: 'Học',
        icon: AutomaticUpdatesIcon,
      },
      {
        path: `/exam/${this.props.location.pathname.substring(5)}`,
        tabname: 'Kiểm tra',
        icon: ApplicationIcon,
      },
      {
        path: `/game/${this.props.location.pathname.substring(5)}`,
        tabname: 'Game',
        icon: PredictiveAnalysisIcon,
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
                  {flash_cards
                    ? this.state.status
                      ? flash_cards[this.state.slideIndex - 1].title
                      : flash_cards[this.state.slideIndex - 1].description
                    : 'loading'}
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
                  {flash_cards &&
                    this.state.slideIndex + '/' + flash_cards.length}
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
              <Pane marginTop="4%" marginRight="5%">
                <Tooltip content="Add set">
                    <AddIcon
                        onClick={() => {
                            this.setState({add:true})
                        }}
                        size={25}
                        color="green"
                    />
                </Tooltip>
                  <Dialog
                      isShown={this.state.add}
                      title={'Add a set'}
                      onCloseComplete={this.showReset}
                      hasFooter={false}
                      minHeightContent={500}
                  >
                      <Link to={'/create-set'}>
                          <Pane
                              background="#47B881"
                              height={100}
                              textAlign={'center'}
                              elevation={2}
                              marginBottom={20}
                          >
                              <Text
                                  width="100%"
                                  height={100}
                                  lineHeight="90px"
                                  fontSize={30}
                                  color={'white'}
                                  textAlign={'center'}
                              >
                                  + Create a new set
                              </Text>
                          </Pane>
                      </Link>
                  </Dialog>
                <Tooltip content={'Edit'}>
                    <EditIcon
                        onClick={() => {
                            this.setState({edit:true})
                        }}
                        size={25}
                        color="dodgerblue"
                        marginLeft={20}
                    />
                </Tooltip>
                <Dialog
                    isShown={this.state.edit}
                    onConfirm={()=>{window.location.href = `/edit-set/`}}
                    onCloseComplete={()=>{this.setState({edit:false})}}
                    title={"Edit"}
                >
                    <Pane>
                        <Text fontSize={18} fontWeight={200} lineHeight={"25px"}>
                          Edit this set
                        </Text>
                    </Pane>
                </Dialog>

                <Tooltip content={'Remove'}>
                    <TrashIcon
                        onClick={() => {
                            this.setState({ showing: 'remove', isShown: true })
                        }}
                        size={25}
                        color="tomato"
                        marginLeft={20}
                    />
                </Tooltip>
            </Pane>
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
                {flash_cards &&
                  flash_cards.map((card, index) => (
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
const mapStateToProps = ({ auth, sets }) => {
  return { user: { ...{ ...auth }.data }, sets: { ...sets }.data }
}
export default connect(mapStateToProps, { fetchSet })(Set)
