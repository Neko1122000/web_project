import React from 'react'
import { connect } from 'react-redux'
import { Pane, Text, Tooltip, Dialog, TextInput, toaster } from 'evergreen-ui'
import { AddIcon, TrashIcon, EditIcon, FolderOpenIcon } from 'evergreen-ui'
import { Link } from 'react-router-dom'

import { fetchFolder, fetchSetsUser } from '../../actions'

class Folder extends React.Component {
  async componentDidMount() {
    await this.props.fetchFolder(this.props.match.params.id)
    await this.props.fetchSetsUser()
  }
  state = {
    showing: '',
    isShown: false,
    path: '/sets',
    data: [
      {
        id: '5fb4fe4a918cd022c4bb7394',
        created_at: '2019-11-18T10:58:18.135Z',
        name: '321Z',
        description: '123',
        updated_at: '2019-11-19T05:10:28.692Z',
        number_flash_card: 3,
      },
      {
        id: '5fb4fe4a918cdbb7394',
        created_at: '2020-12-18T10:58:18.135Z',
        name: '321Z',
        description: '123',
        updated_at: '2020-12-19T05:10:28.692Z',
        number_flash_card: 4,
      },
      {
        id: 'e4a918cd022c4bb7394',
        created_at: '2020-11-19T10:58:18.135Z',
        name: '321Z',
        description: '123',
        updated_at: '2020-11-20T05:10:28.692Z',
        number_flash_card: 31,
      },
    ],
  }

  /* show diablog */
  isShowed = () => {
    return this.state.isShown
  }

  /* close diablog */
  showReset = () => {
    this.setState({ isShown: false })
  }

  /* remove folder */
  removeFolder = () => {
    console.log(this.state.id)
    toaster.success('Delete successful')
  }

  getSetsIdList = () => {
    var idList = []
    return !this.props.folder
      ? 'loading'
      : this.props.folder.sets.map(({ _id }) => [...idList, _id])
  }
  getUserIdList = () => {
    var idList = []
    return !this.props.sets
      ? 'loading'
      : this.props.sets.map((set) => [...idList, set._id])
  }

  /* remover set in this folder*/
  removeSet = (id) => {
    this.setState({
      data: [...this.state.data.filter((i) => i.id !== id)],
    })
  }

  render() {
    console.log(this.getSetsIdList())
    console.log(this.getUserIdList())
    let diablog = null
    switch (this.state.showing) {
      case 'add':
        diablog = (
          <Dialog
            isShown={this.isShowed()}
            title={'Add a set'}
            onCloseComplete={this.showReset}
            hasFooter={false}
          >
            <Pane background="tint1" height={100} textAlign={'center'}>
              <Link to={'/create-set'}>
                <Text
                  width="100%"
                  height={100}
                  lineHeight="90px"
                  fontSize={30}
                  color={'green'}
                  textAlign={'center'}
                >
                  + Create a new set
                </Text>
              </Link>
            </Pane>
          </Dialog>
        )
        break
      case 'edit':
        diablog = (
          <Dialog
            isShown={this.isShowed()}
            title={'Edit folder'}
            onCloseComplete={this.showReset}
            hasCancel={false}
            confirmLabel={'Save'}
            onConfirm={this.setName}
          >
            <Pane paddingLeft={'3%'} paddingRight={'3%'}>
              <Pane display={'block'}>
                <TextInput
                  ref="name"
                  display="block"
                  marginTop={20}
                  height={50}
                  width="100%"
                  placeholder={'Name'}
                  value={''}
                  onChange={(e) => {
                    this.setState({ name: e.target.value })
                  }}
                  border="none"
                  outline="none"
                />
                <Text paddingLeft={'1%'}>Title</Text>
              </Pane>
              <Pane>
                <TextInput
                  marginTop={20}
                  height={50}
                  width="100%"
                  value={''}
                  onChange={(e) => {
                    this.setState({ description: e.target.value })
                  }}
                  placeholder="Add a description"
                />
                <Text paddingLeft={'1%'}>Description</Text>
              </Pane>
            </Pane>
          </Dialog>
        )
        break
      case 'remove':
        diablog = (
          <Dialog
            intent={'warning'}
            isShown={this.isShowed()}
            title={'Remove folder'}
            onCloseComplete={this.showReset}
            confirmLabel={'Remove'}
            onConfirm={() => {
              this.removeFolder()
            }}
          >
            <Pane>
              <Text fontSize={18} fontWeight={200} lineHeight={'25px'}>
                <Text fontSize={25} fontWeight={600} lineHeight={'30px'}>
                  {this.state.name}
                </Text>{' '}
                <br />
                Deleting a folder is a PERMANENT action. This cannot be undone.
                Are you sure you want to delete this folder? The sets in this
                folder will not be deleted.
              </Text>
            </Pane>
          </Dialog>
        )
        break
      default:
        break
    }

    return (
      <Pane background="tint2" width="100%">
        {/* Header */}
        <Pane
          borderBottom
          display="flex"
          height={150}
          background="white"
          borderBottomRightRadius={20}
          justifyContent="space-between"
          marginBottom={50}
        >
          {/* Info side */}
          <Pane marginTop="2%" marginLeft="7%" height={45}>
            <Pane marginBottom={20}>
              <Text display="inline-block" marginRight={20}>
                {!this.props.folder ? 'loading' : this.props.folder.sets.length}{' '}
                sets |
              </Text>
              <Text display="inline-block" color={'#E4E7EB'}>
                created by
                <Link
                  to={this.state.path}
                  style={{ color: '#14B5D0', marginLeft: 5 }}
                >
                  {this.props.user.username}
                </Link>
              </Text>
            </Pane>
            <Pane display="block">
              <FolderOpenIcon
                color="#425A70"
                size={45}
                position={'relative'}
                top={5}
              />
              <Text
                marginLeft={20}
                fontSize={40}
                fontWeight={500}
                lineHeight="40px"
              >
                {!this.props.folder ? 'loading' : this.props.folder.name}
              </Text>
            </Pane>
          </Pane>

          {/* Action side */}
          <Pane marginTop="4%" marginRight="10%">
            <Tooltip content="Add set">
              <AddIcon
                onClick={() => {
                  this.setState({ showing: 'add', isShown: true })
                }}
                size={25}
                color="lawngreen"
              />
            </Tooltip>
            <Tooltip content={'Edit'}>
              <EditIcon
                onClick={() => {
                  this.setState({ showing: 'edit', isShown: true })
                }}
                size={25}
                color="dodgerblue"
                marginLeft={10}
              />
            </Tooltip>
            <Tooltip content={'Remove'}>
              <TrashIcon
                onClick={() => {
                  this.setState({ showing: 'remove', isShown: true })
                }}
                size={25}
                color="tomato"
                marginLeft={10}
              />
            </Tooltip>
          </Pane>

          {/* Diablog */}
          {diablog}
        </Pane>

        {/* List sets */}
        <Pane>
          <Pane marginLeft={100} />
          {!this.props.folder
            ? 'loading'
            : this.props.folder.sets.map((set, index) => (
                <Pane
                  key={index}
                  width="400px"
                  marginLeft={100}
                  height={150}
                  elevation={2}
                  display="inline-block"
                  marginTop={10}
                  paddingTop={30}
                  paddingLeft={30}
                >
                  <Link to={`/set/${set.id}`}>
                    <Pane>
                      <Text
                        fontSize={20}
                        display={'block'}
                        marginBottom={10}
                        fontWeight={550}
                      >
                        {set.name}
                      </Text>
                    </Pane>
                  </Link>

                  {/* Owner and remove */}
                  <Pane
                    display={'flex'}
                    justifyContent={'space-between'}
                    paddingRight={20}
                  >
                    <Text fontSize={20}>
                      <Link to={this.state.path} style={{ color: '#14B5D0' }}>
                        {this.props.user.username}
                      </Link>
                    </Text>
                    <Pane
                      onClick={() => {
                        this.removeSet(set.id)
                      }}
                    >
                      <Tooltip content={'Remove'}>
                        <TrashIcon color={'red'} />
                      </Tooltip>
                    </Pane>
                  </Pane>
                </Pane>
              ))}
        </Pane>
      </Pane>
    )
  }
}
const mapStateToProps = ({ auth, folder, info }) => {
  return {
    user: { ...{ ...auth }.data },
    folder: { ...{ ...folder } }.data,
    sets: { ...{ ...info } }.data,
  }
}
export default connect(mapStateToProps, { fetchFolder, fetchSetsUser })(Folder)
