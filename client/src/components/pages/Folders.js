import React from 'react'
import { Pane, Menu, FolderCloseIcon, Heading, Link } from 'evergreen-ui'
import UserHeader from '../UserHeader'

class folders extends React.Component {
    render(){
      var listFolders =[
        {
          id : 1,
          nameFolder : 'Tien',
          path : '/latest',
        },
        {
          id : 2,
          nameFolder : 'Tien',
          path : '/latest',
        },
        {
          id : 3,
          nameFolder : 'Tien',
          path : '/latest',
        },
      ]
      return(
        <Pane>
            <UserHeader path="/latest"/>
            <Menu>
                {listFolders.map(folder =>(
                  <Pane
                    background="#E4E7EB"
                    height={50}
                    marginLeft ={50}
                    marginRight ={100}
                    marginTop ={20}
                    borderRadius ={10}
                    paddingTop ={10}
                  >
                    <Menu.Item>
                        <Link 
                          href={folder.path}
                          textDecoration = "none"
                          display = "flex"
                        > 
                            <FolderCloseIcon/>
                            <Heading 
                              size={600}
                              paddingLeft={10}
                            > 
                              {folder.nameFolder} 
                            </Heading>
                        </Link>
                    </Menu.Item>
                  </Pane>
                )
                )}
            </Menu>
        </Pane>
      )
    }
}

export default folders