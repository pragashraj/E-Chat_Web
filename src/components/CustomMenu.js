import React from 'react'

import {Menu, MenuItem} from '@mui/material'

const CustomMenu = ({open, anchorEl, menuItems, handleMenuItemOnPress, handleClose}) => {
    return (
        <Menu
            id = "basic-menu"
            anchorEl = {anchorEl}
            open = {open}
            onClose = {handleClose}
            MenuListProps = {{ 'aria-labelledby': 'basic-button' }}
        >
            {   
                menuItems.map((item, idx) => { 
                    return <MenuItem onClick = { () => handleMenuItemOnPress(item)} key = {idx}>
                        {item}
                    </MenuItem> 
                }) 
            }
        </Menu>
    )
}

export default CustomMenu
