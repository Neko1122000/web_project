import React from 'react'
import { connect } from 'react-redux'
import { Pane, Heading, Avatar } from 'evergreen-ui'

const UserHeader = ({ user }) => {
  return (
    <Pane
      height={200}
      display="flex"
      backgroundColor="white"
      alignItems="center"
      paddingLeft={160}
      borderLeft
    >
      <Avatar src={user.image_link} name={user.username} size={120} />
      <Pane paddingLeft={40} display="flex" height={100}>
        <Heading size={900} fontWeight={700} marginRight={40}>
          {user.username}
        </Heading>
      </Pane>
    </Pane>
  )
}
const mapStateToProps = ({ auth }) => {
  return { user: { ...{ ...auth }.data } }
}

export default connect(mapStateToProps)(UserHeader)
