import React from 'react'

import UserHeader from '../UserHeader'
import { Menu,Heading,Pane,Link } from 'evergreen-ui'
class sets extends React.Component {
  render() {
    var listGroups =[
      { 
        id : 1,
        date : 'Tháng 10',
        items : [
          { 
            id : 1,
            path : '/latest',
            amount : 1,
            title : 'Title'
          },
          {
            id : 2,
            path : '/latest',
            amount : 1,
            title : 'Title'
          },
        ]
      },
      { 
        id : 2,
        date : 'Tháng 11',
        items : [
          {
            id : 1,
            path : '/latest',
            amount : '1',
            title : 'Title'
          },
          {
            id : 2,
            amount : '1',
            path : '/latest',
            title : 'Title'
          },
        ]
      },
    ];

    return (
      <Pane>
       <UserHeader path="/latest" />
        <Menu height={400}>
          {listGroups.map(group =>(
            <Menu.Group key = {group.id} title = {group.date}>
                {group.items.map(item =>(
                     <Pane background="yellowTint" >
                         <Menu.Item key = {item.id}>
                            <Link href={item.path}
                              textDecoration="none"
                              height={80}>
                              <Heading size={600}>
                                  {
                                     item.amount + " thuật ngữ    " + item.title
                                   }
                              </Heading>
                            </Link>
                      </Menu.Item>
                     </Pane>
                )
                )}
            </Menu.Group>
          ))}
       </Menu>

  </Pane>
    )
  }
}
export default sets;