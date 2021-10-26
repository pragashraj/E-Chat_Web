import React from 'react'

import { Grid, IconButton, Avatar } from '@mui/material'
import { Settings } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'

import './Home.css'

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center", 
        justifyContent: "center", 
        height: "100%"
    },
    icon: {
        color: "white", 
        width: 30
    },
}))

const Header = () => {
    const classes = useStyles()

    const renderSettingBlog = () => {
        return (
            <IconButton aria-label = "settings">
                <Settings className = {classes.icon}/>
            </IconButton>
        )
    }

    const renderSecondaryUser = () => {
        return (
            <div className = "secondary_user_blog">
                <Avatar sx = {{ bgcolor: "#34495E" }}>S</Avatar>
                <div className = "secondary_user_detail">
                    <span className = "secondary_user_name">Steve rogers</span>
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
