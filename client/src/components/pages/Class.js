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
    NewPersonIcon,
    Tablist,
    Tab,
    Avatar,
    Checkbox,
    FolderNewIcon
} from 'evergreen-ui'
import { Link } from 'react-router-dom'
import {fetchSetsUser, fetchFoldersUser, fetchClass, createClass, editClass, deleteClass, getPending} from '../../actions'

const heightItem = 75

class Class extends React.Component {
    async componentDidMount() {
        await this.props.fetchSetsUser()
        await this.props.getPending(this.props.match.params.id)
        await this.props.fetchFoldersUser()
        if (this.props.folders)
            this.setState({
                classSets:{
                    ...this.state.classSets,
                    sets:this.props.sets.map(item=>item._id)
                },
                listRequests: this.props.pending
            })
    }
    state = {
        addSet:false,
        addFolder:false,
        editClass:false,
        deleteClass:false,
        removeSet:-1,
        removeMember:-1,
        removeFolder:-1,
        removeRequest:-1,
        acceptRequest:-1,
        clearRequest:false,
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
        classSets:{
            sets:[]
        },
        srcSet:['Your sets', 'Class sets', 'Studied sets'],
        srcIndex:0,
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

        ],
        listFolders:[
            {
                _id: "5fc5755368cae4f0f3774aef",
                description: "yah yah",
                name: "yah"
            },
            {
                _id: "5fc5d53b22beeb33c05748e5",
                description: "huhu huhu huhuhhuuuhuhuhuuh",
                name: "huhuhu"
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

    removeSet=async(id)=>{
        var sets = this.state.listSets
        var newSets = sets.filter((item) => item._id !== id)
        this.setState({
            listSets: newSets,
            removeSet:-1
        })
        console.log(id)
    }
    removeFolder=async(id)=>{
        var folders = this.state.listFolders
        var newFolders = folders.filter((item) => item._id !== id)
        this.setState({
            listFodlers: newFolders,
            removeFolder:-1
        })
        console.log(newFolders)
        console.log(id)
    }
    removeMember=async(id)=>{
        var members = this.state.listMembers
        // var authority = -1;
        // members.map((item, index)=>{
        //     if(item._id===id) authority = item.authority
        // })
        // if(authority==="member"){}
        var newMembers = members.filter((item) => item._id !== id)
        this.setState({
            listMembers:newMembers,
            removeSet:-1
        })
    }
    removeRequest=async(id)=>{
        var requests = this.state.listRequests
        var newRequests = requests.filter((item) => item._id !== id)
        this.setState({
            listRequests: newRequests,
            removeRequest:-1
        })
        console.log(id)
    }
    clearRequest=async()=>{
        await this.setState({
            listRequests: [],
            clearRequest:false
        })
        console.log(this.state.clearRequest)
    }
    acceptRequest=async(id)=>{
        // id request
        var newMembers = {
            _id:id,
            username:"test add member from request",
            authority:"member"
        }
        this.setState({
            listMembers:[
                ...this.state.listMembers,
                newMembers
            ],
            acceptRequest:-1
        })
        this.removeRequest(id)
    }

    // change list set of this class
    change = (id) =>{
        var newSets = this.state.classSets.sets.filter(item=>item!== id)
        //have change ?
        if(this.state.classSets.sets.join('_').includes(id)){
            this.setState({
                classSets:{
                    ...this.state.classSets,
                    sets:newSets,
                }
            })
        }
        else
        {
            this.setState({
                classSets:{
                    ...this.state.classSets,
                    sets:[...this.state.classSets.sets, id],
                },
            })
        }
    }
    editClass=async()=>{
        //await editClass(id, this.state.class)
        //await this.props.fetchClasses()
        //if (this.props.data)
        //    this.setState({
        //        listClasses: this.props.data,
        //        editClass: -1
        //    })
        //toaster.success('Edit successful')
        console.log(this.state.class)
        this.setState({
            editClass:false
        })
    }
    removeClass=()=>{
        console.log(this.props.match.params._id)
        this.setState({
            deleteClass:false
        })
    }


    render() {
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
                                    this.setState({ addSet: true })
                                }}
                                size={25}
                                color="lawngreen"
                            />
                        </Tooltip>
                        <Dialog
                            isShown={this.state.addSet}
                            title={'Add a set'}
                            onCloseComplete={()=>{this.setState({addSet:false})}}
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
                            <Pane height={120} >
                                <Tablist marginBottom={16} display="flex" >
                                    {this.state.srcSet.map((tab, index) => (
                                        <Tab
                                            key={tab}
                                            id={tab}
                                            onSelect={() => this.setState({ srcIndex: index })}
                                            isSelected={index === this.state.srcIndex}
                                            aria-controls={`panel-${tab}`}
                                            flex="100%"
                                        >
                                            {tab}
                                        </Tab>
                                    ))}
                                </Tablist>
                                <Pane background="tint1" flex="1">
                                    {this.state.srcSet.map((tab, index) => (
                                        <Pane
                                            key={tab}
                                            id={`panel-${tab}`}
                                            role="tabpanel"
                                            aria-labelledby={tab}
                                            aria-hidden={index !== this.state.srcIndex}
                                            display={index === this.state.srcIndex ? 'block' : 'none'}
                                            backgroundColor="white"
                                            border
                                        >
                                            {tab!=="Your sets"?<Pane>Nothing</Pane>:(
                                                <Pane>

                                                    {/* list user's sets */}
                                                    {this.props.sets?(this.props.sets.map((item, index)=>(
                                                        <Pane
                                                            key={item._id}
                                                            width="100%"
                                                            height={70}
                                                            elevation={2}
                                                            display="flex"
                                                            justifyContent="space-between"
                                                            paddingRight={10}
                                                        >
                                                            <Text paddingLeft={30} alignSelf="center">
                                                                {item.name}
                                                            </Text>

                                                            <Pane
                                                                className="modify"
                                                                width={50}
                                                                height={50}
                                                                border
                                                                textAlign="center"
                                                                lineHeight="50px"
                                                                alignSelf="center"
                                                                cursor="pointer"
                                                                backgroundColor="#47B881"
                                                                onClick={()=>{this.change(item._id)}}
                                                            >
                                                                <Text color="white"  fontSize={20}>
                                                                    {this.state.classSets.sets.join('_').includes(item._id)?"-":"+"}
                                                                </Text>
                                                            </Pane>

                                                        </Pane>
                                                    ))):('')}
                                                </Pane>
                                            )}

                                        </Pane>
                                    ))}
                                </Pane>
                            </Pane>
                        </Dialog>

                        <Tooltip content={'Add folder'}>
                            <FolderNewIcon
                                onClick={() => {
                                    this.setState({addFolder:true})
                                }}
                                size={25}
                                color={'#735DD0'}
                                marginLeft={10}
                            />
                        </Tooltip>
                        <Dialog
                            isShown={this.state.addFolder}
                            title={'Add a set'}
                            onCloseComplete={()=>{this.setState({addFolder:false})}}
                            hasFooter={false}
                            minHeightContent={500}
                        >
                            <Link to={'/folders'}>
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
                                        + Create a new folder
                                    </Text>
                                </Pane>
                            </Link>
                            <Pane height={120} >
                                <Pane>
                                    {/* list user's sets */}
                                    {this.props.sets?(this.props.sets.map((item, index)=>(
                                        <Pane
                                            key={item._id}
                                            width="100%"
                                            height={70}
                                            elevation={2}
                                            display="flex"
                                            justifyContent="space-between"
                                            paddingRight={10}
                                        >
                                            <Text paddingLeft={30} alignSelf="center">
                                                {item.name}
                                            </Text>

                                            <Pane
                                                className="modify"
                                                width={50}
                                                height={50}
                                                border
                                                textAlign="center"
                                                lineHeight="50px"
                                                alignSelf="center"
                                                cursor="pointer"
                                                backgroundColor="#47B881"
                                                onClick={()=>{this.change(item._id)}}
                                            >
                                                <Text color="white"  fontSize={20}>
                                                    {this.state.classSets.sets.join('_').includes(item._id)?"-":"+"}
                                                </Text>
                                            </Pane>

                                        </Pane>
                                            ))):('')}
                                </Pane>
                            </Pane>
                        </Dialog>    
                        
                        <Tooltip content={'Edit'}>
                            <EditIcon
                                onClick={() => {
                                    this.setState({ editClass:true })
                                }}
                                size={25}
                                color="dodgerblue"
                                marginLeft={10}
                            />
                        </Tooltip>
                        <Dialog
                            isShown={this.state.editClass}
                            intent="success"
                            title={'Edit class'}
                            hasCancel={false}
                            onCloseComplete={() => {
                                this.setState({ editClass: false})
                            }}
                            onConfirm={() => {
                                this.editClass()
                            }}
                        >
                            {/* Input field */}
                            <Pane height={130}>
                                <TextInput
                                    className="input"
                                    width="100%"
                                    height={50}
                                    marginBottom={7}
                                    value={this.state.class.name}
                                    placeholder={
                                        'Enter a class name (subject, teacher, year, section, etc.)'
                                    }
                                    onChange={(e) => {
                                        this.setState({
                                            class: {
                                                ...this.state.class,
                                                name: e.target.value,
                                            },
                                        })
                                    }}
                                ></TextInput>
                                <Pane paddingLeft={10}>
                                    <Text
                                        fontWeight={550}
                                        fontSize={18}
                                        marginBottom={10}
                                        id={'require'}
                                        color={'red'}
                                        display={'none'}
                                    >
                                        {' '}
                                        THIS IS REQUIRED
                                    </Text>
                                    <Text
                                        id={'hint'}
                                        fontSize={16}
                                        fontWeight={500}
                                        color="#A6B1BB"
                                        display={'block'}
                                    >
                                        CLASS NAME
                                    </Text>
                                </Pane>
                            </Pane>

                            <Pane height={130}>
                                <TextInput
                                    className="input"
                                    width="100%"
                                    height={50}
                                    marginBottom={7}
                                    value={this.state.class.description}
                                    placeholder={'Enter a description (optional)'}
                                    onChange={(e) => {
                                        this.setState({
                                            class: {
                                                ...this.state.class,
                                                description: e.target.value,
                                            },
                                        })
                                    }}
                                ></TextInput>
                                <Pane paddingLeft={10}>
                                    <Text
                                        fontWeight={550}
                                        fontSize={18}
                                        marginBottom={10}
                                        id={'require'}
                                        color={'red'}
                                        display={'none'}
                                    >
                                        {' '}
                                        THIS IS REQUIRED
                                    </Text>
                                    <Text
                                        id={'hint'}
                                        fontSize={16}
                                        fontWeight={500}
                                        color="#A6B1BB"
                                        display={'block'}
                                    >
                                        DESCRIPTION
                                    </Text>
                                </Pane>
                            </Pane>

                            {/* Address */}
                            <Pane height={70}>
                                <TextInput
                                    className="input"
                                    width="100%"
                                    height={50}
                                    marginBottom={7}
                                    value={this.state.class.address}
                                    placeholder={'Enter the address'}
                                    onChange={(e) => {
                                        this.setState({
                                            class: {
                                                ...this.state.class,
                                                address: e.target.value,
                                            },
                                        })
                                    }}
                                ></TextInput>
                                <Pane paddingLeft={10}>
                                    <Text
                                        fontWeight={550}
                                        fontSize={18}
                                        marginBottom={10}
                                        id={'require'}
                                        color={'red'}
                                        display={'none'}
                                    >
                                        {' '}
                                        THIS IS REQUIRED
                                    </Text>
                                    <Text
                                        id={'hint'}
                                        fontSize={16}
                                        fontWeight={500}
                                        color="#A6B1BB"
                                        display={'block'}
                                    >
                                        ADDRESS
                                    </Text>
                                </Pane>
                            </Pane>

                            {/* Allow member change */}
                            <Pane
                                width="100%"
                                display="flex"
                                justifyContent={'space-around'}
                                paddingTop={20}
                            >
                                <Checkbox
                                    checked={this.state.class.allow_member_change}
                                    onChange={(e) =>
                                        this.setState({
                                            class: {
                                                ...this.state.class,
                                                allow_member_change: e.target.checked,
                                            },
                                        })
                                    }
                                    fontSize={20}
                                />

                                <Text
                                    fontSize={16}
                                    fontWeight={500}
                                    lineHeight="50px"
                                    paddingRight={30}
                                    onClick={(e) =>
                                        this.setState({
                                            class: {
                                                ...this.state.class,
                                                allow_member_change: 
                                                    !e.target.parentNode.
                                                    querySelector('label input').checked,
                                            },
                                        })
                                    }
                                >
                                    Allow your students to add study sets and new members
                                </Text>
                            </Pane>
                        </Dialog>

                        <Tooltip content={'Remove'}>
                            <TrashIcon
                                onClick={() => {
                                    this.setState({ deleteClass:true})
                                }}
                                size={25}
                                color="tomato"
                                marginLeft={10}
                            />
                        </Tooltip>
                        <Dialog
                            isShown={this.state.deleteClass}
                            onCloseComplete={()=>{this.setState({deleteClass:false})}}
                            onConfirm={()=>{this.removeClass()}}
                            title={"DELETE CLASS"}
                        >
                            <Pane>
                                <Text fontSize={18} fontWeight={200} lineHeight={"25px"}>
                                    <Text fontSize={25} fontWeight={600} >{this.state.class.name}</Text> <hr/>
                                    Deleting a class is a PERMANENT action. This cannot be undone.
                                    Are you sure you want to delete <Text fontWeight={550} color={"red"}>{this.state.class.name}</Text>? The sets and folders in this class will not be
                                    deleted.
                                </Text>
                            </Pane>
                        </Dialog>
                    </Pane>
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
                                            {/* sort and search */}
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
                                                {this.state.listSets.length<1?
                                                    <Pane></Pane>:(
                                                        <Pane>
                                                            <Pane paddingTop={30}>
                                                                <hr/>
                                                                <Text
                                                                    fontSize={20}
                                                                    fontWeight={550}

                                                                >
                                                                    Sets
                                                                </Text>
                                                            </Pane>
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
                                                                                    <Pane width={500}  paddingLeft={30}>
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
                                                                                onClick={()=>{
                                                                                    this.setState({
                                                                                        removeSet:set._id
                                                                                    })
                                                                                }}
                                                                            >
                                                                                <Tooltip content="Remove this folder">
                                                                                    <TrashIcon color="#EC4C47" size={20} />
                                                                                </Tooltip>
                                                                                <Dialog
                                                                                    isShown={this.state.removeSet === set._id}
                                                                                    onCloseComplete={()=>{this.setState({removeSet:-1})}}
                                                                                    onConfirm={()=>{this.removeSet(set._id)}}
                                                                                    title={"DELETE SET"}
                                                                                >
                                                                                    <Pane>
                                                                                        <Text fontSize={18} fontWeight={200} lineHeight={"25px"}>
                                                                                            <Text fontSize={25} fontWeight={600} >{set.name}</Text> <hr/>
                                                                                            Deleting a set is a PERMANENT action. This cannot be undone.
                                                                                            Are you sure you want to delete <Text fontWeight={550} color={"red"}>{set.name}</Text>?
                                                                                        </Text>
                                                                                    </Pane>
                                                                                </Dialog>
                                                                            </Pane>
                                                                        </Pane>

                                                                    ) : (<Pane></Pane>)}
                                                                </Pane>
                                                            ))}
                                                        </Pane>
                                                    )
                                                    }
                                                {this.state.listFolders.length<1?<Pane></Pane>:(
                                                    <Pane>
                                                        <Pane paddingTop={30}>
                                                            <hr/>
                                                            <Text
                                                                fontSize={20}
                                                                fontWeight={550}

                                                            >
                                                                Folder
                                                            </Text>
                                                        </Pane>
                                                        {this.state.listFolders.map(folder=>(
                                                        <Pane key={folder._id} >
                                                            {folder.name.includes(this.state.search) ? (
                                                                <Pane
                                                                    display="flex"
                                                                    justifyContent="space-between"
                                                                    backgroundColor="white"
                                                                    height={heightItem}
                                                                    elevation={1}
                                                                    marginTop = {25}
                                                                >
                                                                    <Link to={`/set/${folder._id}`}>
                                                                        <Pane height={heightItem}>
                                                                            <Pane width={500}  paddingLeft={30}>
                                                                                <Text
                                                                                    fontSize={20}
                                                                                    lineHeight="80px"
                                                                                    fontWeight={550}
                                                                                >
                                                                                    {folder.name}
                                                                                </Text>
                                                                            </Pane>
                                                                        </Pane>
                                                                    </Link>
                                                                    <Pane
                                                                        paddingTop={25}
                                                                        paddingRight={40}
                                                                        onClick={()=>{
                                                                            this.setState({
                                                                                removeFolder:folder._id
                                                                            })
                                                                        }}
                                                                    >
                                                                        <Tooltip content="Remove this folder">
                                                                            <TrashIcon color="#EC4C47" size={20} />
                                                                        </Tooltip>
                                                                        <Dialog
                                                                            isShown={this.state.removeFolder === folder._id}
                                                                            onCloseComplete={()=>{this.setState({removeFolder:-1})}}
                                                                            onConfirm={()=>{this.removeFolder(folder._id)}}
                                                                            title={"DELETE SET"}
                                                                        >
                                                                            <Pane>
                                                                                <Text fontSize={18} fontWeight={200} lineHeight={"25px"}>
                                                                                    <Text fontSize={25} fontWeight={600} >{folder.name}</Text> <hr/>
                                                                                    Deleting a folder is a PERMANENT action. This cannot be undone.
                                                                                    Are you sure you want to delete <Text fontWeight={550} color={"red"}>{folder.name}</Text>?
                                                                                </Text>
                                                                            </Pane>
                                                                        </Dialog>
                                                                    </Pane>
                                                                </Pane>

                                                            ) : (
                                                                <Pane></Pane>
                                                            )}
                                                        </Pane>
                                                    ))}
                                                    </Pane>
                                                )}
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
                                                                            <Pane flex="50%" width={500}>
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
                                                                        {member.authority==="member"?(
                                                                            <Pane
                                                                                display="flex"
                                                                                justifyContent={"space-around"}
                                                                                width="12%"
                                                                                paddingTop={25}
                                                                                paddingRight={20}
                                                                            >
                                                                                <Pane onClick={()=>{
                                                                                    this.setState({
                                                                                        removeMember:member._id
                                                                                    })
                                                                                }}
                                                                                >
                                                                                    <Tooltip content="Remove this member">
                                                                                        <TrashIcon
                                                                                            color="#EC4C47"
                                                                                            size={20}
                                                                                        />
                                                                                    </Tooltip>
                                                                                    <Dialog
                                                                                        isShown={this.state.removeMember === member._id}
                                                                                        onCloseComplete={()=>{this.setState({removeMember:-1})}}
                                                                                        onConfirm={()=>{this.removeMember(member._id)}}
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
                                                                        ):(<Pane></Pane>)
                                                                        }


                                                                    </Pane>
                                                                ):(<Pane></Pane>)}
                                                            </Pane>
                                                        ))}
                                                    </Pane>
                                                    :
                                                    <Pane>

                                                        {/* request part */}

                                                        {!this.props.pending? 'loading' : this.state.listRequests.length>0?(
                                                            <Pane display="flex" justifyContent="space-between">
                                                                <Pane
                                                                    alignSelf="center"
                                                                    height="35px"
                                                                    paddingTop={5}
                                                                    paddingLeft={10}
                                                                    border
                                                                >
                                                                    <Tooltip content="Remove all request">
                                                                        <Heading
                                                                            paddingRight={20}
                                                                            cursor="pointer"
                                                                            onClick={()=>{
                                                                                this.setState({
                                                                                    clearRequest:true
                                                                                })
                                                                            }}
                                                                        >
                                                                            Remove all request
                                                                        </Heading>
                                                                    </Tooltip>
                                                                    <Dialog
                                                                        isShown={this.state.clearRequest}
                                                                        onCloseComplete={()=>{
                                                                            this.setState({clearRequest:false})
                                                                        }}
                                                                        onConfirm={()=>{this.clearRequest()}}
                                                                        title={"CLEAR REQUEST"}
                                                                    >
                                                                        <Pane>
                                                                            <Text fontSize={18} fontWeight={200} lineHeight={"25px"}>
                                                                                <Text fontSize={25} fontWeight={600} >Clear all of this request</Text> <hr/>
                                                                                Remove requests is a PERMANENT action. This cannot be undone.
                                                                                Are you sure you want to <Text fontWeight={550} color={"red"}>Remove all of this request</Text>?
                                                                            </Text>
                                                                        </Pane>
                                                                    </Dialog>
                                                                </Pane>


                                                                <SearchInput
                                                                    placeholder="Filter traits..."
                                                                    onChange={(e) => {
                                                                        this.setState({ search: e.target.value })
                                                                    }}
                                                                />
                                                            </Pane>
                                                        ):(<Pane></Pane>)
                                                        }
                                                        {!this.props.pending ? 'loading' : this.state.listRequests.map((request) => (

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
                                                                            <Pane width={500} display="flex">
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
                                                                            <Pane
                                                                                marginLeft={20}
                                                                                onClick={()=>{
                                                                                    this.setState({
                                                                                        acceptRequest:request._id
                                                                                    })
                                                                                }}
                                                                            >
                                                                                <Tooltip content="Accept this request">
                                                                                    <NewPersonIcon
                                                                                        color="#47B881"
                                                                                        size={20}
                                                                                    />
                                                                                </Tooltip>
                                                                                <Dialog
                                                                                    isShown={this.state.acceptRequest === request._id}
                                                                                    onCloseComplete={()=>{
                                                                                        this.setState({acceptRequest:-1})
                                                                                    }}
                                                                                    onConfirm={()=>{this.acceptRequest(request._id)}}
                                                                                    title={"ACCEPT REQUEST"}
                                                                                >
                                                                                    <Pane>
                                                                                        <Text fontSize={18} fontWeight={200} lineHeight={"25px"}>
                                                                                            <Text fontSize={25} fontWeight={600} >{request.username}</Text> <hr/>
                                                                                            Accepting a request is a PERMANENT action. This cannot be undone.
                                                                                            Are you sure you want to delete <Text fontWeight={550} color={"red"}>{request.username}</Text>?
                                                                                        </Text>
                                                                                    </Pane>
                                                                                </Dialog>
                                                                            </Pane>
                                                                            <Pane onClick={()=>{
                                                                                this.setState({
                                                                                    removeRequest:request._id
                                                                                })
                                                                            }}>
                                                                                <Tooltip content="Remove this request">
                                                                                    <TrashIcon
                                                                                        color="#EC4C47"
                                                                                        size={20}
                                                                                    />
                                                                                </Tooltip>
                                                                                <Dialog
                                                                                    isShown={this.state.removeRequest === request._id}
                                                                                    onCloseComplete={()=>{
                                                                                        this.setState({removeRequest:-1})
                                                                                    }}
                                                                                    onConfirm={()=>{this.removeRequest(request._id)}}
                                                                                    title={"DELETE REQUEST"}
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
const mapStateToProps = ({ auth, info, pending }) => {
    return {
        user: { ...{ ...auth }.data },
        sets: { ...{ ...info } }.data,
        folders:{ ...{ ...info} }.data,
        pending:{ ...{ ...pending} }.data,
    }
}
export default connect(mapStateToProps, { fetchSetsUser, fetchFoldersUser, getPending })(Class)