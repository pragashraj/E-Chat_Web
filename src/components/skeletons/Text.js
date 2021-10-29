import React from 'react'

import {Skeleton} from '@mui/material'

const Text = ({width, height}) => {
    return (
        <Skeleton variant = "text" width = {width} height = {height} sx = {{bgcolor: "silver"}}/>
    )
}

export default Text
