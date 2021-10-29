import React from 'react'

import {Skeleton} from '@mui/material'

const Animator = ({width, height}) => {
    return (
        <Skeleton animation = "wave" width = {width} height = {height}/>
    )
}

export default Animator