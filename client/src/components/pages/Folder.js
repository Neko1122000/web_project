import React from 'react';
import { Pane, Text, Tooltip, Dialog, SelectMenu, Button, TextInput} from 'evergreen-ui'
import { AddIcon, TrashIcon, EditIcon, FolderOpenIcon, LearningIcon } from 'evergreen-ui'
import {Link} from "react-router-dom";

class Folder extends React.Component {
    state = {
        isShown: '',
        srcSet: 'yourSets',
        owner: "QuocSinh",
        path: "/sets",
        name: "Folder",
        description: "folder description",
        listSets: [
            {
                id: 1,
                setName: "Folder1",
                setInfo: "smt"
            },
            {
                id: 2,
                setName: "Folder2",
                setInfo: "smt2"
            },
            {
                id: 3,
                setName: "Folder3",
                setInfo: "smt3"
            }
        ],
        yourSets: [
            {
                id: 1,
                setName: "Folder1",
                setInfo: "smt"
            },
            {
                id: 2,
                setName: "Folder2",
                setInfo: "smt2"
            },
            {
                id: 3,
                setName: "Folder3",
                setInfo: "smt3"
            },
            {
                id: 4,
                setName: "Folder4",
                setInfo: "smt4"
            },
            {
                id: 5,
                setName: "Folder5",
                setInfo: "smt5"
            }
        ],
        classSets: [
            {
                id: 3,
                setName: "Folder3",
                setInfo: "smt3"
            },
            {
                id: 13,
                setName: "Folder13",
                setInfo: "smt13"
            },
            {
                id: 14,
                setName: "Folder14",
                setInfo: "smt14"
            },
            {
                id: 15,
                setName: "Folder15",
                setInfo: "smt15"
            },
            {
                id: 16,
                setName: "Folder16",
                setInfo: "smt16"
            }
        ]
    }

    /* show diablog */
    isShowed = () => {
        return this.state.isShown === '' ? false : true;
    }

    /* close diablog */
    showReset = () => {
        this.setState({isShown: ''})
    }

    /* remove folder */
    removeFolder = () => {
        alert("Remove folder and go to homepage")
    }

    /* change this folder's name */
    setName = () => {
        var name = this.refs.name.value;
        this.setState({name: name})
        this.showReset()
    }

    /* remover set in this folder*/
    removeSet = (id) => {
        console.log("remove")
    }

    render() {
        let diablog = null;
        switch (this.state.isShown) {
            case "add":
                diablog =
                    <Dialog
                        isShown={this.isShowed()}
                        title={"Add a set"}
                        onCloseComplete={this.showReset}
                        hasFooter={false}
                    >
                        <Pane background="tint1" height={100} textAlign={"center"}>
                            <Link to={'/create-set'}>
                                <Text width="100%" height={100} lineHeight="90px" fontSize={30} color={"green"}
                                      textAlign={"center"}>+ Create a new set</Text>
                            </Link>
                        </Pane>
                        <SelectMenu
                            hasTitle={false}
                            hasFilter={false}
                            options={
                                ['yourSets', 'classSets', 'Banana', 'Cherry', 'Cucumber']
                                    .map(label => ({label, value: label}))
                            }
                            selected={this.state.srcSet}
                            onSelect={item => this.setState({srcSet: item.value})}
                        >
                            <Button>{this.state.srcSet}</Button>
                        </SelectMenu>
                    </Dialog>;
                break;
            case "study":
                diablog =
                    <Dialog
                        isShown={this.isShowed()}
                        title={"Study this folder"}
                        onCloseComplete={this.showReset}
                        hasFooter={false}
                    >
                        <Pane paddingLeft="" display={"flex"} flexFlow={"wrap"} justifyContent={"space-around"}>
                            <Pane height={150} width="33%" background={"greenTint"} elevation={2}
                                  marginBottom={10}><LearningIcon size={45}/></Pane>
                            <Pane height={150} width="33%" background={"greenTint"} elevation={2}
                                  marginBottom={10}><LearningIcon size={45}/></Pane>
                            <Pane height={150} width="33%" background={"greenTint"} elevation={2}
                                  marginBottom={10}><LearningIcon size={45}/></Pane>
                            <Pane height={150} width="33%" background={"greenTint"} elevation={2}
                                  marginBottom={10}><LearningIcon size={45}/></Pane>
                            <Pane height={150} width="33%" background={"greenTint"} elevation={2}
                                  marginBottom={10}><LearningIcon size={45}/></Pane>
                            <Pane height={150} width="33%" background={"greenTint"} elevation={2}
                                  marginBottom={10}><LearningIcon size={45}/></Pane>
                        </Pane>
                    </Dialog>
                break;
            case "edit":
                diablog =
                    <Dialog
                        isShown={this.isShowed}
                        title={"Edit folder"}
                        onCloseComplete={this.showReset}
                        hasCancel={false}
                        confirmLabel={"Save"}
                        onConfirm={this.setName}
                    >
                        <Pane paddingLeft={"3%"} paddingRight={"3%"}>
                            <Pane display={"block"}>
                                <TextInput
                                    ref="name"
                                    display="block"
                                    marginTop={20}
                                    height={50}
                                    width="100%"
                                    placeholder={this.state.name}
                                    label="PLEASE ENTER A TITLE TO CREATE YOUR SET"
                                    required
                                    border="none"
                                    outline="none"
                                />
                                <Text paddingLeft={"1%"}>Title</Text>
                            </Pane>
                            <Pane>
                                <TextInput
                                    marginTop={20}
                                    height={50}
                                    width="100%"
                                    placeholder="Add a description"
                                />
                                <Text paddingLeft={"1%"}>Description</Text>
                            </Pane>
                        </Pane>
                    </Dialog>;
                break;
            case "remove":
                diablog =
                    <Dialog
                        intent={"warning"}
                        isShown={this.isShowed()}
                        title={"Remove folder"}
                        onCloseComplete={this.showReset}
                        confirmLabel={"Remove"}
                        onConfirm={this.removeFolder}
                    >
                        <Pane>
                            <Text fontSize={18} fontWeight={200} lineHeight={"25px"}>
                                <Text fontSize={25} fontWeight={600} lineHeight={"30px"}>{this.state.name}</Text> <br/>
                                Deleting a folder is a PERMANENT action. This cannot be undone.
                                Are you sure you want to delete this folder? The sets in this folder will not be
                                deleted.
                            </Text>
                        </Pane>
                    </Dialog>;
                break;
            default:
                break;
        }

        return (
            <Pane background="tint1">

                {/* Header */}
                <Pane
                    borderBottom
                    display="flex"
                    height={150}
                    background="white"
                    borderBottomRightRadius={20}
                    justifyContent="space-between"
                    marginBottom={50}
                >
                    {/* Info side */}
                    <Pane marginTop="2%" marginLeft="7%" height={45}>
                        <Pane marginBottom={20}>
                            <Text display="inline-block" marginRight={20}>
                                {this.state.listSets.length} sets |
                            </Text>
                            <Text display="inline-block" color={"#E4E7EB"}>
                                created by
                                <Link
                                    to={this.state.path}
                                    style={{color: '#14B5D0', marginLeft: 5}}
                                >
                                    {this.state.owner}
                                </Link>
                            </Text>
                        </Pane>
                        <Pane display="block">
                            <FolderOpenIcon color="#425A70" size={45} position={"relative"} top={5}/>
                            <Text
                                marginLeft={20}
                                fontSize={40}
                                fontWeight={500}
                                lineHeight="40px"
                            >
                                {this.state.name}
                            </Text>
                        </Pane>

                    </Pane>

                    {/* Action side */}
                    <Pane marginTop="4%" marginRight="10%">
                        <Tooltip content="Add set">
                            <AddIcon
                                onClick={() => {
                                    this.setState({isShown: 'add'})
                                }}
                                size={25}
                                color="lawngreen"
                            />
                        </Tooltip>
                        <Tooltip content={"Study"}>
                            <LearningIcon
                                onClick={() => {
                                    this.setState({isShown: 'study'})
                                }}
                                size={25} color={"#735DD0"}
                                marginLeft={10}
                            />
                        </Tooltip>
                        <Tooltip content={"Edit"}>
                            <EditIcon
                                onClick={() => {
                                    this.setState({isShown: 'edit'})
                                }}
                                size={25} color="dodgerblue"
                                marginLeft={10}
                            />
                        </Tooltip>
                        <Tooltip content={"Remove"}>
                            <TrashIcon
                                onClick={() => {
                                    this.setState({isShown: "remove"})
                                }}
                                size={25}
                                color="tomato"
                                marginLeft={10}
                            />
                        </Tooltip>

                    </Pane>

                    {/* Diablog */}
                    {diablog}

                </Pane>

                {/* List sets */}
                <Pane>
                    <Pane marginLeft={100}/>
                    {this.state.listSets.map((set) => (
                        <Pane
                            key={set.id}
                            width="400px"
                            marginLeft={100}
                            height={150}
                            elevation={2}
                            display="inline-block"
                            marginTop={10}
                            paddingTop={20}
                            paddingLeft={30}
                        >
                            <Link to={`/set/${set.id}`}>
                                <Pane>
                                    <Text fontSize={20} display={"block"} marginBottom={10}>
                                        {set.setName}
                                    </Text>
                                    <Text
                                        fontSize={16}
                                        color={"gray"}
                                        display={"block"}
                                        marginBottom={45}
                                    >
                                        2 terms
                                    </Text>
                                </Pane>
                            </Link>

                            {/* Owner and remove */}
                            <Pane display={"flex"} justifyContent={"space-between"} paddingRight={20}>
                                <Text fontSize={20}>
                                    <Link
                                        to={this.state.path}
                                        style={{color: '#14B5D0'}}
                                    >
                                        {this.state.owner}
                                    </Link>
                                </Text>
                                <Tooltip content={"Remove"}>
                                    <TrashIcon color={"red"} />
                                </Tooltip>

                            </Pane>
                        </Pane>
                    ))}
                </Pane>
            </Pane>
        )
    }
}
export default Folder