import React from 'react'

import {Paper, ListItemText, ListItemAvatar, Avatar, ListItemButton} from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    root: {
        p: '2px 4px', 
        width: "100%", 
        backgroundColor: "#808B96",
        marginBottom: "5px"
    },
    dateTime: {
        color: "#2C3E50",
        fontSize: "0.8rem"
    },
})

const ChatListItem = ({listItem}) => {
    const classes = useStyles()
    const rand = Math.floor(Math.random() * 100)
    
    return (
        <Paper className = {classes.root}>
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar sx = {{ bgcolor: `rgb(${rand}, ${rand}, 0)` }}>{listItem.avatar}</Avatar>
                </ListItemAvatar>
                <ListItemText primary = {listItem.user} secondary = {listItem.recentMessage} />
                <span className = {classes.dateTime}>{listItem.dateTime}</span>
                {console.log(rand)}
            </ListItemButton>
        </Paper>
    )
}

export default ChatListItem
