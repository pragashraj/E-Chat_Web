import React from 'react'

import Button from '@mui/material/Button'

const SecondaryButton = ({title, onClick}) => {
    return (
        <Button variant = "outlined" fullWidth onClick = {onClick}>
        {title}
        </Button>
    )
}

export default SecondaryButton
