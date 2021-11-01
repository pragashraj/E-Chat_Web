import React from 'react'

import {MenuItem, Select, FormHelperText, FormControl, InputBase} from '@mui/material'
import { styled } from '@mui/material/styles'

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
      color: "#fff"
    },
}))

const Selector = ({menuItems, value, helperText, handleChange}) => {
    return (
        <FormControl fullWidth>
            <Select
                labelId = "demo-customized-select-label"
                id = "demo-customized-select"
                value = {value}
                onChange = {handleChange}
                input = {<BootstrapInput />}
            >
                { menuItems.map((item, idx) => <MenuItem value = {item} key = {idx}>{item}</MenuItem>) }
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    )
}

export default Selector
