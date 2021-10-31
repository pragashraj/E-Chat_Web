import React from 'react'

import Backdrop from '@mui/material/Backdrop'
import { makeStyles } from '@mui/styles'

import './Loading.css'

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: 1,
      color: '#fff',
    },
}))

const Loading = ({open}) => {
    const style = useStyles()
    return (
        <Backdrop className = {style.backdrop} open = {open}>
            <div className = "loader">Stand by...</div>
        </Backdrop>
    )
}

export default Loading
