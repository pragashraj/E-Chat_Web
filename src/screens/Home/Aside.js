import React from 'react'

import { Grid, Divider, List } from '@mui/material'
import { makeStyles } from '@mui/styles'

import InputHeader from '../../components/InputHeader'
import ChatListItem from '../../components/ChatListItem'

import './Home.css'

const useStyles = makeStyles({
    divider: {
      width: "100%",
      backgroundColor: "silver",
      marginTop: "15px",
      marginBottom: "15px",
    },
    list: {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
    }
})

const Aside = ({chatList}) => {
    const classes = useStyles()

    const renderList = () => {
        return (
            <Grid container>
                <Grid item xs = {12}>
                    <List className = {classes.list}>
                        { chatList.map(item => {
                            return <ChatListItem listItem = {item} key = {item.id}/>
                        }) }
                    </List>
                </Grid>
            </Grid>
        )
    }

    const renderHeader = () => {
        return (
            <Grid container>
                <Grid item xs = {12}>
                    <InputHeader placeholder = "Search"/>
                </Grid>
            </Grid>
        )
    }

    return (
        <div className = "aside_root">
            <div className = "aside_header">
                { renderHeader() }
            </div>
            <Divider className = {classes.divider} orientation = "horizontal" />
            <div className = "aside_chat_list">
                { renderList() }
            </div>
        </div>
    )
}

export default Aside
