import React from 'react'

import {Avatar} from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    root: {
        flexDirection: "column",
        alignSelf: "flex-end"
    },
    emojiContainer: {
        display: "flex",
        flexDirection: "row",
    },
    emoji: {
        fontSize: "2rem",
    },
    avatar: {
        width: "20px", 
        height: "20px", 
        color: "#000",
        fontSize: "0.7rem",
        alignSelf: "flex-end"
    }
})

const EmojiMessage = ({avatar, message}) => {
    const classes = useStyles()

    const renderAvatar = () => {
        return (
            <Avatar className = {classes.avatar} sx = {{bgcolor: "#fff"}}>{avatar}</Avatar>
        )
    }

    return (
        <div className = {classes.root}>
            <div className = {classes.emojiContainer}>
                { renderAvatar() }
                <span className = {classes.emoji}>{message}</span>
            </div>
        </div>
    )
}

export default EmojiMessage
