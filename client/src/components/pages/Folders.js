import React from 'react'
import { Pane, Menu, FolderCloseIcon, Heading } from 'evergreen-ui'
import { Link } from 'react-router-dom'
import UserHeader from '../UserHeader'

class Folders extends React.Component {
  render() {
    var listFolders = [
      {
        id: 1,
        nameFolder: 'Tien',
        path: '/folders/tien',
      },
      {
        id: 2,
        nameFolder: 'Tien2',
        path: '/latest',
      },
      {
        id: 3,
        nameFolder: 'Tien3',
        path: '/latest',
      },
    ]
    return (
      <Pane>
        <UserHeader path="/latest" />
        <Menu>
          {listFolders.map((folder) => (
            <Pane
              background="#E4E7EB"
              height={50}
              marginLeft={50}
              marginRight={100}
              marginTop={20}
              borderRadius={10}
              paddingTop={10}
            >
              <Menu.Item>
                <Link
                  to={`/folders/${folder.id}`}
                  style={{ textDecoration: 'none', display: 'flex' }}
                >
                  <FolderCloseIcon color="#303545" />
                  <Heading size={600} paddingLeft={10}>
                    {folder.nameFolder}
                  </Heading>
                </Link>
              </Menu.Item>
            </Pane>
          ))}
        </Menu>
      </Pane>
    )
  }
}

export default Folders
