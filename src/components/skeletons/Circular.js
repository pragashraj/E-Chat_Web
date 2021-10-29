import React from 'react'

import {Skeleton} from '@mui/material'

const Circular = ({width, height}) => {
    return (
        <Skeleton variant = "circular" width = {width} height = {height} sx = {{bgcolor: "silver"}}/>
    )
}

export default Circular
