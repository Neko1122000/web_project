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
    Tooltip,
    EditIcon, 
    TrashIcon,
    Dialog
} from 'evergreen-ui'
import { connect } from 'react-redux'
import { fetchSetsUser } from '../../actions'
const heightItem = 75
const widthItem = 800

class Sets extends React.Component {
    async componentDidMount() {
        await this.props.fetchSetsUser()
        if (this.props.data)
            this.setState({
                data: this.props.data,
            })
    }
    state = {
        listGroups: [],
        sort: 'Lastest',
        search: '',
        isShown:-1,
        currentMonth: '',
        success: true,
        data: [],
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

    redirect = (path) =>{
        window.location.href=path
    }
    removeSet = (id)=>{
      this.setState({
        data:[
          this.state.data.filter(item => item.id !== id)
        ], 
        isShown:-1
      })
    }
    isRemoveSet=(id)=>{
      this.setState({isShown:id})
    }

    render() {
        return (
            <Pane background="tint2">
                <UserHeader path="/latest" />
                <Pane paddingLeft="7%" marginTop={30} paddingBottom={30} width={widthItem}>
                    {/* Add new set */}
                    <Pane
                        height={heightItem}
                        width="100%"
                        background="#47B881"
                        textAlign="center"
                        marginBottom={20}
                        elevation={1}
                    >
                        <Text
                            fontWeight={600}
                            fontSize={16}
                            lineHeight="75px"
                            display="block"
                            color="white"
                            //onMouseEnter={(e)=>{this.focus(e)}}
                            //onMouseLeave={(e)=>{this.blur(e)}}
                            onClick={()=>{this.redirect('/create-set')}}
                            cursor={"pointer"}
                        >
                            + ADD A  NEW SET
                        </Text>
                    </Pane>

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
                        {!this.state.data
                            ? 'loading'
                            : this.state.data.map((item, index) => (
                                <Pane key={item._id} name={item.name}>
                                    {item.name.includes(this.state.search) ? (
                                        <Pane>
                                            <Pane height={heightItem} elevation={1} marginTop={20}>
                                              
                                              <Pane
                                                  height={75}
                                                  width="100%"
                                                  background="white"
                                                  paddingTop={20}
                                                  paddingLeft={40}
                                                  display="flex"
                                                  justifyContent="space-between"
                                              >
                                                <Link to={`/set/${item._id}`}>
                                                  <Pane width={widthItem*3/4}>
                                                    <Text
                                                        fontWeight={600}
                                                        fontSize={20}
                                                        marginBottom={6}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                    <br/>
                                                    <Text>
                                                        {item.number_flash_card+' terms'}
                                                    </Text>
                                                  </Pane>
                                                </Link>
                                                <Pane
                                                    display="flex"
                                                    justifyContent={"space-around"}
                                                    width="12%"
                                                    paddingTop={5}
                                                    paddingRight={20}
                                                >
                                                    <Pane>
                                                        <Tooltip content="Edit this folder" >
                                                            <EditIcon
                                                                color="#1070CA"
                                                                size={20}
                                                            />
                                                        </Tooltip>
                                                    </Pane>

                                                    <Pane onClick={()=>{this.isRemoveSet(item._id)}}>
                                                        <Tooltip content="Remove this folder">
                                                            <TrashIcon
                                                                color="#EC4C47"
                                                                size={20}
                                                            />
                                                        </Tooltip>
                                                    </Pane>

                                                </Pane>
                                              </Pane>
                                                
                                            </Pane>
                                            <Dialog
                                              isShown={this.state.isShown===item._id}
                                              onConfirm={()=>{this.removeSet(item._id)}}
                                              title={"DELETE SET" }
                                            >
                                              <Pane>
                                                <Text fontSize={18} fontWeight={200} lineHeight={"25px"}>
                                                    <Text fontSize={25} fontWeight={600} >{item.name}</Text> <hr/>
                                                    Deleting a set is a PERMANENT action. This cannot be undone.
                                                    Are you sure you want to delete <Text color={"red"} fontWeight={550}>{item.name}</Text> ? 
                                                </Text>
                                              </Pane>
                                          </Dialog>
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
