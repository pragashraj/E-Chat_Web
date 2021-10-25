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
    mobileItemAvatar: {
        width: 22,
        height: 22,
        fontSize: '0.7rem'
    },
    mobileDateTime: {
        color: "#2C3E50",
        fontSize: "0.6rem",
        marginLeft: "5px"
    },
    mobileListItem: {
        display: "flex", 
        flexDirection: "row",
        alignItems: "center",
    }
})

const ChatListItem = ({listItem, desktopView}) => {
    const classes = useStyles()
    const rand = Math.floor(Math.random() * 100)

    const renderMobileView = () => {
        return (
            <ListItemButton>
                <ListItemAvatar className = {classes.mobileListItem}>
                    <Avatar sx = {{ bgcolor: `rgb(${rand}, ${rand}, 0)` }} className = {classes.mobileItemAvatar}>
                        {listItem.avatar}
                    </Avatar>
                    <span className = {classes.mobileDateTime}>{listItem.dateTime}</span>
                </ListItemAvatar>
            </ListItemButton>
        )
    }

    const renderDestopView = () => {
        return (
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar sx = {{ bgcolor: `rgb(${rand}, ${rand}, 0)` }}>{listItem.avatar}</Avatar>
                </ListItemAvatar>
                <ListItemText primary = {listItem.user} secondary = {listItem.recentMessage} /> 
                <span className = {classes.dateTime}>{listItem.dateTime}</span>
            </ListItemButton>
        )
    }
    
    return (
        <Paper className = {classes.root}>
            { desktopView ? renderDestopView() : renderMobileView() }
        </Paper>
    )
}

export default ChatListItem
