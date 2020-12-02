import React from 'react'
import { connect } from 'react-redux'
import { Pane, Text, Tooltip, Dialog, TextInput, toaster, Spinner, Button } from 'evergreen-ui'
import { AddIcon, TrashIcon, EditIcon, FolderOpenIcon, Tab, Tablist } from 'evergreen-ui'
import { Link } from 'react-router-dom'

import {
    fetchFolder,
    fetchSetsUser,
    editFolderSets,
    editFolderInfo,
    deleteFolder,
} from '../../actions'


class Folder extends React.Component {
    async componentDidMount() {
        await this.props.fetchFolder(this.props.match.params.id)
        await this.props.fetchSetsUser()
        if (this.props.folder)
            this.setState({
                folderSet:{
                    ...this.state.folderSet,
                    sets:this.props.folder.sets.map(item=>item._id)
                },
                folder:{
                  ...this.state.folder,
                  name:this.props.folder.name,
                  description:this.props.folder.description
                }
            })
    }

    state = {
        showing: '',
        isShown: false,
        removeSet:-1,
        path: '/sets',
        check:false,
        folderSet:{
            sets:[]
        },
        folder:{
            name:'',
            description:'',
        },
        srcIndex: 0,
        srcSet: ['Your sets', 'Class sets', 'Studied sets']
    }

    /* show diablog */
    isShowed = () => {
        return this.state.isShown
    }

    /* close diablog and save change*/
    showReset = () => {
        var isChange = false;
        this.setState({
            isShown: false ,
            removeSet:-1,
        })
        if(this.state.folderSet.sets.length !== this.props.folder.sets.length){
            isChange=true
        }
        else this.props.folder.sets.map(item=>{
            if(!this.state.folderSet.sets.join('_').includes(item._id)){
                isChange=true
            }
        })
        if(isChange){
            toaster.success(
                "Change successful"
            )
            this.submitChange()
        }
    }
    submitChange=async ()=>{
        console.log(this.state.folderSet)
        await editFolderSets(this.props.match.params.id , this.state.folderSet)
        await this.props.fetchFolder(this.props.folder._id)
        await this.props.fetchSetsUser()
        if (this.props.folder)
            this.setState({
                folderSet:{
                  ...this.state.folder,
                  sets:this.props.folder.sets.map(item=>item._id)
                }
          })
    }

    /* remove folder */
    removeFolder = () => {
        deleteFolder(this.props.match.params.id).then(()=>{
                window.location.href="/folders"
            }
        )
        toaster.success('Delete successful')
    }

    getSetsIdList = () => {
        var idList = []
        return !this.props.folder
            ? 'loading'
            : this.props.folder.sets.map((set) => [...idList, set._id])
    }
    getUserSetsList = () => {
        var idList = []
        return !this.props.sets
            ? 'loading'
            : this.props.sets.map((set) => [...idList, set])
    }
    editFolder=async()=>{
        await editFolderInfo(this.props.folder._id, this.state.folder).then(()=>{
          this.setState({isShown:false})
        })
        await this.props.fetchFolder(this.props.folder._id)
        await this.props.fetchSetsUser()
        if (this.props.folder)
            this.setState({
                folderSet:{
                  ...this.state.folder,
                  sets:this.props.folder.sets.map(item=>item._id)
                }
          })
        toaster.success(
            "Edit successful"
        )
    }

    // change list set of this folder
    change = (id) =>{
        var newSets = this.state.folderSet.sets.filter(item=>item!== id)
        //have change ?
        if(this.state.folderSet.sets.join('_').includes(id)){
            this.setState({
                folderSet:{
                    ...this.state.folderSet,
                    sets:newSets,
                }
            })
        }
        else
        {
            this.setState({
                folderSet:{
                    ...this.state.folderSet,
                    sets:[...this.state.folderSet.sets, id],
                },
            })
        }
    }

    /* remover set in this folder*/
    removeSet = async(id) => {
        var newSets = this.state.folderSet.sets.filter(item=>item!== id)
        await this.setState({
            folderSet:{
                ...this.state.folderSet,
                sets:newSets,
            },
            removeSet:-1,
        })
        this.showReset()
    }

    render() {
        let diablog = null
        switch (this.state.showing) {
            case 'add':
                diablog = (
                    <Dialog
                        isShown={this.isShowed()}
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
                                                {this.getUserSetsList?(this.getUserSetsList().map((item, index)=>(
                                                    <Pane
                                                        key={item[0]._id}
                                                        width="100%"
                                                        height={70}
                                                        elevation={2}
                                                        display="flex"
                                                        justifyContent="space-between"
                                                        paddingRight={10}
                                                    >
                                                        <Text paddingLeft={30} alignSelf="center">
                                                            {item[0].name}
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
                                                            onClick={()=>{this.change(item[0]._id)}}
                                                        >
                                                            <Text color="white"  fontSize={20}>
                                                                {this.state.folderSet.sets.join('_').includes(item[0]._id)?"-":"+"}
                                                            </Text>
                                                        </Pane>

                                                    </Pane>
                                                ))):''}
                                            </Pane>
                                        )}

                                    </Pane>
                                ))}
                            </Pane>
                        </Pane>
                    </Dialog>
                )
                break
            case 'edit':
                diablog = (
                    <Dialog
                        isShown={this.isShowed()}
                        title={'Edit folder'}
                        onCloseComplete={()=>{this.setState({isShown:false})}}
                        hasCancel={false}
                        confirmLabel={'Save'}
                        onConfirm={()=>{this.editFolder()}}
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
                                    value={this.state.folder.name}
                                    onChange={(e) => {
                                        this.setState({
                                            folder:{
                                                ...this.state.folder,
                                                name:e.target.value
                                            }
                                        })
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
                                    value={this.state.folder.description}
                                    onChange={(e) => {
                                        this.setState({
                                            folder:{
                                                ...this.state.folder,
                                                description:e.target.value
                                            }
                                        })
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
                            <Text
                                fontSize={18}
                                fontWeight={200}
                                lineHeight={'25px'}
                            >
                                <Text fontSize={25} fontWeight={600}>
                                    {this.props.folder.name}{' '}
                                </Text>
                                <hr />
                                Deleting a set is a PERMANENT action. This cannot
                                be undone. Are you sure you want to delete{' '}
                                <Text color={'red'} fontWeight={550}>
                                    {this.props.folder.name}{' '}
                                </Text>
                                The sets in this folder will not be deleted.?
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
                                {!this.props.folder ? (<Pane>loading</Pane>) : this.props.folder.sets.length}{' '}
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
                                {!this.props.folder ? 'loading' : this.state.folder.name}
                            </Text>
                        </Pane>
                    </Pane>

                    {/* Action side */}
                    {this.state.folder.name?(
                        <Pane marginTop="4%" marginRight="5%">
                            <Tooltip content="Add set">
                                <AddIcon
                                    onClick={() => {
                                        this.setState({ showing: 'add', isShown: true })
                                    }}
                                    size={25}
                                    color="green"
                                />
                            </Tooltip>
                            <Tooltip content={'Edit'}>
                                <EditIcon
                                    onClick={() => {
                                        this.setState({ showing: 'edit', isShown: true })
                                    }}
                                    size={25}
                                    color="dodgerblue"
                                    marginLeft={20}
                                />
                            </Tooltip>
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


                    ):(<Pane></Pane>)}
                    {diablog}
                </Pane>
                {/* List sets */}
                <Pane>
                    {!this.props.folder
                        ? 'loading'
                        : this.props.folder.sets.map((set, index) => (
                            <Pane
                                key={index}
                                width="400px"
                                marginLeft={"10%"}
                                height={150}
                                elevation={2}
                                display="inline-block"
                                marginTop={10}
                                paddingTop={30}
                                paddingLeft={30}
                            >
                                <Link to={`/set/${set._id}`}>
                                    <Pane>
                                        <Text
                                            fontSize={20}
                                            display={'block'}
                                            marginBottom={50}
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
                                            this.setState({
                                                removeSet:set._id
                                            })
                                        }}
                                    >
                                        <Tooltip content={'Remove'}>
                                            <TrashIcon color={'red'} />
                                        </Tooltip>
                                        <Dialog
                                            isShown={this.state.removeSet === set._id}
                                            onConfirm={()=>{
                                                this.removeSet(set._id)
                                                this.setState({
                                                    removeSet:-1
                                                })
                                            }}
                                            onCloseComplete={()=>{this.showReset()}}
                                            title={"DELETE SET"}
                                        >
                                            <Pane>
                                                <Text fontSize={18} fontWeight={200} lineHeight={"25px"}>
                                                    <Text fontSize={25} fontWeight={600} >{set.name}</Text> <hr/>
                                                    Deleting a set is a PERMANENT action. This cannot be undone.
                                                    Are you sure you want to delete <Text fontWeight={550} color={"red"}>{set.name}</Text>
                                                </Text>
                                            </Pane>
                                        </Dialog>
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
