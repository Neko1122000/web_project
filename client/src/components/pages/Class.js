import React from 'react'
import { connect } from 'react-redux'
import {
    Pane,
    Text,
    Tooltip,
    Dialog,
    SelectMenu,
    Button,
    TextInput,
    Heading,
    SearchInput,
} from 'evergreen-ui'
import {
    AddIcon,
    TrashIcon,
    EditIcon,
    FolderOpenIcon,
    FolderCloseIcon,
    LearningIcon,
    Tablist,
    Tab,
    Avatar
} from 'evergreen-ui'
import { Link } from 'react-router-dom'

const heightItem = 75

class Class extends React.Component {
    state = {
        isShown: '',
        sort: 'Lastest',
        search: '',
        class:{
            name: '11A1',
            description: 'Lop 11A1',
            numberOfSet: 2,
            numberOfMember: 19,
            address: 'THPT Ky Anh',
            allow_member_change: true,
        },
        options:[
            "Sets", "Members", "Requests"
        ],
        opIndex: 0,
        listSets: [
            {
                _id: '5fb4fe4a918cd022c4bb7394',
                created_at: '2019-11-18T10:58:18.135Z',
                name: 'a321Z',
                description: '123',
                updated_at: '2019-11-19T05:10:28.692Z',
                number_flash_card: 3,
            },
            {
                _id: '5fb4fe4a918cdbb7394',
                created_at: '2020-12-18T10:58:18.135Z',
                name: 'b21Z',
                description: '123',
                updated_at: '2020-12-19T05:10:28.692Z',
                number_flash_card: 4,
            },
            {
                _id: 'e4a918cd022c4bb7394',
                created_at: '2020-11-19T10:58:18.135Z',
                name: 'c321Z',
                description: '123',
                updated_at: '2020-11-20T05:10:28.692Z',
                number_flash_card: 31,
            },
        ],
        listMembers:[
            {
                _id:1,
                username:"teuhmix",
                authority:"admin"
            },
            {
                _id:2,
                username:"nucusi",
                authority:"member"
            },
            {
                _id:3,
                username:"quocsinh09",
                authority:"member"
            }
        ],
        listRequests:[
            {
                _id:5,
                username:"yah yah"
            },
            {
                _id:6,
                username:"yah yah yah"
            }
        ]
    }

    formatDate(date) {
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' }
        return new Date(date).toLocaleDateString([], options)
    }
    formatDateByMonth(date) {
        var options = { month: 'numeric' }
        return new Date(date).toLocaleDateString([], options)
    }

    sortAlphabetical = () => {
        this.setState({
            listSets: [...this.state.listSets.sort((a, b) => a.name.localeCompare(b.name))],
        })
    }
    sortLastest = () => {
        this.setState({
            listSets: [
                ...this.state.listSets.sort((a, b) =>
                    this.formatDate(b.created_at)
                        .split('/')
                        .reverse()
                        .join()
                        .localeCompare(
                            this.formatDate(a.created_at).split('/').reverse().join()
                        )
                ),
            ],
        })
    }

    sort = (sortType) => {
        this.state.sort !== 'Lastest' ? this.sortLastest() : this.sortAlphabetical()
        this.setState({
            sort: sortType,
        })
    }

    render() {
        let diablog = null
        switch (this.state.isShown) {
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
                        <SelectMenu
                            hasTitle={false}
                            hasFilter={false}
                            options={[
                                'yourSets',
                                'classSets',
                                'Banana',
                                'Cherry',
                                'Cucumber',
                            ].map((label) => ({ label, value: label }))}
                            selected={this.state.srcSet}
                            onSelect={(item) => this.setState({ srcSet: item.value })}
                        >
                            <Button>{this.state.srcSet}</Button>
                        </SelectMenu>
                    </Dialog>
                )
                break
            case 'study':
                diablog = (
                    <Dialog
                        isShown={this.isShowed()}
                        title={'Study this folder'}
                        onCloseComplete={this.showReset}
                        hasFooter={false}
                    >
                        <Pane
                            paddingLeft=""
                            display={'flex'}
                            flexFlow={'wrap'}
                            justifyContent={'space-around'}
                        >
                            <Pane
                                height={150}
                                width="33%"
                                background={'greenTint'}
                                elevation={2}
                                marginBottom={10}
                            >
                                <LearningIcon size={45} />
                            </Pane>
                            <Pane
                                height={150}
                                width="33%"
                                background={'greenTint'}
                                elevation={2}
                                marginBottom={10}
                            >
                                <LearningIcon size={45} />
                            </Pane>
                            <Pane
                                height={150}
                                width="33%"
                                background={'greenTint'}
                                elevation={2}
                                marginBottom={10}
                            >
                                <LearningIcon size={45} />
                            </Pane>
                            <Pane
                                height={150}
                                width="33%"
                                background={'greenTint'}
                                elevation={2}
                                marginBottom={10}
                            >
                                <LearningIcon size={45} />
                            </Pane>
                            <Pane
                                height={150}
                                width="33%"
                                background={'greenTint'}
                                elevation={2}
                                marginBottom={10}
                            >
                                <LearningIcon size={45} />
                            </Pane>
                            <Pane
                                height={150}
                                width="33%"
                                background={'greenTint'}
                                elevation={2}
                                marginBottom={10}
                            >
                                <LearningIcon size={45} />
                            </Pane>
                        </Pane>
                    </Dialog>
                )
                break
            case 'edit':
                diablog = (
                    <Dialog
                        isShown={this.isShowed}
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
                                    placeholder={this.state.name}
                                    value={this.state.name}
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
                                    value={this.state.description}
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
                >
                    {/* Info side */}
                    <Pane marginTop="2%" marginLeft="7%" height={45}>
                        <Pane marginBottom={20}>
                            <Text display="inline-block" marginRight={20}>
                                {this.state.listSets.length} sets |
                            </Text>
                            <Text display="inline-block" color={'#E4E7EB'}>
                                created by
                                <Link
                                    to={'/classes'}
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
                                {this.state.class.name}
                            </Text>
                        </Pane>
                    </Pane>

                    {/* Action side */}
                    <Pane marginTop="4%" marginRight="10%">
                        <Tooltip content="Add set">
                            <AddIcon
                                onClick={() => {
                                    this.setState({ isShown: 'add' })
                                }}
                                size={25}
                                color="lawngreen"
                            />
                        </Tooltip>
                        <Tooltip content={'Study'}>
                            <LearningIcon
                                onClick={() => {
                                    this.setState({ isShown: 'study' })
                                }}
                                size={25}
                                color={'#735DD0'}
                                marginLeft={10}
                            />
                        </Tooltip>
                        <Tooltip content={'Edit'}>
                            <EditIcon
                                onClick={() => {
                                    this.setState({ isShown: 'edit' })
                                }}
                                size={25}
                                color="dodgerblue"
                                marginLeft={10}
                            />
                        </Tooltip>
                        <Tooltip content={'Remove'}>
                            <TrashIcon
                                onClick={() => {
                                    this.setState({ isShown: 'remove' })
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

                <Pane display="flex">
                    <Pane paddingLeft={'7%'} paddingRight={30} flex="100%">
                        <Tablist marginBottom={16} display="flex" >
                            {this.state.options.map((tab, index) => (
                                <Tab
                                    key={tab}
                                    id={tab}
                                    onSelect={() => this.setState({ opIndex: index, search:''})}
                                    isSelected={index === this.state.opIndex}
                                    aria-controls={`panel-${tab}`}
                                    flex="100%"
                                    height={50}
                                >
                                    <Text fontSize={20}>
                                        {tab}
                                    </Text>
                                </Tab>
                            ))}
                        </Tablist>
                        <Pane background="tint1" flex="1">
                            {this.state.options.map((tab, index) => (
                                <Pane
                                    key={tab}
                                    id={`panel-${tab}`}
                                    role="tabpanel"
                                    aria-labelledby={tab}
                                    aria-hidden={index !== this.state.opIndex}
                                    display={index === this.state.opIndex ? 'block' : 'none'}
                                >
                                    {tab==="Sets"?
                                        <Pane>
                                            <Pane display="flex" justifyContent="space-between">
                                                <Pane>
                                                    <Heading paddingRight={20}>Sort </Heading>
                                                    <SelectMenu
                                                        hasTitle={false}
                                                        hasFilter={false}
                                                        closeOnSelect={true}
                                                        height={70}
                                                        options={['Alphabetical', 'Lastest'].map((label) => ({
                                                            label,
                                                            value: label,
                                                        }))}
                                                        selected={this.state.sort}
                                                        onSelect={(item) => this.sort(item.value)}
                                                    >
                                                        <Button lineHeight="40px" height={40}>
                                                            {this.state.sort}
                                                        </Button>
                                                    </SelectMenu>
                                                </Pane>
                                                <SearchInput
                                                    placeholder="Filter traits..."
                                                    onChange={(e) => {
                                                        this.setState({ search: e.target.value })
                                                    }}
                                                />
                                            </Pane>
                                            <Pane width="100%" >
                                                {this.state.listSets.map((set) => (
                                                    <Pane key={set._id} >
                                                        {set.name.includes(this.state.search) ? (
                                                            <Pane
                                                                display="flex"
                                                                justifyContent="space-between"
                                                                backgroundColor="white"
                                                                height={heightItem}
                                                                elevation={1}
                                                                marginTop = {25}
                                                            >
                                                                <Link to={`/set/${set._id}`}>
                                                                    <Pane height={heightItem}>
                                                                        <Pane width={700} >

                                                                            <FolderCloseIcon
                                                                                size={25}
                                                                                color="#E4E7EB"
                                                                                bottom={5}
                                                                                lineHeight="100px"
                                                                                marginRight={10}
                                                                                marginLeft={30}
                                                                            />
                                                                            <Text
                                                                                fontSize={20}
                                                                                lineHeight="80px"
                                                                                fontWeight={550}
                                                                            >
                                                                                {set.name}
                                                                            </Text>
                                                                        </Pane>
                                                                    </Pane>
                                                                </Link>
                                                                <Pane
                                                                    paddingTop={25}
                                                                    paddingRight={40}
                                                                >
                                                                    <Tooltip content="Remove this folder">
                                                                        <TrashIcon color="#EC4C47" size={20} />
                                                                    </Tooltip>
                                                                </Pane>
                                                            </Pane>

                                                        ) : (
                                                            <Pane></Pane>
                                                        )}
                                                    </Pane>
                                                ))}
                                            </Pane>
                                        </Pane>
                                        :(
                                            <Pane>
                                                {tab==="Members"?
                                                    <Pane>
                                                        <Pane display="flex" justifyContent="space-between">
                                                            <SearchInput
                                                                placeholder="Filter traits..."
                                                                onChange={(e) => {
                                                                    this.setState({ search: e.target.value })
                                                                }}
                                                            />
                                                        </Pane>
                                                        {this.state.listMembers.map((member) => (

                                                            <Pane key={member._id}  >
                                                                {member.username.includes(this.state.search) ? (
                                                                    <Pane
                                                                        marginTop ={30}
                                                                        backgroundColor="white"
                                                                        height={heightItem}
                                                                        width="100%"
                                                                        elevation={1}
                                                                        display="flex"
                                                                        justifyContent={"space-between"}
                                                                    >
                                                                        <Link to={`/folders/${member._id}`}>
                                                                            <Pane paddingLeft={65}>
                                                                                <Text color="#A6B1BB">{member.authority}</Text>
                                                                            </Pane>
                                                                            <Pane flex="50%" width={700}>
                                                                                <FolderCloseIcon
                                                                                    size={25}
                                                                                    color="#E4E7EB"
                                                                                    bottom={5}
                                                                                    lineHeight="40px"
                                                                                    marginRight={10}
                                                                                    marginLeft={30}
                                                                                />
                                                                                <Text fontSize={20} lineHeight="40px" fontWeight={550}>
                                                                                    {member.username}
                                                                                </Text>
                                                                            </Pane>
                                                                        </Link>
                                                                        <Pane
                                                                            display="flex"
                                                                            justifyContent={"space-around"}
                                                                            width="12%"
                                                                            paddingTop={25}
                                                                            paddingRight={20}
                                                                        >
                                                                            <Pane onClick={()=>{alert("remove member")}}>
                                                                                <Tooltip content="Remove this member">
                                                                                    <TrashIcon
                                                                                        color="#EC4C47"
                                                                                        size={20}
                                                                                    />
                                                                                </Tooltip>
                                                                                <Dialog
                                                                                    isShown={false}
                                                                                    onConfirm={()=>{alert("delet member")}}
                                                                                    title={"DELETE MEMBER"}
                                                                                >
                                                                                    <Pane>
                                                                                        <Text fontSize={18} fontWeight={200} lineHeight={"25px"}>
                                                                                            <Text fontSize={25} fontWeight={600} >{member.username}</Text> <hr/>
                                                                                            Deleting a member is a PERMANENT action. This cannot be undone.
                                                                                            Are you sure you want to delete <Text fontWeight={550} color={"red"}>{member.username}</Text>?
                                                                                        </Text>
                                                                                    </Pane>
                                                                                </Dialog>
                                                                            </Pane>

                                                                        </Pane>

                                                                    </Pane>
                                                                ):(<Pane></Pane>)}
                                                            </Pane>
                                                        ))}
                                                    </Pane>
                                                    :
                                                    <Pane>
                                                        <Pane display="flex" justifyContent="space-between">
                                                            <SearchInput
                                                                placeholder="Filter traits..."
                                                                onChange={(e) => {
                                                                    this.setState({ search: e.target.value })
                                                                }}
                                                            />
                                                        </Pane>
                                                        {this.state.listRequests.map((request) => (

                                                            <Pane key={request._id} >
                                                                {request.username.includes(this.state.search) ? (
                                                                    <Pane
                                                                        backgroundColor="white"
                                                                        height={heightItem}
                                                                        width="100%"
                                                                        elevation={1}
                                                                        display="flex"
                                                                        justifyContent={"space-between"}
                                                                        marginTop ={30}
                                                                    >
                                                                        <Link to={`/folders/${request._id}`}>
                                                                            <Pane width={700} display="flex">
                                                                                <Pane paddingTop={15} paddingLeft={20}>
                                                                                    <Avatar name={request.username} size={40} marginRight={16} />

                                                                                </Pane>
                                                                                <Text fontSize={20} lineHeight="80px" fontWeight={550}>
                                                                                    {request.username}
                                                                                </Text>
                                                                            </Pane>
                                                                        </Link>
                                                                        <Pane
                                                                            display="flex"
                                                                            justifyContent={"space-around"}
                                                                            width="12%"
                                                                            paddingTop={25}
                                                                            paddingRight={20}
                                                                        >
                                                                            <Pane onClick={()=>{alert("remove request")}}>
                                                                                <Tooltip content="Remove this request">
                                                                                    <TrashIcon
                                                                                        color="#EC4C47"
                                                                                        size={20}
                                                                                    />
                                                                                </Tooltip>
                                                                                <Dialog
                                                                                    isShown={false}
                                                                                    onConfirm={()=>{alert("delet request")}}
                                                                                    title={"DELETE MEMBER"}
                                                                                >
                                                                                    <Pane>
                                                                                        <Text fontSize={18} fontWeight={200} lineHeight={"25px"}>
                                                                                            <Text fontSize={25} fontWeight={600} >{request.username}</Text> <hr/>
                                                                                            Deleting a request is a PERMANENT action. This cannot be undone.
                                                                                            Are you sure you want to delete <Text fontWeight={550} color={"red"}>{request.username}</Text>?
                                                                                        </Text>
                                                                                    </Pane>
                                                                                </Dialog>
                                                                            </Pane>

                                                                        </Pane>

                                                                    </Pane>
                                                                ):(<Pane></Pane>)}
                                                            </Pane>
                                                        ))}
                                                    </Pane>
                                                }
                                            </Pane>
                                        )}

                                </Pane>
                            ))}
                        </Pane>
                    </Pane>

                    <Pane
                        flex={'400px'}
                        paddingLeft={30}
                        paddingTop={30}
                        backgroundColor="white"
                    >
                        <Pane paddingBottom={20}>
                            <Heading>Invite Code</Heading>
                            <Pane>
                                xxxxxxxxxx
                            </Pane>
                        </Pane>
                        <Heading>Class detail</Heading>
                        <Pane display="flex" flexDirection="column">
                            <Text>{this.state.class.address}</Text>
                            <Text>{this.state.listSets.length + ' sets'}</Text>
                            <Text>{this.state.listMembers.length + ' members'}</Text>
                        </Pane>
                    </Pane>
                </Pane>
            </Pane>
        )
    }
}
const mapStateToProps = ({ auth }) => {
    return { user: { ...{ ...auth }.data } }
}
export default connect(mapStateToProps)(Class)
