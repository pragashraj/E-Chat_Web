import React from 'react'

import { Grid, IconButton, Avatar } from '@mui/material'
import { Settings } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import './Home.css'
import {secondaryUserColor} from '../../values/values'

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center", 
        justifyContent: "center", 
        height: "100%"
    },
    icon: props => ({
        color: "white", 
        width: props.desktop ? 30 : 15
    }),
}))

const Header = ({selectedChatItem, handleSettingsOnClick}) => {
    const matches = useMediaQuery('(min-width:800px)')
    const classes = useStyles({desktop: matches})

    const renderSettingBlog = () => {
        return (
            <IconButton aria-label = "settings" onClick = {handleSettingsOnClick}>
                <Settings className = {classes.icon}/>
            </IconButton>
        )
    }

    const renderSecondaryUser = () => {
        return (
            <div className = "secondary_user_blog">
                <Avatar sx = {{ bgcolor: secondaryUserColor }}>{selectedChatItem && selectedChatItem.avatar}</Avatar>
                <div className = "secondary_user_detail">
                    <span className = "secondary_user_name">{selectedChatItem && selectedChatItem.user}</span>
                    <span className = "secondary_user_active">active</span>
                </div>
            </div>
        )
    }

    return (
        <div className = "chat_header_root">
            <Grid container className = {classes.root}>
                <Grid item xs = {10} md = {11}>
                    { renderSecondaryUser() }
                </Grid>
                <Grid item xs = {2} md = {1}>
                    { renderSettingBlog() }
                </Grid>
            </Grid>
        </div>
    )
}

export default Header
