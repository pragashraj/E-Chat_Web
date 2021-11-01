import React from 'react'

import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'

import { makeStyles } from '@mui/styles'
import {Modal, Backdrop, Fade, DialogActions} from '@mui/material'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        border: '2px solid rgb(0, 30, 60)',
        boxShadow: "5px",
        padding: "25px",
        color: "white"
    },
}))

const Alert = ({content, open, handleClose, handleConfirm}) => {
    const classes = useStyles()

    return (
        <Modal
            aria-labelledby = "transition-modal-title"
            aria-describedby = "transition-modal-description"
            className = {classes.modal}
            open = {open}
            onClose = {handleClose}
            closeAfterTransition
            BackdropComponent = {Backdrop}
            BackdropProps = {{ timeout: 500 }}
        >
            <Fade in = {open}>
                <div className = {classes.paper}>
                    <h2 id = "transition-modal-title">{content}</h2>
                    <DialogActions className = {classes.footer}>
                        <SecondaryButton title = "No" onClick = {handleClose}/>
                        <PrimaryButton title = "Yes" onClick = {handleConfirm}/>
                    </DialogActions>
                </div>
            </Fade>
        </Modal>
    )
}

export default Alert
