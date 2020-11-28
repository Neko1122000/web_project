import React from 'react'
import {
  Pane,
  Text,
  Dialog,
  TextInput,
  Checkbox
} from 'evergreen-ui'
import UserHeader from '../UserHeader'
import { Link } from 'react-router-dom'

class Classes extends React.Component {
  state = {
    isShown:false,
    name:'',
    description:'',
    address:'',
    allow_member_change:true,
  }

  blur = (e)=>{
    var element = e.target
    element.style.color = "black"
  }
  focus = (e) =>{
    var element = e.target
    element.style.color = "#1070CA"
  }

  render() {
    var listClasses = [
      {
        id: 1,
        path: '/latest',
        nameClass: 'Tien',
        amountSet: 1,
        amountMember: 1,
        nameSchool: 'Tien',
      },
      {
        id: 2,
        path: '/latest',
        nameClass: 'Tien',
        amountSet: 1,
        amountMember: 1,
        nameSchool: 'Tien',
      },
      {
        id: 3,
        path: '/latest',
        nameClass: 'Tien',
        amountSet: 1,
        amountMember: 1,
        nameSchool: 'Tien',
      },
    ]
    console.log(this.state)
    return (
      <Pane  background="tint2">
        <UserHeader path="/classes" />

        <Pane paddingLeft="7%" marginTop={30} width={800}>

          {/* Add new class */}
          <Pane 
            height={75} 
            width="100%"
            background="#47B881"
            textAlign="center"
            marginBottom={20}
          >
            <Text 
              fontWeight={600} 
              fontSize={16} 
              lineHeight="75px"
              display="block"
              //onMouseEnter={(e)=>{this.focus(e)}}
              //onMouseLeave={(e)=>{this.blur(e)}}
              onClick={()=>{this.setState({isShown:true})}}
              cursor={"pointer"}
            >
              + ADD A CLASS
            </Text>
          </Pane>

          <hr/>
          
          <Dialog
            isShown={this.state.isShown}
            intent="success"
            title={"Create a new class"}
            hasCancel={false}
            onCloseComplete={()=>{this.setState({isShown:false})}}
          >
            {/* Input field */}
            <Pane height={130}>
              <TextInput 
                width="100%" 
                height={50} 
                marginBottom={7}
                placeholder={"Enter a class name (subject, teacher, year, section, etc.)"}
                onChange={(e) => {this.setState({name:e.target.value})}}
              >
              </TextInput>
              <Text paddingLeft={5}>
                CLASS NAME
              </Text>
            </Pane>

            <Pane height={130}>
              <TextInput
                width="100%" 
                height={50} 
                marginBottom={7}
                placeholder={"Enter a description (optional)"}
                onChange={(e) => {this.setState({description:e.target.value})}}
              >

              </TextInput>
              <Text paddingLeft={5}>
                DESCRIPTION
              </Text>
            </Pane>

            {/* Address */}
            <Pane height={70}>
              
              <TextInput 
                width="100%" 
                height={50} 
                marginBottom={7}
                placeholder={"Enter the address"}
                onChange={(e) => {this.setState({address:e.target.value})}}
              >
              </TextInput>
              <Text paddingLeft={5}>
                ADDRESS
              </Text>

            </Pane>

            {/* Allow member change */}
            <Pane 
              width="100%" 
              display="flex" 
              justifyContent={"space-around"} 
              paddingTop={20}
            >
              <Checkbox 
                checked={this.state.allow_member_change} 
                onChange={e => this.setState({ allow_member_change: e.target.checked })}
                fontSize={20}
              />

              <Text 
                fontSize={16}
                fontWeight={500} 
                lineHeight="50px" 
                paddingRight={30}
                onClick={e => this.setState({ allow_member_change: !this.state.allow_member_change })}
              >
                Allow your students to add study sets and new members
              </Text>

            </Pane>
            
          </Dialog>


          {listClasses.map((classes) => (

            <Pane
              key={classes.id}
              height={80}
              elevation={1}
              marginTop={20}
            >
              <Link to={`/classes/${classes.id}`}>
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
                    {classes.amountSet + " terms"}
                  </Text>
                  
                  <Text fontWeight={600} fontSize={20}>
                    {classes.nameClass}
                  </Text>

                </Pane>
              </Link>
            </Pane>
          ))}
        </Pane>
      </Pane>
    )
  }
}
export default Classes
