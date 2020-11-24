import React from 'react';
import { Pane, Text, SelectMenu, Button} from 'evergreen-ui'
import { AddIcon, TrashIcon, EditIcon, FolderOpenIcon } from 'evergreen-ui'

class Folder extends React.Component{
    render(){
        var folderInfo = {
            owner:"QuocSinh",
            name:"Folder",
            description:"folder description"
        }
        var listSets = [
            {
                id:1,
                setName:"Folder1",
                setInfo:"smt"
            },
            {
                id:2,
                setName:"Folder2",
                setInfo:"smt2"
            },
            {
                id:3,
                setName:"Folder3",
                setInfo:"smt3"
            }
        ]

        return(
            <Pane>
                <Pane
                    borderBottom
                    borderBottomRightRadius={20}
                    width="100%"
                    height={150}
                    backgroundColor={"white"}
                    display="flex"
                    justifyContent="space-between"
                    marginBottom={50}
                >
                    <Pane
                        marginTop="2%"
                        marginLeft="5%"
                        height={45}
                    >
                        <Text display="inline-block">{listSets.length} sets  |  </Text>
                        <Text display="inline-block" size={16}>   created by {folderInfo.owner}</Text>
                        <Pane display="block">
                            <FolderOpenIcon color="#303545" size={45}/>
                            <Text fontSize={40} fontWeight={500}>{folderInfo.name}</Text>
                        </Pane>

                    </Pane>
                    <Pane marginTop="4%" marginRight="5%">
                        <AddIcon size={25} color="lawngreen"/>
                        <EditIcon size={25}  color="dodgerblue"  marginLeft={10}/>
                        <TrashIcon size={25} color="tomato" marginLeft={10} />
                    </Pane>
                </Pane>
                <Pane>
                    <Pane
                        marginLeft={100}
                    >

                    </Pane>
                    {listSets.map((set) =>(
                        <Pane
                            width="400px"
                            marginLeft={100}
                            height={125}
                            elevation={2}
                            display="inline-block"
                            marginTop={10}
                            backgroundColor="lightgrey"
                        >
                            {set.setName}
                        </Pane>
                    ))}
                </Pane>
            </Pane>

        )
    }
}
export default Folder