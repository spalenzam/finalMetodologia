import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/123-1234123_free-download-red-wine-stain-png.png';
import useStyles from './styles';


const Navbar = ({ totalItems }) => {

    const ubicacion = useLocation();
    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/vinoteca" variant="h6" className={classes.titulo} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.imagen} />
                        VINOTECA
                    </Typography>
                    <Typography component={Link} to="/bodega" variant="h6" className={classes.titulo} color="inherit">
                        {/* <img src={logo} alt="Commerce.js" height="25px" className={classes.imagen} /> */}
                        BODEGAS
                    </Typography>
                    <Typography component={Link} to="/" variant="h6" className={classes.titulo} color="inherit">
                        {/* <img src={logo} alt="Commerce.js" height="25px" className={classes.imagen} /> */}
                        TIENDA
                    </Typography>
                    <div className={classes.grow} />
                    {ubicacion.pathname === '/' ? (
                        <div className={classes.boton}>
                            <IconButton component={Link} to="/carrito" aria-label="Show cart items" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>) : null}
                </Toolbar>
            </AppBar>

        </>
    )
}

export default Navbar
