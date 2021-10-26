import React from 'react'

import { Grid, IconButton } from '@mui/material'
import { Send, EmojiEmotions } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import Input from '../../components/Input'

import './Home.css'

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center", 
        justifyContent: "center", 
        height: "100%",
    },
    icon: props => ({
        color: "white", 
        width: props.desktop ? 30 : 15
    }),
}))

const Footer = ({
    value, 
    handleInputOnChange, 
    handleSendOnClick,
    handleEmojiOnClick
}) => {
    const matches = useMediaQuery('(min-width:800px)')
    const classes = useStyles({desktop: matches})

    const renderInputBlog = () => {
        return (
            <div className = "footer_input_blog">
                <IconButton aria-label = "emojies" onClick = {handleEmojiOnClick}>
                    <EmojiEmotions className = {classes.icon}/>
                </IconButton>
                <div className = "footer_input">
                    <Input 
                        size = "small" 
                        label = "Type your message........" 
                        name = "messageValue" 
                        value = {value} 
                        handleInputOnChange = {handleInputOnChange}
                    />
                </div>
            </div>
        )
    }

    const renderSendBlog = () => {
        return (
            <IconButton aria-label = "send" onClick = {handleSendOnClick}>
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
