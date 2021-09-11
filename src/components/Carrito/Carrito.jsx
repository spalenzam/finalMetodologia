import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import Item from './Item/Item'
import useStyles from './styles';
import { Link } from 'react-router-dom'

const Carrito = ({ cart, handleModificarCantidad, handleEliminarItems, handleVaciar }) => {

    const classes = useStyles();    

    const CarritoVacio = () => (
        <Typography variant="subtitle1">No hay productos en el carrito!
            <Link to="/" className={classes.link}> Agregar </Link>
        </Typography>
    );

    const CarritoLleno = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <Item 
                        item={item} 
                        onModificarCantidad={handleModificarCantidad}
                        onEliminarItems={handleEliminarItems}
                        />
                    </Grid>
                ))}
            </Grid>

            <div className={classes.detalles}>
                    <Typography variant="h4">
                        Subtotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>
                        <Button className={classes.botonVacio} size="large" type="button" variant="contained" color="secondary" onClick={handleVaciar}>
                            Vaciar Carrito
                        </Button>
                        <Button component={Link} to="/finalizar" className={classes.botonVerificar} size="large" type="button" variant="contained" color="primary">
                            Finalizar
                        </Button>
                    </div>
            </div>
        </>    
    );

    if(!cart.line_items) return'Cargando';

    return (
        <Container>
            <div className={classes.barra} />
            <Typography className={classes.titulo} variant="h3" gutterBottom>Tu compra</Typography>
            { !cart.line_items.length ? <CarritoVacio/> : <CarritoLleno/> }
        </Container>
    )
}

export default Carrito
