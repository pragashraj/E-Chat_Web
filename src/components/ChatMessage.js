import React from 'react'

import {Avatar, Chip} from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    root: {
        flexDirection: "column",
        alignSelf: "flex-end"
    }
})

const ChatMessage = ({avatar, message, bgcolor}) => {
    const classes = useStyles()

    const renderAvatar = () => {
        return (
            <Avatar sx = {{bgcolor: "#fff"}}>{avatar}</Avatar>
        )
    }

    return (
        <div className = {classes.root}>
            <Chip avatar = {renderAvatar()} label = {message} sx = {{bgcolor: bgcolor, color: "#fff", paddingRight: "20px"}}/>
        </div>
    )
}

export default ChatMessage