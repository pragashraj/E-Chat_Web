import React from 'react'

import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation = {6} ref = {ref} variant = "filled" {...props} />
})

const SnackBar = ({open, message, severity, align, handleClose}) => {
    return (
        <Snackbar open = {open} autoHideDuration = {3000} onClose = {handleClose} anchorOrigin = {align}>
            <Alert onClose = {handleClose} severity = {severity} sx = {{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackBar
