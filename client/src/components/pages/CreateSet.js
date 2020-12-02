import React from 'react'
import {
  Pane,
  Text,
  Button,
  TextInput,
  Tooltip,
  Dialog,
  SelectMenu,
  toaster,
  TrashIcon,
} from 'evergreen-ui'

import { createSet } from '../../actions'

const visible = ['everyone', 'only_me', 'classes', 'password']
const update = ['only_me', 'classes', 'password']

class CreateSet extends React.Component {
  state = {
    set: {
      name: '',
      description: '',
      updated_by: update[0],
      updated_password: '',
      class_updated: [],
      visible_by: visible[0],
      visible_password: '',
      class_visible: [],
      flashcards: [
        {
          title: '',
          description: '',
          language: 'VN',
        },
        {
          title: '',
          description: '',
          language: 'VN',
        },
      ],
    },
    isShow: false,
  }

  focus = (e) => {
    var currentLine = e.target.parentNode.querySelector('div')
    currentLine.style.backgroundColor = '#1070CA'
    currentLine.style.height = '3px'
  }
  blur = (e) => {
    var currentLine = e.target.parentNode.querySelector('div')
    currentLine.style.backgroundColor = 'black'
    currentLine.style.height = '1px'
  }
  setTitle = (e, index) => {
    var flash_cards = this.state.set.flashcards
    let addTitle = { ...flash_cards[index] }
    addTitle.title = e.target.value
    flash_cards[index] = addTitle
    this.setState({
      set: {
        ...this.state.set,
        flashcards: flash_cards,
      },
    })
  }
  setDescription = (e, index) => {
    var flash_cards = this.state.set.flashcards
    let addTitle = { ...flash_cards[index] }
    addTitle.description = e.target.value
    flash_cards[index] = addTitle
    this.setState({
      set: {
        ...this.state.set,
        flashcards: flash_cards,
      },
    })
  }
  redirect() {
    window.location.href = '/sets'
  }
  submit = async () => {
    var inputs = document.querySelectorAll('input')
    var check = true

    inputs.forEach((item) => {
        if (item.value === '') {
            item.parentNode.querySelector('#require').style.display = 'block'
            item.parentNode.querySelector('#hint').style.display = 'none'
            check = false
        } else {
            item.parentNode.querySelector('#require').style.display = 'none'
            item.parentNode.querySelector('#hint').style.display = 'block'
        }
    })
    if (check){
        await createSet(this.state.set).then(()=>{
            window.setTimeout(() => {
                this.redirect()
            }, 500)
        })
        toaster.success(
            'Create successful'
        )
    }
  }
  addCard = () => {
    var newCard = {
      title: '',
      description: '',
      language: 'VN',
    }
    this.setState({
      set: {
        ...this.state.set,
        flashcards: [...this.state.set.flashcards, newCard],
      },
    })
  }
  removeCard(index) {
    this.setState({
      set: {
        ...this.state.set,
        flashcards: [
          ...this.state.set.flashcards.filter((_, i) => i !== index),
        ],
      },
    })
  }

  render() {
    var visible_title = ''
    var editable_title = ''

    switch (this.state.set.visible_by) {
      case visible[0]:
        visible_title = 'Visible to ' + visible[0]
        break
      case visible[1]:
        visible_title = 'Visible only to me'
        break
      case visible[2]:
        visible_title = 'Visible to certain classes'
        break
      case visible[3]:
        visible_title = 'Visible with a password'
        break
      default:
        break
>>>>>>> 3e295ad524124a069abc34ef260cd1ab6398a828
    }
    switch (this.state.set.updated_by) {
      case update[0]:
        editable_title = 'Only editable by me'
        break
      case update[1]:
        editable_title = 'Editable by certain classes'
        break
      case update[2]:
        editable_title = 'Editable by people with the password'
        break
      default:
        break
    }

    return (
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
            onClick={this.submit}
          >
            Create
          </Button>
        </Pane>

        {/* Informaion field */}
        <Pane>
          {/* Name */}
          <Pane width="50%" marginTop={20} marginBottom={20}>
            <TextInput
              required={true}
              display="block"
              height={50}
              width="100%"
              placeholder="Enter a title"
              label="PLEASE ENTER A TITLE TO CREATE YOUR SET"
              onFocus={(e) => {
                this.focus(e)
              }}
              onBlur={(e) => {
                this.blur(e)
              }}
              onChange={(e) => {
                this.setState({
                  set: {
                    ...this.state.set,
                    name: e.target.value,
                  },
                })
              }}
            ></TextInput>
            <Pane
              width="100%"
              marginTop={10}
              marginBottom={10}
              height={1}
              backgroundColor="black"
            ></Pane>

            <Pane paddingLeft={10}>
              <Text
                fontWeight={550}
                fontSize={18}
                marginBottom={10}
                id={'require'}
                color={'red'}
                display={'none'}
              >
                {' '}
                THIS IS REQUIRED
              </Text>
              <Text
                id={'hint'}
                fontSize={16}
                fontWeight={500}
                color="#A6B1BB"
                display={'block'}
              >
                TITLE
              </Text>
            </Pane>
          </Pane>

          {/* Description */}
          <Pane width="50%" marginTop={20} marginBottom={20}>
            <TextInput
              height={50}
              width="100%"
              placeholder="Add a description"
              onFocus={(e) => {
                this.focus(e)
              }}
              onBlur={(e) => {
                this.blur(e)
              }}
              onChange={(e) => {
                this.setState({
                  set: {
                    ...this.state.set,
                    description: e.target.value,
                  },
                })
              }}
            ></TextInput>
            <Pane
              width="100%"
              marginTop={10}
              marginBottom={10}
              height={1}
              backgroundColor="black"
            ></Pane>
            <Pane paddingLeft={10}>
              <Text
                fontWeight={550}
                fontSize={18}
                marginBottom={10}
                id={'require'}
                color={'red'}
                display={'none'}
              >
                {' '}
                THIS IS REQUIRED
              </Text>
              <Text
                id={'hint'}
                fontSize={16}
                fontWeight={500}
                color="#A6B1BB"
                display={'block'}
              >
                DESCRIPTION
              </Text>
            </Pane>
          </Pane>

          {/* Change privacy */}
          <Pane display={'block'} height={70}>
            <Pane float={'right'}>
              <Pane
                display={'inline-block'}
                textAlign={'right'}
                verticalAlign={'top'}
              >
                <Pane>
                  <Text fontWeight={550}>{visible_title}</Text>
                </Pane>
                <Text
                  color={'#1070CA'}
                  fontWeight={500}
                  onClick={() => {
                    this.setState({ isShow: true })
                  }}
                >
                  Change
                </Text>
              </Pane>

              {this.state.set.visible_by !== visible[1] ? (
                <Pane
                  display={'inline-block'}
                  marginLeft={'2rem'}
                  textAlign={'right'}
                  verticalAlign={'top'}
                >
                  <Pane>
                    <Text fontWeight={550}>{editable_title}</Text>
                  </Pane>
                  <Text
                    color={'#1070CA'}
                    fontWeight={500}
                    onClick={() => {
                      this.setState({ isShow: true })
                    }}
                  >
                    Change
                  </Text>
                </Pane>
              ) : (
                <Pane></Pane>
              )}
            </Pane>
          </Pane>
        </Pane>

        <Dialog
          isShown={this.state.isShow}
          header={'Options'}
          cancelLabel={'SAVE'}
          onCloseComplete={() => {
            this.setState({ isShow: false })
          }}
        >
          <Pane display={'flex'} justifyContent={'space-around'}>
            {/* Visible side */}
            <Pane width={'45%'}>
              <Text
                display={'block'}
                fontSize={16}
                paddingBottom={10}
                fontWeight={500}
              >
                VISIBLE TO
              </Text>
              <SelectMenu
                width="240px"
                hasFilter={false}
                hasTitle={false}
                options={visible.map((label) => ({ label, value: label }))}
                selected={this.state.set.visible_by}
                onSelect={(item) => {
                  this.setState({
                    set: {
                      ...this.state.set,
                      visible_by: item.value,
                    },
                  })
                }}
              >
                <Pane
                  borderRadius={5}
                  height={35}
                  lineHeight="35px"
                  paddingLeft={20}
                  fontSize={20}
                  elevation={1}
                  backgroundColor={'#579AD9'}
                  color={'white'}
                >
                  {this.state.set.visible_by}
                </Pane>
              </SelectMenu>

              <Text
                paddingLeft={7}
                lineHeight="35px"
                marginBottom={20}
                color={'#A6B1BB'}
              >
                Who can see your set
              </Text>

              {this.state.set.visible_by === visible[3] ? (
                <Pane>
                  <TextInput
                    required={true}
                    display="block"
                    marginTop={10}
                    height={40}
                    width="100%"
                    placeholder="Enter a password"
                    onChange={(e) => {
                      this.setState({
                        set: {
                          ...this.state.set,
                          visible_password: e.target.value,
                        },
                      })
                    }}
                  ></TextInput>
                  <Text>PASSWORD</Text>
                </Pane>
              ) : (
                <Pane></Pane>
              )}
            </Pane>

            {/* Editable side */}
            {this.state.set.visible_by !== visible[1] ? (
              <Pane width={'45%'}>
                <Text
                  display={'block'}
                  fontSize={16}
                  paddingBottom={10}
                  fontWeight={500}
                >
                  EDITABLE
                </Text>

                <SelectMenu
                  width="240px"
                  hasFilter={false}
                  hasTitle={false}
                  options={update.map((label) => ({ label, value: label }))}
                  selected={this.state.set.updated_by}
                  onSelect={(item) => {
                    this.setState({
                      set: {
                        ...this.state.set,
                        updated_by: item.value,
                      },
                    })
                  }}
                >
                  <Pane
                    borderRadius={5}
                    height={35}
                    lineHeight="35px"
                    paddingLeft={20}
                    fontSize={20}
                    elevation={1}
                    backgroundColor={'#579AD9'}
                    color={'white'}
                  >
                    {this.state.set.updated_by}
                  </Pane>
                </SelectMenu>

                <Text
                  paddingLeft={7}
                  lineHeight="35px"
                  marginBottom={20}
                  color={'#A6B1BB'}
                >
                  Who can edit your set
                </Text>

                {this.state.set.updated_by === update[2] ? (
                  <Pane>
                    <TextInput
                      required={true}
                      display="block"
                      marginTop={10}
                      height={40}
                      width="100%"
                      placeholder="Enter a password"
                      onChange={(e) => {
                        this.setState({
                          set: {
                            ...this.state.set,
                            updated_password: e.target.value,
                          },
                        })
                      }}
                    ></TextInput>
                    <Text>PASSWORD</Text>
                  </Pane>
                ) : (
                  <Pane></Pane>
                )}
              </Pane>
            ) : (
              <Pane width={'45%'}></Pane>
            )}
          </Pane>
        </Dialog>

        {/* Input field */}
        {this.state.set.flashcards.map((item, index) => (
          <Pane key={index}>
            {/* Action bar */}
            <Pane
              width="100%"
              height={50}
              backgroundColor={'#1070CA'}
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
                color={'white'}
              >
                {index + 1}
              </Text>
              <Pane paddingRight={40} position="relative" top={12} height={50}>
                {this.state.set.flashcards.length > 2 ? (
                  <Tooltip content={'Remove this card'}>
                    <TrashIcon
                      size={20}
                      color="red"
                      onClick={() => {
                        this.removeCard(index)
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Pane></Pane>
                )}
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
                  onFocus={(e) => {
                    this.focus(e)
                  }}
                  onBlur={(e) => {
                    this.blur(e)
                  }}
                  onChange={(e) => {
                    this.setTitle(e, index)
                  }}
                ></TextInput>

                <Pane
                  width="100%"
                  marginTop={10}
                  marginBottom={10}
                  height={1}
                  backgroundColor="black"
                ></Pane>

                <Pane paddingLeft={10}>
                  <Text
                    fontWeight={550}
                    fontSize={18}
                    marginBottom={10}
                    id={'require'}
                    color={'red'}
                    display={'none'}
                  >
                    {' '}
                    THIS IS REQUIRED
                  </Text>
                  <Text
                    id={'hint'}
                    fontSize={16}
                    fontWeight={500}
                    color="#A6B1BB"
                    display={'block'}
                  >
                    TERM
                  </Text>
                </Pane>
              </Pane>

              {/* Description side */}
              <Pane marginRight="2%" width="47%">
                <TextInput
                  marginTop={40}
                  height={50}
                  width="100%"
                  onFocus={(e) => {
                    this.focus(e)
                  }}
                  onBlur={(e) => {
                    this.blur(e)
                  }}
                  onChange={(e) => {
                    this.setDescription(e, index)
                  }}
                ></TextInput>

                <Pane
                  width="100%"
                  marginTop={10}
                  marginBottom={10}
                  height={1}
                  backgroundColor="black"
                ></Pane>

                <Pane paddingLeft={10}>
                  <Text
                    fontWeight={550}
                    fontSize={18}
                    marginBottom={10}
                    id={'require'}
                    color={'red'}
                    display={'none'}
                  >
                    {' '}
                    THIS IS REQUIRED
                  </Text>
                  <Text
                    id={'hint'}
                    fontSize={16}
                    fontWeight={500}
                    color="#A6B1BB"
                    display={'block'}
                  >
                    DEFINITION
                  </Text>
                </Pane>
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
