import React from 'react'
import {
    Pane,
    Text,
    Dialog,
    TextInput,
    Checkbox,
    Button,
    toaster,
    Tooltip,
    TrashIcon,
    EditIcon,
} from 'evergreen-ui'
import UserHeader from '../UserHeader'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {fetchClasses, createClass, editClass, joinClass} from '../../actions'

const heightItem = 75
const widthItem = 800

class Classes extends React.Component {
    async componentDidMount() {
        await this.props.fetchClasses()
        if (this.props.data)
            this.setState({
                listClasses: this.props.data,
            })
    }
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

        ],
    }


    createClass = async() => {
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
                check = true
            }
        })
        if (check) {
            await createClass(this.state.class)
            //reload data
            await this.props.fetchClasses()
            if (this.props.data)
                this.setState({
                    listClasses: this.props.data,
                })
            toaster.success('Create successful')
            this.setState({ isShown: false })
        } else {
            //console.log(inputs)
            toaster.warning('Create error')
        }
    }

    isRemoveClass = (id) => {
        this.setState({ removeClass: id })
    }
    removeClass =async(id) => {
        await editClass(id)
        await this.props.fetchClasses()
        if (this.props.data)
            this.setState({
                listClasses: this.props.data,
                removeClass: -1
            })
        toaster.success('Remove successful')
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
    editClass=async(id)=>{
        await editClass(id, this.state.class)
        await this.props.fetchClasses()
        if (this.props.data)
            this.setState({
                listClasses: this.props.data,
                editClass: -1
            })
        toaster.success('Edit successful')
    }

    render() {
        console.log(this.props)
        return (
            <Pane background="tint2">
                <UserHeader path="/classes" />
                <TextInput onChange={(e) => this.setState({class:{
                    ...this.state.class, name : e.target.value
            }})}></TextInput>
            <Button onClick= {async() => {await this.props.fetchClasses(this.state.class.name);
            if (this.props.data)  this.setState({
                listClasses: this.props.data,
            }); console.log(this.props.data)
            }}></Button>
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
                                    'Enter a class name (subject, teacher, year, section, etc...)'
                                }
                                onChange={(e) => {
                                    this.setState({
                                        class: {
                                            ...this.state.class,
                                            name: e.target.value,
                                        },
                                    });
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
                                    });
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
                                onChange={async(e) => {
                                    await this.setState({
                                        class: {
                                            ...this.state.class,
                                            address: e.target.value,
                                        },
                                    });
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
                                onChange={(e) => {
                                    this.setState({
                                        class: {
                                            ...this.state.class,
                                            allow_member_change:e.target.checked,
                                        },
                                    });
                                }}
                                fontSize={20}
                            />

                            <Text
                                fontSize={16}
                                fontWeight={500}
                                lineHeight="50px"
                                paddingRight={30}
                                onClick={(e) => {
                                    this.setState({
                                        class: {
                                            ...this.state.class,
                                            allow_member_change: !e.target.parentNode.querySelector('label input').checked,
                                        },
                                    });
                                }
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
                            >
                                <Link to={`/classes/${classes._id}`}>
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
                                        paddingRight={20}
                                    >
                                            <Button onClick={() => joinClass(classes._id)}>Join</Button>
                                        {/* EDIT FOLDER */}
                                        <Pane onClick={()=>{this.isEditClass(classes._id)}}>

                                            <Tooltip content="Edit this folder" >
                                                <EditIcon
                                                    color="#1070CA"
                                                    size={20}
                                                />
                                            </Tooltip>

                                            <Dialog
                                                isShown={this.state.editClass === classes._id}
                                                intent="success"
                                                title={'Edit this class'}
                                                hasCancel={false}
                                                onCloseComplete={() => {
                                                    this.setState({ editClass: -1})
                                                }}
                                                onConfirm={() => {
                                                    this.editClass(classes._id)
                                                }}
                                            >
                                                {/* Input field */}
                                                <Pane height={130}>
                                                    <TextInput
                                                        className="input"
                                                        width="100%"
                                                        height={50}
                                                        marginBottom={7}
                                                        value={this.state.class.name}
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
                                                        value={this.state.class.description}
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
                                                        value={this.state.class.address}
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
                                                                    allow_member_change: 
                                                                        !e.target.parentNode.
                                                                        querySelector('label input').checked,
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
                                                onCloseComplete={()=>{this.setState({removeClass:-1})}}
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
const mapStateToProps = ({ info }) => {
    return { data: { ...info }.data }
}

export default connect(mapStateToProps, { fetchClasses })(Classes)