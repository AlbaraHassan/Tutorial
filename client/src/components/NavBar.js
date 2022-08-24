import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';import AccountCircle from '@mui/icons-material/AccountCircle';
import { memo } from "react";
import { useNavigate } from 'react-router-dom';






function NavBar({ user }) {
    const [ anchorEl, setAnchorEl ] = useState(null)
    const navigate = useNavigate()

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }



    return (


        <AppBar position="static" sx={{ borderRadius: 10, marginTop: 2 }}>
            <Toolbar>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Store
                </Typography>
                
                {user && (
                    <div>
                        
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Typography sx={{fontSize:14, marginRight:2}}>{user.username}</Typography>
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={()=>{
                                localStorage.removeItem("accessToken")
                                navigate("/login")
                            }}>Sign Out</MenuItem>
                        </Menu>


                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={()=>{navigate("/cart")}}
                            color="inherit"
                        >
                            <ShoppingCartIcon />
                        </IconButton>
                    </div>

                )}
            </Toolbar>
        </AppBar>
    )
}

export default memo(NavBar)