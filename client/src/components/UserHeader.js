import React from 'react'
import { connect } from 'react-redux'
import { Pane, Heading, Avatar } from 'evergreen-ui'
import ProfileHeader from './ProfileHeader'

const UserHeader = ({ user, path }) => {
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
      <Pane paddingLeft={40} display="flex" height={100} flexDirection="column">
        <Heading size={900} fontWeight={700} marginRight={40}>
          {user.username}
        </Heading>
        <ProfileHeader path={path} />
      </Pane>
    </Pane>
  )
}
const mapStateToProps = ({ auth }) => {
  return { user: { ...{ ...auth }.data } }
}

export default connect(mapStateToProps)(UserHeader)
