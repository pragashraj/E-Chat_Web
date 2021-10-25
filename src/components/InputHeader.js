import React from 'react'

import {Paper, InputBase, Divider, IconButton, Avatar} from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import { Search, Close } from '@mui/icons-material'

const useStyles = makeStyles({
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
  avatar: {
    width: 30, 
    height: 30
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
})

const InputHeader = ({placeholder, value}) => {
    const classes = useStyles()
    return (
        <Paper component = "form" className = {classes.root}>
            <IconButton className = {classes.avatar_btn} aria-label = "menu">
                <Avatar sx = {{ bgcolor: deepOrange[500] }} className = {classes.avatar}>N</Avatar>
            </IconButton>
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
        </Paper>
    )
}

export default InputHeader
