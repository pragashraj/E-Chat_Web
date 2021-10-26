import React from 'react'

import { Grid, IconButton } from '@mui/material'
import { Send, EmojiEmotions } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'

import Input from '../../components/Input'

import './Home.css'

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center", 
        justifyContent: "center", 
        height: "100%",
    },
    icon: {
        color: "white", 
        width: 30
    },
}))

const Footer = () => {
    const classes = useStyles()

    const renderInputBlog = () => {
        return (
            <div className = "footer_input_blog">
                <IconButton aria-label = "settings">
                    <EmojiEmotions className = {classes.icon}/>
                </IconButton>
                <div className = "footer_input">
                    <Input size = "small" label = "Type your message........" name = "message"/>
                </div>
            </div>
        )
    }

    const renderSendBlog = () => {
        return (
            <IconButton aria-label = "settings">
                <Send className = {classes.icon}/>
            </IconButton>
        )
    }

    return (
        <div className = "chat_footer_root">
            <Grid container className = {classes.root}>
                <Grid item xs = {10} md = {11}>
                    { renderInputBlog() }
                </Grid>
                <Grid item xs = {2} md = {1}>
                    { renderSendBlog() }
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer
