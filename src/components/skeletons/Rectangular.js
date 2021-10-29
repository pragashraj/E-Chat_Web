import React from 'react'

import {Skeleton} from '@mui/material'

const Rectangular = ({width, height}) => {
    return (
        <Skeleton variant = "rectangular" width = {width} height = {height} sx = {{bgcolor: "silver"}}/>
    )
}

export default Rectangular
