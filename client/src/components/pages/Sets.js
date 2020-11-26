import React from 'react'
import UserHeader from '../UserHeader'

import { Link } from 'react-router-dom'
import {
  SearchInput, 
  SelectMenu, 
  Pane, 
  Button, 
  Text 
} from 'evergreen-ui'

class Sets extends React.Component {
  state = {
    sort:'Lastest',
    search:''
  }
  
  render() {
    var listGroups = [
      {
        id: 1,
        date: 'Tháng 10',
        items: [
          {
            id: 1,
            amount: 10,
            title: 'Title11',
          },
          {
            id: 2,
            amount: 4,
            title: 'Title12',
          },
          {
            id: 3,
            amount: 9,
            title: 'Title23',
          },
          {
            id: 4,
            amount: 9,
            title: 'Title24',
          },
        ],
      },
      {
        id: 2,
        date: 'Tháng 11',
        items: [
          {
            id: 1,
            amount: 5,
            title: 'Title21',
          },
          {
            id: 2,
            amount: 9,
            title: 'Title22',
          },
          {
            id: 3,
            amount: 9,
            title: 'Title23',
          },
          {
            id: 4,
            amount: 9,
            title: 'Title24',
          },
          {
            id: 5,
            amount: 9,
            title: 'Title25',
          },
        ],
      },
    ]

    return (
      <Pane background="tint2">
        <UserHeader path="/latest" />
        <Pane paddingLeft="7%" marginTop={30} width={800}>

          {/* Sort and filter bar */}
          <Pane
            display="flex" 
            justifyContent="space-between"
          >
            <Pane>
              <Text paddingRight={20} onClick={()=>{console.log(this.state.search)}}>Sort  </Text>
              <SelectMenu
                hasTitle={false}
                hasFilter={false}
                closeOnSelect={true}
                height={70}
                options={
                    ['Alphabetical', 'Lastest']
                    .map(label => ({label, value: label}))
                }
                selected={this.state.sort}
                onSelect={item => this.setState({sort: item.value})}
              >
                <Button lineHeight="40px" height={40} >
                  {this.state.sort}
                </Button>
              </SelectMenu>
            </Pane>
            <SearchInput 
              placeholder="Filter traits..." 
              onChange={(e) => {this.setState({search:e.target.value})}}
            />
          </Pane>
          
          {/*Main content*/}
          <Pane>
            {listGroups.map((group) => (
              
              <Pane key={group.id} title={group.date}>
                
                { /* Date create bar */
                  this.state.sort == "Lastest" ?
                    <Pane marginBottom={30}  marginTop={40}>
                      <Text 
                        display="table-cell" 
                        whiteSpace="nowrap" 
                        paddingRight={10}
                      >
                        {group.date}
                      </Text>
                      <Pane 
                        display="table-cell" 
                        width="100%" 
                        verticalAlign="bottom"
                      >
                        <hr/>
                      </Pane>
                    </Pane>:<Pane></Pane>
                }

              {/* List sets */}
                {group.items.map((item) => (
                  <Pane key={item.id}>
                    {item.title.includes(this.state.search)?
                    <Pane
                      height={80}
                      elevation={1}
                      marginTop={20}
                    >
                      <Link to={`/set/${item.id}`}>
                        <Pane 
                          height={75} 
                          width="100%"
                          background="white"
                          paddingTop={20}
                          paddingLeft={40}
                          
                        >
                          <Text 
                            fontWeight={400} 
                            fontSize={16} 
                            verticalAlign="top"
                            display="block"
                            paddingBottom={5}
                            color="#A6B1BB"
                          >
                            {item.amount + " terms"}
                          </Text>
                          <Text fontWeight={600} fontSize={20}>
                            {item.title}
                          </Text>

                        </Pane>
                
                      </Link>
                    </Pane>: <Pane></Pane>
                    }
                  </Pane>
                ))}
              </Pane>
            ))}
          </Pane>
        </Pane>
      </Pane>
    )
  }
}
export default Sets
