import React from 'react'

import {Paper, InputBase, Divider, IconButton} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Search, Close, PersonSearch } from '@mui/icons-material'

import StyledBadge from './StyledBadge'

const useStyles = makeStyles((theme) => ({
  root: {
    p: '2px 4px', 
    display: 'flex', 
    alignItems: 'center', 
    width: "100%", 
    backgroundColor: "#808B96"
  },
  avatar_btn: {
    p: '10px'
  },
  input_base: {
    ml: 1, 
    flex: 1,
  },
  icon_btn: {
    p: '10px'
  },
  divider: {
    height: 28, 
    m: 0.5,
  },
}))

const InputHeader = ({placeholder, value, desktopView}) => {
    const classes = useStyles({desktopView: desktopView})

    const renderMobileView = () => {
        return (
            <>
            <IconButton className = {classes.icon_btn} aria-label = "directions">
                <PersonSearch sx = {{color: "white", width: 30}}/>
            </IconButton>
            <Divider className = {classes.divider} orientation = "vertical" />
            </>
        )
    }

    const renderDesktopView = () => {
        return (
            <>
            <InputBase
                className = {classes.input_base}
                placeholder = {placeholder}
                inputProps = {{ 'aria-label': placeholder }}
                value = {value}
                name = "search"
            />
            <IconButton className = {classes.icon_btn} aria-label = "search">
                <Search />
            </IconButton>
            <Divider className = {classes.divider} orientation = "vertical" />
            <IconButton className = {classes.icon_btn} aria-label = "directions">
                <Close/>
            </IconButton>
            </>
        )
    }

    return (
        <Paper component = "form" className = {classes.root}>
            <IconButton className = {classes.avatar_btn} aria-label = "menu">
                <StyledBadge bgColor = {"#D35400"}/>
            </IconButton>
            { desktopView ? renderDesktopView() : renderMobileView() }
        </Paper>
    )
}

export default InputHeader
