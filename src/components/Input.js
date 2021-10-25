import React from 'react'

import {Box, TextField} from '@mui/material'

const Input = ({label, name, size, value}) => {
    return (
        <Box
            component = "form"
            sx = {{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <TextField
                label = "Size"
                id = {`outlined-size-${label}`}
                size = {size}
                value = {value}
                name = {name}
            />
        </Box>
    )
}

export default Input