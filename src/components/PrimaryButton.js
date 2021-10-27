import React from 'react'

import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

import {endUserColor} from '../values/values'

const CustomButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    backgroundColor: endUserColor,
    '&:hover': {
      backgroundColor: endUserColor,
    },
}))

const PrimaryButton = ({title, onClick}) => {
    return (
        <CustomButton fullWidth variant = "contained" onClick = {onClick}>
        {title}
        </CustomButton>
    )
}

export default PrimaryButton
