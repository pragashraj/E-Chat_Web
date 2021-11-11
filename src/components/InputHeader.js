import React from 'react'

import {Paper, InputBase, Divider, IconButton} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Search, Close, PersonSearch } from '@mui/icons-material'

import StyledBadge from './StyledBadge'
import {endUserColor} from '../values/values'

const useStyles = makeStyles((theme) => ({
  root: props => ({
    p: '2px 4px', 
    display: 'flex', 
    alignItems: 'center', 
    width: props.desktopView ? "100%" : "75%", 
    backgroundColor: "#808B96"
  }),
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

const InputHeader = ({
  placeholder, 
  value, 
  desktopView, 
  handleInputOnChange, 
  handleSearchOnClick,
  handleSearchModalOnClick,
  handleCancelOnClick,
  currentUser
}) => {
    const classes = useStyles({desktopView: desktopView})

    const renderMobileView = () => {
        return (
            <IconButton className = {classes.icon_btn} aria-label = "search" onClick = {handleSearchModalOnClick}>
                <PersonSearch sx = {{color: "white", width: 20}}/>
            </IconButton>
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
                name = "searchValue"
                onChange = {handleInputOnChange}
                autoComplete = 'off'
            />
            <IconButton className = {classes.icon_btn} aria-label = "search" onClick = {handleSearchOnClick}>
                <Search />
            </IconButton>
            <Divider className = {classes.divider} orientation = "vertical" />
            <IconButton className = {classes.icon_btn} aria-label = "directions" onClick = {handleCancelOnClick}>
                <Close/>
            </IconButton>
            </>
        )
    }

    return (
        <Paper component = "form" className = {classes.root}>
            <IconButton className = {classes.avatar_btn} aria-label = "menu">
                <StyledBadge bgColor = {endUserColor} desktopView = {desktopView} avatar = {currentUser ? currentUser.username.charAt(0) : "X"}/>
            </IconButton>
            { desktopView ? renderDesktopView() : renderMobileView() }
        </Paper>
    )
}

export default InputHeader
