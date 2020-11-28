import React from 'react'
import UserHeader from '../UserHeader'

import { Link } from 'react-router-dom'
import { SearchInput, SelectMenu, Pane, Button, Heading } from 'evergreen-ui'

class Sets extends React.Component {
  state = {
    listGroups: [],
    sort: 'Lastest',
    search: '',
    success: true,
    data: [
      {
        _id: '43',
        created_at: '2020-11-18T10:58:18.135Z',
        name: 'z321',
        description: '123',
        updated_at: '2020-11-19T05:10:28.692Z',
        number_flash_card: 3,
      },
      {
        _id: '5fb4fe4a918c235d022c4bb7394',
        created_at: '2020-11-18T10:58:18.135Z',
        name: 'b321',
        description: '123',
        updated_at: '2020-11-19T05:10:28.692Z',
        number_flash_card: 3,
      },
      {
        _id: '124',
        created_at: '2020-11-18T10:58:18.135Z',
        name: 'c321',
        description: '123',
        updated_at: '2020-11-19T05:10:28.692Z',
        number_flash_card: 3,
      },
    ],
  }

  render() {
    return (
      <Pane background="tint2">
        <UserHeader path="/latest" />
        <Pane paddingLeft="7%" marginTop={30} width={800}>
          {/* Sort and filter bar */}
          <Pane display="flex" justifyContent="space-between">
            <Pane>
              <Heading
                paddingRight={20}
                onClick={() => {
                  console.log(this.state.search)
                }}
              >
                Sort{' '}
              </Heading>
              <SelectMenu
                hasTitle={false}
                hasFilter={false}
                closeOnSelect={true}
                height={70}
                options={['Alphabetical', 'Lastest'].map((label) => ({
                  label,
                  value: label,
                }))}
                selected={this.state.sort}
                onSelect={(item) => this.setState({ sort: item.value })}
              >
                <Button lineHeight="40px" height={40}>
                  {this.state.sort}
                </Button>
              </SelectMenu>
            </Pane>
            <SearchInput
              placeholder="Filter traits..."
              onChange={(e) => {
                this.setState({ search: e.target.value })
              }}
            />
          </Pane>

          {/*Main content*/}
          <Pane>
            {this.state.data.map((item, index) => (
              <Pane key={item._id} name={item.name}>
                {
                  <Pane>
                    <Pane height={80} elevation={1} marginTop={20}>
                      <Link to={`/set/${item._id}`}>
                        <Pane
                          height={75}
                          width="100%"
                          background="white"
                          paddingTop={20}
                          paddingLeft={40}
                        >
                          <Heading fontWeight={600} fontSize={20}>
                            {item.name}
                          </Heading>
                        </Pane>
                      </Link>
                    </Pane>
                  </Pane>
                }
              </Pane>
            ))}
          </Pane>
        </Pane>
      </Pane>
    )
  }
}
export default Sets
