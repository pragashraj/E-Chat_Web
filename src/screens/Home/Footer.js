import React from 'react'

import { Grid, IconButton } from '@mui/material'
import { Send, EmojiEmotions } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import Input from '../../components/Input'
import EmojiPicker from '../../components/EmojiPicker'
import {Circular, Text} from '../../components/skeletons/index'

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
    emojiPicker: {
        position: "absolute", 
        bottom: "130px",
    }
}))

const Footer = ({
    value,
    showEmojiPicker,
    selectedChatItem,
    handleInputOnChange, 
    handleSendOnClick,
    handleEmojiOnClick,
    handleEmojiOnSelect
}) => {
    const matches = useMediaQuery('(min-width:800px)')
    const classes = useStyles({desktop: matches})

    const renderEmojiPicker = () => {
        return (
            <div className = {classes.emojiPicker}>
                <EmojiPicker 
                    handleEmojiOnSelect = {handleEmojiOnSelect} 
                    desktopView = {matches}
                />
            </div>
        )
    }

    const renderInputBlogSkeleton = () => {
        return (
            <div className = "footer_input_blog">
                <Circular width = {22} height = {22}/>
                <div className = "footer_input">
                    <Text width = {"100%"} height = {40}/>
                </div>
            </div>
        )
    }

    const renderSendBlogSkeleton = () => {
        return (
            <Circular width = {22} height = {22}/>
        )
    }

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

    const renderSkeletonRoot = () => {
        return (
            <Grid container className = {classes.root}>
                <Grid item xs = {10} md = {11}>
                    { renderInputBlogSkeleton() }
                </Grid>
                <Grid item xs = {2} md = {1}>
                    { renderSendBlogSkeleton() }
                </Grid>
            </Grid>
        )
    }

    const renderRoot = () => {
        return (
            <Grid container className = {classes.root}>
                <Grid item xs = {10} md = {11}>
                    { renderInputBlog() }
                </Grid>
                <Grid item xs = {2} md = {1}>
                    { renderSendBlog() }
                </Grid>
            </Grid>
        )
    }

    return (
        <div className = "chat_footer_root">
            { selectedChatItem ? renderRoot() : renderSkeletonRoot() }
            { showEmojiPicker && renderEmojiPicker() }
        </div>
    )
}

export default Footer