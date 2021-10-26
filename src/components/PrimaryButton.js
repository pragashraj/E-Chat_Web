import React from 'react'

import Button from '@mui/material/Button'
import {endUserColor} from '../values/values'

const PrimaryButton = ({title, onClick}) => {
    return (
        <Button 
            variant = "contained" 
            fullWidth 
            sx = {{bgcolor: endUserColor}}
            onClick = {onClick}
        >
            {title}
        </Button>
    )
}

export default PrimaryButton
