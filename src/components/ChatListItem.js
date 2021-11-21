import React, {useState, useEffect} from 'react'

import moment from 'moment'

import {Paper, ListItemText, ListItemAvatar, Avatar, ListItemButton} from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    root: {
        p: '2px 4px', 
        width: "100%", 
        backgroundColor: "#34495E",
        marginBottom: "5px"
    },
    dateTime: {
        color: "rgba(255, 255, 255, 0.5)",
        fontSize: "0.6rem"
    },
    mobileItemAvatar: {
        width: 22,
        height: 22,
        fontSize: '0.7rem'
    },
    mobileDateTime: {
        color: "rgba(255, 255, 255, 0.5)",
        fontSize: "0.4rem",
        marginLeft: "5px"
    },
    mobileListItem: {
        display: "flex", 
        flexDirection: "row",
        alignItems: "center",
    }
})

const ChatListItem = ({listItem, desktopView, handleChatListItemOnClick}) => {
    const classes = useStyles()
    const [recentMessage, setRecentMessage] = useState("")
    const [recentMessageDateTime, setRecentMessageDateTime] = useState(null)

    useEffect(() => {
        getRecentMessage()
        // eslint-disable-next-line
    }, [])

    const getRecentMessage = () => {
        const chatListLength = listItem.chats.length
        if (chatListLength > 0) {
            const chat = listItem.chats[chatListLength - 1]
            setRecentMessage(chat.message)
            let dateTime = getDateTime(chat.dateTime)
            if (!desktopView) {
                dateTime = getDateTimeMobile(chat.dateTime)
            }
            setRecentMessageDateTime(dateTime)
        }
    }

    const getDateTime = (dateTime) => {
        return moment(dateTime).format("DD MMM hh:mm a")
    }

    const getDateTimeMobile = (dateTime) => {
        return moment(dateTime).format("hh:mm a")
    }

    const renderMobileView = () => {
        return (
            <ListItemButton onClick = {() => handleChatListItemOnClick(listItem)}>
                <ListItemAvatar className = {classes.mobileListItem}>
                    <Avatar sx = {{ bgcolor: `rgb(${listItem.randX}, ${listItem.randY}, 0)` }} className = {classes.mobileItemAvatar}>
                        {listItem.avatar}
                    </Avatar>
                    <span className = {classes.mobileDateTime}>{recentMessageDateTime}</span>
                </ListItemAvatar>
            </ListItemButton>
        )
    }

    const renderDestopView = () => {
        return (
            <ListItemButton onClick = {() => handleChatListItemOnClick(listItem)}>
                <ListItemAvatar>
                    <Avatar sx = {{ bgcolor: `rgba(${listItem.randX}, ${listItem.randY}, 73)` }}>{listItem.avatar}</Avatar>
                </ListItemAvatar>
                <ListItemText primary = {listItem.username} secondary = {recentMessage} sx = {{color: "rgba(255, 255, 255, 0.7)"}}/> 
                <span className = {classes.dateTime}>{recentMessageDateTime}</span>
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
