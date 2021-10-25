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

const StyledBadge = ({bgColor}) => {
    return (
        <StyledAvatar
            overlap = "circular"
            anchorOrigin = {{ vertical: 'bottom', horizontal: 'right' }}
            variant = "dot"
        >
            <Avatar sx = {{ bgcolor: bgColor, width: 32, height: 32 }}>P</Avatar>
        </StyledAvatar>
    )
}

export default StyledBadge
