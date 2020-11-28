import React from 'react'
import {
  FolderCloseIcon,
  Pane,
  Text,
  TextInput,
  Dialog
} from 'evergreen-ui'
import { Link } from 'react-router-dom'
import UserHeader from '../UserHeader'

class Folders extends React.Component {
  state = {
    isShown:false,
    set: {
        title: '',
        description: '',
    }
  }

  focus = (e) => {
    var currentFolder = e.target.parentNode.querySelector('#line')
    currentFolder.style.height="3px"
  }
  blur = (e) =>{
    var currentFolder = e.target.parentNode.querySelector('#line')
    currentFolder.style.height="0px"
  }
  setTitle = (e) =>{
    this.setState({
        set:{
           ...this.state.set,
           title: e.target.value,
        }
    })
  }
  setDescription = (e) =>{
    this.setState({
        set:{
            ...this.state.set,
            description: e.target.value,
        }
    })
  }

  render() {
    var listFolders = [
      {
        id: 1,
        nameFolder: 'Tien',
        set:2,
        path: '/folders/tien',
      },
      {
        id: 2,
        nameFolder: 'Tien2',
        set:4,
        path: '/latest',
      },
      {
        id: 3,
        nameFolder: 'Tien3',
        set:10,
        path: '/latest',
      },
    ]
    return (
      <Pane>
        <UserHeader path="/latest" />

        <Pane 
          width={800}
          paddingLeft={50}
          paddingTop={30}
          display="flex"
          flexDirection="column"
        >

          {/* Add button */}
          <Pane marginBottom={30}>
            <Pane
              backgroundColor="#47B881"
              height={100}
              elevation={2}
              width="100%"
              onMouseEnter={(e) => {this.focus(e)}}
              onMouseLeave={(e) => {this.blur(e)}}
              onClick={()=>{this.setState({isShown:true})}}
              textAlign="center"
              cursor="pointer"
            >
              <Text 
                fontSize={22} 
                lineHeight="100px" 
                fontWeight={500} 
                color="white"
              >
                + ADD A NEW FOLDER
              </Text>

            </Pane>
            <Pane id="line" width="100%" backgroundColor="#1070CA"></Pane>
          </Pane>

          <Dialog
            isShown={this.state.isShown}
            intent="success"
            title={"Create a new folder"}
            confirmLabel={"Create"}
            hasCancel={false}
            onCloseComplete={()=>{this.setState({isShown:false})}}
          >
            {/* Name field */}
            <Pane height={100}>
                <TextInput
                    width="100%"
                    height={50}
                    marginBottom={7}
                    placeholder={"Enter a title"}
                    onChange={(e) => {this.setTitle(e)}}
                >
                </TextInput>
                <Text paddingLeft={5}>
                    FOLDER NAME
                </Text>
            </Pane>

            {/* Description field */}
            <Pane height={100}>
                <TextInput
                    width="100%"
                    height={50}
                    marginBottom={7}
                    placeholder={"Enter a description (optional)"}
                    onChange={(e) => {this.setDescription(e)}}
                >

                </TextInput>
                <Text paddingLeft={5}>
                    DESCRIPTION
                </Text>
            </Pane>

          </Dialog>

          {/* List folder */}        
          {listFolders.map((folder) => (

            <Pane key={folder.id} height={120} >
              <Link to={`/folders/${folder.id}`} >
                <Pane
                  backgroundColor="white"
                  height={100}
                  width="100%" 
                  elevation={1}
                  onMouseEnter={(e) => {this.focus(e)}}
                  onMouseLeave={(e) => {this.blur(e)}}
                >
                  <FolderCloseIcon 
                    size={25} 
                    color="#E4E7EB" 
                    bottom={5}
                    lineHeight="100px"
                    marginRight={10}
                    marginLeft={30}
                  />
                  <Text fontSize={22} lineHeight="100px" fontWeight={500}>
                    {folder.nameFolder}
                  </Text>

                </Pane>
                <Pane id="line" width="100%" backgroundColor="#1070CA"></Pane>

              </Link>
            </Pane>
          ))}
        </Pane>

      </Pane>
    )
  }
}
export default Folders
