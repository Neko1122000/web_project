import React from 'react'
import { 
  Pane, 
  Text, 
  Button, 
  TextInput 
} from 'evergreen-ui'
import {DragHandleVerticalIcon, TrashIcon} from 'evergreen-ui'

const language = {
  title: {
    en: 'Enter a title',
    vi: 'Mời nhập tiêu đề',
  },
  des: {
    en: 'Add a description',
    vi: 'Thêm mô tả',
  },
}
class CreateSet extends React.Component{
  constructor(props){
    super(props)
    this.state={
        clicked:false,
        title:'',
        desciption:'',
        set:'',
        img:'',
        language:'',
        is_active:'',
        updated_at:'',
        created_at:''
    }
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
  render(){

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
      >
        Create
      </Button>
    </Pane>

    {/* Informaion field */}
    <Pane>
      <Pane width="50%" marginTop={20} marginBottom={20}>
        <TextInput
          display="block"
          height={50}
          width="100%"
          placeholder={language.title.en}
          label="PLEASE ENTER A TITLE TO CREATE YOUR SET"
          onFocus={(e) => {this.focus(e)}}
          onBlur={(e) => {this.blur(e)}}
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

      <Pane width="50%" marginTop={20} marginBottom={20}>
        <TextInput
          height={50}
          width="100%"
          placeholder={language.des.en}
          onFocus={(e) => {this.focus(e)}}
          onBlur={(e) => {this.blur(e)}}
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
    </Pane>

    {/* Input field */}
    <Pane>
      {/* Action bar */}
      <Pane
        width="100%"
        height={50}
        borderTop
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        marginBottom={5}
        border
        display="flex"
        justifyContent="space-between"
      >
        <Text
          height={50}
          lineHeight="50px"
          marginLeft={30}
          fontSize={16}
        >
          1.
        </Text>
        <Pane 
          paddingRight={40} 
          position="relative"
          top={12}
          height={50}
        >
          <DragHandleVerticalIcon size={20} marginRight={20} color={"#425A70"}/>
          <TrashIcon size={20} color="tomato"/>
        </Pane>
      </Pane>

      {/* Input bar */}
      <Pane
        display="flex"
        justifyContent="space-between"
        width="100%"
        height={150}
        borderBottom
        marginBottom={10}
        border
        borderBottomRightRadius={10}
        borderBottomLeftRadius={10}
      >
        {/* Term side */}
        <Pane marginLeft="2%" width="47%">
          <TextInput
            display="inline-block"
            marginTop={40}
            width="100%"
            height={50}
            onFocus={(e) => {this.focus(e)}}
            onBlur={(e) => {this.blur(e)}}
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

        {/* Definition side */}
        <Pane marginRight="2%" width="47%">
          <TextInput
            marginTop={40}
            height={50}
            width="100%"
            onFocus={(e) => {this.focus(e)}}
            onBlur={(e) => {this.blur(e)}}
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

    {/* Add button */}
    <Pane
      width="100%"
      height={150}
      borderBottom
      marginBottom={10}
      elevation={4}
      onClick={() => alert('Add button')}
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
