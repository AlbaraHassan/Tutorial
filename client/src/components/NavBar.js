import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartClear } from '../features/cart';
import { styled } from '@mui/system';
import BadgeUnstyled, { badgeUnstyledClasses } from '@mui/base/BadgeUnstyled';
import { arrayClear } from '../features/array';
import { counterClear } from '../features/counter';



const StyledBadge = styled(BadgeUnstyled)`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  list-style: none;
  font-family: IBM Plex Sans, sans-serif;
  position: relative;
  display: inline-block;
  line-height: 1;

  & .${badgeUnstyledClasses.badge} {
    z-index: auto;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    background: #07f;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #fff;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }

  & .${badgeUnstyledClasses.invisible} {
    display: none;
  }
`;


function NavBar({ user }) {
    const [ anchorEl, setAnchorEl ] = useState(null)
    const navigate = useNavigate()
    const cart = useSelector((state) => state.cart.value)
    const dispatch = useDispatch()

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }


    return (


        <AppBar position="static" sx={{ borderRadius: 10, marginTop: 2 }}>
            <Toolbar>

                <Typography variant="h4" component="div" onClick={() => { navigate("/items") }} sx={{ flexGrow: 1 }}>
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
                            <Typography sx={{ fontSize: 14, marginRight: 2 }}>{user.username}</Typography>
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
                            <MenuItem onClick={() => {
                                localStorage.clear()
                                dispatch(cartClear())
                                dispatch(arrayClear())
                                dispatch(counterClear())
                                navigate("/login")
                            }}>Sign Out</MenuItem>
                        </Menu>


                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => { navigate("/cart") }}
                            color="inherit"
                        >
                            <StyledBadge badgeContent={JSON.parse(localStorage.getItem("data"))?JSON.parse(localStorage.getItem("data")).length:0}>
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                    </div>

                )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar