import React from 'react'
import { Pane, Heading, Text } from 'evergreen-ui'

export default () => (
  <Pane
    height={200}
    display="flex"
    backgroundColor="white"
    justifyContent="center"
    flexDirection="column"
    paddingLeft={160}
  >
    <Heading>Header</Heading>
    <Text>Name</Text>
  </Pane>
)
