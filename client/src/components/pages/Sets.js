import React from 'react'
import UserHeader from '../UserHeader'

import { Link } from 'react-router-dom'
import { Menu, Heading, Pane } from 'evergreen-ui'

class Sets extends React.Component {
  render() {
    var listGroups = [
      {
        id: 1,
        date: 'Tháng 10',
        items: [
          {
            id: 1,
            amount: 1,
            title: 'Title',
          },
          {
            id: 2,
            amount: 1,
            title: 'Title',
          },
        ],
      },
      {
        id: 2,
        date: 'Tháng 11',
        items: [
          {
            id: 1,
            amount: '1',
            title: 'Title',
          },
          {
            id: 2,
            amount: '1',
            title: 'Title',
          },
        ],
      },
    ]

    return (
      <Pane>
        <UserHeader path="/latest" />
        <Menu>
          {listGroups.map((group) => (
            <Menu.Group key={group.id} title={group.date}>
              {group.items.map((item) => (
                <Pane
                  background="#E4E7EB"
                  height={50}
                  marginLeft={50}
                  marginRight={100}
                  marginTop={20}
                  borderRadius={10}
                  paddingTop={20}
                  key={item.id}
                >
                  <Menu.Item>
                    <Link
                      to={`/set/${item.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Heading size={600}>
                        {item.amount + ' thuật ngữ    ' + item.title}
                      </Heading>
                    </Link>
                  </Menu.Item>
                </Pane>
              ))}
            </Menu.Group>
          ))}
        </Menu>
      </Pane>
    )
  }
}
export default Sets
