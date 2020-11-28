import React from 'react';
import { connect } from 'react-redux'
import { 
    Pane, 
    Text, 
    Tooltip, 
    Dialog, 
    SelectMenu, 
    Button, 
    TextInput,
    toaster,
    Heading, 
    SearchInput
} from 'evergreen-ui'
import { 
    AddIcon, 
    TrashIcon, 
    EditIcon, 
    FolderOpenIcon,
    FolderCloseIcon, 
    LearningIcon 
} from 'evergreen-ui'
import {Link} from "react-router-dom";

const heightItem = 75
const widthItem = 800

class Class extends React.Component {
    state = {
        isShown: '',
        sort:'Lastest',
        search:'',
        name: '11A1',
        description:"Lop 11A1",
        numberOfSet:2,
        numberOfMember:19,
        address: 'THPT Ky Anh',
        allow_member_change:true,
        listSets: [
            {
                id: 1,
                setName: "Folder1",
                setInfo: "smt"
            },
            {
                id: 2,
                setName: "Folder2",
                setInfo: "smt2"
            },
            {
                id: 3,
                setName: "Folder3",
                setInfo: "smt3"
            }
        ],
        yourSets: [
            {
                id: 1,
                setName: "Folder1",
                setInfo: "smt"
            },
            {
                id: 2,
                setName: "Folder2",
                setInfo: "smt2"
            },
            {
                id: 3,
                setName: "Folder3",
                setInfo: "smt3"
            },
            {
                id: 4,
                setName: "Folder4",
                setInfo: "smt4"
            },
            {
                id: 5,
                setName: "Folder5",
                setInfo: "smt5"
            }
        ],
        classSets: [
            {
                id: 3,
                setName: "Folder3",
                setInfo: "smt3"
            },
            {
                id: 13,
                setName: "Folder13",
                setInfo: "smt13"
            },
            {
                id: 14,
                setName: "Folder14",
                setInfo: "smt14"
            },
            {
                id: 15,
                setName: "Folder15",
                setInfo: "smt15"
            },
            {
                id: 16,
                setName: "Folder16",
                setInfo: "smt16"
            }
        ],
        data: [
            {
                id: "5fb4fe4a918cd022c4bb7394",
                created_at: "2019-11-18T10:58:18.135Z",
                name: "321Z",
                description: "123",
                updated_at: "2019-11-19T05:10:28.692Z",
                number_flash_card: 3
            },
            {
                id: "5fb4fe4a918cdbb7394",
                created_at: "2020-12-18T10:58:18.135Z",
                name: "321Z",
                description: "123",
                updated_at: "2020-12-19T05:10:28.692Z",
                number_flash_card: 4
            },
            {
                id: "e4a918cd022c4bb7394",
                created_at: "2020-11-19T10:58:18.135Z",
                name: "321Z",
                description: "123",
                updated_at: "2020-11-20T05:10:28.692Z",
                number_flash_card: 31
            },
        ]
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
        let diablog = null;
        switch (this.state.isShown) {
            case "add":
                diablog =
                    <Dialog
                        isShown={this.isShowed()}
                        title={"Add a set"}
                        onCloseComplete={this.showReset}
                        hasFooter={false}
                    >
                        <Pane background="tint1" height={100} textAlign={"center"}>
                            <Link to={'/create-set'}>
                                <Text width="100%" height={100} lineHeight="90px" fontSize={30} color={"green"}
                                      textAlign={"center"}>+ Create a new set</Text>
                            </Link>
                        </Pane>
                        <SelectMenu
                            hasTitle={false}
                            hasFilter={false}
                            options={
                                ['yourSets', 'classSets', 'Banana', 'Cherry', 'Cucumber']
                                    .map(label => ({label, value: label}))
                            }
                            selected={this.state.srcSet}
                            onSelect={item => this.setState({srcSet: item.value})}
                        >
                            <Button>{this.state.srcSet}</Button>
                        </SelectMenu>
                    </Dialog>;
                break;
            case "study":
                diablog =
                    <Dialog
                        isShown={this.isShowed()}
                        title={"Study this folder"}
                        onCloseComplete={this.showReset}
                        hasFooter={false}
                    >
                        <Pane paddingLeft="" display={"flex"} flexFlow={"wrap"} justifyContent={"space-around"}>
                            <Pane height={150} width="33%" background={"greenTint"} elevation={2}
                                  marginBottom={10}><LearningIcon size={45}/></Pane>
                            <Pane height={150} width="33%" background={"greenTint"} elevation={2}
                                  marginBottom={10}><LearningIcon size={45}/></Pane>
                            <Pane height={150} width="33%" background={"greenTint"} elevation={2}
                                  marginBottom={10}><LearningIcon size={45}/></Pane>
                            <Pane height={150} width="33%" background={"greenTint"} elevation={2}
                                  marginBottom={10}><LearningIcon size={45}/></Pane>
                            <Pane height={150} width="33%" background={"greenTint"} elevation={2}
                                  marginBottom={10}><LearningIcon size={45}/></Pane>
                            <Pane height={150} width="33%" background={"greenTint"} elevation={2}
                                  marginBottom={10}><LearningIcon size={45}/></Pane>
                        </Pane>
                    </Dialog>
                break;
            case "edit":
                diablog =
                    <Dialog
                        isShown={this.isShowed}
                        title={"Edit folder"}
                        onCloseComplete={this.showReset}
                        hasCancel={false}
                        confirmLabel={"Save"}
                        onConfirm={this.setName}
                    >
                        <Pane paddingLeft={"3%"} paddingRight={"3%"}>
                            <Pane display={"block"}>
                                <TextInput
                                    ref="name"
                                    display="block"
                                    marginTop={20}
                                    height={50}
                                    width="100%"
                                    placeholder={this.state.name}
                                    value={this.state.name}
                                    onChange={(e)=>{this.setState({name:e.target.value})}}
                                    border="none"
                                    outline="none"
                                />
                                <Text paddingLeft={"1%"}>Title</Text>
                            </Pane>
                            <Pane>
                                <TextInput
                                    marginTop={20}
                                    height={50}
                                    width="100%"
                                    placeholder={this.state.description}
                                    value={this.state.description}
                                    onChange={(e)=>{this.setState({description:e.target.value})}}
                                    placeholder="Add a description"
                                />
                                <Text paddingLeft={"1%"}>Description</Text>
                            </Pane>
                        </Pane>
                    </Dialog>;
                break;
            case "remove":
                diablog =
                    <Dialog
                        intent={"warning"}
                        isShown={this.isShowed()}
                        title={"Remove folder"}
                        onCloseComplete={this.showReset}
                        confirmLabel={"Remove"}
                        onConfirm={()=>{this.removeFolder()}}
                    >
                        <Pane>
                            <Text fontSize={18} fontWeight={200} lineHeight={"25px"}>
                                <Text fontSize={25} fontWeight={600} lineHeight={"30px"}>{this.state.name}</Text> <br/>
                                Deleting a folder is a PERMANENT action. This cannot be undone.
                                Are you sure you want to delete this folder? The sets in this folder will not be
                                deleted.
                            </Text>
                        </Pane>
                    </Dialog>;
                break;
            default:
                break;
        }

        return (
            <Pane background="tint2" width="100%">
 
                {/* Header */}
                <Pane
                    borderBottom
                    display="flex"
                    height={150}
                    background="white"
                    borderBottomRightRadius={20}
                    justifyContent="space-between"
                    marginBottom={50}
                >
                    {/* Info side */}
                    <Pane marginTop="2%" marginLeft="7%" height={45}>
                        <Pane marginBottom={20}>
                            <Text display="inline-block" marginRight={20}>
                                {this.state.listSets.length} sets |
                            </Text>
                            <Text display="inline-block" color={"#E4E7EB"}>
                                created by
                                <Link
                                    to={this.state.path}
                                    style={{color: '#14B5D0', marginLeft: 5}}
                                >
                                    {this.props.user.username}
                                </Link>
                            </Text>
                        </Pane>
                        <Pane display="block">
                            <FolderOpenIcon color="#425A70" size={45} position={"relative"} top={5}/>
                            <Text
                                marginLeft={20}
                                fontSize={40}
                                fontWeight={500}
                                lineHeight="40px"
                            >
                                {this.state.name}
                            </Text>
                        </Pane>

                    </Pane>

                    {/* Action side */}
                    <Pane marginTop="4%" marginRight="10%">
                        <Tooltip content="Add set">
                            <AddIcon
                                onClick={() => {
                                    this.setState({isShown: 'add'})
                                }}
                                size={25}
                                color="lawngreen"
                            />
                        </Tooltip>
                        <Tooltip content={"Study"}>
                            <LearningIcon
                                onClick={() => {
                                    this.setState({isShown: 'study'})
                                }}
                                size={25} color={"#735DD0"}
                                marginLeft={10}
                            />
                        </Tooltip>
                        <Tooltip content={"Edit"}>
                            <EditIcon
                                onClick={() => {
                                    this.setState({isShown: 'edit'})
                                }}
                                size={25} color="dodgerblue"
                                marginLeft={10}
                            />
                        </Tooltip>
                        <Tooltip content={"Remove"}>
                            <TrashIcon
                                onClick={() => {
                                    this.setState({isShown: "remove"})
                                }}
                                size={25}
                                color="tomato"
                                marginLeft={10}
                            />
                        </Tooltip>

                    </Pane>

                    {/* Diablog */}
                    {diablog}

                </Pane>
                
                {/* Container */}
                <Pane  display="flex">
                    <Pane paddingLeft={"7%"} flex="100%">
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
                        {/* List sets */}
                        <Pane>
                            {this.state.data.map((set) => (
                            <Pane>
                            {set.name.includes(this.state.search) ? (
                                <Link to={`/set/${set.id}`}>
                                    <Pane 
                                        key={set.id} 
                                        height={heightItem} 
                                        marginTop ={12} 
                                    >
                                        <Pane
                                            backgroundColor="white"
                                            height={heightItem}
                                            width="100%"
                                            elevation={1}
                                            //onMouseEnter={(e) => {this.focus(e)}}
                                            //onMouseLeave={(e) => {this.blur(e)}}
                                            display="flex"
                                            justifyContent={"space-between"}
                                        >

                                            <Pane>
                                                <FolderCloseIcon
                                                    size={25}
                                                    color="#E4E7EB"
                                                    bottom={5}
                                                    lineHeight="100px"
                                                    marginRight={10}
                                                    marginLeft={30}
                                                />
                                                <Text fontSize={20} lineHeight="80px" fontWeight={550}>
                                                    {set.name}
                                                </Text>
                                            </Pane>

                                            <Pane
                                                display="flex"
                                                justifyContent={"space-around"}
                                                width="12%"
                                                paddingTop={25}
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

                                                <Pane>
                                                    <Tooltip content="Remove this folder">
                                                        <TrashIcon
                                                            color="#EC4C47"
                                                            size={20}
                                                        />
                                                    </Tooltip>
                                                </Pane>

                                            </Pane>
                                        </Pane>
                                        <Pane id="line" width="100%" backgroundColor="#1070CA"></Pane>
                                    
                                    </Pane> 
                                </Link>
                            ):<Pane></Pane>}
                            </Pane>
                        ))}
                    </Pane>
                    </Pane>
                    <Pane flex={"400px"} paddingLeft={30} paddingTop={30} >
                        <Heading>Class detail</Heading>
                        <Pane display="flex" flexDirection="column">
                            <Text>{this.state.address}</Text>
                            <Text>{this.state.numberOfSet + " sets"}</Text>
                            <Text>{this.state.numberOfSet + " members"}</Text>
                        </Pane>
                    </Pane>
                </Pane>
    
            </Pane>
        )
    }
}
const mapStateToProps = ({ auth }) => {
    return { user: { ...{ ...auth }.data } }
  }
export default connect(mapStateToProps)(Class)