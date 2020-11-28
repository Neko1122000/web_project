import React from 'react'
import UserHeader from '../UserHeader'

import { Link } from 'react-router-dom'
import {
  SearchInput,
  SelectMenu,
  Pane,
  Button,
  Heading,
  Text,
} from 'evergreen-ui'
import { connect } from 'react-redux'
import { fetchSetsUser } from '../../actions'

class Sets extends React.Component {
  componentDidMount() {
    this.props.fetchSetsUser()
  }
  state = {
    listGroups: [],
    sort: 'Lastest',
    search: '',
    currentMonth: '',
    success: true,
    data: [
      {
        _id: '43',
        created_at: '2020-11-15T10:58:18.135Z',
        name: 'z 2020-11-15',
        description: '123',
        updated_at: '2020-11-19T05:10:28.692Z',
        number_flash_card: 3,
      },
      {
        _id: '5fb4fe4a918c235d022c4bb7394',
        created_at: '2020-11-18T10:58:18.135Z',
        name: 'b 2020 11 18',
        description: '123',
        updated_at: '2020-11-19T05:10:28.692Z',
        number_flash_card: 3,
      },
      {
        _id: '124',
        created_at: '2020-11-14T10:58:18.135Z',
        name: 'c 2020 11 14',
        description: '123',
        updated_at: '2020-11-19T05:10:28.692Z',
        number_flash_card: 3,
      },
    ],
  }

  formatDate(date) {
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' }
    return new Date(date).toLocaleDateString([], options)
  }
  formatDateByMonth(date) {
    var options = { month: 'numeric' }
    return new Date(date).toLocaleDateString([], options)
  }

  sortAlphabetical = () => {
    this.setState({
      data: [...this.state.data.sort((a, b) => a.name.localeCompare(b.name))],
    })
  }
  sortLastest = () => {
    this.setState({
      data: [
        ...this.state.data.sort((a, b) =>
          this.formatDate(b.created_at)
            .split('/')
            .reverse()
            .join()
            .localeCompare(
              this.formatDate(a.created_at).split('/').reverse().join()
            )
        ),
      ],
    })
  }

  sort = (sortType) => {
    this.state.sort !== 'Lastest' ? this.sortLastest() : this.sortAlphabetical()
    this.setState({
      sort: sortType,
    })
  }

  render() {
    console.log(this.props.data)
    return (
      <Pane background="tint2">
        <UserHeader path="/latest" />
        <Pane paddingLeft="7%" marginTop={30} marginBottom={30} width={800}>
          {/* Sort and filter bar */}
          <Pane display="flex" justifyContent="space-between">
            <Pane>
              <Heading paddingRight={20}>Sort </Heading>
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
                onSelect={(item) => this.sort(item.value)}
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
            {!this.props.data
              ? 'loading'
              : this.props.data.map((item, index) => (
                  <Pane key={item._id} name={item.name}>
                    {item.name.includes(this.state.search) ? (
                      <Pane>
                        {/* Date create bar 
                      this.state.sort === "Lastest"?
                        <Pane marginBottom={30}  marginTop={40}>
                          <Text 
                            display="table-cell" 
                            whiteSpace="nowrap" 
                            paddingRight={10}
                          >
                            {this.formatDateByMonth(item.created_at)}
                          </Text>
                          <Pane 
                            display="table-cell" 
                            width="100%" 
                            verticalAlign="bottom"
                          >
                            <hr/>
                          </Pane>
                        </Pane>:<Pane></Pane>*/}

                        <Pane height={80} elevation={1} marginTop={20}>
                          <Link to={`/set/${item._id}`}>
                            <Pane
                              height={75}
                              width="100%"
                              background="white"
                              paddingTop={20}
                              paddingLeft={40}
                            >
                              <Heading
                                fontWeight={600}
                                fontSize={20}
                                marginBottom={6}
                              >
                                {item.name}
                              </Heading>
                              <Text>
                                {item.number_flash_card + ' thuật ngữ'}
                              </Text>
                            </Pane>
                          </Link>
                        </Pane>
                      </Pane>
                    ) : (
                      <Pane></Pane>
                    )}
                  </Pane>
                ))}
          </Pane>
        </Pane>
      </Pane>
    )
  }
}

const mapStateToProps = ({ info }) => {
  return { data: { ...info }.data }
}

export default connect(mapStateToProps, { fetchSetsUser })(Sets)
