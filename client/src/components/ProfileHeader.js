import React, { useState } from 'react'
import { Card, SegmentedControl } from 'evergreen-ui'
import { withRouter } from 'react-router-dom'
const options = [
  { label: 'Recent', value: '/latest' },
  { label: 'Created', value: '/sets' },
  { label: 'Folders', value: '/folders' },
  { label: 'Classes', value: '/classes' },
]
const ProfileHeader = (props) => {
  const [state, setState] = useState(props.path)
  const test = (value) => {
    setState(value)
    props.history.push(value)
  }
  return (
    <Card marginTop={20} height={40} border display="flex" alignItems="center">
      <SegmentedControl
        name="button-size"
        width={360}
        height={40}
        options={options}
        value={state}
        onChange={(value) => test(value)}
      />
    </Card>
  )
}

export default withRouter(ProfileHeader)
