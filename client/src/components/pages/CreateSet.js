import React from 'react'
import { Pane, Text, Button, TextInput } from 'evergreen-ui'

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

const CreateSet = () => (
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
      <TextInput
        display="block"
        marginTop={20}
        marginBottom={20}
        height={50}
        width={600}
        placeholder={language.title.en}
        label="PLEASE ENTER A TITLE TO CREATE YOUR SET"
      ></TextInput>
      <TextInput
        marginTop={20}
        marginBottom={20}
        height={50}
        width="50%"
        placeholder={language.des.en}
      ></TextInput>
    </Pane>

    {/* Input field */}
    <Pane>
      <Pane
        width="100%"
        height={50}
        borderTop
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        marginBottom={5}
        border
      ></Pane>
      <Pane
        width="100%"
        height={120}
        borderBottom
        marginBottom={10}
        border
        borderBottomRightRadius={10}
        borderBottomLeftRadius={10}
      ></Pane>
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

export default CreateSet
