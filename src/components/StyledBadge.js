import React from 'react'

import { styled } from '@mui/material/styles'
import {Badge, Avatar} from '@mui/material'

const StyledAvatar = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
}))

const StyledBadge = ({bgColor, desktopView}) => {
    const res = desktopView ? 32 : 20
    const size = desktopView ? "17px" : "10px" 
    
    return (
        <StyledAvatar
            overlap = "circular"
            anchorOrigin = {{ vertical: 'bottom', horizontal: 'right' }}
            variant = "dot"
        >
            <Avatar sx = {{ bgcolor: bgColor, width: res, height: res, fontSize: size }}>P</Avatar>
        </StyledAvatar>
    )
}

export default StyledBadge
