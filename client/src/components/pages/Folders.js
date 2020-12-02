import React from 'react'
import {
    FolderCloseIcon,
    Pane,
    Text,
    TextInput,
    Dialog,
    toaster,
    TrashIcon,
    Tooltip,
    EditIcon,
} from 'evergreen-ui'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {createFolder, fetchFoldersUser, deleteFolder, editFolderInfo} from '../../actions'
import UserHeader from '../UserHeader'

const heightItem = 75
const widthItem = 800

class Folders extends React.Component {
    async componentDidMount() {
        await this.props.fetchFoldersUser()
        if (this.props.data)
            this.setState({
                data: this.props.data,
            })
    }

    state = {
        isShown:false,
        removeFolder:-1,
        editFolder:-1,
        folder: {
            name: '',
            description: '',
        },
        data: []
    }

    setTitle = (e) =>{
        this.setState({
            folder:{
                ...this.state.folder,
                name: e.target.value,
            }
        })
    }
    setDescription = (e) =>{
        this.setState({
            folder:{
                ...this.state.folder,
                description: e.target.value,
            }
        })
    }
    createFolder = async() =>{
        let check = true;
        var inputs = document.querySelectorAll('div .input')
        inputs.forEach(element => {
            if(element.value === ''){
                element.parentNode.querySelector('#require').style.display="block"
                element.parentNode.querySelector('#hint').style.display="none"
                check = false;
            }
            else{
                element.parentNode.querySelector('#require').style.display="none"
                element.parentNode.querySelector('#hint').style.display="block"
            }
        });

        if (check){
            await createFolder(this.state.folder).then(()=>{
                    this.setState({isShown:false})
                }
            )
            await this.props.fetchFoldersUser()
            if (this.props.data)
                this.setState({
                    data: this.props.data,
                })
            toaster.success(
                'Create successful'
            )
        }
        else{
            toaster.warning(
                'Create error'
            )
        }
    }
    isRemoveFolder = (id) =>{
        this.setState({
            removeFolder:id
        })
    }
    removeFolder = async (id) => {
        await deleteFolder(id).then(()=>{
            this.setState({removeFolder:-1})
        })
        await this.props.fetchFoldersUser()
        if (this.props.data)
            this.setState({
                data: this.props.data,
            })
        toaster.success('Delete successful')
    }
    // removeFolder =(id)=>{
    //   /// remove
    //   deleteFolder(id).then(()=>{
    //     window.location.reload()
    //   }
    // )
    //   toaster.success(
    //     'Create successful'
    //   )
    //   this.setState({removeFolder:-1})
    //   //window.location.reload()
    // }
    isEditFolder=(id)=>{
        var datas = this.state.data;
        var index = datas.findIndex(x=>x._id === id)
        var obj = {...datas[index]}
        this.setState({
            editFolder:id,
            folder:{
                ...this.state.folder,
                name:obj.name,
                description:obj.description
            }
        })
    }
    // editFolder =(_id)=>{
    //     // Thong tin sau chinh sua
    //     // tai id = _id
    //     // voi gia tri la folder
    //     editFolderInfo(_id, this.state.folder).then(()=>{
    //       window.location.reload()
    //     }
    //   )
    //     this.setState({editFolder:-1})
    //     toaster.success(
    //         'Edit successful'
    //     )
    // }
    editFolder = async (_id) => {
        await editFolderInfo(_id, this.state.folder).then(()=>{
            this.setState({editFolder:-1})
        })
        await this.props.fetchFoldersUser()
        if (this.props.data)
            this.setState({
                data: this.props.data,
            })
        toaster.success('Edit successful')
    }

    render() {
      console.log(this.state.data)
        return (
            <Pane>
                <UserHeader path="/latest" />

                <Pane
                    width={widthItem}
                    paddingLeft="7%"
                    paddingTop={30}
                    display="flex"
                    flexDirection="column"
                >

                    {/* Add button */}
                    <Pane marginBottom={12}>
                        <Pane
                            backgroundColor="#47B881"
                            height={heightItem}
                            elevation={1}
                            width="100%"
                            onClick={()=>{this.setState({isShown:true})}}
                            textAlign="center"
                            cursor="pointer"
                        >
                            <Text
                                fontSize={16}
                                lineHeight="75px"
                                fontWeight={500}
                                color="white"
                            >
                                + ADD A NEW FOLDER
                            </Text>

                        </Pane>
                        <Pane id="line" width="100%" backgroundColor="#1070CA"></Pane>
                    </Pane>
                    <hr width="100%"/>
                    <Dialog
                        isShown={this.state.isShown}
                        intent="success"
                        title={"Create a new folder"}
                        confirmLabel={"Create"}
                        hasCancel={false}
                        onCloseComplete={()=>{this.setState({isShown:false})}}
                        onConfirm={()=>{this.createFolder()}}
                    >
                        {/* Name field */}
                        <Pane height={100}>
                            <TextInput
                                className='input'
                                width="100%"
                                height={50}
                                marginBottom={7}
                                placeholder={"Enter a title"}
                                onChange={(e) => {this.setTitle(e)}}
                            >
                            </TextInput>
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
                                    FOLDER NAME
                                </Text>
                            </Pane>
                        </Pane>
                        {/* Description field */}
                        <Pane height={100}>
                            <TextInput
                                className='input'
                                width="100%"
                                height={50}
                                marginBottom={7}
                                placeholder={"Enter a description (optional)"}
                                onChange={(e) => {this.setDescription(e)}}
                            >

                            </TextInput>
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

                    </Dialog>

                    {/* List folder */}
                    {this.state.data.map((folder) => (

                        <Pane key={folder._id} height={heightItem} marginTop ={12} >

                            <Pane
                                backgroundColor="white"
                                height={heightItem}
                                width="100%"
                                elevation={1}
                                display="flex"
                                justifyContent={"space-between"}
                            >
                                <Link to={`/folders/${folder._id}`}>
                                    <Pane flex="50%" width={widthItem*3/4}>
                                        <FolderCloseIcon
                                            size={25}
                                            color="#E4E7EB"
                                            bottom={5}
                                            lineHeight="100px"
                                            marginRight={10}
                                            marginLeft={30}
                                        />
                                        <Text fontSize={20} lineHeight="80px" fontWeight={550}>
                                            {folder.name}
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
                                    {/* EDIT FOLDER */}
                                    <Pane onClick={()=>{this.isEditFolder(folder._id)}}>
                                        <Tooltip content="Edit this folder" >
                                            <EditIcon
                                                color="#1070CA"
                                                size={20}
                                            />
                                        </Tooltip>

                                        <Dialog
                                            isShown={this.state.editFolder === folder._id}
                                            onConfirm={()=>{this.editFolder(folder._id)}}
                                            onCloseComplete={
                                                ()=>{
                                                    this.setState({
                                                        editFolder:-1,
                                                        editTitle:'',
                                                        editDescription:''
                                                    })
                                                }
                                            }
                                            title={"EDIT FOLDER"}
                                        >
                                            {/* Name field */}
                                            <Pane height={100}>
                                                <TextInput
                                                    className='input'
                                                    width="100%"
                                                    height={50}
                                                    marginBottom={7}
                                                    placeholder={"Enter a title"}
                                                    value={this.state.folder.name}
                                                    onChange={(e) => {this.setTitle(e)}}
                                                >
                                                </TextInput>
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
                                                        FOLDER NAME
                                                    </Text>
                                                </Pane>
                                            </Pane>
                                            {/* Description field */}
                                            <Pane height={100}>
                                                <TextInput
                                                    className='input'
                                                    width="100%"
                                                    height={50}
                                                    marginBottom={7}
                                                    value={this.state.folder.description}
                                                    placeholder={"Enter a description (optional)"}
                                                    onChange={(e) => {this.setDescription(e)}}
                                                >

                                                </TextInput>
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
                                        </Dialog>
                                    </Pane>

                                    <Pane onClick={()=>{this.isRemoveFolder(folder._id)}}>
                                        <Tooltip content="Remove this folder">
                                            <TrashIcon
                                                color="#EC4C47"
                                                size={20}
                                            />
                                        </Tooltip>
                                        <Dialog
                                            isShown={this.state.removeFolder === folder._id}
                                            onConfirm={()=>{this.removeFolder(folder._id)}}
                                            title={"DELETE FOLDER"}
                                        >
                                            <Pane>
                                                <Text fontSize={18} fontWeight={200} lineHeight={"25px"}>
                                                    <Text fontSize={25} fontWeight={600} >{folder.name}</Text> <hr/>
                                                    Deleting a folder is a PERMANENT action. This cannot be undone.
                                                    Are you sure you want to delete <Text fontWeight={550} color={"red"}>{folder.name}</Text>? The sets in this folder will not be
                                                    deleted.
                                                </Text>
                                            </Pane>
                                        </Dialog>
                                    </Pane>

                                </Pane>

                            </Pane>
                            <Pane id="line" width="100%" backgroundColor="#1070CA"></Pane>
                        </Pane>
                    ))}
                </Pane>

            </Pane>
        )
    }
}
const mapStateToProps = ({ info }) => {
    return { data: { ...info }.data }
}

export default connect(mapStateToProps, { fetchFoldersUser })(Folders)

