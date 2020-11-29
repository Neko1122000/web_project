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
import UserHeader from '../UserHeader'

const heightItem = 75
const widthItem = 800

class Folders extends React.Component {
    state = {
        isShown:false,
        folder: {
            name: '',
            description: '',
        },
        data: [
            {
                id: "5fb4fe4a918cd022c4bb7394",
                created_at: "2020-11-18T10:58:18.135Z",
                name: "321",
                description: "123",
                updated_at: "2020-11-19T05:10:28.692Z",
                sets: ["5fb4fe4a918cd022c4bxxxxx"]
            },
            {
                id: 1,
                created_at: "2020-11-11T10:58:18.135Z",
                name: "delete",
                description: "123",
                updated_at: "2020-11-10T05:10:28.692Z",
                sets: ["5fb4fe4a918cd022c4bxxxxx"]
            },
            {
                id: 2,
                created_at: "2020-11-24T10:58:18.135Z",
                name: "test",
                description: "123",
                updated_at: "2020-11-19T05:10:28.692Z",
                sets: ["5fb4fe4a918cd022c4bxxxxx"]
            },
            {
                id: 3,
                created_at: "2020-11-20T10:58:18.135Z",
                name: "learning",
                description: "123",
                updated_at: "2020-11-19T05:10:28.692Z",
                sets: ["5fb4fe4a918cd022c4bxxxxx"]
            },
        ]
    }

    focus = (e) => {
        //var currentFolder = e.target.parentNode.querySelector('#line')
        //currentFolder.style.height="3px"
    }
    blur = (e) =>{
        //var currentFolder = e.target.parentNode.querySelector('#line')
        //currentFolder.style.height="0px"
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
    createFolder = () =>{
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
            console.log(this.state.folder)
            toaster.success(
                'Create successful'
            )
            this.setState({isShown:false})
        }
        else{
            toaster.warning(
                'Create error'
            )
        }
    }
    removeFolder =(id)=>{
      /// remove
      this.setState({
        data:[
          ...this.state.data.filter(item => item.id !== id)
        ]
      })
    }

    render() {

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
                            onMouseEnter={(e) => {this.focus(e)}}
                            onMouseLeave={(e) => {this.blur(e)}}
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

                        <Pane key={folder.id} height={heightItem} marginTop ={12} >
                            
                            <Pane
                                backgroundColor="white"
                                height={heightItem}
                                width="100%"
                                elevation={1}
                                onMouseEnter={(e) => {this.focus(e)}}
                                onMouseLeave={(e) => {this.blur(e)}}
                                display="flex"
                                justifyContent={"space-between"}
                            >
                              <Link to={`/folders/${folder.id}`}>
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
                                    <Pane>
                                        <Tooltip content="Edit this folder" >
                                            <EditIcon
                                                color="#1070CA"
                                                size={20}
                                            />
                                        </Tooltip>
                                    </Pane>

                                    <Pane onClick={()=>{this.removeFolder(folder.id)}}>
                                        <Tooltip content="Remove this folder">
                                            <TrashIcon
                                                color="#EC4C47"
                                                size={20}
                                            />
                                        </Tooltip>
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
export default Folders
