import React from 'react'

import {Avatar, Chip} from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column"
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
            <Chip avatar = {renderAvatar()} label = {message} sx = {{bgcolor: bgcolor, color: "#fff"}}/>
        </div>
    )
}

export default ChatMessage