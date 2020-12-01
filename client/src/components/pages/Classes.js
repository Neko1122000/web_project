import React from 'react'
import {
    Pane,
    Text,
    Dialog,
    TextInput,
    Checkbox,
    toaster,
    Tooltip,
    TrashIcon,
    EditIcon,
} from 'evergreen-ui'
import UserHeader from '../UserHeader'
import { Link } from 'react-router-dom'

const heightItem = 75
const widthItem = 800

class Classes extends React.Component {
    state = {
        isShown: false,
        removeClass: -1,
        editClass:-1,
        class: {
            name: '',
            description: '',
            address: '',
            allow_member_change: true,
        },
        listClasses: [
            {
                _id: 1,
                name: '11A1',
                description: 'Lop 11A1',
                numberOfSet: 4,
                numberOfFolder: 2,
                numberOfMember: 19,
                address: 'THPT Ky Anh',
                allow_member_change: true,
            },
            {
                _id: 2,
                name: '11A2',
                description: 'Lop 11A2',
                numberOfSet: 14,
                numberOfFolder: 2,
                numberOfMember: 9,
                address: 'THPT Ky Anh',
                allow_member_change: true,
            },
            {
                _id: 3,
                name: '11A3',
                description: 'Lop 11A3',
                numberOfSet: 8,
                numberOfFolder: 3,
                numberOfMember: 14,
                address: 'THPT Ky Anh',
                allow_member_change: true,
            },
        ],
    }

    focus = (e) => {
        //var currentFolder = e.target.parentNode.querySelector('#line')
        //currentFolder.style.height="3px"
    }
    blur = (e) => {
        //var currentFolder = e.target.parentNode.querySelector('#line')
        //currentFolder.style.height="0px"
    }
    createClass = () => {
        let check = true
        var inputs = document.querySelectorAll('div .input')
        inputs.forEach((element) => {
            if (element.value === '') {
                element.parentNode.querySelector('#require').style.display = 'block'
                element.parentNode.querySelector('#hint').style.display = 'none'
                check = false
            } else {
                element.parentNode.querySelector('#require').style.display = 'none'
                element.parentNode.querySelector('#hint').style.display = 'block'
            }
        })
        if (check) {
            console.log(this.state.class)
            toaster.success('Create successful')
            this.setState({ isShown: false })
        } else {
            console.log(inputs)
            toaster.warning('Create error')
        }
    }

    isRemoveClass = (id) => {
        this.setState({ removeClass: id })
    }
    removeClass = (id) => {
        this.setState({
            listClasses: [...this.state.listClasses.filter((item) => item.id !== id)],
        })
        toaster.success('Create successful')
    }
    isEditClass=(id)=>{
        var datas = this.state.listClasses;
        var index = datas.findIndex(x=>x._id === id)
        var obj = {...datas[index]}
        this.setState({
            editClass:id,
            class:{
                ...this.state.class,
                name:obj.name,
                description:obj.description,
                address:obj.address,
                allow_member_change:obj.allow_member_change
            }
        })
    }
    editClass=(id)=>{
        console.log(id)
        console.log(this.state.class)
    }

    render() {
        return (
            <Pane background="tint2">
                <UserHeader path="/classes" />

                <Pane paddingLeft="7%" marginTop={30} width={widthItem}>
                    {/* Add button */}
                    <Pane marginBottom={20}>
                        <Pane
                            backgroundColor="#47B881"
                            height={heightItem}
                            elevation={1}
                            width="100%"
                            onClick={() => {
                                this.setState({ isShown: true })
                            }}
                            textAlign="center"
                            cursor="pointer"
                        >
                            <Text
                                fontSize={16}
                                lineHeight="75px"
                                fontWeight={500}
                                color="white"
                            >
                                + ADD A NEW CLASS
                            </Text>
                        </Pane>
                        <Pane id="line" width="100%" backgroundColor="#1070CA"></Pane>
                    </Pane>

                    <hr />

                    <Dialog
                        isShown={this.state.isShown}
                        intent="success"
                        title={'Create a new class'}
                        hasCancel={false}
                        onCloseComplete={() => {
                            this.setState({ isShown: false })
                        }}
                        onConfirm={() => {
                            this.createClass()
                        }}
                    >
                        {/* Input field */}
                        <Pane height={130}>
                            <TextInput
                                className="input"
                                width="100%"
                                height={50}
                                marginBottom={7}
                                placeholder={
                                    'Enter a class name (subject, teacher, year, section, etc.)'
                                }
                                onChange={(e) => {
                                    this.setState({
                                        class: {
                                            ...this.state.class,
                                            name: e.target.value,
                                        },
                                    })
                                }}
                            ></TextInput>
                            <Pane paddingLeft={10}>
                                <Text
                                    fontWeight={550}
                                    fontSize={18}
                                    marginBottom={10}
                                    id={'require'}
                                    color={'red'}
                                    display={'none'}
                                >
                                    {' '}
                                    THIS IS REQUIRED
                                </Text>
                                <Text
                                    id={'hint'}
                                    fontSize={16}
                                    fontWeight={500}
                                    color="#A6B1BB"
                                    display={'block'}
                                >
                                    CLASS NAME
                                </Text>
                            </Pane>
                        </Pane>

                        <Pane height={130}>
                            <TextInput
                                className="input"
                                width="100%"
                                height={50}
                                marginBottom={7}
                                placeholder={'Enter a description (optional)'}
                                onChange={(e) => {
                                    this.setState({
                                        class: {
                                            ...this.state.class,
                                            description: e.target.value,
                                        },
                                    })
                                }}
                            ></TextInput>
                            <Pane paddingLeft={10}>
                                <Text
                                    fontWeight={550}
                                    fontSize={18}
                                    marginBottom={10}
                                    id={'require'}
                                    color={'red'}
                                    display={'none'}
                                >
                                    {' '}
                                    THIS IS REQUIRED
                                </Text>
                                <Text
                                    id={'hint'}
                                    fontSize={16}
                                    fontWeight={500}
                                    color="#A6B1BB"
                                    display={'block'}
                                >
                                    DESCRIPTION
                                </Text>
                            </Pane>
                        </Pane>

                        {/* Address */}
                        <Pane height={70}>
                            <TextInput
                                className="input"
                                width="100%"
                                height={50}
                                marginBottom={7}
                                placeholder={'Enter the address'}
                                onChange={(e) => {
                                    this.setState({
                                        class: {
                                            ...this.state.class,
                                            address: e.target.value,
                                        },
                                    })
                                }}
                            ></TextInput>
                            <Pane paddingLeft={10}>
                                <Text
                                    fontWeight={550}
                                    fontSize={18}
                                    marginBottom={10}
                                    id={'require'}
                                    color={'red'}
                                    display={'none'}
                                >
                                    {' '}
                                    THIS IS REQUIRED
                                </Text>
                                <Text
                                    id={'hint'}
                                    fontSize={16}
                                    fontWeight={500}
                                    color="#A6B1BB"
                                    display={'block'}
                                >
                                    ADDRESS
                                </Text>
                            </Pane>
                        </Pane>

                        {/* Allow member change */}
                        <Pane
                            width="100%"
                            display="flex"
                            justifyContent={'space-around'}
                            paddingTop={20}
                        >
                            <Checkbox
                                checked={this.state.class.allow_member_change}
                                onChange={(e) =>
                                    this.setState({
                                        class: {
                                            ...this.state.class,
                                            allow_member_change: e.target.checked,
                                        },
                                    })
                                }
                                fontSize={20}
                            />

                            <Text
                                fontSize={16}
                                fontWeight={500}
                                lineHeight="50px"
                                paddingRight={30}
                                onClick={(e) =>
                                    this.setState({
                                        class: {
                                            ...this.state.class,
                                            allow_member_change: e.target.checked,
                                        },
                                    })
                                }
                            >
                                Allow your students to add study sets and new members
                            </Text>
                        </Pane>
                    </Dialog>

                    {this.state.listClasses.map((classes, index) => (
                        <Pane key={index} height={heightItem} elevation={1} marginTop={20}>
                            <Pane
                                height={heightItem}
                                width="100%"
                                background="white"
                                paddingTop={8}
                                paddingLeft={40}
                                onMouseEnter={(e) => {
                                    this.focus(e)
                                }}
                                onMouseLeave={(e) => {
                                    this.blur(e)
                                }}
                            >
                                <Link to={`/classes/${classes.name}`}>
                                    <Pane width={(widthItem * 3) / 4} marginBottom={7}>
                                        <Text
                                            fontWeight={400}
                                            fontSize={16}
                                            color="#A6B1BB"
                                        >
                                            {classes.numberOfSet + ' sets'}
                                        </Text>
                                        <Text color="#A6B1BB" >
                                            {' | '}{classes.numberOfMember + ' members'}
                                        </Text>
                                        <Text color="#A6B1BB" >
                                            {' | '}{classes.address }
                                        </Text>
                                    </Pane>
                                </Link>
                                <Pane display="flex" justifyContent="space-between">
                                    <Pane>
                                        <Text fontWeight={600} fontSize={20}>
                                            {classes.name}
                                        </Text>
                                    </Pane>
                                    <Pane
                                        display="flex"
                                        justifyContent={"space-around"}
                                        width="12%"
                                        paddingTop={25}
                                        paddingRight={20}
                                    >
                                        {/* EDIT FOLDER */}
                                        <Pane onClick={()=>{this.isEditClass(classes._id)}}>
                                            <Tooltip content="Edit this folder" >
                                                <EditIcon
                                                    color="#1070CA"
                                                    size={20}
                                                />
                                            </Tooltip>

                                            <Dialog
                                                isShown={this.state.isShown}
                                                intent="success"
                                                title={'Create a new class'}
                                                hasCancel={false}
                                                onCloseComplete={() => {
                                                    this.setState({ isShown: false })
                                                }}
                                                onConfirm={() => {
                                                    this.createClass()
                                                }}
                                            >
                                                {/* Input field */}
                                                <Pane height={130}>
                                                    <TextInput
                                                        className="input"
                                                        width="100%"
                                                        height={50}
                                                        marginBottom={7}
                                                        placeholder={
                                                            'Enter a class name (subject, teacher, year, section, etc.)'
                                                        }
                                                        onChange={(e) => {
                                                            this.setState({
                                                                class: {
                                                                    ...this.state.class,
                                                                    name: e.target.value,
                                                                },
                                                            })
                                                        }}
                                                    ></TextInput>
                                                    <Pane paddingLeft={10}>
                                                        <Text
                                                            fontWeight={550}
                                                            fontSize={18}
                                                            marginBottom={10}
                                                            id={'require'}
                                                            color={'red'}
                                                            display={'none'}
                                                        >
                                                            {' '}
                                                            THIS IS REQUIRED
                                                        </Text>
                                                        <Text
                                                            id={'hint'}
                                                            fontSize={16}
                                                            fontWeight={500}
                                                            color="#A6B1BB"
                                                            display={'block'}
                                                        >
                                                            CLASS NAME
                                                        </Text>
                                                    </Pane>
                                                </Pane>

                                                <Pane height={130}>
                                                    <TextInput
                                                        className="input"
                                                        width="100%"
                                                        height={50}
                                                        marginBottom={7}
                                                        placeholder={'Enter a description (optional)'}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                class: {
                                                                    ...this.state.class,
                                                                    description: e.target.value,
                                                                },
                                                            })
                                                        }}
                                                    ></TextInput>
                                                    <Pane paddingLeft={10}>
                                                        <Text
                                                            fontWeight={550}
                                                            fontSize={18}
                                                            marginBottom={10}
                                                            id={'require'}
                                                            color={'red'}
                                                            display={'none'}
                                                        >
                                                            {' '}
                                                            THIS IS REQUIRED
                                                        </Text>
                                                        <Text
                                                            id={'hint'}
                                                            fontSize={16}
                                                            fontWeight={500}
                                                            color="#A6B1BB"
                                                            display={'block'}
                                                        >
                                                            DESCRIPTION
                                                        </Text>
                                                    </Pane>
                                                </Pane>

                                                {/* Address */}
                                                <Pane height={70}>
                                                    <TextInput
                                                        className="input"
                                                        width="100%"
                                                        height={50}
                                                        marginBottom={7}
                                                        placeholder={'Enter the address'}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                class: {
                                                                    ...this.state.class,
                                                                    address: e.target.value,
                                                                },
                                                            })
                                                        }}
                                                    ></TextInput>
                                                    <Pane paddingLeft={10}>
                                                        <Text
                                                            fontWeight={550}
                                                            fontSize={18}
                                                            marginBottom={10}
                                                            id={'require'}
                                                            color={'red'}
                                                            display={'none'}
                                                        >
                                                            {' '}
                                                            THIS IS REQUIRED
                                                        </Text>
                                                        <Text
                                                            id={'hint'}
                                                            fontSize={16}
                                                            fontWeight={500}
                                                            color="#A6B1BB"
                                                            display={'block'}
                                                        >
                                                            ADDRESS
                                                        </Text>
                                                    </Pane>
                                                </Pane>

                                                {/* Allow member change */}
                                                <Pane
                                                    width="100%"
                                                    display="flex"
                                                    justifyContent={'space-around'}
                                                    paddingTop={20}
                                                >
                                                    <Checkbox
                                                        checked={this.state.class.allow_member_change}
                                                        onChange={(e) =>
                                                            this.setState({
                                                                class: {
                                                                    ...this.state.class,
                                                                    allow_member_change: e.target.checked,
                                                                },
                                                            })
                                                        }
                                                        fontSize={20}
                                                    />

                                                    <Text
                                                        fontSize={16}
                                                        fontWeight={500}
                                                        lineHeight="50px"
                                                        paddingRight={30}
                                                        onClick={(e) =>
                                                            this.setState({
                                                                class: {
                                                                    ...this.state.class,
                                                                    allow_member_change: e.target.checked,
                                                                },
                                                            })
                                                        }
                                                    >
                                                        Allow your students to add study sets and new members
                                                    </Text>
                                                </Pane>
                                            </Dialog>
                                        </Pane>
                                        <Pane onClick={()=>{this.isRemoveClass(classes._id)}}>
                                            <Tooltip content="Remove this class">
                                                <TrashIcon
                                                    color="#EC4C47"
                                                    size={20}
                                                />
                                            </Tooltip>
                                            <Dialog
                                                isShown={this.state.removeClass === classes._id}
                                                onConfirm={()=>{this.removeClass(classes._id)}}
                                                title={"DELETE CLASS"}
                                            >
                                                <Pane>
                                                    <Text fontSize={18} fontWeight={200} lineHeight={"25px"}>
                                                        <Text fontSize={25} fontWeight={600} >{classes.name}</Text> <hr/>
                                                        Deleting a class is a PERMANENT action. This cannot be undone.
                                                        Are you sure you want to delete <Text fontWeight={550} color={"red"}>{classes.name}</Text>? The sets and folders in this class will not be
                                                        deleted.
                                                    </Text>
                                                </Pane>
                                            </Dialog>
                                        </Pane>
                                    </Pane>
                                </Pane>
                            </Pane>
                        </Pane>
                    ))}
                </Pane>
            </Pane>
        )
    }
}
export default Classes
