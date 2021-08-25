import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { classExpression } from 'babel-types';
import { classes } from 'istanbul-lib-coverage';
import useStyles from './styles';

const Carrito = ({ cart }) => {
    const classes = useStyles();
    const isEmpty = !cart.line_items.length;

    const CarritoVacio = () => (
        <Typography variant="subtitle1">No hay productos en el carrito!</Typography>
    );

    const CarritoLleno = () => (
        <>
        <Grid container spacing={3}>
            {cart.line_items.map((i) => (
                <Grid i xs={12} sm{4} key={i.id}>
                    <div>{i.name}</div>
                </Grid>
            ))}
        </Grid>
        <div className={classes.detalles}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.botonVacio} size="large" type="button" variant="contained" color="secondary">
                        Carrito sin productos
                    </Button>
                    <Button className={classes.botonVerificar} size="large" type="button" variant="contained" color="primary">
                        Verificar
                    </Button>
                </div>
        </div>
    );

    return (
        <Container>
            <div className={classes.barra} />
            <Typography className={classes.titulo} variant="h3">Your Shopping Cart</Typography>
            { isEmpty ? <CarritoVacio/> : <CarritoLleno/> }
        </Container>
    )
}

export default Carrito
