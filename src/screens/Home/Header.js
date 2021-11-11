import React from 'react'

import { Grid, IconButton, Avatar, Box } from '@mui/material'
import { Settings } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import CustomMenu from '../../components/CustomMenu'
import {Circular, Text} from '../../components/skeletons/index'

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

const Header = ({
    selectedChatItem, 
    handleSettingsOnClick, 
    handleClose, 
    handleMenuItemOnPress, 
    anchorEl,
    menuItems
}) => {
    const matches = useMediaQuery('(min-width:800px)')
    const classes = useStyles({desktop: matches})

    const renderSettingBlogSkeleton = () => {
        return (
            <Box>
                <Circular width = {22} height = {22}/>
            </Box>
        )
    }

    const renderSecondaryUserSkeleton = () => {
        return (
            <div className = "secondary_user_blog">
                <Circular width = {32} height = {32}/>
                <div className = "secondary_user_detail">
                    <Text width = {matches ? 200 : 50} height = {30}/>
                </div>
            </div>
        )
    }

    const renderSettingBlog = () => {
        return (
            <Box>
                <IconButton aria-label = "settings" onClick = {handleSettingsOnClick}>
                    <Settings className = {classes.icon}/>
                </IconButton>
                <CustomMenu
                    open = {Boolean(anchorEl)}
                    menuItems = {menuItems}
                    anchorEl = {anchorEl}
                    handleClose = {handleClose}
                    handleMenuItemOnPress = {handleMenuItemOnPress}
                />
            </Box>
        )
    }

    const renderSecondaryUser = () => {
        return (
            <div className = "secondary_user_blog">
                <Avatar sx = {{ bgcolor: secondaryUserColor }}>{selectedChatItem && selectedChatItem.avatar}</Avatar>
                <div className = "secondary_user_detail">
                    <span className = "secondary_user_name">{selectedChatItem && selectedChatItem.username}</span>
                    <span className = "secondary_user_active">{selectedChatItem && selectedChatItem.active && "Active"}</span>
                </div>
            </div>
        )
    }

    const renderSkeletonRoot = () => {
        return (
            <Grid container className = {classes.root}>
                <Grid item xs = {10} md = {11}>
                    { renderSecondaryUserSkeleton() }
                </Grid>
                <Grid item xs = {2} md = {1}>
                    { renderSettingBlogSkeleton() }
                </Grid>
            </Grid>
        )
    }

    const renderRoot = () => {
        return (
            <Grid container className = {classes.root}>
                <Grid item xs = {10} md = {11}>
                    { renderSecondaryUser() }
                </Grid>
                <Grid item xs = {2} md = {1}>
                    { renderSettingBlog() }
                </Grid>
            </Grid>
        )
    }

    return (
        <div className = "chat_header_root">
            { selectedChatItem ? renderRoot() : renderSkeletonRoot() }
        </div>
    )
}

export default Header