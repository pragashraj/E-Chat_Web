import React from 'react'

import {TextField} from '@mui/material'
import { styled } from '@mui/material/styles'

const CssTextField = styled(TextField)({
    '& label': {
        color: 'rgba(255, 255, 255, 0.5)',
    },
    '& input': {
        color: '#fff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#fff',
        },
        '&:hover fieldset': {
            borderColor: '#fff',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#34495E',
        },
    },
})

const Input = ({label, name, size, value, handleInputOnChange}) => {
    return (
        <CssTextField 
            label = {label} 
            id = {`outlined-size-${label}`}
            size = {size} 
            value = {value}
            name = {name}
            onChange = {handleInputOnChange}
            fullWidth
        />
    )
}

export default Input