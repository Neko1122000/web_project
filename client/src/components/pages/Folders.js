import React from 'react'
import { Pane, Text, FolderCloseIcon } from 'evergreen-ui'
import { Link } from 'react-router-dom'
import UserHeader from '../UserHeader'

class Folders extends React.Component {

  focus = (e) => {
    var currentFolder = e.target.parentNode.querySelector('#line')
    currentFolder.style.height="3px"
  }
  blur = (e) =>{
    var currentFolder = e.target.parentNode.querySelector('#line')
    currentFolder.style.height="0px"
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
          {listFolders.map((folder) => (

            <Pane key={folder.id} height={120} >
              <Link to={`/folders/${folder.id}`} >
                <Pane
                  backgroundColor="white"
                  height={100}
                  width="100%"
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
