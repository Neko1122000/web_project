import React from "react";
import UserHeader from '../UserHeader'
import { Link } from 'react-router-dom'
import { Menu, Heading, Pane } from 'evergreen-ui'
import Set from "./Set";

class Folder extends React.Component{
    render(){
        return(
            <Pane
                borderBottom
                borderBottomRightRadius={20}
                width="100%"
                height={150}
                backgroundColor={"white"}
            >
                folder detail
            </Pane>
        )
    }
}

export default Folder