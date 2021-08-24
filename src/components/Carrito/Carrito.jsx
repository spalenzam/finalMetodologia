import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { classExpression } from 'babel-types';
import { classes } from 'istanbul-lib-coverage';

const Carrito = () => {
    const isEmpty = true;

    const CarritoVacio = () => (
        <Typography variant="subtitle1">No hay productos en el carrito!</Typography>
    );

    const CarritoLleno = () => (
        <Typography variant="subtitle1">No hay productos en el carrito!</Typography>
    );

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3">Your Shopping Cart</Typography>
            { isEmpty ? <CarritoVacio/> : <CarritoLleno/> }
        </Container>
    )
}

export default Carrito
