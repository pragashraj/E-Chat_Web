import React from 'react'

import { Grid, Divider, List } from '@mui/material'
import { makeStyles } from '@mui/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import InputHeader from '../../components/InputHeader'
import ChatListItem from '../../components/ChatListItem'

import './Home.css'

const useStyles = makeStyles({
    divider: props => ({
      width: props.desktopView ? "100%" : "80%",
      backgroundColor: "silver",
      marginTop: "15px",
      marginBottom: "15px",
    }),
    list: props => ({
        width: props.desktopView ? '100%' : "75%",
        maxWidth: 360,
        bgcolor: 'background.paper',
    })
})

const Aside = ({
    chatList, 
    searchValue, 
    handleInputOnChange, 
    handleChatListItemOnClick,
    handleSearchOnClick,
    handleSearchModalOnClick,
    handleCancelOnClick
}) => {
    const matches = useMediaQuery('(min-width:800px)')
    const classes = useStyles({desktopView: matches})

    const renderList = () => {
        return (
            <Grid container>
                <Grid item xs = {12}>
                    <List className = {classes.list}>
                        { chatList.map(item => {
                            return <ChatListItem 
                                listItem = {item} 
                                key = {item.id} 
                                desktopView = {matches}
                                handleChatListItemOnClick = {handleChatListItemOnClick}
                            />
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
                    <InputHeader 
                        placeholder = "Search" 
                        desktopView = {matches} 
                        value = {searchValue}
                        handleInputOnChange = {handleInputOnChange}
                        handleSearchOnClick = {handleSearchOnClick}
                        handleSearchModalOnClick = {handleSearchModalOnClick}
                        handleCancelOnClick = {handleCancelOnClick}
                    />
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
