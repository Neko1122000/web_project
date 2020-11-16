import React from 'react'
import { Pane, Menu, Heading, DragHandleVerticalIcon, Link, PeopleIcon } from 'evergreen-ui'
import UserHeader from '../UserHeader'

class classes extends React.Component {
  render() {
    var listClasses = [
      {
        id : 1,
        path : '/latest',
        nameClass:'Tien',
        amountSet: 1,
        amountMember: 1,
        nameSchool: 'Tien'
      },
      {
        id : 1,
        path : '/latest',
        nameClass:'Tien',
        amountSet: 1,
        amountMember: 1,
        nameSchool: 'Tien'
      },
      {
        id : 1,
        path : '/latest',
        nameClass:'Tien',
        amountSet: 1,
        amountMember: 1,
        nameSchool: 'Tien'
      }
    ]
    return(
      <Pane>
        <UserHeader path="/classes" />
        <Menu>
            {
              listClasses.map(classes =>(
                <Pane
                  background="#E4E7EB"
                  height={75}
                  marginLeft ={50}
                  marginRight ={100}
                  marginTop ={20}
                  borderRadius ={10}
                  paddingTop ={10}
                  paddingLeft ={10}
                >
                  <Pane display = "flex">
                    <Heading size={500} paddingLeft={20} paddingRight={20} >{classes.amountSet + " Học phần"}</Heading>
                    <DragHandleVerticalIcon />
                    <Heading size={500} paddingLeft={20} paddingRight={20}>{classes.amountMember + " Thành viên"}</Heading>
                    <DragHandleVerticalIcon />
                    <Heading size={500} paddingLeft={20} paddingRight={20}>{classes.nameSchool}</Heading>
                  </Pane>
                  <Menu.Item>
                    <Link 
                          href={classes.path}
                          textDecoration = "none"
                          display = "flex"
                          paddingTop = {10}
                        > 
                            <PeopleIcon color="#FEF8E7" size={20}/>
                            <Heading 
                              size={500}
                              paddingLeft={10}
                            > 
                              {classes.nameClass} 
                            </Heading>
                    </Link>
                  </Menu.Item>
                </Pane>
              ))
            }
        </Menu>
      </Pane>
    )
  }
}
export default classes
