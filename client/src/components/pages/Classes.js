import React from 'react'
import {
  Pane,
  Text
} from 'evergreen-ui'
import UserHeader from '../UserHeader'
import { Link } from 'react-router-dom'

class Classes extends React.Component {
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
    return (
      <Pane  background="tint2">
        <UserHeader path="/classes" />

        <Pane paddingLeft="7%" marginTop={30} width={800}>

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
