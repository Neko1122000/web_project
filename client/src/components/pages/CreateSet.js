import React from 'react'
import {
    Pane,
    Text,
    Button,
    TextInput,
    Tooltip,
    Dialog,
    Select
} from 'evergreen-ui'

import { TrashIcon} from 'evergreen-ui'

const visible = ['everyone', 'only_me', 'classes', 'password']
const update = ['only_me', 'classes', 'password']

class CreateSet extends React.Component{
    state = {
        name:'',
        description:'',
        updated_by: update[0],
        updated_password:'',
        class_updated:'',
        visible_by:visible[0],
        visible_password:'',
        class_visible:'',
        flash_cards:[
            {
                title:'',
                description:'',
                language:''
            },
            {
                title:'',
                description:'',
                language:''
            },
        ],
        isShow:false
    }


    focus = (e) =>{
        var currentLine = e.target.parentNode.querySelector('div')
        currentLine.style.backgroundColor="#1070CA"
        currentLine.style.height="3px"
    }
    blur = (e) =>{
        var currentLine = e.target.parentNode.querySelector('div')
        currentLine.style.backgroundColor="black"
        currentLine.style.height="1px"
    }
    setTitle = (e, index) =>{
        var flash_cards = this.state.flash_cards;
        let addTitle = {...flash_cards[index]}
        addTitle.title = e.target.value;
        flash_cards[index] = addTitle;
        this.setState({
            flash_cards: flash_cards
        })
    }
    setDescription = (e, index) =>{
        var flash_cards = this.state.flash_cards;
        let addTitle = {...flash_cards[index]}
        addTitle.description = e.target.value;
        flash_cards[index] = addTitle;
        this.setState({
            flash_cards: flash_cards
        })
    }

    addCard = () =>{
        var newCard = {
            title: '',
            description: '',
            language: ''
        }
        this.setState({flash_cards: [
                ...this.state.flash_cards,
                newCard
            ]
        })
    }

    removeCard(index){
        var arr = this.state.flash_cards
        arr = arr.filter((_, i) => i != index)
        this.setState({flash_cards:arr})
        //this.setState((prevState) => ({
         //   flash_cards: prevState.flash_cards.filter((_, i) => i != index)
        //}))
    }
    render(){

        var visible_title = '';
        var editable_title = '';

        switch (this.state.visible_by) {
            case visible[0]:
                visible_title="Visible to "+visible[0];
                break;
            case visible[1]:
                visible_title="Visible only to me";
                break;
            case visible[2]:
                visible_title="Visible to certain classes"
                break;
            case visible[3]:
                visible_title="Visible with a password"
                break;
            default:break
        }
        switch (this.state.updated_by) {
            case update[0]:
                editable_title="Only editable by me";
                break;
            case update[1]:
                editable_title="Editable by certain classes";
                break;
            case update[2]:
                editable_title="Editable by people with the password"
                break;
            default:break
        }


        return(
            <Pane marginLeft="auto" marginRight="auto" marginTop={75} width={1200}>

                {/* Header */}
                <Pane>
                    <Text fontSize={16} fontWeight={700}>
                        Create a new study set
                    </Text>
                    <Button
                        height={40}
                        fontWeight={400}
                        fontSize={16}
                        float="right"
                        backgroundColor="#3ccfcf"
                        onClick={()=>{console.log(this.state)}}
                    >
                        Create
                    </Button>
                </Pane>

                {/* Informaion field */}
                <Pane>

                    {/* Name */}
                    <Pane width="50%" marginTop={20} marginBottom={20}>
                        <TextInput
                            display="block"
                            height={50}
                            width="100%"
                            placeholder="Enter a title"
                            label="PLEASE ENTER A TITLE TO CREATE YOUR SET"
                            onFocus={(e) => {this.focus(e)}}
                            onBlur={(e) => {this.blur(e)}}
                            onChange={(e)=>{this.setState({name:e.target.value})}}
                        ></TextInput>
                        <Pane
                            width="100%"
                            marginTop={10}
                            marginBottom={10}
                            height={1}
                            backgroundColor="black"
                        ></Pane>
                        <Text
                            fontSize={16}
                            marginLeft={10}
                            fontWeight={500}
                            color="#A6B1BB"
                        >
                            TITLE
                        </Text>
                    </Pane>

                    {/* Description */}
                    <Pane width="50%" marginTop={20} marginBottom={20}>
                        <TextInput
                            height={50}
                            width="100%"
                            placeholder="Add a description"
                            onFocus={(e) => {this.focus(e)}}
                            onBlur={(e) => {this.blur(e)}}
                            onChange={(e)=>{this.setState({description:e.target.value})}}
                        ></TextInput>
                        <Pane
                            width="100%"
                            marginTop={10}
                            marginBottom={10}
                            height={1}
                            backgroundColor="black"
                        ></Pane>
                        <Text
                            fontSize={16}
                            marginLeft={10}
                            fontWeight={500}
                            color="#A6B1BB"
                        >
                            DESCRIPTION
                        </Text>
                    </Pane>

                    {/* Change privacy */}
                    <Pane display={"block"} height={70}>
                        <Pane float={"right"}>

                            <Pane
                                display={"inline-block"}
                                textAlign={"right"}
                                verticalAlign={"top"}
                            >
                                <Pane>
                                    <Text fontWeight={550}>
                                        {visible_title}
                                    </Text>
                                </Pane>
                                <Text
                                    color={"#1070CA"}
                                    fontWeight={500}
                                    onClick={()=>{this.setState({isShow:true})}}
                                >
                                    Change
                                </Text>
                            </Pane>

                            { this.state.visible_by != visible[1]?(
                                <Pane
                                    display={"inline-block"}
                                    marginLeft={"2rem"}
                                    textAlign={"right"}
                                    verticalAlign={"top"}
                                >
                                    <Pane>
                                        <Text fontWeight={550}>
                                            {editable_title}
                                        </Text>
                                    </Pane>
                                    <Text
                                        color={"#1070CA"}
                                        fontWeight={500}
                                        onClick={()=>{this.setState({isShow:true})}}
                                    >
                                        Change
                                    </Text>
                                </Pane>
                                ):<Pane></Pane>
                            }
                        </Pane>
                    </Pane>

                </Pane>

                <Dialog
                    isShown={this.state.isShow}
                    cancelLabel={"SAVE"}
                    onCloseComplete={()=>{this.setState({isShow:false})}}
                >
                    
                    <Pane display={"flex"} justifyContent={"space-around"}>
                        
                        {/* Visible side */}
                        <Pane
                            width={"45%"}
                        >
                            <Text display={"block"} fontSize={16} paddingBottom={10}>
                                Visible to
                            </Text>
                            <Select
                                value={this.state.visible_by}
                                width="80%"
                                onChange={e => this.setState({ visible_by: e.target.value })}
                            >
                                {visible.map((item, index) =>(
                                    <option key={index} value={item} selected>{item}</option>
                                ))}
                            </Select>
                        </Pane>

                        {/* Editable side */}
                        <Pane
                            width={"45%"}
                        >

                            <Text display={"block"} fontSize={16} paddingBottom={10}>
                                Editable
                            </Text>
                            <Select
                                value={this.state.updated_by}
                                width="80%"
                                onChange={e => this.setState({ update_by: e.target.value })}
                            >
                                {update.map((item, index) =>(
                                    <option key={index} value={item} selected>{item}</option>
                                ))}
                            </Select>
                        </Pane>
                    </Pane>
                </Dialog>


                {/* Input field */}
                {this.state.flash_cards.map((item, index)=>(

                    <Pane key={index}>
                        {/* Action bar */}
                        <Pane
                            width="100%"
                            height={50}
                            backgroundColor={"#1070CA"}
                            borderTop
                            borderTopLeftRadius={10}
                            borderTopRightRadius={10}
                            border
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Text
                                height={50}
                                lineHeight="50px"
                                marginLeft={30}
                                fontSize={16}
                                color={"white"}
                            >
                                {index+1}
                            </Text>
                            <Pane
                                paddingRight={40}
                                position="relative"
                                top={12}
                                height={50}
                            >
                                { this.state.flash_cards.length>2?(

                                    <Tooltip content={"Remove this card"}>
                                        <TrashIcon size={20} color="red" onClick={() => {this.removeCard(index)}}/>
                                    </Tooltip>

                                ):( <Pane></Pane>)
                                }


                            </Pane>
                        </Pane>

                        {/* Input bar */}
                        <Pane
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                            height={150}
                            borderBottom
                            marginBottom={15}
                            border
                            borderBottomRightRadius={10}
                            borderBottomLeftRadius={10}
                        >
                            {/* title side */}
                            <Pane marginLeft="2%" width="47%">
                                <TextInput
                                    display="inline-block"
                                    marginTop={40}
                                    width="100%"
                                    height={50}
                                    onFocus={(e) => {this.focus(e)}}
                                    onBlur={(e) => {this.blur(e)}}
                                    onChange={(e)=>{this.setTitle(e, index)}}
                                >
                                </TextInput>
                                <Pane
                                    width="100%"
                                    marginTop={10}
                                    marginBottom={10}
                                    height={1}
                                    backgroundColor="black"
                                ></Pane>
                                <Text
                                    fontSize={16}
                                    marginLeft={10}
                                    fontWeight={500}
                                    color="#A6B1BB"
                                >
                                    TERM
                                </Text>

                            </Pane>

                            {/* Description side */}
                            <Pane marginRight="2%" width="47%">
                                <TextInput
                                    marginTop={40}
                                    height={50}
                                    width="100%"
                                    onFocus={(e) => {this.focus(e)}}
                                    onBlur={(e) => {this.blur(e)}}
                                    onChange={(e)=>{this.setDescription(e, index)}}
                                >
                                </TextInput>
                                <Pane
                                    width="100%"
                                    marginTop={10}
                                    marginBottom={10}
                                    height={1}
                                    backgroundColor="black"
                                ></Pane>
                                <Text
                                    fontSize={16}
                                    marginLeft={10}
                                    fontWeight={500}
                                    color="#A6B1BB"
                                >
                                    DEFINITION
                                </Text>
                            </Pane>
                        </Pane>

                    </Pane>
                ))}

                {/* Add button */}
                <Pane
                    width="100%"
                    height={150}
                    borderBottom
                    marginBottom={10}
                    elevation={4}
                    onClick={this.addCard}
                    cursor="pointer"
                >
                    <Text
                        display="block"
                        fontSize={20}
                        lineHeight="150px"
                        width="100%"
                        color="black"
                        textAlign="center"
                        justifyContent="center"
                        fontWeight={500}
                    >
                        + ADD CARD
                    </Text>
                </Pane>
            </Pane>
        )
    }
}

export default CreateSet
