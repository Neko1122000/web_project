import React from 'react'
import { Pane } from 'evergreen-ui'
import UserHeader from '../UserHeader'
import { Menu,Heading } from 'evergreen-ui'
class sets extends React.Component {
  render() {
    var listGroups =[
      { 
        id : 1,
        date : "Tháng 10",
        items : [
          { 
            id : 1,
            amount : "1",
            title : "Title"
          },
          {
            id : 2,
            amount : "1",
            title : "Title"
          },
        ]
      },
      { 
        id : 2,
        date : "Tháng 10",
        items : [
          {
            id : 1,
            amount : "1",
            title : "Title"
          },
          {
            id : 2,
            amount : "1",
            title : "Title"
          },
        ]
      },
    ];

    return (
      <Pane>
       <UserHeader path="/sets" />
        <Menu height={400}>
          {listGroups.map(group =>(
            <Menu.Group key = {group.id} date ={group.date}>
                {group.items.map(item =>(
                  <Menu.Item >
                      <Heading size = {400}> {item.amount} </Heading>
                      <Heading size = {400}> {item.title} </Heading>
                  </Menu.Item>
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